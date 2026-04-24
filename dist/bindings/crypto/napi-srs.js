import { MlArray } from '../../lib/ml/base.js';
import { readCache, withVersion, writeCache, } from '../../lib/proof-system/cache.js';
import { assert } from '../../lib/util/errors.js';
import { OrInfinity } from './bindings/curve.js';
export { setSrsCache, srs, unsetSrsCache };
function empty() {
    return {};
}
const srsStore = { fp: empty(), fq: empty() };
const CacheReadRegister = new Map();
let cache;
function setSrsCache(c) {
    cache = c;
}
function unsetSrsCache() {
    cache = undefined;
}
const srsVersion = 1;
function cacheHeaderLagrange(f, domainSize) {
    let id = `lagrange-basis-${f}-${domainSize}`;
    return withVersion({
        kind: 'lagrange-basis',
        persistentId: id,
        uniqueId: id,
        dataType: 'string',
    }, srsVersion);
}
function cacheHeaderSrs(f, domainSize) {
    let id = `srs-${f}-${domainSize}`;
    return withVersion({
        kind: 'srs',
        persistentId: id,
        uniqueId: id,
        dataType: 'string',
    }, srsVersion);
}
function srs(napi, conversion) {
    return {
        fp: srsPerField('fp', napi, conversion),
        fq: srsPerField('fq', napi, conversion),
    };
}
function srsPerField(f, napi, conversion) {
    // note: these functions are properly typed, thanks to TS template literal types
    let createSrs = (size) => {
        try {
            console.log(0);
            return napi[`caml_${f}_srs_create_parallel`](size);
        }
        catch (error) {
            console.error(`Error in SRS get for field ${f}`);
            throw error;
        }
    };
    let getSrs = (srs) => {
        try {
            let v = napi[`caml_${f}_srs_get`](srs);
            return v;
        }
        catch (error) {
            console.error(`Error in SRS get for field ${f}`);
            throw error;
        }
    };
    let isEmptySrs = (srs) => {
        try {
            let points = getSrs(srs);
            return points == null || points.length <= 1;
        }
        catch {
            return true;
        }
    };
    let setSrs = (bytes) => {
        try {
            console.log(2);
            return napi[`caml_${f}_srs_set`](bytes);
        }
        catch (error) {
            console.error(`Error in SRS set for field ${f} args ${bytes}`);
            throw error;
        }
    };
    let maybeLagrangeCommitment = (srs, domain_size, i) => {
        try {
            /*let bytes = (napi as any)[`caml_${f}_srs_to_bytes`](srs);
            console.log('bytes', bytes);
            let wasmSrs = undefined;
            if (f === 'fp') wasmSrs = (napi as any)[`caml_${f}_srs_from_bytes`](bytes);
            else wasmSrs = (napi as any)[`caml_fq_srs_from_bytes`](bytes);
            */
            let s = napi[`caml_${f}_srs_maybe_lagrange_commitment`](srs, domain_size, i);
            return s;
        }
        catch (error) {
            console.error(`Error in SRS maybe lagrange commitment for field ${f}`);
            throw error;
        }
    };
    let lagrangeCommitment = (srs, domain_size, i) => {
        try {
            return napi[`caml_${f}_srs_lagrange_commitment`](srs, domain_size, i);
        }
        catch (error) {
            console.error(`Error in SRS lagrange commitment for field ${f}`);
            throw error;
        }
    };
    let setLagrangeBasis = (srs, domain_size, input) => {
        try {
            console.log(6);
            return napi[`caml_${f}_srs_set_lagrange_basis`](srs, domain_size, input);
        }
        catch (error) {
            console.error(`Error in SRS set lagrange basis for field ${f}`);
            throw error;
        }
    };
    let getLagrangeBasis = (srs, n) => {
        try {
            return napi[`caml_${f}_srs_get_lagrange_basis`](srs, n);
        }
        catch (error) {
            console.error(`Error in SRS get lagrange basis for field ${f}`);
            throw error;
        }
    };
    return {
        /**
         * returns existing stored SRS or falls back to creating a new one
         */
        create(size) {
            let srs = srsStore[f][size];
            if (srs !== undefined && isEmptySrs(srs)) {
                delete srsStore[f][size];
                srs = undefined;
            }
            if (srs === undefined) {
                console.log('SRS not in memory, creating or reading from cache');
                if (cache === undefined) {
                    // if there is no cache, create SRS in memory
                    console.log('Creating SRS without cache');
                    srs = createSrs(size);
                    console.log('SRS created without cache:', srs);
                }
                else {
                    let header = cacheHeaderSrs(f, size);
                    // try to read SRS from cache / recompute and write if not found
                    console.log('Reading SRS from cache');
                    srs = readCache(cache, header, (bytes) => {
                        // TODO: this takes a bit too long, about 300ms for 2^16
                        // `pointsToRust` is the clear bottleneck
                        let jsonSrs = JSON.parse(new TextDecoder().decode(bytes));
                        let mlSrs = MlArray.mapTo(jsonSrs, OrInfinity.fromJSON);
                        let wasmSrs = conversion[f].pointsToRust(mlSrs);
                        let candidate = setSrs(wasmSrs);
                        if (isEmptySrs(candidate))
                            return undefined;
                        return candidate;
                    });
                    console.log('SRS read from cache:', srs);
                    if (srs === undefined) {
                        // not in cache
                        console.log(1);
                        srs = createSrs(size);
                        console.log('Writing SRS to cache', srs);
                        if (cache.canWrite) {
                            console.log(2);
                            let wasmSrs = getSrs(srs);
                            console.log(3);
                            let mlSrs = conversion[f].pointsFromRust(wasmSrs);
                            let jsonSrs = MlArray.mapFrom(mlSrs, OrInfinity.toJSON);
                            let bytes = new TextEncoder().encode(JSON.stringify(jsonSrs));
                            writeCache(cache, header, bytes);
                        }
                    }
                }
                console.log('Storing SRS in memory');
                srsStore[f][size] = srs;
                console.log('SRS stored in memory:', srs);
            }
            // TODO should we call freeOnFinalize() and expose a function to clean the SRS cache?
            console.trace('Returning SRS:', srs);
            return srsStore[f][size];
        },
        /**
         * returns ith Lagrange basis commitment for a given domain size
         */
        lagrangeCommitment(srs, domainSize, i) {
            console.log('lagrangeCommitment');
            // happy, fast case: if basis is already stored on the srs, return the ith commitment
            let commitment = maybeLagrangeCommitment(srs, domainSize, i);
            if (commitment === undefined || commitment === null) {
                console.log('comm was undefined');
                if (cache === undefined) {
                    // if there is no cache, recompute and store basis in memory
                    commitment = lagrangeCommitment(srs, domainSize, i);
                }
                else {
                    // try to read lagrange basis from cache / recompute and write if not found
                    let header = cacheHeaderLagrange(f, domainSize);
                    let didRead = readCacheLazy(cache, header, conversion, f, srs, domainSize, setLagrangeBasis);
                    if (didRead !== true) {
                        // not in cache
                        if (cache.canWrite) {
                            // TODO: this code path will throw on the web since `caml_${f}_srs_get_lagrange_basis` is not properly implemented
                            // using a writable cache in the browser seems to be fairly uncommon though, so it's at least an 80/20 solution
                            console.log('before napiComms');
                            let napiComms = getLagrangeBasis(srs, domainSize);
                            console.log('napiComms', napiComms);
                            let mlComms = conversion[f].polyCommsFromRust(napiComms);
                            console.log('mlComms', mlComms);
                            let comms = polyCommsToJSON(mlComms);
                            let bytes = new TextEncoder().encode(JSON.stringify(comms));
                            writeCache(cache, header, bytes);
                        }
                        else {
                            lagrangeCommitment(srs, domainSize, i);
                        }
                    }
                    // here, basis is definitely stored on the srs
                    let c = maybeLagrangeCommitment(srs, domainSize, i);
                    assert(c !== undefined, 'commitment exists after setting');
                    commitment = c;
                }
            }
            // edge case for when we have a writeable cache and the basis was already stored on the srs
            // but we didn't store it in the cache separately yet
            if (commitment && cache && cache.canWrite) {
                let header = cacheHeaderLagrange(f, domainSize);
                let didRead = readCacheLazy(cache, header, conversion, f, srs, domainSize, setLagrangeBasis);
                // only proceed for entries we haven't written to the cache yet
                if (didRead !== true) {
                    // same code as above - write the lagrange basis to the cache if it wasn't there already
                    // currently we re-generate the basis via `getLagrangeBasis` - we could derive this from the
                    // already existing `commitment` instead, but this is simpler and the performance impact is negligible
                    let napiComms = getLagrangeBasis(srs, domainSize);
                    let mlComms = conversion[f].polyCommsFromRust(napiComms);
                    let comms = polyCommsToJSON(mlComms);
                    let bytes = new TextEncoder().encode(JSON.stringify(comms));
                    writeCache(cache, header, bytes);
                }
            }
            return conversion[f].polyCommFromRust(commitment);
        },
        /**
         * Returns the Lagrange basis commitments for the whole domain
         */
        lagrangeCommitmentsWholeDomain(srs, domainSize) {
            try {
                let napiComms = napi[`caml_${f}_srs_lagrange_commitments_whole_domain_ptr`](srs, domainSize);
                let mlComms = conversion[f].polyCommsFromRust(napiComms);
                return mlComms;
            }
            catch (error) {
                console.error(`Error in SRS lagrange commitments whole domain ptr for field ${f}`);
                throw error;
            }
        },
        /**
         * adds Lagrange basis for a given domain size
         */
        addLagrangeBasis(srs, logSize) {
            console.log('addLagrangeBasis');
            // this ensures that basis is stored on the srs, no need to duplicate caching logic
            this.lagrangeCommitment(srs, 1 << logSize, 0);
        },
    };
}
function polyCommsToJSON(comms) {
    return MlArray.mapFrom(comms, ([, elems]) => {
        return {
            shifted: MlArray.mapFrom(elems, OrInfinity.toJSON),
            unshifted: undefined,
        };
    });
}
function polyCommsFromJSON(json) {
    return MlArray.mapTo(json, ({ shifted, unshifted }) => {
        return [0, MlArray.mapTo(shifted, OrInfinity.fromJSON)];
    });
}
function readCacheLazy(cache, header, conversion, f, srs, domainSize, setLagrangeBasis) {
    if (CacheReadRegister.get(header.uniqueId) === true)
        return true;
    return readCache(cache, header, (bytes) => {
        let comms = JSON.parse(new TextDecoder().decode(bytes));
        let mlComms = polyCommsFromJSON(comms);
        let napiComms = conversion[f].polyCommsToRust(mlComms);
        setLagrangeBasis(srs, domainSize, napiComms);
        CacheReadRegister.set(header.uniqueId, true);
        return true;
    });
}
function runInTryCatch(fn) {
    return function (...args) {
        try {
            return fn(...args);
        }
        catch (e) {
            console.error(`Error in SRS function ${fn.name} with args:`, args);
            throw e;
        }
    };
}
//# sourceMappingURL=napi-srs.js.map
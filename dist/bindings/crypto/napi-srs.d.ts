import { MlArray } from '../../lib/ml/base.js';
import { type Cache } from '../../lib/proof-system/cache.js';
import { type WasmFpSrs, type WasmFqSrs } from '../compiled/node_bindings/plonk_wasm.cjs';
import type { Napi, RustConversion } from './bindings.js';
import { PolyComm } from './bindings/kimchi-types.js';
export { setSrsCache, srs, unsetSrsCache };
type NapiSrs = WasmFpSrs | WasmFqSrs;
declare function setSrsCache(c: Cache): void;
declare function unsetSrsCache(): void;
declare function srs(napi: Napi, conversion: RustConversion): {
    fp: {
        /**
         * returns existing stored SRS or falls back to creating a new one
         */
        create(size: number): NapiSrs;
        /**
         * returns ith Lagrange basis commitment for a given domain size
         */
        lagrangeCommitment(srs: NapiSrs, domainSize: number, i: number): PolyComm;
        /**
         * Returns the Lagrange basis commitments for the whole domain
         */
        lagrangeCommitmentsWholeDomain(srs: NapiSrs, domainSize: number): MlArray<PolyComm>;
        /**
         * adds Lagrange basis for a given domain size
         */
        addLagrangeBasis(srs: NapiSrs, logSize: number): void;
    };
    fq: {
        /**
         * returns existing stored SRS or falls back to creating a new one
         */
        create(size: number): NapiSrs;
        /**
         * returns ith Lagrange basis commitment for a given domain size
         */
        lagrangeCommitment(srs: NapiSrs, domainSize: number, i: number): PolyComm;
        /**
         * Returns the Lagrange basis commitments for the whole domain
         */
        lagrangeCommitmentsWholeDomain(srs: NapiSrs, domainSize: number): MlArray<PolyComm>;
        /**
         * adds Lagrange basis for a given domain size
         */
        addLagrangeBasis(srs: NapiSrs, logSize: number): void;
    };
};

import { mapTuple } from './util.js';
import { affineFromRust, affineToRust, fieldsFromRustFlat, fieldsToRustFlat, } from './conversion-base.js';
export { conversionCore, freeOnFinalize, intoRaw, mapFromUintArray, mapToUint32Array, };
function conversionCore(wasm) {
    const fp = conversionCorePerField(wasm, {
        CommitmentCurve: wasm.WasmGVesta,
        makeAffine: wasm.caml_vesta_affine_one,
        Gate: wasm.WasmFpGate,
        PolyComm: wasm.WasmFpPolyComm,
    });
    const fq = conversionCorePerField(wasm, {
        CommitmentCurve: wasm.WasmGPallas,
        makeAffine: wasm.caml_pallas_affine_one,
        Gate: wasm.WasmFqGate,
        PolyComm: wasm.WasmFqPolyComm,
    });
    return {
        fp,
        fq,
        wireToRust: fp.wireToRust, // doesn't depend on the field
        mapMlArrayToRustVector([, ...array], map) {
            // Transfer ownership to Rust when the wasm-bindgen wrapper supports it.
            return mapToUint32Array(array, (x) => intoRaw(map(x)));
        },
    };
}
function conversionCorePerField(wasm, { CommitmentCurve, makeAffine, Gate, PolyComm }) {
    let self = {
        wireToRust([, row, col]) {
            return wasm.Wire.create(row, col);
        },
        vectorToRust: fieldsToRustFlat,
        vectorFromRust: fieldsFromRustFlat,
        gateToRust(gate) {
            let [, typ, [, ...wires], coeffs] = gate;
            let rustWires = new wasm.WasmGateWires(...mapTuple(wires, self.wireToRust));
            let rustCoeffs = fieldsToRustFlat(coeffs);
            return new Gate(typ, rustWires, rustCoeffs);
        },
        gateFromRust(wasmGate) {
            // note: this was never used and the old implementation was wrong
            // (accessed non-existent fields on wasmGate)
            throw Error('gateFromRust not implemented');
        },
        pointToRust(point) {
            return affineToRust(point, makeAffine);
        },
        pointFromRust: affineFromRust,
        pointsToRust([, ...points]) {
            return mapToUint32Array(points, (point) => intoRaw(self.pointToRust(point)));
        },
        pointsFromRust(points) {
            let arr = mapFromUintArray(points, (ptr) => affineFromRust(wrap(ptr, CommitmentCurve)));
            return [0, ...arr];
        },
        polyCommToRust(polyComm) {
            let [, camlElems] = polyComm;
            let rustShifted = undefined;
            let rustUnshifted = self.pointsToRust(camlElems);
            return new PolyComm(rustUnshifted, rustShifted);
        },
        polyCommFromRust(polyComm) {
            let rustUnshifted = polyComm.unshifted;
            let mlUnshifted = mapFromUintArray(rustUnshifted, (ptr) => {
                return affineFromRust(wrap(ptr, CommitmentCurve));
            });
            // Real wasm-bindgen wrappers own resources and should be released now.
            // Synthetic wrappers created by `wrap()` only borrow raw pointers and
            // must not call free().
            if (!polyComm.__o1js_wrapped_ptr && typeof polyComm.free === 'function') {
                polyComm.free();
            }
            return [0, [0, ...mlUnshifted]];
        },
        polyCommsToRust([, ...comms]) {
            return mapToUint32Array(comms, (c) => intoRaw(self.polyCommToRust(c)));
        },
        polyCommsFromRust(rustComms) {
            let comms = mapFromUintArray(rustComms, (ptr) => self.polyCommFromRust(wrap(ptr, PolyComm)));
            return [0, ...comms];
        },
    };
    return self;
}
function wrap(ptr, Class) {
    const obj = Object.create(Class.prototype);
    obj.__wbg_ptr = ptr;
    obj.__o1js_wrapped_ptr = true;
    return obj;
}
function unwrap(obj) {
    // Beware: caller may need to do finalizer things to avoid these
    // pointers disappearing out from under us.
    let ptr = obj.__wbg_ptr;
    if (ptr === undefined)
        throw Error('unwrap: missing ptr');
    return ptr;
}
// Return a pointer suitable for passing to Rust FFI.
// - wasm-bindgen wrappers: call `__destroy_into_raw()` to transfer ownership
//   to Rust and detach JS-side finalization.
// - plain pointer wrappers (no destroy hook): fall back to `unwrap()`.
// This prevents JS and Rust from both believing they own the same allocation.
function intoRaw(obj) {
    let destroyIntoRaw = obj?.__destroy_into_raw;
    if (typeof destroyIntoRaw === 'function')
        return destroyIntoRaw.call(obj);
    return unwrap(obj);
}
const registry = new FinalizationRegistry((ptr) => {
    ptr.free();
});
function freeOnFinalize(instance) {
    let ptr = instance.__wbg_ptr;
    if (typeof instance.__destroy_into_raw === 'function') {
        instance.__destroy_into_raw();
        instance.__wbg_ptr = ptr;
    }
    let instanceRepresentative = wrap(ptr, instance.constructor);
    registry.register(instance, instanceRepresentative, instance);
    return instance;
}
function mapFromUintArray(array, map) {
    let n = array.length;
    let result = Array(n);
    for (let i = 0; i < n; i++) {
        result[i] = map(array[i]);
    }
    return result;
}
function mapToUint32Array(array, map) {
    let n = array.length;
    let result = new Uint32Array(n);
    for (let i = 0; i < n; i++) {
        result[i] = map(array[i]);
    }
    return result;
}
//# sourceMappingURL=conversion-core.js.map
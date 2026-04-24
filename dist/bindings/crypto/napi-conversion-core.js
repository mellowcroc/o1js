import { fieldFromRust, fieldToRust, fieldsFromRustFlat, fieldsToRustFlat, } from './bindings/conversion-base.js';
import { mapTuple } from './bindings/util.js';
export { napiConversionCore };
function napiConversionCore(napi) {
    const fpCore = conversionCorePerField({
        CommitmentCurve: napi.WasmGVesta,
        makeAffine: napi.caml_vesta_affine_one,
        PolyComm: napi.WasmFpPolyComm,
    });
    const fqCore = conversionCorePerField({
        CommitmentCurve: napi.WasmGPallas,
        makeAffine: napi.caml_pallas_affine_one,
        PolyComm: napi.WasmFqPolyComm,
    });
    const shared = {
        vectorToRust: (fields) => fieldsToRustFlat(fields),
        vectorFromRust: fieldsFromRustFlat,
        wireToRust([, row, col]) {
            return { row, col };
        },
        lookupTablesToRust([, ...tables]) {
            return tables;
        },
        runtimeTableCfgsToRust([, ...tables]) {
            return tables.map((table) => Array.from(table));
        },
        gateToRust(gate) {
            const [, typ, [, ...wires], coeffs] = gate;
            const mapped = mapTuple(wires, (wire) => this.wireToRust(wire));
            const nativeWires = {
                w0: mapped[0],
                w1: mapped[1],
                w2: mapped[2],
                w3: mapped[3],
                w4: mapped[4],
                w5: mapped[5],
                w6: mapped[6],
            };
            return {
                typ,
                wires: nativeWires,
                coeffs: Array.from(fieldsToRustFlat(coeffs)),
            };
        },
    };
    return {
        fp: {
            ...fpCore,
        },
        fq: {
            ...fqCore,
        },
        ...shared,
    };
}
function conversionCorePerField({ makeAffine, PolyComm }) {
    const vectorToRust = (fields) => fieldsToRustFlat(fields);
    const vectorFromRust = fieldsFromRustFlat;
    const wireToRust = ([, row, col]) => ({ row, col });
    const wireFromRust = ({ row, col }) => [0, row, col];
    const gateToRust = (gate) => {
        const [, typ, [, ...wires], coeffs] = gate;
        const mapped = mapTuple(wires, wireToRust);
        const nativeWires = {
            w0: mapped[0],
            w1: mapped[1],
            w2: mapped[2],
            w3: mapped[3],
            w4: mapped[4],
            w5: mapped[5],
            w6: mapped[6],
        };
        return {
            typ,
            wires: nativeWires,
            coeffs: Array.from(fieldsToRustFlat(coeffs)),
        };
    };
    const gateFromRust = (gate) => {
        const { w0, w1, w2, w3, w4, w5, w6 } = gate.wires;
        const wiresTuple = [
            0,
            wireFromRust(w0),
            wireFromRust(w1),
            wireFromRust(w2),
            wireFromRust(w3),
            wireFromRust(w4),
            wireFromRust(w5),
            wireFromRust(w6),
        ];
        const coeffBytes = gate.coeffs instanceof Uint8Array ? gate.coeffs : Uint8Array.from(gate.coeffs);
        const coeffs = fieldsFromRustFlat(coeffBytes);
        return [0, gate.typ, wiresTuple, coeffs];
    };
    const toNodeBuffer = (bytes) => {
        const maybeBuffer = globalThis.Buffer;
        return typeof maybeBuffer?.from === 'function' ? maybeBuffer.from(bytes) : bytes;
    };
    const affineToRust = (pt) => {
        function isFinitePoint(point) {
            return Array.isArray(point);
        }
        let res = makeAffine();
        if (!isFinitePoint(pt)) {
            res.infinity = true;
        }
        else {
            const [, pair] = pt;
            const [, x, y] = pair;
            // `WasmGVesta` / `WasmGPallas` are `#[napi(object)]` (plain JS objects), so assigning the
            // same backing buffer to both `x` and `y` corrupts the point. Always use distinct byte
            // arrays for each coordinate.
            res.x = toNodeBuffer(fieldToRust(x));
            res.y = toNodeBuffer(fieldToRust(y));
        }
        return res;
    };
    const affineFromRust = (pt) => {
        if (pt.infinity)
            return 0;
        //
        //
        //
        const xField = fieldFromRust(pt.x);
        const yField = fieldFromRust(pt.y);
        return [0, [0, xField, yField]];
    };
    const pointToRust = (point) => affineToRust(point);
    const pointFromRust = (point) => affineFromRust(point);
    const pointsToRust = ([, ...points]) => points.map(affineToRust);
    const pointsFromRust = (points) => [
        0,
        ...points.map(affineFromRust),
    ];
    const polyCommToRust = (polyComm) => {
        const [, camlElems] = polyComm;
        const unshifted = pointsToRust(camlElems);
        const PolyCommClass = PolyComm;
        return new PolyCommClass(unshifted, undefined);
    };
    const polyCommFromRust = (polyComm) => {
        if (polyComm == null) {
            console.log('DEBUG polyCommFromRust: polyComm is null/undefined, returning undefined');
            return undefined;
        }
        console.log('DEBUG polyCommFromRust: polyComm:', polyComm);
        console.log('DEBUG polyCommFromRust: polyComm.unshifted:', polyComm.unshifted);
        const rustUnshifted = asArrayLike(polyComm.unshifted, 'polyComm.unshifted');
        console.log('DEBUG polyCommFromRust: rustUnshifted length:', rustUnshifted.length);
        const mlUnshifted = rustUnshifted.map(affineFromRust);
        return [0, [0, ...mlUnshifted]];
    };
    const polyCommsToRust = ([, ...comms]) => comms.map(polyCommToRust);
    const polyCommsFromRust = (rustComms) => {
        console.log('DEBUG polyCommsFromRust: rustComms:', rustComms);
        console.log('DEBUG polyCommsFromRust: rustComms type:', typeof rustComms);
        if (rustComms == null) {
            throw Error('polyCommsFromRust: expected array-like native values');
        }
        const comms = asArrayLike(rustComms, 'polyCommsFromRust');
        console.log('DEBUG polyCommsFromRust: comms length:', comms.length);
        console.log('DEBUG polyCommsFromRust: comms has null?', comms.some(x => x == null));
        const result = [0, ...comms.map(polyCommFromRust)];
        console.log('DEBUG polyCommsFromRust: result has undefined?', result.some(x => x === undefined));
        return result;
    };
    return {
        vectorToRust,
        vectorFromRust,
        wireToRust,
        gateToRust,
        gateFromRust,
        affineToRust,
        affineFromRust,
        pointToRust,
        pointFromRust,
        pointsToRust,
        pointsFromRust,
        polyCommToRust,
        polyCommFromRust,
        polyCommsToRust,
        polyCommsFromRust,
    };
}
function asArrayLike(value, context) {
    if (value == null)
        return [];
    if (Array.isArray(value))
        return value;
    if (ArrayBuffer.isView(value))
        return Array.from(value);
    if (typeof value === 'object' && value !== null && 'length' in value) {
        const { length } = value;
        if (typeof length === 'number')
            return Array.from(value);
    }
    throw Error(`${context}: expected array-like native values`);
}
//# sourceMappingURL=napi-conversion-core.js.map
import { MlArray } from '../../lib/ml/base.js';
import type * as napiNamespace from '../compiled/node_bindings/plonk_wasm.cjs';
import { fieldsFromRustFlat } from './bindings/conversion-base.js';
import { Field, Gate, LookupTable, OrInfinity, PolyComm, Wire } from './bindings/kimchi-types.js';
export { ConversionCore, ConversionCores, napiConversionCore };
type ConversionCore = ReturnType<typeof conversionCorePerField>;
type ConversionCores = ReturnType<typeof napiConversionCore>;
type NapiAffine = napiNamespace.WasmGVesta | napiNamespace.WasmGPallas;
type NapiPolyComm = {
    unshifted: unknown;
    shifted?: NapiAffine | undefined;
};
type NapiClasses = {
    CommitmentCurve: typeof napiNamespace.WasmGVesta | typeof napiNamespace.WasmGPallas;
    makeAffine: () => NapiAffine;
    PolyComm: napiNamespace.WasmFpPolyComm | napiNamespace.WasmFqPolyComm;
};
declare function napiConversionCore(napi: any): {
    vectorToRust: (fields: any) => Uint8Array;
    vectorFromRust: typeof fieldsFromRustFlat;
    wireToRust([, row, col]: Wire): {
        row: number;
        col: number;
    };
    lookupTablesToRust([, ...tables]: MlArray<LookupTable>): LookupTable[];
    runtimeTableCfgsToRust([, ...tables]: MlArray<Uint8Array>): number[][];
    gateToRust(gate: Gate): any;
    fp: {
        vectorToRust: (fields: MlArray<Field>) => Uint8Array;
        vectorFromRust: typeof fieldsFromRustFlat;
        wireToRust: ([, row, col]: Wire) => {
            row: number;
            col: number;
        };
        gateToRust: (gate: Gate) => {
            typ: number;
            wires: {
                readonly w0: {
                    row: number;
                    col: number;
                };
                readonly w1: {
                    row: number;
                    col: number;
                };
                readonly w2: {
                    row: number;
                    col: number;
                };
                readonly w3: {
                    row: number;
                    col: number;
                };
                readonly w4: {
                    row: number;
                    col: number;
                };
                readonly w5: {
                    row: number;
                    col: number;
                };
                readonly w6: {
                    row: number;
                    col: number;
                };
            };
            coeffs: number[];
        };
        gateFromRust: (gate: {
            typ: number;
            wires: {
                w0: {
                    row: number;
                    col: number;
                };
                w1: {
                    row: number;
                    col: number;
                };
                w2: {
                    row: number;
                    col: number;
                };
                w3: {
                    row: number;
                    col: number;
                };
                w4: {
                    row: number;
                    col: number;
                };
                w5: {
                    row: number;
                    col: number;
                };
                w6: {
                    row: number;
                    col: number;
                };
            };
            coeffs: number[] | Uint8Array;
        }) => Gate;
        affineToRust: (pt: OrInfinity) => NapiAffine;
        affineFromRust: (pt: NapiAffine) => OrInfinity;
        pointToRust: (point: OrInfinity) => NapiAffine;
        pointFromRust: (point: NapiAffine) => OrInfinity;
        pointsToRust: ([, ...points]: MlArray<OrInfinity>) => NapiAffine[];
        pointsFromRust: (points: NapiAffine[]) => MlArray<OrInfinity>;
        polyCommToRust: (polyComm: PolyComm) => NapiPolyComm;
        polyCommFromRust: (polyComm: any) => any;
        polyCommsToRust: ([, ...comms]: MlArray<PolyComm>) => NapiPolyComm[];
        polyCommsFromRust: (rustComms: unknown) => MlArray<PolyComm>;
    };
    fq: {
        vectorToRust: (fields: MlArray<Field>) => Uint8Array;
        vectorFromRust: typeof fieldsFromRustFlat;
        wireToRust: ([, row, col]: Wire) => {
            row: number;
            col: number;
        };
        gateToRust: (gate: Gate) => {
            typ: number;
            wires: {
                readonly w0: {
                    row: number;
                    col: number;
                };
                readonly w1: {
                    row: number;
                    col: number;
                };
                readonly w2: {
                    row: number;
                    col: number;
                };
                readonly w3: {
                    row: number;
                    col: number;
                };
                readonly w4: {
                    row: number;
                    col: number;
                };
                readonly w5: {
                    row: number;
                    col: number;
                };
                readonly w6: {
                    row: number;
                    col: number;
                };
            };
            coeffs: number[];
        };
        gateFromRust: (gate: {
            typ: number;
            wires: {
                w0: {
                    row: number;
                    col: number;
                };
                w1: {
                    row: number;
                    col: number;
                };
                w2: {
                    row: number;
                    col: number;
                };
                w3: {
                    row: number;
                    col: number;
                };
                w4: {
                    row: number;
                    col: number;
                };
                w5: {
                    row: number;
                    col: number;
                };
                w6: {
                    row: number;
                    col: number;
                };
            };
            coeffs: number[] | Uint8Array;
        }) => Gate;
        affineToRust: (pt: OrInfinity) => NapiAffine;
        affineFromRust: (pt: NapiAffine) => OrInfinity;
        pointToRust: (point: OrInfinity) => NapiAffine;
        pointFromRust: (point: NapiAffine) => OrInfinity;
        pointsToRust: ([, ...points]: MlArray<OrInfinity>) => NapiAffine[];
        pointsFromRust: (points: NapiAffine[]) => MlArray<OrInfinity>;
        polyCommToRust: (polyComm: PolyComm) => NapiPolyComm;
        polyCommFromRust: (polyComm: any) => any;
        polyCommsToRust: ([, ...comms]: MlArray<PolyComm>) => NapiPolyComm[];
        polyCommsFromRust: (rustComms: unknown) => MlArray<PolyComm>;
    };
};
declare function conversionCorePerField({ makeAffine, PolyComm }: NapiClasses): {
    vectorToRust: (fields: MlArray<Field>) => Uint8Array;
    vectorFromRust: typeof fieldsFromRustFlat;
    wireToRust: ([, row, col]: Wire) => {
        row: number;
        col: number;
    };
    gateToRust: (gate: Gate) => {
        typ: number;
        wires: {
            readonly w0: {
                row: number;
                col: number;
            };
            readonly w1: {
                row: number;
                col: number;
            };
            readonly w2: {
                row: number;
                col: number;
            };
            readonly w3: {
                row: number;
                col: number;
            };
            readonly w4: {
                row: number;
                col: number;
            };
            readonly w5: {
                row: number;
                col: number;
            };
            readonly w6: {
                row: number;
                col: number;
            };
        };
        coeffs: number[];
    };
    gateFromRust: (gate: {
        typ: number;
        wires: {
            w0: {
                row: number;
                col: number;
            };
            w1: {
                row: number;
                col: number;
            };
            w2: {
                row: number;
                col: number;
            };
            w3: {
                row: number;
                col: number;
            };
            w4: {
                row: number;
                col: number;
            };
            w5: {
                row: number;
                col: number;
            };
            w6: {
                row: number;
                col: number;
            };
        };
        coeffs: Uint8Array | number[];
    }) => Gate;
    affineToRust: (pt: OrInfinity) => NapiAffine;
    affineFromRust: (pt: NapiAffine) => OrInfinity;
    pointToRust: (point: OrInfinity) => NapiAffine;
    pointFromRust: (point: NapiAffine) => OrInfinity;
    pointsToRust: ([, ...points]: MlArray<OrInfinity>) => NapiAffine[];
    pointsFromRust: (points: NapiAffine[]) => MlArray<OrInfinity>;
    polyCommToRust: (polyComm: PolyComm) => NapiPolyComm;
    polyCommFromRust: (polyComm: any) => any;
    polyCommsToRust: ([, ...comms]: MlArray<PolyComm>) => NapiPolyComm[];
    polyCommsFromRust: (rustComms: unknown) => MlArray<PolyComm>;
};

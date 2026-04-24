import type * as napiNamespace from '../../compiled/node_bindings/plonk_wasm.cjs';
import type { WasmFpOracles, WasmFqOracles } from '../../compiled/node_bindings/plonk_wasm.cjs';
import { Oracles } from './kimchi-types.js';
export { napiOraclesConversion };
type napi = typeof napiNamespace;
type NapiOracles = WasmFpOracles | WasmFqOracles;
declare function napiOraclesConversion(napi: napi): {
    fp: {
        oraclesToRust(oracles: Oracles): NapiOracles;
        oraclesFromRust(oracles: NapiOracles): Oracles;
    };
    fq: {
        oraclesToRust(oracles: Oracles): NapiOracles;
        oraclesFromRust(oracles: NapiOracles): Oracles;
    };
};

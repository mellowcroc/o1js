import { MlArray } from '../../lib/ml/base.js';
import type { WasmFpPlonkVerifierIndex, WasmFpShifts, WasmFqPlonkVerifierIndex, WasmFqShifts } from '../compiled/node_bindings/plonk_wasm.cjs';
import { Field, VerifierIndex } from './bindings/kimchi-types.js';
import { ConversionCores } from './napi-conversion-core.js';
export { napiVerifierIndexConversion };
type NapiShifts = WasmFpShifts | WasmFqShifts;
type NapiVerifierIndex = WasmFpPlonkVerifierIndex | WasmFqPlonkVerifierIndex;
declare function napiVerifierIndexConversion(napi: any, core: ConversionCores): {
    fp: {
        shiftsToRust([, ...shifts]: MlArray<Field>): NapiShifts;
        shiftsFromRust(s: NapiShifts): MlArray<Field>;
        verifierIndexToRust(vk: VerifierIndex): NapiVerifierIndex;
        verifierIndexFromRust(vk: NapiVerifierIndex): VerifierIndex;
    };
    fq: {
        shiftsToRust([, ...shifts]: MlArray<Field>): NapiShifts;
        shiftsFromRust(s: NapiShifts): MlArray<Field>;
        verifierIndexToRust(vk: VerifierIndex): NapiVerifierIndex;
        verifierIndexFromRust(vk: NapiVerifierIndex): VerifierIndex;
    };
};

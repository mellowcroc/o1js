import { MlArray } from '../../lib/ml/base.js';
import type * as napiNamespace from '../compiled/node_bindings/plonk_wasm.cjs';
import type { WasmFpProverProof, WasmFpRuntimeTable, WasmFqProverProof, WasmFqRuntimeTable, WasmPastaFpLookupTable, WasmPastaFpRuntimeTableCfg, WasmPastaFqLookupTable, WasmPastaFqRuntimeTableCfg } from '../compiled/node_bindings/plonk_wasm.cjs';
import type { LookupTable, ProofWithPublic, RuntimeTable, RuntimeTableCfg } from './bindings/kimchi-types.js';
import { ConversionCores } from './napi-conversion-core.js';
export { napiProofConversion };
type napi = typeof napiNamespace;
type NapiProverProof = WasmFpProverProof | WasmFqProverProof;
type NapiRuntimeTable = WasmFpRuntimeTable | WasmFqRuntimeTable;
type NapiRuntimeTableCfg = WasmPastaFpRuntimeTableCfg | WasmPastaFqRuntimeTableCfg;
type NapiLookupTable = WasmPastaFpLookupTable | WasmPastaFqLookupTable;
declare function napiProofConversion(napi: napi, core: ConversionCores): {
    fp: {
        proofToRust([, public_evals, proof]: ProofWithPublic): NapiProverProof;
        proofFromRust(wasmProof: any): ProofWithPublic;
        runtimeTablesToRust([, ...tables]: MlArray<RuntimeTable>): NapiRuntimeTable[];
        runtimeTableCfgsToRust([, ...tableCfgs]: MlArray<RuntimeTableCfg>): NapiRuntimeTableCfg[];
        lookupTablesToRust([, ...tables]: MlArray<LookupTable>): NapiLookupTable[];
    };
    fq: {
        proofToRust([, public_evals, proof]: ProofWithPublic): NapiProverProof;
        proofFromRust(wasmProof: any): ProofWithPublic;
        runtimeTablesToRust([, ...tables]: MlArray<RuntimeTable>): NapiRuntimeTable[];
        runtimeTableCfgsToRust([, ...tableCfgs]: MlArray<RuntimeTableCfg>): NapiRuntimeTableCfg[];
        lookupTablesToRust([, ...tables]: MlArray<LookupTable>): NapiLookupTable[];
    };
};

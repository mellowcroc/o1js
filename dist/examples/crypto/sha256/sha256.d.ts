export { Bytes12, SHA256Program };
declare const Bytes12_base: typeof import("../../../../dist/node/lib/provable/bytes.js").Bytes;
declare class Bytes12 extends Bytes12_base {
}
declare let SHA256Program: {
    name: string;
    maxProofsVerified(): Promise<0 | 2 | 1>;
    compile: (options?: {
        cache?: import("o1js").Cache | undefined;
        forceRecompile?: boolean | undefined;
        proofsEnabled?: boolean | undefined;
        withRuntimeTables?: boolean | undefined;
        numChunks?: number | undefined;
        lazyMode?: boolean | undefined;
    } | undefined) => Promise<{
        verificationKey: {
            data: string;
            hash: import("../../../../dist/node/lib/provable/field.js").Field;
        };
    }>;
    verify: (proof: import("o1js").Proof<undefined, import("../../../../dist/node/lib/provable/bytes.js").Bytes>) => Promise<boolean>;
    digest: () => Promise<string>;
    analyzeMethods: () => Promise<{
        sha256: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
    }>;
    analyzeSingleMethod<K extends "sha256">(methodName: K): Promise<import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
        proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
    }>;
    publicInputType: import("o1js").ProvablePureExtended<undefined, undefined, null>;
    publicOutputType: import("o1js").ProvablePureExtended<import("../../../../dist/node/lib/provable/bytes.js").Bytes, {
        bytes: {
            value: bigint;
        }[];
    }, {
        bytes: {
            value: string;
        }[];
    }>;
    privateInputTypes: {
        sha256: [typeof Bytes12];
    };
    auxiliaryOutputTypes: {
        sha256: undefined;
    };
    rawMethods: {
        sha256: (args_0: import("../../../../dist/node/lib/provable/bytes.js").Bytes) => Promise<{
            publicOutput: import("../../../../dist/node/lib/provable/bytes.js").Bytes;
        }>;
    };
    Proof: {
        new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
            proof: unknown;
            publicInput: undefined;
            publicOutput: import("../../../../dist/node/lib/provable/bytes.js").Bytes;
            maxProofsVerified: 0 | 2 | 1;
        }): import("o1js").Proof<undefined, import("../../../../dist/node/lib/provable/bytes.js").Bytes>;
        fromJSON<S extends import("../../../../dist/node/lib/util/types.js").Subclass<typeof import("o1js").Proof>>(this: S, { maxProofsVerified, proof: proofString, publicInput: publicInputJson, publicOutput: publicOutputJson, }: import("o1js").JsonProof): Promise<import("o1js").Proof<import("o1js").InferProvable<S["publicInputType"]>, import("o1js").InferProvable<S["publicOutputType"]>>>;
        dummy<Input, OutPut>(publicInput: Input, publicOutput: OutPut, maxProofsVerified: 0 | 2 | 1, domainLog2?: number | undefined): Promise<import("o1js").Proof<Input, OutPut>>;
        readonly provable: {
            toFields: (value: import("o1js").Proof<any, any>) => import("../../../../dist/node/lib/provable/field.js").Field[];
            toAuxiliary: (value?: import("o1js").Proof<any, any> | undefined) => any[];
            fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[], aux: any[]) => import("o1js").Proof<any, any>;
            sizeInFields(): number;
            check: (value: import("o1js").Proof<any, any>) => void;
            toValue: (x: import("o1js").Proof<any, any>) => import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>;
            fromValue: (x: import("o1js").Proof<any, any> | import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>) => import("o1js").Proof<any, any>;
            toCanonical?: ((x: import("o1js").Proof<any, any>) => import("o1js").Proof<any, any>) | undefined;
        };
        publicInputType: import("o1js").FlexibleProvable<any>;
        publicOutputType: import("o1js").FlexibleProvable<any>;
        tag: () => {
            name: string;
        };
        publicFields(value: import("o1js").ProofBase<any, any>): {
            input: import("../../../../dist/node/lib/provable/field.js").Field[];
            output: import("../../../../dist/node/lib/provable/field.js").Field[];
        };
        _proofFromBase64(proofString: string, maxProofsVerified: 0 | 2 | 1): unknown;
        _proofToBase64(proof: unknown, maxProofsVerified: 0 | 2 | 1): string;
    };
    proofsEnabled: boolean;
    setProofsEnabled(proofsEnabled: boolean): void;
} & {
    sha256: (args_0: import("../../../../dist/node/lib/provable/bytes.js").Bytes | {
        bytes: {
            value: bigint;
        }[];
    }) => Promise<{
        proof: import("o1js").Proof<undefined, import("../../../../dist/node/lib/provable/bytes.js").Bytes>;
        auxiliaryOutput: undefined;
    }>;
};

import { Bigint2048 } from './rsa.js';
export declare const rsaZkProgram: {
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
    verify: (proof: import("o1js").Proof<undefined, void>) => Promise<boolean>;
    digest: () => Promise<string>;
    analyzeMethods: () => Promise<{
        verifyRsa65537: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
    }>;
    analyzeSingleMethod<K extends "verifyRsa65537">(methodName: K): Promise<import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
        proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
    }>;
    publicInputType: import("o1js").ProvablePureExtended<undefined, undefined, null>;
    publicOutputType: import("o1js").ProvablePureExtended<void, void, null>;
    privateInputTypes: {
        verifyRsa65537: [typeof Bigint2048, typeof Bigint2048, typeof Bigint2048];
    };
    auxiliaryOutputTypes: {
        verifyRsa65537: undefined;
    };
    rawMethods: {
        verifyRsa65537: (args_0: Bigint2048, args_1: Bigint2048, args_2: Bigint2048) => Promise<void>;
    };
    Proof: {
        new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
            proof: unknown;
            publicInput: undefined;
            publicOutput: void;
            maxProofsVerified: 0 | 2 | 1;
        }): import("o1js").Proof<undefined, void>;
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
    verifyRsa65537: (args_0: Bigint2048 | {
        fields: import("../../../../dist/node/lib/provable/field.js").Field[] | bigint[];
        value: bigint | import("o1js").Unconstrained<bigint>;
    }, args_1: Bigint2048 | {
        fields: import("../../../../dist/node/lib/provable/field.js").Field[] | bigint[];
        value: bigint | import("o1js").Unconstrained<bigint>;
    }, args_2: Bigint2048 | {
        fields: import("../../../../dist/node/lib/provable/field.js").Field[] | bigint[];
        value: bigint | import("o1js").Unconstrained<bigint>;
    }) => Promise<{
        proof: import("o1js").Proof<undefined, void>;
        auxiliaryOutput: undefined;
    }>;
};

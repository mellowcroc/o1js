export declare const SmallProgram: {
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
    verify: (proof: import("o1js").Proof<undefined, import("../../../../dist/node/lib/provable/field.js").Field>) => Promise<boolean>;
    digest: () => Promise<string>;
    analyzeMethods: () => Promise<{
        poseidonHash: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
    }>;
    analyzeSingleMethod<K extends "poseidonHash">(methodName: K): Promise<import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
        proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
    }>;
    publicInputType: import("o1js").ProvablePureExtended<undefined, undefined, null>;
    publicOutputType: typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field);
    privateInputTypes: {
        poseidonHash: [typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field)];
    };
    auxiliaryOutputTypes: {
        poseidonHash: undefined;
    };
    rawMethods: {
        poseidonHash: (args_0: import("../../../../dist/node/lib/provable/field.js").Field) => Promise<{
            publicOutput: import("../../../../dist/node/lib/provable/field.js").Field;
        }>;
    };
    Proof: {
        new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
            proof: unknown;
            publicInput: undefined;
            publicOutput: import("../../../../dist/node/lib/provable/field.js").Field;
            maxProofsVerified: 0 | 2 | 1;
        }): import("o1js").Proof<undefined, import("../../../../dist/node/lib/provable/field.js").Field>;
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
    poseidonHash: (args_0: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field) => Promise<{
        proof: import("o1js").Proof<undefined, import("../../../../dist/node/lib/provable/field.js").Field>;
        auxiliaryOutput: undefined;
    }>;
};
declare class PoseidonProof extends SmallProgram.Proof {
}
export declare const BigProgram: {
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
        combinedHash: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
    }>;
    analyzeSingleMethod<K extends "combinedHash">(methodName: K): Promise<import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
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
        combinedHash: [typeof PoseidonProof];
    };
    auxiliaryOutputTypes: {
        combinedHash: undefined;
    };
    rawMethods: {
        combinedHash: (args_0: PoseidonProof) => Promise<{
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
    combinedHash: (args_0: import("o1js").Proof<any, any> | import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>) => Promise<{
        proof: import("o1js").Proof<undefined, import("../../../../dist/node/lib/provable/bytes.js").Bytes>;
        auxiliaryOutput: undefined;
    }>;
};
export {};

export { Bytes32, Ecdsa, Secp256k1, ecdsa, ecdsaEthers, keccakAndEcdsa };
declare const Secp256k1_base: typeof import("o1js").ForeignCurve;
declare class Secp256k1 extends Secp256k1_base {
}
declare const Ecdsa_base: typeof import("o1js").EcdsaSignature;
declare class Ecdsa extends Ecdsa_base {
}
declare const Bytes32_base: typeof import("../../../../dist/node/lib/provable/bytes.js").Bytes;
declare class Bytes32 extends Bytes32_base {
}
declare const keccakAndEcdsa: {
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
    verify: (proof: import("o1js").Proof<import("../../../../dist/node/lib/provable/bytes.js").Bytes, import("../../../../dist/node/lib/provable/bool.js").Bool>) => Promise<boolean>;
    digest: () => Promise<string>;
    analyzeMethods: () => Promise<{
        verifyEcdsa: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
    }>;
    analyzeSingleMethod<K extends "verifyEcdsa">(methodName: K): Promise<import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
        proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
    }>;
    publicInputType: import("o1js").ProvablePureExtended<import("../../../../dist/node/lib/provable/bytes.js").Bytes, {
        bytes: {
            value: bigint;
        }[];
    }, {
        bytes: {
            value: string;
        }[];
    }>;
    publicOutputType: typeof import("../../../../dist/node/lib/provable/bool.js").Bool & ((x: boolean | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/bool.js").Bool) => import("../../../../dist/node/lib/provable/bool.js").Bool);
    privateInputTypes: {
        verifyEcdsa: [typeof Ecdsa, typeof Secp256k1];
    };
    auxiliaryOutputTypes: {
        verifyEcdsa: undefined;
    };
    rawMethods: {
        verifyEcdsa: (publicInput: import("../../../../dist/node/lib/provable/bytes.js").Bytes, args_0: import("o1js").EcdsaSignature, args_1: import("o1js").ForeignCurve) => Promise<{
            publicOutput: import("../../../../dist/node/lib/provable/bool.js").Bool;
        }>;
    };
    Proof: {
        new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
            proof: unknown;
            publicInput: import("../../../../dist/node/lib/provable/bytes.js").Bytes;
            publicOutput: import("../../../../dist/node/lib/provable/bool.js").Bool;
            maxProofsVerified: 0 | 2 | 1;
        }): import("o1js").Proof<import("../../../../dist/node/lib/provable/bytes.js").Bytes, import("../../../../dist/node/lib/provable/bool.js").Bool>;
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
    verifyEcdsa: (publicInput: import("../../../../dist/node/lib/provable/bytes.js").Bytes | {
        bytes: {
            value: bigint;
        }[];
    }, args_0: import("o1js").EcdsaSignature | {
        r: bigint;
        s: bigint;
    }, args_1: import("o1js").ForeignCurve | {
        x: bigint;
        y: bigint;
    }) => Promise<{
        proof: import("o1js").Proof<import("../../../../dist/node/lib/provable/bytes.js").Bytes, import("../../../../dist/node/lib/provable/bool.js").Bool>;
        auxiliaryOutput: undefined;
    }>;
};
declare const ecdsa: {
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
    verify: (proof: import("o1js").Proof<import("o1js").AlmostForeignField, import("../../../../dist/node/lib/provable/bool.js").Bool>) => Promise<boolean>;
    digest: () => Promise<string>;
    analyzeMethods: () => Promise<{
        verifySignedHash: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
    }>;
    analyzeSingleMethod<K extends "verifySignedHash">(methodName: K): Promise<import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
        proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
    }>;
    publicInputType: import("o1js").ProvablePureExtended<import("o1js").AlmostForeignField, bigint, string>;
    publicOutputType: typeof import("../../../../dist/node/lib/provable/bool.js").Bool & ((x: boolean | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/bool.js").Bool) => import("../../../../dist/node/lib/provable/bool.js").Bool);
    privateInputTypes: {
        verifySignedHash: [typeof Ecdsa, typeof Secp256k1];
    };
    auxiliaryOutputTypes: {
        verifySignedHash: undefined;
    };
    rawMethods: {
        verifySignedHash: (publicInput: import("o1js").AlmostForeignField, args_0: import("o1js").EcdsaSignature, args_1: import("o1js").ForeignCurve) => Promise<{
            publicOutput: import("../../../../dist/node/lib/provable/bool.js").Bool;
        }>;
    };
    Proof: {
        new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
            proof: unknown;
            publicInput: import("o1js").AlmostForeignField;
            publicOutput: import("../../../../dist/node/lib/provable/bool.js").Bool;
            maxProofsVerified: 0 | 2 | 1;
        }): import("o1js").Proof<import("o1js").AlmostForeignField, import("../../../../dist/node/lib/provable/bool.js").Bool>;
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
    verifySignedHash: (publicInput: bigint | import("o1js").AlmostForeignField, args_0: import("o1js").EcdsaSignature | {
        r: bigint;
        s: bigint;
    }, args_1: import("o1js").ForeignCurve | {
        x: bigint;
        y: bigint;
    }) => Promise<{
        proof: import("o1js").Proof<import("o1js").AlmostForeignField, import("../../../../dist/node/lib/provable/bool.js").Bool>;
        auxiliaryOutput: undefined;
    }>;
};
declare const ecdsaEthers: {
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
    verify: (proof: import("o1js").Proof<import("../../../../dist/node/lib/provable/bytes.js").Bytes, import("../../../../dist/node/lib/provable/bool.js").Bool>) => Promise<boolean>;
    digest: () => Promise<string>;
    analyzeMethods: () => Promise<{
        verifyEthers: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
    }>;
    analyzeSingleMethod<K extends "verifyEthers">(methodName: K): Promise<import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
        proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
    }>;
    publicInputType: import("o1js").ProvablePureExtended<import("../../../../dist/node/lib/provable/bytes.js").Bytes, {
        bytes: {
            value: bigint;
        }[];
    }, {
        bytes: {
            value: string;
        }[];
    }>;
    publicOutputType: typeof import("../../../../dist/node/lib/provable/bool.js").Bool & ((x: boolean | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/bool.js").Bool) => import("../../../../dist/node/lib/provable/bool.js").Bool);
    privateInputTypes: {
        verifyEthers: [typeof Ecdsa, typeof Secp256k1];
    };
    auxiliaryOutputTypes: {
        verifyEthers: undefined;
    };
    rawMethods: {
        verifyEthers: (publicInput: import("../../../../dist/node/lib/provable/bytes.js").Bytes, args_0: import("o1js").EcdsaSignature, args_1: import("o1js").ForeignCurve) => Promise<{
            publicOutput: import("../../../../dist/node/lib/provable/bool.js").Bool;
        }>;
    };
    Proof: {
        new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
            proof: unknown;
            publicInput: import("../../../../dist/node/lib/provable/bytes.js").Bytes;
            publicOutput: import("../../../../dist/node/lib/provable/bool.js").Bool;
            maxProofsVerified: 0 | 2 | 1;
        }): import("o1js").Proof<import("../../../../dist/node/lib/provable/bytes.js").Bytes, import("../../../../dist/node/lib/provable/bool.js").Bool>;
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
    verifyEthers: (publicInput: import("../../../../dist/node/lib/provable/bytes.js").Bytes | {
        bytes: {
            value: bigint;
        }[];
    }, args_0: import("o1js").EcdsaSignature | {
        r: bigint;
        s: bigint;
    }, args_1: import("o1js").ForeignCurve | {
        x: bigint;
        y: bigint;
    }) => Promise<{
        proof: import("o1js").Proof<import("../../../../dist/node/lib/provable/bytes.js").Bytes, import("../../../../dist/node/lib/provable/bool.js").Bool>;
        auxiliaryOutput: undefined;
    }>;
};

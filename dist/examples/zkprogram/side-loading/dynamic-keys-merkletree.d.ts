import { DynamicProof, FeatureFlags, Field, Proof, SelfProof, VerificationKey } from 'o1js';
export { MainProgramState, MerkleTreeWitness, SideloadedProgramProof, mainProgram, sideloadedProgram, };
/**
 * This example showcases how DynamicProofs can be used along with a merkletree that stores
 * the verification keys that can be used to verify it.
 * The MainProgram has two methods, addSideloadedProgram that adds a given verification key
 * to the tree, and validateUsingTree that uses a given tree leaf to verify a given child-proof
 * using the verification tree stored under that leaf.
 */
declare const sideloadedProgram: {
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
    verify: (proof: Proof<import("../../../../dist/node/lib/provable/field.js").Field, import("../../../../dist/node/lib/provable/field.js").Field>) => Promise<boolean>;
    digest: () => Promise<string>;
    analyzeMethods: () => Promise<{
        compute: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
        assertAndAdd: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
    }>;
    analyzeSingleMethod<K extends "compute" | "assertAndAdd">(methodName: K): Promise<import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
        proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
    }>;
    publicInputType: typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field);
    publicOutputType: typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field);
    privateInputTypes: {
        compute: [typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field)];
        assertAndAdd: [typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field)];
    };
    auxiliaryOutputTypes: {
        compute: undefined;
        assertAndAdd: undefined;
    };
    rawMethods: {
        compute: (publicInput: import("../../../../dist/node/lib/provable/field.js").Field, args_0: import("../../../../dist/node/lib/provable/field.js").Field) => Promise<{
            publicOutput: import("../../../../dist/node/lib/provable/field.js").Field;
        }>;
        assertAndAdd: (publicInput: import("../../../../dist/node/lib/provable/field.js").Field, args_0: import("../../../../dist/node/lib/provable/field.js").Field) => Promise<{
            publicOutput: import("../../../../dist/node/lib/provable/field.js").Field;
        }>;
    };
    Proof: {
        new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
            proof: unknown;
            publicInput: import("../../../../dist/node/lib/provable/field.js").Field;
            publicOutput: import("../../../../dist/node/lib/provable/field.js").Field;
            maxProofsVerified: 0 | 2 | 1;
        }): Proof<import("../../../../dist/node/lib/provable/field.js").Field, import("../../../../dist/node/lib/provable/field.js").Field>;
        fromJSON<S extends import("../../../../dist/node/lib/util/types.js").Subclass<typeof Proof>>(this: S, { maxProofsVerified, proof: proofString, publicInput: publicInputJson, publicOutput: publicOutputJson, }: import("o1js").JsonProof): Promise<Proof<import("o1js").InferProvable<S["publicInputType"]>, import("o1js").InferProvable<S["publicOutputType"]>>>;
        dummy<Input, OutPut>(publicInput: Input, publicOutput: OutPut, maxProofsVerified: 0 | 2 | 1, domainLog2?: number | undefined): Promise<Proof<Input, OutPut>>;
        readonly provable: {
            toFields: (value: Proof<any, any>) => import("../../../../dist/node/lib/provable/field.js").Field[];
            toAuxiliary: (value?: Proof<any, any> | undefined) => any[];
            fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[], aux: any[]) => Proof<any, any>;
            sizeInFields(): number;
            check: (value: Proof<any, any>) => void;
            toValue: (x: Proof<any, any>) => import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>;
            fromValue: (x: Proof<any, any> | import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>) => Proof<any, any>;
            toCanonical?: ((x: Proof<any, any>) => Proof<any, any>) | undefined;
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
    compute: (publicInput: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field, args_0: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field) => Promise<{
        proof: Proof<import("../../../../dist/node/lib/provable/field.js").Field, import("../../../../dist/node/lib/provable/field.js").Field>;
        auxiliaryOutput: undefined;
    }>;
    assertAndAdd: (publicInput: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field, args_0: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field) => Promise<{
        proof: Proof<import("../../../../dist/node/lib/provable/field.js").Field, import("../../../../dist/node/lib/provable/field.js").Field>;
        auxiliaryOutput: undefined;
    }>;
};
declare class SideloadedProgramProof extends DynamicProof<Field, Field> {
    static publicInputType: typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field);
    static publicOutputType: typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field);
    static maxProofsVerified: 0;
    static featureFlags: FeatureFlags;
}
declare const MerkleTreeWitness_base: typeof import("../../../../dist/node/lib/provable/merkle-tree.js").BaseMerkleWitness;
declare class MerkleTreeWitness extends MerkleTreeWitness_base {
}
declare const MainProgramState_base: (new (value: {
    treeRoot: import("../../../../dist/node/lib/provable/field.js").Field;
    state: import("../../../../dist/node/lib/provable/field.js").Field;
}) => {
    treeRoot: import("../../../../dist/node/lib/provable/field.js").Field;
    state: import("../../../../dist/node/lib/provable/field.js").Field;
}) & {
    _isStruct: true;
} & Omit<import("../../../../dist/node/lib/provable/types/provable-intf.js").Provable<{
    treeRoot: import("../../../../dist/node/lib/provable/field.js").Field;
    state: import("../../../../dist/node/lib/provable/field.js").Field;
}, {
    treeRoot: bigint;
    state: bigint;
}>, "fromFields"> & {
    fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[]) => {
        treeRoot: import("../../../../dist/node/lib/provable/field.js").Field;
        state: import("../../../../dist/node/lib/provable/field.js").Field;
    };
} & {
    fromValue: (value: {
        treeRoot: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field;
        state: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field;
    }) => {
        treeRoot: import("../../../../dist/node/lib/provable/field.js").Field;
        state: import("../../../../dist/node/lib/provable/field.js").Field;
    };
    toInput: (x: {
        treeRoot: import("../../../../dist/node/lib/provable/field.js").Field;
        state: import("../../../../dist/node/lib/provable/field.js").Field;
    }) => {
        fields?: import("../../../../dist/node/lib/provable/field.js").Field[] | undefined;
        packed?: [import("../../../../dist/node/lib/provable/field.js").Field, number][] | undefined;
    };
    toJSON: (x: {
        treeRoot: import("../../../../dist/node/lib/provable/field.js").Field;
        state: import("../../../../dist/node/lib/provable/field.js").Field;
    }) => {
        treeRoot: string;
        state: string;
    };
    fromJSON: (x: {
        treeRoot: string;
        state: string;
    }) => {
        treeRoot: import("../../../../dist/node/lib/provable/field.js").Field;
        state: import("../../../../dist/node/lib/provable/field.js").Field;
    };
    empty: () => {
        treeRoot: import("../../../../dist/node/lib/provable/field.js").Field;
        state: import("../../../../dist/node/lib/provable/field.js").Field;
    };
};
declare class MainProgramState extends MainProgramState_base {
}
declare const mainProgram: {
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
    verify: (proof: Proof<MainProgramState, MainProgramState>) => Promise<boolean>;
    digest: () => Promise<string>;
    analyzeMethods: () => Promise<{
        addSideloadedProgram: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
        validateUsingTree: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
    }>;
    analyzeSingleMethod<K extends "addSideloadedProgram" | "validateUsingTree">(methodName: K): Promise<import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
        proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
    }>;
    publicInputType: typeof MainProgramState;
    publicOutputType: typeof MainProgramState;
    privateInputTypes: {
        addSideloadedProgram: [typeof VerificationKey, typeof MerkleTreeWitness];
        validateUsingTree: [typeof SelfProof, typeof VerificationKey, typeof MerkleTreeWitness, typeof SideloadedProgramProof];
    };
    auxiliaryOutputTypes: {
        addSideloadedProgram: undefined;
        validateUsingTree: undefined;
    };
    rawMethods: {
        addSideloadedProgram: (publicInput: MainProgramState, args_0: VerificationKey, args_1: MerkleTreeWitness) => Promise<{
            publicOutput: MainProgramState;
        }>;
        validateUsingTree: (publicInput: MainProgramState, args_0: SelfProof<unknown, unknown>, args_1: VerificationKey, args_2: MerkleTreeWitness, args_3: SideloadedProgramProof) => Promise<{
            publicOutput: MainProgramState;
        }>;
    };
    Proof: {
        new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
            proof: unknown;
            publicInput: MainProgramState;
            publicOutput: MainProgramState;
            maxProofsVerified: 0 | 2 | 1;
        }): Proof<MainProgramState, MainProgramState>;
        fromJSON<S extends import("../../../../dist/node/lib/util/types.js").Subclass<typeof Proof>>(this: S, { maxProofsVerified, proof: proofString, publicInput: publicInputJson, publicOutput: publicOutputJson, }: import("o1js").JsonProof): Promise<Proof<import("o1js").InferProvable<S["publicInputType"]>, import("o1js").InferProvable<S["publicOutputType"]>>>;
        dummy<Input, OutPut>(publicInput: Input, publicOutput: OutPut, maxProofsVerified: 0 | 2 | 1, domainLog2?: number | undefined): Promise<Proof<Input, OutPut>>;
        readonly provable: {
            toFields: (value: Proof<any, any>) => import("../../../../dist/node/lib/provable/field.js").Field[];
            toAuxiliary: (value?: Proof<any, any> | undefined) => any[];
            fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[], aux: any[]) => Proof<any, any>;
            sizeInFields(): number;
            check: (value: Proof<any, any>) => void;
            toValue: (x: Proof<any, any>) => import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>;
            fromValue: (x: Proof<any, any> | import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>) => Proof<any, any>;
            toCanonical?: ((x: Proof<any, any>) => Proof<any, any>) | undefined;
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
    addSideloadedProgram: (publicInput: MainProgramState | {
        treeRoot: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field;
        state: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field;
    }, args_0: VerificationKey | {
        data: string;
        hash: import("../../../../dist/node/lib/provable/field.js").Field;
    } | {
        data: string;
        hash: bigint;
    }, args_1: any) => Promise<{
        proof: Proof<MainProgramState, MainProgramState>;
        auxiliaryOutput: undefined;
    }>;
    validateUsingTree: (publicInput: MainProgramState | {
        treeRoot: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field;
        state: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field;
    }, args_0: Proof<any, any> | import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any>, args_1: VerificationKey | {
        data: string;
        hash: import("../../../../dist/node/lib/provable/field.js").Field;
    } | {
        data: string;
        hash: bigint;
    }, args_2: any, args_3: import("../../../../dist/node/lib/proof-system/proof.js").ProofValue<any, any> | DynamicProof<any, any>) => Promise<{
        proof: Proof<MainProgramState, MainProgramState>;
        auxiliaryOutput: undefined;
    }>;
};

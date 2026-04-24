/**
 * Example zkProgram that demonstrates how to use RuntimeTable to model payroll tax withholding.
 *
 * Alice, Bob, and Charlie are contractors with dynamic withholding rates (in basis points).
 * The employer wants to prove that the public `totalWithheld` amount matches
 * the confidential salaries and the per-employee rates registered in the runtime table.
 */
export { PayrollRuntimeTableZkProgram };
declare const PayrollRuntimeTableZkProgram: {
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
    verify: (proof: import("o1js").Proof<import("../../../../dist/node/lib/provable/field.js").Field, void>) => Promise<boolean>;
    digest: () => Promise<string>;
    analyzeMethods: () => Promise<{
        verifyPayroll: import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
            proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
        };
    }>;
    analyzeSingleMethod<K extends "verifyPayroll">(methodName: K): Promise<import("../../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary & {
        proofs: import("../../../../dist/node/lib/proof-system/proof.js").ProofClass[];
    }>;
    publicInputType: typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field);
    publicOutputType: import("o1js").ProvablePureExtended<void, void, null>;
    privateInputTypes: {
        verifyPayroll: [typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field), typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field), typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field), typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field), typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field), typeof import("../../../../dist/node/lib/provable/field.js").Field & ((x: string | number | bigint | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldConst | import("../../../../dist/node/lib/provable/core/fieldvar.js").FieldVar | import("../../../../dist/node/lib/provable/field.js").Field) => import("../../../../dist/node/lib/provable/field.js").Field)];
    };
    auxiliaryOutputTypes: {
        verifyPayroll: undefined;
    };
    rawMethods: {
        verifyPayroll: (publicInput: import("../../../../dist/node/lib/provable/field.js").Field, args_0: import("../../../../dist/node/lib/provable/field.js").Field, args_1: import("../../../../dist/node/lib/provable/field.js").Field, args_2: import("../../../../dist/node/lib/provable/field.js").Field, args_3: import("../../../../dist/node/lib/provable/field.js").Field, args_4: import("../../../../dist/node/lib/provable/field.js").Field, args_5: import("../../../../dist/node/lib/provable/field.js").Field) => Promise<void>;
    };
    Proof: {
        new ({ proof, publicInput, publicOutput, maxProofsVerified, }: {
            proof: unknown;
            publicInput: import("../../../../dist/node/lib/provable/field.js").Field;
            publicOutput: void;
            maxProofsVerified: 0 | 2 | 1;
        }): import("o1js").Proof<import("../../../../dist/node/lib/provable/field.js").Field, void>;
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
    verifyPayroll: (publicInput: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field, args_0: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field, args_1: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field, args_2: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field, args_3: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field, args_4: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field, args_5: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field) => Promise<{
        proof: import("o1js").Proof<import("../../../../dist/node/lib/provable/field.js").Field, void>;
        auxiliaryOutput: undefined;
    }>;
};

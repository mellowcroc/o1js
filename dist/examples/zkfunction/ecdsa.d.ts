export { Bytes32, Ecdsa, Secp256k1, reserves };
declare const Secp256k1_base: typeof import("o1js").ForeignCurve;
declare class Secp256k1 extends Secp256k1_base {
}
declare const Ecdsa_base: typeof import("o1js").EcdsaSignature;
declare class Ecdsa extends Ecdsa_base {
}
declare const Bytes32_base: typeof import("../../../dist/node/lib/provable/bytes.js").Bytes;
declare class Bytes32 extends Bytes32_base {
}
declare const reserves: {
    compile(): Promise<{
        verificationKey: import("../../../dist/node/lib/proof-system/zkfunction.js").KimchiVerificationKey;
    }>;
    analyzeMethod(): Omit<import("../../../dist/node/lib/provable/core/provable-context.js").ConstraintSystemSummary, "digest">;
    prove(publicInput: import("../../../dist/node/lib/provable/bytes.js").Bytes, args_1: import("o1js").EcdsaSignature, args_2: import("o1js").ForeignCurve): Promise<import("../../../dist/node/lib/proof-system/zkfunction.js").KimchiProof>;
    verify(proof: import("../../../dist/node/lib/proof-system/zkfunction.js").KimchiProof, verificationKey: import("../../../dist/node/lib/proof-system/zkfunction.js").KimchiVerificationKey): Promise<boolean>;
};

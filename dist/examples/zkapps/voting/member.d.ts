import { Field, PublicKey, UInt64 } from 'o1js';
declare const MyMerkleWitness_base: typeof import("../../../../dist/node/lib/provable/merkle-tree.js").BaseMerkleWitness;
export declare class MyMerkleWitness extends MyMerkleWitness_base {
}
declare const Member_base: (new (value: {
    publicKey: PublicKey;
    balance: UInt64;
    votes: import("../../../../dist/node/lib/provable/field.js").Field;
    witness: MyMerkleWitness;
    votesWitness: MyMerkleWitness;
}) => {
    publicKey: PublicKey;
    balance: UInt64;
    votes: import("../../../../dist/node/lib/provable/field.js").Field;
    witness: MyMerkleWitness;
    votesWitness: MyMerkleWitness;
}) & {
    _isStruct: true;
} & Omit<import("../../../../dist/node/lib/provable/types/provable-intf.js").Provable<{
    publicKey: PublicKey;
    balance: UInt64;
    votes: import("../../../../dist/node/lib/provable/field.js").Field;
    witness: MyMerkleWitness;
    votesWitness: MyMerkleWitness;
}, {
    publicKey: {
        x: bigint;
        isOdd: boolean;
    };
    balance: bigint;
    votes: bigint;
    witness: any;
    votesWitness: any;
}>, "fromFields"> & {
    fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[]) => {
        publicKey: PublicKey;
        balance: UInt64;
        votes: import("../../../../dist/node/lib/provable/field.js").Field;
        witness: MyMerkleWitness;
        votesWitness: MyMerkleWitness;
    };
} & {
    fromValue: (value: {
        publicKey: PublicKey | {
            x: bigint | import("../../../../dist/node/lib/provable/field.js").Field;
            isOdd: boolean | import("../../../../dist/node/lib/provable/bool.js").Bool;
        };
        balance: number | bigint | UInt64;
        votes: string | number | bigint | import("../../../../dist/node/lib/provable/field.js").Field;
        witness: any;
        votesWitness: any;
    }) => {
        publicKey: PublicKey;
        balance: UInt64;
        votes: import("../../../../dist/node/lib/provable/field.js").Field;
        witness: MyMerkleWitness;
        votesWitness: MyMerkleWitness;
    };
    toInput: (x: {
        publicKey: PublicKey;
        balance: UInt64;
        votes: import("../../../../dist/node/lib/provable/field.js").Field;
        witness: MyMerkleWitness;
        votesWitness: MyMerkleWitness;
    }) => {
        fields?: import("../../../../dist/node/lib/provable/field.js").Field[] | undefined;
        packed?: [import("../../../../dist/node/lib/provable/field.js").Field, number][] | undefined;
    };
    toJSON: (x: {
        publicKey: PublicKey;
        balance: UInt64;
        votes: import("../../../../dist/node/lib/provable/field.js").Field;
        witness: MyMerkleWitness;
        votesWitness: MyMerkleWitness;
    }) => {
        publicKey: string;
        balance: string;
        votes: string;
        witness: any;
        votesWitness: any;
    };
    fromJSON: (x: {
        publicKey: string;
        balance: string;
        votes: string;
        witness: any;
        votesWitness: any;
    }) => {
        publicKey: PublicKey;
        balance: UInt64;
        votes: import("../../../../dist/node/lib/provable/field.js").Field;
        witness: MyMerkleWitness;
        votesWitness: MyMerkleWitness;
    };
    empty: () => {
        publicKey: PublicKey;
        balance: UInt64;
        votes: import("../../../../dist/node/lib/provable/field.js").Field;
        witness: MyMerkleWitness;
        votesWitness: MyMerkleWitness;
    };
};
export declare class Member extends Member_base {
    constructor(publicKey: PublicKey, balance: UInt64);
    getHash(): Field;
    addVote(): Member;
    static empty<T extends new (...args: any) => any>(): InstanceType<T>;
    static from(publicKey: PublicKey, balance: UInt64): Member;
}
export {};

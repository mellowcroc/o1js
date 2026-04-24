import { SmartContract, State } from 'o1js';
declare const Bytes32_base: typeof import("../../../../dist/node/lib/provable/bytes.js").Bytes;
declare class Bytes32 extends Bytes32_base {
}
export declare class HashStorage extends SmartContract {
    commitment: State<import("../../../../dist/node/lib/provable/field.js").Field>;
    init(): void;
    SHA3_256(xs: Bytes32): Promise<void>;
    SHA3_384(xs: Bytes32): Promise<void>;
    SHA3_512(xs: Bytes32): Promise<void>;
    Keccak256(xs: Bytes32): Promise<void>;
}
export {};

import { Field, PrivateKey, SmartContract, State } from 'o1js';
export declare const adminPrivateKey: PrivateKey;
export declare const adminPublicKey: import("o1js").PublicKey;
export declare class HelloWorld extends SmartContract {
    x: State<import("../../../../dist/node/lib/provable/field.js").Field>;
    init(): void;
    update(squared: Field, admin: PrivateKey): Promise<void>;
}

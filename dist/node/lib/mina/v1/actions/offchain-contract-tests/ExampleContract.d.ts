import { SmartContract, PublicKey, UInt64 } from '../../../../../index.js';
export { offchainState, StateProof, ExampleContract };
declare const offchainState: import("../offchain-state.js").OffchainState<{
    readonly accounts: {
        kind: "offchain-map";
        keyType: typeof PublicKey;
        valueType: typeof UInt64;
    };
    readonly totalSupply: {
        kind: "offchain-field";
        type: typeof UInt64;
    };
}>;
declare class StateProof extends offchainState.Proof {
}
declare class ExampleContract extends SmartContract {
    offchainStateCommitments: import("../../state.js").State<import("../offchain-state-rollup.js").OffchainStateCommitments>;
    offchainState: import("../offchain-state.js").OffchainStateInstance<{
        readonly accounts: {
            kind: "offchain-map";
            keyType: typeof PublicKey;
            valueType: typeof UInt64;
        };
        readonly totalSupply: {
            kind: "offchain-field";
            type: typeof UInt64;
        };
    }>;
    createAccount(address: PublicKey, amountToMint: UInt64): Promise<void>;
    transfer(from: PublicKey, to: PublicKey, amount: UInt64): Promise<void>;
    getSupply(): Promise<UInt64>;
    getBalance(address: PublicKey): Promise<UInt64>;
    settle(proof: StateProof): Promise<void>;
}

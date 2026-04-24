/**
 * Framework for testing Mina smart contracts against a local Mina instance.
 */
import { SmartContract } from '../zkapp.js';
import * as Mina from '../mina.js';
import { OffchainField, OffchainMap, OffchainState } from '../actions/offchain-state.js';
import { BatchReducer } from '../actions/batch-reducer.js';
import { PrivateKey, PublicKey } from '../../../provable/crypto/signature.js';
export { testLocal, transaction, deploy, expectState, expectBalance, TestInstruction };
type LocalBlockchain = Awaited<ReturnType<typeof Mina.LocalBlockchain>>;
declare function testLocal<S extends SmartContract>(Contract: typeof SmartContract & (new (...args: any) => S), { proofsEnabled, offchainState, batchReducer, autoDeploy, }: {
    proofsEnabled: boolean | 'both';
    offchainState?: OffchainState<any>;
    batchReducer?: BatchReducer<any>;
    autoDeploy?: boolean;
}, callback: (input: {
    accounts: Record<string, Mina.TestPublicKey>;
    newAccounts: Record<string, Mina.TestPublicKey>;
    contract: S;
    Local: LocalBlockchain;
}) => TestInstruction[]): Promise<LocalBlockchain>;
type MaybePromise<T> = T | Promise<T>;
type BaseInstruction = {
    type: string;
    trace?: string;
    label?: string;
};
type TestInstruction = ((...args: any) => MaybePromise<TestInstruction | TestInstruction[] | void>) | (BaseInstruction & ({
    type: 'transaction';
    label: string;
    callback: () => Promise<void>;
    sender?: Mina.TestPublicKey;
    signers?: PrivateKey[];
} | {
    type: 'deploy';
    options?: {
        contract?: typeof SmartContract | SmartContract;
        account?: Mina.TestPublicKey;
    };
} | {
    type: 'expect-state';
    state: State;
    expected: Expected<State>;
} | {
    type: 'expect-balance';
    address: PublicKey;
    expected: bigint;
}));
declare function transaction(label: string, callback: () => Promise<void>): TestInstruction;
declare namespace transaction {
    var from: (sender: Mina.TestPublicKey) => (label: string, callback: () => Promise<void>) => TestInstruction;
}
declare function deploy(options?: {
    contract?: SmartContract;
    account?: Mina.TestPublicKey;
}): TestInstruction;
declare function expectState<S extends State>(state: S, expected: Expected<S>, message?: string): TestInstruction;
declare function expectBalance(address: PublicKey | string, expected: bigint, message?: string): TestInstruction;
type State = OffchainField<any, any> | OffchainMap<any, any, any>;
type Expected<S extends State> = S extends OffchainField<any, infer V> ? V | undefined : S extends OffchainMap<infer K, any, infer V> ? [K, V | undefined] : never;

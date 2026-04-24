/**
 * This example shows how to iterate through incoming actions, not using `Reducer.reduce` but by
 * treating the actions as a merkle list.
 *
 * This is mainly intended as an example for using `MerkleList`, but it might also be useful as
 * a blueprint for processing actions in a custom and more explicit way.
 *
 * Warning: The reducer API in o1js is currently not safe to use in production applications. The `reduce()`
 * method breaks if more than the hard-coded number (default: 32) of actions are pending. Work is actively
 * in progress to mitigate this limitation.
 */
import { PublicKey, SmartContract } from 'o1js';
export { MerkleListReducing, testLocal };
/**
 * This contract allows you to push either 1 or 2 public keys as actions,
 * and has a reducer-like method which checks whether a given public key is contained in those actions.
 */
declare class MerkleListReducing extends SmartContract {
    reducer: {
        dispatch(action: PublicKey): void;
        reduce<State>(actions: import("o1js").MerkleList<import("o1js").MerkleList<PublicKey>>, stateType: import("o1js").Provable<State>, reduce: (state: State, action: PublicKey) => State, initial: State, options?: {
            maxUpdatesWithActions?: number | undefined;
            maxActionsPerUpdate?: number | undefined;
            skipActionStatePrecondition?: boolean | undefined;
        } | undefined): State;
        forEach(actions: import("o1js").MerkleList<import("o1js").MerkleList<PublicKey>>, reduce: (action: PublicKey) => void, options?: {
            maxUpdatesWithActions?: number | undefined;
            maxActionsPerUpdate?: number | undefined;
            skipActionStatePrecondition?: boolean | undefined;
        } | undefined): void;
        getActions({ fromActionState, endActionState, }?: {
            fromActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
            endActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
        } | undefined): import("o1js").MerkleList<import("o1js").MerkleList<PublicKey>>;
        fetchActions({ fromActionState, endActionState, }?: {
            fromActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
            endActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
        } | undefined): Promise<PublicKey[][]>;
    };
    postAddress(address: PublicKey): Promise<void>;
    postTwoAddresses(a1: PublicKey, a2: PublicKey): Promise<void>;
    assertContainsAddress(address: PublicKey): Promise<void>;
}
declare function testLocal(): Promise<void>;

/**
 * This example shows how to iterate through incoming actions, not using `Reducer.reduce` but by
 * treating the actions as a merkle list and using the built in `Iterator`.
 *
 * This is mainly intended as an example for using `Iterator` and `MerkleList`, but it might also be useful as
 * a blueprint for processing actions in a custom and more explicit way.
 *
 * Warning: The reducer API in o1js is currently not safe to use in production applications. The `reduce()`
 * method breaks if more than the hard-coded number (default: 32) of actions are pending. Work is actively
 * in progress to mitigate this limitation.
 */
import { Field, State, SmartContract } from 'o1js';
export { ActionsContract, testLocal };
/**
 * This contract allows you to push custom increments
 * and has a reducer-like method which accumulates all increments
 */
declare class ActionsContract extends SmartContract {
    reducer: {
        dispatch(action: import("../../../../dist/node/lib/provable/field.js").Field): void;
        reduce<State>(actions: import("o1js").MerkleList<import("o1js").MerkleList<import("../../../../dist/node/lib/provable/field.js").Field>>, stateType: import("o1js").Provable<State>, reduce: (state: State, action: import("../../../../dist/node/lib/provable/field.js").Field) => State, initial: State, options?: {
            maxUpdatesWithActions?: number | undefined;
            maxActionsPerUpdate?: number | undefined;
            skipActionStatePrecondition?: boolean | undefined;
        } | undefined): State;
        forEach(actions: import("o1js").MerkleList<import("o1js").MerkleList<import("../../../../dist/node/lib/provable/field.js").Field>>, reduce: (action: import("../../../../dist/node/lib/provable/field.js").Field) => void, options?: {
            maxUpdatesWithActions?: number | undefined;
            maxActionsPerUpdate?: number | undefined;
            skipActionStatePrecondition?: boolean | undefined;
        } | undefined): void;
        getActions({ fromActionState, endActionState, }?: {
            fromActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
            endActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
        } | undefined): import("o1js").MerkleList<import("o1js").MerkleList<import("../../../../dist/node/lib/provable/field.js").Field>>;
        fetchActions({ fromActionState, endActionState, }?: {
            fromActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
            endActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
        } | undefined): Promise<import("../../../../dist/node/lib/provable/field.js").Field[][]>;
    };
    counter: State<import("../../../../dist/node/lib/provable/field.js").Field>;
    increment(inc: Field): Promise<void>;
    twoIncrements(inc1: Field, inc2: Field): Promise<void>;
    accumulate(): Promise<void>;
}
declare function testLocal(): Promise<void>;

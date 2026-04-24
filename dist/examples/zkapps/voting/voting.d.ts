import { SmartContract, State, PublicKey, Provable } from 'o1js';
import { Member } from './member.js';
import { ElectionPreconditions, ParticipantPreconditions } from './preconditions.js';
type VotingParams = {
    electionPreconditions: ElectionPreconditions;
    voterPreconditions: ParticipantPreconditions;
    candidatePreconditions: ParticipantPreconditions;
    candidateAddress: PublicKey;
    voterAddress: PublicKey;
    contractAddress: PublicKey;
    doProofs: boolean;
};
/**
 * Returns a new contract instance that based on a set of preconditions.
 * @param params {@link Voting_}
 */
export declare function Voting(params: VotingParams): Promise<Voting_>;
export declare class Voting_ extends SmartContract {
    /**
     * Root of the merkle tree that stores all committed votes.
     */
    committedVotes: State<import("../../../../dist/node/lib/provable/field.js").Field>;
    /**
     * Accumulator of all emitted votes.
     */
    accumulatedVotes: State<import("../../../../dist/node/lib/provable/field.js").Field>;
    reducer: {
        dispatch(action: Member): void;
        reduce<State>(actions: import("o1js").MerkleList<import("o1js").MerkleList<Member>>, stateType: Provable<State>, reduce: (state: State, action: Member) => State, initial: State, options?: {
            maxUpdatesWithActions?: number | undefined;
            maxActionsPerUpdate?: number | undefined;
            skipActionStatePrecondition?: boolean | undefined;
        } | undefined): State;
        forEach(actions: import("o1js").MerkleList<import("o1js").MerkleList<Member>>, reduce: (action: Member) => void, options?: {
            maxUpdatesWithActions?: number | undefined;
            maxActionsPerUpdate?: number | undefined;
            skipActionStatePrecondition?: boolean | undefined;
        } | undefined): void;
        getActions({ fromActionState, endActionState, }?: {
            fromActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
            endActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
        } | undefined): import("o1js").MerkleList<import("o1js").MerkleList<Member>>;
        fetchActions({ fromActionState, endActionState, }?: {
            fromActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
            endActionState?: import("../../../../dist/node/lib/provable/field.js").Field | undefined;
        } | undefined): Promise<Member[][]>;
    };
    events: {
        newVoteFor: typeof PublicKey;
        newVoteState: Omit<import("../../../../dist/node/lib/provable/types/provable-intf.js").Provable<{
            accumulatedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
            committedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
        }, {
            accumulatedVotesRoot: bigint;
            committedVotesRoot: bigint;
        }>, "fromFields"> & {
            fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[]) => {
                accumulatedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
                committedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
            };
        } & {
            toInput: (x: {
                accumulatedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
                committedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
            }) => {
                fields?: import("../../../../dist/node/lib/provable/field.js").Field[] | undefined;
                packed?: [import("../../../../dist/node/lib/provable/field.js").Field, number][] | undefined;
            };
            toJSON: (x: {
                accumulatedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
                committedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
            }) => {
                accumulatedVotesRoot: string;
                committedVotesRoot: string;
            };
            fromJSON: (x: {
                accumulatedVotesRoot: string;
                committedVotesRoot: string;
            }) => {
                accumulatedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
                committedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
            };
            empty: () => {
                accumulatedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
                committedVotesRoot: import("../../../../dist/node/lib/provable/field.js").Field;
            };
        };
    };
    deploy(): Promise<void>;
    /**
     * Method used to register a new voter. Calls the `addEntry(member)` method of the Voter-Membership contract.
     * @param member
     */
    voterRegistration(member: Member): Promise<void>;
    /**
     * Method used to register a new candidate.
     * Calls the `addEntry(member)` method of the Candidate-Membership contract.
     * @param member
     */
    candidateRegistration(member: Member): Promise<void>;
    /**
     * Method used to register update all pending member registrations.
     * Calls the `publish()` method of the Candidate-Membership and Voter-Membership contract.
     */
    approveRegistrations(): Promise<void>;
    /**
     * Method used to cast a vote to a specific candidate.
     * Dispatches a new vote sequence event.
     * @param candidate
     * @param voter
     */
    vote(candidate: Member, voter: Member): Promise<void>;
    /**
     * Method used to accumulate all pending votes from sequence events
     * and applies state changes to the votes merkle tree.
     */
    countVotes(): Promise<void>;
}
export {};

import type { NetworkId } from '../../../mina-signer/src/types.js';
import { AccountUpdate, ZkappCommand, ZkappPublicInput } from './account-update.js';
import type { Account } from './account.js';
import type { NetworkValue } from './precondition.js';
export { defaultNetworkState, filterGroups, getSegmentsAndEvents, reportGetAccountError, verifyAccountUpdate, verifyTransactionLimits, };
declare function reportGetAccountError(publicKey: string, tokenId: string): string;
declare function defaultNetworkState(): NetworkValue;
declare function verifyTransactionLimits({ accountUpdates }: ZkappCommand): void;
declare function getSegmentsAndEvents(accountUpdates: AccountUpdate[]): {
    eventElements: {
        events: number;
        actions: number;
    };
    segments: {
        signedPair: number;
        signedSingle: number;
        proof: number;
    };
    totalAccountUpdates: number;
};
declare function filterGroups(xs: AuthorizationKind[]): {
    signedPair: number;
    signedSingle: number;
    proof: number;
};
declare function verifyAccountUpdate(account: Account, accountUpdate: AccountUpdate, publicInput: ZkappPublicInput, transactionCommitments: {
    commitment: bigint;
    fullCommitment: bigint;
}, proofsEnabled: boolean, networkId: NetworkId): Promise<void>;
type AuthorizationKind = {
    isProved: boolean;
    isSigned: boolean;
};

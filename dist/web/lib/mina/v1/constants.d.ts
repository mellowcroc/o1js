/**
 * This file contains constants used in the Mina protocol.
 */
export declare namespace TransactionLimits {
    const MAX_ZKAPP_SEGMENT_PER_TRANSACTION = 16;
    const MAX_ACTION_ELEMENTS: 1024;
    const MAX_EVENT_ELEMENTS: 1024;
}
export declare namespace ZkappConstants {
    const MAX_ZKAPP_STATE_FIELDS: 32;
    const ACCOUNT_ACTION_STATE_BUFFER_SIZE: 5;
    const ACCOUNT_CREATION_FEE: 1000000000n;
}

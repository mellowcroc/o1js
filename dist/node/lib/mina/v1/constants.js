/**
 * This file contains constants used in the Mina protocol.
 */
// Constants to define the maximum number of segments, events, and actions in a transaction
export var TransactionLimits;
(function (TransactionLimits) {
    TransactionLimits.MAX_ZKAPP_SEGMENT_PER_TRANSACTION = 16;
    TransactionLimits.MAX_ACTION_ELEMENTS = 1024;
    TransactionLimits.MAX_EVENT_ELEMENTS = 1024;
})(TransactionLimits || (TransactionLimits = {}));
export var ZkappConstants;
(function (ZkappConstants) {
    ZkappConstants.MAX_ZKAPP_STATE_FIELDS = 32;
    ZkappConstants.ACCOUNT_ACTION_STATE_BUFFER_SIZE = 5;
    ZkappConstants.ACCOUNT_CREATION_FEE = 1000000000n;
})(ZkappConstants || (ZkappConstants = {}));
//# sourceMappingURL=constants.js.map
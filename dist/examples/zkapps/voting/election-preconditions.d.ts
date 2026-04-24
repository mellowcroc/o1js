import { UInt32 } from 'o1js';
declare const ElectionPreconditions_base: (new (value: {
    startElection: UInt32;
    endElection: UInt32;
}) => {
    startElection: UInt32;
    endElection: UInt32;
}) & {
    _isStruct: true;
} & Omit<import("../../../../dist/node/lib/provable/types/provable-intf.js").Provable<{
    startElection: UInt32;
    endElection: UInt32;
}, {
    startElection: bigint;
    endElection: bigint;
}>, "fromFields"> & {
    fromFields: (fields: import("../../../../dist/node/lib/provable/field.js").Field[]) => {
        startElection: UInt32;
        endElection: UInt32;
    };
} & {
    fromValue: (value: {
        startElection: number | bigint | UInt32;
        endElection: number | bigint | UInt32;
    }) => {
        startElection: UInt32;
        endElection: UInt32;
    };
    toInput: (x: {
        startElection: UInt32;
        endElection: UInt32;
    }) => {
        fields?: import("../../../../dist/node/lib/provable/field.js").Field[] | undefined;
        packed?: [import("../../../../dist/node/lib/provable/field.js").Field, number][] | undefined;
    };
    toJSON: (x: {
        startElection: UInt32;
        endElection: UInt32;
    }) => {
        startElection: string;
        endElection: string;
    };
    fromJSON: (x: {
        startElection: string;
        endElection: string;
    }) => {
        startElection: UInt32;
        endElection: UInt32;
    };
    empty: () => {
        startElection: UInt32;
        endElection: UInt32;
    };
};
export default class ElectionPreconditions extends ElectionPreconditions_base {
}
export {};

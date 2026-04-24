import { Void } from './zkprogram.js';
import { VerificationKey } from './verification-key.js';
import { DynamicProof } from './proof.js';
import { Field, SmartContract } from '../../index.js';
declare const Program2Struct_base: (new (value: {
    field1: import("../provable/field.js").Field;
    field2: import("../provable/field.js").Field;
}) => {
    field1: import("../provable/field.js").Field;
    field2: import("../provable/field.js").Field;
}) & {
    _isStruct: true;
} & Omit<import("../provable/types/provable-intf.js").Provable<{
    field1: import("../provable/field.js").Field;
    field2: import("../provable/field.js").Field;
}, {
    field1: bigint;
    field2: bigint;
}>, "fromFields"> & {
    fromFields: (fields: import("../provable/field.js").Field[]) => {
        field1: import("../provable/field.js").Field;
        field2: import("../provable/field.js").Field;
    };
} & {
    fromValue: (value: {
        field1: string | number | bigint | import("../provable/field.js").Field;
        field2: string | number | bigint | import("../provable/field.js").Field;
    }) => {
        field1: import("../provable/field.js").Field;
        field2: import("../provable/field.js").Field;
    };
    toInput: (x: {
        field1: import("../provable/field.js").Field;
        field2: import("../provable/field.js").Field;
    }) => {
        fields?: import("../provable/field.js").Field[] | undefined;
        packed?: [import("../provable/field.js").Field, number][] | undefined;
    };
    toJSON: (x: {
        field1: import("../provable/field.js").Field;
        field2: import("../provable/field.js").Field;
    }) => {
        field1: string;
        field2: string;
    };
    fromJSON: (x: {
        field1: string;
        field2: string;
    }) => {
        field1: import("../provable/field.js").Field;
        field2: import("../provable/field.js").Field;
    };
    empty: () => {
        field1: import("../provable/field.js").Field;
        field2: import("../provable/field.js").Field;
    };
};
export declare class Program2Struct extends Program2Struct_base {
}
declare class SampleSideloadedProof extends DynamicProof<Field, Void> {
    static publicInputType: typeof import("../provable/field.js").Field & ((x: string | number | bigint | import("../provable/core/fieldvar.js").FieldConst | import("../provable/core/fieldvar.js").FieldVar | import("../provable/field.js").Field) => import("../provable/field.js").Field);
    static publicOutputType: import("../../index.js").ProvablePureExtended<void, void, null>;
    static maxProofsVerified: 0;
}
export declare class SideloadedSmartContract extends SmartContract {
    setValue(value: Field, proof: SampleSideloadedProof, vk: VerificationKey): Promise<void>;
}
export {};

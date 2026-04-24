import { Field } from '../../../provable/field.js';
import { Provable } from '../../../provable/provable.js';
import { HashInput } from '../../../provable/types/provable-derivers.js';
export declare function stripPrototypes(x: any): any;
export declare function v1FetchLayout(root: any, path: string[]): any;
export type ProvableTypeDef<T> = Provable<T> & {
    empty(): T;
    toInput(x: T): HashInput;
};
export type V1Type<T> = ProvableTypeDef<T> & {
    toJSON(x: T): any;
};
export type V2Type<InternalReprArg, V1, V2 extends V2Value<any, V1>> = ProvableTypeDef<V2> & {
    fromInternalRepr(x: V1): V2;
    toJSON(x: V2, arg: InternalReprArg): any;
    toAuxiliary(x: V2, arg?: InternalReprArg): any;
};
export interface V2Value<InternalReprArg, V1> {
    toInternalRepr(arg: InternalReprArg): V1;
    toJSON(arg: InternalReprArg): any;
    toFields(): Field[];
}
export declare function testV2Encoding<V2 extends V2Value<any, any>>(Type: V2Type<any, any, V2>, value: V2): void;
export declare function testV1V2ClassEquivalence<InternalReprArg, V1, V2 extends V2Value<InternalReprArg, V1>>(V1Type: V1Type<V1>, V2Type: V2Type<InternalReprArg, V1, V2>, v2InternalReprArg: InternalReprArg): void;
export declare function testV1V2ValueEquivalence<InternalReprArg, V1, V2 extends V2Value<InternalReprArg, V1>>(V1Type: V1Type<V1>, V2Type: V2Type<InternalReprArg, V1, V2>, v1Value: V1, v2Value: V2, v2InternalReprArg: InternalReprArg): void;

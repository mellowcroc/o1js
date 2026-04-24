/// <reference types="node" resolution-mode="require"/>
/**
 * helpers for testing equivalence of two implementations, one of them on bigints
 */
import { Random } from '../testing/property.js';
import { Provable } from '../provable/provable.js';
import { deepEqual } from 'node:assert/strict';
import { Bool, Field } from '../provable/wrapped.js';
import { AnyTuple, Tuple } from '../util/types.js';
export { equivalent, equivalentProvable, equivalentAsync, oneOf, throwError, handleErrors, deepEqual as defaultAssertEqual, id, };
export { spec, field, fieldWithRng, bigintField, bool, boolean, unit, array, record, map, onlyIf, fromRandom, first, second, constant, };
export { Spec, ToSpec, FromSpec, SpecFromFunctions, ProvableSpec, First, Second };
type FromSpec<In1, In2> = {
    rng: Random<In1>;
    there: (x: In1) => In2;
    provable?: Provable<In2, any>;
};
type ToSpec<Out1, Out2> = {
    back: (x: Out2) => Out1;
    assertEqual?: (x: Out1, y: Out1, message: string) => void;
};
type Spec<T1, T2> = FromSpec<T1, T2> & ToSpec<T1, T2>;
type ProvableSpec<T1, T2> = Spec<T1, T2> & {
    provable: Provable<T2, any>;
};
type FuncSpec<In1 extends Tuple<any>, Out1, In2 extends Tuple<any>, Out2> = {
    from: {
        [k in keyof In1]: k extends keyof In2 ? FromSpec<In1[k], In2[k]> : never;
    };
    to: ToSpec<Out1, Out2>;
};
type AnyTupleFunction = (...args: AnyTuple) => any;
type SpecFromFunctions<F1 extends AnyTupleFunction, F2 extends AnyTupleFunction> = FuncSpec<Parameters<F1>, ReturnType<F1>, Parameters<F2>, ReturnType<F2>>;
declare function id<T>(x: T): T;
type FromSpecUnion<T1, T2> = {
    _isUnion: true;
    specs: Tuple<FromSpec<T1, T2>>;
    rng: Random<[number, T1]>;
};
type OrUnion<T1, T2> = FromSpec<T1, T2> | FromSpecUnion<T1, T2>;
type Union<T> = T[keyof T & number];
declare function oneOf<In extends Tuple<FromSpec<any, any>>>(...specs: In): FromSpecUnion<Union<Params1<In>>, Union<Params2<In>>>;
declare function equivalent<In extends Tuple<FromSpec<any, any>>, Out extends ToSpec<any, any>>({ from, to, verbose, }: {
    from: In;
    to: Out;
    verbose?: boolean;
}): (f1: (...args: Params1<In>) => First<Out>, f2: (...args: Params2<In>) => Second<Out>, label?: string) => void;
declare function equivalentAsync<In extends Tuple<FromSpec<any, any>>, Out extends ToSpec<any, any>>({ from, to }: {
    from: In;
    to: Out;
}, { runs }?: {
    runs?: number | undefined;
}): (f1: (...args: Params1<In>) => Promise<First<Out>> | First<Out>, f2: (...args: Params2<In>) => Promise<Second<Out>> | Second<Out>, label?: string) => Promise<void>;
declare function equivalentProvable<In extends Tuple<OrUnion<any, any>>, Out extends ToSpec<any, any>>({ from: fromRaw, to, verbose, }: {
    from: In;
    to: Out;
    verbose?: boolean;
}): (f1: (...args: Params1<In>) => First<Out>, f2: (...args: Params2<In>) => Second<Out>, label?: string) => void;
declare function spec<T, S>(spec: {
    rng: Random<T>;
    there: (x: T) => S;
    back: (x: S) => T;
    assertEqual?: (x: T, y: T, message: string) => void;
    provable: Provable<S>;
}): ProvableSpec<T, S>;
declare function spec<T, S>(spec: {
    rng: Random<T>;
    there: (x: T) => S;
    back: (x: S) => T;
    assertEqual?: (x: T, y: T, message: string) => void;
}): Spec<T, S>;
declare function spec<T>(spec: {
    rng: Random<T>;
    provable: Provable<T>;
    assertEqual?: (x: T, y: T, message: string) => void;
}): ProvableSpec<T, T>;
declare function spec<T>(spec: {
    rng: Random<T>;
    assertEqual?: (x: T, y: T, message: string) => void;
}): Spec<T, T>;
declare let unit: ToSpec<void, void>;
declare let field: ProvableSpec<bigint, Field>;
declare let bigintField: Spec<bigint, bigint>;
declare let bool: ProvableSpec<boolean, Bool>;
declare let boolean: Spec<boolean, boolean>;
declare function fieldWithRng(rng: Random<bigint>): ProvableSpec<bigint, Field>;
declare function array<T, S>(spec: ProvableSpec<T, S>, n: number): ProvableSpec<T[], S[]>;
declare function array<T, S>(spec: Spec<T, S>, n: Random<number> | number): Spec<T[], S[]>;
declare function record<Specs extends {
    [k in string]: Spec<any, any>;
}>(specs: Specs): Spec<{
    [k in keyof Specs]: First<Specs[k]>;
}, {
    [k in keyof Specs]: Second<Specs[k]>;
}>;
declare function map<T1, T2, S1, S2>({ from, to }: {
    from: ProvableSpec<T1, T2>;
    to: ProvableSpec<S1, S2>;
}, there: (t: T1) => S1): ProvableSpec<S1, S2>;
declare function map<T1, T2, S1, S2>({ from, to }: {
    from: FromSpec<T1, T2>;
    to: Spec<S1, S2>;
}, there: (t: T1) => S1): Spec<S1, S2>;
declare function onlyIf<T, S>(spec: Spec<T, S>, onlyIf: (t: T) => boolean): Spec<T, S>;
declare function fromRandom<T>(rng: Random<T>): Spec<T, T>;
declare function first<T, S>(spec: Spec<T, S>): Spec<T, T>;
declare function second<T, S>(spec: Spec<T, S>): Spec<S, S>;
declare function constant<T, S>(spec: Spec<T, S>, value: T): Spec<T, S>;
declare function handleErrors<T, S, R>(op1: () => T, op2: () => S, useResults?: (a: T, b: S) => R, label?: string): R | undefined;
declare function throwError(message?: string): any;
type Param1<In extends OrUnion<any, any>> = In extends {
    there: (x: infer In) => any;
} ? In : In extends FromSpecUnion<infer T1, any> ? T1 : never;
type Param2<In extends OrUnion<any, any>> = In extends {
    there: (x: any) => infer In;
} ? In : In extends FromSpecUnion<any, infer T2> ? T2 : never;
type Params1<Ins extends Tuple<OrUnion<any, any>>> = {
    [k in keyof Ins]: Param1<Ins[k]>;
};
type Params2<Ins extends Tuple<OrUnion<any, any>>> = {
    [k in keyof Ins]: Param2<Ins[k]>;
};
type First<Out extends ToSpec<any, any>> = Out extends ToSpec<infer Out1, any> ? Out1 : never;
type Second<Out extends ToSpec<any, any>> = Out extends ToSpec<any, infer Out2> ? Out2 : never;

/**
 * DSL for testing that a gadget generates the expected constraint system.
 *
 * An essential feature is that `constraintSystem()` automatically generates a
 * variety of fieldvar types for the inputs: constants, variables, and combinators.
 */
import { Gate, GateType } from '../../bindings.js';
import { Provable } from '../provable/provable.js';
import { Tuple } from '../util/types.js';
export { constraintSystem, not, and, or, fulfills, equals, contains, allConstant, ifNotAllConstant, isEmpty, withoutGenerics, print, repeat, ConstraintSystemTest, };
/**
 * `constraintSystem()` is a test runner to check properties of constraint systems.
 * You give it a description of inputs and a circuit, as well as a `ConstraintSystemTest` to assert
 * properties on the generated constraint system.
 *
 * As input variables, we generate random combinations of constants, variables, add & scale combinators,
 * to poke for the common problem of gate chains broken by unexpected Generic gates.
 *
 * The `constraintSystemTest` is written using a DSL of property assertions, such as {@link equals} and {@link contains}.
 * To run multiple assertions, use the {@link and} / {@link or} combinators.
 * To debug the constraint system, use the {@link print} test or `and(print, ...otherTests)`.
 *
 * @param label description of the constraint system
 * @param inputs input spec in form `{ from: [...provables] }`
 * @param main circuit to test
 * @param constraintSystemTest property test to run on the constraint system
 */
declare function constraintSystem<Input extends Tuple<CsVarSpec<any>>>(label: string, inputs: {
    from: Input;
}, main: (...args: CsParams<Input>) => void, constraintSystemTest: ConstraintSystemTest): void;
declare namespace constraintSystem {
    var fromZkProgram: <T, K extends keyof T & string>(program: {
        privateInputTypes: T;
    }, methodName: K, test: ConstraintSystemTest) => void;
    var gates: <Input extends Tuple<CsVarSpec<any>>>(inputs: {
        from: Input;
    }, main: (...args: CsParams<Input>) => void) => Gate[];
    var size: <Input extends Tuple<CsVarSpec<any>>>(inputs: {
        from: Input;
    }, main: (...args: CsParams<Input>) => void) => number;
    var print: <Input extends Tuple<CsVarSpec<any>>>(inputs: {
        from: Input;
    }, main: (...args: CsParams<Input>) => void) => void;
    var summary: <Input extends Tuple<CsVarSpec<any>>>(inputs: {
        from: Input;
    }, main: (...args: CsParams<Input>) => void) => Partial<Record<GateType | "Total rows", number>>;
}
type ConstraintSystemTestBase = {
    run: (cs: Gate[], inputs: TypeAndValue<any>[]) => boolean;
    label: string;
};
type Base = {
    kind?: undefined;
} & ConstraintSystemTestBase;
type Not = {
    kind: 'not';
} & ConstraintSystemTestBase;
type And = {
    kind: 'and';
    tests: ConstraintSystemTest[];
    label: string;
};
type Or = {
    kind: 'or';
    tests: ConstraintSystemTest[];
    label: string;
};
type ConstraintSystemTest = Base | Not | And | Or;
/**
 * Negate a test.
 */
declare function not(test: ConstraintSystemTest): ConstraintSystemTest;
/**
 * Check that all input tests pass.
 */
declare function and(...tests: ConstraintSystemTest[]): ConstraintSystemTest;
/**
 * Check that at least one input test passes.
 */
declare function or(...tests: ConstraintSystemTest[]): ConstraintSystemTest;
/**
 * General test
 */
declare function fulfills(label: string, run: (cs: Gate[], inputs: TypeAndValue<any>[]) => boolean): ConstraintSystemTest;
/**
 * Test for precise equality of the constraint system with a given list of gates.
 */
declare function equals(gates: readonly GateType[]): ConstraintSystemTest;
/**
 * Test that constraint system contains each of a list of gates consecutively.
 *
 * You can also pass a list of lists. In that case, the constraint system has to contain
 * each of the lists of gates in the given order, but not necessarily consecutively.
 *
 * @example
 * ```ts
 * // constraint system contains a Rot64 gate
 * contains('Rot64')
 *
 * // constraint system contains a Rot64 gate, followed directly by a RangeCheck0 gate
 * contains(['Rot64', 'RangeCheck0'])
 *
 * // constraint system contains two instances of the combination [Rot64, RangeCheck0]
 * contains([['Rot64', 'RangeCheck0'], ['Rot64', 'RangeCheck0']]])
 * ```
 */
declare function contains(gates: GateType | readonly GateType[] | readonly GateType[][]): ConstraintSystemTest;
/**
 * Test whether all inputs are constant.
 */
declare const allConstant: ConstraintSystemTest;
/**
 * Modifies a test so that it doesn't fail if all inputs are constant, and instead
 * checks that the constraint system is empty in that case.
 */
declare function ifNotAllConstant(test: ConstraintSystemTest): ConstraintSystemTest;
/**
 * Test whether constraint system is empty.
 */
declare const isEmpty: ConstraintSystemTest;
/**
 * Modifies a test so that it runs on the constraint system with generic gates filtered out.
 */
declare function withoutGenerics(test: ConstraintSystemTest): ConstraintSystemTest;
/**
 * "Test" that just pretty-prints the constraint system.
 */
declare const print: ConstraintSystemTest;
declare function repeat(n: number, gates: GateType | readonly GateType[]): readonly GateType[];
type CsVarSpec<T> = Provable<T, any> | {
    provable: Provable<T, any>;
};
type InferCsVar<T> = T extends {
    provable: Provable<infer U, any>;
} ? U : T extends Provable<infer U, any> ? U : never;
type CsParams<In extends Tuple<CsVarSpec<any>>> = {
    [k in keyof In]: InferCsVar<In[k]>;
};
type TypeAndValue<T> = {
    type: Provable<T, any>;
    value: T;
};

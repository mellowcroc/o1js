import { randomBytes } from '../../bindings/crypto/random.js';
import { Field } from '../provable/field.js';
import { FieldType, FieldVar } from '../provable/core/fieldvar.js';
import { Provable } from '../provable/provable.js';
import { Random } from './random.js';
import { test } from './property.js';
import { Undefined } from '../proof-system/zkprogram.js';
import { printGates, summarizeGates, synchronousRunners, } from '../provable/core/provable-context.js';
export { constraintSystem, not, and, or, fulfills, equals, contains, allConstant, ifNotAllConstant, isEmpty, withoutGenerics, print, repeat, };
// TODO get rid of this top-level await by making `test` support async functions
let { constraintSystemSync } = await synchronousRunners();
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
function constraintSystem(label, inputs, main, constraintSystemTest) {
    // create random generators
    let types = inputs.from.map(provable);
    let rngs = types.map(layout);
    test(...rngs, (...args) => {
        let layouts = args.slice(0, -1);
        // compute the constraint system
        let { gates } = constraintSystemSync(() => {
            // each random input "layout" has to be instantiated into vars in this circuit
            let values = types.map((type, i) => instantiate(type, layouts[i]));
            main(...values);
        });
        // run tests
        let typesAndValues = types.map((type, i) => ({ type, value: layouts[i] }));
        let { ok, failures } = run(constraintSystemTest, gates, typesAndValues);
        if (!ok) {
            console.log('Constraint system:');
            printGates(gates);
            throw Error(`Constraint system test: ${label}\n\n${failures.map((f) => `FAIL: ${f}`).join('\n')}\n`);
        }
    });
}
/**
 * Convenience function to run {@link constraintSystem} on the method of a {@link ZkProgram}.
 *
 * @example
 * ```ts
 * const program = ZkProgram({ methods: { myMethod: ... }, ... });
 *
 * constraintSystem.fromZkProgram(program, 'myMethod', contains('Rot64'));
 * ```
 */
constraintSystem.fromZkProgram = function fromZkProgram(program, methodName, test) {
    let program_ = program;
    let from = [...program_.privateInputTypes[methodName]];
    if (program_.publicInputType !== Undefined) {
        from.unshift(program_.publicInputType);
    }
    return constraintSystem(`${program_.name} / ${methodName}()`, { from }, program_.rawMethods[methodName], test);
};
function run(test, cs, inputs) {
    switch (test.kind) {
        case undefined: {
            let ok = test.run(cs, inputs);
            let failures = ok ? [] : [test.label];
            return { ok, failures };
        }
        case 'not': {
            let ok = test.run(cs, inputs);
            let failures = ok ? [`not(${test.label})`] : [];
            return { ok: !ok, failures };
        }
        case 'and': {
            let results = test.tests.map((t) => run(t, cs, inputs));
            let ok = results.every((r) => r.ok);
            let failures = ok ? [] : results.flatMap((r) => r.failures);
            return { ok, failures };
        }
        case 'or': {
            let results = test.tests.map((t) => run(t, cs, inputs));
            let ok = results.some((r) => r.ok);
            let failures = ok ? [] : results.flatMap((r) => r.failures);
            return { ok, failures };
        }
    }
}
/**
 * Negate a test.
 */
function not(test) {
    return { kind: 'not', ...test };
}
/**
 * Check that all input tests pass.
 */
function and(...tests) {
    return { kind: 'and', tests, label: `and(${tests.map((t) => t.label)})` };
}
/**
 * Check that at least one input test passes.
 */
function or(...tests) {
    return { kind: 'or', tests, label: `or(${tests.map((t) => t.label)})` };
}
/**
 * General test
 */
function fulfills(label, run) {
    return { run, label };
}
/**
 * Test for precise equality of the constraint system with a given list of gates.
 */
function equals(gates) {
    return {
        run(cs) {
            if (cs.length !== gates.length)
                return false;
            return cs.every((g, i) => g.type === gates[i]);
        },
        label: `equals ${JSON.stringify(gates)}`,
    };
}
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
function contains(gates) {
    let expectedGatess = toGatess(gates);
    return {
        run(cs) {
            let gates = cs.map((g) => g.type);
            let i = 0;
            let j = 0;
            for (let gate of gates) {
                if (gate === expectedGatess[i][j]) {
                    j++;
                    if (j === expectedGatess[i].length) {
                        i++;
                        j = 0;
                        if (i === expectedGatess.length)
                            return true;
                    }
                }
                else if (gate === expectedGatess[i][0]) {
                    j = 1;
                }
                else {
                    j = 0;
                }
            }
            return false;
        },
        label: `contains ${JSON.stringify(expectedGatess)}`,
    };
}
/**
 * Test whether all inputs are constant.
 */
const allConstant = {
    run(cs, inputs) {
        return inputs.every(({ type, value }) => type.toFields(value).every((x) => x.isConstant()));
    },
    label: 'all inputs constant',
};
/**
 * Modifies a test so that it doesn't fail if all inputs are constant, and instead
 * checks that the constraint system is empty in that case.
 */
function ifNotAllConstant(test) {
    return or(test, and(allConstant, isEmpty));
}
/**
 * Test whether constraint system is empty.
 */
const isEmpty = fulfills('constraint system is empty', (cs) => cs.length === 0);
/**
 * Modifies a test so that it runs on the constraint system with generic gates filtered out.
 */
function withoutGenerics(test) {
    return {
        run(cs, inputs) {
            return run(test, cs.filter((g) => g.type !== 'Generic'), inputs).ok;
        },
        label: `withoutGenerics(${test.label})`,
    };
}
/**
 * "Test" that just pretty-prints the constraint system.
 */
const print = {
    run(cs) {
        console.log('Constraint system:');
        printGates(cs);
        return true;
    },
    label: '',
};
// Do other useful things with constraint systems
/**
 * Get constraint system as a list of gates.
 */
constraintSystem.gates = function gates(inputs, main) {
    let types = inputs.from.map(provable);
    let { gates } = constraintSystemSync(() => {
        let values = types.map((type) => Provable.witness(type, () => {
            throw Error('not needed');
        }));
        main(...values);
    });
    return gates;
};
function map(transform) {
    return (inputs, main) => transform(constraintSystem.gates(inputs, main));
}
/**
 * Get size of constraint system.
 */
constraintSystem.size = map((gates) => gates.length);
/**
 * Print constraint system.
 */
constraintSystem.print = map(printGates);
/**
 * Get constraint system summary.
 */
constraintSystem.summary = map(summarizeGates);
function repeat(n, gates) {
    gates = Array.isArray(gates) ? gates : [gates];
    return Array(n).fill(gates).flat();
}
function toGatess(gateTypes) {
    if (typeof gateTypes === 'string')
        return [[gateTypes]];
    if (Array.isArray(gateTypes[0]))
        return gateTypes;
    return [gateTypes];
}
// Random generator for arbitrary provable types
function provable(spec) {
    return 'provable' in spec ? spec.provable : spec;
}
function layout(type) {
    let length = type.sizeInFields();
    return Random(() => {
        let fields = Array.from({ length }, () => new Field(drawFieldVar()));
        return type.fromFields(fields, type.toAuxiliary());
    });
}
function instantiate(type, value) {
    let fields = type.toFields(value).map((x) => instantiateFieldVar(x.value));
    return type.fromFields(fields, type.toAuxiliary());
}
// Random generator for fieldvars that exercises constants, variables and combinators
function drawFieldVar() {
    let fieldType = drawFieldType();
    switch (fieldType) {
        case FieldType.Constant: {
            return FieldVar.constant(1n);
        }
        case FieldType.Var: {
            return [FieldType.Var, 0];
        }
        case FieldType.Add: {
            let x = drawFieldVar();
            let y = drawFieldVar();
            // prevent blow-up of constant size
            if (x[0] === FieldType.Constant && y[0] === FieldType.Constant)
                return x;
            return FieldVar.add(x, y);
        }
        case FieldType.Scale: {
            let x = drawFieldVar();
            // prevent blow-up of constant size
            if (x[0] === FieldType.Constant)
                return x;
            return FieldVar.scale(3n, x);
        }
    }
}
function instantiateFieldVar(x) {
    switch (x[0]) {
        case FieldType.Constant: {
            return new Field(x);
        }
        case FieldType.Var: {
            return Provable.witness(Field, () => Field.from(0n));
        }
        case FieldType.Add: {
            let a = instantiateFieldVar(x[1]);
            let b = instantiateFieldVar(x[2]);
            return a.add(b);
        }
        case FieldType.Scale: {
            let a = instantiateFieldVar(x[2]);
            return a.mul(x[1][1]);
        }
    }
}
function drawFieldType() {
    let oneOf8 = randomBytes(1)[0] & 0b111;
    if (oneOf8 < 4)
        return FieldType.Var;
    if (oneOf8 < 6)
        return FieldType.Constant;
    if (oneOf8 === 6)
        return FieldType.Scale;
    return FieldType.Add;
}
//# sourceMappingURL=constraint-system.js.map
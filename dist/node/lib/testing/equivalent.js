/**
 * helpers for testing equivalence of two implementations, one of them on bigints
 */
import { test, Random } from '../testing/property.js';
import { Provable } from '../provable/provable.js';
import { deepEqual } from 'node:assert/strict';
import { Bool, Field } from '../provable/wrapped.js';
import { provable } from '../provable/types/provable-derivers.js';
import { assert } from '../provable/gadgets/common.js';
import { synchronousRunners } from '../provable/core/provable-context.js';
export { equivalent, equivalentProvable, equivalentAsync, oneOf, throwError, handleErrors, deepEqual as defaultAssertEqual, id, };
export { spec, field, fieldWithRng, bigintField, bool, boolean, unit, array, record, map, onlyIf, fromRandom, first, second, constant, };
// TODO get rid of this top-level await by making `test` support async functions
let { runAndCheckSync } = await synchronousRunners();
function id(x) {
    return x;
}
function oneOf(...specs) {
    // the randomly generated value from a union keeps track of which spec it came from
    let rng = Random.oneOf(...specs.map((spec, i) => Random.map(spec.rng, (x) => [i, x])));
    return { _isUnion: true, specs, rng };
}
function toUnion(spec) {
    let specAny = spec;
    return specAny._isUnion ? specAny : oneOf(specAny);
}
// equivalence tester
function equivalent({ from, to, verbose, }) {
    return function run(f1, f2, label = 'expect equal results') {
        let generators = from.map((spec) => spec.rng);
        let assertEqual = to.assertEqual ?? deepEqual;
        let start = performance.now();
        let nRuns = test(...generators, (...args) => {
            args.pop();
            let inputs = args;
            handleErrors(() => f1(...inputs), () => to.back(f2(...inputs.map((x, i) => from[i].there(x)))), (x, y) => assertEqual(x, y, label), label);
        });
        if (verbose) {
            let ms = (performance.now() - start).toFixed(1);
            let runs = nRuns.toString().padStart(2, ' ');
            console.log(`${label.padEnd(20, ' ')}    success on ${runs} runs in ${ms}ms.`);
        }
    };
}
// async equivalence
function equivalentAsync({ from, to }, { runs = 1 } = {}) {
    return async function run(f1, f2, label = 'expect equal results') {
        let generators = from.map((spec) => spec.rng);
        let assertEqual = to.assertEqual ?? deepEqual;
        let nexts = generators.map((g) => g.create());
        for (let i = 0; i < runs; i++) {
            let args = nexts.map((next) => next());
            let inputs = args;
            try {
                await handleErrorsAsync(() => f1(...inputs), async () => to.back(await f2(...inputs.map((x, i) => from[i].there(x)))), (x, y) => assertEqual(x, y, label), label);
            }
            catch (err) {
                console.log(...inputs);
                throw err;
            }
        }
    };
}
// equivalence tester for provable code
function isProvable(spec) {
    return spec.specs.some((spec) => spec.provable);
}
function equivalentProvable({ from: fromRaw, to, verbose, }) {
    let fromUnions = fromRaw.map(toUnion);
    assert(fromUnions.some(isProvable), 'equivalentProvable: no provable input');
    return function run(f1, f2, label = 'expect equal results') {
        let generators = fromUnions.map((spec) => spec.rng);
        let assertEqual = to.assertEqual ?? deepEqual;
        let start = performance.now();
        let nRuns = test.custom({ minRuns: 5 })(...generators, (...args) => {
            args.pop();
            // figure out which spec to use for each argument
            let from = args.map(([j], i) => fromUnions[i].specs[j]);
            let inputs = args.map(([, x]) => x);
            let inputs2 = inputs.map((x, i) => from[i].there(x));
            // outside provable code
            handleErrors(() => f1(...inputs), () => f2(...inputs2), (x, y) => assertEqual(x, to.back(y), label), label);
            // inside provable code
            runAndCheckSync(() => {
                let inputWitnesses = inputs2.map((x, i) => {
                    let provable = from[i].provable;
                    return provable !== undefined ? Provable.witness(provable, () => x) : x;
                });
                handleErrors(() => f1(...inputs), () => f2(...inputWitnesses), (x, y) => Provable.asProver(() => assertEqual(x, to.back(y), label)), label);
            });
        });
        if (verbose) {
            let ms = (performance.now() - start).toFixed(1);
            let runs = nRuns.toString().padStart(2, ' ');
            console.log(`${label.padEnd(20, ' ')}    success on ${runs} runs in ${ms}ms.`);
        }
    };
}
function spec(spec) {
    return {
        rng: spec.rng,
        there: spec.there ?? id,
        back: spec.back ?? id,
        assertEqual: spec.assertEqual,
        provable: spec.provable,
    };
}
// some useful specs
let unit = { back: id, assertEqual() { } };
let field = {
    rng: Random.field,
    there: Field,
    back: (x) => x.toBigInt(),
    provable: Field,
};
let bigintField = {
    rng: Random.field,
    there: id,
    back: id,
};
let bool = {
    rng: Random.boolean,
    there: Bool,
    back: (x) => x.toBoolean(),
    provable: Bool,
};
let boolean = fromRandom(Random.boolean);
function fieldWithRng(rng) {
    return { ...field, rng };
}
function array(spec, n) {
    return {
        rng: Random.array(spec.rng, n),
        there: (x) => x.map(spec.there),
        back: (x) => x.map(spec.back),
        provable: typeof n === 'number' && spec.provable ? Provable.Array(spec.provable, n) : undefined,
    };
}
function record(specs) {
    let isProvable = Object.values(specs).every((spec) => spec.provable);
    return {
        rng: Random.record(mapObject(specs, (spec) => spec.rng)),
        there: (x) => mapObject(specs, (spec, k) => spec.there(x[k])),
        back: (x) => mapObject(specs, (spec, k) => spec.back(x[k])),
        provable: isProvable ? provable(mapObject(specs, (spec) => spec.provable)) : undefined,
    };
}
function map({ from, to }, there) {
    return { ...to, rng: Random.map(from.rng, there) };
}
function onlyIf(spec, onlyIf) {
    return { ...spec, rng: Random.reject(spec.rng, (x) => !onlyIf(x)) };
}
function mapObject(t, map) {
    return Object.fromEntries(Object.entries(t).map(([k, v]) => [k, map(v, k)]));
}
function fromRandom(rng) {
    return { rng, there: id, back: id };
}
function first(spec) {
    return { rng: spec.rng, there: id, back: id };
}
function second(spec) {
    return {
        rng: Random.map(spec.rng, spec.there),
        there: id,
        back: id,
        provable: spec.provable,
    };
}
function constant(spec, value) {
    return { ...spec, rng: Random.constant(value) };
}
// helper to ensure two functions throw equivalent errors
function handleErrors(op1, op2, useResults, label) {
    let result1, result2;
    let error1;
    let error2;
    try {
        result1 = op1();
    }
    catch (err) {
        error1 = err;
    }
    try {
        result2 = op2();
    }
    catch (err) {
        error2 = err;
    }
    if (!!error1 !== !!error2) {
        error1 && console.log(error1);
        error2 && console.log(error2);
    }
    let message = `${(label && `${label}: `) || ''}equivalent errors`;
    deepEqual(!!error1, !!error2, message);
    if (!(error1 || error2) && useResults !== undefined) {
        return useResults(result1, result2);
    }
}
async function handleErrorsAsync(op1, op2, useResults, label) {
    let result1, result2;
    let error1;
    let error2;
    try {
        result1 = await op1();
    }
    catch (err) {
        error1 = err;
    }
    try {
        result2 = await op2();
    }
    catch (err) {
        error2 = err;
    }
    if (!!error1 !== !!error2) {
        error1 && console.log(error1);
        error2 && console.log(error2);
    }
    let message = `${(label && `${label}: `) || ''}equivalent errors`;
    deepEqual(!!error1, !!error2, message);
    if (!(error1 || error2) && useResults !== undefined) {
        return useResults(result1, result2);
    }
}
function throwError(message) {
    throw Error(message);
}
//# sourceMappingURL=equivalent.js.map
import { map, spec } from '../../testing/equivalent.js';
import { Random } from '../../testing/random.js';
import { Field3 } from '../gadgets/gadgets.js';
import { assert } from '../gadgets/common.js';
import { Bytes } from '../wrapped-classes.js';
import { simpleMapToCurve } from '../gadgets/elliptic-curve.js';
import { provable } from '../types/provable-derivers.js';
export { foreignField, unreducedForeignField, uniformForeignField, bytes, pointSpec, throwError };
// test input specs
function foreignField(F) {
    return {
        rng: Random.otherField(F),
        there: Field3.from,
        back: Field3.toBigint,
        provable: Field3.provable,
    };
}
// for testing with inputs > f
function unreducedForeignField(maxBits, F) {
    return {
        rng: Random.bignat(1n << BigInt(maxBits)),
        there: Field3.from,
        back: Field3.toBigint,
        provable: Field3.provable,
        assertEqual(x, y, message) {
            // need weak equality here because, while ffadd works on bigints larger than the modulus,
            // it can't fully reduce them
            assert(F.equal(x, y), message);
        },
    };
}
// for fields that must follow an unbiased distribution, like private keys
function uniformForeignField(F) {
    return {
        rng: Random(F.random),
        there: Field3.from,
        back: Field3.toBigint,
        provable: Field3.provable,
    };
}
function bytes(length) {
    const Bytes_ = Bytes(length);
    return spec({
        rng: Random.map(Random.bytes(length), (x) => Uint8Array.from(x)),
        there: Bytes_.from,
        back: (x) => x.toBytes(),
        provable: Bytes_.provable,
    });
}
function pointSpec(field, Curve) {
    // point but with independently random components, which will never form a valid point
    let pointShape = spec({
        rng: Random.record({ x: field.rng, y: field.rng }),
        there({ x, y }) {
            return { x: field.there(x), y: field.there(y) };
        },
        back({ x, y }) {
            return { x: field.back(x), y: field.back(y), infinity: false };
        },
        provable: provable({ x: field.provable, y: field.provable }),
    });
    // valid random point
    let point = map({ from: field, to: pointShape }, (x) => simpleMapToCurve(x, Curve));
    return point;
}
// helper
function throwError(message) {
    throw Error(message);
}
//# sourceMappingURL=test-utils.js.map
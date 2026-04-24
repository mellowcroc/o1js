import type { FiniteField } from '../../../bindings/crypto/finite-field.js';
import { ProvableSpec } from '../../testing/equivalent.js';
import { Field3 } from '../gadgets/gadgets.js';
import { CurveAffine } from '../../../bindings/crypto/elliptic-curve.js';
export { foreignField, unreducedForeignField, uniformForeignField, bytes, pointSpec, throwError };
declare function foreignField(F: FiniteField): ProvableSpec<bigint, Field3>;
declare function unreducedForeignField(maxBits: number, F: FiniteField): ProvableSpec<bigint, Field3>;
declare function uniformForeignField(F: FiniteField): ProvableSpec<bigint, Field3>;
declare function bytes(length: number): ProvableSpec<Uint8Array, import("../bytes.js").Bytes>;
declare function pointSpec<T>(field: ProvableSpec<bigint, T>, Curve: CurveAffine): ProvableSpec<{
    x: bigint;
    y: bigint;
}, {
    x: T;
    y: T;
}>;
declare function throwError<T>(message: string): T;

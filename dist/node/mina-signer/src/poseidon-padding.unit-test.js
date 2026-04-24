import { expect } from 'expect';
import { HashInput, packToFields, hashWithPrefix } from './poseidon-bigint.js';
import { Field } from './field-bigint.js';
import { signaturePrefix } from './signature.js';
/**
 * Demonstrates that adding zero padding inside a packed field chunk produces
 * a different packed field array and Poseidon digest.
 */
async function testPoseidonPaddingCollision() {
    const shortMessage = { packed: [[Field(1n), 1]] };
    const paddedMessage = { packed: [[Field(1n), 1], [Field(0n), 1]] };
    const packedShort = packToFields(shortMessage);
    const packedPadded = packToFields(paddedMessage);
    const dummyPubKey = { x: Field(3n), y: Field(5n) };
    const r = Field(7n);
    const net = 'testnet';
    const hashMessageCompat = (msg) => {
        const input = HashInput.append(msg, { fields: [dummyPubKey.x, dummyPubKey.y, r] });
        return hashWithPrefix(signaturePrefix(net), packToFields(input));
    };
    const hShort = hashMessageCompat(shortMessage);
    const hPadded = hashMessageCompat(paddedMessage);
    // With a non-zero payload bit, padding changes the packed field and the hash.
    expect(packedShort).not.toEqual(packedPadded);
    expect(hShort).not.toEqual(hPadded);
    // packing zero bits does produce the same result however
    const zeroPacked = { packed: [[Field(0n), 1]] };
    const zeroPaddedPacked = { packed: [[Field(0n), 1], [Field(0n), 1]] };
    expect(packToFields(zeroPacked)).toEqual(packToFields(zeroPaddedPacked));
}
await testPoseidonPaddingCollision();
//# sourceMappingURL=poseidon-padding.unit-test.js.map
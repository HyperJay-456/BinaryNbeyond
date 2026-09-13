import test from 'node:test';
import assert from 'node:assert/strict';
import bitwisePkg from '../js/bitwise/bitwise.js';
const { computeBitwise } = bitwisePkg;

test('Bitwise AND operation', () => {
    assert.equal(computeBitwise('and', 12, 5).raw, 4); // 1100 & 0101 = 0100 (4)
    assert.equal(computeBitwise('and', 255, 15).raw, 15);
    assert.equal(computeBitwise('and', 0, 100).raw, 0);
});

test('Bitwise OR operation', () => {
    assert.equal(computeBitwise('or', 12, 5).raw, 13); // 1100 | 0101 = 1101 (13)
    assert.equal(computeBitwise('or', 0, 42).raw, 42);
});

test('Bitwise XOR operation', () => {
    assert.equal(computeBitwise('xor', 12, 5).raw, 9); // 1100 ^ 0101 = 1001 (9)
    assert.equal(computeBitwise('xor', 42, 42).raw, 0);
});

test('Bitwise NOT operation', () => {
    // 8-bit NOT: ~5 in 8 bits = 255 - 5 = 250
    assert.equal(computeBitwise('not', 5, 0, 8).raw, 250);
    // 8-bit NOT: ~0 in 8 bits = 255
    assert.equal(computeBitwise('not', 0, 0, 8).raw, 255);
});

test('Bitwise Left Shift (<<)', () => {
    // 5 << 1 = 10
    assert.equal(computeBitwise('shl', 5, 1).raw, 10);
    // 3 << 3 = 24
    assert.equal(computeBitwise('shl', 3, 3).raw, 24);
});

test('Bitwise Right Shift (>>)', () => {
    // 20 >> 2 = 5
    assert.equal(computeBitwise('shr', 20, 2).raw, 5);
    // 7 >> 1 = 3
    assert.equal(computeBitwise('shr', 7, 1).raw, 3);
});

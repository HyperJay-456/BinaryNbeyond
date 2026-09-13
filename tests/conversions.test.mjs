import test from 'node:test';
import assert from 'node:assert/strict';
import { baseToDecimal } from '../js/conversions/baseTodecimal.js';
import { decimalToBase } from '../js/conversions/decimalToBase.js';
import { binaryToDecimal } from '../js/conversions/binaryToDecimal.js';
import { decimalToBinary } from '../js/conversions/decimalToBinary.js';
import { octalToDecimal } from '../js/conversions/octalToDecimal.js';
import { decimalToOctal } from '../js/conversions/decimalToOctal.js';
import { hexadecimalToDecimal } from '../js/conversions/hexadecimalToDecimal.js';
import { decimalToHexadecimal } from '../js/conversions/decimalToHexadecimal.js';
import { twosComplement } from '../js/conversions/twosComplement.js';
import { validateInput } from '../js/conversions/validations.js';

test('Input Validation across bases', () => {
    assert.equal(validateInput("10101", "binary"), true);
    assert.equal(validateInput("-101", "binary"), true);
    assert.equal(validateInput("102", "binary"), false);

    assert.equal(validateInput("755", "octal"), true);
    assert.equal(validateInput("789", "octal"), false);

    assert.equal(validateInput("12345", "decimal"), true);
    assert.equal(validateInput("12a", "decimal"), false);

    assert.equal(validateInput("1A3F", "hexadecimal"), true);
    assert.equal(validateInput("1GZ", "hexadecimal"), false);
});

test('Decimal <-> Binary Conversions', () => {
    assert.equal(decimalToBinary(42).result, "101010");
    assert.equal(decimalToBinary(0).result, "0");
    assert.equal(decimalToBinary(-42).result, "-101010");

    assert.equal(binaryToDecimal("101010").result, 42);
    assert.equal(binaryToDecimal("0").result, 0);
    assert.equal(binaryToDecimal("-101010").result, -42);
});

test('Decimal <-> Octal Conversions', () => {
    assert.equal(decimalToOctal(64).result, "100");
    assert.equal(decimalToOctal(0).result, "0");
    assert.equal(decimalToOctal(-64).result, "-100");

    assert.equal(octalToDecimal("100").result, 64);
    assert.equal(octalToDecimal("0").result, 0);
    assert.equal(octalToDecimal("-100").result, -64);
});

test('Decimal <-> Hexadecimal Conversions', () => {
    assert.equal(decimalToHexadecimal(255).result, "FF");
    assert.equal(decimalToHexadecimal(0).result, "0");
    assert.equal(decimalToHexadecimal(-255).result, "-FF");

    assert.equal(hexadecimalToDecimal("FF").result, 255);
    assert.equal(hexadecimalToDecimal("0").result, 0);
    assert.equal(hexadecimalToDecimal("-FF").result, -255);
});

test('Universal Base <-> Decimal Routing', () => {
    assert.equal(baseToDecimal("101", "binary").result, 5);
    assert.equal(baseToDecimal("17", "octal").result, 15);
    assert.equal(baseToDecimal("2A", "hexadecimal").result, 42);
    assert.equal(baseToDecimal("99", "decimal").result, 99);

    assert.equal(decimalToBase(5, "binary").result, "101");
    assert.equal(decimalToBase(15, "octal").result, "17");
    assert.equal(decimalToBase(42, "hexadecimal").result, "2A");
    assert.equal(decimalToBase(99, "decimal").result, "99");
});

test('2\'s Complement Calculator', () => {
    // 1011 (11) -> 1's comp 0100 + 1 -> 0101 (5)
    assert.equal(twosComplement("1011").result, "0101");
    // 0101 (5) -> 1's comp 1010 + 1 -> 1011
    assert.equal(twosComplement("0101").result, "1011");
    // With 8-bit padding
    assert.equal(twosComplement("00000101", 8).result, "11111011");
});

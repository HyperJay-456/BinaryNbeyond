import test from 'node:test';
import assert from 'node:assert/strict';
import {
    decimalArithmetic,
    binaryArithmetic,
    binarySubtractionWithTwosComplement
} from '../js/arithmetic/arithmetic.js';

test('Decimal Arithmetic - Addition, Subtraction, Multiplication', () => {
    assert.equal(decimalArithmetic("15", "25", "add"), "40");
    assert.equal(decimalArithmetic("50", "18", "sub"), "32");
    assert.equal(decimalArithmetic("12", "7", "mul"), "84");
});

test('Decimal Arithmetic - Division and Remainders', () => {
    assert.equal(decimalArithmetic("20", "5", "div"), "4");
    assert.equal(decimalArithmetic("23", "5", "div"), "4 R 3");
    assert.throws(() => decimalArithmetic("10", "0", "div"), /Cannot divide by zero/);
});

test('Decimal Arithmetic - Floating Point Calculations', () => {
    assert.equal(decimalArithmetic("3.5", "2.1", "add"), "5.6");
    assert.equal(decimalArithmetic("10.5", "2.5", "sub"), "8");
    assert.equal(decimalArithmetic("2.5", "4", "mul"), "10");
});

test('Binary Addition', () => {
    assert.equal(binaryArithmetic("101", "011", "add"), "1000"); // 5 + 3 = 8
    assert.equal(binaryArithmetic("1111", "1", "add"), "10000"); // 15 + 1 = 16
    assert.equal(binaryArithmetic("0", "0", "add"), "0");
});

test('Binary Subtraction (2\'s Complement)', () => {
    // 5 - 3 = 2 (101 - 011 = 10)
    assert.equal(binaryArithmetic("101", "011", "sub"), "10");
    // 10 - 2 = 8 (1010 - 10 = 1000)
    assert.equal(binaryArithmetic("1010", "10", "sub"), "1000");
    // 5 - 5 = 0
    assert.equal(binaryArithmetic("101", "101", "sub"), "0");
    // 3 - 5 = -2 (011 - 101 = -10)
    assert.equal(binaryArithmetic("011", "101", "sub"), "-10");
    // 1 - 7 = -6 (1 - 111 = -110)
    assert.equal(binaryArithmetic("1", "111", "sub"), "-110");
});

test('Binary Multiplication', () => {
    // 5 * 3 = 15 (101 * 011 = 1111)
    assert.equal(binaryArithmetic("101", "011", "mul"), "1111");
    // 6 * 4 = 24 (110 * 100 = 11000)
    assert.equal(binaryArithmetic("110", "100", "mul"), "11000");
    // 0 * 5 = 0
    assert.equal(binaryArithmetic("0", "101", "mul"), "0");
});

test('Binary Division and Remainders', () => {
    // 6 / 2 = 3 (110 / 10 = 11)
    assert.equal(binaryArithmetic("110", "10", "div"), "11");
    // 7 / 2 = 3 R 1 (111 / 10 = 11 R 1)
    assert.equal(binaryArithmetic("111", "10", "div"), "11 R 1");
    // Division by zero
    assert.throws(() => binaryArithmetic("101", "0", "div"), /Cannot divide by zero/);
});

test('Binary Negative Operand Arithmetic', () => {
    // -5 + 3 = -2 (-101 + 11 = -10)
    assert.equal(binaryArithmetic("-101", "11", "add"), "-10");
    // 5 + (-3) = 2 (101 + -11 = 10)
    assert.equal(binaryArithmetic("101", "-11", "add"), "10");
    // -5 + (-3) = -8 (-101 + -11 = -1000)
    assert.equal(binaryArithmetic("-101", "-11", "add"), "-1000");
    // 5 - (-3) = 8 (101 - -11 = 1000)
    assert.equal(binaryArithmetic("101", "-11", "sub"), "1000");
    // -5 - 3 = -8 (-101 - 11 = -1000)
    assert.equal(binaryArithmetic("-101", "11", "sub"), "-1000");
});

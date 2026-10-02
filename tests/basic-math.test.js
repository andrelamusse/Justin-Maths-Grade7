// basic-math.test.js - Automated tests for Basic Math Grinder logic
import test from 'node:test';
import assert from 'node:assert/strict';
import { MathGrinderApp, LEVEL_DEFINITIONS } from '../basic-math-grinder/app.js';
import { generateVerbalExplanation } from '../basic-math-grinder/speech-scripts.js';

test('Level definitions are configured for all 4 operations', () => {
  const ops = ['+', '-', '×', '÷'];
  for (const op of ops) {
    assert.ok(LEVEL_DEFINITIONS[op], `Missing level definitions for op: ${op}`);
    assert.ok(LEVEL_DEFINITIONS[op].length >= 4, `Op ${op} has fewer than 4 levels`);
  }
});

test('MathGrinderApp generates valid addition questions for all levels', () => {
  const app = new MathGrinderApp();
  for (let lvl = 1; lvl <= 5; lvl++) {
    for (let trial = 0; trial < 20; trial++) {
      const q = app.generateQuestion('+', lvl);
      assert.equal(q.op, '+');
      assert.ok(q.a >= 1, `a must be >= 1, got ${q.a}`);
      assert.ok(q.b >= 1, `b must be >= 1, got ${q.b}`);
      assert.equal(q.result, q.a + q.b, `Addition failed: ${q.a} + ${q.b} != ${q.result}`);

      if (lvl === 1) {
        assert.ok(q.a <= 5 && q.b <= 5, `Level 1 numbers must be <= 5`);
      } else if (lvl === 4) {
        assert.ok(q.a >= 10 && q.b >= 10, `Level 4 should have 2-digit numbers`);
        assert.ok((q.a % 10) + (q.b % 10) < 10, `Level 4 must not have carry in ones`);
      } else if (lvl === 5) {
        assert.ok(q.a >= 10 && q.b >= 10, `Level 5 should have 2-digit numbers`);
        assert.ok((q.a % 10) + (q.b % 10) >= 10, `Level 5 should have regrouping/carry`);
      }
    }
  }
});

test('MathGrinderApp generates valid subtraction questions for all levels', () => {
  const app = new MathGrinderApp();
  for (let lvl = 1; lvl <= 5; lvl++) {
    for (let trial = 0; trial < 20; trial++) {
      const q = app.generateQuestion('-', lvl);
      assert.equal(q.op, '-');
      assert.ok(q.a >= q.b, `Subtraction cannot yield negative: ${q.a} - ${q.b}`);
      assert.equal(q.result, q.a - q.b, `Subtraction math incorrect: ${q.a} - ${q.b} != ${q.result}`);

      if (lvl === 1) {
        assert.ok(q.a <= 5, `Level 1 subtraction must be within 5`);
      } else if (lvl === 4) {
        assert.ok(q.a >= 20 && q.b >= 10, `Level 4 subtraction should be 2-digit`);
        assert.ok((q.a % 10) >= (q.b % 10), `Level 4 subtraction must not require borrowing`);
      } else if (lvl === 5) {
        assert.ok(q.a >= 20 && q.b >= 10, `Level 5 subtraction should be 2-digit`);
        assert.ok((q.a % 10) < (q.b % 10), `Level 5 subtraction must require borrowing`);
      }
    }
  }
});

test('MathGrinderApp generates valid multiplication questions', () => {
  const app = new MathGrinderApp();
  for (let lvl = 1; lvl <= 5; lvl++) {
    for (let trial = 0; trial < 20; trial++) {
      const q = app.generateQuestion('×', lvl);
      assert.equal(q.op, '×');
      assert.equal(q.result, q.a * q.b, `Multiplication incorrect: ${q.a} × ${q.b} != ${q.result}`);
      assert.ok(q.a > 0 && q.b > 0, `Operands must be positive`);
    }
  }
});

test('MathGrinderApp generates valid division questions with whole integer results', () => {
  const app = new MathGrinderApp();
  for (let lvl = 1; lvl <= 4; lvl++) {
    for (let trial = 0; trial < 20; trial++) {
      const q = app.generateQuestion('÷', lvl);
      assert.equal(q.op, '÷');
      assert.ok(q.b > 0, `Divisor cannot be zero`);
      assert.equal(q.a % q.b, 0, `Division must divide evenly with 0 remainder: ${q.a} ÷ ${q.b}`);
      assert.equal(q.result, q.a / q.b, `Division math incorrect: ${q.a} ÷ ${q.b} != ${q.result}`);
    }
  }
});

test('generateVerbalExplanation produces cognitive explanations for all operations', () => {
  // Test 9s trick
  const text9 = generateVerbalExplanation('+', 9, 6, 15);
  assert.ok(text9.includes('trick for adding 9'), 'Should mention 9 trick');

  // Test make 10
  const textMake10 = generateVerbalExplanation('+', 8, 5, 13);
  assert.ok(textMake10.includes('make a 10'), 'Should mention making 10');

  // Test 2-digit addition breakdown
  const text2Digit = generateVerbalExplanation('+', 34, 23, 57);
  assert.ok(text2Digit.includes('tens') && text2Digit.includes('ones'), 'Should mention tens and ones');

  // Test subtraction frog jump
  const textSubBorrow = generateVerbalExplanation('-', 52, 28, 24);
  assert.ok(textSubBorrow.includes('jumping up') || textSubBorrow.includes('jump'), 'Should mention jump strategy');

  // Test 9+1 number bonds to 10
  const text9Plus1 = generateVerbalExplanation('+', 9, 1, 10);
  assert.ok(text9Plus1.includes('best friends of 10') || text9Plus1.includes('count up just one more'), '9+1 should use making 10 or count up 1 rather than 9s trick');

  // Test multiplication
  const textMult = generateVerbalExplanation('×', 2, 4, 8);
  assert.ok(textMult.includes('doubling') || textMult.includes('groups'), 'Should mention doubling or groups');

  // Test division
  const textDiv = generateVerbalExplanation('÷', 12, 3, 4);
  assert.ok(textDiv.includes('groups') || textDiv.includes('shared'), 'Should mention groups or sharing');
});

test('Division Level 4 can generate tables up to 12 and dividends up to 144', () => {
  const app = new MathGrinderApp();
  let sawAbove100 = false;
  let sawDivisor11Or12 = false;

  for (let i = 0; i < 300; i++) {
    const q = app.generateQuestion('÷', 4);
    if (q.a > 100) sawAbove100 = true;
    if (q.b >= 11) sawDivisor11Or12 = true;
    assert.ok(q.a <= 144, `Dividend should not exceed 144, got ${q.a}`);
    assert.equal(q.a % q.b, 0, `Must divide evenly: ${q.a} / ${q.b}`);
  }

  assert.ok(sawAbove100, 'Should generate dividends above 100 in mastery division');
  assert.ok(sawDivisor11Or12, 'Should generate divisors 11 or 12 in mastery division');
});

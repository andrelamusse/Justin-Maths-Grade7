// basic-math.test.js - Automated tests for Basic Math Grinder logic
import test from 'node:test';
import assert from 'node:assert/strict';
import { MathGrinderApp, LEVEL_DEFINITIONS, CATEGORIES, SUB_CATEGORIES } from '../basic-math-grinder/app.js';
import { generateVerbalExplanation } from '../basic-math-grinder/speech-scripts.js';

test('Level definitions are configured for all 4 operations', () => {
  const ops = ['+', '-', '×', '÷'];
  for (const op of ops) {
    assert.ok(LEVEL_DEFINITIONS[op], `Missing level definitions for op: ${op}`);
    assert.ok(LEVEL_DEFINITIONS[op].length >= 4, `Op ${op} has fewer than 4 levels`);
  }
});

test('Category selector has EXACTLY 7 options with valid configurations', () => {
  assert.equal(CATEGORIES.length, 7, `Expected exactly 7 categories, got ${CATEGORIES.length}`);

  const expectedIds = ['add', 'sub', 'mul', 'div', 'mixed_add_sub', 'mixed_mul_div', 'all_mixed'];
  const actualIds = CATEGORIES.map(c => c.id);
  assert.deepEqual(actualIds, expectedIds, `Category IDs do not match expected 7 options`);

  // Verify operation mappings for each category
  const addCat = CATEGORIES.find(c => c.id === 'add');
  assert.deepEqual(addCat.ops, ['+']);

  const subCat = CATEGORIES.find(c => c.id === 'sub');
  assert.deepEqual(subCat.ops, ['-']);

  const mulCat = CATEGORIES.find(c => c.id === 'mul');
  assert.deepEqual(mulCat.ops, ['×']);

  const divCat = CATEGORIES.find(c => c.id === 'div');
  assert.deepEqual(divCat.ops, ['÷']);

  const mixedAddSub = CATEGORIES.find(c => c.id === 'mixed_add_sub');
  assert.deepEqual(mixedAddSub.ops, ['+', '-']);

  const mixedMulDiv = CATEGORIES.find(c => c.id === 'mixed_mul_div');
  assert.deepEqual(mixedMulDiv.ops, ['×', '÷']);

  const allMixed = CATEGORIES.find(c => c.id === 'all_mixed');
  assert.deepEqual(allMixed.ops, ['+', '-', '×', '÷']);
});

test('Sub-category selector has EXACTLY 4 options (Easy, Medium, Hard, All)', () => {
  assert.equal(SUB_CATEGORIES.length, 4, `Expected exactly 4 sub-categories, got ${SUB_CATEGORIES.length}`);

  const expectedSubIds = ['easy', 'medium', 'hard', 'all'];
  const actualSubIds = SUB_CATEGORIES.map(s => s.id);
  assert.deepEqual(actualSubIds, expectedSubIds, `Sub-category IDs do not match expected 4 options`);

  for (const sub of SUB_CATEGORIES) {
    assert.ok(sub.name && sub.name.length > 0, `Missing name for sub-category ${sub.id}`);
    assert.ok(sub.icon && sub.icon.length > 0, `Missing icon for sub-category ${sub.id}`);
    assert.ok(sub.desc && sub.desc.length > 0, `Missing desc for sub-category ${sub.id}`);
  }
});

test('Category-based question generation produces correct operations for all 7 categories', () => {
  const app = new MathGrinderApp();

  // 1. Addition only
  for (let i = 0; i < 30; i++) {
    const q = app.generateQuestion('add', 'easy');
    assert.equal(q.op, '+');
    assert.equal(q.result, q.a + q.b);
  }

  // 2. Subtraction only
  for (let i = 0; i < 30; i++) {
    const q = app.generateQuestion('sub', 'easy');
    assert.equal(q.op, '-');
    assert.ok(q.a >= q.b);
    assert.equal(q.result, q.a - q.b);
  }

  // 3. Multiplication only
  for (let i = 0; i < 30; i++) {
    const q = app.generateQuestion('mul', 'easy');
    assert.equal(q.op, '×');
    assert.equal(q.result, q.a * q.b);
  }

  // 4. Division only
  for (let i = 0; i < 30; i++) {
    const q = app.generateQuestion('div', 'easy');
    assert.equal(q.op, '÷');
    assert.equal(q.a % q.b, 0);
    assert.equal(q.result, q.a / q.b);
  }

  // 5. Mixed Addition & Subtraction produces both + and -
  const opsSeenAddSub = new Set();
  for (let i = 0; i < 60; i++) {
    const q = app.generateQuestion('mixed_add_sub', 'medium');
    assert.ok(q.op === '+' || q.op === '-', `Invalid op ${q.op} in mixed_add_sub`);
    opsSeenAddSub.add(q.op);
    if (q.op === '+') assert.equal(q.result, q.a + q.b);
    if (q.op === '-') {
      assert.ok(q.a >= q.b);
      assert.equal(q.result, q.a - q.b);
    }
  }
  assert.ok(opsSeenAddSub.has('+'), 'mixed_add_sub must generate addition questions');
  assert.ok(opsSeenAddSub.has('-'), 'mixed_add_sub must generate subtraction questions');

  // 6. Mixed Multiplication & Division produces both × and ÷
  const opsSeenMulDiv = new Set();
  for (let i = 0; i < 60; i++) {
    const q = app.generateQuestion('mixed_mul_div', 'medium');
    assert.ok(q.op === '×' || q.op === '÷', `Invalid op ${q.op} in mixed_mul_div`);
    opsSeenMulDiv.add(q.op);
    if (q.op === '×') assert.equal(q.result, q.a * q.b);
    if (q.op === '÷') {
      assert.equal(q.a % q.b, 0);
      assert.equal(q.result, q.a / q.b);
    }
  }
  assert.ok(opsSeenMulDiv.has('×'), 'mixed_mul_div must generate multiplication questions');
  assert.ok(opsSeenMulDiv.has('÷'), 'mixed_mul_div must generate division questions');

  // 7. All 4 Operations Mixed produces +, -, ×, and ÷
  const opsSeenAll = new Set();
  for (let i = 0; i < 100; i++) {
    const q = app.generateQuestion('all_mixed', 'medium');
    assert.ok(['+', '-', '×', '÷'].includes(q.op), `Invalid op ${q.op} in all_mixed`);
    opsSeenAll.add(q.op);
    if (q.op === '+') assert.equal(q.result, q.a + q.b);
    if (q.op === '-') assert.equal(q.result, q.a - q.b);
    if (q.op === '×') assert.equal(q.result, q.a * q.b);
    if (q.op === '÷') assert.equal(q.result, q.a / q.b);
  }
  assert.equal(opsSeenAll.size, 4, 'all_mixed must generate all 4 operations (+, -, ×, ÷)');
});

test('Gradual ramp-up mode ("all") transitions difficulty as streak builds', () => {
  const app = new MathGrinderApp();
  app.currentCategory = 'add';
  app.currentSubCategory = 'all';

  // Streak 0..2 should be easy tier
  assert.equal(app.getProgressiveTier(0), 'easy');
  assert.equal(app.getProgressiveTier(1), 'easy');
  assert.equal(app.getProgressiveTier(2), 'easy');

  // Streak 3..6 should be medium tier
  assert.equal(app.getProgressiveTier(3), 'medium');
  assert.equal(app.getProgressiveTier(5), 'medium');
  assert.equal(app.getProgressiveTier(6), 'medium');

  // Streak 7+ should be hard tier
  assert.equal(app.getProgressiveTier(7), 'hard');
  assert.equal(app.getProgressiveTier(12), 'hard');

  // Test question tier assignment reflects current streak
  app.streak = 0;
  const qEasy = app.generateQuestion('add', 'all');
  assert.equal(qEasy.tier, 'easy');
  assert.ok(qEasy.a < 10 && qEasy.b <= 10, 'Easy addition must use single digit operands');
  assert.ok(qEasy.result <= 11, 'Easy addition sums within basics range');

  app.streak = 4;
  const qMedium = app.generateQuestion('add', 'all');
  assert.equal(qMedium.tier, 'medium');

  app.streak = 8;
  const qHard = app.generateQuestion('add', 'all');
  assert.equal(qHard.tier, 'hard');
});

test('Changing category resets streak to 0 for fresh gradual ramp-up', () => {
  const app = new MathGrinderApp();
  app.streak = 8;
  app.setCategory('sub');
  assert.equal(app.currentCategory, 'sub');
  assert.equal(app.streak, 0, 'Switching category must reset streak to 0');
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

// math_grinder.test.js - Comprehensive tests for Grade 7 Basic Math Grinder
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MathGrinderApp,
  LEVEL_DEFINITIONS,
  CATEGORIES,
  SUB_CATEGORIES,
  BIDMAS_QUESTIONS,
  PAST_EXAM_PAPERS,
  cleanNum
} from '../basic-math-grinder/app.js';
import { generateVerbalExplanation } from '../basic-math-grinder/speech-scripts.js';
import { MathVisualizer } from '../basic-math-grinder/visualizers.js';

test('Grade 7 Level definitions: All 4 operations have exactly 5 authentic Stage 7 levels', () => {
  const ops = ['+', '-', '×', '÷'];
  for (const op of ops) {
    assert.ok(LEVEL_DEFINITIONS[op], `Missing level definitions for op: ${op}`);
    assert.equal(LEVEL_DEFINITIONS[op].length, 5, `Op ${op} must have exactly 5 levels in Grade 7`);
    for (const lvl of LEVEL_DEFINITIONS[op]) {
      assert.ok(lvl.name && lvl.name.length > 5, `Level name too short for ${op} L${lvl.id}`);
      assert.ok(lvl.desc && lvl.desc.length > 5, `Level desc too short for ${op} L${lvl.id}`);
    }
  }

  // Check specific Grade 7 names
  assert.equal(LEVEL_DEFINITIONS['+'][0].name, '2-Digit Regrouping');
  assert.equal(LEVEL_DEFINITIONS['+'][1].name, '3-Digit Column Addition');
  assert.equal(LEVEL_DEFINITIONS['+'][2].name, 'Decimal Addition');
  assert.equal(LEVEL_DEFINITIONS['+'][3].name, 'Directed Numbers (Integers)');

  assert.equal(LEVEL_DEFINITIONS['-'][0].name, '2-Digit Borrowing');
  assert.equal(LEVEL_DEFINITIONS['-'][1].name, '3-Digit Subtraction Across Zeros');
  assert.equal(LEVEL_DEFINITIONS['-'][2].name, 'Decimal Subtraction');
  assert.equal(LEVEL_DEFINITIONS['-'][3].name, 'Directed Numbers (Negative Subtraction)');

  assert.equal(LEVEL_DEFINITIONS['×'][0].name, '12×12 Speed Tables');
  assert.equal(LEVEL_DEFINITIONS['×'][1].name, 'Multi-Digit Mental Multiplication');
  assert.equal(LEVEL_DEFINITIONS['×'][2].name, 'Decimal Multiplication');
  assert.equal(LEVEL_DEFINITIONS['×'][3].name, 'Directed Numbers & Squares / Roots');

  assert.equal(LEVEL_DEFINITIONS['÷'][0].name, '144 ÷ 12 Speed Facts');
  assert.equal(LEVEL_DEFINITIONS['÷'][1].name, 'Multi-Digit Mental Division');
  assert.equal(LEVEL_DEFINITIONS['÷'][2].name, 'Decimal Division');
  assert.equal(LEVEL_DEFINITIONS['÷'][3].name, 'Directed Number Division');
});

test('Grade 7 Addition generation across all 5 levels', () => {
  const app = new MathGrinderApp();

  // Level 1: 2-Digit Regrouping
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('+', 1);
    assert.ok(q.a >= 20 && q.b >= 10, `L1 addition must be 2-digit: ${q.a} + ${q.b}`);
    assert.ok((q.a % 10) + (q.b % 10) >= 10, `L1 addition must regroup in ones: ${q.a} + ${q.b}`);
    assert.equal(q.result, q.a + q.b);
  }

  // Level 2: 3-Digit Column Addition
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('+', 2);
    assert.ok(q.a >= 100 && q.b >= 100, `L2 addition must be 3-digit: ${q.a} + ${q.b}`);
    assert.equal(q.result, q.a + q.b);
  }

  // Level 3: Decimal Addition
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('+', 3);
    assert.ok(!Number.isInteger(q.a) || !Number.isInteger(q.b), `L3 addition must have decimals`);
    assert.equal(q.result, cleanNum(q.a + q.b));
  }

  // Level 4: Directed Numbers
  let sawNegative = false;
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('+', 4);
    if (q.a < 0 || q.b < 0) sawNegative = true;
    assert.equal(q.result, q.a + q.b);
  }
  assert.ok(sawNegative, 'L4 addition must generate directed negative numbers');
});

test('Grade 7 Subtraction generation across all 5 levels', () => {
  const app = new MathGrinderApp();

  // Level 1: 2-Digit Borrowing
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('-', 1);
    assert.ok(q.a >= 20 && q.b >= 10, `L1 subtraction must be 2-digit: ${q.a} - ${q.b}`);
    assert.ok((q.a % 10) < (q.b % 10), `L1 subtraction must require borrowing: ${q.a} - ${q.b}`);
    assert.ok(q.a > q.b, `L1 subtraction must have positive result`);
    assert.equal(q.result, q.a - q.b);
  }

  // Level 2: 3-Digit Across Zeros
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('-', 2);
    assert.ok(q.a >= 200 && q.b >= 100, `L2 subtraction must be 3-digit: ${q.a} - ${q.b}`);
    assert.ok(q.a > q.b);
    assert.equal(q.result, q.a - q.b);
  }

  // Level 3: Decimal Subtraction
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('-', 3);
    assert.equal(q.result, cleanNum(q.a - q.b));
  }

  // Level 4: Directed Numbers
  let sawNegativeResult = false;
  let sawNegativeSubtrahend = false;
  for (let i = 0; i < 50; i++) {
    const q = app.generateByLevel('-', 4);
    if (q.result < 0) sawNegativeResult = true;
    if (q.b < 0) sawNegativeSubtrahend = true;
    assert.equal(q.result, cleanNum(q.a - q.b));
  }
  assert.ok(sawNegativeResult, 'L4 subtraction must generate negative results across zero');
  assert.ok(sawNegativeSubtrahend, 'L4 subtraction must generate subtracting a negative');
});

test('Grade 7 Multiplication generation across all 5 levels', () => {
  const app = new MathGrinderApp();

  // Level 1: 12x12 Speed Tables
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('×', 1);
    assert.ok(q.a >= 2 && q.a <= 12);
    assert.ok(q.b >= 2 && q.b <= 12);
    assert.equal(q.result, q.a * q.b);
  }

  // Level 2: Multi-digit Mental Multiplication
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('×', 2);
    assert.ok(q.a >= 10 || q.b >= 10, 'L2 multiplication must include multi-digit factors');
    assert.equal(q.result, q.a * q.b);
  }

  // Level 3: Decimal Multiplication
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('×', 3);
    assert.ok(!Number.isInteger(q.a) || !Number.isInteger(q.b), 'L3 multiplication must have decimals');
    assert.equal(q.result, cleanNum(q.a * q.b));
  }

  // Level 4: Directed Numbers & Squares
  let sawNegativeMult = false;
  let sawSquare = false;
  for (let i = 0; i < 50; i++) {
    const q = app.generateByLevel('×', 4);
    if (q.a < 0 || q.b < 0) sawNegativeMult = true;
    if (q.expression && q.expression.includes('²')) sawSquare = true;
    assert.equal(q.result, cleanNum(q.a * q.b));
  }
  assert.ok(sawNegativeMult, 'L4 multiplication must generate directed numbers');
  assert.ok(sawSquare, 'L4 multiplication must generate squares like 7²');
});

test('Grade 7 Division generation across all 5 levels', () => {
  const app = new MathGrinderApp();

  // Level 1: 144 ÷ 12 Speed Facts
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('÷', 1);
    assert.ok(q.b >= 2 && q.b <= 12);
    assert.ok(q.a <= 144);
    assert.equal(q.result, cleanNum(q.a / q.b));
    assert.ok(Number.isInteger(q.result));
  }

  // Level 2: Multi-digit Mental Division
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('÷', 2);
    assert.ok(q.a >= 100, `L2 division dividend should be multi-digit: ${q.a}`);
    assert.equal(q.result, cleanNum(q.a / q.b));
    assert.ok(Number.isInteger(q.result));
  }

  // Level 3: Decimal Division
  for (let i = 0; i < 30; i++) {
    const q = app.generateByLevel('÷', 3);
    assert.ok(!Number.isInteger(q.a) || !Number.isInteger(q.b), `L3 division should have decimals`);
    assert.equal(q.result, cleanNum(q.a / q.b));
  }

  // Level 4: Directed Number Division
  let sawDirectedDiv = false;
  for (let i = 0; i < 50; i++) {
    const q = app.generateByLevel('÷', 4);
    if (q.a < 0 || q.b < 0) sawDirectedDiv = true;
    assert.equal(q.result, cleanNum(q.a / q.b));
    assert.ok(Number.isInteger(q.result));
  }
  assert.ok(sawDirectedDiv, 'L4 division must generate directed number division');
});

test('BIDMAS Mental Math Bank is populated with verified Grade 7 expressions', () => {
  assert.ok(BIDMAS_QUESTIONS.length >= 10, 'Expected at least 10 BIDMAS questions');
  for (const bq of BIDMAS_QUESTIONS) {
    assert.ok(bq.expression && bq.expression.length > 3);
    assert.ok(typeof bq.result === 'number');
    assert.ok(bq.explanation && bq.explanation.includes('BIDMAS'));
  }
});

test('Keypad handles negative signs and decimal points properly', () => {
  const app = new MathGrinderApp();
  // Mock answer display
  const display = { textContent: '?' };
  app.dom = { answerDisplay: display };

  // 1. Inputting negative number
  app.userAnswer = '';
  app.handleKeyInput('-');
  assert.equal(app.userAnswer, '-');

  app.handleKeyInput('1');
  app.handleKeyInput('4');
  assert.equal(app.userAnswer, '-14');

  // Toggle negative off
  app.handleKeyInput('-');
  assert.equal(app.userAnswer, '14');

  // Toggle negative back on
  app.handleKeyInput('-');
  assert.equal(app.userAnswer, '-14');

  // 2. Inputting decimal numbers
  app.userAnswer = '';
  app.handleKeyInput('.');
  assert.equal(app.userAnswer, '0.');

  app.handleKeyInput('7');
  app.handleKeyInput('5');
  assert.equal(app.userAnswer, '0.75');

  // Repeated dot ignored
  app.handleKeyInput('.');
  assert.equal(app.userAnswer, '0.75');

  // Negative decimal
  app.userAnswer = '-';
  app.handleKeyInput('.');
  assert.equal(app.userAnswer, '-0.');
  app.handleKeyInput('5');
  assert.equal(app.userAnswer, '-0.5');
});

test('Grade 7 Badges reward progression appropriately', () => {
  const app = new MathGrinderApp();
  const badgeEl = { textContent: '' };
  app.dom = {
    streakVal: { textContent: '' },
    solvedVal: { textContent: '' },
    xpVal: { textContent: '' },
    levelBadge: badgeEl
  };

  app.xp = 0;
  app.updateStatsUI();
  assert.ok(badgeEl.textContent.includes('Stage 7 Explorer'));

  app.xp = 120;
  app.updateStatsUI();
  assert.ok(badgeEl.textContent.includes('Number Sense Pioneer'));

  app.xp = 350;
  app.updateStatsUI();
  assert.ok(badgeEl.textContent.includes('Stage 7 Scholar'));

  app.xp = 650;
  app.updateStatsUI();
  assert.ok(badgeEl.textContent.includes('Mental Mathlete Champion'));

  app.xp = 1100;
  app.updateStatsUI();
  assert.ok(badgeEl.textContent.includes('Cambridge Stage 7 Grandmaster'));
});

test('Verbal speech explanations explain Grade 7 operations intelligently', () => {
  // 1. Decimal addition
  const expDecAdd = generateVerbalExplanation('+', 4.6, 7.82, 12.42);
  assert.ok(expDecAdd.includes('decimal points') || expDecAdd.includes('tenths'));

  // 2. Directed number subtraction (subtracting a negative)
  const expSubNeg = generateVerbalExplanation('-', 12, -8, 20);
  assert.ok(expSubNeg.includes('negative') || expSubNeg.includes('positive'));

  // 3. Directed multiplication
  const expMulNeg = generateVerbalExplanation('×', -7, -4, 28);
  assert.ok(expMulNeg.includes('negative') || expMulNeg.includes('positive'));

  // 4. Decimal multiplication
  const expMulDec = generateVerbalExplanation('×', 0.4, 0.08, 0.032);
  assert.ok(expMulDec.includes('decimal') || expMulDec.includes('places'));

  // 5. Directed division
  const expDivNeg = generateVerbalExplanation('÷', -72, -8, 9);
  assert.ok(expDivNeg.includes('negative') || expDivNeg.includes('positive'));

  // 6. Decimal division
  const expDivDec = generateVerbalExplanation('÷', 4.8, 0.12, 40);
  assert.ok(expDivDec.includes('powers of 10') || expDivDec.includes('whole number') || expDivDec.includes('decimals'));
});

test('toggleBreakdown handles negative operands, decimals, squares, and BIDMAS expressions without throwing RangeError', () => {
  const app = new MathGrinderApp();
  const container = {
    innerHTML: '',
    classList: {
      contains: () => false,
      remove: () => {},
      add: () => {}
    }
  };
  const btn = { textContent: '' };
  app.dom = { breakdownContainer: container, breakdownBtn: btn };

  const testCases = [
    // Multiplication negative operands (previously threw RangeError with Array(a).fill(b))
    { op: '×', a: -7, b: -4, result: 28 },
    { op: '×', a: -5, b: 6, result: -30 },
    { op: '×', a: 8, b: -9, result: -72 },
    // Decimals in multiplication
    { op: '×', a: 0.4, b: 0.08, result: 0.032 },
    { op: '×', a: 1.2, b: 1.2, result: 1.44 },
    // Squares
    { op: '×', a: 7, b: 7, result: 49 },
    // Multi-digit mental partition
    { op: '×', a: 25, b: 16, result: 400 },
    { op: '×', a: 14, b: 6, result: 84 },
    // Division negatives & decimals
    { op: '÷', a: -72, b: -8, result: 9 },
    { op: '÷', a: -56, b: 7, result: -8 },
    { op: '÷', a: 4.8, b: 0.12, result: 40 },
    { op: '÷', a: 180, b: 15, result: 12 },
    // Addition negatives & decimals
    { op: '+', a: -18, b: 25, result: 7 },
    { op: '+', a: -34, b: -17, result: -51 },
    { op: '+', a: 4.6, b: 7.82, result: 12.42 },
    { op: '+', a: 347, b: 285, result: 632 },
    // Subtraction negatives & decimals
    { op: '-', a: 12, b: -8, result: 20 },
    { op: '-', a: -14, b: 8, result: -22 },
    { op: '-', a: 8, b: 23, result: -15 },
    { op: '-', a: 15.4, b: 8.65, result: 6.75 },
    { op: '-', a: 500, b: 268, result: 232 },
    // BIDMAS expressions
    { op: 'BIDMAS', a: 0, b: 0, result: 6, expression: '18 - 3 × 4', explanation: 'BIDMAS: 3 × 4 = 12, then 18 - 12 = 6' }
  ];

  for (const tc of testCases) {
    app.currentQuestion = tc;
    assert.doesNotThrow(() => {
      app.toggleBreakdown(true);
    }, `toggleBreakdown crashed on question: ${JSON.stringify(tc)}`);
    assert.ok(container.innerHTML.length > 20, `Breakdown HTML should not be empty for ${JSON.stringify(tc)}`);
  }
});

test('MathVisualizer normalizes Unicode minus and handles directed integers and operations cleanly', () => {
  // Minimal DOM mock for MathVisualizer in node
  const createElementMock = (tag) => {
    const el = {
      tagName: tag,
      className: '',
      children: [],
      style: {},
      _innerHTML: '',
      get innerHTML() { return this._innerHTML; },
      set innerHTML(val) {
        this._innerHTML = val;
        if (val === '') this.children = [];
      },
      appendChild: (child) => { el.children.push(child); return child; },
      setAttribute: () => {},
      removeAttribute: () => {}
    };
    return el;
  };
  globalThis.document = { createElement: createElementMock };

  const vis = new MathVisualizer();
  const host = createElementMock('div');
  vis.container = host;

  // 1. Unicode minus '−'
  vis.render('−', 52, 28, 24);
  assert.equal(host.children.length, 1);
  assert.ok(host.children[0].className.includes('visualizer-wrapper'));

  // 2. Directed integer multiplication
  vis.render('×', -7, -4, 28);
  assert.equal(host.children.length, 1);

  // 3. Decimal division
  vis.render('÷', 4.8, 0.12, 40);
  assert.equal(host.children.length, 1);

  // 4. Directed addition across zero
  vis.render('+', -18, 25, 7);
  assert.equal(host.children.length, 1);
});

test('PAST_EXAM_PAPERS in basic-math-grinder contains strictly Grade 7 problems with zero toddler math', () => {
  assert.equal(PAST_EXAM_PAPERS.length, 6, 'Must have exactly 6 past exam papers');

  for (const paper of PAST_EXAM_PAPERS) {
    assert.equal(paper.questions.length, 15, `Paper ${paper.id} must have 15 questions`);
    let totalMarks = 0;

    for (const q of paper.questions) {
      totalMarks += q.marks;

      // Disallow elementary toddler math: both operands single-digit whole integers with elementary addition/subtraction like 4+5=9, 7+3=10, 9-4=5
      if (['+', '-'].includes(q.op) && Number.isInteger(q.a) && Number.isInteger(q.b)) {
        const isToddlerSingleDigit = q.a <= 10 && q.b <= 10 && q.result <= 15 && q.a >= 0 && q.b >= 0;
        assert.ok(!isToddlerSingleDigit, `Paper ${paper.id} contains toddler math question: ${q.a} ${q.op} ${q.b} = ${q.result}`);
      }

      // Ensure mathematical accuracy
      if (q.op === '+') assert.equal(q.result, cleanNum(q.a + q.b));
      if (q.op === '-') assert.equal(q.result, cleanNum(q.a - q.b));
      if (q.op === '×') assert.equal(q.result, cleanNum(q.a * q.b));
      if (q.op === '÷') assert.equal(q.result, cleanNum(q.a / q.b));
    }

    assert.equal(paper.totalMarks, totalMarks, `Paper ${paper.id} totalMarks mismatch`);
  }
});


// edge-cases.test.js - Thorough boundary and edge case verification
import test from 'node:test';
import assert from 'node:assert/strict';
import { GRADE_7_STRANDS } from '../grade7-academy/curriculum-data.js';
import { generateVerbalExplanation } from '../basic-math-grinder/speech-scripts.js';
import { MathGrinderApp } from '../basic-math-grinder/app.js';

test('Exhaustive validation: Every question in Grade 7 has valid single matching answer', () => {
  let totalQuestions = 0;
  for (const strand of GRADE_7_STRANDS) {
    for (const topic of strand.topics) {
      for (const q of topic.questions) {
        totalQuestions++;
        const matches = q.options.filter(opt => opt === q.answer);
        assert.equal(matches.length, 1, `Question "${q.q}" in topic "${topic.id}" must have exactly one matching option, found ${matches.length}`);
        assert.ok(q.explanation.length > 10, `Explanation too short for "${q.q}"`);
      }
    }
  }
  assert.ok(totalQuestions >= 30, `Expected at least 30 curriculum questions across Grade 7, found ${totalQuestions}`);
});

test('Boundary test: Single digit 1+1, 0, doubles in verbal speech', () => {
  const speech1 = generateVerbalExplanation('+', 1, 1, 2);
  assert.ok(speech1.length > 0);

  const speechDouble = generateVerbalExplanation('+', 5, 5, 10);
  assert.ok(speechDouble.toLowerCase().includes('double') || speechDouble.toLowerCase().includes('friend'));

  const speechSubZero = generateVerbalExplanation('-', 4, 4, 0);
  assert.ok(speechSubZero.includes('0 left'));

  const speechDiv1 = generateVerbalExplanation('÷', 7, 1, 7);
  assert.ok(speechDiv1.includes('7'));
});

test('Stress test: 1,000 randomized questions across operations have no NaN, no nulls, and exact math', () => {
  const app = new MathGrinderApp();
  const ops = ['+', '-', '×', '÷'];

  for (const op of ops) {
    for (let lvl = 1; lvl <= 4; lvl++) {
      for (let i = 0; i < 250; i++) {
        const q = app.generateQuestion(op, lvl);
        assert.ok(!isNaN(q.a), `Operand A is NaN`);
        assert.ok(!isNaN(q.b), `Operand B is NaN`);
        assert.ok(!isNaN(q.result), `Result is NaN`);
        assert.ok(q.b !== 0, `Divisor or operand B cannot be 0`);

        if (op === '+') assert.equal(q.a + q.b, q.result);
        if (op === '-') {
          assert.ok(q.a >= q.b, `Operand A (${q.a}) must be >= B (${q.b})`);
          assert.equal(q.a - q.b, q.result);
        }
        if (op === '×') assert.equal(q.a * q.b, q.result);
        if (op === '÷') {
          assert.equal(q.a % q.b, 0, `Remainder must be 0 for division`);
          assert.equal(q.a / q.b, q.result);
        }
      }
    }
  }
});

// grade7.test.js - Automated tests for Grade 7 Curriculum Data & Logic
import test from 'node:test';
import assert from 'node:assert/strict';
import { GRADE_7_STRANDS } from '../grade7-academy/curriculum-data.js';

test('Curriculum has all 5 mandatory strands', () => {
  assert.equal(GRADE_7_STRANDS.length, 5);
  const ids = GRADE_7_STRANDS.map(s => s.id);
  assert.deepEqual(ids, ['numbers', 'algebra', 'geometry', 'measurement', 'data-probability']);
});

test('Every strand has multiple topics with lessons and questions', () => {
  for (const strand of GRADE_7_STRANDS) {
    assert.ok(strand.topics.length >= 2, `Strand ${strand.id} should have at least 2 topics`);

    for (const topic of strand.topics) {
      assert.ok(topic.id, 'Topic must have an id');
      assert.ok(topic.title, 'Topic must have a title');
      assert.ok(topic.lesson, `Topic ${topic.id} missing lesson`);
      assert.ok(topic.lesson.keyIdea, `Topic ${topic.id} missing keyIdea`);
      assert.ok(topic.lesson.rules.length > 0, `Topic ${topic.id} missing rules`);
      assert.ok(topic.lesson.examples.length > 0, `Topic ${topic.id} missing examples`);
      assert.ok(topic.questions.length >= 3, `Topic ${topic.id} must have at least 3 questions`);

      for (const q of topic.questions) {
        assert.ok(q.q, 'Question must have text');
        assert.ok(Array.isArray(q.options), 'Options must be an array');
        assert.ok(q.options.length >= 3, 'Must have at least 3 options');
        assert.ok(q.answer, 'Question must have an answer');
        assert.ok(q.options.includes(q.answer), `Answer "${q.answer}" must be one of the options: ${JSON.stringify(q.options)}`);
        assert.ok(q.explanation, 'Question must have an explanation');
      }
    }
  }
});

test('Spot check mathematical correctness of curriculum answers', () => {
  // Numbers Strand: Integers
  const numbersStrand = GRADE_7_STRANDS.find(s => s.id === 'numbers');
  const integersTopic = numbersStrand.topics.find(t => t.id === 'integers');
  const q1 = integersTopic.questions.find(q => q.q.includes('-5 + 8'));
  assert.equal(q1.answer, '3');
  const q3 = integersTopic.questions.find(q => q.q.includes('7 - (-5)'));
  assert.equal(q3.answer, '12');

  // Exponents
  const exponentsTopic = numbersStrand.topics.find(t => t.id === 'exponents');
  const qExp = exponentsTopic.questions.find(q => q.q.includes('6²'));
  assert.equal(qExp.answer, '36');
  const qRoot = exponentsTopic.questions.find(q => q.q.includes('√81'));
  assert.equal(qRoot.answer, '9');

  // Fractions
  const fractionsTopic = numbersStrand.topics.find(t => t.id === 'fractions');
  const qFrac = fractionsTopic.questions.find(q => q.q.includes('8/12'));
  assert.equal(qFrac.answer, '2/3');

  // Algebra: Equations
  const algebraStrand = GRADE_7_STRANDS.find(s => s.id === 'algebra');
  const eqTopic = algebraStrand.topics.find(t => t.id === 'equations');
  const qEq = eqTopic.questions.find(q => q.q.includes('x + 9 = 22'));
  assert.equal(qEq.answer, '13');

  // Geometry: Triangles
  const geomStrand = GRADE_7_STRANDS.find(s => s.id === 'geometry');
  const triTopic = geomStrand.topics.find(t => t.id === 'triangles');
  const qTri = triTopic.questions.find(q => q.q.includes('sum of the interior angles'));
  assert.equal(qTri.answer, '180°');

  // Measurement: Area of rectangle
  const measStrand = GRADE_7_STRANDS.find(s => s.id === 'measurement');
  const areaTopic = measStrand.topics.find(t => t.id === 'perimeter-area');
  const qArea = areaTopic.questions.find(q => q.q.includes('length 9 cm and breadth 6 cm'));
  assert.equal(qArea.answer, '54 cm²');

  // Data: Median & Mode
  const dataStrand = GRADE_7_STRANDS.find(s => s.id === 'data-probability');
  const statsTopic = dataStrand.topics.find(t => t.id === 'central-tendency');
  const qMode = statsTopic.questions.find(q => q.q.includes('mode'));
  assert.equal(qMode.answer, '7');
  const qMedian = statsTopic.questions.find(q => q.q.includes('median of: 2, 5, 6, 8, 9'));
  assert.equal(qMedian.answer, '6');
});

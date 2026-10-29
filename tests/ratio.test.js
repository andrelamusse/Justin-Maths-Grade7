import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RATIO_TOPICS,
  RATIO_SUB_CATEGORIES,
  CHEAT_SHEET_DATA,
  RatioExamApp,
  gcd,
  simplifyRatio
} from '../basic-math-grinder/ratio.js';

test('Ratio Exam Cram has all 10 mandatory Grade 7 topics and 4 difficulty levels', () => {
  assert.equal(RATIO_TOPICS.length, 10);
  assert.equal(RATIO_SUB_CATEGORIES.length, 4);
  const subIds = RATIO_SUB_CATEGORIES.map(s => s.id);
  assert.deepEqual(subIds, ['easy', 'medium', 'hard', 'all']);
  assert.ok(CHEAT_SHEET_DATA.length >= 6);
});

test('Helper functions gcd and simplifyRatio compute exact reduced ratios', () => {
  assert.equal(gcd(12, 18), 6);
  assert.equal(simplifyRatio(40, 200), '1:5');
  assert.equal(simplifyRatio(80, 200), '2:5');
  assert.equal(simplifyRatio(35, 65), '7:13');
});

test('1,000+ randomized trials across all 10 topics and difficulty levels produce exact, clean answers and valid verbal/breakdown steps', () => {
  const app = new RatioExamApp();
  const tiers = ['easy', 'medium', 'hard', 'all'];

  // 10 topics x 4 tiers x 30 iterations = 1,200 trials
  for (const topic of RATIO_TOPICS) {
    for (const tier of tiers) {
      for (let i = 0; i < 30; i++) {
        const q = app.generateQuestion(topic.id, tier);

        assert.equal(q.topicId, topic.id, `Expected topic ${topic.id}`);
        assert.ok(q.prompt && q.prompt.length > 10, 'Prompt must be non-empty');
        assert.ok(!q.prompt.includes('NaN') && !q.prompt.includes('undefined') && !q.prompt.includes('Infinity'), `Invalid token in prompt: ${q.prompt}`);

        // Validate answer format (either positive integer or a:b positive integer ratio)
        assert.ok(q.answer && typeof q.answer === 'string', 'Answer must be a non-empty string');
        assert.ok(!q.answer.includes('NaN') && !q.answer.includes('undefined') && !q.answer.includes('Infinity') && !q.answer.includes('-'), `Invalid answer: ${q.answer}`);

        if (q.answerType === 'ratio') {
          assert.match(q.answer, /^[1-9]\d*:[1-9]\d*$/, `Ratio answer must be clean a:b integers, got ${q.answer}`);
          // For topic 2 (simplify) and topic 6 hard, ratio must be in simplest form
          if (topic.id === 'simplify' || topic.id === 'fractions_pct') {
            const [left, right] = q.answer.split(':').map(Number);
            assert.equal(gcd(left, right), 1, `Expected simplified ratio for ${topic.id}, got ${q.answer}`);
          }
        } else {
          assert.match(q.answer, /^[1-9]\d*$/, `Numeric answer must be a positive integer, got ${q.answer}`);
        }

        // Verify checkUserAnswer accepts the exact answer
        assert.equal(app.checkUserAnswer(q.answer, q), true, `checkUserAnswer failed on valid answer ${q.answer}`);

        // Validate verbal script and breakdown steps have no NaN, undefined, Infinity, or negative numbers
        assert.ok(q.verbal && q.verbal.length > 15, 'Verbal explanation must be present');
        assert.ok(!q.verbal.includes('NaN') && !q.verbal.includes('undefined') && !q.verbal.includes('Infinity'), `Bad verbal text: ${q.verbal}`);
        assert.equal(/-\d/.test(q.verbal), false, `Negative number found in verbal script: ${q.verbal}`);

        assert.ok(Array.isArray(q.steps) && q.steps.length >= 3, 'Must have at least 3 breakdown steps');
        for (const step of q.steps) {
          assert.ok(!step.includes('NaN') && !step.includes('undefined') && !step.includes('Infinity'), `Bad step: ${step}`);
          assert.equal(/-\d/.test(step), false, `Negative number found in breakdown step: ${step}`);
        }

        // Validate Visual Bar Model
        assert.ok(q.barModel && Array.isArray(q.barModel.groups) && q.barModel.groups.length >= 1, 'Bar model must have groups');
        assert.ok(q.tip && q.tip.length > 10, 'How It Works tip must be present');
      }
    }
  }
});

test('3 Mock Tests generate 15 questions across all 10 topics and produce accurate report cards & weak topic lists', () => {
  const app = new RatioExamApp();

  for (const mockNum of [1, 2, 3]) {
    const mock = app.createMockTest(mockNum);
    assert.equal(mock.questions.length, 15);
    assert.ok(mock.totalMarks >= 15);

    const coveredTopics = new Set(mock.questions.map(q => q.topicId));
    assert.equal(coveredTopics.size, 10, `Mock test ${mockNum} must cover all 10 ratio topics`);

    // Simulate answering first 12 right and last 3 wrong
    for (let i = 0; i < 15; i++) {
      const q = mock.questions[i];
      const input = i < 12 ? q.answer : '999999';
      app.submitMockAnswer(input);
    }

    assert.equal(mock.completed, true);
    const report = app.gradeMockTest(mock);
    assert.equal(report.correctCount, 12);
    assert.equal(report.totalQuestions, 15);
    assert.ok(report.missedTopicIds.length >= 1);
  }
});

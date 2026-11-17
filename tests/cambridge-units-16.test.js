// tests/cambridge-units-16.test.js - Comprehensive Verification Suite for all 16 Cambridge Units
import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMBRIDGE_STAGE_7_UNITS } from '../data/cambridge-units-data.js';
import { MathRenderer } from '../js/math-renderer.js';
import { KAINOS_PAPERS_CATALOG, KainosExamSimulator } from '../js/kainos-exams.js';
import { SpeechCoach } from '../js/speech-coach.js';

test('Full Cambridge Stage 7 Syllabus Scope: Exactly 16 units present and in order', () => {
  assert.equal(CAMBRIDGE_STAGE_7_UNITS.length, 16, 'Must contain all 16 Cambridge units');

  CAMBRIDGE_STAGE_7_UNITS.forEach((unit, idx) => {
    assert.equal(unit.unit, idx + 1, `Unit ${unit.id} must have unit number ${idx + 1}`);
    assert.ok(unit.id, `Unit ${idx + 1} must have an id`);
    assert.ok(unit.title, `Unit ${idx + 1} must have a title`);
    assert.ok(unit.cambridgeRef, `Unit ${idx + 1} must have a cambridgeRef`);
    assert.ok(unit.strand, `Unit ${idx + 1} must have a strand`);
    assert.ok(unit.badge, `Unit ${idx + 1} must have a badge`);
    assert.ok(unit.whyItMatters && unit.whyItMatters.length > 15, `Unit ${idx + 1} must have a real-life whyItMatters`);
  });
});

test('Neuro-visual lesson structure: Every unit has CVA, rules, examples, and Justin trap', () => {
  for (const unit of CAMBRIDGE_STAGE_7_UNITS) {
    const l = unit.lesson;
    assert.ok(l.keyIdea && l.keyIdea.length > 10, `Unit ${unit.unit} missing keyIdea`);
    assert.ok(l.concrete && l.concrete.length > 15, `Unit ${unit.unit} missing concrete scaffolding`);
    assert.ok(l.visual && l.visual.length > 15, `Unit ${unit.unit} missing visual scaffolding`);
    assert.ok(l.abstract && l.abstract.length > 15, `Unit ${unit.unit} missing abstract scaffolding`);
    assert.ok(Array.isArray(l.rules) && l.rules.length >= 3, `Unit ${unit.unit} must have at least 3 rules`);
    assert.ok(Array.isArray(l.examples) && l.examples.length >= 2, `Unit ${unit.unit} must have at least 2 worked examples`);
    assert.ok(l.justinTrap && l.justinTrap.includes('Justin'), `Unit ${unit.unit} missing personal Justin coaching trap`);
    assert.ok(l.spokenExplanation && l.spokenExplanation.length > 20, `Unit ${unit.unit} missing spoken audio explanation`);

    for (const ex of l.examples) {
      assert.ok(ex.q && ex.q.length > 4, `Unit ${unit.unit} example missing question`);
      assert.ok(ex.solution && ex.solution.length > 5, `Unit ${unit.unit} example missing solution`);
    }
  }
});

test('Multi-tier practice: Every unit has Easy, Medium, and Hard questions with verified answers', () => {
  let totalQuestions = 0;
  const tiers = ['easy', 'medium', 'hard'];

  for (const unit of CAMBRIDGE_STAGE_7_UNITS) {
    for (const tier of tiers) {
      const qList = unit.questions[tier];
      assert.ok(Array.isArray(qList), `Unit ${unit.unit} missing question tier ${tier}`);
      assert.ok(qList.length >= 2, `Unit ${unit.unit} tier ${tier} must have at least 2 questions`);

      for (const q of qList) {
        totalQuestions++;
        assert.ok(q.id, `Question missing id in Unit ${unit.unit} ${tier}`);
        assert.ok(q.q && q.q.length > 5, `Question ${q.id} missing prompt`);
        assert.ok(Array.isArray(q.options) && q.options.length === 4, `Question ${q.id} must have exactly 4 options`);

        // Check options are distinct
        const uniqueOpts = new Set(q.options);
        assert.equal(uniqueOpts.size, 4, `Question ${q.id} options must all be unique`);

        // Check answer is exactly in options
        assert.ok(q.options.includes(q.answer), `Question ${q.id} answer "${q.answer}" must match one of the options: ${JSON.stringify(q.options)}`);

        // Check scaffolding
        assert.ok(q.hint && q.hint.length > 10, `Question ${q.id} missing hint`);
        assert.ok(Array.isArray(q.stepByStep) && q.stepByStep.length >= 2, `Question ${q.id} missing stepByStep`);
        assert.ok(q.explanation && q.explanation.length > 10, `Question ${q.id} missing explanation`);
      }
    }
  }

  assert.ok(totalQuestions >= 96, `Expected at least 96 questions across 16 units, got ${totalQuestions}`);
});

test('Mathematical verification of curriculum questions across all 16 units', () => {
  // Unit 1: Integers
  const u1 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 1);
  assert.equal(u1.questions.easy[0].answer, '3');
  assert.equal(u1.questions.medium[0].answer, '12');
  assert.equal(u1.questions.medium[1].answer, '24');
  assert.equal(u1.questions.hard[0].answer, '7');
  assert.equal(u1.questions.hard[1].answer, '-R 40');

  // Unit 2: Expressions
  const u2 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 2);
  assert.equal(u2.questions.easy[0].answer, '6x');
  assert.equal(u2.questions.easy[1].answer, '12');
  assert.equal(u2.questions.medium[0].answer, '7');
  assert.equal(u2.questions.medium[1].answer, '8y + 12');
  assert.equal(u2.questions.hard[0].answer, '7');

  // Unit 3: Decimals
  const u3 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 3);
  assert.equal(u3.questions.easy[0].answer, '4.5');
  assert.equal(u3.questions.easy[1].answer, '7.4');
  assert.equal(u3.questions.medium[0].answer, '360');
  assert.equal(u3.questions.hard[0].answer, '0.048');
  assert.equal(u3.questions.hard[1].answer, 'R 47.25');

  // Unit 4: FDP
  const u4 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 4);
  assert.equal(u4.questions.easy[0].answer, '75%');
  assert.equal(u4.questions.easy[1].answer, '\\frac{7}{20}');
  assert.equal(u4.questions.medium[0].answer, '24 kg');
  assert.equal(u4.questions.medium[1].answer, '0.875');
  assert.equal(u4.questions.hard[0].answer, '85%');

  // Unit 5: Angles
  const u5 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 5);
  assert.equal(u5.questions.easy[0].answer, '180°');
  assert.equal(u5.questions.easy[1].answer, '65°');
  assert.equal(u5.questions.medium[0].answer, '58°');
  assert.equal(u5.questions.medium[1].answer, '72°');
  assert.equal(u5.questions.hard[0].answer, '70° each');
  assert.equal(u5.questions.hard[1].answer, '45°');

  // Unit 6: Data Collecting
  const u6 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 6);
  assert.equal(u6.questions.easy[0].answer, 'Discrete');
  assert.equal(u6.questions.easy[1].answer, '8');
  assert.equal(u6.questions.medium[0].answer, '20 learners');
  assert.equal(u6.questions.medium[1].answer, '30');
  assert.equal(u6.questions.hard[0].answer, '75°');
  assert.equal(u6.questions.hard[1].answer, '12 marks');

  // Unit 7: Fractions & Mixed Numbers
  const u7 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 7);
  assert.equal(u7.questions.easy[0].answer, '\\frac{5}{7}');
  assert.equal(u7.questions.easy[1].answer, '3\\frac{1}{4}');
  assert.equal(u7.questions.medium[0].answer, '\\frac{11}{12}');
  assert.equal(u7.questions.medium[1].answer, '\\frac{2}{3}');
  assert.equal(u7.questions.hard[0].answer, '\\frac{5}{6}');
  assert.equal(u7.questions.hard[1].answer, '\\frac{5}{6}');

  // Unit 8: Shapes & Polyhedra
  const u8 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 8);
  assert.equal(u8.questions.easy[0].answer, '6');
  assert.equal(u8.questions.easy[1].answer, '5');
  assert.equal(u8.questions.medium[0].answer, '12');
  assert.equal(u8.questions.medium[1].answer, 'Cylinder');

  // Unit 9: Sequences
  const u9 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 9);
  assert.equal(u9.questions.easy[0].answer, '16, 19');
  assert.equal(u9.questions.easy[1].answer, 'Subtract 4');
  assert.equal(u9.questions.medium[0].answer, '27');
  assert.equal(u9.questions.medium[1].answer, '3n + 2');
  assert.equal(u9.questions.hard[1].answer, '10');

  // Unit 10: Financial Maths
  const u10 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 10);
  assert.equal(u10.questions.easy[0].answer, 'R 35');
  assert.equal(u10.questions.easy[1].answer, 'R 100');
  assert.equal(u10.questions.medium[0].answer, 'R 1 380');
  assert.equal(u10.questions.medium[1].answer, '25%');
  assert.equal(u10.questions.hard[0].answer, 'R 360');
  assert.equal(u10.questions.hard[1].answer, 'R 595');

  // Unit 11: Graphs & Coordinates
  const u11 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 11);
  assert.equal(u11.questions.easy[0].answer, 'Quadrant 2');
  assert.equal(u11.questions.easy[1].answer, 'y = -3');
  assert.equal(u11.questions.medium[0].answer, '9');
  assert.equal(u11.questions.medium[1].answer, '(3, 7)');
  assert.equal(u11.questions.hard[0].answer, '$50');
  assert.equal(u11.questions.hard[1].answer, '(2, 7)');

  // Unit 12: Ratio & Proportion
  const u12 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 12);
  assert.equal(u12.questions.easy[0].answer, '2 : 3');
  assert.equal(u12.questions.easy[1].answer, '3 : 2');
  assert.equal(u12.questions.medium[0].answer, 'R 60 and R 90');
  assert.equal(u12.questions.medium[1].answer, 'R 104');
  assert.equal(u12.questions.hard[0].answer, 'R 405');

  // Unit 13: Probability
  const u13 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 13);
  assert.equal(u13.questions.easy[0].answer, '0');
  assert.equal(u13.questions.easy[1].answer, '\\frac{1}{2}');
  assert.equal(u13.questions.medium[0].answer, '\\frac{3}{10}');
  assert.equal(u13.questions.medium[1].answer, '0.72');
  assert.equal(u13.questions.hard[0].answer, '\\frac{1}{2}');
  assert.equal(u13.questions.hard[1].answer, '0.56');

  // Unit 14: Position & Transformation
  const u14 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 14);
  assert.equal(u14.questions.easy[0].answer, 'Clockwise');
  assert.equal(u14.questions.easy[1].answer, '090°');
  assert.equal(u14.questions.medium[0].answer, '320°');
  assert.equal(u14.questions.medium[1].answer, '(3, -5)');
  assert.equal(u14.questions.hard[0].answer, '(2, -3)');
  assert.equal(u14.questions.hard[1].answer, '(3, -2)');

  // Unit 15: Area, Perimeter & Volume
  const u15 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 15);
  assert.equal(u15.questions.easy[0].answer, '34 cm');
  assert.equal(u15.questions.easy[1].answer, '49 cm²');
  assert.equal(u15.questions.medium[0].answer, '42 cm²');
  assert.equal(u15.questions.medium[1].answer, '160 cm³');
  assert.equal(u15.questions.hard[0].answer, '30 m²');
  assert.equal(u15.questions.hard[1].answer, '94 cm²');

  // Unit 16: Interpreting Data
  const u16 = CAMBRIDGE_STAGE_7_UNITS.find(u => u.unit === 16);
  assert.equal(u16.questions.easy[0].answer, '7');
  assert.equal(u16.questions.easy[1].answer, '16');
  assert.equal(u16.questions.medium[0].answer, '7');
  assert.equal(u16.questions.medium[1].answer, '15');
  assert.equal(u16.questions.hard[0].answer, '21');
});

test('MathRenderer converts LaTeX fractions and operations into beautiful HTML typography', () => {
  const renderedFrac = MathRenderer.render('\\(\\frac{3}{5}\\)');
  assert.ok(renderedFrac.includes('math-frac'), 'Must contain math-frac class');
  assert.ok(renderedFrac.includes('3') && renderedFrac.includes('5'), 'Must contain numerator and denominator');

  const renderedOp = MathRenderer.render('\\(4 \\times 5 \\div 2\\)');
  assert.ok(renderedOp.includes('×') && renderedOp.includes('÷'), 'Must transform \\times and \\div');

  const renderedRoot = MathRenderer.render('\\(\\sqrt{64}\\)');
  assert.ok(renderedRoot.includes('√') && renderedRoot.includes('64'), 'Must format square root');

  const renderedPow = MathRenderer.render('\\(x^2 + 5\\)');
  assert.ok(renderedPow.includes('<sup>2</sup>'), 'Must format exponent');
});

test('SpeechCoach converts math notations to clear English words', () => {
  const spoken1 = SpeechCoach.toSpokenEnglish('\\(\\frac{3}{4}\\)');
  assert.equal(spoken1, 'three quarters');

  const spoken2 = SpeechCoach.toSpokenEnglish('\\(-8 - (-12)\\)');
  assert.ok(spoken2.includes('negative 8') && spoken2.includes('negative 12'));

  const spoken3 = SpeechCoach.toSpokenEnglish('\\(\\sqrt{36}\\)');
  assert.ok(spoken3.includes('the square root of 36'));

  const spoken4 = SpeechCoach.toSpokenEnglish('Justin has R 150');
  assert.ok(spoken4.includes('150 Rand'));
});

test('Kainos Cambridge Exams Catalog and Simulator logic', () => {
  assert.equal(KAINOS_PAPERS_CATALOG.length, 4, 'Must have 4 exam papers');

  const sim = new KainosExamSimulator('stage7-p1');
  assert.equal(sim.paper.id, 'stage7-p1');
  assert.ok(sim.questions.length >= 5);

  const q1 = sim.getCurrentQuestion();
  assert.ok(q1);
  sim.recordAnswer(q1.answer);

  assert.equal(sim.userAnswers.length, 1);
  assert.equal(sim.userAnswers[0].isCorrect, true);
  assert.equal(sim.userAnswers[0].marksAwarded, q1.marks);
});

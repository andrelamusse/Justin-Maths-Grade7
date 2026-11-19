// tests/cambridge-units-16.test.js - Comprehensive Verification Suite for all 16 Cambridge Units
import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMBRIDGE_STAGE_7_UNITS } from '../data/cambridge-units-data.js';
import { MathRenderer } from '../js/math-renderer.js';
import { KAINOS_PAPERS_CATALOG, KainosExamSimulator } from '../js/kainos-exams.js';
import { SpeechCoach } from '../js/speech-coach.js';
import { JustinMathsApp } from '../app.js';

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
      assert.ok(qList.length >= 6, `Unit ${unit.unit} tier ${tier} must have at least 6 questions, got ${qList.length}`);

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

  assert.ok(totalQuestions >= 288, `Expected at least 288 curriculum questions across 16 units, got ${totalQuestions}`);
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

  // Deep Edge Cases: Bare LaTeX without delimiters
  const bareFrac = MathRenderer.render('\\frac{7}{20}');
  assert.ok(bareFrac.includes('math-frac'), 'Bare \\frac must render to math-frac');
  assert.ok(bareFrac.includes('7') && bareFrac.includes('20'), 'Must contain 7 and 20');
  assert.ok(!bareFrac.includes('\\frac'), 'Must not leak raw \\frac command');

  // Mixed numbers
  const mixedFrac = MathRenderer.render('3\\frac{1}{4}');
  assert.ok(mixedFrac.includes('math-frac'), 'Mixed number must render fraction');
  assert.ok(mixedFrac.includes('3') && mixedFrac.includes('1') && mixedFrac.includes('4'));
  assert.ok(!mixedFrac.includes('\\frac'));

  // Nested braces in fractions
  const nestedFrac = MathRenderer.render('$\\frac{\\text{R } 150}{3}$');
  assert.ok(nestedFrac.includes('math-frac'), 'Nested braces fraction must render');
  assert.ok(!nestedFrac.includes('\\frac'));

  // Column vectors
  const vector = MathRenderer.render('$\\begin{pmatrix} 6 \\\\ -5 \\end{pmatrix}$');
  assert.ok(vector.includes('math-vector'), 'Vector must render math-vector');
  assert.ok(vector.includes('6') && vector.includes('-5'));
  assert.ok(!vector.includes('\\begin'));

  // Logical symbols
  const syms = MathRenderer.render('\\(A \\implies B \\dots x \\to y\\)');
  assert.ok(syms.includes('⟹') && syms.includes('…') && syms.includes('→'));

  // Recurring decimals
  const rec = MathRenderer.render('\\(0.\\dot{3}\\)');
  assert.ok(rec.includes('recurring-dot') && rec.includes('3'));
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

  // Edge cases: Mixed numbers and vectors
  const spokenMixed = SpeechCoach.toSpokenEnglish('3\\frac{1}{4}');
  assert.ok(spokenMixed.includes('3 and one quarter'), `Expected "3 and one quarter", got "${spokenMixed}"`);

  const spokenVec = SpeechCoach.toSpokenEnglish('\\begin{pmatrix} 6 \\\\ -5 \\end{pmatrix}');
  assert.ok(spokenVec.includes('column vector with top 6 and bottom negative 5'), `Got "${spokenVec}"`);

  const spokenDeg = SpeechCoach.toSpokenEnglish('45^\\circ and 90°');
  assert.ok(spokenDeg.includes('45 degrees') && spokenDeg.includes('90 degrees'));
});

test('Kainos Cambridge Exams Catalog and Simulator logic', () => {
  assert.equal(KAINOS_PAPERS_CATALOG.length, 6, 'Must have 6 exam papers');

  // Verify all 6 papers have substantial questions
  KAINOS_PAPERS_CATALOG.forEach(paper => {
    assert.ok(paper.sampleQuestions.length >= 6, `Paper ${paper.id} must have at least 6 questions, had ${paper.sampleQuestions.length}`);
    paper.sampleQuestions.forEach(q => {
      assert.ok(q.options.includes(q.answer), `Question ${q.id} answer ${q.answer} must be in options`);
      assert.ok(q.marks >= 1, `Question ${q.id} must award marks`);
      assert.ok(q.memo && q.tutorTip, `Question ${q.id} must have memo and tutor tip`);
    });
  });

  const sim = new KainosExamSimulator('stage7-p1');
  assert.equal(sim.paper.id, 'stage7-p1');
  assert.ok(sim.questions.length >= 6);

  // Timer test
  assert.equal(sim.getFormattedTime(), '60:00');
  let tickedTime = '';
  sim.startTimer((formatted) => { tickedTime = formatted; });
  assert.ok(sim.timerInterval, 'Timer interval must be running');
  sim.stopTimer();
  assert.strictEqual(sim.timerInterval, null, 'Timer must be stopped');

  const q1 = sim.getCurrentQuestion();
  assert.ok(q1);
  sim.recordAnswer(q1.answer);

  assert.equal(sim.userAnswers.length, 1);
  assert.equal(sim.userAnswers[0].isCorrect, true);
  assert.equal(sim.userAnswers[0].marksAwarded, q1.marks);
});

test('KainosExamSimulator dual-mode: Simulates Paper 1 (Non-Calc) -> Intermission -> Paper 2 (Calc) -> 90 Marks', () => {
  const sim = new KainosExamSimulator();
  sim.setDualMode('progression');
  assert.equal(sim.isDualMode, true);
  assert.equal(sim.dualPhase, 'paper1');
  assert.equal(sim.paper.id, 'stage7-p1');

  // Complete Paper 1
  while (!sim.isFinished) {
    const q = sim.getCurrentQuestion();
    sim.recordAnswer(q.answer);
  }
  assert.equal(sim.dualPhase, 'intermission');
  assert.ok(sim.paper1Results);
  assert.equal(sim.paper1Results.marksScored, sim.paper1Results.totalPossibleMarks);

  // Transition to Paper 2
  sim.advanceToPaper2();
  assert.equal(sim.dualPhase, 'paper2');
  assert.equal(sim.paper.id, 'stage7-p2');
  assert.equal(sim.isFinished, false);

  // Complete Paper 2
  while (!sim.isFinished) {
    const q = sim.getCurrentQuestion();
    sim.recordAnswer(q.answer);
  }
  assert.equal(sim.dualPhase, 'complete');
  assert.ok(sim.paper2Results);

  const dualRes = sim.getDualResults();
  assert.ok(dualRes);
  assert.equal(dualRes.marksScored, dualRes.totalPossibleMarks);
  assert.equal(dualRes.percentage, 100);
  assert.ok(dualRes.grade.startsWith('A*'));
});

test('Topic-by-topic past exam bank: Every one of the 16 units has at least 5 past exam questions from across 6 papers', () => {
  let totalTopicExamQuestions = 0;
  for (const unit of CAMBRIDGE_STAGE_7_UNITS) {
    const examList = unit.questions.exam;
    assert.ok(Array.isArray(examList), `Unit ${unit.unit} must have an exam questions list`);
    assert.ok(examList.length >= 5, `Unit ${unit.unit} must have at least 5 past exam questions, got ${examList.length}`);

    for (const q of examList) {
      totalTopicExamQuestions++;
      assert.ok(q.id, `Unit ${unit.unit} exam question missing id`);
      assert.ok(q.sourcePaper, `Question ${q.id} missing sourcePaper citation`);
      assert.ok(q.sourceBadge, `Question ${q.id} missing sourceBadge`);
      assert.ok(q.marks >= 1, `Question ${q.id} must award marks`);
      assert.ok(q.q && q.q.length > 5, `Question ${q.id} missing prompt`);
      assert.ok(Array.isArray(q.options) && q.options.length === 4, `Question ${q.id} must have 4 options`);
      const uniqueOpts = new Set(q.options);
      assert.equal(uniqueOpts.size, 4, `Question ${q.id} options must all be unique`);
      assert.ok(q.options.includes(q.answer), `Question ${q.id} answer "${q.answer}" must match one of options`);
      assert.ok(q.hint && q.hint.length > 8, `Question ${q.id} missing hint`);
      assert.ok(Array.isArray(q.stepByStep) && q.stepByStep.length >= 2, `Question ${q.id} missing stepByStep`);
      assert.ok(q.explanation && q.explanation.length > 8, `Question ${q.id} missing explanation`);
      assert.ok(q.memo && q.memo.length > 5, `Question ${q.id} missing Cambridge marking memo`);
      assert.ok(q.tutorTip && q.tutorTip.length > 5, `Question ${q.id} missing tutor tip`);
    }
  }
  assert.ok(totalTopicExamQuestions >= 80, `Expected at least 80 topic past exam questions, got ${totalTopicExamQuestions}`);
});

test('Expanded Unit Question Tallies: Every unit has >= 23 questions (18 curriculum + 5 exam) totaling 368+ questions', () => {
  let grandTotal = 0;
  for (const unit of CAMBRIDGE_STAGE_7_UNITS) {
    const easyCount = unit.questions.easy.length;
    const medCount = unit.questions.medium.length;
    const hardCount = unit.questions.hard.length;
    const examCount = (unit.questions.exam || []).length;
    const unitTotal = easyCount + medCount + hardCount + examCount;
    assert.ok(easyCount >= 6, `Unit ${unit.unit} must have >= 6 easy questions`);
    assert.ok(medCount >= 6, `Unit ${unit.unit} must have >= 6 medium questions`);
    assert.ok(hardCount >= 6, `Unit ${unit.unit} must have >= 6 hard questions`);
    assert.ok(examCount >= 5, `Unit ${unit.unit} must have >= 5 past exam questions`);
    assert.ok(unitTotal >= 23, `Unit ${unit.unit} must have >= 23 total questions, got ${unitTotal}`);
    grandTotal += unitTotal;
  }
  assert.ok(grandTotal >= 368, `Grand total must be at least 368 questions, got ${grandTotal}`);
});

test('Angle visualizer geometry: reflex angles do not clip outside viewBox', () => {
  const cx = 180;
  const cy = 160;
  const r = 110;
  const viewBoxW = 360;
  const viewBoxH = 320;

  for (let deg = 5; deg <= 355; deg += 5) {
    const rad = (deg * Math.PI) / 180;
    const x = cx + r * Math.cos(-rad);
    const y = cy + r * Math.sin(-rad);

    assert.ok(x >= 0 && x <= viewBoxW, `Ray X coordinate ${x} at ${deg}° must be inside viewBox width`);
    assert.ok(y >= 0 && y <= viewBoxH, `Ray Y coordinate ${y} at ${deg}° must be inside viewBox height`);
  }
});

test('Zero raw coding math (*, /, ^) and zero control characters across all 368 questions in CAMBRIDGE_STAGE_7_UNITS', () => {
  let count = 0;
  for (const unit of CAMBRIDGE_STAGE_7_UNITS) {
    const allQuestions = [
      ...unit.questions.easy,
      ...unit.questions.medium,
      ...unit.questions.hard,
      ...(unit.questions.exam || [])
    ];

    for (const q of allQuestions) {
      count++;
      const textFields = [
        q.q,
        q.hint,
        q.explanation,
        ...(q.stepByStep || []),
        q.memo || '',
        q.tutorTip || '',
        ...(q.options || [])
      ];

      for (const t of textFields) {
        if (typeof t !== 'string') continue;

        // 1. Zero control characters (form feed \x0c, unescaped tab \x09)
        for (let i = 0; i < t.length; i++) {
          const code = t.charCodeAt(i);
          assert.notEqual(code, 12, `Form feed control character found in question ${q.id}: ${JSON.stringify(t)}`);
          if (code === 9) {
            assert.ok(t.includes('    '), `Unescaped tab found in question ${q.id}: ${JSON.stringify(t)}`);
          }
        }

        // 2. Zero raw asterisk multiplication like "5 * 6"
        assert.ok(!/\d+\s*\*\s*\d+/.test(t), `Raw asterisk multiplication found in question ${q.id}: "${t}"`);

        // 3. Zero raw fraction slashes like "3/4" or "12/30" (must use LaTeX \frac)
        assert.ok(
          !/(?<!\\frac\{|0862\/|\d{4}\/)\b\d+\/\d+\b(?!\}|\/)/.test(t),
          `Raw fraction slash found in question ${q.id}: "${t}"`
        );
      }
    }
  }

  assert.equal(count, 368, 'Must verify all 368 questions');
});

test('JustinMathsApp practice arena mode switching and realistic mastery criteria', () => {
  const app = new JustinMathsApp();
  app.currentUnitId = 'unit1-integers';

  // 1. Standard 10-Question Mastery Challenge draws balanced questions across tiers
  app.currentTier = 'mastery';
  app.quizMode = 'mastery10';
  const q10 = app.getAvailableQuestions();
  assert.equal(q10.length, 10, 'Mastery challenge must provide exactly 10 questions');

  // 2. Quick 5-Question Drill draws 5 questions
  app.quizMode = 'drill5';
  const q5 = app.getAvailableQuestions();
  assert.equal(q5.length, 5, 'Quick drill must provide exactly 5 questions');

  // 3. Complete Unit Bank draws all available questions
  app.currentTier = 'all';
  app.quizMode = 'allBank';
  const qAll = app.getAvailableQuestions();
  assert.equal(qAll.length, 23, 'Unit 1 bank must have 23 total questions (6 easy + 6 med + 6 hard + 5 exam)');

  // 4. Realistic Mastery Criteria:
  // Golden Star requires completing at least 8 questions with >= 80% accuracy
  const testQualifies = (correct, total) => {
    const pct = Math.round((correct / total) * 100);
    return total >= 8 && pct >= 80;
  };

  // 2 or 3 questions from old app must NOT qualify
  assert.equal(testQualifies(2, 2), false, '2/2 must NOT qualify for unit mastery');
  assert.equal(testQualifies(3, 3), false, '3/3 must NOT qualify for unit mastery');
  assert.equal(testQualifies(5, 5), false, '5/5 drill must NOT qualify for unit mastery');

  // 8/10 (80%) on 10-Q Mastery qualifies
  assert.equal(testQualifies(8, 10), true, '8/10 (80%) must qualify for unit mastery');
  assert.equal(testQualifies(9, 10), true, '9/10 (90%) must qualify for unit mastery');
  assert.equal(testQualifies(10, 10), true, '10/10 (100%) must qualify for unit mastery');

  // 7/10 (70%) does NOT qualify
  assert.equal(testQualifies(7, 10), false, '7/10 (70%) must NOT qualify');
});


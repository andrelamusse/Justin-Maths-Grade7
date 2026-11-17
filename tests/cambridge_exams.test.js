import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const examDir = path.resolve(__dirname, '../cambridge-stage7-exams');

test('Cambridge Stage 7 Exams: All 8 HTML & PDF files exist and are populated', () => {
  const expectedFiles = [
    // Stage 7 Paper 1 (Non-Calculator) & Memo
    'Cambridge_Stage7_Mathematics_Paper1_NonCalculator.html',
    'Cambridge_Stage7_Mathematics_Paper1_NonCalculator.pdf',
    'Cambridge_Stage7_Mathematics_Paper1_MarkScheme_Memo.html',
    'Cambridge_Stage7_Mathematics_Paper1_MarkScheme_Memo.pdf',
    // Stage 7 Paper 2 (Calculator Permitted) & Memo
    'Cambridge_Stage7_Mathematics_Paper2_Calculator.html',
    'Cambridge_Stage7_Mathematics_Paper2_Calculator.pdf',
    'Cambridge_Stage7_Mathematics_Paper2_MarkScheme_Memo.html',
    'Cambridge_Stage7_Mathematics_Paper2_MarkScheme_Memo.pdf',
    // Kainos Mid-Year Progression (Non-Calculator) & Memo
    'Cambridge_Stage7_Mathematics_MidYear_Paper1_NonCalculator.html',
    'Cambridge_Stage7_Mathematics_MidYear_Paper1_NonCalculator.pdf',
    'Cambridge_Stage7_Mathematics_MidYear_MarkScheme_Memo.html',
    'Cambridge_Stage7_Mathematics_MidYear_MarkScheme_Memo.pdf',
    // Kainos End-of-Year Final (Calculator Permitted) & Memo
    'Cambridge_Stage7_Mathematics_EndOfYear_Paper2_Calculator.html',
    'Cambridge_Stage7_Mathematics_EndOfYear_Paper2_Calculator.pdf',
    'Cambridge_Stage7_Mathematics_EndOfYear_MarkScheme_Memo.html',
    'Cambridge_Stage7_Mathematics_EndOfYear_MarkScheme_Memo.pdf',
    // Portal Index
    'index.html'
  ];

  for (const file of expectedFiles) {
    const fullPath = path.join(examDir, file);
    assert.strictEqual(fs.existsSync(fullPath), true, `Missing file: ${file}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 5000, `File ${file} should have meaningful content (got ${stat.size} bytes)`);
  }
});

test('Cambridge Stage 7 Typography: Zero raw coding math or unrendered LaTeX in exam HTML files', () => {
  const htmlFiles = [
    'Cambridge_Stage7_Mathematics_Paper1_NonCalculator.html',
    'Cambridge_Stage7_Mathematics_Paper1_MarkScheme_Memo.html',
    'Cambridge_Stage7_Mathematics_Paper2_Calculator.html',
    'Cambridge_Stage7_Mathematics_Paper2_MarkScheme_Memo.html',
    'Cambridge_Stage7_Mathematics_MidYear_Paper1_NonCalculator.html',
    'Cambridge_Stage7_Mathematics_MidYear_MarkScheme_Memo.html',
    'Cambridge_Stage7_Mathematics_EndOfYear_Paper2_Calculator.html',
    'Cambridge_Stage7_Mathematics_EndOfYear_MarkScheme_Memo.html'
  ];

  for (const file of htmlFiles) {
    const content = fs.readFileSync(path.join(examDir, file), 'utf8');
    // Ensure no unrendered LaTeX delimiters remain
    assert.ok(!content.includes('\\(') && !content.includes('\\)'), `${file} should not have raw \\( or \\) delimiters`);
    assert.ok(!content.includes('\\frac{'), `${file} should not have raw \\frac commands`);
    assert.ok(!content.includes('\\times'), `${file} should not have raw \\times commands`);
    assert.ok(!content.includes('\\div'), `${file} should not have raw \\div commands`);
    // Ensure proper typography tags exist
    assert.ok(content.includes('class="math"'), `${file} must include formatted math elements`);
    assert.ok(content.includes('Justin Lamusse'), `${file} must contain candidate name Justin Lamusse`);
    assert.ok(content.includes('Kainos Cambridge School'), `${file} must contain school name Kainos Cambridge School`);
    assert.ok(content.includes('Vanderbijlpark'), `${file} must reference Vanderbijlpark`);
  }
});

test('Cambridge Stage 7 Papers: Correct mark allocations and calculator rules', () => {
  const p1Html = fs.readFileSync(path.join(examDir, 'Cambridge_Stage7_Mathematics_Paper1_NonCalculator.html'), 'utf8');
  const p2Html = fs.readFileSync(path.join(examDir, 'Cambridge_Stage7_Mathematics_Paper2_Calculator.html'), 'utf8');
  const myHtml = fs.readFileSync(path.join(examDir, 'Cambridge_Stage7_Mathematics_MidYear_Paper1_NonCalculator.html'), 'utf8');
  const eyHtml = fs.readFileSync(path.join(examDir, 'Cambridge_Stage7_Mathematics_EndOfYear_Paper2_Calculator.html'), 'utf8');

  assert.ok(p1Html.includes('NO CALCULATORS ALLOWED'), 'Stage 7 Paper 1 must be non-calculator');
  assert.ok(p1Html.includes('Total Marks: 45'), 'Stage 7 Paper 1 is 45 marks');

  assert.ok(p2Html.includes('CALCULATOR PERMITTED'), 'Stage 7 Paper 2 allows calculator');
  assert.ok(p2Html.includes('Total Marks: 45'), 'Stage 7 Paper 2 is 45 marks');

  assert.ok(myHtml.includes('NO CALCULATORS ALLOWED'), 'Mid-Year is non-calculator');
  assert.ok(myHtml.includes('Total Marks: 45'), 'Mid-Year is 45 marks');

  assert.ok(eyHtml.includes('CALCULATOR PERMITTED'), 'End-of-Year allows calculator');
  assert.ok(eyHtml.includes('Total Marks: 45'), 'End-of-Year is 45 marks');
});

test('Cambridge Stage 7 Memorandums: Contain Tutor Pedagogical Coaching Guide for Justin', () => {
  const m1Html = fs.readFileSync(path.join(examDir, 'Cambridge_Stage7_Mathematics_Paper1_MarkScheme_Memo.html'), 'utf8');
  const m2Html = fs.readFileSync(path.join(examDir, 'Cambridge_Stage7_Mathematics_Paper2_MarkScheme_Memo.html'), 'utf8');
  const myMHtml = fs.readFileSync(path.join(examDir, 'Cambridge_Stage7_Mathematics_MidYear_MarkScheme_Memo.html'), 'utf8');
  const eyMHtml = fs.readFileSync(path.join(examDir, 'Cambridge_Stage7_Mathematics_EndOfYear_MarkScheme_Memo.html'), 'utf8');

  assert.ok(m1Html.includes('Tutor Pedagogical Coaching Guide for Justin Lamusse'), 'Memo 1 must have coaching guide');
  assert.ok(m2Html.includes('Tutor Pedagogical Coaching Guide for Justin Lamusse'), 'Memo 2 must have coaching guide');
  assert.ok(myMHtml.includes('Tutor Pedagogical Coaching Guide for Justin Lamusse'), 'Mid-Year Memo must have coaching guide');
  assert.ok(eyMHtml.includes('Tutor Pedagogical Coaching Guide for Justin Lamusse'), 'End-of-Year Memo must have coaching guide');
});

test('Cambridge Stage 7 Portal Index: Strictly Stage 7 with zero Stage 6 references', () => {
  const indexHtml = fs.readFileSync(path.join(examDir, 'index.html'), 'utf8');
  assert.ok(indexHtml.includes('Cambridge Stage 7 Mathematics Assessment Portal'), 'Index has Stage 7 title');
  assert.ok(!indexHtml.includes('Stage 6'), 'Index must have ZERO Stage 6 references');
  assert.ok(!indexHtml.includes('Standard 5'), 'Index must have ZERO Standard 5 references');
});

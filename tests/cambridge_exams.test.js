import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const examDir = path.resolve(__dirname, '../cambridge-stage7-exams');

test('Cambridge Exam Papers & Memos: All 8 HTML & PDF files exist and are populated', () => {
  const expectedFiles = [
    // Stage 6 (Primary Checkpoint / Standard 5 Exit - Both Non-Calc)
    'Cambridge_Stage6_Primary_Mathematics_Paper1_NonCalculator.html',
    'Cambridge_Stage6_Primary_Mathematics_Paper1_NonCalculator.pdf',
    'Cambridge_Stage6_Primary_Mathematics_Paper1_MarkScheme_Memo.html',
    'Cambridge_Stage6_Primary_Mathematics_Paper1_MarkScheme_Memo.pdf',
    'Cambridge_Stage6_Primary_Mathematics_Paper2_NonCalculator.html',
    'Cambridge_Stage6_Primary_Mathematics_Paper2_NonCalculator.pdf',
    'Cambridge_Stage6_Primary_Mathematics_Paper2_MarkScheme_Memo.html',
    'Cambridge_Stage6_Primary_Mathematics_Paper2_MarkScheme_Memo.pdf',
    // Stage 7 (Lower Secondary Grade 7 Progression - Paper 1 Non-Calc, Paper 2 Calc)
    'Cambridge_Stage7_Mathematics_Paper1_NonCalculator.html',
    'Cambridge_Stage7_Mathematics_Paper1_NonCalculator.pdf',
    'Cambridge_Stage7_Mathematics_Paper1_MarkScheme_Memo.html',
    'Cambridge_Stage7_Mathematics_Paper1_MarkScheme_Memo.pdf',
    'Cambridge_Stage7_Mathematics_Paper2_Calculator.html',
    'Cambridge_Stage7_Mathematics_Paper2_Calculator.pdf',
    'Cambridge_Stage7_Mathematics_Paper2_MarkScheme_Memo.html',
    'Cambridge_Stage7_Mathematics_Paper2_MarkScheme_Memo.pdf',
    // Portal Index
    'index.html'
  ];

  for (const file of expectedFiles) {
    const fullPath = path.join(examDir, file);
    assert.strictEqual(fs.existsSync(fullPath), true, `Missing file: ${file}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 1000, `File ${file} should have meaningful content (got ${stat.size} bytes)`);
  }
});

test('Cambridge Stage 6 Papers: Both Papers are Non-Calculator with 40 marks and tailored for Justin', () => {
  const p1Html = fs.readFileSync(path.join(examDir, 'Cambridge_Stage6_Primary_Mathematics_Paper1_NonCalculator.html'), 'utf8');
  const p2Html = fs.readFileSync(path.join(examDir, 'Cambridge_Stage6_Primary_Mathematics_Paper2_NonCalculator.html'), 'utf8');
  const m1Html = fs.readFileSync(path.join(examDir, 'Cambridge_Stage6_Primary_Mathematics_Paper1_MarkScheme_Memo.html'), 'utf8');
  const m2Html = fs.readFileSync(path.join(examDir, 'Cambridge_Stage6_Primary_Mathematics_Paper2_MarkScheme_Memo.html'), 'utf8');

  assert.ok(p1Html.includes('NO CALCULATORS ALLOWED'), 'Stage 6 Paper 1 must be non-calculator');
  assert.ok(p2Html.includes('NO CALCULATORS ALLOWED'), 'Stage 6 Paper 2 must be non-calculator');
  assert.ok(p1Html.includes('Total Marks: 40'), 'Stage 6 Paper 1 is 40 marks');
  assert.ok(p2Html.includes('Total Marks: 40'), 'Stage 6 Paper 2 is 40 marks');
  assert.ok(p1Html.includes('Justin'), 'Stage 6 Paper 1 contains candidate name Justin');
  assert.ok(p1Html.includes('Vanderbijlpark'), 'Stage 6 Paper 1 references Vanderbijlpark');
  assert.ok(m1Html.includes('Tutor Coaching Tips for Justin'), 'Memo 1 contains tutor coaching tips');
  assert.ok(m2Html.includes('Tutor Coaching Tips for Justin'), 'Memo 2 contains tutor coaching tips');
});

test('Cambridge Stage 7 Papers: Paper 1 Non-Calc & Paper 2 Calc with 45 marks', () => {
  const p1Html = fs.readFileSync(path.join(examDir, 'Cambridge_Stage7_Mathematics_Paper1_NonCalculator.html'), 'utf8');
  const p2Html = fs.readFileSync(path.join(examDir, 'Cambridge_Stage7_Mathematics_Paper2_Calculator.html'), 'utf8');

  assert.ok(p1Html.includes('NO CALCULATORS ALLOWED'), 'Stage 7 Paper 1 must be non-calculator');
  assert.ok(p2Html.includes('Calculator Permitted'), 'Stage 7 Paper 2 allows calculator');
  assert.ok(p1Html.includes('Total Marks: 45'), 'Stage 7 Paper 1 is 45 marks');
  assert.ok(p2Html.includes('Total Marks: 45'), 'Stage 7 Paper 2 is 45 marks');
});

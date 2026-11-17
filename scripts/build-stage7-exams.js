// scripts/build-stage7-exams.js
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const EXAM_DIR = path.resolve(__dirname, '../cambridge-stage7-exams');
if (!fs.existsSync(EXAM_DIR)) {
  fs.mkdirSync(EXAM_DIR, { recursive: true });
}

// Common HTML Head with CSS
function getHead(title) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  @page {
    size: A4;
    margin: 15mm 14mm 16mm 14mm;
  }
  @media print {
    body { font-size: 10.5pt; color: #000; background: #fff; }
    .page-break { page-break-after: always; break-after: page; }
    .no-print { display: none !important; }
    .question-block { page-break-inside: avoid; break-inside: avoid; }
    .memo-table tr { page-break-inside: avoid; break-inside: avoid; }
  }
  * { box-sizing: border-box; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #111;
    line-height: 1.45;
    margin: 0;
    padding: 0;
    background-color: #fff;
  }
  .exam-container {
    max-width: 820px;
    margin: 0 auto;
    padding: 10px 20px;
  }
  .cambridge-header {
    border-bottom: 2.5px solid #000;
    padding-bottom: 12px;
    margin-bottom: 16px;
  }
  .cambridge-title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .crest-text {
    font-weight: 800;
    font-size: 13.5pt;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #0f172a;
  }
  .sub-crest {
    font-size: 9.5pt;
    font-weight: 600;
    color: #334155;
    margin-top: 3px;
  }
  .school-crest {
    font-size: 9pt;
    font-weight: 700;
    color: #1e40af;
    margin-top: 2px;
  }
  .paper-code-box {
    text-align: right;
    font-weight: 800;
    font-size: 10.5pt;
    line-height: 1.3;
    border-left: 2px solid #cbd5e1;
    padding-left: 12px;
  }
  .exam-details-title {
    margin-top: 12px;
    font-size: 13.5pt;
    font-weight: 800;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #0f172a;
  }
  .exam-meta-sub {
    text-align: center;
    font-size: 10.5pt;
    font-weight: 700;
    margin-bottom: 16px;
    color: #334155;
  }
  .candidate-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 18px 0;
  }
  .candidate-table td {
    border: 1.5px solid #000;
    padding: 6px 10px;
    font-size: 10pt;
  }
  .label-cell {
    width: 25%;
    font-weight: 700;
    background-color: #f8fafc;
  }
  .fill-cell {
    width: 75%;
  }
  .instructions-box {
    border: 1.5px solid #000;
    padding: 11px 15px;
    font-size: 9pt;
    margin-bottom: 20px;
    background: #fcfcfc;
  }
  .instructions-box h4 {
    margin: 0 0 5px 0;
    text-transform: uppercase;
    font-size: 9.5pt;
    font-weight: 800;
  }
  .instructions-box ul {
    margin: 0;
    padding-left: 18px;
  }
  .instructions-box li {
    margin-bottom: 3px;
  }
  .badge-mode {
    display: inline-block;
    padding: 3px 10px;
    font-size: 8.5pt;
    font-weight: 800;
    border-radius: 4px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .badge-nocalc { background: #000; color: #fff; }
  .badge-calc { background: #1e40af; color: #fff; }

  /* Mathematical Typography - Clean, Crisp, Zero Code Strings */
  .math, .math-expr {
    font-family: 'Cambria Math', 'Times New Roman', Cambria, Georgia, serif;
    font-size: 1.05em;
    font-style: normal;
  }
  var {
    font-style: italic;
    font-family: 'Cambria Math', 'Times New Roman', serif;
  }
  .frac {
    display: inline-flex;
    flex-direction: column;
    vertical-align: -0.62em;
    text-align: center;
    padding: 0 2px;
    line-height: 1;
    font-size: 0.9em;
    font-family: 'Cambria Math', 'Times New Roman', serif;
  }
  .frac .top {
    border-bottom: 1.3px solid currentColor;
    padding-bottom: 1.5px;
  }
  .frac .bottom {
    padding-top: 1.5px;
  }
  .radical {
    display: inline-flex;
    align-items: baseline;
    font-family: 'Cambria Math', 'Times New Roman', serif;
  }
  .radicand {
    border-top: 1.3px solid currentColor;
    padding: 0 2px;
    margin-left: 1px;
  }
  .root-deg {
    font-size: 0.65em;
    margin-right: -2px;
    vertical-align: super;
  }
  .math-op {
    font-family: Arial, sans-serif;
    font-style: normal;
    padding: 0 2px;
  }
  sup { font-size: 0.72em; vertical-align: super; line-height: 0; }
  sub { font-size: 0.72em; vertical-align: sub; line-height: 0; }

  .question-block {
    margin-bottom: 20px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .q-num {
    font-weight: 800;
    font-size: 10.5pt;
    display: inline-block;
    width: 26px;
    vertical-align: top;
  }
  .q-body {
    display: inline-block;
    width: calc(100% - 32px);
    vertical-align: top;
    font-size: 10.5pt;
  }
  .q-part {
    margin-top: 7px;
    margin-left: 6px;
  }
  .part-label {
    font-weight: 700;
    display: inline-block;
    width: 24px;
    vertical-align: top;
  }
  .part-content {
    display: inline-block;
    width: calc(100% - 28px);
    vertical-align: top;
  }
  .working-space {
    min-height: 40px;
    margin: 5px 0;
  }
  .working-space.large {
    min-height: 75px;
  }
  .answer-line-row {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    gap: 8px;
    margin-top: 5px;
    font-weight: 700;
  }
  .dots-line {
    display: inline-block;
    border-bottom: 1px dotted #000;
    min-width: 140px;
    height: 18px;
    margin: 0 4px;
  }
  .marks-bracket {
    font-weight: 800;
    font-size: 10pt;
    min-width: 28px;
    text-align: right;
  }
  .diagram-container {
    text-align: center;
    margin: 10px 0;
  }
  .center-table {
    margin: 10px auto;
    border-collapse: collapse;
    font-size: 9.5pt;
  }
  .center-table th, .center-table td {
    border: 1px solid #000;
    padding: 5px 12px;
    text-align: center;
  }
  .center-table th {
    background: #f1f5f9;
  }
  .footer-copyright {
    border-top: 1px solid #94a3b8;
    margin-top: 22px;
    padding-top: 6px;
    font-size: 8pt;
    color: #475569;
    display: flex;
    justify-content: space-between;
  }
  .print-btn-bar {
    background: #1e40af;
    color: #fff;
    padding: 9px 16px;
    text-align: center;
    font-weight: 700;
    margin-bottom: 15px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 9.5pt;
  }
  .print-btn-bar:hover { background: #1d4ed8; }

  /* Marking Scheme Memo Styling */
  .memo-container {
    max-width: 840px;
    margin: 0 auto;
    padding: 10px 20px;
  }
  .header-memo {
    border-bottom: 2.5px solid #000;
    padding-bottom: 10px;
    margin-bottom: 12px;
  }
  .title-memo {
    font-size: 13.5pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #0f172a;
  }
  .sub-memo {
    font-size: 9.5pt;
    color: #334155;
    font-weight: 700;
  }
  .rubric-info-box {
    background: #eff6ff;
    border-left: 4px solid #1e40af;
    padding: 8px 12px;
    font-size: 9pt;
    margin-bottom: 14px;
    line-height: 1.4;
  }
  .memo-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 18px;
    font-size: 9.5pt;
  }
  .memo-table th, .memo-table td {
    border: 1px solid #334155;
    padding: 6px 9px;
    vertical-align: top;
  }
  .memo-table th {
    background: #e2e8f0;
    text-align: left;
    font-weight: 800;
  }
  .col-q { width: 8%; text-align: center; font-weight: bold; }
  .col-ans { width: 32%; font-weight: bold; color: #1e3a8a; }
  .col-marks { width: 10%; text-align: center; font-weight: bold; }
  .col-notes { width: 50%; }

  .mark-badge {
    display: inline-block;
    padding: 1px 5px;
    border-radius: 3px;
    font-weight: 800;
    font-size: 8pt;
    margin-right: 3px;
  }
  .m-mark { background: #dbeafe; color: #1e40af; }
  .a-mark { background: #dcfce7; color: #166534; }
  .b-mark { background: #fef3c7; color: #92400e; }

  .coaching-section {
    background: #fffbeb;
    border: 1.5px solid #f59e0b;
    border-radius: 8px;
    padding: 12px 16px;
    margin: 18px 0;
  }
  .coaching-title {
    font-size: 11pt;
    font-weight: 800;
    color: #92400e;
    margin-bottom: 8px;
  }
  .coaching-tip-card {
    background: #ffffff;
    border: 1px solid #fde68a;
    border-radius: 6px;
    padding: 8px 12px;
    margin-bottom: 8px;
    font-size: 9pt;
  }
  .coaching-tip-card h5 {
    margin: 0 0 3px 0;
    color: #b45309;
    font-size: 9.5pt;
    font-weight: 800;
  }
</style>
</head>
<body>
`;
}

function candidateTable() {
  return `
  <table class="candidate-table">
    <tr>
      <td class="label-cell">Candidate Name:</td>
      <td class="fill-cell" style="font-size: 12pt; font-weight: bold; color: #1e3a8a;">Justin Lamusse</td>
    </tr>
    <tr>
      <td class="label-cell">School / Centre:</td>
      <td class="fill-cell">Kainos Cambridge School, Vanderbijlpark</td>
    </tr>
    <tr>
      <td class="label-cell">Grade / Stage:</td>
      <td class="fill-cell">Grade 7 / Cambridge Stage 7 (Lower Secondary)</td>
    </tr>
  </table>
  `;
}

// ==============================================================
// 1. STAGE 7 PAPER 1 (NON-CALCULATOR)
// ==============================================================
const s7p1Html = getHead('Cambridge Stage 7 Mathematics - Paper 1 (Non-Calculator)') + `
<div class="exam-container">
  <div class="print-btn-bar no-print" onclick="window.print()">
    🖨️ Click Here to Print or Save this Exam Paper as PDF
  </div>

  <div class="cambridge-header">
    <div class="cambridge-title-row">
      <div>
        <div class="crest-text">Cambridge Lower Secondary Progression Test</div>
        <div class="sub-crest">Mathematics Curriculum Framework Stage 7 &bull; Grade 7</div>
        <div class="school-crest">Kainos Cambridge School &bull; Vanderbijlpark</div>
      </div>
      <div class="paper-code-box">
        STAGE 7<br>
        PAPER 1<br>
        0862 / 01
      </div>
    </div>
  </div>

  <div class="exam-details-title">Mathematics Stage 7 — Paper 1</div>
  <div class="exam-meta-sub">
    Non-Calculator &bull; Time Allowed: 1 Hour &bull; Total Marks: 45
  </div>

  ${candidateTable()}

  <div class="instructions-box">
    <span class="badge-mode badge-nocalc">NO CALCULATORS ALLOWED IN PAPER 1</span>
    <h4>Read these instructions carefully before you begin:</h4>
    <ul>
      <li>Answer <strong>all</strong> questions in the spaces provided on this question paper.</li>
      <li>You should show <strong>all</strong> your working on the paper. Method marks may be awarded even if the final answer is incorrect.</li>
      <li>Calculators are <strong>NOT</strong> permitted in this examination paper.</li>
      <li>Use black or dark blue pen. You may use an HB pencil for diagrams and graphs.</li>
      <li>The number of marks is shown in brackets <strong>[ ]</strong> at the end of each question or part question.</li>
      <li>The total number of marks for this paper is <strong>45</strong>.</li>
    </ul>
  </div>

  <!-- Q1 -->
  <div class="question-block">
    <span class="q-num">1</span>
    <div class="q-body">
      Work out the exact value of each calculation:
      
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          <span class="math">&minus;7 + 12</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>

      <div class="q-part">
        <span class="part-label">(b)</span>
        <div class="part-content">
          <span class="math">4 &times; (&minus;6)</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>

      <div class="q-part">
        <span class="part-label">(c)</span>
        <div class="part-content">
          <span class="math">(&minus;24) &divide; (&minus;4)</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q2 -->
  <div class="question-block">
    <span class="q-num">2</span>
    <div class="q-body">
      Work out using the correct order of operations (BIDMAS):
      <div style="margin: 6px 0; font-size: 11.5pt; font-weight: bold; text-align: center;">
        <span class="math">18 &minus; 3 &times; (4 + 2)</span>
      </div>
      <div class="working-space">Show your working:</div>
      <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
    </div>
  </div>

  <!-- Q3 -->
  <div class="question-block">
    <span class="q-num">3</span>
    <div class="q-body">
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Write <span class="math">72</span> as a product of its prime factors in index form (using powers).
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line" style="min-width: 180px;"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 10px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Find the <strong>Highest Common Factor (HCF)</strong> and <strong>Lowest Common Multiple (LCM)</strong> of <span class="math">24</span> and <span class="math">36</span>.
          <div class="working-space"></div>
          <div class="answer-line-row">HCF = <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
          <div class="answer-line-row">LCM = <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Q4 -->
  <div class="question-block">
    <span class="q-num">4</span>
    <div class="q-body">
      Work out the following fraction calculations. Give each answer in its <strong>simplest form</strong> (as a proper fraction or mixed number).
      
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          <span class="math"><span class="frac"><span class="top">3</span><span class="bottom">5</span></span> + <span class="frac"><span class="top">1</span><span class="bottom">4</span></span></span>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 10px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          <span class="math">2<span class="frac"><span class="top">1</span><span class="bottom">3</span></span> &times; <span class="frac"><span class="top">3</span><span class="bottom">7</span></span></span>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 10px;">
        <span class="part-label">(c)</span>
        <div class="part-content">
          <span class="math"><span class="frac"><span class="top">4</span><span class="bottom">9</span></span> &divide; <span class="frac"><span class="top">2</span><span class="bottom">3</span></span></span>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q5 -->
  <div class="question-block">
    <span class="q-num">5</span>
    <div class="q-body">
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Calculate: <span class="math">4.6 &times; 0.3</span>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Calculate: <span class="math">5.4 &divide; 0.09</span>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q6 -->
  <div class="question-block">
    <span class="q-num">6</span>
    <div class="q-body">
      Work out the exact value of:
      <div style="margin: 6px 0; font-size: 11.5pt; font-weight: bold; text-align: center;">
        <span class="math">4<sup>3</sup> &minus; <span class="radical">&radic;<span class="radicand">144</span></span> + <span class="radical"><sup class="root-deg">3</sup>&radic;<span class="radicand">27</span></span></span>
      </div>
      <div class="working-space"></div>
      <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
    </div>
  </div>

  <!-- Q7 -->
  <div class="question-block">
    <span class="q-num">7</span>
    <div class="q-body">
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Work out <span class="math">35%</span> of <span class="math">80</span>.
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Convert <span class="math"><span class="frac"><span class="top">7</span><span class="bottom">20</span></span></span> into:
          <div style="margin-top: 4px;">(i) a decimal: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
          <div style="margin-top: 4px;">(ii) a percentage: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Q8 -->
  <div class="question-block">
    <span class="q-num">8</span>
    <div class="q-body">
      Here are the first four terms of an arithmetic sequence:
      <div style="text-align: center; font-size: 12pt; font-weight: bold; margin: 6px 0;">
        <span class="math">7, &nbsp;&nbsp; 11, &nbsp;&nbsp; 15, &nbsp;&nbsp; 19, &nbsp;&nbsp; &hellip;</span>
      </div>

      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          State the term-to-term rule of this sequence.
          <div class="answer-line-row">Answer: <span class="dots-line" style="min-width: 200px;"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Find the position-to-term (<var>n</var><sup>th</sup> term) formula for this sequence in terms of <var>n</var>.
          <div class="working-space"></div>
          <div class="answer-line-row"><var>n</var><sup>th</sup> term = <span class="dots-line" style="min-width: 160px;"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 8px;">
        <span class="part-label">(c)</span>
        <div class="part-content">
          Use your formula from (b) to find the 50<sup>th</sup> term of this sequence.
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q9 -->
  <div class="question-block">
    <span class="q-num">9</span>
    <div class="q-body">
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Simplify by collecting like terms:
          <div style="margin: 4px 0; font-weight: bold;"><span class="math">5<var>x</var> + 3<var>y</var> &minus; 2<var>x</var> + 7<var>y</var></span></div>
          <div class="answer-line-row">Answer: <span class="dots-line" style="min-width: 160px;"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Expand the bracket:
          <div style="margin: 4px 0; font-weight: bold;"><span class="math">4(3<var>m</var> &minus; 5)</span></div>
          <div class="answer-line-row">Answer: <span class="dots-line" style="min-width: 160px;"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 8px;">
        <span class="part-label">(c)</span>
        <div class="part-content">
          Solve the linear equation:
          <div style="margin: 4px 0; font-weight: bold;"><span class="math">3<var>x</var> + 8 = 29</span></div>
          <div class="working-space"></div>
          <div class="answer-line-row"><var>x</var> = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 8px;">
        <span class="part-label">(d)</span>
        <div class="part-content">
          Solve the equation:
          <div style="margin: 4px 0; font-weight: bold;"><span class="math">5(2<var>y</var> &minus; 1) = 35</span></div>
          <div class="working-space"></div>
          <div class="answer-line-row"><var>y</var> = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q10 -->
  <div class="question-block">
    <span class="q-num">10</span>
    <div class="q-body">
      The diagram shows a triangle <span class="math"><var>ABC</var></span> with line <span class="math"><var>BCD</var></span> extended in a straight line.
      <div class="diagram-container">
        <svg width="340" height="150" viewBox="0 0 340 150" style="background:#fff;">
          <line x1="30" y1="120" x2="310" y2="120" stroke="#000" stroke-width="2"/>
          <line x1="50" y1="120" x2="150" y2="30" stroke="#000" stroke-width="2"/>
          <line x1="150" y1="30" x2="220" y2="120" stroke="#000" stroke-width="2"/>
          <text x="40" y="140" font-family="Arial" font-size="12" font-weight="bold">B</text>
          <text x="145" y="20" font-family="Arial" font-size="12" font-weight="bold">A</text>
          <text x="215" y="140" font-family="Arial" font-size="12" font-weight="bold">C</text>
          <text x="305" y="140" font-family="Arial" font-size="12" font-weight="bold">D</text>
          <text x="65" y="110" font-family="Arial" font-size="11" font-weight="bold">65°</text>
          <text x="142" y="55" font-family="Arial" font-size="11" font-weight="bold">50°</text>
          <text x="190" y="110" font-family="Arial" font-size="11" font-weight="bold">x°</text>
          <text x="240" y="110" font-family="Arial" font-size="11" font-weight="bold">y°</text>
        </svg>
      </div>

      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Find the value of angle <span class="math"><var>x</var></span>. State the geometric rule used.
          <div class="working-space"></div>
          <div class="answer-line-row"><var>x</var> = <span class="dots-line"></span>° Reason: <span class="dots-line" style="min-width: 180px;"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Find the value of external angle <span class="math"><var>y</var></span>.
          <div class="working-space"></div>
          <div class="answer-line-row"><var>y</var> = <span class="dots-line"></span>° <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Q11 -->
  <div class="question-block">
    <span class="q-num">11</span>
    <div class="q-body">
      Points <span class="math"><var>P</var>(&minus;3, 2)</span>, <span class="math"><var>Q</var>(1, 2)</span>, and <span class="math"><var>R</var>(&minus;1, 5)</span> are the vertices of an isosceles triangle on a coordinate grid.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Write down the equation of the vertical line of symmetry of triangle <span class="math"><var>PQR</var></span>.
          <div class="answer-line-row">Line equation: <span class="dots-line" style="min-width: 150px;"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Triangle <span class="math"><var>PQR</var></span> is reflected in the <var>x</var>-axis (<span class="math"><var>y</var> = 0</span>) to form triangle <span class="math"><var>P'Q'R'</var></span>.<br>
          Write down the coordinates of vertex <span class="math"><var>P'</var></span>.
          <div class="answer-line-row"><var>P'</var> = ( <span class="dots-line" style="min-width: 50px;"></span> , <span class="dots-line" style="min-width: 50px;"></span> ) <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q12 -->
  <div class="question-block">
    <span class="q-num">12</span>
    <div class="q-body">
      A bag contains <span class="math">5</span> red counters, <span class="math">4</span> blue counters, and <span class="math">3</span> yellow counters.<br>
      A counter is chosen at random from the bag.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Find the probability that the counter is blue. Give your answer as a fraction in its simplest form.
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Find the probability that the counter is <strong>NOT</strong> red.
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q13 -->
  <div class="question-block">
    <span class="q-num">13</span>
    <div class="q-body">
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Simplify the ratio:
          <div style="font-weight: bold; margin: 4px 0;"><span class="math">40 cm : 1.2 m</span></div>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>

      <div class="q-part" style="margin-top: 10px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Share <span class="math">R180</span> among three brothers in the ratio <span class="math">2 : 3 : 4</span>.<br>
          Calculate the amount the youngest brother receives (smallest share).
          <div class="working-space"></div>
          <div class="answer-line-row">Smallest share = R <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-copyright">
    <span>&copy; Cambridge University Press &amp; Assessment / Stage 7 Mathematics Practice</span>
    <span>Kainos Cambridge School, Vanderbijlpark &bull; Total Marks: 45</span>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(EXAM_DIR, 'Cambridge_Stage7_Mathematics_Paper1_NonCalculator.html'), s7p1Html, 'utf8');

// ==============================================================
// 2. STAGE 7 PAPER 1 MARK SCHEME & MEMO
// ==============================================================
const s7p1MemoHtml = getHead('Cambridge Stage 7 Mathematics Paper 1 - Mark Scheme & Teaching Memo') + `
<div class="memo-container">
  <div class="print-btn-bar no-print" onclick="window.print()">
    🖨️ Click Here to Print or Save this Mark Scheme / Memo as PDF
  </div>

  <div class="header-memo">
    <div class="title-memo">Cambridge Lower Secondary Mathematics — Stage 7</div>
    <div class="sub-memo">Mark Scheme &amp; Teacher Pedagogical Memorandum &bull; Paper 1 (Non-Calculator) &bull; Maximum Mark: 45</div>
    <div style="font-size: 9pt; font-weight: bold; color: #1e40af; margin-top: 3px;">Kainos Cambridge School &bull; Vanderbijlpark &bull; Candidate: Justin Lamusse</div>
  </div>

  <div class="rubric-info-box">
    <strong>Cambridge Assessment Marking Symbols Guide:</strong><br>
    <strong>M Marks:</strong> Method marks for showing correct mathematical working steps (independent of arithmetic slips).<br>
    <strong>A Marks:</strong> Accuracy marks awarded <em>only</em> if the corresponding M mark has been earned.<br>
    <strong>B Marks:</strong> Unconditional independent marks awarded for correct answers, values, or statements.<br>
    <strong>ft:</strong> Follow-through marks awarded when subsequent working is correct following an earlier arithmetic slip.
  </div>

  <table class="memo-table">
    <thead>
      <tr>
        <th class="col-q">Q</th>
        <th class="col-ans">Official Marking Key</th>
        <th class="col-marks">Marks</th>
        <th class="col-notes">Guidance &amp; Marking Breakdown</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="col-q">1 (a)</td>
        <td class="col-ans">5</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Allow <span class="math">+5</span>. Start at &minus;7, jump 12 up into positive territory.</td>
      </tr>
      <tr>
        <td class="col-q">1 (b)</td>
        <td class="col-ans">&minus;24</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Positive &times; negative gives negative. Sign must be correct.</td>
      </tr>
      <tr>
        <td class="col-q">1 (c)</td>
        <td class="col-ans">6</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Negative &divide; negative gives positive 6 (or +6).</td>
      </tr>
      <tr>
        <td class="col-q">2</td>
        <td class="col-ans">0</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> For evaluating bracket first: <span class="math">4 + 2 = 6</span>, followed by multiplication: <span class="math">3 &times; 6 = 18</span>.<br>
          <strong>A1:</strong> For final answer of <span class="math">18 &minus; 18 = 0</span>.<br>
          <em>Note:</em> Common error (18 &minus; 3 = 15 &times; 6 = 90) earns 0 marks.
        </td>
      </tr>
      <tr>
        <td class="col-q">3 (a)</td>
        <td class="col-ans">2<sup>3</sup> &times; 3<sup>2</sup></td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> For correct prime factor tree or ladder with prime factors 2, 2, 2, 3, 3.<br>
          <strong>A1:</strong> In index form 2<sup>3</sup> &times; 3<sup>2</sup>.
        </td>
      </tr>
      <tr>
        <td class="col-q">3 (b)</td>
        <td class="col-ans">HCF = 12<br>LCM = 72</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">
          <strong>B1:</strong> Highest Common Factor = 12.<br>
          <strong>B1:</strong> Lowest Common Multiple = 72.
        </td>
      </tr>
      <tr>
        <td class="col-q">4 (a)</td>
        <td class="col-ans"><span class="frac"><span class="top">17</span><span class="bottom">20</span></span></td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Common denominator of 20: <span class="math"><span class="frac"><span class="top">12</span><span class="bottom">20</span></span> + <span class="frac"><span class="top">5</span><span class="bottom">20</span></span></span>.<br>
          <strong>A1:</strong> <span class="math"><span class="frac"><span class="top">17</span><span class="bottom">20</span></span></span>.
        </td>
      </tr>
      <tr>
        <td class="col-q">4 (b)</td>
        <td class="col-ans">1</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Convert mixed number to improper fraction: <span class="math"><span class="frac"><span class="top">7</span><span class="bottom">3</span></span> &times; <span class="frac"><span class="top">3</span><span class="bottom">7</span></span></span>.<br>
          <strong>A1:</strong> Cancel factors 7 and 3 to obtain exactly 1.
        </td>
      </tr>
      <tr>
        <td class="col-q">4 (c)</td>
        <td class="col-ans"><span class="frac"><span class="top">2</span><span class="bottom">3</span></span></td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Invert and multiply (Keep-Change-Flip): <span class="math"><span class="frac"><span class="top">4</span><span class="bottom">9</span></span> &times; <span class="frac"><span class="top">3</span><span class="bottom">2</span></span> = <span class="frac"><span class="top">12</span><span class="bottom">18</span></span></span>.<br>
          <strong>A1:</strong> Fully simplified to <span class="math"><span class="frac"><span class="top">2</span><span class="bottom">3</span></span></span>.
        </td>
      </tr>
      <tr>
        <td class="col-q">5 (a)</td>
        <td class="col-ans">1.38</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">46 &times; 3 = 138 with two total decimal places = 1.38.</td>
      </tr>
      <tr>
        <td class="col-q">5 (b)</td>
        <td class="col-ans">60</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Multiply numerator and denominator by 100: <span class="math">540 &divide; 9</span>.<br>
          <strong>A1:</strong> Exactly 60.
        </td>
      </tr>
      <tr>
        <td class="col-q">6</td>
        <td class="col-ans">55</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Evaluating parts: 4<sup>3</sup> = 64, &radic;144 = 12, <sup>3</sup>&radic;27 = 3.<br>
          <strong>A1:</strong> 64 &minus; 12 + 3 = 55.
        </td>
      </tr>
      <tr>
        <td class="col-q">7 (a)</td>
        <td class="col-ans">28</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> 10% = 8, 30% = 24, 5% = 4, so 24 + 4 = 28.<br>
          <strong>A1:</strong> 28.
        </td>
      </tr>
      <tr>
        <td class="col-q">7 (b)</td>
        <td class="col-ans">(i) 0.35<br>(ii) 35%</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">
          <strong>B1:</strong> 7 &divide; 20 = 35 &divide; 100 = 0.35.<br>
          <strong>B1:</strong> 35%.
        </td>
      </tr>
      <tr>
        <td class="col-q">8 (a)</td>
        <td class="col-ans">Add 4</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Accept "+4" or "add 4 to the previous term".</td>
      </tr>
      <tr>
        <td class="col-q">8 (b)</td>
        <td class="col-ans">4<var>n</var> + 3</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> For recognizing 4<var>n</var> (common difference).<br>
          <strong>A1:</strong> Correct formula 4<var>n</var> + 3 (or 3 + 4<var>n</var>).
        </td>
      </tr>
      <tr>
        <td class="col-q">8 (c)</td>
        <td class="col-ans">203</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">4(50) + 3 = 200 + 3 = 203. Allow ft from (b).</td>
      </tr>
      <tr>
        <td class="col-q">9 (a)</td>
        <td class="col-ans">3<var>x</var> + 10<var>y</var></td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">5<var>x</var> &minus; 2<var>x</var> = 3<var>x</var>, 3<var>y</var> + 7<var>y</var> = 10<var>y</var>.</td>
      </tr>
      <tr>
        <td class="col-q">9 (b)</td>
        <td class="col-ans">12<var>m</var> &minus; 20</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Multiply both terms by 4: 4 &times; 3<var>m</var> = 12<var>m</var>, 4 &times; (&minus;5) = &minus;20.</td>
      </tr>
      <tr>
        <td class="col-q">9 (c)</td>
        <td class="col-ans"><var>x</var> = 7</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Subtract 8 from both sides: 3<var>x</var> = 21.<br>
          <strong>A1:</strong> Divide by 3: <var>x</var> = 7.
        </td>
      </tr>
      <tr>
        <td class="col-q">9 (d)</td>
        <td class="col-ans"><var>y</var> = 4</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Expand or divide: 2<var>y</var> &minus; 1 = 7 (or 10<var>y</var> &minus; 5 = 35 &rArr; 10<var>y</var> = 40).<br>
          <strong>A1:</strong> <var>y</var> = 4.
        </td>
      </tr>
      <tr>
        <td class="col-q">10 (a)</td>
        <td class="col-ans"><var>x</var> = 65°</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">
          <strong>B1:</strong> 65° (180 &minus; (65 + 50) = 65).<br>
          <strong>B1:</strong> Reason: "Angles in a triangle add up to 180°" (or isosceles triangle property).
        </td>
      </tr>
      <tr>
        <td class="col-q">10 (b)</td>
        <td class="col-ans"><var>y</var> = 115°</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">180 &minus; 65 = 115° (angles on a straight line) or exterior angle = 65 + 50 = 115°.</td>
      </tr>
      <tr>
        <td class="col-q">11 (a)</td>
        <td class="col-ans"><var>x</var> = &minus;1</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Midpoint of base PQ is (&minus;1, 2), vertex R is (&minus;1, 5). Equation is <var>x</var> = &minus;1.</td>
      </tr>
      <tr>
        <td class="col-q">11 (b)</td>
        <td class="col-ans">(&minus;3, &minus;2)</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Reflection across <var>x</var>-axis inverts <var>y</var>-coordinate: (<var>x</var>, &minus;<var>y</var>).<br>
          <strong>A1:</strong> (&minus;3, &minus;2).
        </td>
      </tr>
      <tr>
        <td class="col-q">12 (a)</td>
        <td class="col-ans"><span class="frac"><span class="top">1</span><span class="bottom">3</span></span></td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Total counters = 5 + 4 + 3 = 12. P(blue) = 4/12 = 1/3 in simplest form.</td>
      </tr>
      <tr>
        <td class="col-q">12 (b)</td>
        <td class="col-ans"><span class="frac"><span class="top">7</span><span class="bottom">12</span></span></td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Not red = blue + yellow = 4 + 3 = 7. P(not red) = 7/12.</td>
      </tr>
      <tr>
        <td class="col-q">13 (a)</td>
        <td class="col-ans">1 : 3</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Convert to same units: 1.2 m = 120 cm &rArr; 40 : 120.<br>
          <strong>A1:</strong> Fully simplified ratio 1 : 3.
        </td>
      </tr>
      <tr>
        <td class="col-q">13 (b)</td>
        <td class="col-ans">R40</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Total parts = 2 + 3 + 4 = 9. One part = R180 &divide; 9 = R20.<br>
          <strong>A1:</strong> Smallest share (2 parts) = 2 &times; R20 = R40.
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Tutor Coaching Section for Justin -->
  <section class="coaching-section">
    <div class="coaching-title">👨‍🏫 Tutor Pedagogical Coaching Guide for Justin Lamusse</div>
    <div class="coaching-tip-card">
      <h5>1. Sign Errors with Negative Integers (Q1)</h5>
      <p>Remind Justin to use the <em>Integer Thermometer</em> mental model. For addition <span class="math">&minus;7 + 12</span>, visualize starting in freezing territory (&minus;7) and rising 12 degrees up past zero to reach +5. For multiplication and division, enforce the rhythmic mantra: <em>"Same signs make positive, different signs make negative."</em></p>
    </div>
    <div class="coaching-tip-card">
      <h5>2. BIDMAS Precedence Traps (Q2)</h5>
      <p>Dyscalculic students frequently read left-to-right and compute <span class="math">18 &minus; 3 = 15</span> before multiplying. Coach Justin to draw physical brackets around multiplication blocks: <span class="math">18 &minus; [3 &times; 6]</span> before performing subtraction.</p>
    </div>
    <div class="coaching-tip-card">
      <h5>3. Keep-Change-Flip Fraction Division (Q4c)</h5>
      <p>Use the mnemonic <em>KFC (Keep, Flip, Change)</em>. Keep the first fraction (<span class="math">4/9</span>), flip the second to its reciprocal (<span class="math">3/2</span>), and change &divide; to &times;. Emphasize cross-cancelling before multiplying numerators and denominators to prevent large numbers.</p>
    </div>
    <div class="coaching-tip-card">
      <h5>4. Metric Unit Ratio Conversion (Q13a)</h5>
      <p>Justin must always check units before writing a ratio! 40 cm to 1.2 m cannot be written as 40 : 1.2. Always convert the larger unit into the smaller unit: <span class="math">1.2 m &times; 100 = 120 cm</span>, giving <span class="math">40 : 120 = 1 : 3</span>.</p>
    </div>
  </section>

  <div class="footer-copyright">
    <span>&copy; Cambridge Assessment International Education &bull; Stage 7 Marking Guide</span>
    <span>Kainos Cambridge School, Vanderbijlpark &bull; Total Marks: 45</span>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(EXAM_DIR, 'Cambridge_Stage7_Mathematics_Paper1_MarkScheme_Memo.html'), s7p1MemoHtml, 'utf8');

console.log('Paper 1 & Memo written.');

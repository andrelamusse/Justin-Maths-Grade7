// scripts/build-stage7-paper5-6.js
const fs = require('fs');
const path = require('path');

const EXAM_DIR = path.resolve(__dirname, '../cambridge-stage7-exams');

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

  /* Mathematical Typography */
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
// 5. CAMBRIDGE STAGE 7 MOCK EXAMINATION — PAPER 1 (NON-CALCULATOR)
// ==============================================================
const s7m1Html = getHead('Cambridge Stage 7 Mock Examination - Paper 1 (Non-Calculator)') + `
<div class="exam-container">
  <div class="print-btn-bar no-print" onclick="window.print()">
    🖨️ Click Here to Print or Save this Exam Paper as PDF
  </div>

  <div class="cambridge-header">
    <div class="cambridge-title-row">
      <div>
        <div class="crest-text">Cambridge Lower Secondary Mock Examination</div>
        <div class="sub-crest">Mathematics Curriculum Framework Stage 7 &bull; Grade 7</div>
        <div class="school-crest">Kainos Cambridge School &bull; Vanderbijlpark</div>
      </div>
      <div class="paper-code-box">
        STAGE 7<br>
        MOCK 1<br>
        0862 / M1
      </div>
    </div>
  </div>

  <div class="exam-details-title">Mathematics Stage 7 — Mock Paper 1</div>
  <div class="exam-meta-sub">
    Non-Calculator &bull; Time Allowed: 1 Hour &bull; Total Marks: 45
  </div>

  ${candidateTable()}

  <div class="instructions-box">
    <span class="badge-mode badge-nocalc">NO CALCULATORS ALLOWED IN MOCK 1</span>
    <h4>Read these instructions carefully before you begin:</h4>
    <ul>
      <li>Answer <strong>all</strong> questions in the spaces provided on this question paper.</li>
      <li>Method marks may be awarded even if the final answer is incorrect.</li>
      <li>Calculators are <strong>NOT</strong> permitted in this examination paper.</li>
      <li>The total number of marks for this paper is <strong>45</strong>.</li>
    </ul>
  </div>

  <!-- Q1 -->
  <div class="question-block">
    <span class="q-num">1</span>
    <div class="q-body">
      Calculate each of the following directed number operations:
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          <span class="math">&minus;14 &minus; (&minus;8)</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
      <div class="q-part">
        <span class="part-label">(b)</span>
        <div class="part-content">
          <span class="math">(&minus;9) &times; (&minus;7)</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
      <div class="q-part">
        <span class="part-label">(c)</span>
        <div class="part-content">
          <span class="math">(&minus;72) &divide; (&minus;8)</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q2 -->
  <div class="question-block">
    <span class="q-num">2</span>
    <div class="q-body">
      Work out the following fraction calculations. Give each answer in simplest form:
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          <span class="math">1<span class="frac"><span class="top">5</span><span class="bottom">6</span></span> + 2<span class="frac"><span class="top">3</span><span class="bottom">8</span></span></span>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          <span class="math">3<span class="frac"><span class="top">1</span><span class="bottom">5</span></span> &divide; <span class="frac"><span class="top">8</span><span class="bottom">15</span></span></span>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q3 -->
  <div class="question-block">
    <span class="q-num">3</span>
    <div class="q-body">
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Calculate: <span class="math">0.04 &times; 0.6</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Calculate: <span class="math">4.8 &divide; 0.12</span>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q4 -->
  <div class="question-block">
    <span class="q-num">4</span>
    <div class="q-body">
      Complete the table of equivalent Fractions, Decimals, and Percentages:
      <table class="center-table">
        <tr><th>Fraction</th><th>Decimal</th><th>Percentage</th></tr>
        <tr><td><span class="frac"><span class="top">3</span><span class="bottom">8</span></span></td><td>0.375</td><td><span class="dots-line" style="min-width:60px;"></span></td></tr>
        <tr><td><span class="dots-line" style="min-width:60px;"></span></td><td>0.8</td><td>80%</td></tr>
        <tr><td><span class="frac"><span class="top">7</span><span class="bottom">10</span></span></td><td><span class="dots-line" style="min-width:60px;"></span></td><td>70%</td></tr>
      </table>
      <div class="answer-line-row">Table completed <span class="marks-bracket">[3]</span></div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Q5 -->
  <div class="question-block">
    <span class="q-num">5</span>
    <div class="q-body">
      Two parallel lines are crossed by a transversal line. One of the interior angles is <span class="math">72°</span>.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          State the size of the <strong>alternate angle</strong>. Reason: <span class="dots-line" style="min-width:160px;"></span> <span class="marks-bracket">[2]</span>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          State the size of the <strong>co-interior (allied) angle</strong>. Reason: <span class="dots-line" style="min-width:160px;"></span> <span class="marks-bracket">[2]</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Q6 -->
  <div class="question-block">
    <span class="q-num">6</span>
    <div class="q-body">
      A survey recorded the number of books read by 25 Grade 7 students over the holidays:
      <table class="center-table">
        <tr><th>Books Read</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
        <tr><th>Frequency</th><td>2</td><td>5</td><td>9</td><td>6</td><td>2</td><td>1</td></tr>
      </table>
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">State the modal number of books read: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
      </div>
      <div class="q-part" style="margin-top:6px;">
        <span class="part-label">(b)</span>
        <div class="part-content">Find the median number of books read: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
      </div>
      <div class="q-part" style="margin-top:6px;">
        <span class="part-label">(c)</span>
        <div class="part-content">Calculate the mean number of books read: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
      </div>
    </div>
  </div>

  <!-- Q7 -->
  <div class="question-block">
    <span class="q-num">7</span>
    <div class="q-body">
      A polyhedron has 6 vertices and 8 faces.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Use Euler's formula, <span class="math"><var>V</var> &minus; <var>E</var> + <var>F</var> = 2</span>, to calculate the number of edges <var>E</var>.
          <div class="working-space"></div>
          <div class="answer-line-row">Edges = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Name the 3D shape that fits this description (an octahedron): <span class="dots-line" style="min-width:160px;"></span> <span class="marks-bracket">[1]</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Q8 -->
  <div class="question-block">
    <span class="q-num">8</span>
    <div class="q-body">
      A descending arithmetic sequence starts: <span class="math">32, &nbsp;&nbsp; 27, &nbsp;&nbsp; 22, &nbsp;&nbsp; 17, &nbsp;&nbsp; &hellip;</span>
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Find the <var>n</var><sup>th</sup> term rule of this sequence.
          <div class="working-space"></div>
          <div class="answer-line-row"><var>n</var><sup>th</sup> term = <span class="dots-line" style="min-width:160px;"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Calculate the 25<sup>th</sup> term of this sequence.
          <div class="working-space"></div>
          <div class="answer-line-row">25<sup>th</sup> term = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Q9 -->
  <div class="question-block">
    <span class="q-num">9</span>
    <div class="q-body">
      After a <span class="math">20%</span> price increase, a textbook costs <span class="math">R240</span> in Vanderbijlpark.<br>
      Calculate the original price of the textbook before the price increase.
      <div class="working-space large"></div>
      <div class="answer-line-row">Original Price = R <span class="dots-line"></span> <span class="marks-bracket">[3]</span></div>
    </div>
  </div>

  <!-- Q10 -->
  <div class="question-block">
    <span class="q-num">10</span>
    <div class="q-body">
      Point <var>A</var> has coordinates <span class="math">(&minus;4, 7)</span> and Point <var>B</var> has coordinates <span class="math">(2, &minus;1)</span>.<br>
      Find the coordinates of the midpoint <var>M</var> of the line segment <var>AB</var>.
      <div class="working-space"></div>
      <div class="answer-line-row">Midpoint <var>M</var> = ( <span class="dots-line" style="min-width:50px;"></span> , <span class="dots-line" style="min-width:50px;"></span> ) <span class="marks-bracket">[3]</span></div>
    </div>
  </div>

  <!-- Q11 -->
  <div class="question-block">
    <span class="q-num">11</span>
    <div class="q-body">
      Share <span class="math">R450</span> between two learners in the ratio <span class="math">4 : 5</span>.<br>
      Calculate the difference between the two shares.
      <div class="working-space"></div>
      <div class="answer-line-row">Difference = R <span class="dots-line"></span> <span class="marks-bracket">[3]</span></div>
    </div>
  </div>

  <!-- Q12 -->
  <div class="question-block">
    <span class="q-num">12</span>
    <div class="q-body">
      The probability of rain in Vanderbijlpark tomorrow is <span class="math">0.35</span>.<br>
      What is the probability that it does <strong>NOT</strong> rain tomorrow?
      <div class="working-space"></div>
      <div class="answer-line-row">Probability = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
    </div>
  </div>

  <!-- Q13 -->
  <div class="question-block">
    <span class="q-num">13</span>
    <div class="q-body">
      A parallelogram has a base of <span class="math">9 cm</span> and a perpendicular height of <span class="math">4 cm</span>.<br>
      Calculate the area of the parallelogram.
      <div class="working-space"></div>
      <div class="answer-line-row">Area = <span class="dots-line"></span> cm<sup>2</sup> <span class="marks-bracket">[2]</span></div>
    </div>
  </div>

  <!-- Q14 -->
  <div class="question-block">
    <span class="q-num">14</span>
    <div class="q-body">
      Point <var>P</var><span class="math">(3, 5)</span> is reflected in the line <span class="math"><var>y</var> = <var>x</var></span>.<br>
      State the coordinates of the reflected image <var>P'</var>.
      <div class="answer-line-row"><var>P'</var> = ( <span class="dots-line" style="min-width:50px;"></span> , <span class="dots-line" style="min-width:50px;"></span> ) <span class="marks-bracket">[2]</span></div>
    </div>
  </div>

  <div class="footer-copyright">
    <span>&copy; Cambridge Assessment International Education &bull; Stage 7 Mock Paper 1</span>
    <span>Kainos Cambridge School, Vanderbijlpark &bull; Total Marks: 45</span>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(EXAM_DIR, 'Cambridge_Stage7_Mathematics_Mock_Paper1_NonCalculator.html'), s7m1Html, 'utf8');

// ==============================================================
// MOCK 1 MARK SCHEME & MEMO
// ==============================================================
const s7m1MemoHtml = getHead('Cambridge Stage 7 Mock Paper 1 - Mark Scheme & Memo') + `
<div class="memo-container">
  <div class="print-btn-bar no-print" onclick="window.print()">
    🖨️ Click Here to Print or Save this Mark Scheme / Memo as PDF
  </div>

  <div class="header-memo">
    <div class="title-memo">Cambridge Stage 7 Mock Examination &bull; Paper 1</div>
    <div class="sub-memo">Mark Scheme &amp; Pedagogical Memorandum &bull; Non-Calculator &bull; Maximum Mark: 45</div>
  </div>

  <div class="rubric-info-box">
    <strong>Cambridge Rubric:</strong> M = Method mark &bull; A = Accuracy mark &bull; B = Independent mark &bull; ft = Follow-through.
  </div>

  <table class="memo-table">
    <thead>
      <tr><th class="col-q">Q</th><th class="col-ans">Official Marking Key</th><th class="col-marks">Marks</th><th class="col-notes">Guidance &amp; Marking Breakdown</th></tr>
    </thead>
    <tbody>
      <tr>
        <td class="col-q">1</td>
        <td class="col-ans">(a) <span class="math">&minus;6</span><br>(b) <span class="math">63</span><br>(c) <span class="math">9</span></td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">(a) <span class="math">&minus;14 + 8 = &minus;6</span>. (b) <span class="math">(&minus;9) &times; (&minus;7) = +63</span>. (c) <span class="math">(&minus;72) &divide; (&minus;8) = +9</span>.</td>
      </tr>
      <tr>
        <td class="col-q">2 (a)</td>
        <td class="col-ans">4<span class="frac"><span class="top">5</span><span class="bottom">24</span></span> (or <span class="frac"><span class="top">101</span><span class="bottom">24</span></span>)</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes"><strong>M1:</strong> Common denom 24: 1 20/24 + 2 9/24 = 3 29/24 = 4 5/24. <strong>A1:</strong> 4 5/24.</td>
      </tr>
      <tr>
        <td class="col-q">2 (b)</td>
        <td class="col-ans">6</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes"><strong>M1:</strong> (16/5) &times; (15/8). <strong>A1:</strong> Cancel factors: 2 &times; 3 = 6.</td>
      </tr>
      <tr>
        <td class="col-q">3</td>
        <td class="col-ans">(a) 0.024<br>(b) 40</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">(a) 4 &times; 6 = 24 with 3 decimal places = 0.024. (b) 480 &divide; 12 = 40.</td>
      </tr>
      <tr>
        <td class="col-q">4</td>
        <td class="col-ans">37.5%, 4/5, 0.7</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Award 1 mark per correct missing cell.</td>
      </tr>
      <tr>
        <td class="col-q">5</td>
        <td class="col-ans">(a) 72° (Alternate)<br>(b) 108° (Co-interior)</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">(a) Alternate angles equal: 72°. (b) Co-interior angles add to 180°: 180 &minus; 72 = 108°.</td>
      </tr>
      <tr>
        <td class="col-q">6</td>
        <td class="col-ans">(a) Mode = 2<br>(b) Median = 2<br>(c) Mean = 2.16 (or 2.2)</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span><br><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">Total books = (0&times;2)+(1&times;5)+(2&times;9)+(3&times;6)+(4&times;2)+(5&times;1) = 0+5+18+18+8+5 = 54. 54 &divide; 25 = 2.16.</td>
      </tr>
      <tr>
        <td class="col-q">7</td>
        <td class="col-ans">(a) Edges = 12<br>(b) Octahedron</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">6 &minus; <var>E</var> + 8 = 2 &rArr; 14 &minus; <var>E</var> = 2 &rArr; <var>E</var> = 12 edges.</td>
      </tr>
      <tr>
        <td class="col-q">8</td>
        <td class="col-ans">(a) 37 &minus; 5<var>n</var><br>(b) &minus;88</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span><br><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">(a) Common diff is &minus;5 &rArr; &minus;5<var>n</var> + 37. (b) 37 &minus; 5(25) = 37 &minus; 125 = &minus;88.</td>
      </tr>
      <tr>
        <td class="col-q">9</td>
        <td class="col-ans">R200</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">120% = R240 &rArr; 1% = 240/120 = R2 &rArr; 100% = R200.</td>
      </tr>
      <tr>
        <td class="col-q">10</td>
        <td class="col-ans">(&minus;1, 3)</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A2</span></td>
        <td class="col-notes">Midpoint = [(&minus;4 + 2)/2, (7 + &minus;1)/2] = [&minus;2/2, 6/2] = (&minus;1, 3).</td>
      </tr>
      <tr>
        <td class="col-q">11</td>
        <td class="col-ans">Difference = R50</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A2</span></td>
        <td class="col-notes">Total parts = 9. 1 part = 450/9 = R50. Difference = 5 &minus; 4 = 1 part = R50.</td>
      </tr>
      <tr>
        <td class="col-q">12</td>
        <td class="col-ans">0.65</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">1 &minus; 0.35 = 0.65.</td>
      </tr>
      <tr>
        <td class="col-q">13</td>
        <td class="col-ans">36 cm<sup>2</sup></td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">Base &times; perpendicular height = 9 &times; 4 = 36 cm<sup>2</sup>.</td>
      </tr>
      <tr>
        <td class="col-q">14</td>
        <td class="col-ans">(5, 3)</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">Reflection across line <var>y</var> = <var>x</var> swaps coordinates: (<var>x</var>, <var>y</var>) &rarr; (<var>y</var>, <var>x</var>).</td>
      </tr>
    </tbody>
  </table>

  <section class="coaching-section">
    <div class="coaching-title">👨‍🏫 Tutor Pedagogical Coaching Guide for Justin Lamusse</div>
    <div class="coaching-tip-card">
      <h5>1. Reverse Percentage (Q9)</h5>
      <p>Never take 20% off R240! That's a common trap. When an amount increases by 20%, R240 represents <strong>120%</strong>. Divide by 120 and multiply by 100 to get back to 100%.</p>
    </div>
    <div class="coaching-tip-card">
      <h5>2. Midpoint Coordinates (Q10)</h5>
      <p>Mnemonic: <em>"Add and halve!"</em> Add the two <var>x</var>-numbers and divide by 2; add the two <var>y</var>-numbers and divide by 2.</p>
    </div>
  </section>

  <div class="footer-copyright">
    <span>&copy; Cambridge Assessment International Education &bull; Stage 7 Marking Guide</span>
    <span>Kainos Cambridge School, Vanderbijlpark &bull; Total Marks: 45</span>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(EXAM_DIR, 'Cambridge_Stage7_Mathematics_Mock_Paper1_MarkScheme_Memo.html'), s7m1MemoHtml, 'utf8');

// ==============================================================
// 6. CAMBRIDGE STAGE 7 MOCK EXAMINATION — PAPER 2 (CALCULATOR PERMITTED)
// ==============================================================
const s7m2Html = getHead('Cambridge Stage 7 Mock Examination - Paper 2 (Calculator)') + `
<div class="exam-container">
  <div class="print-btn-bar no-print" onclick="window.print()">
    🖨️ Click Here to Print or Save this Exam Paper as PDF
  </div>

  <div class="cambridge-header">
    <div class="cambridge-title-row">
      <div>
        <div class="crest-text">Cambridge Lower Secondary Mock Examination</div>
        <div class="sub-crest">Mathematics Curriculum Framework Stage 7 &bull; Grade 7</div>
        <div class="school-crest">Kainos Cambridge School &bull; Vanderbijlpark</div>
      </div>
      <div class="paper-code-box">
        STAGE 7<br>
        MOCK 2<br>
        0862 / M2
      </div>
    </div>
  </div>

  <div class="exam-details-title">Mathematics Stage 7 — Mock Paper 2</div>
  <div class="exam-meta-sub">
    Calculator Permitted &bull; Time Allowed: 1 Hour &bull; Total Marks: 45
  </div>

  ${candidateTable()}

  <div class="instructions-box">
    <span class="badge-mode badge-calc">CALCULATOR PERMITTED IN MOCK 2</span>
    <h4>Read these instructions carefully before you begin:</h4>
    <ul>
      <li>Answer <strong>all</strong> questions in the spaces provided on this question paper.</li>
      <li>A scientific or standard electronic calculator is permitted.</li>
      <li>Method marks may be awarded even if the final calculation is incorrect.</li>
      <li>The total number of marks for this paper is <strong>45</strong>.</li>
    </ul>
  </div>

  <!-- Q1 -->
  <div class="question-block">
    <span class="q-num">1</span>
    <div class="q-body">
      Use a calculator to evaluate:
      <div style="text-align:center; font-weight:bold; margin:6px 0;">
        <span class="math"><span class="frac"><span class="top">4.7<sup>3</sup> &minus; <span class="radical">&radic;<span class="radicand">125.44</span></span></span><span class="bottom">3.2 &times; 1.65</span></span></span>
      </div>
      Give your answer correct to <strong>3 significant figures</strong>.
      <div class="working-space"></div>
      <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[3]</span></div>
    </div>
  </div>

  <!-- Q2 -->
  <div class="question-block">
    <span class="q-num">2</span>
    <div class="q-body">
      Solve the linear equation with fractions:
      <div style="text-align:center; font-weight:bold; margin:6px 0;">
        <span class="math"><span class="frac"><span class="top">3<var>x</var> &minus; 4</span><span class="bottom">5</span></span> = <span class="frac"><span class="top"><var>x</var> + 6</span><span class="bottom">2</span></span></span>
      </div>
      <div class="working-space large"></div>
      <div class="answer-line-row"><var>x</var> = <span class="dots-line"></span> <span class="marks-bracket">[4]</span></div>
    </div>
  </div>

  <!-- Q3 -->
  <div class="question-block">
    <span class="q-num">3</span>
    <div class="q-body">
      Justin invests <span class="math">R5000</span> in a savings account paying simple interest at a rate of <span class="math">6%</span> per annum.<br>
      The investment is left for <span class="math">3 years</span>.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Calculate the total simple interest earned over 3 years.
          <div class="working-space"></div>
          <div class="answer-line-row">Interest = R <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Calculate the total amount in the account at the end of 3 years.
          <div class="working-space"></div>
          <div class="answer-line-row">Total Amount = R <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Q4 -->
  <div class="question-block">
    <span class="q-num">4</span>
    <div class="q-body">
      A tourist bus travels a distance of <span class="math">231 km</span> from Vanderbijlpark to the Drakensberg.<br>
      The journey takes <span class="math">2 hours and 45 minutes</span>.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Convert <span class="math">2 hours and 45 minutes</span> into hours as a decimal: <span class="dots-line"></span> hours <span class="marks-bracket">[1]</span>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Calculate the average speed of the bus in <strong>km/h</strong>.
          <div class="working-space"></div>
          <div class="answer-line-row">Average Speed = <span class="dots-line"></span> km/h <span class="marks-bracket">[3]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q5 -->
  <div class="question-block">
    <span class="q-num">5</span>
    <div class="q-body">
      The diagram shows a metal plate made from a square of side <span class="math">10 cm</span> with a semicircle of diameter <span class="math">8 cm</span> cut out from one edge.<br>
      Calculate the remaining surface area of the plate. (Use <span class="math">&pi; = 3.142</span>).
      <div class="working-space large"></div>
      <div class="answer-line-row">Area = <span class="dots-line"></span> cm<sup>2</sup> <span class="marks-bracket">[4]</span></div>
    </div>
  </div>

  <!-- Q6 -->
  <div class="question-block">
    <span class="q-num">6</span>
    <div class="q-body">
      A lighthouse <var>L</var> is on a bearing of <span class="math">140°</span> from a harbour <var>H</var>.<br>
      A fishing boat is anchored at point <var>P</var> directly South of the harbour, such that angle <span class="math"><var>LHP</var> = 40°</span>.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Calculate the three-figure bearing of the harbour <var>H</var> from the lighthouse <var>L</var> (back-bearing).
          <div class="working-space"></div>
          <div class="answer-line-row">Back-bearing = <span class="dots-line"></span>° <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          State whether angle <span class="math">140°</span> is acute, obtuse, or reflex: <span class="dots-line"></span> <span class="marks-bracket">[1]</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Q7 -->
  <div class="question-block">
    <span class="q-num">7</span>
    <div class="q-body">
      Two Grade 7 tutor groups (Group A and Group B) took the same test out of 20:
      <table class="center-table">
        <tr><th>Statistic</th><th>Group A</th><th>Group B</th></tr>
        <tr><th>Median</th><td>14</td><td>16</td></tr>
        <tr><th>Range</th><td>9</td><td>5</td></tr>
      </table>
      Make two statistical comparisons between the test performances of Group A and Group B:
      <div class="working-space large"></div>
      <div class="answer-line-row">Comparisons stated <span class="marks-bracket">[4]</span></div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Q8 -->
  <div class="question-block">
    <span class="q-num">8</span>
    <div class="q-body">
      An architectural floor plan is drawn to a scale of <span class="math">1 : 50</span>.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          On the plan, a classroom wall is <span class="math">12 cm</span> long. Calculate the real length of the wall in <strong>metres</strong>.
          <div class="working-space"></div>
          <div class="answer-line-row">Real length = <span class="dots-line"></span> m <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          The actual width of a doorway is <span class="math">0.9 m</span>. Calculate its width on the plan in <strong>centimetres</strong>.
          <div class="working-space"></div>
          <div class="answer-line-row">Plan width = <span class="dots-line"></span> cm <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q9 -->
  <div class="question-block">
    <span class="q-num">9</span>
    <div class="q-body">
      The point <span class="math"><var>P</var>(&minus;2, 5)</span> is given on a Cartesian coordinate grid.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          <var>P</var> is rotated <span class="math">180°</span> about the origin <span class="math">(0, 0)</span> to give point <var>P'</var>.<br>
          Write down the coordinates of <var>P'</var>: ( <span class="dots-line" style="min-width:50px;"></span> , <span class="dots-line" style="min-width:50px;"></span> ) <span class="marks-bracket">[2]</span>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Point <var>P'</var> is then translated by the vector <span class="math"><span class="frac"><span class="top">&minus;3</span><span class="bottom">4</span></span></span> to give point <var>P''</var>.<br>
          Write down the coordinates of <var>P''</var>: ( <span class="dots-line" style="min-width:50px;"></span> , <span class="dots-line" style="min-width:50px;"></span> ) <span class="marks-bracket">[2]</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Q10 -->
  <div class="question-block">
    <span class="q-num">10</span>
    <div class="q-body">
      Two fair 4-sided spinners, each numbered 1, 2, 3, and 4, are spun together. The two numbers are added to obtain a total score.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          State the total number of possible outcomes in the sample space: <span class="dots-line"></span> <span class="marks-bracket">[1]</span>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Calculate the probability of obtaining a total score of <strong>5</strong>. Give your answer as a simplified fraction.
          <div class="working-space"></div>
          <div class="answer-line-row">Probability = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(c)</span>
        <div class="part-content">
          State the most likely total score: <span class="dots-line"></span> <span class="marks-bracket">[1]</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Q11 -->
  <div class="question-block">
    <span class="q-num">11</span>
    <div class="q-body">
      The formula for the final speed of an accelerating sports car is given by:
      <div style="text-align:center; font-weight:bold; margin:4px 0;"><span class="math"><var>v</var> = <var>u</var> + <var>at</var></span></div>
      Given that <span class="math"><var>v</var> = 29</span>, <span class="math"><var>u</var> = 5</span>, and <span class="math"><var>a</var> = 4</span>, calculate the value of time <var>t</var>.
      <div class="working-space"></div>
      <div class="answer-line-row"><var>t</var> = <span class="dots-line"></span> <span class="marks-bracket">[3]</span></div>
    </div>
  </div>

  <!-- Q12 -->
  <div class="question-block">
    <span class="q-num">12</span>
    <div class="q-body">
      A right-angled triangular prism has a base of <span class="math">3 cm</span>, a height of <span class="math">4 cm</span>, a hypotenuse of <span class="math">5 cm</span>, and a length of <span class="math">10 cm</span>.<br>
      Calculate the volume of the prism.
      <div class="working-space"></div>
      <div class="answer-line-row">Volume = <span class="dots-line"></span> cm<sup>3</sup> <span class="marks-bracket">[2]</span></div>
    </div>
  </div>

  <div class="footer-copyright">
    <span>&copy; Cambridge Assessment International Education &bull; Stage 7 Mock Paper 2</span>
    <span>Kainos Cambridge School, Vanderbijlpark &bull; Total Marks: 45</span>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(EXAM_DIR, 'Cambridge_Stage7_Mathematics_Mock_Paper2_Calculator.html'), s7m2Html, 'utf8');

// ==============================================================
// MOCK 2 MARK SCHEME & MEMO
// ==============================================================
const s7m2MemoHtml = getHead('Cambridge Stage 7 Mock Paper 2 - Mark Scheme & Memo') + `
<div class="memo-container">
  <div class="print-btn-bar no-print" onclick="window.print()">
    🖨️ Click Here to Print or Save this Mark Scheme / Memo as PDF
  </div>

  <div class="header-memo">
    <div class="title-memo">Cambridge Stage 7 Mock Examination &bull; Paper 2</div>
    <div class="sub-memo">Mark Scheme &amp; Pedagogical Memorandum &bull; Calculator Permitted &bull; Maximum Mark: 45</div>
  </div>

  <div class="rubric-info-box">
    <strong>Cambridge Rubric:</strong> M = Method mark &bull; A = Accuracy mark &bull; B = Independent mark &bull; ft = Follow-through.
  </div>

  <table class="memo-table">
    <thead>
      <tr><th class="col-q">Q</th><th class="col-ans">Official Marking Key</th><th class="col-marks">Marks</th><th class="col-notes">Guidance &amp; Marking Breakdown</th></tr>
    </thead>
    <tbody>
      <tr>
        <td class="col-q">1</td>
        <td class="col-ans">17.5</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">Numerator = 103.823 &minus; 11.2 = 92.623. Denominator = 5.28. 92.623 / 5.28 = 17.542... &rArr; 17.5 (3 s.f.).</td>
      </tr>
      <tr>
        <td class="col-q">2</td>
        <td class="col-ans"><var>x</var> = 38</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A2</span></td>
        <td class="col-notes">Cross-multiply: 2(3<var>x</var> &minus; 4) = 5(<var>x</var> + 6) &rArr; 6<var>x</var> &minus; 8 = 5<var>x</var> + 30 &rArr; <var>x</var> = 38.</td>
      </tr>
      <tr>
        <td class="col-q">3</td>
        <td class="col-ans">(a) R900<br>(b) R5900</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span><br><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">(a) (5000 &times; 6 &times; 3) / 100 = R900. (b) 5000 + 900 = R5900.</td>
      </tr>
      <tr>
        <td class="col-q">4</td>
        <td class="col-ans">(a) 2.75 hours<br>(b) 84 km/h</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A2</span></td>
        <td class="col-notes">(a) 45/60 = 0.75 &rArr; 2.75 hours. (b) Speed = 231 / 2.75 = 84 km/h.</td>
      </tr>
      <tr>
        <td class="col-q">5</td>
        <td class="col-ans">74.9 cm<sup>2</sup> (accept 74.87)</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A2</span></td>
        <td class="col-notes">Square = 10 &times; 10 = 100 cm<sup>2</sup>. Semicircle radius = 4 cm. Semicircle area = 0.5 &times; 3.142 &times; 16 = 25.136 cm<sup>2</sup>. 100 &minus; 25.136 = 74.864 &approx; 74.9 cm<sup>2</sup>.</td>
      </tr>
      <tr>
        <td class="col-q">6</td>
        <td class="col-ans">(a) 320°<br>(b) Obtuse</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">(a) 140° + 180° = 320°. (b) 140° is obtuse (between 90° and 180°).</td>
      </tr>
      <tr>
        <td class="col-q">7</td>
        <td class="col-ans">Median B is higher; Group B is more consistent (lower range)</td>
        <td class="col-marks"><span class="mark-badge b-mark">B2</span><br><span class="mark-badge b-mark">B2</span></td>
        <td class="col-notes">Award 2 marks for comparing averages (Group B scored higher on average: median 16 vs 14), and 2 marks for comparing consistency/spread (Group B results were less spread out: range 5 vs 9).</td>
      </tr>
      <tr>
        <td class="col-q">8</td>
        <td class="col-ans">(a) 6 m<br>(b) 1.8 cm</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span><br><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">(a) 12 &times; 50 = 600 cm = 6 m. (b) 0.9 m = 90 cm. 90 / 50 = 1.8 cm.</td>
      </tr>
      <tr>
        <td class="col-q">9</td>
        <td class="col-ans">(a) (2, &minus;5)<br>(b) (&minus;1, &minus;1)</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span><br><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">(a) 180° rotation negates both coords: (&minus;2, 5) &rarr; (2, &minus;5). (b) (2 + &minus;3, &minus;5 + 4) = (&minus;1, &minus;1).</td>
      </tr>
      <tr>
        <td class="col-q">10</td>
        <td class="col-ans">(a) 16<br>(b) <span class="frac"><span class="top">1</span><span class="bottom">4</span></span><br>(c) 5</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge m-mark">M1</span><span class="mark-badge a-mark">A1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">(a) 4 &times; 4 = 16. (b) Combinations for 5: (1,4), (2,3), (3,2), (4,1) = 4 outcomes. 4/16 = 1/4. (c) Most likely score is 5.</td>
      </tr>
      <tr>
        <td class="col-q">11</td>
        <td class="col-ans"><var>t</var> = 6</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">29 = 5 + 4<var>t</var> &rArr; 4<var>t</var> = 24 &rArr; <var>t</var> = 6.</td>
      </tr>
      <tr>
        <td class="col-q">12</td>
        <td class="col-ans">60 cm<sup>3</sup></td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">Triangular cross-section area = 0.5 &times; 3 &times; 4 = 6 cm<sup>2</sup>. Volume = 6 &times; 10 = 60 cm<sup>3</sup>.</td>
      </tr>
    </tbody>
  </table>

  <section class="coaching-section">
    <div class="coaching-title">👨‍🏫 Tutor Pedagogical Coaching Guide for Justin Lamusse</div>
    <div class="coaching-tip-card">
      <h5>1. Time Conversion in Speed Formula (Q4)</h5>
      <p>Never type 2.45 into your calculator for 2 hours 45 minutes! 45 minutes is <span class="math">45 &divide; 60 = 0.75</span> hours. The time is <strong>2.75 hours</strong>.</p>
    </div>
    <div class="coaching-tip-card">
      <h5>2. Statistical Comparison Phrases (Q7)</h5>
      <p>In Cambridge tests, always compare <strong>both</strong> the measure of average (median or mean) AND the measure of spread (range). Use the context of the question.</p>
    </div>
  </section>

  <div class="footer-copyright">
    <span>&copy; Cambridge Assessment International Education &bull; Stage 7 Marking Guide</span>
    <span>Kainos Cambridge School, Vanderbijlpark &bull; Total Marks: 45</span>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(EXAM_DIR, 'Cambridge_Stage7_Mathematics_Mock_Paper2_Calculator.html'), s7m2Html, 'utf8');
fs.writeFileSync(path.join(EXAM_DIR, 'Cambridge_Stage7_Mathematics_Mock_Paper2_MarkScheme_Memo.html'), s7m2MemoHtml, 'utf8');

console.log('Papers 5 & 6 (Mock 1 & Mock 2) and Memos written successfully!');

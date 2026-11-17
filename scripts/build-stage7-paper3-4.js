// scripts/build-stage7-paper3-4.js
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
// 3. MID-YEAR PROGRESSION EXAM (NON-CALCULATOR)
// ==============================================================
const s7myHtml = getHead('Kainos Cambridge School Stage 7 Mid-Year Progression Exam') + `
<div class="exam-container">
  <div class="print-btn-bar no-print" onclick="window.print()">
    🖨️ Click Here to Print or Save this Exam Paper as PDF
  </div>

  <div class="cambridge-header">
    <div class="cambridge-title-row">
      <div>
        <div class="crest-text">Kainos Cambridge School &bull; Vanderbijlpark</div>
        <div class="sub-crest">Mid-Year Mathematics Progression Examination &bull; Grade 7</div>
        <div class="school-crest">Cambridge Lower Secondary Framework &bull; Stage 7</div>
      </div>
      <div class="paper-code-box">
        STAGE 7<br>
        MID-YEAR<br>
        0862 / MY
      </div>
    </div>
  </div>

  <div class="exam-details-title">Mathematics Stage 7 — Mid-Year Progression</div>
  <div class="exam-meta-sub">
    Non-Calculator &bull; Time Allowed: 1 Hour &bull; Total Marks: 45
  </div>

  ${candidateTable()}

  <div class="instructions-box">
    <span class="badge-mode badge-nocalc">NO CALCULATORS ALLOWED</span>
    <h4>Instructions to Candidates:</h4>
    <ul>
      <li>Answer <strong>all</strong> questions in the spaces provided. Show clear working steps.</li>
      <li>Calculators are <strong>NOT</strong> permitted in this mid-year progression paper.</li>
      <li>Method marks may be awarded even if the final calculation has an error.</li>
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
          <span class="math">&minus;8 + (&minus;5)</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
      <div class="q-part">
        <span class="part-label">(b)</span>
        <div class="part-content">
          <span class="math">&minus;15 &minus; (&minus;9)</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
      <div class="q-part">
        <span class="part-label">(c)</span>
        <div class="part-content">
          <span class="math">(&minus;7) &times; (&minus;6)</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
      <div class="q-part">
        <span class="part-label">(d)</span>
        <div class="part-content">
          <span class="math">(&minus;48) &divide; 6</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q2 -->
  <div class="question-block">
    <span class="q-num">2</span>
    <div class="q-body">
      Find the exact value of each of the following:
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content"><span class="math"><span class="radical">&radic;<span class="radicand">81</span></span></span> = <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
      </div>
      <div class="q-part">
        <span class="part-label">(b)</span>
        <div class="part-content"><span class="math"><span class="radical"><sup class="root-deg">3</sup>&radic;<span class="radicand">125</span></span></span> = <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
      </div>
      <div class="q-part">
        <span class="part-label">(c)</span>
        <div class="part-content"><span class="math"><span class="radical">&radic;<span class="radicand">49</span></span> + <span class="radical"><sup class="root-deg">3</sup>&radic;<span class="radicand">64</span></span></span> = <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
      </div>
    </div>
  </div>

  <!-- Q3 -->
  <div class="question-block">
    <span class="q-num">3</span>
    <div class="q-body">
      Work out the following fraction calculations. Give each answer in its simplest form:
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          <span class="math">3<span class="frac"><span class="top">3</span><span class="bottom">4</span></span> &minus; 1<span class="frac"><span class="top">2</span><span class="bottom">3</span></span></span>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          <span class="math"><span class="frac"><span class="top">5</span><span class="bottom">8</span></span> &times; <span class="frac"><span class="top">4</span><span class="bottom">15</span></span></span>
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
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Calculate: <span class="math">0.7 &times; 0.08</span>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Calculate: <span class="math">3.6 &divide; 0.006</span>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Q5 -->
  <div class="question-block">
    <span class="q-num">5</span>
    <div class="q-body">
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Write down <span class="math">120</span> as a product of prime factors in index form.
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line" style="min-width:180px;"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Find the HCF and LCM of <span class="math">30</span> and <span class="math">45</span>.
          <div class="working-space"></div>
          <div class="answer-line-row">HCF = <span class="dots-line"></span> , LCM = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q6 -->
  <div class="question-block">
    <span class="q-num">6</span>
    <div class="q-body">
      Given that <span class="math"><var>a</var> = &minus;3</span>, <span class="math"><var>b</var> = 4</span>, and <span class="math"><var>c</var> = 2</span>, evaluate the expression:
      <div style="text-align:center; font-weight:bold; margin:6px 0;"><span class="math">2<var>a</var><sup>2</sup> &minus; 3<var>b</var> + <var>c</var></span></div>
      <div class="working-space"></div>
      <div class="answer-line-row">Answer: <span class="dots-line"></span> <span class="marks-bracket">[3]</span></div>
    </div>
  </div>

  <!-- Q7 -->
  <div class="question-block">
    <span class="q-num">7</span>
    <div class="q-body">
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Expand and simplify: <span class="math">3(2<var>x</var> &minus; 4) &minus; 2(<var>x</var> &minus; 5)</span>
          <div class="working-space"></div>
          <div class="answer-line-row">Answer: <span class="dots-line" style="min-width:160px;"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Solve the equation: <span class="math">4<var>x</var> &minus; 9 = 23</span>
          <div class="working-space"></div>
          <div class="answer-line-row"><var>x</var> = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q8 -->
  <div class="question-block">
    <span class="q-num">8</span>
    <div class="q-body">
      A sequence begins: <span class="math">5, &nbsp;&nbsp; 12, &nbsp;&nbsp; 19, &nbsp;&nbsp; 26, &nbsp;&nbsp; &hellip;</span>
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
          Determine whether <span class="math">145</span> is a term in this sequence. Show clear working.
          <div class="working-space"></div>
          <div class="answer-line-row">Is 145 a term? <span class="dots-line" style="min-width:80px;"></span> Position = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Q9 -->
  <div class="question-block">
    <span class="q-num">9</span>
    <div class="q-body">
      Four angles meet at a point: <span class="math">110°</span>, <span class="math">85°</span>, <span class="math">90°</span>, and <span class="math"><var>x</var>°</span>.<br>
      Calculate the value of <span class="math"><var>x</var></span>. State the geometric rule used.
      <div class="working-space"></div>
      <div class="answer-line-row"><var>x</var> = <span class="dots-line"></span>° Reason: <span class="dots-line" style="min-width:180px;"></span> <span class="marks-bracket">[3]</span></div>
    </div>
  </div>

  <!-- Q10 -->
  <div class="question-block">
    <span class="q-num">10</span>
    <div class="q-body">
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Share <span class="math">R360</span> in the ratio <span class="math">3 : 4 : 5</span>.
          <div class="working-space"></div>
          <div class="answer-line-row">Shares = R <span class="dots-line"></span> , R <span class="dots-line"></span> , R <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          A pancake recipe for <span class="math">4 people</span> requires <span class="math">250 g</span> of flour.<br>
          How much flour is required for <span class="math">12 people</span>?
          <div class="working-space"></div>
          <div class="answer-line-row">Flour required = <span class="dots-line"></span> g <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q11 -->
  <div class="question-block">
    <span class="q-num">11</span>
    <div class="q-body">
      The two-way table shows the sports chosen by 30 Grade 7 learners at Kainos Cambridge School:
      <table class="center-table">
        <tr><th></th><th>Soccer</th><th>Rugby</th><th>Swimming</th><th>Total</th></tr>
        <tr><th>Boys</th><td>8</td><td>7</td><td>3</td><td>18</td></tr>
        <tr><th>Girls</th><td>4</td><td>2</td><td>6</td><td>12</td></tr>
        <tr><th>Total</th><td>12</td><td>9</td><td>9</td><td>30</td></tr>
      </table>
      A learner is chosen at random. Find the probability that the learner:
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          is a boy who chose Soccer: <span class="dots-line"></span> <span class="marks-bracket">[1]</span>
        </div>
      </div>
      <div class="q-part" style="margin-top:4px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          chose Swimming: <span class="dots-line"></span> <span class="marks-bracket">[1]</span>
        </div>
      </div>
      <div class="q-part" style="margin-top:4px;">
        <span class="part-label">(c)</span>
        <div class="part-content">
          is a girl, given that the sport chosen was Rugby: <span class="dots-line"></span> <span class="marks-bracket">[2]</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Q12 -->
  <div class="question-block">
    <span class="q-num">12</span>
    <div class="q-body">
      A trapezium has parallel sides of length <span class="math">8 cm</span> and <span class="math">14 cm</span>.<br>
      The perpendicular height between the parallel sides is <span class="math">6 cm</span>.<br>
      Calculate the area of the trapezium.
      <div class="working-space large"></div>
      <div class="answer-line-row">Area = <span class="dots-line"></span> cm<sup>2</sup> <span class="marks-bracket">[4]</span></div>
    </div>
  </div>

  <div class="footer-copyright">
    <span>&copy; Kainos Cambridge School &bull; Stage 7 Mid-Year Progression</span>
    <span>Vanderbijlpark &bull; Total Marks: 45</span>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(EXAM_DIR, 'Cambridge_Stage7_Mathematics_MidYear_Paper1_NonCalculator.html'), s7myHtml, 'utf8');

// ==============================================================
// MID-YEAR MARK SCHEME & MEMO
// ==============================================================
const s7myMemoHtml = getHead('Kainos Cambridge School Stage 7 Mid-Year Exam - Mark Scheme & Memo') + `
<div class="memo-container">
  <div class="print-btn-bar no-print" onclick="window.print()">
    🖨️ Click Here to Print or Save this Mark Scheme / Memo as PDF
  </div>

  <div class="header-memo">
    <div class="title-memo">Kainos Cambridge School &bull; Vanderbijlpark</div>
    <div class="sub-memo">Stage 7 Mid-Year Examination Mark Scheme &amp; Memo &bull; Paper 1 (Non-Calculator) &bull; Maximum Mark: 45</div>
  </div>

  <div class="rubric-info-box">
    <strong>Marking Rubric:</strong> M = Method mark &bull; A = Accuracy mark &bull; B = Independent mark &bull; ft = Follow-through.
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
        <td class="col-ans">&minus;13</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Two negative integers added become more negative: &minus;8 &minus; 5 = &minus;13.</td>
      </tr>
      <tr>
        <td class="col-q">1 (b)</td>
        <td class="col-ans">&minus;6</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">&minus;15 &minus; (&minus;9) = &minus;15 + 9 = &minus;6.</td>
      </tr>
      <tr>
        <td class="col-q">1 (c)</td>
        <td class="col-ans">42</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Negative &times; negative = positive 42.</td>
      </tr>
      <tr>
        <td class="col-q">1 (d)</td>
        <td class="col-ans">&minus;8</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">Negative &divide; positive = negative 8.</td>
      </tr>
      <tr>
        <td class="col-q">2</td>
        <td class="col-ans">(a) 9<br>(b) 5<br>(c) 11</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">(a) 9 &bull; (b) 5 &bull; (c) 7 + 4 = 11.</td>
      </tr>
      <tr>
        <td class="col-q">3 (a)</td>
        <td class="col-ans">2<span class="frac"><span class="top">1</span><span class="bottom">12</span></span> (or <span class="frac"><span class="top">25</span><span class="bottom">12</span></span>)</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Convert to common denominator 12: 45/12 &minus; 20/12 = 25/12.<br>
          <strong>A1:</strong> 2 1/12 or 25/12.
        </td>
      </tr>
      <tr>
        <td class="col-q">3 (b)</td>
        <td class="col-ans"><span class="frac"><span class="top">1</span><span class="bottom">6</span></span></td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Cancel 5 with 15 (1 and 3) and 4 with 8 (1 and 2): (1 &times; 1)/(2 &times; 3).<br>
          <strong>A1:</strong> 1/6.
        </td>
      </tr>
      <tr>
        <td class="col-q">4 (a)</td>
        <td class="col-ans">0.056</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">7 &times; 8 = 56, with three decimal places: 0.056.</td>
      </tr>
      <tr>
        <td class="col-q">4 (b)</td>
        <td class="col-ans">600</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Multiply numerator and denominator by 1000: 3600 &divide; 6.<br>
          <strong>A1:</strong> 600.
        </td>
      </tr>
      <tr>
        <td class="col-q">5 (a)</td>
        <td class="col-ans">2<sup>3</sup> &times; 3 &times; 5</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Correct prime factors 2, 2, 2, 3, 5.<br>
          <strong>A1:</strong> 2<sup>3</sup> &times; 3 &times; 5.
        </td>
      </tr>
      <tr>
        <td class="col-q">5 (b)</td>
        <td class="col-ans">HCF = 15<br>LCM = 90</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">HCF = 15, LCM = 90.</td>
      </tr>
      <tr>
        <td class="col-q">6</td>
        <td class="col-ans">8</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> (&minus;3)<sup>2</sup> = +9.<br>
          <strong>M1:</strong> 2(9) &minus; 3(4) + 2 = 18 &minus; 12 + 2.<br>
          <strong>A1:</strong> 8.
        </td>
      </tr>
      <tr>
        <td class="col-q">7 (a)</td>
        <td class="col-ans">4<var>x</var> &minus; 2</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> 6<var>x</var> &minus; 12 &minus; 2<var>x</var> + 10.<br>
          <strong>A1:</strong> 4<var>x</var> &minus; 2.
        </td>
      </tr>
      <tr>
        <td class="col-q">7 (b)</td>
        <td class="col-ans"><var>x</var> = 8</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> 4<var>x</var> = 32.<br>
          <strong>A1:</strong> <var>x</var> = 8.
        </td>
      </tr>
      <tr>
        <td class="col-q">8 (a)</td>
        <td class="col-ans">7<var>n</var> &minus; 2</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Common difference 7 &rArr; 7<var>n</var>.<br>
          <strong>A1:</strong> 7<var>n</var> &minus; 2 (since 7(1) &minus; 2 = 5).
        </td>
      </tr>
      <tr>
        <td class="col-q">8 (b)</td>
        <td class="col-ans">Yes, 21st term</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Set equation: 7<var>n</var> &minus; 2 = 145 &rArr; 7<var>n</var> = 147.<br>
          <strong>A1:</strong> <var>n</var> = 21 (integer result confirms yes).
        </td>
      </tr>
      <tr>
        <td class="col-q">9</td>
        <td class="col-ans"><var>x</var> = 75°</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> 110 + 85 + 90 = 285°.<br>
          <strong>A1:</strong> 360 &minus; 285 = 75°.<br>
          <strong>B1:</strong> Reason: "Angles around a point add up to 360°".
        </td>
      </tr>
      <tr>
        <td class="col-q">10 (a)</td>
        <td class="col-ans">R90, R120, R150</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> 3 + 4 + 5 = 12 parts. R360 &divide; 12 = R30.<br>
          <strong>A1:</strong> R90, R120, R150.
        </td>
      </tr>
      <tr>
        <td class="col-q">10 (b)</td>
        <td class="col-ans">750 g</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Scale factor = 12 &divide; 4 = 3.<br>
          <strong>A1:</strong> 250 &times; 3 = 750 g.
        </td>
      </tr>
      <tr>
        <td class="col-q">11</td>
        <td class="col-ans">(a) <span class="frac"><span class="top">8</span><span class="bottom">30</span></span> (or <span class="frac"><span class="top">4</span><span class="bottom">15</span></span>)<br>(b) <span class="frac"><span class="top">9</span><span class="bottom">30</span></span> (or <span class="frac"><span class="top">3</span><span class="bottom">10</span></span>)<br>(c) <span class="frac"><span class="top">2</span><span class="bottom">9</span></span></td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          (a) 8/30.<br>
          (b) 9/30 = 3/10.<br>
          (c) Restricted to rugby row/col: 2 girls out of 9 total rugby players = 2/9.
        </td>
      </tr>
      <tr>
        <td class="col-q">12</td>
        <td class="col-ans">66 cm<sup>2</sup></td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A2</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Formula: Area = 1/2 &times; (<var>a</var> + <var>b</var>) &times; <var>h</var>.<br>
          <strong>M1:</strong> 1/2 &times; (8 + 14) &times; 6.<br>
          <strong>A2:</strong> 1/2 &times; 22 &times; 6 = 11 &times; 6 = 66 cm<sup>2</sup>.
        </td>
      </tr>
    </tbody>
  </table>

  <section class="coaching-section">
    <div class="coaching-title">👨‍🏫 Tutor Pedagogical Coaching Guide for Justin Lamusse</div>
    <div class="coaching-tip-card">
      <h5>1. Double Negatives in Algebraic Substitution (Q6)</h5>
      <p>Coach Justin to evaluate exponents first: <span class="math">(&minus;3)<sup>2</sup> = +9</span> because a negative times a negative is positive! Common trap is calculating <span class="math">&minus;3<sup>2</sup> = &minus;9</span>.</p>
    </div>
    <div class="coaching-tip-card">
      <h5>2. Negative Sign Expansion Trap (Q7a)</h5>
      <p>Watch out for <span class="math">&minus;2(<var>x</var> &minus; 5)</span>. Expanding gives <span class="math">&minus;2<var>x</var> + 10</span> (not &minus;10). Remind Justin that the minus sign outside the bracket flips all signs inside!</p>
    </div>
    <div class="coaching-tip-card">
      <h5>3. Area of a Trapezium (Q12)</h5>
      <p>Use the verbal mantra: <em>"Add the parallel tracks, halve the answer, and multiply by the height."</em> Drawing the two parallel lines in green helps visual learners avoid using slant side lengths.</p>
    </div>
  </section>

  <div class="footer-copyright">
    <span>&copy; Kainos Cambridge School &bull; Stage 7 Marking Guide</span>
    <span>Vanderbijlpark &bull; Total Marks: 45</span>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(EXAM_DIR, 'Cambridge_Stage7_Mathematics_MidYear_MarkScheme_Memo.html'), s7myMemoHtml, 'utf8');

// ==============================================================
// 4. END-OF-YEAR COMPREHENSIVE EXAM (CALCULATOR PERMITTED)
// ==============================================================
const s7eyHtml = getHead('Kainos Cambridge School Stage 7 End-of-Year Final Examination') + `
<div class="exam-container">
  <div class="print-btn-bar no-print" onclick="window.print()">
    🖨️ Click Here to Print or Save this Exam Paper as PDF
  </div>

  <div class="cambridge-header">
    <div class="cambridge-title-row">
      <div>
        <div class="crest-text">Kainos Cambridge School &bull; Vanderbijlpark</div>
        <div class="sub-crest">End-of-Year Mathematics Final Examination &bull; Grade 7</div>
        <div class="school-crest">Cambridge Lower Secondary Framework &bull; Stage 7</div>
      </div>
      <div class="paper-code-box">
        STAGE 7<br>
        FINAL EXAM<br>
        0862 / EY
      </div>
    </div>
  </div>

  <div class="exam-details-title">Mathematics Stage 7 — End-of-Year Examination</div>
  <div class="exam-meta-sub">
    Calculator Permitted &bull; Time Allowed: 1 Hour &bull; Total Marks: 45
  </div>

  ${candidateTable()}

  <div class="instructions-box">
    <span class="badge-mode badge-calc">CALCULATOR PERMITTED</span>
    <h4>Instructions to Candidates:</h4>
    <ul>
      <li>Answer <strong>all</strong> questions in the spaces provided.</li>
      <li>Show all necessary working steps. A scientific calculator may be used.</li>
      <li>Give non-exact answers correct to 3 significant figures, or 1 decimal place for angles in degrees, unless a different accuracy is specified in the question.</li>
      <li>The total number of marks for this paper is <strong>45</strong>.</li>
    </ul>
  </div>

  <!-- Q1 -->
  <div class="question-block">
    <span class="q-num">1</span>
    <div class="q-body">
      Use a calculator to evaluate:
      <div style="text-align:center; font-weight:bold; margin:6px 0;">
        <span class="math"><span class="frac"><span class="top"><span class="radical">&radic;<span class="radicand">38.44</span></span> + 5.2<sup>2</sup></span><span class="bottom">1.8 &times; 2.5</span></span></span>
      </div>
      Write down your full calculator display, and then round your final answer to <strong>2 decimal places</strong>.
      <div class="working-space"></div>
      <div class="answer-line-row">Full display: <span class="dots-line" style="min-width:160px;"></span> Rounded: <span class="dots-line"></span> <span class="marks-bracket">[3]</span></div>
    </div>
  </div>

  <!-- Q2 -->
  <div class="question-block">
    <span class="q-num">2</span>
    <div class="q-body">
      Justin's smartphone battery life drops from <span class="math">85 hours</span> on standby to <span class="math">68 hours</span> when Bluetooth is active.<br>
      Calculate the <strong>percentage decrease</strong> in battery life.
      <div class="working-space"></div>
      <div class="answer-line-row">Percentage Decrease = <span class="dots-line"></span> % <span class="marks-bracket">[3]</span></div>
    </div>
  </div>

  <!-- Q3 -->
  <div class="question-block">
    <span class="q-num">3</span>
    <div class="q-body">
      The foreign exchange rate between South African Rand (ZAR) and US Dollars (USD) is:
      <div style="text-align:center; font-weight:bold; margin:4px 0;"><span class="math">1 USD = R18.50</span></div>
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          A study laptop costs <span class="math">$450 USD</span>. Calculate its price in South African Rand.
          <div class="working-space"></div>
          <div class="answer-line-row">Price = R <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Justin has saved <span class="math">R1110</span> in South Africa. How many US Dollars can he purchase?
          <div class="working-space"></div>
          <div class="answer-line-row">Amount = $ <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Q4 -->
  <div class="question-block">
    <span class="q-num">4</span>
    <div class="q-body">
      A cardboard packaging carton has dimensions <span class="math">25 cm &times; 18 cm &times; 12 cm</span>.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Calculate the volume of the carton in <span class="math">cm<sup>3</sup></span>.
          <div class="working-space"></div>
          <div class="answer-line-row">Volume = <span class="dots-line"></span> cm<sup>3</sup> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Calculate the total surface area of the carton in <span class="math">cm<sup>2</sup></span>.
          <div class="working-space"></div>
          <div class="answer-line-row">Total Surface Area = <span class="dots-line"></span> cm<sup>2</sup> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q5 -->
  <div class="question-block">
    <span class="q-num">5</span>
    <div class="q-body">
      The formula for the sum of the interior angles of an <var>n</var>-sided polygon is <span class="math">(<var>n</var> &minus; 2) &times; 180°</span>.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Calculate the interior angle of a <strong>regular pentagon</strong> (5 sides).
          <div class="working-space"></div>
          <div class="answer-line-row">Interior angle = <span class="dots-line"></span>° <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Calculate the interior angle of a <strong>regular hexagon</strong> (6 sides).
          <div class="working-space"></div>
          <div class="answer-line-row">Interior angle = <span class="dots-line"></span>° <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q6 -->
  <div class="question-block">
    <span class="q-num">6</span>
    <div class="q-body">
      A straight line graph has the equation <span class="math"><var>y</var> = 2<var>x</var> &minus; 3</span>.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Complete the table of values for <span class="math"><var>y</var> = 2<var>x</var> &minus; 3</span>:
          <table class="center-table">
            <tr><th><var>x</var></th><td>&minus;2</td><td>&minus;1</td><td>0</td><td>1</td><td>2</td><td>3</td></tr>
            <tr><th><var>y</var></th><td>&minus;7</td><td></td><td>&minus;3</td><td>&minus;1</td><td></td><td>3</td></tr>
          </table>
          <div class="answer-line-row">Missing values filled <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Write down the <strong>gradient</strong> and the <strong><var>y</var>-intercept</strong> of this line.
          <div class="answer-line-row">Gradient = <span class="dots-line"></span> , <var>y</var>-intercept = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Q7 -->
  <div class="question-block">
    <span class="q-num">7</span>
    <div class="q-body">
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Solve the equation: <span class="math">6<var>x</var> + 7 = 2<var>x</var> + 31</span>
          <div class="working-space"></div>
          <div class="answer-line-row"><var>x</var> = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Solve the equation with brackets: <span class="math">4(<var>x</var> + 2) = 3(2<var>x</var> &minus; 1)</span>
          <div class="working-space"></div>
          <div class="answer-line-row"><var>x</var> = <span class="dots-line"></span> <span class="marks-bracket">[3]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q8 -->
  <div class="question-block">
    <span class="q-num">8</span>
    <div class="q-body">
      A circular garden flowerbed has a diameter of <span class="math">14 m</span>. Use <span class="math">&pi; = 3.142</span> (or your calculator &pi; key).
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          Calculate the circumference of the flowerbed.
          <div class="working-space"></div>
          <div class="answer-line-row">Circumference = <span class="dots-line"></span> m <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:8px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Calculate the area of the flowerbed.
          <div class="working-space"></div>
          <div class="answer-line-row">Area = <span class="dots-line"></span> m<sup>2</sup> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Q9 -->
  <div class="question-block">
    <span class="q-num">9</span>
    <div class="q-body">
      The stem-and-leaf diagram shows the test scores out of 100 for 15 Grade 7 learners:
      <div style="font-family:monospace; font-size:11pt; margin:8px 0; padding:8px 16px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; display:inline-block;">
        5 | 2 &nbsp; 4 &nbsp; 8<br>
        6 | 1 &nbsp; 3 &nbsp; 5 &nbsp; 9<br>
        7 | 0 &nbsp; 2 &nbsp; 2 &nbsp; 6 &nbsp; 8<br>
        8 | 4 &nbsp; 7<br>
        9 | 1<br>
        <span style="font-size:9pt; font-family:Arial, sans-serif;"><strong>Key:</strong> 5 | 2 means 52 marks</span>
      </div>
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">Find the <strong>median score</strong>: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
      </div>
      <div class="q-part" style="margin-top:4px;">
        <span class="part-label">(b)</span>
        <div class="part-content">Find the <strong>modal score</strong>: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
      </div>
      <div class="q-part" style="margin-top:4px;">
        <span class="part-label">(c)</span>
        <div class="part-content">Calculate the <strong>range</strong> of the scores: <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
      </div>
    </div>
  </div>

  <!-- Q10 -->
  <div class="question-block">
    <span class="q-num">10</span>
    <div class="q-body">
      A hiking trail leads from Base Camp <var>A</var> to Lookout Point <var>B</var> on a three-figure bearing of <span class="math">065°</span>.<br>
      Calculate the back-bearing from Lookout Point <var>B</var> to Base Camp <var>A</var>.
      <div class="working-space"></div>
      <div class="answer-line-row">Bearing = <span class="dots-line"></span>° <span class="marks-bracket">[2]</span></div>
    </div>
  </div>

  <!-- Q11 -->
  <div class="question-block">
    <span class="q-num">11</span>
    <div class="q-body">
      Justin rolls a fair standard 6-sided die and flips a fair coin.
      <div class="q-part">
        <span class="part-label">(a)</span>
        <div class="part-content">
          State the total number of possible combined outcomes.
          <div class="answer-line-row">Outcomes = <span class="dots-line"></span> <span class="marks-bracket">[1]</span></div>
        </div>
      </div>
      <div class="q-part" style="margin-top:6px;">
        <span class="part-label">(b)</span>
        <div class="part-content">
          Calculate the probability of rolling a <strong>prime number</strong> and getting <strong>Heads</strong>. Give your answer as a simplified fraction.
          <div class="working-space"></div>
          <div class="answer-line-row">Probability = <span class="dots-line"></span> <span class="marks-bracket">[2]</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-copyright">
    <span>&copy; Kainos Cambridge School &bull; Stage 7 End-of-Year Final Examination</span>
    <span>Vanderbijlpark &bull; Total Marks: 45</span>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(EXAM_DIR, 'Cambridge_Stage7_Mathematics_EndOfYear_Paper2_Calculator.html'), s7eyHtml, 'utf8');

// ==============================================================
// END-OF-YEAR MARK SCHEME & MEMO
// ==============================================================
const s7eyMemoHtml = getHead('Kainos Cambridge School Stage 7 End-of-Year Exam - Mark Scheme & Memo') + `
<div class="memo-container">
  <div class="print-btn-bar no-print" onclick="window.print()">
    🖨️ Click Here to Print or Save this Mark Scheme / Memo as PDF
  </div>

  <div class="header-memo">
    <div class="title-memo">Kainos Cambridge School &bull; Vanderbijlpark</div>
    <div class="sub-memo">Stage 7 End-of-Year Final Examination Mark Scheme &amp; Memo &bull; Paper 2 (Calculator Permitted) &bull; Maximum Mark: 45</div>
  </div>

  <div class="rubric-info-box">
    <strong>Marking Rubric:</strong> M = Method mark &bull; A = Accuracy mark &bull; B = Independent mark &bull; ft = Follow-through.
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
        <td class="col-q">1</td>
        <td class="col-ans">7.39 (display: 7.38666...)</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Numerator: &radic;38.44 + 5.2<sup>2</sup> = 6.2 + 27.04 = 33.24.<br>
          <strong>M1:</strong> Denominator: 1.8 &times; 2.5 = 4.5. 33.24 &divide; 4.5 = 7.38666...<br>
          <strong>A1:</strong> 7.39 correct to 2 decimal places.
        </td>
      </tr>
      <tr>
        <td class="col-q">2</td>
        <td class="col-ans">20%</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Decrease = 85 &minus; 68 = 17 hours.<br>
          <strong>M1:</strong> (17 &divide; 85) &times; 100.<br>
          <strong>A1:</strong> Exactly 20%.
        </td>
      </tr>
      <tr>
        <td class="col-q">3 (a)</td>
        <td class="col-ans">R8325</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> 450 &times; 18.50.<br>
          <strong>A1:</strong> R8325.
        </td>
      </tr>
      <tr>
        <td class="col-q">3 (b)</td>
        <td class="col-ans">$60 USD</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> 1110 &divide; 18.50.<br>
          <strong>A1:</strong> $60 USD.
        </td>
      </tr>
      <tr>
        <td class="col-q">4 (a)</td>
        <td class="col-ans">5400 cm<sup>3</sup></td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> 25 &times; 18 &times; 12.<br>
          <strong>A1:</strong> 5400 cm<sup>3</sup>.
        </td>
      </tr>
      <tr>
        <td class="col-q">4 (b)</td>
        <td class="col-ans">1932 cm<sup>2</sup></td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> 2(25 &times; 18 + 25 &times; 12 + 18 &times; 12) = 2(450 + 300 + 216) = 2(966).<br>
          <strong>A1:</strong> 1932 cm<sup>2</sup>.
        </td>
      </tr>
      <tr>
        <td class="col-q">5 (a)</td>
        <td class="col-ans">108°</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Sum = (5 &minus; 2) &times; 180 = 540°.<br>
          <strong>A1:</strong> 540 &divide; 5 = 108°.
        </td>
      </tr>
      <tr>
        <td class="col-q">5 (b)</td>
        <td class="col-ans">120°</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Sum = (6 &minus; 2) &times; 180 = 720°.<br>
          <strong>A1:</strong> 720 &divide; 6 = 120°.
        </td>
      </tr>
      <tr>
        <td class="col-q">6 (a)</td>
        <td class="col-ans">Missing: &minus;5, +1</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">When <var>x</var> = &minus;1: 2(&minus;1) &minus; 3 = &minus;5. When <var>x</var> = 2: 2(2) &minus; 3 = 1.</td>
      </tr>
      <tr>
        <td class="col-q">6 (b)</td>
        <td class="col-ans">Gradient = 2<br><var>y</var>-intercept = &minus;3</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">From <var>y</var> = <var>mx</var> + <var>c</var>: <var>m</var> = 2, <var>c</var> = &minus;3 (or (0, &minus;3)).</td>
      </tr>
      <tr>
        <td class="col-q">7 (a)</td>
        <td class="col-ans"><var>x</var> = 6</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> 6<var>x</var> &minus; 2<var>x</var> = 31 &minus; 7 &rArr; 4<var>x</var> = 24.<br>
          <strong>A1:</strong> <var>x</var> = 6.
        </td>
      </tr>
      <tr>
        <td class="col-q">7 (b)</td>
        <td class="col-ans"><var>x</var> = 5.5 (or <span class="frac"><span class="top">11</span><span class="bottom">2</span></span>)</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Expand: 4<var>x</var> + 8 = 6<var>x</var> &minus; 3.<br>
          <strong>M1:</strong> Rearrange: 8 + 3 = 6<var>x</var> &minus; 4<var>x</var> &rArr; 2<var>x</var> = 11.<br>
          <strong>A1:</strong> <var>x</var> = 5.5.
        </td>
      </tr>
      <tr>
        <td class="col-q">8 (a)</td>
        <td class="col-ans">44.0 m (accept 43.99)</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Circumference = &pi;<var>d</var> = 3.142 &times; 14.<br>
          <strong>A1:</strong> 43.99 m &approx; 44.0 m.
        </td>
      </tr>
      <tr>
        <td class="col-q">8 (b)</td>
        <td class="col-ans">154.0 m<sup>2</sup> (accept 153.96)</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Radius = 14 &divide; 2 = 7 m. Area = &pi;<var>r</var><sup>2</sup> = 3.142 &times; 7<sup>2</sup> = 3.142 &times; 49.<br>
          <strong>A1:</strong> 153.96 m<sup>2</sup> &approx; 154.0 m<sup>2</sup>.
        </td>
      </tr>
      <tr>
        <td class="col-q">9</td>
        <td class="col-ans">(a) 72<br>(b) 72<br>(c) 39</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span><br><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">
          (a) Median (8th value) = 72.<br>
          (b) Mode (appears twice) = 72.<br>
          (c) Range = 91 &minus; 52 = 39.
        </td>
      </tr>
      <tr>
        <td class="col-q">10</td>
        <td class="col-ans">245°</td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Back-bearing = 65° + 180°.<br>
          <strong>A1:</strong> 245°.
        </td>
      </tr>
      <tr>
        <td class="col-q">11 (a)</td>
        <td class="col-ans">12</td>
        <td class="col-marks"><span class="mark-badge b-mark">B1</span></td>
        <td class="col-notes">6 faces &times; 2 coin sides = 12 outcomes.</td>
      </tr>
      <tr>
        <td class="col-q">11 (b)</td>
        <td class="col-ans"><span class="frac"><span class="top">1</span><span class="bottom">4</span></span></td>
        <td class="col-marks"><span class="mark-badge m-mark">M1</span><br><span class="mark-badge a-mark">A1</span></td>
        <td class="col-notes">
          <strong>M1:</strong> Primes on die: {2, 3, 5} &rArr; P(prime) = 3/6 = 1/2. P(Heads) = 1/2. Independent: 1/2 &times; 1/2.<br>
          <strong>A1:</strong> 1/4.
        </td>
      </tr>
    </tbody>
  </table>

  <section class="coaching-section">
    <div class="coaching-title">👨‍🏫 Tutor Pedagogical Coaching Guide for Justin Lamusse</div>
    <div class="coaching-tip-card">
      <h5>1. Diameter vs Radius Trap in Circle Calculations (Q8)</h5>
      <p>The #1 Cambridge exam error is using diameter instead of radius in the area formula! Emphasize: Always write down <span class="math"><var>r</var> = <var>d</var> &divide; 2 = 7 cm</span> immediately upon reading the word diameter.</p>
    </div>
    <div class="coaching-tip-card">
      <h5>2. Back-Bearings Calculation (Q10)</h5>
      <p>If forward bearing is &lt; 180°, add 180°: <span class="math">65° + 180° = 245°</span>. If forward bearing is &gt; 180°, subtract 180°. Always draw parallel North arrows at both points.</p>
    </div>
    <div class="coaching-tip-card">
      <h5>3. Identifying Prime Numbers (Q11b)</h5>
      <p>Remind Justin: <strong>1 is NOT a prime number</strong>! The primes on a standard 6-sided die are 2, 3, and 5 (3 primes out of 6). 2 is the only even prime.</p>
    </div>
  </section>

  <div class="footer-copyright">
    <span>&copy; Kainos Cambridge School &bull; Stage 7 Final Marking Guide</span>
    <span>Vanderbijlpark &bull; Total Marks: 45</span>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(EXAM_DIR, 'Cambridge_Stage7_Mathematics_EndOfYear_MarkScheme_Memo.html'), s7eyMemoHtml, 'utf8');

console.log('Papers 3 & 4 (Mid-Year & End-of-Year) and Memos written successfully!');

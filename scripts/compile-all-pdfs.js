// scripts/compile-all-pdfs.js
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const EXAM_DIR = path.resolve(__dirname, '../cambridge-stage7-exams');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const files = [
  // Paper 1 & Memo
  'Cambridge_Stage7_Mathematics_Paper1_NonCalculator',
  'Cambridge_Stage7_Mathematics_Paper1_MarkScheme_Memo',
  // Paper 2 & Memo
  'Cambridge_Stage7_Mathematics_Paper2_Calculator',
  'Cambridge_Stage7_Mathematics_Paper2_MarkScheme_Memo',
  // Mid-Year & Memo
  'Cambridge_Stage7_Mathematics_MidYear_Paper1_NonCalculator',
  'Cambridge_Stage7_Mathematics_MidYear_MarkScheme_Memo',
  // End-of-Year & Memo
  'Cambridge_Stage7_Mathematics_EndOfYear_Paper2_Calculator',
  'Cambridge_Stage7_Mathematics_EndOfYear_MarkScheme_Memo',
  // Mock 1 & Memo
  'Cambridge_Stage7_Mathematics_Mock_Paper1_NonCalculator',
  'Cambridge_Stage7_Mathematics_Mock_Paper1_MarkScheme_Memo',
  // Mock 2 & Memo
  'Cambridge_Stage7_Mathematics_Mock_Paper2_Calculator',
  'Cambridge_Stage7_Mathematics_Mock_Paper2_MarkScheme_Memo'
];

console.log(`Starting compilation of ${files.length} Cambridge Stage 7 PDFs...`);

for (const base of files) {
  const htmlPath = path.join(EXAM_DIR, `${base}.html`);
  const pdfPath = path.join(EXAM_DIR, `${base}.pdf`);

  if (!fs.existsSync(htmlPath)) {
    console.error(`ERROR: Missing ${htmlPath}`);
    process.exit(1);
  }

  console.log(`Compiling: ${base}.pdf ...`);
  cp.execFileSync(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--allow-file-access-from-files',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`,
    htmlPath
  ]);

  if (!fs.existsSync(pdfPath)) {
    console.error(`FAILED to create ${pdfPath}`);
    process.exit(1);
  }

  const stat = fs.statSync(pdfPath);
  console.log(`  -> SUCCESS: ${base}.pdf (${stat.size} bytes)`);
}

console.log('All 12 PDFs compiled successfully!');

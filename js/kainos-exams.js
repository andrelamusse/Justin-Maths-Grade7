// js/kainos-exams.js - Kainos Cambridge School Assessment & Past Papers Hub
// Tailored for Justin Lamusse at Kainos Cambridge School, Vanderbijlpark.
// Connects to printable past papers & interactive test simulation.

export const KAINOS_PAPERS_CATALOG = [
  {
    id: 'stage7-p1',
    code: '0862/01',
    title: 'Cambridge Stage 7 Mathematics — Paper 1',
    mode: 'Non-Calculator',
    calculatorAllowed: false,
    durationMinutes: 60,
    totalMarks: 45,
    description: 'Cambridge Lower Secondary Progression Test Stage 7 (Paper 1 Non-Calculator). Focuses on mental arithmetic, negative numbers, fractions, linear equations, and angle geometry.',
    pdfUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper1_NonCalculator.pdf',
    htmlUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper1_NonCalculator.html',
    memoPdfUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper1_MarkScheme_Memo.pdf',
    memoHtmlUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper1_MarkScheme_Memo.html',
    sampleQuestions: [
      {
        id: 's7p1-q1',
        num: 1,
        part: '(a)',
        q: 'Work out: \\(-7 + 12\\)',
        marks: 1,
        options: ['5', '-5', '19', '-19'],
        answer: '5',
        memo: 'Award 1 mark for correct integer answer 5.',
        tutorTip: 'Start at -7 on the thermometer. Add 12 steps up into the warm zone to reach +5.'
      },
      {
        id: 's7p1-q2',
        num: 1,
        part: '(b)',
        q: 'Calculate: \\(4 \\times (-6)\\)',
        marks: 1,
        options: ['-24', '24', '-10', '10'],
        answer: '-24',
        memo: 'Award 1 mark for -24. Signs are different (+ and -), so answer is negative.',
        tutorTip: 'Remember: positive times negative is always negative.'
      },
      {
        id: 's7p1-q3',
        num: 2,
        part: '',
        q: 'Evaluate using BIDMAS: \\(18 - 3 \\times (4 + 2)\\)',
        marks: 2,
        options: ['0', '90', '6', '12'],
        answer: '0',
        memo: 'Bracket first: (4 + 2) = 6. Multiplication next: 3 × 6 = 18. Finally 18 - 18 = 0.',
        tutorTip: 'Justin, do NOT subtract 18 - 3 first! Brackets and multiplication always come before subtraction!'
      },
      {
        id: 's7p1-q4',
        num: 3,
        part: '',
        q: 'Find the Highest Common Factor (HCF) of 24 and 36.',
        marks: 2,
        options: ['12', '6', '72', '4'],
        answer: '12',
        memo: 'Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. Highest common is 12.',
        tutorTip: 'List factors or use prime factor ladders to find the greatest shared factor.'
      },
      {
        id: 's7p1-q5',
        num: 4,
        part: '',
        q: 'Solve the equation: \\(4x - 7 = 25\\)',
        marks: 2,
        options: ['8', '7', '32', '4.5'],
        answer: '8',
        memo: 'Add 7: 4x = 32. Divide by 4: x = 8.',
        tutorTip: 'Balance model: Add 7 to both sides first, then divide by 4.'
      },
      {
        id: 's7p1-q6',
        num: 5,
        part: '',
        q: 'Calculate: \\(\\frac{3}{5} \\div \\frac{9}{10}\\)',
        marks: 2,
        options: ['\\frac{2}{3}', '\\frac{27}{50}', '\\frac{3}{2}', '\\frac{1}{2}'],
        answer: '\\frac{2}{3}',
        memo: 'Keep-Change-Flip: 3/5 × 10/9 = 30/45 = 2/3.',
        tutorTip: 'Keep the 3/5, change divide to multiply, flip 9/10 to 10/9.'
      }
    ]
  },
  {
    id: 'stage7-p2',
    code: '0862/02',
    title: 'Cambridge Stage 7 Mathematics — Paper 2',
    mode: 'Calculator Permitted',
    calculatorAllowed: true,
    durationMinutes: 60,
    totalMarks: 45,
    description: 'Cambridge Lower Secondary Progression Test Stage 7 (Paper 2 Calculator Allowed). Emphasizes percentage increase/decrease, multi-step problem solving, area/volume, and data interpretation.',
    pdfUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper2_Calculator.pdf',
    htmlUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper2_Calculator.html',
    memoPdfUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper2_MarkScheme_Memo.pdf',
    memoHtmlUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper2_MarkScheme_Memo.html',
    sampleQuestions: [
      {
        id: 's7p2-q1',
        num: 1,
        part: '',
        q: 'A winter jacket at Vaal Mall costs \\(\\text{R } 640\\) and is on sale with a \\(15\\%\\) discount. Calculate the sale price.',
        marks: 2,
        options: ['R 544', 'R 550', 'R 96', 'R 625'],
        answer: 'R 544',
        memo: '15% of 640 = 0.15 × 640 = R 96. Sale price = 640 - 96 = R 544.',
        tutorTip: 'Calculator shortcut: Multiply 640 by 0.85 to find the remaining 85% directly.'
      },
      {
        id: 's7p2-q2',
        num: 2,
        part: '',
        q: 'A fish tank has length \\(50\\text{ cm}\\), width \\(30\\text{ cm}\\), and height \\(40\\text{ cm}\\). Calculate the volume in cubic centimetres (\\(\\text{cm}^3\\)).',
        marks: 2,
        options: ['60 000 cm³', '12 000 cm³', '120 cm³', '6 000 cm³'],
        answer: '60 000 cm³',
        memo: 'V = l × w × h = 50 × 30 × 40 = 60 000 cm³ (which is 60 litres).',
        tutorTip: 'Volume = length × width × height.'
      },
      {
        id: 's7p2-q3',
        num: 3,
        part: '',
        q: 'The mean of 4 numbers is 18. Three of the numbers are 14, 21, and 19. What is the fourth number?',
        marks: 2,
        options: ['18', '16', '20', '15'],
        answer: '18',
        memo: 'Total sum required = 4 × 18 = 72. Sum of known 3 = 14 + 21 + 19 = 54. Fourth number = 72 - 54 = 18.',
        tutorTip: 'Mean times count equals total sum. Find total sum first!'
      }
    ]
  },
  {
    id: 'stage6-p1',
    code: '0845/01',
    title: 'Cambridge Primary Checkpoint Stage 6 — Paper 1',
    mode: 'Diagnostic Bridge (Non-Calculator)',
    calculatorAllowed: false,
    durationMinutes: 45,
    totalMarks: 40,
    description: 'Stage 6 Exit / Grade 7 Entry Diagnostic Benchmark. Verifies automatic mastery of basic number facts, times tables, place value, and 2D shapes.',
    pdfUrl: 'cambridge-stage7-exams/Cambridge_Stage6_Primary_Mathematics_Paper1_NonCalculator.pdf',
    htmlUrl: 'cambridge-stage7-exams/Cambridge_Stage6_Primary_Mathematics_Paper1_NonCalculator.html',
    memoPdfUrl: 'cambridge-stage7-exams/Cambridge_Stage6_Primary_Mathematics_Paper1_MarkScheme_Memo.pdf',
    memoHtmlUrl: 'cambridge-stage7-exams/Cambridge_Stage6_Primary_Mathematics_Paper1_MarkScheme_Memo.html',
    sampleQuestions: [
      {
        id: 's6p1-q1',
        num: 1,
        part: '',
        q: 'Calculate: \\(347 + 589\\)',
        marks: 1,
        options: ['936', '926', '836', '946'],
        answer: '936',
        memo: '347 + 589 = 936 with regrouping.',
        tutorTip: 'Add ones: 7 + 9 = 16 (carry 1). Tens: 4 + 8 + 1 = 13 (carry 1). Hundreds: 3 + 5 + 1 = 9.'
      },
      {
        id: 's6p1-q2',
        num: 2,
        part: '',
        q: 'What is \\(7 \\times 8\\)?',
        marks: 1,
        options: ['56', '54', '48', '64'],
        answer: '56',
        memo: '7 × 8 = 56.',
        tutorTip: 'Rhyme: 5, 6, 7, 8 -> 56 is 7 times 8!'
      }
    ]
  },
  {
    id: 'stage6-p2',
    code: '0845/02',
    title: 'Cambridge Primary Checkpoint Stage 6 — Paper 2',
    mode: 'Diagnostic Bridge (Non-Calculator)',
    calculatorAllowed: false,
    durationMinutes: 45,
    totalMarks: 40,
    description: 'Stage 6 Exit / Grade 7 Entry Diagnostic Benchmark Paper 2. Tests fractions, time, measurements, and word problem reasoning.',
    pdfUrl: 'cambridge-stage7-exams/Cambridge_Stage6_Primary_Mathematics_Paper2_NonCalculator.pdf',
    htmlUrl: 'cambridge-stage7-exams/Cambridge_Stage6_Primary_Mathematics_Paper2_NonCalculator.html',
    memoPdfUrl: 'cambridge-stage7-exams/Cambridge_Stage6_Primary_Mathematics_Paper2_MarkScheme_Memo.pdf',
    memoHtmlUrl: 'cambridge-stage7-exams/Cambridge_Stage6_Primary_Mathematics_Paper2_MarkScheme_Memo.html',
    sampleQuestions: [
      {
        id: 's6p2-q1',
        num: 1,
        part: '',
        q: 'A movie in Vanderbijlpark starts at 14:15 and lasts for 1 hour and 45 minutes. What time does it finish?',
        marks: 1,
        options: ['16:00', '15:60', '16:15', '15:45'],
        answer: '16:00',
        memo: '14:15 + 1h = 15:15. 15:15 + 45 min = 16:00.',
        tutorTip: 'Add the whole hour first, then add the remaining 45 minutes to reach the top of the next hour.'
      }
    ]
  }
];

export class KainosExamSimulator {
  constructor(paperId = 'stage7-p1') {
    this.setPaper(paperId);
    this.currentIndex = 0;
    this.userAnswers = [];
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.isFinished = false;
  }

  setPaper(paperId) {
    this.paper = KAINOS_PAPERS_CATALOG.find(p => p.id === paperId) || KAINOS_PAPERS_CATALOG[0];
    this.questions = this.paper.sampleQuestions || [];
    this.currentIndex = 0;
    this.userAnswers = [];
    this.timerSeconds = this.paper.durationMinutes * 60;
    this.isFinished = false;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex] || null;
  }

  recordAnswer(chosenOption) {
    const q = this.getCurrentQuestion();
    if (!q) return;

    const isCorrect = chosenOption === q.answer;
    this.userAnswers.push({
      questionId: q.id,
      qNum: q.num,
      prompt: q.q,
      chosen: chosenOption,
      correct: q.answer,
      isCorrect,
      marksAwarded: isCorrect ? q.marks : 0,
      maxMarks: q.marks,
      memo: q.memo,
      tutorTip: q.tutorTip
    });

    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      this.isFinished = true;
      if (this.timerInterval) clearInterval(this.timerInterval);
    }
  }

  getResults() {
    const totalPossibleMarks = this.questions.reduce((acc, q) => acc + q.marks, 0);
    const marksScored = this.userAnswers.reduce((acc, a) => acc + a.marksAwarded, 0);
    const percentage = totalPossibleMarks > 0 ? Math.round((marksScored / totalPossibleMarks) * 100) : 0;

    let grade = 'A*';
    if (percentage < 40) grade = 'U (Needs Practice)';
    else if (percentage < 55) grade = 'C (Satisfactory)';
    else if (percentage < 70) grade = 'B (Good Merit)';
    else if (percentage < 85) grade = 'A (Distinction)';
    else grade = 'A* (Outstanding Master)';

    return {
      paperTitle: this.paper.title,
      marksScored,
      totalPossibleMarks,
      percentage,
      grade,
      breakdown: this.userAnswers
    };
  }
}

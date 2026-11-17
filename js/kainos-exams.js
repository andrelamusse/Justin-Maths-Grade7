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
        num: 1,
        part: '(c)',
        q: 'Calculate: \\((-24) \\div (-4)\\)',
        marks: 1,
        options: ['6', '-6', '8', '-8'],
        answer: '6',
        memo: 'Award 1 mark for +6. Two negatives divided make a positive.',
        tutorTip: 'Same signs divided always give a positive result.'
      },
      {
        id: 's7p1-q4',
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
        id: 's7p1-q5',
        num: 3,
        part: '(a)',
        q: 'Write \\(72\\) as a product of its prime factors in index form.',
        marks: 2,
        options: ['2³ × 3²', '2² × 3³', '2⁴ × 3', '8 × 9'],
        answer: '2³ × 3²',
        memo: '72 = 8 × 9 = 2 × 2 × 2 × 3 × 3 = 2³ × 3².',
        tutorTip: 'Index form means using exponents (powers). 8 is 2 cubed and 9 is 3 squared.'
      },
      {
        id: 's7p1-q6',
        num: 3,
        part: '(b)',
        q: 'Find the Highest Common Factor (HCF) of 24 and 36.',
        marks: 2,
        options: ['12', '6', '72', '4'],
        answer: '12',
        memo: 'Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. Highest common is 12.',
        tutorTip: 'List factors or use prime factor ladders to find the greatest shared factor.'
      },
      {
        id: 's7p1-q7',
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
        id: 's7p1-q8',
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
      },
      {
        id: 's7p2-q4',
        num: 4,
        part: '',
        q: 'Share \\(\\text{R } 350\\) in the ratio \\(3 : 4\\). How much is the larger share?',
        marks: 2,
        options: ['R 200', 'R 150', 'R 175', 'R 225'],
        answer: 'R 200',
        memo: 'Total parts = 3 + 4 = 7. 1 part = 350 ÷ 7 = R 50. Larger share = 4 × 50 = R 200.',
        tutorTip: 'Divide total amount by total parts to get 1 part, then multiply by 4.'
      },
      {
        id: 's7p2-q5',
        num: 5,
        part: '',
        q: 'A taxi in Vanderbijlpark uses formula \\(C = 8d + 15\\). Calculate the cost \\(C\\) for a trip of \\(12\\text{ km}\\).',
        marks: 2,
        options: ['R 111', 'R 96', 'R 105', 'R 120'],
        answer: 'R 111',
        memo: 'Substitute d = 12: C = 8(12) + 15 = 96 + 15 = R 111.',
        tutorTip: 'Multiply 8 by 12 first, then add the R 15 callout fee.'
      },
      {
        id: 's7p2-q6',
        num: 6,
        part: '',
        q: 'On a pie chart of 60 learners, rugby occupies an angle of \\(120^\\circ\\). How many learners play rugby?',
        marks: 2,
        options: ['20 learners', '15 learners', '25 learners', '30 learners'],
        answer: '20 learners',
        memo: 'Fraction = 120 / 360 = 1/3. 1/3 of 60 learners = 20 learners.',
        tutorTip: '120 degrees out of 360 is exactly one third of the full circle.'
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
      },
      {
        id: 's6p1-q3',
        num: 3,
        part: '',
        q: 'Calculate: \\(45 \\times 100\\)',
        marks: 1,
        options: ['4 500', '450', '45 000', '4.5'],
        answer: '4 500',
        memo: 'Multiplying by 100 shifts digits two places left: 4 500.',
        tutorTip: 'Move the digits two places to the left and add two zeros.'
      },
      {
        id: 's6p1-q4',
        num: 4,
        part: '',
        q: 'Complete the equivalent fraction: \\(\\frac{3}{5} = \\frac{?}{20}\\)',
        marks: 1,
        options: ['12', '15', '9', '16'],
        answer: '12',
        memo: 'Denominator multiplied by 4 (5 × 4 = 20), so numerator: 3 × 4 = 12.',
        tutorTip: 'Whatever you multiply the bottom by, multiply the top by the same.'
      },
      {
        id: 's6p1-q5',
        num: 5,
        part: '',
        q: 'Two angles on a straight line are \\(118^\\circ\\) and \\(x^\\circ\\). Find \\(x\\).',
        marks: 1,
        options: ['62°', '72°', '52°', '82°'],
        answer: '62°',
        memo: 'Angles on a straight line add to 180°: 180 - 118 = 62°.',
        tutorTip: 'Straight line sum is always 180 degrees.'
      },
      {
        id: 's6p1-q6',
        num: 6,
        part: '',
        q: 'Calculate the area of a rectangle with length \\(8\\text{ cm}\\) and width \\(6\\text{ cm}\\).',
        marks: 1,
        options: ['48 cm²', '28 cm²', '14 cm²', '24 cm²'],
        answer: '48 cm²',
        memo: 'Area = length × width = 8 × 6 = 48 cm².',
        tutorTip: 'Area of rectangle = length times width.'
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
      },
      {
        id: 's6p2-q2',
        num: 2,
        part: '',
        q: 'Calculate: \\(24.60 + 8.75\\)',
        marks: 1,
        options: ['33.35', '32.35', '33.45', '32.45'],
        answer: '33.35',
        memo: 'Line up decimal points: 24.60 + 8.75 = 33.35.',
        tutorTip: 'Keep decimal points strictly lined up in vertical columns.'
      },
      {
        id: 's6p2-q3',
        num: 3,
        part: '',
        q: 'Work out: \\(15.30 - 6.84\\)',
        marks: 1,
        options: ['8.46', '9.46', '8.56', '9.56'],
        answer: '8.46',
        memo: 'Regroup across decimals: 15.30 - 6.84 = 8.46.',
        tutorTip: 'Pad trailing zeros and borrow across place-value columns.'
      },
      {
        id: 's6p2-q4',
        num: 4,
        part: '',
        q: 'Calculate: \\(72 \\div 1000\\)',
        marks: 1,
        options: ['0.072', '0.72', '0.0072', '7.2'],
        answer: '0.072',
        memo: 'Dividing by 1 000 shifts the decimal point 3 places to the left: 0.072.',
        tutorTip: 'Count the 3 zeros in 1000: jump decimal point 3 places left.'
      },
      {
        id: 's6p2-q5',
        num: 5,
        part: '',
        q: 'Calculate \\(15\\%\\) of \\(\\text{R } 240\\).',
        marks: 2,
        options: ['R 36', 'R 24', 'R 48', 'R 30'],
        answer: 'R 36',
        memo: '10% of 240 = R 24. 5% of 240 = R 12. 15% = 24 + 12 = R 36.',
        tutorTip: 'Break 15% down into 10% plus 5%.'
      },
      {
        id: 's6p2-q6',
        num: 6,
        part: '',
        q: 'Calculate the volume of a cuboid with length \\(5\\text{ cm}\\), width \\(3\\text{ cm}\\), and height \\(4\\text{ cm}\\).',
        marks: 2,
        options: ['60 cm³', '12 cm³', '48 cm³', '24 cm³'],
        answer: '60 cm³',
        memo: 'V = l × w × h = 5 × 3 × 4 = 60 cm³.',
        tutorTip: 'Multiply length by width by height.'
      }
    ]
  }
];

export class KainosExamSimulator {
  constructor(paperId = 'stage7-p1') {
    this.timerInterval = null;
    this.onTick = null;
    this.onTimeUp = null;
    this.setPaper(paperId);
  }

  setPaper(paperId) {
    this.stopTimer();
    this.paper = KAINOS_PAPERS_CATALOG.find(p => p.id === paperId) || KAINOS_PAPERS_CATALOG[0];
    this.questions = this.paper.sampleQuestions || [];
    this.currentIndex = 0;
    this.userAnswers = [];
    this.timerSeconds = this.paper.durationMinutes * 60;
    this.isFinished = false;
  }

  startTimer(onTick = null, onTimeUp = null) {
    this.stopTimer();
    this.onTick = onTick;
    this.onTimeUp = onTimeUp;
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      if (this.onTick) {
        this.onTick(this.getFormattedTime(), this.timerSeconds);
      }
      if (this.timerSeconds <= 0) {
        this.stopTimer();
        this.isFinished = true;
        if (this.onTimeUp) this.onTimeUp();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getFormattedTime() {
    const totalSecs = Math.max(0, this.timerSeconds);
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
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
      this.stopTimer();
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

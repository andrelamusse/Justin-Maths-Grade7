// js/kainos-exams.js - Kainos Cambridge School Assessment & Past Papers Hub
// Tailored for Justin Lamusse at Kainos Cambridge School, Vanderbijlpark.
// Strictly Cambridge Stage 7 (Lower Secondary Grade 7) - ZERO Stage 6.

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
        q: 'Calculate \\(\\frac{3}{5} + \\frac{1}{4}\\). Give your answer in simplest form.',
        marks: 2,
        options: ['17/20', '4/9', '4/20', '7/10'],
        answer: '17/20',
        memo: 'Common denominator 20: 12/20 + 5/20 = 17/20.',
        tutorTip: 'Always find a common bottom number before adding fractions.'
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
    description: 'Cambridge Lower Secondary Progression Test Stage 7 (Paper 2 Calculator Permitted). Emphasizes multi-step word problems, best-buys, percentages, compound area, and statistics.',
    pdfUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper2_Calculator.pdf',
    htmlUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper2_Calculator.html',
    memoPdfUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper2_MarkScheme_Memo.pdf',
    memoHtmlUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_Paper2_MarkScheme_Memo.html',
    sampleQuestions: [
      {
        id: 's7p2-q1',
        num: 1,
        part: '',
        q: 'A skateboard priced at \\(\\text{R } 1200\\) is on sale with a \\(15\\%\\) discount. What is the sale price?',
        marks: 2,
        options: ['R 1020', 'R 1080', 'R 1185', 'R 980'],
        answer: 'R 1020',
        memo: '15% of 1200 = 0.15 × 1200 = R 180 discount. Sale price = 1200 - 180 = R 1020.',
        tutorTip: 'Find 10% (120) and half of that for 5% (60). Total discount = 180. Subtract from 1200.'
      },
      {
        id: 's7p2-q2',
        num: 2,
        part: '',
        q: 'Calculate the perimeter of a rectangular garden measuring \\(14.5\\text{ m}\\) long and \\(8.3\\text{ m}\\) wide.',
        marks: 2,
        options: ['45.6 m', '120.35 m', '22.8 m', '46 m'],
        answer: '45.6 m',
        memo: 'Perimeter = 2 × (length + width) = 2 × (14.5 + 8.3) = 2 × 22.8 = 45.6 m.',
        tutorTip: 'Perimeter is the distance all the way around: add both lengths and both widths.'
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
    id: 'stage7-midyear',
    code: '0862/MY',
    title: 'Kainos Stage 7 — Mid-Year Progression Exam',
    mode: 'Non-Calculator',
    calculatorAllowed: false,
    durationMinutes: 60,
    totalMarks: 45,
    description: 'Kainos Cambridge School Mid-Year Examination (0862/MY). Covers Chapters 1–8: negative substitution, trapezium area, sequences, and two-way probability tables.',
    pdfUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_MidYear_Paper1_NonCalculator.pdf',
    htmlUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_MidYear_Paper1_NonCalculator.html',
    memoPdfUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_MidYear_MarkScheme_Memo.pdf',
    memoHtmlUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_MidYear_MarkScheme_Memo.html',
    sampleQuestions: [
      {
        id: 's7my-q1',
        num: 1,
        part: '',
        q: 'Given that \\(a = -3\\), evaluate \\(2a^2 + 5\\).',
        marks: 2,
        options: ['23', '-13', '-1', '41'],
        answer: '23',
        memo: '(-3)² = 9. 2(9) + 5 = 18 + 5 = 23.',
        tutorTip: 'A negative number squared is always POSITIVE! (-3) × (-3) = +9.'
      },
      {
        id: 's7my-q2',
        num: 2,
        part: '',
        q: 'Calculate the area of a trapezium with parallel sides of \\(8\\text{ cm}\\) and \\(14\\text{ cm}\\) and height \\(6\\text{ cm}\\).',
        marks: 2,
        options: ['66 cm²', '132 cm²', '48 cm²', '84 cm²'],
        answer: '66 cm²',
        memo: 'Area = 1/2 × (8 + 14) × 6 = 11 × 6 = 66 cm².',
        tutorTip: 'Add the parallel sides, halve it, then multiply by the perpendicular height.'
      },
      {
        id: 's7my-q3',
        num: 3,
        part: '',
        q: 'Find the \\(n^{\\text{th}}\\) term formula for the sequence: \\(5, 12, 19, 26, \\dots\\)',
        marks: 2,
        options: ['7n - 2', '5n + 7', '7n + 5', '7n - 7'],
        answer: '7n - 2',
        memo: 'Common difference = 7, so term formula starts with 7n. 7(1) - 2 = 5, so rule is 7n - 2.',
        tutorTip: 'Multiply n by the step size (7), then adjust to match the first term.'
      },
      {
        id: 's7my-q4',
        num: 4,
        part: '',
        q: 'Work out: \\(3.6 \\div 0.006\\)',
        marks: 2,
        options: ['600', '60', '6', '6000'],
        answer: '600',
        memo: 'Multiply both numbers by 1000: 3600 ÷ 6 = 600.',
        tutorTip: 'Shift the decimal point three places to the right on both sides to divide whole numbers.'
      },
      {
        id: 's7my-q5',
        num: 5,
        part: '',
        q: 'Four angles meet at a point: \\(110^\\circ\\), \\(85^\\circ\\), \\(90^\\circ\\), and \\(x^\\circ\\). What is \\(x\\)?',
        marks: 2,
        options: ['75°', '85°', '65°', '95°'],
        answer: '75°',
        memo: 'Sum around a point = 360°. 110 + 85 + 90 = 285°. x = 360 - 285 = 75°.',
        tutorTip: 'Angles meeting at a point always add up to 360 degrees.'
      },
      {
        id: 's7my-q6',
        num: 6,
        part: '',
        q: 'A recipe for 4 people uses \\(250\\text{ g}\\) of flour. How much is needed for 12 people?',
        marks: 2,
        options: ['750 g', '1000 g', '500 g', '650 g'],
        answer: '750 g',
        memo: 'Scale factor = 12 ÷ 4 = 3. 250 g × 3 = 750 g.',
        tutorTip: '12 people is three times as many as 4 people, so multiply the ingredient by 3.'
      }
    ]
  },
  {
    id: 'stage7-yearend',
    code: '0862/EY',
    title: 'Kainos Stage 7 — End-of-Year Final Examination',
    mode: 'Calculator Permitted',
    calculatorAllowed: true,
    durationMinutes: 60,
    totalMarks: 45,
    description: 'Kainos Cambridge School Final Examination (0862/EY). Comprehensive Stage 7 examination: circle geometry, linear graphs, polygon interior angles, and back-bearings.',
    pdfUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_EndOfYear_Paper2_Calculator.pdf',
    htmlUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_EndOfYear_Paper2_Calculator.html',
    memoPdfUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_EndOfYear_MarkScheme_Memo.pdf',
    memoHtmlUrl: 'cambridge-stage7-exams/Cambridge_Stage7_Mathematics_EndOfYear_MarkScheme_Memo.html',
    sampleQuestions: [
      {
        id: 's7ey-q1',
        num: 1,
        part: '',
        q: 'A circular flowerbed has a diameter of \\(14\\text{ m}\\). Calculate its area (using \\(\\pi = 3.142\\)).',
        marks: 2,
        options: ['154.0 m²', '44.0 m²', '615.8 m²', '308.0 m²'],
        answer: '154.0 m²',
        memo: 'Radius = 14 ÷ 2 = 7 m. Area = πr² = 3.142 × 7² = 3.142 × 49 = 153.96 ≈ 154.0 m².',
        tutorTip: 'Remember to halve the diameter first to get the radius before squaring!'
      },
      {
        id: 's7ey-q2',
        num: 2,
        part: '',
        q: 'Justin’s phone battery decreases from 85 hours to 68 hours. Calculate the percentage decrease.',
        marks: 2,
        options: ['20%', '17%', '25%', '15%'],
        answer: '20%',
        memo: 'Decrease = 85 - 68 = 17 hours. (17 ÷ 85) × 100 = 20%.',
        tutorTip: 'Percentage change = (change ÷ original amount) × 100.'
      },
      {
        id: 's7ey-q3',
        num: 3,
        part: '',
        q: 'What is the sum of the interior angles of a regular pentagon (5 sides)?',
        marks: 2,
        options: ['540°', '360°', '720°', '108°'],
        answer: '540°',
        memo: 'Formula: (n - 2) × 180° = (5 - 2) × 180° = 3 × 180° = 540°.',
        tutorTip: 'Count the triangles inside the polygon: 5 sides minus 2 is 3 triangles of 180 degrees.'
      },
      {
        id: 's7ey-q4',
        num: 4,
        part: '',
        q: 'Solve the equation: \\(6x + 7 = 2x + 31\\)',
        marks: 2,
        options: ['6', '8', '9.5', '4.75'],
        answer: '6',
        memo: 'Subtract 2x: 4x + 7 = 31. Subtract 7: 4x = 24. Divide by 4: x = 6.',
        tutorTip: 'Move the smaller x term first to keep the x coefficient positive.'
      },
      {
        id: 's7ey-q5',
        num: 5,
        part: '',
        q: 'Point B is on a bearing of \\(065^\\circ\\) from Point A. What is the back-bearing of A from B?',
        marks: 2,
        options: ['245°', '115°', '295°', '065°'],
        answer: '245°',
        memo: 'Forward bearing < 180°, so add 180°: 65° + 180° = 245°.',
        tutorTip: 'If the bearing is less than 180, add 180 to find the opposite return direction.'
      },
      {
        id: 's7ey-q6',
        num: 6,
        part: '',
        q: 'A fair 6-sided die is rolled and a fair coin is flipped. What is the probability of rolling a prime number and getting Heads?',
        marks: 2,
        options: ['1/4', '1/2', '1/3', '1/6'],
        answer: '1/4',
        memo: 'Primes on die: {2, 3, 5} -> 3/6 = 1/2. Coin Heads = 1/2. 1/2 × 1/2 = 1/4.',
        tutorTip: '1 is NOT prime! The prime numbers on a die are 2, 3, and 5.'
      }
    ]
  }
];

export class KainosExamSimulator {
  constructor(paperId = 'stage7-p1') {
    this.setPaper(paperId);
  }

  setPaper(paperId) {
    this.paper = KAINOS_PAPERS_CATALOG.find(p => p.id === paperId) || KAINOS_PAPERS_CATALOG[0];
    this.questions = [...this.paper.sampleQuestions];
    this.currentIndex = 0;
    this.userAnswers = [];
    this.timerSeconds = this.paper.durationMinutes * 60;
    this.isFinished = false;
    this.timerInterval = null;
  }

  startTimer(onTick, onTimeUp) {
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

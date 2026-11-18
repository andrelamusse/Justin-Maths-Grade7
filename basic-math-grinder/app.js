// app.js - Main Application Logic for Neuro-Visual Basic Math Grinder
import { MathVisualizer } from './visualizers.js';
import { sound } from './audio.js';
import { generateVerbalExplanation } from './speech-scripts.js';

// Level definitions for Cambridge Stage 7 Non-Calculator Arithmetic
export const LEVEL_DEFINITIONS = {
  '+': [
    { id: 1, name: '2-Digit Regrouping', desc: '48 + 37, 65 + 28, 76 + 59...' },
    { id: 2, name: '3-Digit Column Addition', desc: '347 + 285, 458 + 376, 529 + 184...' },
    { id: 3, name: 'Decimal Addition', desc: '4.6 + 7.82, 12.4 + 3.75, 0.65 + 1.8...' },
    { id: 4, name: 'Directed Numbers (Integers)', desc: '-18 + 25, -34 + (-17), -45 + 60...' },
    { id: 5, name: 'Stage 7 Addition Mastery', desc: 'Multi-digit, decimals & directed integers' }
  ],
  '-': [
    { id: 1, name: '2-Digit Borrowing', desc: '52 - 28, 71 - 34, 83 - 47...' },
    { id: 2, name: '3-Digit Subtraction Across Zeros', desc: '500 - 268, 704 - 389, 602 - 245...' },
    { id: 3, name: 'Decimal Subtraction', desc: '15.4 - 8.65, 20.0 - 6.35, 8.2 - 3.75...' },
    { id: 4, name: 'Directed Numbers (Negative Subtraction)', desc: '-14 - (-8), -25 - 13, 8 - 23...' },
    { id: 5, name: 'Stage 7 Subtraction Mastery', desc: 'Multi-digit, decimals & negative integers' }
  ],
  '×': [
    { id: 1, name: '12×12 Speed Tables', desc: '7 × 8, 9 × 6, 12 × 7, 8 × 12...' },
    { id: 2, name: 'Multi-Digit Mental Multiplication', desc: '14 × 6, 25 × 16, 40 × 70, 15 × 8...' },
    { id: 3, name: 'Decimal Multiplication', desc: '0.4 × 0.08, 1.2 × 1.2, 0.03 × 0.5...' },
    { id: 4, name: 'Directed Numbers & Squares / Roots', desc: '(-7) × (-4), 6 × (-9), 7² = 49, √144 = 12...' },
    { id: 5, name: 'Stage 7 Multiplication Mastery', desc: 'Tables, decimals, powers & directed numbers' }
  ],
  '÷': [
    { id: 1, name: '144 ÷ 12 Speed Facts', desc: '72 ÷ 8, 96 ÷ 8, 108 ÷ 9, 132 ÷ 11...' },
    { id: 2, name: 'Multi-Digit Mental Division', desc: '180 ÷ 15, 360 ÷ 12, 150 ÷ 25, 240 ÷ 20...' },
    { id: 3, name: 'Decimal Division', desc: '4.8 ÷ 0.12, 7.2 ÷ 9, 36 ÷ 0.6, 4.5 ÷ 0.5...' },
    { id: 4, name: 'Directed Number Division', desc: '(-72) ÷ (-8), (-56) ÷ 7, 81 ÷ (-9)...' },
    { id: 5, name: 'Stage 7 Division Mastery', desc: 'Multi-digit, decimals & directed integers' }
  ]
};

// Streamlined 7 Category Definitions for Cambridge Stage 7
export const CATEGORIES = [
  {
    id: 'add',
    name: 'Addition (+)',
    symbol: '+',
    icon: '➕',
    ops: ['+'],
    desc: 'Multi-digit regrouping, decimals & directed integers'
  },
  {
    id: 'sub',
    name: 'Subtraction (-)',
    symbol: '-',
    icon: '➖',
    ops: ['-'],
    desc: 'Column borrowing across zeros, decimals & negative numbers'
  },
  {
    id: 'mul',
    name: 'Multiplication (×)',
    symbol: '×',
    icon: '✖️',
    ops: ['×'],
    desc: '12×12 speed tables, multi-digit, decimals & squares/roots'
  },
  {
    id: 'div',
    name: 'Division (÷)',
    symbol: '÷',
    icon: '➗',
    ops: ['÷'],
    desc: 'Speed division facts, multi-digit, decimals & directed numbers'
  },
  {
    id: 'mixed_add_sub',
    name: 'Mixed Addition & Subtraction (+ & -)',
    shortName: 'Mixed (+ & -)',
    symbol: '+ & -',
    icon: '➕➖',
    ops: ['+', '-'],
    desc: 'Mixed addition and subtraction with directed integers'
  },
  {
    id: 'mixed_mul_div',
    name: 'Mixed Multiplication & Division (× & ÷)',
    shortName: 'Mixed (× & ÷)',
    symbol: '× & ÷',
    icon: '✖️➗',
    ops: ['×', '÷'],
    desc: 'Mixed multiplication and division with decimals and signs'
  },
  {
    id: 'all_mixed',
    name: 'All 4 Operations Mixed (+, -, ×, ÷)',
    shortName: 'All 4 Mixed (+, -, ×, ÷)',
    symbol: '+, -, ×, ÷',
    icon: '🎲',
    ops: ['+', '-', '×', '÷'],
    desc: 'All 4 operations combined with BIDMAS order of operations'
  }
];

// 4 Sub-Category Difficulty Options
export const SUB_CATEGORIES = [
  {
    id: 'easy',
    name: 'Easy',
    icon: '🌱',
    desc: 'Grade 7 speed tables & 2-digit regrouping'
  },
  {
    id: 'medium',
    name: 'Medium',
    icon: '⚡',
    desc: '3-digit column calculations & decimals'
  },
  {
    id: 'hard',
    name: 'Hard',
    icon: '🔥',
    desc: 'Directed numbers, squares/roots & BIDMAS'
  },
  {
    id: 'all',
    name: 'All (Gradual)',
    icon: '🚀',
    desc: 'Progressive ramp-up from core speed facts to advanced Stage 7 arithmetic'
  }
];

// 6 Official Past Exam Papers for Cambridge Stage 7 Mental Arithmetic (15 Questions each)
export const PAST_EXAM_PAPERS = [
  {
    id: 'paper_1',
    title: 'Paper 1: Term 1 Non-Calculator Past Paper — Mental Arithmetic & Regrouping',
    term: 'Term 1 Past Paper',
    ops: ['+', '-'],
    totalMarks: 22,
    desc: 'Multi-digit mental addition with regrouping, 2-digit borrowing, 3-digit column addition, subtraction across zeros, and Grade 7 word problems.',
    questions: [
      { section: 'Section A: Mental Regrouping & Borrowing', op: '+', a: 48, b: 37, result: 85, marks: 1, level: 1 },
      { section: 'Section A: Mental Regrouping & Borrowing', op: '+', a: 65, b: 28, result: 93, marks: 1, level: 1 },
      { section: 'Section A: Mental Regrouping & Borrowing', op: '-', a: 52, b: 28, result: 24, marks: 1, level: 1 },
      { section: 'Section A: Mental Regrouping & Borrowing', op: '-', a: 71, b: 34, result: 37, marks: 1, level: 1 },
      { section: 'Section A: Mental Regrouping & Borrowing', op: '+', a: 76, b: 59, result: 135, marks: 1, level: 1 },
      { section: 'Section B: 3-Digit Column & Subtraction Across Zeros', op: '+', a: 347, b: 285, result: 632, marks: 1, level: 2 },
      { section: 'Section B: 3-Digit Column & Subtraction Across Zeros', op: '-', a: 500, b: 268, result: 232, marks: 1, level: 2 },
      { section: 'Section B: 3-Digit Column & Subtraction Across Zeros', op: '+', a: 458, b: 376, result: 834, marks: 1, level: 2 },
      { section: 'Section B: 3-Digit Column & Subtraction Across Zeros', op: '-', a: 704, b: 389, result: 315, marks: 2, level: 2 },
      { section: 'Section B: 3-Digit Column & Subtraction Across Zeros', op: '-', a: 602, b: 245, result: 357, marks: 2, level: 2 },
      { section: 'Section C: Exam Word Problems', op: '+', a: 148, b: 175, result: 323, marks: 2, level: 2, wordPrompt: 'A school tuckshop in Vanderbijlpark sells 148 meat pies on Monday and 175 pies on Tuesday. How many pies were sold in total?' },
      { section: 'Section C: Exam Word Problems', op: '-', a: 600, b: 274, result: 326, marks: 2, level: 2, wordPrompt: 'A water reservoir holds 600 litres. After supplying classrooms, 274 litres were used. How many litres remain?' },
      { section: 'Section C: Exam Word Problems', op: '+', a: 284, b: 356, result: 640, marks: 2, level: 2, wordPrompt: 'Justin scores 284 points in the first round of the mathematics challenge and 356 points in the second round. What is his combined score?' },
      { section: 'Section C: Exam Word Problems', op: '-', a: 850, b: 468, result: 382, marks: 2, level: 2, wordPrompt: 'Liam saved R850 from his holiday job. He purchases a scientific textbook for R468. How many Rand does he have left?' },
      { section: 'Section C: Exam Word Problems', op: '+', a: 379, b: 445, result: 824, marks: 2, level: 2, wordPrompt: 'There are 379 learners in the Junior Phase and 445 learners in the Senior Phase at Kainos School. What is the total school enrolment?' }
    ]
  },
  {
    id: 'paper_2',
    title: 'Paper 2: Term 1 Advanced Paper — Decimals & Directed Numbers',
    term: 'Term 1 Advanced Paper',
    ops: ['+', '-'],
    totalMarks: 25,
    desc: 'Decimal column addition and subtraction, directed numbers (negative integers across zero), and realistic South African context problems.',
    questions: [
      { section: 'Section A: Decimal Arithmetic', op: '+', a: 4.6, b: 7.82, result: 12.42, marks: 1, level: 3 },
      { section: 'Section A: Decimal Arithmetic', op: '+', a: 12.4, b: 3.75, result: 16.15, marks: 1, level: 3 },
      { section: 'Section A: Decimal Arithmetic', op: '-', a: 15.4, b: 8.65, result: 6.75, marks: 1, level: 3 },
      { section: 'Section A: Decimal Arithmetic', op: '-', a: 20.0, b: 6.35, result: 13.65, marks: 1, level: 3 },
      { section: 'Section A: Decimal Arithmetic', op: '+', a: 8.45, b: 6.9, result: 15.35, marks: 1, level: 3 },
      { section: 'Section B: Directed Numbers across Zero', op: '+', a: -18, b: 25, result: 7, marks: 2, level: 4 },
      { section: 'Section B: Directed Numbers across Zero', op: '+', a: -34, b: -17, result: -51, marks: 2, level: 4 },
      { section: 'Section B: Directed Numbers across Zero', op: '-', a: -14, b: -8, result: -6, marks: 2, level: 4 },
      { section: 'Section B: Directed Numbers across Zero', op: '-', a: 8, b: 23, result: -15, marks: 2, level: 4 },
      { section: 'Section B: Directed Numbers across Zero', op: '-', a: -25, b: 13, result: -38, marks: 2, level: 4 },
      { section: 'Section C: Grade 7 Exam Context Problems', op: '-', a: 4.5, b: 8.2, result: -3.7, marks: 2, level: 4, wordPrompt: 'At dawn in Vanderbijlpark the temperature was 4.5°C. By midnight it dropped by 8.2°C. What was the midnight temperature in °C?' },
      { section: 'Section C: Grade 7 Exam Context Problems', op: '+', a: -45, b: 60, result: 15, marks: 2, level: 4, wordPrompt: 'Justin\'s student bank account was overdrawn at -R45. He deposits R60 into his account. What is his new bank balance in Rand?' },
      { section: 'Section C: Grade 7 Exam Context Problems', op: '-', a: 25.5, b: 16.75, result: 8.75, marks: 2, level: 3, wordPrompt: 'A timber board measures 25.5 metres. A carpenter saws off 16.75 metres. How many metres of timber are left?' },
      { section: 'Section C: Grade 7 Exam Context Problems', op: '+', a: 14.8, b: 27.45, result: 42.25, marks: 2, level: 3, wordPrompt: 'Two parcels weigh 14.8 kg and 27.45 kg respectively. What is their combined total mass in kg?' },
      { section: 'Section C: Grade 7 Exam Context Problems', op: '-', a: -12, b: -28, result: 16, marks: 2, level: 4, wordPrompt: 'A freezer temperature rises from -28°C up to -12°C. What is the difference (increase) in temperature in °C?' }
    ]
  },
  {
    id: 'paper_3',
    title: 'Paper 3: Term 2 Past Paper — Speed Tables & Mental Division',
    term: 'Term 2 Past Paper',
    ops: ['×', '÷'],
    totalMarks: 22,
    desc: 'Complete 12×12 speed tables, upper times tables (7x, 8x, 9x, 11x, 12x), mental division up to 144 ÷ 12, and rate word problems.',
    questions: [
      { section: 'Section A: Speed Tables & Facts', op: '×', a: 7, b: 8, result: 56, marks: 1, level: 1 },
      { section: 'Section A: Speed Tables & Facts', op: '×', a: 9, b: 6, result: 54, marks: 1, level: 1 },
      { section: 'Section A: Speed Tables & Facts', op: '×', a: 12, b: 7, result: 84, marks: 1, level: 1 },
      { section: 'Section A: Speed Tables & Facts', op: '÷', a: 72, b: 8, result: 9, marks: 1, level: 1 },
      { section: 'Section A: Speed Tables & Facts', op: '÷', a: 108, b: 9, result: 12, marks: 1, level: 1 },
      { section: 'Section B: Upper Tables & Multi-Digit Mental Facts', op: '×', a: 8, b: 12, result: 96, marks: 1, level: 1 },
      { section: 'Section B: Upper Tables & Multi-Digit Mental Facts', op: '÷', a: 132, b: 11, result: 12, marks: 1, level: 1 },
      { section: 'Section B: Upper Tables & Multi-Digit Mental Facts', op: '÷', a: 144, b: 12, result: 12, marks: 1, level: 1 },
      { section: 'Section B: Upper Tables & Multi-Digit Mental Facts', op: '×', a: 14, b: 6, result: 84, marks: 2, level: 2 },
      { section: 'Section B: Upper Tables & Multi-Digit Mental Facts', op: '÷', a: 180, b: 15, result: 12, marks: 2, level: 2 },
      { section: 'Section C: Grade 7 Multiplication & Division Applications', op: '×', a: 15, b: 8, result: 120, marks: 2, level: 2, wordPrompt: 'A sports coach buys 15 boxes of tennis balls, with 8 balls in each box. How many tennis balls are there in total?' },
      { section: 'Section C: Grade 7 Multiplication & Division Applications', op: '÷', a: 360, b: 12, result: 30, marks: 2, level: 2, wordPrompt: '360 learners at Kainos School are divided equally into 12 house teams for sports day. How many learners are in each house team?' },
      { section: 'Section C: Grade 7 Multiplication & Division Applications', op: '×', a: 25, b: 16, result: 400, marks: 2, level: 2, wordPrompt: 'A school auditorium has 25 rows with 16 seats in each row. What is the total seating capacity?' },
      { section: 'Section C: Grade 7 Multiplication & Division Applications', op: '÷', a: 150, b: 25, result: 6, marks: 2, level: 2, wordPrompt: 'A baker packs 150 gourmet biscuits into boxes containing 25 biscuits each. How many boxes can the baker fill completely?' },
      { section: 'Section C: Grade 7 Multiplication & Division Applications', op: '×', a: 40, b: 70, result: 2800, marks: 2, level: 2, wordPrompt: 'A rectangular turf field measures 40 metres wide by 70 metres long. What is the total area of the field in square metres?' }
    ]
  },
  {
    id: 'paper_4',
    title: 'Paper 4: Term 2 Advanced Paper — Decimals, Powers & Mental Division',
    term: 'Term 2 Advanced Paper',
    ops: ['×', '÷'],
    totalMarks: 25,
    desc: 'Decimal mental multiplication and division, square numbers and roots (7²=49, 12²=144), and multi-step division word problems.',
    questions: [
      { section: 'Section A: Decimal Mental Calculations', op: '×', a: 0.4, b: 0.08, result: 0.032, marks: 1, level: 3 },
      { section: 'Section A: Decimal Mental Calculations', op: '×', a: 1.2, b: 1.2, result: 1.44, marks: 1, level: 3 },
      { section: 'Section A: Decimal Mental Calculations', op: '×', a: 0.03, b: 0.5, result: 0.015, marks: 1, level: 3 },
      { section: 'Section A: Decimal Mental Calculations', op: '÷', a: 4.8, b: 0.12, result: 40, marks: 1, level: 3 },
      { section: 'Section A: Decimal Mental Calculations', op: '÷', a: 7.2, b: 9, result: 0.8, marks: 1, level: 3 },
      { section: 'Section B: Squares, Roots & Multi-Digit Division', op: '×', a: 7, b: 7, result: 49, marks: 2, level: 4 },
      { section: 'Section B: Squares, Roots & Multi-Digit Division', op: '×', a: 12, b: 12, result: 144, marks: 2, level: 4 },
      { section: 'Section B: Squares, Roots & Multi-Digit Division', op: '÷', a: 36, b: 0.6, result: 60, marks: 2, level: 3 },
      { section: 'Section B: Squares, Roots & Multi-Digit Division', op: '÷', a: 240, b: 20, result: 12, marks: 2, level: 2 },
      { section: 'Section B: Squares, Roots & Multi-Digit Division', op: '÷', a: 300, b: 25, result: 12, marks: 2, level: 2 },
      { section: 'Section C: Grade 7 Problem Solving', op: '×', a: 16, b: 5, result: 80, marks: 2, level: 2, wordPrompt: 'A tuckshop sells bottles of juice for R16 each. How much will 5 bottles of juice cost in Rand?' },
      { section: 'Section C: Grade 7 Problem Solving', op: '÷', a: 450, b: 15, result: 30, marks: 2, level: 2, wordPrompt: 'A factory machine produces 450 components in 15 hours. How many components does it produce per hour?' },
      { section: 'Section C: Grade 7 Problem Solving', op: '×', a: 0.6, b: 8, result: 4.8, marks: 2, level: 3, wordPrompt: 'Each wooden shelf requires 0.6 metres of timber. How many metres of timber are needed to make 8 shelves?' },
      { section: 'Section C: Grade 7 Problem Solving', op: '÷', a: 4.5, b: 0.5, result: 9, marks: 2, level: 3, wordPrompt: 'A 4.5-litre bottle of cleaning detergent is dispensed into 0.5-litre spray bottles. How many spray bottles can be filled?' },
      { section: 'Section C: Grade 7 Problem Solving', op: '×', a: 15, b: 15, result: 225, marks: 2, level: 4, wordPrompt: 'A square playground has a side length of 15 metres. Calculate the area of the playground in square metres (15²).' }
    ]
  },
  {
    id: 'paper_5',
    title: 'Paper 5: Mid-Year Mental Exam — Directed Numbers & All 4 Operations',
    term: 'Mid-Year Exam Paper',
    ops: ['+', '-', '×', '÷'],
    totalMarks: 26,
    desc: 'Mid-year non-calculator arithmetic testing directed integers (same sign and opposite signs across all 4 operations), decimals, and column calculations.',
    questions: [
      { section: 'Section A: Directed Integer Arithmetic', op: '+', a: -14, b: 22, result: 8, marks: 1, level: 4 },
      { section: 'Section A: Directed Integer Arithmetic', op: '-', a: -16, b: -9, result: -7, marks: 1, level: 4 },
      { section: 'Section A: Directed Integer Arithmetic', op: '×', a: -7, b: -4, result: 28, marks: 1, level: 4 },
      { section: 'Section A: Directed Integer Arithmetic', op: '×', a: 6, b: -9, result: -54, marks: 1, level: 4 },
      { section: 'Section A: Directed Integer Arithmetic', op: '÷', a: -72, b: -8, result: 9, marks: 1, level: 4 },
      { section: 'Section B: Mixed Operations with Decimals & Signs', op: '÷', a: -56, b: 7, result: -8, marks: 2, level: 4 },
      { section: 'Section B: Mixed Operations with Decimals & Signs', op: '+', a: 34.6, b: 18.75, result: 53.35, marks: 2, level: 3 },
      { section: 'Section B: Mixed Operations with Decimals & Signs', op: '-', a: 50.0, b: 23.45, result: 26.55, marks: 2, level: 3 },
      { section: 'Section B: Mixed Operations with Decimals & Signs', op: '×', a: 0.8, b: 12, result: 9.6, marks: 2, level: 3 },
      { section: 'Section B: Mixed Operations with Decimals & Signs', op: '÷', a: 81, b: -9, result: -9, marks: 2, level: 4 },
      { section: 'Section B: Mixed Operations with Decimals & Signs', op: '+', a: 458, b: 267, result: 725, marks: 2, level: 2 },
      { section: 'Section C: Exam Real-World Word Problems', op: '-', a: 700, b: 345, result: 355, marks: 2, level: 2, wordPrompt: 'Liam has R700 in his savings account. After paying R345 for school supplies, how much remains in his account?' },
      { section: 'Section C: Exam Real-World Word Problems', op: '×', a: 25, b: 14, result: 350, marks: 2, level: 2, wordPrompt: 'A bus carries 25 passengers per trip. If the bus completes 14 trips during a school excursion, how many passengers were transported in total?' },
      { section: 'Section C: Exam Real-World Word Problems', op: '÷', a: 420, b: 14, result: 30, marks: 2, level: 2, wordPrompt: 'A cyclist travels 420 kilometres over 14 stages. What is the cyclist\'s average distance in km per stage?' },
      { section: 'Section C: Exam Real-World Word Problems', op: '-', a: 12, b: 27, result: -15, marks: 3, level: 4, wordPrompt: 'At noon in the mountains the temperature was 12°C. A severe cold front caused the temperature to drop by 27°C overnight. What was the overnight temperature in °C?' }
    ]
  },
  {
    id: 'paper_6',
    title: 'Paper 6: Year-End Final Past Exam — Stage 7 Comprehensive Non-Calculator Exam',
    term: 'Final Year-End Exam',
    ops: ['+', '-', '×', '÷'],
    totalMarks: 30,
    desc: 'Comprehensive final non-calculator examination covering multi-digit column arithmetic, decimals, directed numbers, upper tables, squares, and contextual word problems.',
    questions: [
      { section: 'Section A: Speed Recall & Directed Signs', op: '+', a: -28, b: 45, result: 17, marks: 1, level: 4 },
      { section: 'Section A: Speed Recall & Directed Signs', op: '-', a: 14, b: 32, result: -18, marks: 1, level: 4 },
      { section: 'Section A: Speed Recall & Directed Signs', op: '×', a: -8, b: -7, result: 56, marks: 1, level: 4 },
      { section: 'Section A: Speed Recall & Directed Signs', op: '÷', a: -96, b: 8, result: -12, marks: 1, level: 4 },
      { section: 'Section A: Speed Recall & Directed Signs', op: '×', a: 11, b: 12, result: 132, marks: 2, level: 1 },
      { section: 'Section B: Multi-Digit, Decimals & Indices', op: '+', a: 549, b: 387, result: 936, marks: 2, level: 2 },
      { section: 'Section B: Multi-Digit, Decimals & Indices', op: '-', a: 800, b: 436, result: 364, marks: 2, level: 2 },
      { section: 'Section B: Multi-Digit, Decimals & Indices', op: '×', a: 1.5, b: 0.6, result: 0.9, marks: 2, level: 3 },
      { section: 'Section B: Multi-Digit, Decimals & Indices', op: '÷', a: 3.6, b: 0.09, result: 40, marks: 2, level: 3 },
      { section: 'Section B: Multi-Digit, Decimals & Indices', op: '×', a: 13, b: 13, result: 169, marks: 2, level: 4 },
      { section: 'Section C: Final Exam Multi-Step Word Problems', op: '+', a: 475, b: 389, result: 864, marks: 2, level: 2, wordPrompt: 'In a two-day charity swimathon, the Blue Team raises R475 on Saturday and R389 on Sunday. What is their combined total funds raised in Rand?' },
      { section: 'Section C: Final Exam Multi-Step Word Problems', op: '-', a: 950, b: 468, result: 482, marks: 3, level: 2, wordPrompt: 'A school bookstore ordered 950 math textbooks at the beginning of the term. By mid-term, 468 had been issued. How many textbooks remain in storage?' },
      { section: 'Section C: Final Exam Multi-Step Word Problems', op: '×', a: 35, b: 20, result: 700, marks: 3, level: 2, wordPrompt: 'A school sports hall has 35 rows with 20 seats per row. How many seats are there in total?' },
      { section: 'Section C: Final Exam Multi-Step Word Problems', op: '÷', a: 640, b: 16, result: 40, marks: 3, level: 2, wordPrompt: 'A printing company produces 640 revision booklets and packages them into 16 equal distribution boxes. How many booklets are in each box?' },
      { section: 'Section C: Final Exam Multi-Step Word Problems', op: '÷', a: 144, b: 12, result: 12, marks: 3, level: 1, wordPrompt: 'A square field with an area of 144 square metres is tiled with 12 equal length rows. How many metres long is each row (√144)?' }
    ]
  }
];

// Helper to keep floating-point operations cleanly rounded
export function cleanNum(val) {
  return Number(Math.round(val * 10000) / 10000);
}

// Stage 7 BIDMAS Mental Math Bank
export const BIDMAS_QUESTIONS = [
  { expression: '18 − 3 × 4', a: 18, b: 12, op: '−', result: 6, explanation: 'BIDMAS: Multiply first (3 × 4 = 12), then subtract (18 − 12 = 6).' },
  { expression: '5² − 4 × 3', a: 25, b: 12, op: '−', result: 13, explanation: 'BIDMAS: Indices (5² = 25) and multiply (4 × 3 = 12), then 25 − 12 = 13.' },
  { expression: '20 + 40 ÷ 5', a: 20, b: 8, op: '+', result: 28, explanation: 'BIDMAS: Divide first (40 ÷ 5 = 8), then add (20 + 8 = 28).' },
  { expression: '(15 − 7) × 4', a: 8, b: 4, op: '×', result: 32, explanation: 'BIDMAS: Brackets first (15 − 7 = 8), then multiply (8 × 4 = 32).' },
  { expression: '6 + 7 × 3', a: 6, b: 21, op: '+', result: 27, explanation: 'BIDMAS: Multiply first (7 × 3 = 21), then add (6 + 21 = 27).' },
  { expression: '50 − 5 × 8', a: 50, b: 40, op: '−', result: 10, explanation: 'BIDMAS: Multiply first (5 × 8 = 40), then subtract (50 − 40 = 10).' },
  { expression: '36 ÷ (2 + 4)', a: 36, b: 6, op: '÷', result: 6, explanation: 'BIDMAS: Brackets first (2 + 4 = 6), then divide (36 ÷ 6 = 6).' },
  { expression: '4² + 3 × 5', a: 16, b: 15, op: '+', result: 31, explanation: 'BIDMAS: Indices (4² = 16) and multiply (3 × 5 = 15), then add (16 + 15 = 31).' },
  { expression: '100 − 8²', a: 100, b: 64, op: '−', result: 36, explanation: 'BIDMAS: Indices (8² = 64), then subtract (100 − 64 = 36).' },
  { expression: '14 + 18 ÷ 2', a: 14, b: 9, op: '+', result: 23, explanation: 'BIDMAS: Divide first (18 ÷ 2 = 9), then add (14 + 9 = 23).' },
  { expression: '(9 + 6) ÷ 3', a: 15, b: 3, op: '÷', result: 5, explanation: 'BIDMAS: Brackets first (9 + 6 = 15), then divide (15 ÷ 3 = 5).' },
  { expression: '7 × (12 − 8)', a: 7, b: 4, op: '×', result: 28, explanation: 'BIDMAS: Brackets first (12 − 8 = 4), then multiply (7 × 4 = 28).' }
];

export class MathGrinderApp {
  constructor() {
    this.currentMode = 'grinder'; // 'grinder' | 'papers'
    this.activeExam = null;
    this.paperBestScores = {};
    this.currentCategory = 'add';
    this.currentSubCategory = 'easy';
    this.progressiveTier = 'easy';
    this.currentOp = '+';
    this.currentLevel = 1;
    this.currentQuestion = null;
    this.userAnswer = '';
    this.streak = 0;
    this.bestStreak = 0;
    this.totalSolved = 0;
    this.xp = 0;
    this.history = [];
    this.autoAdvanceTimer = null;
    this.isSpeaking = false;
    this.settings = {
      font: 'lexend',
      theme: 'cream',
      autoSpeak: false,
      soundFx: true
    };

    this.loadState();
  }

  loadState() {
    try {
      if (typeof localStorage === 'undefined') return;
      const saved = localStorage.getItem('justin_math_grinder_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.streak = parsed.streak || 0;
        this.bestStreak = parsed.bestStreak || 0;
        this.totalSolved = parsed.totalSolved || 0;
        this.xp = parsed.xp || 0;
        if (parsed.paperBestScores && typeof parsed.paperBestScores === 'object') {
          this.paperBestScores = parsed.paperBestScores;
        }
        if (parsed.currentCategory && CATEGORIES.some(c => c.id === parsed.currentCategory)) {
          this.currentCategory = parsed.currentCategory;
        } else if (parsed.currentOp) {
          const map = { '+': 'add', '-': 'sub', '×': 'mul', '÷': 'div', '*': 'mul', '/': 'div' };
          this.currentCategory = map[parsed.currentOp] || 'add';
        }
        if (parsed.currentSubCategory && SUB_CATEGORIES.some(s => s.id === parsed.currentSubCategory)) {
          this.currentSubCategory = parsed.currentSubCategory;
        }
        if (parsed.settings) this.settings = { ...this.settings, ...parsed.settings };
      }
    } catch (e) {
      console.warn('Could not load saved progress', e);
    }
  }

  saveState() {
    try {
      if (typeof localStorage === 'undefined') return;
      const data = {
        streak: this.streak,
        bestStreak: this.bestStreak,
        totalSolved: this.totalSolved,
        xp: this.xp,
        paperBestScores: this.paperBestScores,
        currentCategory: this.currentCategory,
        currentSubCategory: this.currentSubCategory,
        settings: this.settings
      };
      localStorage.setItem('justin_math_grinder_v1', JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save progress', e);
    }
  }

  init() {
    this.cacheDom();
    this.bindEvents();
    this.applySettings();
    this.visualizer = new MathVisualizer(this.dom.visContainer);
    this.renderPastPapersGrid();
    this.updateCategoryUI();
    this.updateSubCategoryUI();
    this.updateStatsUI();
    this.nextQuestion();
  }

  cacheDom() {
    this.dom = {
      appContainer: document.getElementById('grinder-app'),
      modeGrinderBtn: document.getElementById('mode-grinder-btn'),
      modePapersBtn: document.getElementById('mode-papers-btn'),
      pastPapersView: document.getElementById('past-papers-view'),
      pastPapersGrid: document.getElementById('past-papers-grid'),
      examReportContainer: document.getElementById('exam-report-container'),
      examActiveBanner: document.getElementById('exam-active-banner'),
      examActiveTitle: document.getElementById('exam-active-title'),
      examQuestionMarks: document.getElementById('exam-question-marks'),
      exitExamBtn: document.getElementById('exit-exam-btn'),
      grinderSelectorsWrap: document.getElementById('grinder-selectors-wrap'),
      questionWorkspaceWrap: document.getElementById('question-workspace-wrap'),
      examWordContext: document.getElementById('exam-word-context'),
      categoryGrid: document.getElementById('category-tabs'),
      categoryBtns: document.querySelectorAll('.category-btn'),
      subCategoryRow: document.getElementById('sub-category-selector'),
      subCatBtns: document.querySelectorAll('.sub-cat-pill'),
      tierIndicator: document.getElementById('gradual-tier-indicator'),
      tierBadge: document.getElementById('tier-badge'),
      tierDetails: document.getElementById('tier-details'),
      opTabs: document.querySelectorAll('.op-tab'),
      levelSelector: document.getElementById('level-selector'),
      numA: document.getElementById('num-a'),
      opSymbol: document.getElementById('op-symbol'),
      numB: document.getElementById('num-b'),
      answerDisplay: document.getElementById('answer-display'),
      submitBtn: document.getElementById('submit-btn'),
      keypadBtns: document.querySelectorAll('.key-btn'),
      visContainer: document.getElementById('visualizer-container'),
      visToggleBtn: document.getElementById('vis-toggle-btn'),
      speakBtn: document.getElementById('speak-btn'),
      captionBar: document.getElementById('speech-caption-bar'),
      breakdownBtn: document.getElementById('breakdown-btn'),
      breakdownContainer: document.getElementById('breakdown-container'),
      streakVal: document.getElementById('streak-val'),
      solvedVal: document.getElementById('solved-val'),
      xpVal: document.getElementById('xp-val'),
      levelBadge: document.getElementById('level-badge'),
      feedbackMsg: document.getElementById('feedback-message'),
      themeToggle: document.getElementById('theme-toggle'),
      fontToggle: document.getElementById('font-toggle'),
      soundToggle: document.getElementById('sound-toggle'),
      scratchpadToggle: document.getElementById('scratchpad-toggle'),
      scratchpadCanvas: document.getElementById('scratchpad-canvas')
    };
  }

  bindEvents() {
    // Top-level mode switcher (Daily Grinder vs Past Exam Papers)
    if (this.dom.modeGrinderBtn && this.dom.modePapersBtn) {
      this.dom.modeGrinderBtn.addEventListener('click', () => this.switchMode('grinder'));
      this.dom.modePapersBtn.addEventListener('click', () => this.switchMode('papers'));
    }

    if (this.dom.exitExamBtn) {
      this.dom.exitExamBtn.addEventListener('click', () => {
        this.activeExam = null;
        this.switchMode('papers');
      });
    }

    // 7 Category selection buttons
    if (this.dom.categoryBtns) {
      this.dom.categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const cat = e.currentTarget.dataset.cat;
          this.setCategory(cat);
        });
      });
    }

    // 4 Sub-Category difficulty pills
    if (this.dom.subCatBtns) {
      this.dom.subCatBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const sub = e.currentTarget.dataset.sub;
          this.setSubCategory(sub);
        });
      });
    }

    // Legacy operation tabs support (if rendered)
    if (this.dom.opTabs) {
      this.dom.opTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          const op = e.currentTarget.dataset.op;
          this.setOperation(op);
        });
      });
    }

    // Keypad clicks
    this.dom.keypadBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const val = e.currentTarget.dataset.val;
        this.handleKeyInput(val);
      });
    });

    // Keyboard support (including negative - and decimal .)
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key >= '0' && e.key <= '9') {
        this.handleKeyInput(e.key);
      } else if (e.key === '-' || e.key === '−' || e.key === '_') {
        this.handleKeyInput('-');
      } else if (e.key === '.' || e.key === ',') {
        this.handleKeyInput('.');
      } else if (e.key === 'Backspace') {
        this.handleKeyInput('backspace');
      } else if (e.key === 'Enter') {
        this.submitAnswer();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        this.handleKeyInput('clear');
      } else if (e.key === 's' || e.key === 'S') {
        this.speakCurrentQuestion();
      }
    });

    // Visualizer toggle
    if (this.dom.visToggleBtn) {
      this.dom.visToggleBtn.addEventListener('click', () => {
        const isHidden = this.dom.visContainer.classList.contains('hidden');
        if (isHidden) {
          this.dom.visContainer.classList.remove('hidden');
          this.dom.visToggleBtn.textContent = 'Hide Visualizer 👁️';
          this.renderVisualizer();
        } else {
          this.dom.visContainer.classList.add('hidden');
          this.dom.visToggleBtn.textContent = 'Show Visualizer 👁️';
        }
      });
    }

    // Breakdown toggle
    if (this.dom.breakdownBtn) {
      this.dom.breakdownBtn.addEventListener('click', () => {
        this.toggleBreakdown();
      });
    }

    // Speech button
    if (this.dom.speakBtn) {
      this.dom.speakBtn.addEventListener('click', () => {
        this.speakCurrentQuestion();
      });
    }

    // Submit button
    if (this.dom.submitBtn) {
      this.dom.submitBtn.addEventListener('click', () => {
        this.submitAnswer();
      });
    }

    // Theme toggle
    if (this.dom.themeToggle) {
      this.dom.themeToggle.addEventListener('click', () => {
        const themes = ['cream', 'dark', 'pastel'];
        const next = themes[(themes.indexOf(this.settings.theme) + 1) % themes.length];
        this.settings.theme = next;
        this.applySettings();
        this.saveState();
      });
    }

    // Font toggle
    if (this.dom.fontToggle) {
      this.dom.fontToggle.addEventListener('click', () => {
        this.settings.font = this.settings.font === 'lexend' ? 'dyslexic' : 'lexend';
        this.applySettings();
        this.saveState();
      });
    }

    // Sound toggle
    if (this.dom.soundToggle) {
      this.dom.soundToggle.addEventListener('click', () => {
        this.settings.soundFx = !this.settings.soundFx;
        sound.soundEnabled = this.settings.soundFx;
        this.dom.soundToggle.textContent = this.settings.soundFx ? '🔊 Sound: ON' : '🔇 Sound: OFF';
        this.saveState();
      });
    }

    // Scratchpad canvas support
    this.initScratchpad();
  }

  setCategory(catId) {
    const found = CATEGORIES.find(c => c.id === catId || c.symbol === catId);
    if (!found) return;
    this.currentCategory = found.id;
    this.streak = 0; // Fresh streak so gradual mode starts at Easy for newly selected skill
    this.updateCategoryUI();
    this.updateStatsUI();
    this.nextQuestion();
    this.saveState();
  }

  setSubCategory(subId) {
    const found = SUB_CATEGORIES.find(s => s.id === subId);
    if (!found) return;
    this.currentSubCategory = found.id;
    if (found.id === 'all') {
      this.streak = 0; // Fresh progressive ramp-up starting from Easy
    }
    this.updateSubCategoryUI();
    this.updateStatsUI();
    this.nextQuestion();
    this.saveState();
  }

  setOperation(op) {
    const map = { '+': 'add', '-': 'sub', '×': 'mul', '÷': 'div', '*': 'mul', '/': 'div' };
    const catId = map[op] || 'add';
    this.setCategory(catId);
  }

  updateCategoryUI() {
    if (this.dom && this.dom.categoryBtns) {
      this.dom.categoryBtns.forEach(b => {
        b.classList.toggle('active', b.dataset.cat === this.currentCategory);
      });
    }
  }

  updateSubCategoryUI() {
    if (this.dom && this.dom.subCatBtns) {
      this.dom.subCatBtns.forEach(b => {
        b.classList.toggle('active', b.dataset.sub === this.currentSubCategory);
      });
    }
    this.updateGradualIndicator();
  }

  renderCategorySelector() {
    this.updateCategoryUI();
  }

  renderSubCategorySelector() {
    this.updateSubCategoryUI();
  }

  renderLevelSelector() {
    this.updateSubCategoryUI();
  }

  getProgressiveTier(streak = this.streak) {
    if (streak >= 7) return 'hard';
    if (streak >= 3) return 'medium';
    return 'easy';
  }

  updateGradualIndicator() {
    if (!this.dom || !this.dom.tierIndicator) return;
    if (this.currentSubCategory === 'all') {
      this.dom.tierIndicator.classList.remove('hidden');
      const tier = this.getProgressiveTier(this.streak);
      this.progressiveTier = tier;
      if (this.dom.tierBadge) {
        this.dom.tierBadge.className = `gradual-tier-badge tier-${tier}`;
        const titles = { easy: 'Easy 🌱', medium: 'Medium ⚡', hard: 'Hard 🔥' };
        this.dom.tierBadge.textContent = titles[tier] || tier;
      }
      if (this.dom.tierDetails) {
        const nextTarget = tier === 'easy' ? '3 for Medium ⚡' : (tier === 'medium' ? '7 for Hard 🔥' : 'Max Level 🔥');
        this.dom.tierDetails.textContent = `(Streak: ${this.streak} 🔥 • Next: ${nextTarget})`;
      }
    } else {
      this.dom.tierIndicator.classList.add('hidden');
    }
  }

  generateByLevel(op, level) {
    let a = 10;
    let b = 10;
    let result = 20;
    let expression = null;

    if (op === '+') {
      if (level === 1) {
        // Level 1: 2-Digit Regrouping (e.g. 48 + 37, 65 + 28)
        const aTens = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const bTens = Math.floor(Math.random() * 5) + 1; // 1 to 5
        const aOnes = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const minB = 10 - aOnes;
        const bOnes = Math.floor(Math.random() * (10 - minB)) + minB; // sum >= 10
        a = aTens * 10 + aOnes;
        b = bTens * 10 + bOnes;
        result = a + b;
      } else if (level === 2) {
        // Level 2: 3-Digit Column Addition (e.g. 347 + 285)
        a = Math.floor(Math.random() * 400) + 150; // 150 to 549
        b = Math.floor(Math.random() * 400) + 120; // 120 to 519
        result = a + b;
      } else if (level === 3) {
        // Level 3: Decimal Addition (e.g. 4.6 + 7.82, 12.4 + 3.75)
        const mode = Math.random();
        if (mode < 0.5) {
          const aInt = Math.floor(Math.random() * 80) + 15; // 1.5 to 9.4
          const bInt = Math.floor(Math.random() * 600) + 120; // 1.20 to 7.19
          a = cleanNum(aInt / 10);
          b = cleanNum(bInt / 100);
        } else {
          const aInt = Math.floor(Math.random() * 90) + 35; // 3.5 to 12.4
          const bInt = Math.floor(Math.random() * 90) + 25; // 2.5 to 11.4
          a = cleanNum(aInt / 10);
          b = cleanNum(bInt / 10);
        }
        result = cleanNum(a + b);
      } else if (level === 4) {
        // Level 4: Directed Numbers / Integers (-18 + 25, -34 + (-17), -45 + 60)
        const mode = Math.random();
        if (mode < 0.4) {
          const neg = -(Math.floor(Math.random() * 45) + 10);
          const pos = Math.floor(Math.random() * 55) + 15;
          a = neg;
          b = pos;
        } else if (mode < 0.7) {
          const pos = Math.floor(Math.random() * 40) + 10;
          const neg = -(Math.floor(Math.random() * 45) + 15);
          a = pos;
          b = neg;
        } else {
          a = -(Math.floor(Math.random() * 40) + 10);
          b = -(Math.floor(Math.random() * 30) + 10);
        }
        result = a + b;
      } else {
        // Level 5: Grade 7 Mixed Addition Mastery
        const pick = Math.random();
        if (pick < 0.35) return this.generateByLevel('+', 2);
        if (pick < 0.7) return this.generateByLevel('+', 3);
        return this.generateByLevel('+', 4);
      }

    } else if (op === '-') {
      if (level === 1) {
        // Level 1: 2-Digit Borrowing (e.g. 52 - 28)
        const aTens = Math.floor(Math.random() * 6) + 3; // 3 to 8
        const bTens = Math.floor(Math.random() * (aTens - 2)) + 1; // 1 to aTens-2
        const bOnes = Math.floor(Math.random() * 7) + 3; // 3 to 9
        const aOnes = Math.floor(Math.random() * (bOnes - 1)); // 0 to bOnes-1
        a = aTens * 10 + aOnes;
        b = bTens * 10 + bOnes;
        result = a - b;
      } else if (level === 2) {
        // Level 2: 3-Digit Subtraction across zeros (e.g. 500 - 268, 704 - 389)
        const hundreds = [300, 400, 500, 600, 700, 800, 502, 604, 705, 803];
        a = hundreds[Math.floor(Math.random() * hundreds.length)];
        const bHundreds = Math.floor(a / 100) - Math.floor(Math.random() * 2) - 1;
        const bTens = Math.floor(Math.random() * 7) + 2;
        const bOnes = Math.floor(Math.random() * 8) + 2;
        b = Math.max(125, bHundreds * 100 + bTens * 10 + bOnes);
        if (b >= a) b = a - 135;
        result = a - b;
      } else if (level === 3) {
        // Level 3: Decimal Subtraction (e.g. 15.4 - 8.65, 20.0 - 6.35)
        const mode = Math.random();
        if (mode < 0.5) {
          const aVal = cleanNum((Math.floor(Math.random() * 80) + 120) / 10);
          const bVal = cleanNum((Math.floor(Math.random() * 700) + 150) / 100);
          a = aVal;
          b = Math.min(bVal, cleanNum(a - 1.25));
        } else {
          const aVal = cleanNum((Math.floor(Math.random() * 15) + 10) * 2);
          const bVal = cleanNum((Math.floor(Math.random() * 600) + 250) / 100);
          a = aVal;
          b = bVal;
        }
        result = cleanNum(a - b);
      } else if (level === 4) {
        // Level 4: Directed Numbers / Negative Subtraction (-14 - (-8), -25 - 13, 8 - 23)
        const mode = Math.random();
        if (mode < 0.35) {
          const small = Math.floor(Math.random() * 18) + 5;
          const large = small + Math.floor(Math.random() * 25) + 8;
          a = small;
          b = large;
        } else if (mode < 0.7) {
          a = -(Math.floor(Math.random() * 30) + 10);
          b = -(Math.floor(Math.random() * 25) + 5);
        } else {
          a = -(Math.floor(Math.random() * 30) + 10);
          b = Math.floor(Math.random() * 25) + 5;
        }
        result = a - b;
      } else {
        // Level 5: Stage 7 Subtraction Mastery
        const pick = Math.random();
        if (pick < 0.35) return this.generateByLevel('-', 2);
        if (pick < 0.7) return this.generateByLevel('-', 3);
        return this.generateByLevel('-', 4);
      }

    } else if (op === '×') {
      if (level === 1) {
        // Level 1: 12×12 Speed Tables
        const upper = [6, 7, 8, 9, 11, 12];
        const all = [3, 4, 5, 6, 7, 8, 9, 11, 12];
        a = Math.random() < 0.7 ? upper[Math.floor(Math.random() * upper.length)] : all[Math.floor(Math.random() * all.length)];
        b = Math.floor(Math.random() * 11) + 2;
        result = a * b;
      } else if (level === 2) {
        // Level 2: Multi-digit Mental Multiplication (e.g. 14 × 6, 25 × 16, 40 × 70, 15 × 8)
        const patterns = [
          () => { const x = [12, 13, 14, 15, 16, 18, 24, 25][Math.floor(Math.random() * 8)]; const y = Math.floor(Math.random() * 7) + 3; return [x, y]; },
          () => { const x = (Math.floor(Math.random() * 7) + 2) * 10; const y = (Math.floor(Math.random() * 7) + 2) * 10; return [x, y]; },
          () => { const x = 25; const y = [12, 14, 16, 18, 20, 24][Math.floor(Math.random() * 6)]; return [x, y]; },
          () => { const x = [15, 20, 30, 45, 50][Math.floor(Math.random() * 5)]; const y = Math.floor(Math.random() * 8) + 4; return [x, y]; }
        ];
        const [x, y] = patterns[Math.floor(Math.random() * patterns.length)]();
        a = x;
        b = y;
        result = a * b;
      } else if (level === 3) {
        // Level 3: Decimal Multiplication (e.g. 0.4 × 0.08, 1.2 × 1.2, 0.6 × 7)
        const patterns = [
          () => {
            const x = cleanNum((Math.floor(Math.random() * 8) + 2) / 10);
            const y = cleanNum((Math.floor(Math.random() * 9) + 2) / 100);
            return [x, y];
          },
          () => {
            const x = cleanNum((Math.floor(Math.random() * 8) + 11) / 10);
            const y = cleanNum((Math.floor(Math.random() * 6) + 3) / 10);
            return [x, y];
          },
          () => {
            const x = cleanNum((Math.floor(Math.random() * 8) + 2) / 10);
            const y = Math.floor(Math.random() * 8) + 3;
            return [x, y];
          }
        ];
        const [x, y] = patterns[Math.floor(Math.random() * patterns.length)]();
        a = x;
        b = y;
        result = cleanNum(a * b);
      } else if (level === 4) {
        // Level 4: Directed Numbers & Squares
        const mode = Math.random();
        if (mode < 0.4) {
          // (-7) × (-4) = 28
          const x = -(Math.floor(Math.random() * 11) + 2);
          const y = -(Math.floor(Math.random() * 11) + 2);
          a = x;
          b = y;
          result = a * b;
        } else if (mode < 0.7) {
          // 6 × (-9) = -54 or (-8) × 7 = -56
          const isFirstNeg = Math.random() < 0.5;
          const mag1 = Math.floor(Math.random() * 11) + 2;
          const mag2 = Math.floor(Math.random() * 11) + 2;
          a = isFirstNeg ? -mag1 : mag1;
          b = isFirstNeg ? mag2 : -mag2;
          result = a * b;
        } else {
          // Squares: 7² = 49, 12² = 144
          const rootVal = Math.floor(Math.random() * 11) + 3; // 3 to 13
          a = rootVal;
          b = rootVal;
          result = rootVal * rootVal;
          expression = `${rootVal}²`;
        }
      } else {
        // Level 5: Stage 7 Multiplication Mastery
        const pick = Math.random();
        if (pick < 0.35) return this.generateByLevel('×', 2);
        if (pick < 0.7) return this.generateByLevel('×', 3);
        return this.generateByLevel('×', 4);
      }

    } else if (op === '÷') {
      if (level === 1) {
        // Level 1: 144 ÷ 12 Speed Facts
        const divisor = Math.floor(Math.random() * 10) + 3;
        const quotient = Math.floor(Math.random() * 11) + 2;
        b = divisor;
        result = quotient;
        a = b * result;
      } else if (level === 2) {
        // Level 2: Multi-digit Mental Division (e.g. 180 ÷ 15 = 12, 360 ÷ 12 = 30)
        const pairs = [
          [180, 15, 12], [360, 12, 30], [150, 25, 6], [240, 20, 12], [200, 8, 25],
          [450, 15, 30], [480, 60, 8], [300, 25, 12], [420, 14, 30], [225, 15, 15],
          [350, 50, 7], [640, 16, 40], [280, 14, 20], [320, 16, 20]
        ];
        const selected = pairs[Math.floor(Math.random() * pairs.length)];
        a = selected[0];
        b = selected[1];
        result = selected[2];
      } else if (level === 3) {
        // Level 3: Decimal Division (e.g. 4.8 ÷ 0.12, 7.2 ÷ 9, 36 ÷ 0.6)
        const decimalPairs = [
          [4.8, 0.12, 40], [7.2, 9, 0.8], [36, 0.6, 60], [4.5, 0.5, 9],
          [0.72, 0.8, 0.9], [2.4, 0.4, 6], [8.4, 0.7, 12], [5.6, 0.8, 7],
          [6.3, 0.9, 7], [1.44, 0.12, 12], [9.6, 0.8, 12], [10.8, 0.9, 12],
          [15, 0.5, 30], [2.7, 0.3, 9], [3.2, 0.08, 40]
        ];
        const selected = decimalPairs[Math.floor(Math.random() * decimalPairs.length)];
        a = cleanNum(selected[0]);
        b = cleanNum(selected[1]);
        result = cleanNum(selected[2]);
      } else if (level === 4) {
        // Level 4: Directed Number Division ((-72) ÷ (-8) = 9, (-56) ÷ 7 = -8)
        const magDivisor = Math.floor(Math.random() * 11) + 2;
        const magQuotient = Math.floor(Math.random() * 11) + 2;
        const magDividend = magDivisor * magQuotient;

        const mode = Math.random();
        if (mode < 0.4) {
          a = -magDividend;
          b = -magDivisor;
          result = magQuotient;
        } else if (mode < 0.7) {
          a = -magDividend;
          b = magDivisor;
          result = -magQuotient;
        } else {
          a = magDividend;
          b = -magDivisor;
          result = -magQuotient;
        }
      } else {
        // Level 5: Stage 7 Division Mastery
        const pick = Math.random();
        if (pick < 0.35) return this.generateByLevel('÷', 2);
        if (pick < 0.7) return this.generateByLevel('÷', 3);
        return this.generateByLevel('÷', 4);
      }
    }

    const q = { op, a, b, result };
    if (expression) q.expression = expression;
    return q;
  }

  generateByDifficulty(op, difficulty = 'easy') {
    if (op === '+') {
      if (difficulty === 'easy') {
        return this.generateByLevel('+', 1);
      } else if (difficulty === 'medium') {
        const lvl = Math.random() < 0.5 ? 2 : 3;
        return this.generateByLevel('+', lvl);
      } else {
        const lvl = Math.random() < 0.5 ? 4 : 5;
        return this.generateByLevel('+', lvl);
      }
    } else if (op === '-') {
      if (difficulty === 'easy') {
        return this.generateByLevel('-', 1);
      } else if (difficulty === 'medium') {
        const lvl = Math.random() < 0.5 ? 2 : 3;
        return this.generateByLevel('-', lvl);
      } else {
        const lvl = Math.random() < 0.5 ? 4 : 5;
        return this.generateByLevel('-', lvl);
      }
    } else if (op === '×' || op === '*') {
      if (difficulty === 'easy') {
        return this.generateByLevel('×', 1);
      } else if (difficulty === 'medium') {
        const lvl = Math.random() < 0.5 ? 2 : 3;
        return this.generateByLevel('×', lvl);
      } else {
        const lvl = Math.random() < 0.5 ? 4 : 5;
        return this.generateByLevel('×', lvl);
      }
    } else if (op === '÷' || op === '/') {
      if (difficulty === 'easy') {
        return this.generateByLevel('÷', 1);
      } else if (difficulty === 'medium') {
        const lvl = Math.random() < 0.5 ? 2 : 3;
        return this.generateByLevel('÷', lvl);
      } else {
        const lvl = Math.random() < 0.5 ? 4 : 5;
        return this.generateByLevel('÷', lvl);
      }
    }

    return this.generateByLevel('+', 1);
  }

  generateQuestion(catOrOp = this.currentCategory, levelOrSubCat = this.currentSubCategory) {
    // 1. Legacy support: if levelOrSubCat is numeric (e.g. 1..5), run generateByLevel directly
    if (typeof levelOrSubCat === 'number') {
      const opMap = { add: '+', sub: '-', mul: '×', div: '÷', '+': '+', '-': '-', '×': '×', '÷': '÷', '*': '×', '/': '÷' };
      const op = opMap[catOrOp] || '+';
      return this.generateByLevel(op, levelOrSubCat);
    }

    // 2. Determine progressive difficulty tier
    let subCategory = levelOrSubCat || this.currentSubCategory || 'easy';
    let tier = subCategory;
    if (subCategory === 'all') {
      tier = this.getProgressiveTier(this.streak);
    }
    if (!['easy', 'medium', 'hard'].includes(tier)) {
      tier = 'easy';
    }

    // 3. In all_mixed Hard mode, include BIDMAS mental expressions
    if ((catOrOp === 'all_mixed' || catOrOp === 'all') && tier === 'hard' && Math.random() < 0.4) {
      const bq = BIDMAS_QUESTIONS[Math.floor(Math.random() * BIDMAS_QUESTIONS.length)];
      return {
        op: bq.op,
        a: bq.a,
        b: bq.b,
        result: bq.result,
        expression: bq.expression,
        explanation: bq.explanation,
        category: 'all_mixed',
        subCategory,
        tier
      };
    }

    // 4. Determine operation from category
    const cat = CATEGORIES.find(c => c.id === catOrOp || c.symbol === catOrOp);
    let chosenOp = '+';
    if (cat && cat.ops && cat.ops.length > 0) {
      chosenOp = cat.ops[Math.floor(Math.random() * cat.ops.length)];
    } else if (['+', '-', '×', '÷'].includes(catOrOp)) {
      chosenOp = catOrOp;
    }

    const question = this.generateByDifficulty(chosenOp, tier);
    question.category = cat ? cat.id : catOrOp;
    question.subCategory = subCategory;
    question.tier = tier;
    return question;
  }

  nextQuestion() {
    clearTimeout(this.autoAdvanceTimer);
    if (this.isSpeaking) {
      sound.stopSpeech();
      this.isSpeaking = false;
      if (this.dom && this.dom.speakBtn) {
        this.dom.speakBtn.textContent = '📢 Explain';
        this.dom.speakBtn.classList.remove('speaking');
      }
    }

    this.userAnswer = '';
    if (this.activeExam && !this.activeExam.completed) {
      this.currentQuestion = this.activeExam.questions[this.activeExam.index];
    } else {
      this.currentQuestion = this.generateQuestion(this.currentCategory, this.currentSubCategory);
    }
    this.currentOp = this.currentQuestion.op;

    if (this.dom) {
      if (this.activeExam && !this.activeExam.completed) {
        if (this.dom.examActiveBanner) this.dom.examActiveBanner.classList.remove('hidden');
        if (this.dom.examActiveTitle) {
          this.dom.examActiveTitle.textContent = `📄 ${this.activeExam.title} • Q${this.activeExam.index + 1} of ${this.activeExam.questions.length} (${this.currentQuestion.section || 'Exam'})`;
        }
        if (this.dom.examQuestionMarks) {
          const m = this.currentQuestion.marks || 1;
          this.dom.examQuestionMarks.textContent = `[${m} ${m === 1 ? 'Mark' : 'Marks'}]`;
        }
      } else if (this.dom.examActiveBanner) {
        this.dom.examActiveBanner.classList.add('hidden');
      }

      if (this.dom.examWordContext) {
        if (this.currentQuestion.wordPrompt) {
          this.dom.examWordContext.classList.remove('hidden');
          this.dom.examWordContext.innerHTML = `📝 <strong>Word Problem:</strong> ${this.currentQuestion.wordPrompt}`;
        } else {
          this.dom.examWordContext.classList.add('hidden');
          this.dom.examWordContext.textContent = '';
        }
      }

      if (this.currentQuestion.expression) {
        if (this.dom.numA) this.dom.numA.textContent = this.currentQuestion.expression;
        if (this.dom.opSymbol) this.dom.opSymbol.textContent = '';
        if (this.dom.numB) this.dom.numB.textContent = '';
      } else {
        if (this.dom.numA) this.dom.numA.textContent = this.currentQuestion.a;
        if (this.dom.opSymbol) this.dom.opSymbol.textContent = this.currentQuestion.op;
        if (this.dom.numB) {
          const bVal = this.currentQuestion.b;
          this.dom.numB.textContent = (typeof bVal === 'number' && bVal < 0) ? `(${bVal})` : bVal;
        }
      }

      if (this.dom.answerDisplay) {
        this.dom.answerDisplay.textContent = '?';
        this.dom.answerDisplay.classList.remove('correct', 'incorrect');
      }

      if (this.dom.feedbackMsg) {
        this.dom.feedbackMsg.textContent = '';
        this.dom.feedbackMsg.className = 'feedback-msg';
      }

      if (this.dom.captionBar) {
        this.dom.captionBar.textContent = 'Tap 📢 Explain to hear step-by-step guidance.';
      }

      // Reset breakdown area
      if (this.dom.breakdownContainer) {
        this.dom.breakdownContainer.classList.add('hidden');
        this.dom.breakdownContainer.innerHTML = '';
        if (this.dom.breakdownBtn) this.dom.breakdownBtn.textContent = 'Break it Down 🧩';
      }

      // Auto-update visualizer if open
      if (this.dom.visContainer && !this.dom.visContainer.classList.contains('hidden')) {
        this.renderVisualizer();
      }
    }

    this.updateGradualIndicator();

    if (this.settings.autoSpeak) {
      this.speakCurrentQuestion();
    }
  }

  handleKeyInput(val) {
    sound.playTap();

    if (val === 'clear') {
      this.userAnswer = '';
    } else if (val === 'backspace') {
      this.userAnswer = this.userAnswer.slice(0, -1);
    } else if (val === '-') {
      // Toggle or insert minus sign for directed numbers
      if (this.userAnswer.startsWith('-')) {
        this.userAnswer = this.userAnswer.slice(1);
      } else {
        this.userAnswer = '-' + this.userAnswer;
      }
    } else if (val === '.') {
      // Decimal point for decimal calculations
      if (!this.userAnswer.includes('.')) {
        if (this.userAnswer === '' || this.userAnswer === '-') {
          this.userAnswer += '0.';
        } else {
          this.userAnswer += '.';
        }
      }
    } else {
      // Support up to 8 characters for negative decimals (e.g. -12.45)
      if (this.userAnswer.length < 8) {
        this.userAnswer += val;
      }
    }

    if (this.dom && this.dom.answerDisplay) {
      this.dom.answerDisplay.textContent = this.userAnswer === '' ? '?' : this.userAnswer;
    }
  }

  submitAnswer() {
    if (this.userAnswer === '' || this.userAnswer === '?' || this.userAnswer === '-') return;

    const entered = parseFloat(this.userAnswer);
    if (isNaN(entered)) return;

    // If inside an active Past Exam Paper
    if (this.activeExam && !this.activeExam.completed) {
      const res = this.submitExamAnswer(entered);
      if (res && res.isCorrect) {
        sound.playSuccess();
        this.totalSolved++;
        this.xp += res.earnedMarks * 10;
        if (this.dom && this.dom.answerDisplay) this.dom.answerDisplay.classList.add('correct');
        if (this.dom && this.dom.feedbackMsg) {
          this.dom.feedbackMsg.textContent = `✅ Correct! +${res.earnedMarks} ${res.earnedMarks === 1 ? 'Mark' : 'Marks'}`;
          this.dom.feedbackMsg.className = 'feedback-msg success-burst';
        }
      } else {
        sound.playGentleTryAgain();
        if (this.dom && this.dom.answerDisplay) this.dom.answerDisplay.classList.add('incorrect');
        if (this.dom && this.dom.feedbackMsg) {
          this.dom.feedbackMsg.textContent = `📝 Recorded (${entered}). Moving to next exam question...`;
          this.dom.feedbackMsg.className = 'feedback-msg try-again';
        }
      }
      this.updateStatsUI();
      this.saveState();

      this.autoAdvanceTimer = setTimeout(() => {
        if (this.activeExam && this.activeExam.completed) {
          this.showExamReportCard();
        } else {
          this.nextQuestion();
        }
      }, 650);
      return;
    }

    const correct = this.currentQuestion.result;
    const isCorrect = Math.abs(entered - correct) < 0.0001;

    if (isCorrect) {
      this.handleCorrect();
    } else {
      this.handleIncorrect();
    }
  }

  handleCorrect() {
    sound.playSuccess();

    this.streak++;
    if (this.streak > this.bestStreak) {
      this.bestStreak = this.streak;
    }
    this.totalSolved++;
    const bonus = Math.min(5, Math.floor(this.streak / 3)) * 5;
    this.xp += 10 + bonus;

    if (this.dom.answerDisplay) {
      this.dom.answerDisplay.classList.add('correct');
    }

    const praises = [
      'Awesome job Justin! 🌟',
      'Spot on! You crushed it! 🚀',
      'Number power leveled up! ⚡',
      'Brilliant thinking! 🧠',
      'Rock solid mental maths! 💎',
      'Unstoppable streak! 🔥'
    ];
    const praise = praises[Math.floor(Math.random() * praises.length)];

    if (this.dom.feedbackMsg) {
      this.dom.feedbackMsg.textContent = `${praise} +${10 + bonus} XP`;
      this.dom.feedbackMsg.className = 'feedback-msg success-burst';
    }

    // Streak celebration
    if (this.streak > 0 && this.streak % 5 === 0) {
      sound.playStreakBonus();
      this.launchConfetti();
    }

    this.updateStatsUI();
    this.updateGradualIndicator();
    this.saveState();

    // Auto advance after 1.2 seconds
    this.autoAdvanceTimer = setTimeout(() => {
      this.nextQuestion();
    }, 1200);
  }

  handleIncorrect() {
    sound.playGentleTryAgain();

    // Neurodivergent-friendly: Don't brutally wipe streak to 0. Drop by only 1 to prevent frustration meltdown.
    if (this.streak > 0) this.streak -= 1;

    if (this.dom.answerDisplay) {
      this.dom.answerDisplay.classList.add('incorrect');
      setTimeout(() => {
        this.dom.answerDisplay.classList.remove('incorrect');
      }, 500);
    }

    if (this.dom.feedbackMsg) {
      this.dom.feedbackMsg.textContent = 'Almost there! Take a breath. Look at the visualizer below! 👇';
      this.dom.feedbackMsg.className = 'feedback-msg try-again';
    }

    // Auto-open visualizer to help Justin see the quantity physically
    if (this.dom.visContainer && this.dom.visContainer.classList.contains('hidden')) {
      this.dom.visContainer.classList.remove('hidden');
      if (this.dom.visToggleBtn) this.dom.visToggleBtn.textContent = 'Hide Visualizer 👁️';
    }
    this.renderVisualizer();

    // Auto show breakdown
    this.toggleBreakdown(true);

    this.updateStatsUI();
    this.updateGradualIndicator();
  }

  renderVisualizer() {
    if (!this.visualizer || !this.currentQuestion) return;
    this.visualizer.render(
      this.currentQuestion.op,
      this.currentQuestion.a,
      this.currentQuestion.b,
      this.currentQuestion.result
    );
  }

  toggleBreakdown(forceShow = false) {
    if (!this.dom.breakdownContainer) return;
    const isHidden = this.dom.breakdownContainer.classList.contains('hidden');

    if (!isHidden && !forceShow) {
      this.dom.breakdownContainer.classList.add('hidden');
      this.dom.breakdownContainer.innerHTML = '';
      if (this.dom.breakdownBtn) this.dom.breakdownBtn.textContent = 'Break it Down 🧩';
      return;
    }

    this.dom.breakdownContainer.classList.remove('hidden');
    if (this.dom.breakdownBtn) this.dom.breakdownBtn.textContent = 'Hide Breakdown 🧩';
    const { op, a, b, result, expression, explanation } = this.currentQuestion;

    let html = '<div class="breakdown-card"><h4>🧩 Step-by-Step Breakdown</h4>';

    // 0. BIDMAS / Explicit Expression Breakdown
    if (expression || explanation) {
      const exprText = expression || `${a} ${op} ${b}`;
      const explText = explanation || `${exprText} = ${result}`;
      html += `
        <div class="bd-step"><strong>Problem / Expression:</strong> <span class="highlight-total">${exprText}</span></div>
        <div class="bd-step"><strong>Step-by-Step Strategy:</strong> ${explText}</div>
        <div class="bd-step"><strong>Final Value:</strong> <span class="highlight-total">${result}</span></div>
      `;
      html += '</div>';
      this.dom.breakdownContainer.innerHTML = html;
      return;
    }

    const isNegA = typeof a === 'number' && a < 0;
    const isNegB = typeof b === 'number' && b < 0;
    const hasDec = typeof a === 'number' && typeof b === 'number' && (!Number.isInteger(a) || !Number.isInteger(b));

    if (op === '+') {
      if (isNegA || isNegB) {
        if (isNegA && isNegB) {
          html += `
            <div class="bd-step"><strong>Negative + Negative:</strong> Start at ${a} and move ${Math.abs(b)} steps further left into the negatives.</div>
            <div class="bd-step"><strong>Combine:</strong> -(${Math.abs(a)} + ${Math.abs(b)}) = <span class="highlight-total">${result}</span></div>
          `;
        } else if (isNegA && !isNegB) {
          html += `
            <div class="bd-step"><strong>Crossing Zero:</strong> Start at negative ${a}. Adding positive ${b} moves ${b} steps right towards and past zero.</div>
            <div class="bd-step"><strong>Calculation:</strong> ${b} - ${Math.abs(a)} = <span class="highlight-total">${result}</span></div>
          `;
        } else {
          html += `
            <div class="bd-step"><strong>Adding a Negative:</strong> Adding a negative is equivalent to subtracting: ${a} + (${b}) = ${a} - ${Math.abs(b)}.</div>
            <div class="bd-step"><strong>Calculation:</strong> ${a} - ${Math.abs(b)} = <span class="highlight-total">${result}</span></div>
          `;
        }
      } else if (hasDec) {
        html += `
          <div class="bd-step"><strong>Step 1 (Place Value Alignment):</strong> Line up decimal points vertically in columns.</div>
          <div class="bd-step"><strong>Step 2 (Column Addition):</strong> Add hundredths to hundredths, tenths to tenths, and whole numbers.</div>
          <div class="bd-step"><strong>Total:</strong> ${a} + ${b} = <span class="highlight-total">${result}</span></div>
        `;
      } else if (a >= 100 || b >= 100) {
        const aH = Math.floor(a / 100) * 100;
        const bH = Math.floor(b / 100) * 100;
        const aRem = a % 100;
        const bRem = b % 100;
        html += `
          <div class="bd-step"><strong>Step 1 (Hundreds):</strong> ${aH} + ${bH} = <span class="highlight-tens">${aH + bH}</span></div>
          <div class="bd-step"><strong>Step 2 (Tens & Ones):</strong> ${aRem} + ${bRem} = <span class="highlight-ones">${aRem + bRem}</span></div>
          <div class="bd-step"><strong>Step 3 (Combine):</strong> ${aH + bH} + ${aRem + bRem} = <span class="highlight-total">${result}</span></div>
        `;
      } else if (a >= 10 && b >= 10) {
        const aT = Math.floor(a / 10) * 10;
        const aO = a % 10;
        const bT = Math.floor(b / 10) * 10;
        const bO = b % 10;
        html += `
          <div class="bd-step"><strong>Step 1 (Tens):</strong> ${aT} + ${bT} = <span class="highlight-tens">${aT + bT}</span></div>
          <div class="bd-step"><strong>Step 2 (Ones):</strong> ${aO} + ${bO} = <span class="highlight-ones">${aO + bO}</span></div>
          <div class="bd-step"><strong>Step 3 (Combine):</strong> ${aT + bT} + ${aO + bO} = <span class="highlight-total">${result}</span></div>
        `;
      } else if (a < 10 && b < 10 && a + b > 10) {
        const bigger = Math.max(a, b);
        const smaller = Math.min(a, b);
        const need = 10 - bigger;
        const rest = smaller - need;
        html += `
          <div class="bd-step"><strong>Make 10:</strong> Start with ${bigger}. Add <span class="highlight-ones">${need}</span> from ${smaller} to make <strong>10</strong>.</div>
          <div class="bd-step"><strong>Add Leftover:</strong> You have <span class="highlight-ones">${rest}</span> left from ${smaller}.</div>
          <div class="bd-step"><strong>Total:</strong> 10 + ${rest} = <span class="highlight-total">${result}</span></div>
        `;
      } else if ((a >= 10 && b < 10) || (b >= 10 && a < 10)) {
        const twoD = a >= 10 ? a : b;
        const oneD = a >= 10 ? b : a;
        const tens = Math.floor(twoD / 10) * 10;
        const ones = twoD % 10;
        html += `
          <div class="bd-step"><strong>Step 1 (Tens):</strong> Keep <span class="highlight-tens">${tens}</span> in mind.</div>
          <div class="bd-step"><strong>Step 2 (Ones):</strong> ${ones} + ${oneD} = <span class="highlight-ones">${ones + oneD}</span></div>
          <div class="bd-step"><strong>Step 3 (Combine):</strong> ${tens} + ${ones + oneD} = <span class="highlight-total">${result}</span></div>
        `;
      } else {
        html += `<div class="bd-step">Start at <strong>${Math.max(a, b)}</strong> and count on <strong>${Math.min(a, b)}</strong> more to reach <span class="highlight-total">${result}</span>.</div>`;
      }
    } else if (op === '-' || op === '−') {
      if (isNegA || isNegB || (typeof a === 'number' && typeof b === 'number' && a < b)) {
        if (isNegB) {
          html += `
            <div class="bd-step"><strong>Subtracting a Negative:</strong> Two minus signs cancel into addition: ${a} - (${b}) = ${a} + ${Math.abs(b)}.</div>
            <div class="bd-step"><strong>Calculation:</strong> ${a} + ${Math.abs(b)} = <span class="highlight-total">${result}</span></div>
          `;
        } else if (isNegA) {
          html += `
            <div class="bd-step"><strong>Start in Negatives:</strong> From ${a}, subtracting ${b} moves ${b} steps further left into the negatives.</div>
            <div class="bd-step"><strong>Result:</strong> -(${Math.abs(a)} + ${b}) = <span class="highlight-total">${result}</span></div>
          `;
        } else {
          html += `
            <div class="bd-step"><strong>Crossing Zero:</strong> Subtracting ${b} from smaller ${a} crosses 0 into negative numbers.</div>
            <div class="bd-step"><strong>Calculation:</strong> ${a} - ${b} = -(${b} - ${a}) = <span class="highlight-total">${result}</span></div>
          `;
        }
      } else if (hasDec) {
        html += `
          <div class="bd-step"><strong>Step 1 (Place Value Alignment):</strong> Line up decimal points vertically in columns.</div>
          <div class="bd-step"><strong>Step 2 (Column Subtraction):</strong> Subtract hundredths from hundredths, tenths from tenths, borrowing from units as needed.</div>
          <div class="bd-step"><strong>Difference:</strong> ${a} - ${b} = <span class="highlight-total">${result}</span></div>
        `;
      } else if (a >= 100) {
        const bH = Math.floor(b / 100) * 100;
        const bRem = b % 100;
        html += `
          <div class="bd-step"><strong>Step 1 (Subtract Hundreds):</strong> ${a} - ${bH} = <span class="highlight-tens">${a - bH}</span></div>
          <div class="bd-step"><strong>Step 2 (Subtract Remainder):</strong> ${a - bH} - ${bRem} = <span class="highlight-total">${result}</span></div>
        `;
      } else if (a >= 10 && b >= 10 && (a % 10) >= (b % 10)) {
        const aT = Math.floor(a / 10) * 10;
        const aO = a % 10;
        const bT = Math.floor(b / 10) * 10;
        const bO = b % 10;
        html += `
          <div class="bd-step"><strong>Step 1 (Tens):</strong> ${aT} - ${bT} = <span class="highlight-tens">${aT - bT}</span></div>
          <div class="bd-step"><strong>Step 2 (Ones):</strong> ${aO} - ${bO} = <span class="highlight-ones">${aO - bO}</span></div>
          <div class="bd-step"><strong>Step 3 (Combine):</strong> ${aT - bT} + ${aO - bO} = <span class="highlight-total">${result}</span></div>
        `;
      } else if (a >= 10 && b >= 10) {
        const nextTen = Math.ceil(b / 10) * 10;
        const jump1 = nextTen - b;
        const jump2 = a - nextTen;
        if (jump2 === 0) {
          html += `
            <div class="bd-step"><strong>Jump 1:</strong> From ${b} up to ${a} is <span class="highlight-total">+${jump1}</span></div>
            <div class="bd-step"><strong>Total Difference:</strong> <span class="highlight-total">${result}</span></div>
          `;
        } else {
          html += `
            <div class="bd-step"><strong>Jump 1:</strong> From ${b} up to ${nextTen} is <span class="highlight-ones">+${jump1}</span></div>
            <div class="bd-step"><strong>Jump 2:</strong> From ${nextTen} up to ${a} is <span class="highlight-tens">+${jump2}</span></div>
            <div class="bd-step"><strong>Total Difference:</strong> ${jump1} + ${jump2} = <span class="highlight-total">${result}</span></div>
          `;
        }
      } else if (a >= 10 && b < 10) {
        const aT = Math.floor(a / 10) * 10;
        const aO = a % 10;
        if (aO >= b) {
          html += `
            <div class="bd-step"><strong>Step 1 (Tens):</strong> Keep <span class="highlight-tens">${aT}</span></div>
            <div class="bd-step"><strong>Step 2 (Ones):</strong> ${aO} - ${b} = <span class="highlight-ones">${aO - b}</span></div>
            <div class="bd-step"><strong>Step 3 (Combine):</strong> ${aT} + ${aO - b} = <span class="highlight-total">${result}</span></div>
          `;
        } else {
          html += `
            <div class="bd-step"><strong>Jump 1:</strong> Count back ${aO} steps to reach <strong>${aT}</strong></div>
            <div class="bd-step"><strong>Jump 2:</strong> Count back ${b - aO} more from ${aT} &rarr; lands on <span class="highlight-total">${result}</span></div>
          `;
        }
      } else {
        html += `<div class="bd-step">Start at <strong>${a}</strong>, count back <strong>${b}</strong> steps &rarr; lands on <span class="highlight-total">${result}</span>.</div>`;
      }
    } else if (op === '×') {
      if (isNegA || isNegB) {
        const signNote = (isNegA && isNegB)
          ? 'Two negatives multiplied make a positive: (-) × (-) = (+).'
          : 'A negative and a positive make a negative: (-) × (+) = (-).';
        html += `
          <div class="bd-step"><strong>Step 1 (Sign Rule):</strong> ${signNote}</div>
          <div class="bd-step"><strong>Step 2 (Magnitudes):</strong> ${Math.abs(a)} × ${Math.abs(b)} = <span class="highlight-ones">${Math.abs(result)}</span></div>
          <div class="bd-step"><strong>Step 3 (Result):</strong> <span class="highlight-total">${result}</span></div>
        `;
      } else if (hasDec) {
        html += `
          <div class="bd-step"><strong>Step 1 (Place Value):</strong> Count the total decimal places in both factors.</div>
          <div class="bd-step"><strong>Step 2 (Multiply Integers):</strong> Multiply the numbers as whole integers, then shift the decimal point.</div>
          <div class="bd-step"><strong>Result:</strong> ${a} × ${b} = <span class="highlight-total">${result}</span></div>
        `;
      } else if (a === b) {
        html += `
          <div class="bd-step"><strong>Square Number:</strong> Squaring a number means multiplying it by itself.</div>
          <div class="bd-step"><strong>Calculation:</strong> ${a}² = ${a} × ${a} = <span class="highlight-total">${result}</span></div>
        `;
      } else if (a >= 10 && Number.isInteger(a) && b >= 2 && Number.isInteger(b)) {
        const aT = Math.floor(a / 10) * 10;
        const aO = a % 10;
        html += `
          <div class="bd-step"><strong>Step 1 (Partition):</strong> Break ${a} into ${aT} + ${aO}.</div>
          <div class="bd-step"><strong>Step 2:</strong> (${aT} × ${b}) = <span class="highlight-tens">${aT * b}</span> and (${aO} × ${b}) = <span class="highlight-ones">${aO * b}</span></div>
          <div class="bd-step"><strong>Step 3 (Combine):</strong> ${aT * b} + ${aO * b} = <span class="highlight-total">${result}</span></div>
        `;
      } else if (Number.isInteger(a) && a > 0 && a <= 12) {
        html += `
          <div class="bd-step">Think of ${a} groups, with ${b} items in each group.</div>
          <div class="bd-step">Repeated addition: ${Array(a).fill(b).join(' + ')} = <span class="highlight-total">${result}</span></div>
        `;
      } else {
        html += `<div class="bd-step">Multiply <strong>${a}</strong> by <strong>${b}</strong> &rarr; <span class="highlight-total">${result}</span>.</div>`;
      }
    } else if (op === '÷') {
      if (isNegA || isNegB) {
        const signNote = (isNegA && isNegB)
          ? 'Dividing two negatives yields a positive: (-) ÷ (-) = (+).'
          : 'Dividing opposite signs yields a negative: (-) ÷ (+) = (-).';
        html += `
          <div class="bd-step"><strong>Step 1 (Sign Rule):</strong> ${signNote}</div>
          <div class="bd-step"><strong>Step 2 (Magnitudes):</strong> ${Math.abs(a)} ÷ ${Math.abs(b)} = <span class="highlight-ones">${Math.abs(result)}</span></div>
          <div class="bd-step"><strong>Step 3 (Result):</strong> <span class="highlight-total">${result}</span></div>
        `;
      } else if (hasDec) {
        html += `
          <div class="bd-step"><strong>Step 1 (Shift Decimals):</strong> Multiply dividend and divisor by powers of 10 to make divisor a whole integer.</div>
          <div class="bd-step"><strong>Step 2 (Mental Division):</strong> Compute the equivalent integer division.</div>
          <div class="bd-step"><strong>Result:</strong> ${a} ÷ ${b} = <span class="highlight-total">${result}</span></div>
        `;
      } else if (a >= 100 && Number.isInteger(a) && Number.isInteger(b)) {
        html += `
          <div class="bd-step"><strong>Mental Partition:</strong> Check how many times ${b} fits into ${a}.</div>
          <div class="bd-step"><strong>Check with multiplication:</strong> ${b} × ${result} = <span class="highlight-total">${a}</span></div>
          <div class="bd-step"><strong>Quotient:</strong> <span class="highlight-total">${result}</span></div>
        `;
      } else {
        html += `
          <div class="bd-step">Find how many times <strong>${b}</strong> fits into <strong>${a}</strong>.</div>
          <div class="bd-step">Multiplication fact: <strong>${b} × ${result} = ${a}</strong></div>
          <div class="bd-step">Answer: <span class="highlight-total">${result}</span></div>
        `;
      }
    }

    html += '</div>';
    this.dom.breakdownContainer.innerHTML = html;
  }

  speakCurrentQuestion() {
    if (!this.currentQuestion) return;

    if (this.isSpeaking) {
      sound.stopSpeech();
      this.isSpeaking = false;
      if (this.dom.speakBtn) {
        this.dom.speakBtn.textContent = '📢 Explain';
        this.dom.speakBtn.classList.remove('speaking');
      }
      return;
    }

    const { op, a, b, result, wordPrompt, explanation } = this.currentQuestion;
    const baseExplanation = explanation ? explanation : generateVerbalExplanation(op, a, b, result);
    const text = wordPrompt ? `${wordPrompt} ${baseExplanation}` : baseExplanation;

    if (this.dom.captionBar) {
      this.dom.captionBar.innerHTML = `🗣️ <em>"${text}"</em>`;
    }

    this.isSpeaking = true;
    if (this.dom.speakBtn) {
      this.dom.speakBtn.textContent = '⏹️ Stop';
      this.dom.speakBtn.classList.add('speaking');
    }

    sound.speak(text, () => {
      this.isSpeaking = true;
      if (this.dom.speakBtn) {
        this.dom.speakBtn.textContent = '⏹️ Stop';
        this.dom.speakBtn.classList.add('speaking');
      }
    }, () => {
      this.isSpeaking = false;
      if (this.dom.speakBtn) {
        this.dom.speakBtn.textContent = '📢 Explain';
        this.dom.speakBtn.classList.remove('speaking');
      }
    });
  }

  updateStatsUI() {
    if (!this.dom) return;
    if (this.dom.streakVal) this.dom.streakVal.textContent = this.streak;
    if (this.dom.solvedVal) this.dom.solvedVal.textContent = this.totalSolved;
    if (this.dom.xpVal) this.dom.xpVal.textContent = this.xp;

    // Badge calculation (Grade 7 Cambridge Mental Math Standards)
    let badge = '🌱 Stage 7 Explorer';
    if (this.xp >= 1000) badge = '👑 Cambridge Stage 7 Grandmaster';
    else if (this.xp >= 600) badge = '⚡ Mental Mathlete Champion';
    else if (this.xp >= 300) badge = '🛡️ Stage 7 Scholar';
    else if (this.xp >= 100) badge = '🔥 Number Sense Pioneer';

    if (this.dom.levelBadge) {
      this.dom.levelBadge.textContent = badge;
    }
  }

  // =========================================================================
  // PAST EXAM PAPERS ENGINE
  // =========================================================================

  switchMode(mode) {
    clearTimeout(this.autoAdvanceTimer);
    sound.stopSpeech();
    this.isSpeaking = false;
    this.currentMode = mode === 'papers' ? 'papers' : 'grinder';

    if (!this.dom) return;
    if (this.dom.modeGrinderBtn) this.dom.modeGrinderBtn.classList.toggle('active', this.currentMode === 'grinder');
    if (this.dom.modePapersBtn) this.dom.modePapersBtn.classList.toggle('active', this.currentMode === 'papers');

    if (this.currentMode === 'papers') {
      this.activeExam = null;
      if (this.dom.examActiveBanner) this.dom.examActiveBanner.classList.add('hidden');
      if (this.dom.grinderSelectorsWrap) this.dom.grinderSelectorsWrap.classList.add('hidden');
      if (this.dom.questionWorkspaceWrap) this.dom.questionWorkspaceWrap.classList.add('hidden');
      if (this.dom.pastPapersView) this.dom.pastPapersView.classList.remove('hidden');
      this.renderPastPapersGrid();
    } else {
      this.activeExam = null;
      if (this.dom.examActiveBanner) this.dom.examActiveBanner.classList.add('hidden');
      if (this.dom.pastPapersView) this.dom.pastPapersView.classList.add('hidden');
      if (this.dom.grinderSelectorsWrap) this.dom.grinderSelectorsWrap.classList.remove('hidden');
      if (this.dom.questionWorkspaceWrap) this.dom.questionWorkspaceWrap.classList.remove('hidden');
      this.nextQuestion();
    }
  }

  renderPastPapersGrid() {
    if (!this.dom || !this.dom.pastPapersGrid) return;
    this.dom.pastPapersGrid.innerHTML = PAST_EXAM_PAPERS.map(paper => {
      const best = this.paperBestScores[paper.id];
      const bestHtml = best !== undefined
        ? `<div class="paper-best-score">🏆 Best Score: ${best}%</div>`
        : `<div class="paper-best-score" style="color:var(--text-muted);">📝 Not attempted yet</div>`;

      return `
        <article class="paper-card">
          <div class="paper-card-top">
            <span class="paper-term-badge">${paper.term}</span>
            <span class="paper-marks-badge">${paper.questions.length} Qs &bull; ${paper.totalMarks} Marks</span>
          </div>
          <h3>${paper.title}</h3>
          <p>${paper.desc}</p>
          ${bestHtml}
          <div class="paper-actions-row">
            <button class="paper-start-btn" data-paper="${paper.id}" data-variant="false">✍️ Start Past Paper</button>
            <button class="paper-variant-btn" data-paper="${paper.id}" data-variant="true" title="Practise same paper structure with fresh numbers">🎲 Fresh Variant</button>
          </div>
        </article>
      `;
    }).join('');

    this.dom.pastPapersGrid.querySelectorAll('button[data-paper]').forEach(btn => {
      btn.addEventListener('click', () => {
        const paperId = btn.dataset.paper;
        const asVariant = btn.dataset.variant === 'true';
        this.startExamPaper(paperId, asVariant);
      });
    });
  }

  buildDynamicWordPrompt(op, a, b) {
    if (op === '+') {
      const templates = [
        `Justin has ${a} marbles and wins ${b} more in a game. How many marbles does he have altogether?`,
        `A tuckshop sells ${a} pies on Monday and ${b} pies on Tuesday. How many pies were sold in total?`,
        `In a cricket match, a batsman scores ${a} runs in the first innings and ${b} runs in the second innings. What is his total score?`
      ];
      return templates[(a + b) % templates.length];
    } else if (op === '-') {
      const templates = [
        `A bus has ${a} passengers. At the first stop, ${b} passengers get off. How many passengers are left on the bus?`,
        `Liam saved R${a} and spent R${b} on a book. How many Rand does he have left?`,
        `A book has ${a} pages. Justin has already read ${b} pages. How many pages does he still need to read?`
      ];
      return templates[(a + b) % templates.length];
    } else if (op === '×') {
      const templates = [
        `There are ${a} boxes with ${b} crayons in each box. How many crayons are there altogether?`,
        `A pack costs R${b}. How much will ${a} packs cost in Rand?`,
        `A hall has ${a} rows of chairs with ${b} chairs in each row. How many chairs are there altogether?`
      ];
      return templates[(a + b) % templates.length];
    } else {
      const templates = [
        `Share ${a} sweets equally among ${b} friends. How many sweets does each friend get?`,
        `${a} apples are packed equally into ${b} crates. How many apples are in each crate?`,
        `A ${a} cm ribbon is cut into ${b} equal pieces. How many cm long is each piece?`
      ];
      return templates[(a + b) % templates.length];
    }
  }

  startExamPaper(paperId, asFreshVariant = false) {
    const found = PAST_EXAM_PAPERS.find(p => p.id === paperId) || PAST_EXAM_PAPERS[0];
    const questions = found.questions.map((q, idx) => {
      if (!asFreshVariant) {
        return { ...q, questionNumber: idx + 1 };
      }
      const generated = this.generateByLevel(q.op, q.level || 2);
      return {
        section: q.section,
        op: generated.op,
        a: generated.a,
        b: generated.b,
        result: generated.result,
        marks: q.marks || 1,
        level: q.level || 2,
        questionNumber: idx + 1,
        wordPrompt: q.wordPrompt ? this.buildDynamicWordPrompt(generated.op, generated.a, generated.b) : undefined
      };
    });

    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 1), 0);

    this.activeExam = {
      paperId: found.id,
      title: asFreshVariant ? `${found.title} (Fresh Variant)` : found.title,
      term: found.term,
      questions,
      totalMarks,
      index: 0,
      answers: [],
      completed: false,
      isVariant: asFreshVariant
    };

    if (this.dom) {
      if (this.dom.pastPapersView) this.dom.pastPapersView.classList.add('hidden');
      if (this.dom.grinderSelectorsWrap) this.dom.grinderSelectorsWrap.classList.add('hidden');
      if (this.dom.questionWorkspaceWrap) this.dom.questionWorkspaceWrap.classList.remove('hidden');
    }

    this.nextQuestion();
    return this.activeExam;
  }

  submitExamAnswer(enteredNum) {
    if (!this.activeExam || this.activeExam.completed) return null;
    const q = this.activeExam.questions[this.activeExam.index];
    const isCorrect = Math.abs(Number(enteredNum) - q.result) < 0.0001;
    const earnedMarks = isCorrect ? (q.marks || 1) : 0;

    this.activeExam.answers.push({
      question: q,
      userAnswer: enteredNum,
      isCorrect,
      earnedMarks,
      maxMarks: q.marks || 1
    });

    if (this.activeExam.index + 1 < this.activeExam.questions.length) {
      this.activeExam.index += 1;
    } else {
      this.activeExam.completed = true;
    }

    return { isCorrect, earnedMarks };
  }

  gradeExamPaper(exam = this.activeExam) {
    if (!exam) return null;
    const earnedMarks = exam.answers.reduce((acc, a) => acc + a.earnedMarks, 0);
    const totalMarks = exam.totalMarks || 1;
    const percentage = Math.round((earnedMarks / totalMarks) * 100);

    if (
      this.paperBestScores[exam.paperId] === undefined ||
      percentage > this.paperBestScores[exam.paperId]
    ) {
      this.paperBestScores[exam.paperId] = percentage;
      this.saveState();
    }

    const opStats = {
      '+': { op: '+', name: 'Addition (+)', catId: 'add', correct: 0, total: 0 },
      '-': { op: '-', name: 'Subtraction (-)', catId: 'sub', correct: 0, total: 0 },
      '×': { op: '×', name: 'Multiplication (×)', catId: 'mul', correct: 0, total: 0 },
      '÷': { op: '÷', name: 'Division (÷)', catId: 'div', correct: 0, total: 0 }
    };

    exam.answers.forEach(a => {
      const st = opStats[a.question.op];
      if (st) {
        st.total += 1;
        if (a.isCorrect) st.correct += 1;
      }
    });

    const activeOps = Object.values(opStats).filter(s => s.total > 0);
    const missedOps = activeOps.filter(s => s.correct < s.total);

    let recommendedCategory = 'all_mixed';
    if (missedOps.length === 1) {
      recommendedCategory = missedOps[0].catId;
    } else if (missedOps.length === 2) {
      const symbols = missedOps.map(m => m.op);
      if (symbols.includes('+') && symbols.includes('-')) recommendedCategory = 'mixed_add_sub';
      else if (symbols.includes('×') && symbols.includes('÷')) recommendedCategory = 'mixed_mul_div';
    }

    return {
      paperId: exam.paperId,
      title: exam.title,
      earnedMarks,
      totalMarks,
      percentage,
      correctCount: exam.answers.filter(a => a.isCorrect).length,
      totalQuestions: exam.questions.length,
      operationBreakdown: activeOps,
      missedOps,
      recommendedCategory,
      answers: exam.answers
    };
  }

  showExamReportCard() {
    const report = this.gradeExamPaper(this.activeExam);
    if (!report || !this.dom) return;

    sound.playStreakBonus();
    this.launchConfetti();

    if (this.dom.examActiveBanner) this.dom.examActiveBanner.classList.add('hidden');
    if (this.dom.questionWorkspaceWrap) this.dom.questionWorkspaceWrap.classList.add('hidden');
    if (this.dom.pastPapersView) this.dom.pastPapersView.classList.remove('hidden');
    this.renderPastPapersGrid();

    if (!this.dom.examReportContainer) return;
    this.dom.examReportContainer.classList.remove('hidden');

    const gradeLabel = report.percentage >= 80
      ? '🏆 Distinction! Exam Master!'
      : (report.percentage >= 60 ? '⭐ Good Pass! Keep Polishing!' : '💪 Great Effort! Practise Your Weak Spots Below!');

    const opsHtml = report.operationBreakdown.map(o => {
      const full = o.correct === o.total;
      return `
        <div class="exam-op-pill ${full ? 'exam-op-pass' : 'exam-op-miss'}">
          ${full ? '✅' : '🎯'} ${o.name}: ${o.correct} / ${o.total}
        </div>
      `;
    }).join('');

    const memoHtml = report.answers.map((a, idx) => {
      const q = a.question;
      return `
        <div class="memo-item ${a.isCorrect ? 'memo-correct' : 'memo-wrong'}">
          <div>
            <strong>Q${idx + 1} (${q.marks} ${q.marks === 1 ? 'Mark' : 'Marks'}):</strong>
            ${q.wordPrompt ? `${q.wordPrompt} <em>(${q.a} ${q.op} ${q.b})</em>` : `<strong>${q.a} ${q.op} ${q.b} = ?</strong>`}
          </div>
          <div style="margin-top:4px;">
            Your Answer: <strong style="color:${a.isCorrect ? '#059669' : '#DC2626'};">${a.userAnswer}</strong>
            &bull; Official Answer: <strong style="color:#059669;">${q.result}</strong>
            ${a.isCorrect ? '✅' : '❌'}
          </div>
        </div>
      `;
    }).join('');

    this.dom.examReportContainer.innerHTML = `
      <div class="exam-report-card">
        <h3>📋 ${report.title} — Official Report Card &amp; Memorandum</h3>
        <div class="exam-score-giant">${report.earnedMarks} / ${report.totalMarks} Marks (${report.percentage}%)</div>
        <div style="font-weight:700;font-size:1.05rem;">${gradeLabel} &bull; ${report.correctCount} of ${report.totalQuestions} Correct</div>

        <div class="exam-ops-summary">${opsHtml}</div>

        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
          ${report.missedOps.length > 0 ? `
            <button id="exam-practise-weak-btn" class="paper-start-btn" style="max-width:300px;background:#DC2626;">
              🎯 Practise My Weak Operations
            </button>
          ` : ''}
          <button id="exam-retry-variant-btn" class="paper-start-btn" style="max-width:280px;">
            🎲 Retry Paper with Fresh Numbers
          </button>
        </div>

        <div style="text-align:left;margin-top:6px;">
          <h4 style="color:var(--primary);margin-bottom:8px;">📖 Complete Past Paper Memorandum (Question by Question):</h4>
          <div class="memo-list">${memoHtml}</div>
        </div>
      </div>
    `;

    const weakBtn = document.getElementById('exam-practise-weak-btn');
    if (weakBtn) {
      weakBtn.addEventListener('click', () => {
        this.currentCategory = report.recommendedCategory;
        this.currentSubCategory = 'all';
        this.streak = 0;
        this.switchMode('grinder');
        this.updateCategoryUI();
        this.updateSubCategoryUI();
      });
    }

    const retryBtn = document.getElementById('exam-retry-variant-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.startExamPaper(report.paperId, true);
      });
    }
  }

  applySettings() {
    document.body.className = `font-${this.settings.font} theme-${this.settings.theme}`;
    if (this.dom.themeToggle) {
      this.dom.themeToggle.textContent = `🎨 Theme: ${this.settings.theme.toUpperCase()}`;
    }
    if (this.dom.fontToggle) {
      this.dom.fontToggle.textContent = `🔤 Font: ${this.settings.font === 'lexend' ? 'Lexend (Clean)' : 'Dyslexic-Aid'}`;
    }
    sound.soundEnabled = this.settings.soundFx;
  }

  initScratchpad() {
    const canvas = this.dom.scratchpadCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let mode = 'pen'; // 'pen' | 'eraser'

    const applyBrush = () => {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (mode === 'eraser') {
        ctx.lineWidth = 18;
        ctx.strokeStyle = '#FFFFFF';
      } else {
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#0284c7';
      }
    };

    const resize = () => {
      const wrap = document.getElementById('scratchpad-wrapper');
      if (!wrap || wrap.classList.contains('hidden')) return;
      const targetWidth = canvas.parentElement.clientWidth || 700;
      if (canvas.width === targetWidth && canvas.height === 140) return;

      // Save existing strokes before resizing
      let prevData = null;
      if (canvas.width > 0 && canvas.height > 0) {
        try { prevData = ctx.getImageData(0, 0, canvas.width, canvas.height); } catch (e) {}
      }

      canvas.width = targetWidth;
      canvas.height = 140;

      if (prevData) {
        try { ctx.putImageData(prevData, 0, 0); } catch (e) {}
      }
      applyBrush();
    };

    window.addEventListener('resize', resize);

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = canvas.width / (rect.width || 1);
      const scaleY = canvas.height / (rect.height || 1);
      return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
    };

    const startDraw = (e) => {
      drawing = true;
      applyBrush();
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const moveDraw = (e) => {
      if (!drawing) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const endDraw = () => {
      drawing = false;
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', moveDraw);
    window.addEventListener('mouseup', endDraw);

    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDraw(e); }, { passive: false });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); moveDraw(e); }, { passive: false });
    canvas.addEventListener('touchend', endDraw);

    const penBtn = document.getElementById('scratchpad-pen-btn');
    const eraserBtn = document.getElementById('scratchpad-eraser-btn');
    if (penBtn && eraserBtn) {
      penBtn.addEventListener('click', () => {
        mode = 'pen';
        penBtn.classList.add('active');
        eraserBtn.classList.remove('active');
        applyBrush();
      });
      eraserBtn.addEventListener('click', () => {
        mode = 'eraser';
        eraserBtn.classList.add('active');
        penBtn.classList.remove('active');
        applyBrush();
      });
    }

    const clearBtn = document.getElementById('clear-scratchpad-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }

    if (this.dom.scratchpadToggle) {
      this.dom.scratchpadToggle.addEventListener('click', () => {
        const wrap = document.getElementById('scratchpad-wrapper');
        if (wrap) {
          const willShow = wrap.classList.contains('hidden');
          wrap.classList.toggle('hidden');
          if (willShow) {
            this.dom.scratchpadToggle.textContent = 'Hide Scratchpad ✏️';
            resize();
          } else {
            this.dom.scratchpadToggle.textContent = 'Scratchpad ✏️';
          }
        }
      });
    }
  }

  launchConfetti() {
    // Canvas-free confetti burst
    const count = 30;
    const colors = ['#f43f5e', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${Math.random() * 80 + 10}vw`;
      particle.style.top = '15vh';
      particle.style.transform = `rotate(${Math.random() * 360}deg)`;
      particle.style.animationDuration = `${Math.random() * 1.5 + 1}s`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 2500);
    }
  }
}

// Auto bootstrap when loaded in browser
if (typeof window !== 'undefined' && document.getElementById('grinder-app')) {
  window.grinderApp = new MathGrinderApp();
  window.grinderApp.init();
}

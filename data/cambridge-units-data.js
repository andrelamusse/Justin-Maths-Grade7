// data/cambridge-units-data.js - Complete 16 Units for Cambridge Lower Secondary Mathematics Stage 7
// Learner's Book 7 Syllabus for Justin at Kainos Cambridge School in Vanderbijlpark, South Africa.
// All mathematical formulas use proper LaTeX notation and are rendered using MathRenderer.

export const CAMBRIDGE_STAGE_7_UNITS = [
  {
    id: 'unit1-integers',
    unit: 1,
    title: 'Integers & Directed Numbers',
    cambridgeRef: '7Ni.01 - 7Ni.05',
    strand: 'Number',
    badge: 'Core Number Sense',
    whyItMatters: 'Winter mornings in Vanderbijlpark can drop to -3°C along the Vaal River. Integers help you track temperatures below zero and bank balances when shopping.',
    lesson: {
      keyIdea: 'Integers are all positive whole numbers, zero, and negative whole numbers (... -3, -2, -1, 0, 1, 2, 3 ...).',
      concrete: 'Think of temperature: Freezing point is 0°C. Getting warmer is adding (+). Dropping colder is subtracting (-). Taking away cold makes it warmer!',
      visual: 'On a horizontal number line: moving RIGHT is positive (+), moving LEFT is negative (-). Two negatives meeting (-- turn into a plus +).',
      abstract: 'Rules of Directed Numbers:\n• a + (-b) = a - b\n• a - (-b) = a + b\n• (+) × (+) = (+), (-) × (-) = (+)\n• (+) × (-) = (-), (-) × (+) = (-)',
      rules: [
        'Adding a negative number means moving LEFT: \\(5 + (-3) = 5 - 3 = 2\\).',
        'Subtracting a negative number turns into ADDITION: \\(4 - (-6) = 4 + 6 = 10\\).',
        'Multiplying or dividing two numbers with the SAME sign gives a POSITIVE result: \\((-4) \\times (-5) = +20\\).',
        'Multiplying or dividing two numbers with DIFFERENT signs gives a NEGATIVE result: \\((-18) \\div 3 = -6\\).',
        'Square roots ask for the number that multiplies by itself: \\(\\sqrt{64} = 8\\) because \\(8 \\times 8 = 64\\).'
      ],
      examples: [
        {
          q: 'Calculate: \\(-8 - (-12)\\)',
          solution: 'Subtracting a negative number is equivalent to adding the positive: \\(-8 + 12 = +4\\).'
        },
        {
          q: 'Calculate: \\((-7) \\times (-4) + (-10)\\)',
          solution: 'First do multiplication: \\((-7) \\times (-4) = +28\\). Next add \\(-10\\): \\(28 - 10 = 18\\).'
        }
      ],
      justinTrap: 'Watch out: Justin, never think two minus signs always make a plus! In \\(-5 - 3\\), you are at -5 and moving 3 steps further left, which gives \\(-8\\), NOT \\(+8\\)!',
      spokenExplanation: 'Integers include all positive and negative whole numbers and zero. When you subtract a negative, like four minus negative six, the two minus signs combine to make addition, giving ten. But when you add two negatives, you go deeper into the cold.'
    },
    questions: {
      easy: [
        {
          id: 'u1-e1',
          q: 'Calculate: \\(-6 + 9\\)',
          options: ['3', '-3', '-15', '15'],
          answer: '3',
          hint: 'Start at -6 on the number line and jump 9 steps to the right.',
          stepByStep: ['Start at -6.', 'Move 6 steps right to reach 0.', 'Move the remaining 3 steps right to reach +3.'],
          explanation: '\\(-6 + 9 = 3\\).'
        },
        {
          id: 'u1-e2',
          q: 'Which temperature is colder: \\(-8^\\circ\\text{C}\\) or \\(-2^\\circ\\text{C}\\)?',
          options: ['-8°C', '-2°C', 'They are equal', 'Cannot tell'],
          answer: '-8°C',
          hint: 'The further left on the number line, the colder and lower the temperature.',
          stepByStep: ['-8 is further left than -2 on the number line.', '-8°C is 8 degrees below zero.'],
          explanation: '\\(-8^\\circ\\text{C}\\) is colder than \\(-2^\\circ\\text{C}\\).'
        }
      ],
      medium: [
        {
          id: 'u1-m1',
          q: 'Work out: \\(7 - (-5)\\)',
          options: ['12', '2', '-2', '-12'],
          answer: '12',
          hint: 'Subtracting a negative is like taking away ice cubes: it gets warmer! Replace -(-) with +.',
          stepByStep: ['Rewrite \\(7 - (-5)\\) as \\(7 + 5\\).', '\\(7 + 5 = 12\\).'],
          explanation: 'Subtracting a negative becomes addition: \\(7 - (-5) = 7 + 5 = 12\\).'
        },
        {
          id: 'u1-m2',
          q: 'Calculate: \\((-4) \\times (-6)\\)',
          options: ['24', '-24', '10', '-10'],
          answer: '24',
          hint: 'Multiplying two negative numbers always produces a positive result.',
          stepByStep: ['Two negative signs cancel out to make a positive.', '\\(4 \\times 6 = 24\\).'],
          explanation: '\\((-4) \\times (-6) = +24\\).'
        }
      ],
      hard: [
        {
          id: 'u1-h1',
          q: 'Evaluate: \\(\\sqrt{100} - \\sqrt[3]{27}\\)',
          options: ['7', '3', '13', '17'],
          answer: '7',
          hint: 'Find the square root of 100 first, then subtract the cube root of 27.',
          stepByStep: ['\\(\\sqrt{100} = 10\\) because \\(10 \\times 10 = 100\\).', '\\(\\sqrt[3]{27} = 3\\) because \\(3 \\times 3 \\times 3 = 27\\).', '\\(10 - 3 = 7\\).'],
          explanation: '\\(\\sqrt{100} - \\sqrt[3]{27} = 10 - 3 = 7\\).'
        },
        {
          id: 'u1-h2',
          q: 'Justin has \\(\\text{R } 50\\) in his bank account. Three debit orders of \\(\\text{R } 30\\) each are deducted. What is his new balance?',
          options: ['-R 40', '-R 20', 'R 40', '-R 90'],
          answer: '-R 40',
          hint: 'Total deducted is 3 times R 30. Subtract that from R 50.',
          stepByStep: ['Total deduction = \\(3 \\times 30 = \\text{R } 90\\).', 'New balance = \\(50 - 90 = -40\\).'],
          explanation: 'His bank account is overdrawn by R 40, so the balance is \\(-\\text{R } 40\\).'
        }
      ]
    }
  },
  {
    id: 'unit2-expressions',
    unit: 2,
    title: 'Expressions, Formulae & Linear Equations',
    cambridgeRef: '7Ae.01 - 7Ae.07',
    strand: 'Algebra',
    badge: 'Equations & Balances',
    whyItMatters: 'Writing computer games or figuring out phone plans uses algebraic formulas where letters stand for mystery numbers.',
    lesson: {
      keyIdea: 'An equation is like a balanced scale. Whatever you do to one side of the equals sign, you must do to the other side to keep it balanced.',
      concrete: 'Think of bags of marbles: If 2 mystery bags plus 4 loose marbles weigh 10 marbles, take 4 loose marbles off both sides, then share equally!',
      visual: 'Balance scale with 2x blocks and 4 unit weights on the left, and 10 unit weights on the right. Removing 4 from both leaves 2x = 6. Dividing by 2 gives x = 3.',
      abstract: 'Solving \\(ax + b = c\\):\n1. Subtract \\(b\\) from both sides: \\(ax = c - b\\)\n2. Divide both sides by \\(a\\): \\(x = \\frac{c - b}{a}\\)',
      rules: [
        'Only LIKE TERMS can be added or subtracted: \\(5x + 3x = 8x\\), but \\(5x + 3\\) cannot be simplified.',
        'Expanding brackets means multiplying everything inside by what is outside: \\(a(b + c) = ab + ac\\).',
        'To solve an equation, use INVERSE (opposite) operations: undo addition with subtraction, undo multiplication with division.',
        'Always check your solution by substituting the number back into the original equation.'
      ],
      examples: [
        {
          q: 'Solve: \\(3x - 5 = 16\\)',
          solution: 'Add 5 to both sides: \\(3x = 21\\). Divide both sides by 3: \\(x = 7\\).'
        },
        {
          q: 'Expand and simplify: \\(4(2y + 3) - 5y\\)',
          solution: 'Expand brackets: \\(8y + 12 - 5y\\). Collect like terms: \\(8y - 5y + 12 = 3y + 12\\).'
        }
      ],
      justinTrap: 'Justin, do NOT combine numbers with letters! \\(2x + 5\\) is NOT \\(7x\\). The 5 has no x attached to it!',
      spokenExplanation: 'An algebraic equation is like a balanced seesaw. To find the unknown x, do the exact same inverse operation to both sides until x stands completely alone.'
    },
    questions: {
      easy: [
        {
          id: 'u2-e1',
          q: 'Simplify by collecting like terms: \\(5x + 3x - 2x\\)',
          options: ['6x', '10x', '6x^3', '8x'],
          answer: '6x',
          hint: 'All terms are x-terms. Add and subtract the coefficients: 5 + 3 - 2.',
          stepByStep: ['\\(5 + 3 = 8\\).', '\\(8 - 2 = 6\\).', 'Attach the variable: \\(6x\\).'],
          explanation: '\\(5x + 3x - 2x = 6x\\).'
        },
        {
          id: 'u2-e2',
          q: 'Solve for \\(x\\): \\(x + 7 = 19\\)',
          options: ['12', '26', '7', '19'],
          answer: '12',
          hint: 'Subtract 7 from both sides to isolate x.',
          stepByStep: ['\\(x = 19 - 7\\).', '\\(x = 12\\).'],
          explanation: 'Subtracting 7 gives \\(x = 12\\).'
        }
      ],
      medium: [
        {
          id: 'u2-m1',
          q: 'Solve the equation: \\(3x - 5 = 16\\)',
          options: ['7', '6', '21', '11'],
          answer: '7',
          hint: 'Add 5 to both sides first, then divide by 3.',
          stepByStep: ['Add 5: \\(3x = 16 + 5 = 21\\).', 'Divide by 3: \\(x = 21 \\div 3 = 7\\).'],
          explanation: '\\(3x = 21 \\implies x = 7\\).'
        },
        {
          id: 'u2-m2',
          q: 'Expand the bracket: \\(4(2y + 3)\\)',
          options: ['8y + 12', '8y + 3', '6y + 7', '8y + 7'],
          answer: '8y + 12',
          hint: 'Multiply 4 by both terms inside the brackets: 4 times 2y and 4 times 3.',
          stepByStep: ['\\(4 \\times 2y = 8y\\).', '\\(4 \\times 3 = 12\\).', 'Combine: \\(8y + 12\\).'],
          explanation: '\\(4(2y + 3) = 8y + 12\\).'
        }
      ],
      hard: [
        {
          id: 'u2-h1',
          q: 'Solve: \\(5(x - 2) = 2x + 11\\)',
          options: ['7', '5', '3', '9'],
          answer: '7',
          hint: 'Expand the left bracket first, then bring all x terms to one side.',
          stepByStep: ['Expand: \\(5x - 10 = 2x + 11\\).', 'Subtract 2x: \\(3x - 10 = 11\\).', 'Add 10: \\(3x = 21\\).', 'Divide by 3: \\(x = 7\\).'],
          explanation: '\\(5x - 10 = 2x + 11 \\implies 3x = 21 \\implies x = 7\\).'
        },
        {
          id: 'u2-h2',
          q: 'A taxi in Vanderbijlpark charges a base call-out fee of \\(\\text{R } 15\\) plus \\(\\text{R } 8\\) per kilometre \\(d\\). Which formula gives the total cost \\(C\\)?',
          options: ['C = 8d + 15', 'C = 15d + 8', 'C = 23d', 'C = 8(d + 15)'],
          answer: 'C = 8d + 15',
          hint: 'The rate per km multiplies d, while the fixed call-out fee is added once.',
          stepByStep: ['Each km costs R 8, so d km costs \\(8 \\times d\\).', 'Add the fixed base fee of R 15.', 'Total formula: \\(C = 8d + 15\\).'],
          explanation: 'The linear formula is \\(C = 8d + 15\\).'
        }
      ]
    }
  },
  {
    id: 'unit3-placevalue',
    unit: 3,
    title: 'Place Value & Decimals',
    cambridgeRef: '7Np.01 - 7Np.04',
    strand: 'Number',
    badge: 'Powers of 10 & Precision',
    whyItMatters: 'Digital stopwatches at athletics days measure tenths and hundredths of a second. Precision matters when winning by 0.02 seconds!',
    lesson: {
      keyIdea: 'Multiplying or dividing by 10, 100, 0.1, or 0.01 slides digits along the place value chart.',
      concrete: 'Think of jumping: Multiplying by 10 jumps digits one place left (making it bigger). Multiplying by 0.1 is identical to dividing by 10 (jumping right).',
      visual: 'Place value grid: [Hundreds] [Tens] [Units] . [Tenths] [Hundredths] [Thousandths].',
      abstract: '• \\(x \\times 0.1 = x \\div 10\\)\n• \\(x \\times 0.01 = x \\div 100\\)\n• \\(x \\div 0.1 = x \\times 10\\)\n• \\(x \\div 0.01 = x \\times 100\\)',
      rules: [
        'Multiplying by 0.1 divides by 10 (move decimal point 1 place LEFT): \\(45 \\times 0.1 = 4.5\\).',
        'Dividing by 0.1 multiplies by 10 (move decimal point 1 place RIGHT): \\(3.6 \\div 0.1 = 36\\).',
        'To round to 1 decimal place: Look at the 2nd decimal place. If it is 5 or more, round UP.',
        'When ordering decimals, write them with the same number of decimal places by padding with zeros.'
      ],
      examples: [
        {
          q: 'Calculate: \\(45 \\times 0.01\\)',
          solution: 'Multiplying by 0.01 is dividing by 100. Move decimal point 2 places left: \\(0.45\\).'
        },
        {
          q: 'Round \\(8.467\\) to 1 decimal place.',
          solution: 'The 1st decimal place is 4. The decider is the next digit 6 (>= 5), so round up to \\(8.5\\).'
        }
      ],
      justinTrap: 'Justin, do NOT say "add a zero" when multiplying decimals! Multiplying \\(4.5 \\times 10\\) is NOT \\(4.50\\); it is \\(45\\)! Move the decimal point!',
      spokenExplanation: 'Multiplying by zero point one is exactly the same as dividing by ten. It makes the number ten times smaller by moving the decimal point one step to the left.'
    },
    questions: {
      easy: [
        {
          id: 'u3-e1',
          q: 'Calculate: \\(45 \\times 0.1\\)',
          options: ['4.5', '0.45', '450', '0.045'],
          answer: '4.5',
          hint: 'Multiplying by 0.1 is dividing by 10. Move the decimal point 1 place to the left.',
          stepByStep: ['\\(45 \\times 0.1 = 45 \\div 10\\).', 'Move point left: \\(4.5\\).'],
          explanation: '\\(45 \\times 0.1 = 4.5\\).'
        },
        {
          id: 'u3-e2',
          q: 'Round \\(7.382\\) to 1 decimal place.',
          options: ['7.4', '7.3', '7.38', '8.0'],
          answer: '7.4',
          hint: 'Look at the second digit after the decimal point: 8. Since 8 is 5 or greater, round 3 up to 4.',
          stepByStep: ['First decimal place is 3.', 'Decider digit is 8.', 'Since 8 >= 5, 3 rounds up to 4.'],
          explanation: '\\(7.382\\) rounded to 1 decimal place is \\(7.4\\).'
        }
      ],
      medium: [
        {
          id: 'u3-m1',
          q: 'Calculate: \\(3.6 \\div 0.01\\)',
          options: ['360', '36', '0.036', '3600'],
          answer: '360',
          hint: 'Dividing by 0.01 is multiplying by 100. Move the decimal point 2 places right.',
          stepByStep: ['\\(3.6 \\div 0.01 = 3.6 \\times 100\\).', '\\(3.6 \\times 100 = 360\\).'],
          explanation: '\\(3.6 \\div 0.01 = 360\\).'
        },
        {
          id: 'u3-m2',
          q: 'Which list shows the decimals correctly ordered from smallest to largest?',
          options: [
            '0.045, 0.405, 0.45, 0.5',
            '0.45, 0.045, 0.405, 0.5',
            '0.5, 0.45, 0.405, 0.045',
            '0.045, 0.45, 0.405, 0.5'
          ],
          answer: '0.045, 0.405, 0.45, 0.5',
          hint: 'Pad each decimal to 3 decimal places: 0.045, 0.405, 0.450, 0.500.',
          stepByStep: ['0.045 = 45 thousandths', '0.405 = 405 thousandths', '0.450 = 450 thousandths', '0.500 = 500 thousandths'],
          explanation: 'The order from smallest to largest is 0.045, 0.405, 0.45, 0.5.'
        }
      ],
      hard: [
        {
          id: 'u3-h1',
          q: 'Evaluate: \\(0.6 \\times 0.08\\)',
          options: ['0.048', '0.48', '0.0048', '4.8'],
          answer: '0.048',
          hint: 'Multiply whole numbers: 6 × 8 = 48. Then count total decimal places: 1 + 2 = 3 decimal places.',
          stepByStep: ['\\(6 \\times 8 = 48\\).', '0.6 has 1 decimal place, 0.08 has 2 decimal places (total 3).', 'Shift 3 places left: \\(0.048\\).'],
          explanation: '\\(0.6 \\times 0.08 = 0.048\\).'
        },
        {
          id: 'u3-h2',
          q: 'Justin buys 3 notebooks at \\(\\text{R } 14.75\\) each and a pen at \\(\\text{R } 8.50\\). How much change does he get from \\(\\text{R } 100\\)?',
          options: ['R 47.25', 'R 52.75', 'R 46.25', 'R 57.25'],
          answer: 'R 47.25',
          hint: 'Find total cost first: (3 × 14.75) + 8.50, then subtract from 100.',
          stepByStep: ['3 notebooks: \\(3 \\times 14.75 = \\text{R } 44.25\\).', 'Total spent: \\(44.25 + 8.50 = \\text{R } 52.75\\).', 'Change from R 100: \\(100 - 52.75 = \\text{R } 47.25\\).'],
          explanation: 'Justin gets \\(\\text{R } 47.25\\) in change.'
        }
      ]
    }
  },
  {
    id: 'unit4-f-d-p',
    unit: 4,
    title: 'Decimals, Fractions & Percentages',
    cambridgeRef: '7Nf.01 - 7Nf.06',
    strand: 'Number',
    badge: 'Equivalence Trio',
    whyItMatters: 'Stores at Vaal Mall display "25% off", test results are given in fractions like 17 out of 20, and batting averages are decimals like 0.85. They are all the exact same number in different clothes!',
    lesson: {
      keyIdea: 'Fractions, decimals, and percentages are three different ways of showing the same part of a whole.',
      concrete: 'Think of 1 whole chocolate bar: Half is 1/2 as a fraction, 0.5 as a decimal, and 50% as a percentage.',
      visual: 'Equivalence table: 1/2 = 0.5 = 50%; 1/4 = 0.25 = 25%; 3/4 = 0.75 = 75%; 1/10 = 0.1 = 10%.',
      abstract: '• Fraction to Decimal: Divide top by bottom (numerator ÷ denominator)\n• Decimal to Percentage: Multiply by 100%\n• Fraction of amount: \\(\\frac{a}{b} \\times N = (N \\div b) \\times a\\)',
      rules: [
        'To write a fraction as a percentage: Convert to an equivalent fraction over 100, or multiply by 100%.',
        'To find a fraction of an amount: Divide by the bottom number (denominator), then multiply by the top number (numerator).',
        'A recurring decimal has digits that repeat forever: \\(\\frac{1}{3} = 0.333\\dots = 0.\\dot{3}\\).',
        'To compare fractions and percentages, convert everything to decimals first!'
      ],
      examples: [
        {
          q: 'Find \\(\\frac{3}{5}\\) of \\(40\\text{ kg}\\)',
          solution: 'Divide by denominator: \\(40 \\div 5 = 8\\). Multiply by numerator: \\(8 \\times 3 = 24\\text{ kg}\\).'
        },
        {
          q: 'Write \\(0.35\\) as a fraction in simplest form.',
          solution: '\\(0.35 = \\frac{35}{100}\\). Divide top and bottom by 5: \\(\\frac{7}{20}\\).'
        }
      ],
      justinTrap: 'Justin, do NOT multiply by the bottom! Divide by the bottom (share equally), then multiply by the top (count your shares)!',
      spokenExplanation: 'Fractions, decimals, and percentages are the golden trio of maths. To find three fifths of forty, divide forty by five to get eight, then multiply by three to get twenty-four.'
    },
    questions: {
      easy: [
        {
          id: 'u4-e1',
          q: 'Write \\(\\frac{3}{4}\\) as a percentage.',
          options: ['75%', '34%', '25%', '30%'],
          answer: '75%',
          hint: 'Think of quarters: 1 quarter is 25%, so 3 quarters is 3 × 25%.',
          stepByStep: ['\\(\\frac{3}{4} = \\frac{75}{100}\\).', 'Out of 100 means percentage: 75%.'],
          explanation: '\\(\\frac{3}{4} = 75\\%\\).'
        },
        {
          id: 'u4-e2',
          q: 'Write \\(0.35\\) as a fraction in simplest form.',
          options: ['\\frac{7}{20}', '\\frac{35}{10}', '\\frac{3}{5}', '\\frac{7}{25}'],
          answer: '\\frac{7}{20}',
          hint: '0.35 has two decimal places, so put 35 over 100 and divide both by 5.',
          stepByStep: ['\\(0.35 = \\frac{35}{100}\\).', 'Divide numerator and denominator by 5.', '\\(35 \\div 5 = 7\\) and \\(100 \\div 5 = 20\\).'],
          explanation: '\\(0.35 = \\frac{7}{20}\\).'
        }
      ],
      medium: [
        {
          id: 'u4-m1',
          q: 'Find \\(\\frac{3}{5}\\) of \\(40\\text{ kg}\\).',
          options: ['24 kg', '15 kg', '8 kg', '32 kg'],
          answer: '24 kg',
          hint: 'Divide 40 by 5 first, then multiply the result by 3.',
          stepByStep: ['\\(40 \\div 5 = 8\\).', '\\(8 \\times 3 = 24\\text{ kg}\\).'],
          explanation: '\\(\\frac{3}{5} \\times 40 = 24\\text{ kg}\\).'
        },
        {
          id: 'u4-m2',
          q: 'Convert \\(\\frac{7}{8}\\) to a decimal.',
          options: ['0.875', '0.78', '0.87', '0.75'],
          answer: '0.875',
          hint: 'Since 1/8 = 0.125, multiply 0.125 by 7.',
          stepByStep: ['\\(1 \\div 8 = 0.125\\).', '\\(7 \\times 0.125 = 0.875\\).'],
          explanation: '\\(\\frac{7}{8} = 0.875\\).'
        }
      ],
      hard: [
        {
          id: 'u4-h1',
          q: 'In a maths test of 80 marks, Justin scores 68 marks. What percentage did he achieve?',
          options: ['85%', '80%', '68%', '78%'],
          answer: '85%',
          hint: 'Write as fraction 68/80, simplify by dividing by 4, then convert to over 100.',
          stepByStep: ['Fraction = \\(\\frac{68}{80}\\).', 'Divide top and bottom by 4: \\(\\frac{17}{20}\\).', 'Multiply top and bottom by 5: \\(\\frac{85}{100} = 85\\%\\).'],
          explanation: 'Justin achieved 85%.'
        },
        {
          id: 'u4-h2',
          q: 'Which list is correctly ordered from smallest to largest?',
          options: [
            '\\frac{3}{5}, 0.65, \\frac{2}{3}, 70%',
            '0.65, \\frac{3}{5}, 70%, \\frac{2}{3}',
            '\\frac{2}{3}, \\frac{3}{5}, 0.65, 70%',
            '70%, \\frac{2}{3}, 0.65, \\frac{3}{5}'
          ],
          answer: '\\frac{3}{5}, 0.65, \\frac{2}{3}, 70%',
          hint: 'Convert all 4 to decimals: 3/5 = 0.60; 0.65; 2/3 = 0.666...; 70% = 0.70.',
          stepByStep: ['\\(\\frac{3}{5} = 0.60\\)', '0.65', '\\(\\frac{2}{3} \\approx 0.667\\)', '\\(70\\% = 0.70\\)'],
          explanation: 'Smallest to largest: \\(\\frac{3}{5} < 0.65 < \\frac{2}{3} < 70\\%\\).'
        }
      ]
    }
  },
  {
    id: 'unit5-angles',
    unit: 5,
    title: 'Angles & Constructions',
    cambridgeRef: '7Gg.01 - 7Gg.06',
    strand: 'Geometry & Measure',
    badge: 'Angles & Parallel Lines',
    whyItMatters: 'Engineers designing bridges over the Vaal River use angle geometry so trusses do not collapse under the weight of trucks.',
    lesson: {
      keyIdea: 'Angles are measures of turn. Specific geometric layouts always add up to fixed angle sums (180° or 360°).',
      concrete: 'Imagine spinning full circle: That is 360°. Turning half circle to face opposite is a straight line of 180°!',
      visual: 'Parallel lines cut by a transversal form Z angles (alternate = equal), F angles (corresponding = equal), and C angles (co-interior add to 180°).',
      abstract: '• Straight line: \\(\\sum \\theta = 180^\\circ\\)\n• Around a point: \\(\\sum \\theta = 360^\\circ\\)\n• Vertically opposite angles are equal\n• Triangle interior sum: \\(A + B + C = 180^\\circ\\)\n• Quadrilateral interior sum = \\(360^\\circ\\)',
      rules: [
        'Angles on a straight line add to \\(180^\\circ\\).',
        'Angles around a point add to \\(360^\\circ\\).',
        'Vertically opposite angles created by an X intersection are EQUAL.',
        'Angles in any triangle always add to \\(180^\\circ\\).',
        'Parallel line rules: Alternate (Z) angles are equal; Corresponding (F) angles are equal.'
      ],
      examples: [
        {
          q: 'A straight line has angles \\(115^\\circ\\) and \\(x^\\circ\\). Find \\(x\\).',
          solution: '\\(x = 180^\\circ - 115^\\circ = 65^\\circ\\).'
        },
        {
          q: 'A triangle has angles \\(58^\\circ\\) and \\(64^\\circ\\). Find the third angle.',
          solution: 'Sum = \\(58 + 64 = 122^\\circ\\). Third angle = \\(180 - 122 = 58^\\circ\\) (an isosceles triangle!).'
        }
      ],
      justinTrap: 'Justin, make sure you spot the Z and F shapes on parallel lines! Z means alternate angles are EQUAL. Do not add them to 180°!',
      spokenExplanation: 'Angles on a straight line always add up to 180 degrees. In any triangle, all three interior angles add to 180 degrees. When parallel lines are crossed by another line, alternate angles make a letter Z and are equal.'
    },
    questions: {
      easy: [
        {
          id: 'u5-e1',
          q: 'What is the sum of angles on a straight line?',
          options: ['180°', '360°', '90°', '270°'],
          answer: '180°',
          hint: 'Think of half of a full 360° turn.',
          stepByStep: ['A full turn is 360°.', 'A straight line is half a turn: 360° ÷ 2 = 180°.'],
          explanation: 'Angles on a straight line add to 180°.'
        },
        {
          id: 'u5-e2',
          q: 'Two angles on a straight line are \\(115^\\circ\\) and \\(x^\\circ\\). What is the value of \\(x\\)?',
          options: ['65°', '75°', '55°', '245°'],
          answer: '65°',
          hint: 'Subtract 115° from 180°.',
          stepByStep: ['\\(x = 180^\\circ - 115^\\circ\\).', '\\(x = 65^\\circ\\).'],
          explanation: '\\(x = 180^\\circ - 115^\\circ = 65^\\circ\\).'
        }
      ],
      medium: [
        {
          id: 'u5-m1',
          q: 'In a triangle, two angles are \\(58^\\circ\\) and \\(64^\\circ\\). What is the size of the third angle?',
          options: ['58°', '68°', '48°', '64°'],
          answer: '58°',
          hint: 'All 3 angles in a triangle add to 180°. Add the first two and subtract from 180°.',
          stepByStep: ['\\(58 + 64 = 122^\\circ\\).', '\\(180 - 122 = 58^\\circ\\).'],
          explanation: 'The third angle is \\(58^\\circ\\).'
        },
        {
          id: 'u5-m2',
          q: 'Two parallel lines are crossed by a transversal line. If an angle in the alternate "Z" position is \\(72^\\circ\\), what is the alternate angle?',
          options: ['72°', '108°', '180°', '90°'],
          answer: '72°',
          hint: 'Alternate angles in parallel lines are equal to each other.',
          stepByStep: ['Alternate angles form a Z-shape.', 'Alternate angles are equal.', 'Therefore the alternate angle is also 72°.'],
          explanation: 'Alternate angles are equal, so the answer is 72°.'
        }
      ],
      hard: [
        {
          id: 'u5-h1',
          q: 'An isosceles triangle has one vertex angle of \\(40^\\circ\\). What is the size of each of the two equal base angles?',
          options: ['70° each', '40° each', '80° each', '60° each'],
          answer: '70° each',
          hint: 'Subtract 40° from 180°, then split the remaining degrees equally into 2.',
          stepByStep: ['Remaining degrees = \\(180 - 40 = 140^\\circ\\).', 'Split between 2 equal angles: \\(140 \\div 2 = 70^\\circ\\).'],
          explanation: 'Each base angle is \\(70^\\circ\\).'
        },
        {
          id: 'u5-h2',
          q: 'The four interior angles of a quadrilateral are \\(x^\\circ, 2x^\\circ, 3x^\\circ,\\) and \\(90^\\circ\\). Find the value of \\(x\\).',
          options: ['45°', '30°', '60°', '90°'],
          answer: '45°',
          hint: 'All 4 angles in any quadrilateral add to 360°. Form an equation with x.',
          stepByStep: ['\\(x + 2x + 3x + 90 = 360\\).', '\\(6x + 90 = 360\\).', '\\(6x = 270\\).', '\\(x = 270 \\div 6 = 45\\).'],
          explanation: '\\(6x = 270 \\implies x = 45^\\circ\\).'
        }
      ]
    }
  },
  {
    id: 'unit6-collecting-data',
    unit: 6,
    title: 'Collecting & Displaying Data',
    cambridgeRef: '7Ss.01 - 7Ss.04',
    strand: 'Statistics & Probability',
    badge: 'Charts & Tables',
    whyItMatters: 'Sport statisticians track rugby match statistics (tackles made, tries scored) using frequency tables and dual bar charts.',
    lesson: {
      keyIdea: 'Data can be counted (discrete) or measured (continuous). We organize data into frequency tables and display it in bar charts and pie charts.',
      concrete: 'Counting learners in class is discrete (you cannot have 23.4 people!). Measuring their height with a tape measure is continuous.',
      visual: 'Pie charts: Full circle is 360°. To find sector angle: \\(\\frac{\\text{frequency}}{\\text{total}} \\times 360^\\circ\\).',
      abstract: '• Discrete: distinct separate numbers\n• Continuous: measurements on a continuous scale\n• Pie chart sector angle: \\(\\text{Angle} = \\frac{f}{N} \\times 360^\\circ\\)',
      rules: [
        'Discrete data has exact values that are COUNTED (e.g. goals scored).',
        'Continuous data can take any decimal value and is MEASURED (e.g. time, weight, height).',
        'A pie chart represents the whole as \\(360^\\circ\\).',
        'A two-way table shows two different categorical variables simultaneously.'
      ],
      examples: [
        {
          q: 'In a survey of 60 students, 15 chose tennis. What angle should tennis have on a pie chart?',
          solution: 'Fraction = \\(\\frac{15}{60} = \\frac{1}{4}\\). Sector angle = \\(\\frac{1}{4} \\times 360^\\circ = 90^\\circ\\).'
        },
        {
          q: 'Is "time taken to run 100 metres" discrete or continuous?',
          solution: 'Continuous (it is measured with a stopwatch to decimals of seconds).'
        }
      ],
      justinTrap: 'Justin, remember: In pie charts, angles must add up to 360°, NOT 100°! Percentages add to 100%, but angles add to 360°!',
      spokenExplanation: 'Data is either discrete, meaning you count it in whole items, or continuous, meaning you measure it on a scale. On a pie chart, the whole circle is 360 degrees.'
    },
    questions: {
      easy: [
        {
          id: 'u6-e1',
          q: 'Which type of data is "Number of siblings in a family": discrete or continuous?',
          options: ['Discrete', 'Continuous', 'Neither', 'Both'],
          answer: 'Discrete',
          hint: 'You count whole human beings (0, 1, 2, 3), not decimals.',
          stepByStep: ['Siblings are counted in whole numbers.', 'Counted items are discrete data.'],
          explanation: 'It is discrete because you count whole people.'
        },
        {
          id: 'u6-e2',
          q: 'In a tally chart, the marks for a category are "|||| |||". What is the frequency?',
          options: ['8', '7', '9', '5'],
          answer: '8',
          hint: 'A crossed bundle of 4 with a slash is 5. Add 3 more strokes.',
          stepByStep: ['One bundle = 5.', 'Plus 3 individual strokes = 8.'],
          explanation: 'One bundle of five tally marks plus three single marks equals a total frequency of 8.'
        }
      ],
      medium: [
        {
          id: 'u6-m1',
          q: 'In a pie chart of 60 learners, soccer occupies an angle of \\(120^\\circ\\). How many learners chose soccer?',
          options: ['20 learners', '30 learners', '15 learners', '25 learners'],
          answer: '20 learners',
          hint: 'Find what fraction 120° is of 360°, then multiply by 60 learners.',
          stepByStep: ['Fraction = \\(120 \\div 360 = \\frac{1}{3}\\).', 'Number of learners = \\(\\frac{1}{3} \\times 60 = 20\\).'],
          explanation: '\\(\\frac{120}{360} \\times 60 = 20\\text{ learners}\\).'
        },
        {
          id: 'u6-m2',
          q: 'A two-way table shows: 14 boys play rugby, 11 boys play tennis, 6 girls play rugby, and 19 girls play tennis. How many learners play tennis in total?',
          options: ['30', '25', '20', '50'],
          answer: '30',
          hint: 'Add the boys who play tennis and the girls who play tennis.',
          stepByStep: ['Boys tennis = 11.', 'Girls tennis = 19.', 'Total tennis = 11 + 19 = 30.'],
          explanation: '11 + 19 = 30 learners play tennis.'
        }
      ],
      hard: [
        {
          id: 'u6-h1',
          q: 'A school has 4 sports houses. On a pie chart, Red has \\(90^\\circ\\), Blue has \\(150^\\circ\\), and Green has \\(45^\\circ\\). What angle represents Yellow?',
          options: ['75°', '85°', '65°', '55°'],
          answer: '75°',
          hint: 'The whole circle is 360°. Add the 3 known angles and subtract from 360°.',
          stepByStep: ['Sum of known = \\(90 + 150 + 45 = 285^\\circ\\).', 'Yellow = \\(360 - 285 = 75^\\circ\\).'],
          explanation: 'Yellow represents \\(75^\\circ\\).'
        },
        {
          id: 'u6-h2',
          q: 'In a dual bar chart comparing Term 1 and Term 2 marks, Justin scored 72 marks in Term 1 and 84 marks in Term 2. What was his increase in marks?',
          options: ['12 marks', '14 marks', '8 marks', '10 marks'],
          answer: '12 marks',
          hint: 'Subtract Term 1 mark from Term 2 mark.',
          stepByStep: ['Term 2 = 84.', 'Term 1 = 72.', 'Increase = \\(84 - 72 = 12\\).'],
          explanation: 'The mark increase is 12 marks.'
        }
      ]
    }
  },
  {
    id: 'unit7-fractions-mixed',
    unit: 7,
    title: 'Fractions & Mixed Numbers',
    cambridgeRef: '7Nf.07 - 7Nf.12',
    strand: 'Number',
    badge: 'Fraction Operations',
    whyItMatters: 'Carpenters and builders measuring timber work with mixed numbers like 2 and 3/4 metres all day.',
    lesson: {
      keyIdea: 'To add or subtract fractions, they must share the Lowest Common Denominator (LCD). To divide fractions, Keep-Change-Flip (KCF).',
      concrete: 'You cannot add 2 slices of a 3-slice pizza to 1 slice of a 4-slice pizza until you cut both into twelfths (12ths)!',
      visual: 'Fraction wall: 1/3 = 4/12; 1/4 = 3/12. Adding gives 7/12.',
      abstract: '• Addition/Subtraction: \\(\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}\\)\n• Multiplication: \\(\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}\\)\n• Division: \\(\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}\\) (KCF)',
      rules: [
        'Find the Lowest Common Denominator (LCD) before adding or subtracting unlike fractions.',
        'To multiply fractions: Multiply top numbers together, multiply bottom numbers together, then simplify.',
        'To divide fractions, use KCF: KEEP the first fraction, CHANGE division to multiplication, FLIP the second fraction.',
        'Convert mixed numbers to improper fractions before multiplying or dividing: \\(2\\frac{1}{3} = \\frac{7}{3}\\).'
      ],
      examples: [
        {
          q: 'Calculate: \\(\\frac{2}{3} + \\frac{1}{4}\\)',
          solution: 'LCD is 12. \\(\\frac{2}{3} = \\frac{8}{12}\\) and \\(\\frac{1}{4} = \\frac{3}{12}\\). Sum = \\(\\frac{8 + 3}{12} = \\frac{11}{12}\\).'
        },
        {
          q: 'Calculate: \\(\\frac{2}{3} \\div \\frac{4}{5}\\)',
          solution: 'Keep-Change-Flip: \\(\\frac{2}{3} \\times \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6}\\).'
        }
      ],
      justinTrap: 'Justin, NEVER add denominators! \\(\\frac{1}{2} + \\frac{1}{2}\\) is 1 whole (\\(\\frac{2}{2}\\)), NOT \\(\\frac{2}{4}\\)! Denominators only change to match LCD!',
      spokenExplanation: 'To add fractions with different denominators, first find the common denominator. To divide fractions, remember Keep Change Flip: keep the first fraction, change divide to multiply, and flip the second fraction upside down.'
    },
    questions: {
      easy: [
        {
          id: 'u7-e1',
          q: 'Calculate: \\(\\frac{2}{7} + \\frac{3}{7}\\)',
          options: ['\\frac{5}{7}', '\\frac{5}{14}', '\\frac{6}{7}', '\\frac{6}{49}'],
          answer: '\\frac{5}{7}',
          hint: 'The denominators are already the same. Just add the numerators.',
          stepByStep: ['Denominator stays 7.', 'Add numerators: 2 + 3 = 5.', 'Result = \\(\\frac{5}{7}\\).'],
          explanation: '\\(\\frac{2}{7} + \\frac{3}{7} = \\frac{5}{7}\\).'
        },
        {
          id: 'u7-e2',
          q: 'Convert \\(\\frac{13}{4}\\) to a mixed number.',
          options: ['3\\frac{1}{4}', '2\\frac{3}{4}', '4\\frac{1}{4}', '3\\frac{3}{4}'],
          answer: '3\\frac{1}{4}',
          hint: 'Divide 13 by 4. How many whole 4s fit in 13, and what is the remainder?',
          stepByStep: ['13 ÷ 4 = 3 with a remainder of 1.', 'Whole part = 3, fraction part = 1/4.'],
          explanation: '\\(\\frac{13}{4} = 3\\frac{1}{4}\\).'
        }
      ],
      medium: [
        {
          id: 'u7-m1',
          q: 'Calculate: \\(\\frac{2}{3} + \\frac{1}{4}\\)',
          options: ['\\frac{11}{12}', '\\frac{3}{7}', '\\frac{3}{12}', '\\frac{5}{12}'],
          answer: '\\frac{11}{12}',
          hint: 'Find the lowest common denominator for 3 and 4, which is 12.',
          stepByStep: ['\\(\\frac{2}{3} = \\frac{8}{12}\\).', '\\(\\frac{1}{4} = \\frac{3}{12}\\).', '\\(\\frac{8 + 3}{12} = \\frac{11}{12}\\).'],
          explanation: '\\(\\frac{2}{3} + \\frac{1}{4} = \\frac{11}{12}\\).'
        },
        {
          id: 'u7-m2',
          q: 'Calculate: \\(\\frac{3}{5} \\times \\frac{10}{9}\\)',
          options: ['\\frac{2}{3}', '\\frac{30}{45}', '\\frac{1}{3}', '\\frac{3}{2}'],
          answer: '\\frac{2}{3}',
          hint: 'Multiply top numbers (3 × 10 = 30) and bottom numbers (5 × 9 = 45), then simplify.',
          stepByStep: ['Numerator = \\(3 \\times 10 = 30\\).', 'Denominator = \\(5 \\times 9 = 45\\).', 'Simplify by dividing top and bottom by 15: \\(\\frac{30 \\div 15}{45 \\div 15} = \\frac{2}{3}\\).'],
          explanation: '\\(\\frac{3}{5} \\times \\frac{10}{9} = \\frac{2}{3}\\).'
        }
      ],
      hard: [
        {
          id: 'u7-h1',
          q: 'Work out: \\(\\frac{2}{3} \\div \\frac{4}{5}\\)',
          options: ['\\frac{5}{6}', '\\frac{8}{15}', '\\frac{6}{5}', '\\frac{10}{15}'],
          answer: '\\frac{5}{6}',
          hint: 'Keep the 2/3, Change ÷ to ×, Flip 4/5 to 5/4.',
          stepByStep: ['Keep-Change-Flip: \\(\\frac{2}{3} \\times \\frac{5}{4}\\).', 'Multiply: \\(\\frac{2 \\times 5}{3 \\times 4} = \\frac{10}{12}\\).', 'Simplify by dividing by 2: \\(\\frac{5}{6}\\).'],
          explanation: '\\(\\frac{2}{3} \\div \\frac{4}{5} = \\frac{5}{6}\\).'
        },
        {
          id: 'u7-h2',
          q: 'Calculate: \\(2\\frac{1}{2} - 1\\frac{2}{3}\\)',
          options: ['\\frac{5}{6}', '1\\frac{1}{6}', '\\frac{1}{6}', '1\\frac{5}{6}'],
          answer: '\\frac{5}{6}',
          hint: 'Convert both to improper fractions: 5/2 and 5/3, then use LCD 6.',
          stepByStep: ['\\(2\\frac{1}{2} = \\frac{5}{2} = \\frac{15}{6}\\).', '\\(1\\frac{2}{3} = \\frac{5}{3} = \\frac{10}{6}\\).', '\\(\\frac{15 - 10}{6} = \\frac{5}{6}\\).'],
          explanation: '\\(2\\frac{1}{2} - 1\\frac{2}{3} = \\frac{5}{6}\\).'
        }
      ]
    }
  },
  {
    id: 'unit8-shapes-polyhedra',
    unit: 8,
    title: 'Shapes, Symmetry & 3D Polyhedra',
    cambridgeRef: '7Gg.07 - 7Gg.12',
    strand: 'Geometry & Measure',
    badge: '3D Geometry & Symmetry',
    whyItMatters: 'Architects and game developers in Minecraft use 3D geometry, vertices, faces, and nets to build realistic 3D worlds.',
    lesson: {
      keyIdea: 'Polyhedra are 3D solids with flat polygon faces. Euler discovered that for any convex polyhedron: Faces + Vertices - Edges = 2.',
      concrete: 'Hold a cereal box (rectangular prism/cuboid): Count 6 flat faces, 8 pointy corners (vertices), and 12 straight edges.',
      visual: 'Euler formula verification: 6 + 8 - 12 = 2. It always equals 2!',
      abstract: 'Euler\'s Formula for Polyhedra: \\(F + V - E = 2\\)\n• Faces (\\(F\\)): Flat 2D polygon surfaces\n• Vertices (\\(V\\)): Corner points\n• Edges (\\(E\\)): Line segments where two faces meet',
      rules: [
        'A regular polygon with \\(n\\) sides has \\(n\\) lines of reflective symmetry and rotational symmetry of order \\(n\\).',
        'Euler\'s formula for any polyhedron is \\(F + V - E = 2\\).',
        'A prism has two identical polygon end-bases connected by rectangles.',
        'A pyramid has one base connected to a single top apex by triangles.'
      ],
      examples: [
        {
          q: 'A solid has 6 faces and 8 vertices. How many edges does it have?',
          solution: 'Use \\(F + V - E = 2\\). \\(6 + 8 - E = 2 \\implies 14 - E = 2 \\implies E = 12\\).'
        },
        {
          q: 'How many lines of symmetry does a regular hexagon have?',
          solution: 'A regular hexagon has 6 equal sides, so it has 6 lines of symmetry.'
        }
      ],
      justinTrap: 'Justin, do NOT confuse vertices (corners) with edges (lines)! Vertices are points where edges meet!',
      spokenExplanation: 'Polyhedra are three-dimensional shapes with flat polygonal faces. Euler discovered a famous rule: faces plus vertices minus edges always equals two.'
    },
    questions: {
      easy: [
        {
          id: 'u8-e1',
          q: 'How many lines of symmetry does a regular hexagon have?',
          options: ['6', '3', '12', '4'],
          answer: '6',
          hint: 'A regular polygon has the same number of lines of symmetry as it has sides.',
          stepByStep: ['A regular hexagon has 6 equal sides.', 'Therefore it has 6 lines of symmetry.'],
          explanation: 'A regular hexagon has 6 lines of symmetry.'
        },
        {
          id: 'u8-e2',
          q: 'What is the rotational symmetry order of a regular pentagon?',
          options: ['5', '1', '10', '4'],
          answer: '5',
          hint: 'How many times does it map onto itself during a full 360° turn?',
          stepByStep: ['A regular pentagon has 5 equal sides and angles.', 'It fits onto itself 5 times in a full turn.'],
          explanation: 'A regular pentagon has rotational symmetry order 5.'
        }
      ],
      medium: [
        {
          id: 'u8-m1',
          q: 'A 3D polyhedron has 6 faces and 8 vertices. Using Euler\'s formula \\(F + V - E = 2\\), how many edges does it have?',
          options: ['12', '14', '10', '16'],
          answer: '12',
          hint: 'Substitute F = 6 and V = 8 into F + V - E = 2.',
          stepByStep: ['\\(6 + 8 - E = 2\\).', '\\(14 - E = 2\\).', '\\(E = 14 - 2 = 12\\).'],
          explanation: 'It has 12 edges.'
        },
        {
          id: 'u8-m2',
          q: 'Which 3D shape has 2 circular parallel faces and 1 curved rectangular surface?',
          options: ['Cylinder', 'Cone', 'Sphere', 'Prism'],
          answer: 'Cylinder',
          hint: 'Think of a tin of baked beans.',
          stepByStep: ['Two identical circles on top and bottom.', 'One curved surface wrapping around.', 'This defines a cylinder.'],
          explanation: 'It is a cylinder.'
        }
      ],
      hard: [
        {
          id: 'u8-h1',
          q: 'A triangular prism has two triangular ends and three rectangular sides. How many faces, edges, and vertices does it have?',
          options: [
            '5 faces, 9 edges, 6 vertices',
            '5 faces, 8 edges, 5 vertices',
            '6 faces, 9 edges, 6 vertices',
            '4 faces, 6 edges, 4 vertices'
          ],
          answer: '5 faces, 9 edges, 6 vertices',
          hint: 'Faces: 2 triangles + 3 rectangles = 5. Check with F + V - E = 2.',
          stepByStep: ['Faces = 2 + 3 = 5.', 'Vertices = 3 on each triangle = 6.', 'Edges = 3 + 3 + 3 = 9.', 'Check: 5 + 6 - 9 = 2 (Euler holds!).'],
          explanation: 'A triangular prism has 5 faces, 9 edges, and 6 vertices.'
        },
        {
          id: 'u8-h2',
          q: 'Which 2D net folds into a closed square-based pyramid?',
          options: [
            '1 square surrounded by 4 triangles',
            '2 squares and 4 rectangles',
            '6 identical squares',
            '1 pentagon and 5 triangles'
          ],
          answer: '1 square surrounded by 4 triangles',
          hint: 'The base is a square, and the 4 sloping sides that meet at the top apex are triangles.',
          stepByStep: ['Base = 1 square.', 'Sloping sides = 4 triangles.', 'Net consists of 1 square surrounded by 4 triangles.'],
          explanation: 'A square-based pyramid net has 1 square and 4 triangles.'
        }
      ]
    }
  },
  {
    id: 'unit9-sequences',
    unit: 9,
    title: 'Sequences & Functions',
    cambridgeRef: '7As.01 - 7As.05',
    strand: 'Algebra',
    badge: 'nth Term & Patterns',
    whyItMatters: 'Finding patterns allows predicting future trends, like calculating how much savings you will have in 12 months.',
    lesson: {
      keyIdea: 'A linear sequence has a constant common difference (d). The nth term formula is \\(T_n = dn + c\\).',
      concrete: 'Stairs: Each step is 3 cm higher. Step 1 is 5 cm, Step 2 is 8 cm, Step 3 is 11 cm. The step size is +3.',
      visual: 'Table linking Position n to Term: n=1 -> 5, n=2 -> 8, n=3 -> 11. Common difference d = 3. Formula: 3n + 2.',
      abstract: 'nth Term Formula: \\(T_n = dn + c\\)\nwhere \\(d\\) is the common difference, and \\(c = \\text{Term 1} - d\\) (the zero-th term).',
      rules: [
        'The term-to-term rule tells you how to jump from one number to the next (e.g. "add 3").',
        'The position-to-term rule (nth term) lets you find ANY term directly by plugging in the position number \\(n\\).',
        'In a linear sequence, the difference \\(d\\) is the number multiplying \\(n\\).',
        'To find the constant \\(c\\): calculate \\(T_1 - d\\).'
      ],
      examples: [
        {
          q: 'Find the nth term formula for: \\(5, 8, 11, 14, \\dots\\)',
          solution: 'Common difference \\(d = 3\\). Starts with \\(3n\\). When \\(n = 1\\), \\(3(1) = 3\\). We need 5, so add 2. Formula: \\(3n + 2\\).'
        },
        {
          q: 'What is the 50th term of the sequence \\(T_n = 4n - 1\\)?',
          solution: 'Substitute \\(n = 50\\): \\(T_{50} = 4(50) - 1 = 200 - 1 = 199\\).'
        }
      ],
      justinTrap: 'Justin, do NOT confuse the term-to-term rule with the nth term formula! The nth term formula must contain the letter n!',
      spokenExplanation: 'In an arithmetic sequence, each term changes by the same difference. To find the nth term, take the common difference times n, then adjust by adding or subtracting the starting offset.'
    },
    questions: {
      easy: [
        {
          id: 'u9-e1',
          q: 'Find the next two terms in the sequence: \\(4, 7, 10, 13, \\dots\\)',
          options: ['16, 19', '15, 18', '16, 20', '14, 17'],
          answer: '16, 19',
          hint: 'Look at the gap between numbers: 7 - 4 = 3. Add 3 each time.',
          stepByStep: ['13 + 3 = 16.', '16 + 3 = 19.'],
          explanation: 'The sequence adds 3 each time: 16, 19.'
        },
        {
          id: 'u9-e2',
          q: 'What is the term-to-term rule for the sequence: \\(32, 28, 24, 20, \\dots\\)?',
          options: ['Subtract 4', 'Add 4', 'Divide by 2', 'Subtract 6'],
          answer: 'Subtract 4',
          hint: 'The numbers are decreasing. By how much does each step drop?',
          stepByStep: ['28 - 32 = -4.', '24 - 28 = -4.'],
          explanation: 'The term-to-term rule is "subtract 4".'
        }
      ],
      medium: [
        {
          id: 'u9-m1',
          q: 'The \\(n\\)-th term of a sequence is \\(T_n = 4n + 3\\). What is the 6th term?',
          options: ['27', '24', '31', '21'],
          answer: '27',
          hint: 'Substitute n = 6 into the formula: 4 × 6 + 3.',
          stepByStep: ['\\(4 \\times 6 = 24\\).', '\\(24 + 3 = 27\\).'],
          explanation: '\\(T_6 = 4(6) + 3 = 27\\).'
        },
        {
          id: 'u9-m2',
          q: 'Find the \\(n\\)-th term formula for the linear sequence: \\(5, 8, 11, 14, \\dots\\)',
          options: ['3n + 2', '3n + 5', '5n + 3', '4n + 1'],
          answer: '3n + 2',
          hint: 'The common difference is +3 (so it starts with 3n). What do you add to 3(1) to get 5?',
          stepByStep: ['Difference = +3, so formula has \\(3n\\).', 'For \\(n=1\\): \\(3(1) = 3\\).', 'To get 5: \\(3 + 2 = 5\\).', 'Formula is \\(3n + 2\\).'],
          explanation: 'The nth term is \\(3n + 2\\).'
        }
      ],
      hard: [
        {
          id: 'u9-h1',
          q: 'Find the \\(n\\)-th term for: \\(2, 7, 12, 17, \\dots\\) and determine if 102 is in the sequence.',
          options: [
            '5n - 3; Yes, it is the 21st term',
            '5n + 2; No, it is not',
            '5n - 3; No, it is not',
            '4n + 2; Yes, it is the 25th term'
          ],
          answer: '5n - 3; Yes, it is the 21st term',
          hint: 'Difference is 5, so formula is 5n - 3. Set 5n - 3 = 102 and solve for n.',
          stepByStep: ['Difference is 5, so \\(5n - 3\\).', 'Set \\(5n - 3 = 102\\).', '\\(5n = 105\\).', '\\(n = 21\\) (a whole number!).'],
          explanation: 'The nth term is \\(5n - 3\\), and \\(n = 21\\) gives 102.'
        },
        {
          id: 'u9-h2',
          q: 'A linear function machine takes an input \\(x\\), multiplies it by 3, then subtracts 4. If the output is 26, what was the input?',
          options: ['10', '8', '12', '9'],
          answer: '10',
          hint: 'Work backwards: Add 4 to the output, then divide by 3.',
          stepByStep: ['Equation: \\(3x - 4 = 26\\).', 'Add 4: \\(3x = 30\\).', 'Divide by 3: \\(x = 10\\).'],
          explanation: 'The input was 10.'
        }
      ]
    }
  },
  {
    id: 'unit10-percentages-finance',
    unit: 10,
    title: 'Percentages & Financial Maths',
    cambridgeRef: '7Nf.13 - 7Nf.16',
    strand: 'Number',
    badge: 'Discounts & Profit',
    whyItMatters: 'Understanding percentages protects you from being tricked by sales deals and lets you calculate profits when running a small business.',
    lesson: {
      keyIdea: 'Percentage means "out of 100". Financial maths applies percentages to money: discounts (subtract), markups/VAT (add), and interest.',
      concrete: 'A R 200 hoodie has 15% discount: 10% is R 20, 5% is R 10. Total discount = R 30. You pay R 170.',
      visual: 'Bar model: Original price (100%) minus Discount (15%) = Sale price (85%).',
      abstract: '• \\(\\text{Discount} = \\frac{\\text{Percentage}}{100} \\times \\text{Original}\\)\n• \\(\\text{Percentage Profit} = \\frac{\\text{Profit}}{\\text{Cost Price}} \\times 100\\%\\)\n• Simple Interest: \\(I = \\frac{P \\times r \\times t}{100}\\)',
      rules: [
        'To calculate 10% of any amount, divide by 10 (move decimal point 1 place left).',
        'Discount is SUBTRACTED from the original price: \\(\\text{Sale Price} = \\text{Original} - \\text{Discount}\\).',
        'Percentage profit or loss is ALWAYS calculated over the ORIGINAL COST PRICE.',
        'Simple Interest formula: \\(I = \\frac{P \\times r \\times t}{100}\\) where P = principal, r = rate %, t = time in years.'
      ],
      examples: [
        {
          q: 'A skateboard costing R 400 is discounted by 25%. What is the sale price?',
          solution: '25% of 400 = \\(\\frac{1}{4} \\times 400 = \\text{R } 100\\). Sale price = \\(400 - 100 = \\text{R } 300\\).'
        },
        {
          q: 'Calculate the simple interest on R 2 000 invested at 6% per year for 3 years.',
          solution: '\\(I = \\frac{2000 \\times 6 \\times 3}{100} = 20 \\times 18 = \\text{R } 360\\).'
        }
      ],
      justinTrap: 'Justin, always divide by the ORIGINAL starting price when calculating percentage increase or profit, NEVER by the new selling price!',
      spokenExplanation: 'Percentages mean out of one hundred. When an item has a discount, calculate the discount percentage and subtract it from the original price. Simple interest is principal times rate times time divided by one hundred.'
    },
    questions: {
      easy: [
        {
          id: 'u10-e1',
          q: 'Find \\(10\\%\\) of \\(\\text{R } 350\\).',
          options: ['R 35', 'R 3.50', 'R 350', 'R 70'],
          answer: 'R 35',
          hint: 'Divide 350 by 10.',
          stepByStep: ['To find 10% of an amount, divide by 10.', '\\(350 \\div 10 = \\text{R } 35\\).'],
          explanation: '10% of R 350 is R 35.'
        },
        {
          id: 'u10-e2',
          q: 'A game originally priced at \\(\\text{R } 500\\) has a \\(20\\%\\) discount. How much money do you save?',
          options: ['R 100', 'R 50', 'R 200', 'R 20'],
          answer: 'R 100',
          hint: '10% of 500 is 50. Double that to find 20%.',
          stepByStep: ['10% of 500 = 50.', '20% = \\(50 \\times 2 = 100\\).'],
          explanation: 'The saving is R 100.'
        }
      ],
      medium: [
        {
          id: 'u10-m1',
          q: 'A bicycle costing \\(\\text{R } 1\\,200\\) has its price increased by \\(15\\%\\). What is the new selling price?',
          options: ['R 1 380', 'R 1 350', 'R 1 215', 'R 1 400'],
          answer: 'R 1 380',
          hint: 'Find 10% (120) and 5% (60), add them to get 180, then add to 1 200.',
          stepByStep: ['10% of 1 200 = 120.', '5% of 1 200 = 60.', '15% increase = \\(120 + 60 = \\text{R } 180\\).', 'New price = \\(1\\,200 + 180 = \\text{R } 1\\,380\\).'],
          explanation: 'The new price is R 1 380.'
        },
        {
          id: 'u10-m2',
          q: 'Justin buys a skateboard for \\(\\text{R } 400\\) and later sells it to a friend for \\(\\text{R } 500\\). What is his percentage profit?',
          options: ['25%', '20%', '100%', '15%'],
          answer: '25%',
          hint: 'Profit is R 100. Divide profit by the original cost price (400) and multiply by 100%.',
          stepByStep: ['Profit = \\(500 - 400 = \\text{R } 100\\).', 'Percentage = \\(\\frac{100}{400} \\times 100\\%\\).', '\\(\\frac{1}{4} = 25\\%\\).'],
          explanation: 'His percentage profit is 25%.'
        }
      ],
      hard: [
        {
          id: 'u10-h1',
          q: 'Simple interest is calculated using \\(I = \\frac{P \\times r \\times t}{100}\\). Calculate the interest earned on \\(\\text{R } 2\\,000\\) at \\(6\\%\\) per annum for 3 years.',
          options: ['R 360', 'R 120', 'R 600', 'R 36'],
          answer: 'R 360',
          hint: 'Multiply 2 000 × 6 × 3, then divide by 100.',
          stepByStep: ['\\(P = 2000, r = 6, t = 3\\).', '\\(I = \\frac{2000 \\times 6 \\times 3}{100}\\).', '\\(20 \\times 18 = 360\\).'],
          explanation: 'The interest earned is R 360.'
        },
        {
          id: 'u10-h2',
          q: 'In an end-of-season sale in Vanderbijlpark, a winter jacket marked \\(\\text{R } 850\\) is sold at a \\(30\\%\\) discount. What is the final sale price?',
          options: ['R 595', 'R 255', 'R 600', 'R 550'],
          answer: 'R 595',
          hint: 'Find 30% of 850, then subtract it from 850.',
          stepByStep: ['10% of 850 = 85.', '30% = \\(85 \\times 3 = \\text{R } 255\\).', 'Sale price = \\(850 - 255 = \\text{R } 595\\).'],
          explanation: 'The sale price is R 595.'
        }
      ]
    }
  },
  {
    id: 'unit11-graphs-coords',
    unit: 11,
    title: 'Graphs & Coordinates',
    cambridgeRef: '7As.06 - 7As.09',
    strand: 'Algebra',
    badge: 'Cartesian Planes & Lines',
    whyItMatters: 'GPS navigation in cars and maps in video games use coordinate grids (x, y) to pinpoint exact player locations.',
    lesson: {
      keyIdea: 'A Cartesian plane uses two perpendicular axes (horizontal x-axis, vertical y-axis) intersecting at the origin (0, 0). Coordinates are written (x, y).',
      concrete: 'Walking in a hotel: Go along the horizontal corridor first (x), then take the stairs/elevator up or down (y)!',
      visual: '4 Quadrants: Q1 (+, +), Q2 (-, +), Q3 (-, -), Q4 (+, -). Horizontal lines are y = c. Vertical lines are x = k.',
      abstract: '• Point: \\((x, y)\\)\n• Horizontal line: \\(y = c\\) (all points have the same y-value)\n• Vertical line: \\(x = k\\) (all points have the same x-value)\n• Midpoint between \\((x_1, y_1)\\) and \\((x_2, y_2)\\): \\(\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)\\)',
      rules: [
        'Always read horizontal x FIRST, then vertical y SECOND: \\((x, y)\\).',
        'The origin is at \\((0, 0)\\).',
        'Horizontal lines have equations in the form \\(y = c\\) (slope is 0).',
        'Vertical lines have equations in the form \\(x = k\\).'
      ],
      examples: [
        {
          q: 'What is the equation of the horizontal line passing through \\((3, -4)\\)?',
          solution: 'On a horizontal line, every y-value is the same. The y-coordinate is -4, so \\(y = -4\\).'
        },
        {
          q: 'Find the midpoint of the line joining \\((-2, 4)\\) and \\((6, 10)\\).',
          solution: 'Midpoint x = \\(\\frac{-2 + 6}{2} = \\frac{4}{2} = 2\\). Midpoint y = \\(\\frac{4 + 10}{2} = \\frac{14}{2} = 7\\). Point is \\((2, 7)\\).'
        }
      ],
      justinTrap: 'Justin, do NOT swap x and y! \\((2, 5)\\) is 2 across and 5 up. It is NOT 5 across and 2 up!',
      spokenExplanation: 'On a coordinate grid, remember the golden rule: crawl along the corridor x before you climb the stairs y. Horizontal lines have equations like y equals constant, while vertical lines are x equals constant.'
    },
    questions: {
      easy: [
        {
          id: 'u11-e1',
          q: 'In which quadrant does the coordinate point \\((-4, 6)\\) lie?',
          options: ['Quadrant 2', 'Quadrant 1', 'Quadrant 3', 'Quadrant 4'],
          answer: 'Quadrant 2',
          hint: 'x is negative (left) and y is positive (up).',
          stepByStep: ['x < 0 moves left.', 'y > 0 moves up.', 'Top-left quadrant is Quadrant 2.'],
          explanation: 'The point lies in Quadrant 2.'
        },
        {
          id: 'u11-e2',
          q: 'What is the equation of the horizontal line where every point has a \\(y\\)-coordinate of \\(-3\\)?',
          options: ['y = -3', 'x = -3', 'y = 3', 'x = 3'],
          answer: 'y = -3',
          hint: 'Horizontal lines always have the equation y = constant.',
          stepByStep: ['Every point has y = -3.', 'The line equation is \\(y = -3\\).'],
          explanation: 'The line is \\(y = -3\\).'
        }
      ],
      medium: [
        {
          id: 'u11-m1',
          q: 'A straight line has the equation \\(y = 2x + 1\\). Find the value of \\(y\\) when \\(x = 4\\).',
          options: ['9', '8', '7', '10'],
          answer: '9',
          hint: 'Substitute x = 4 into the formula: 2 × 4 + 1.',
          stepByStep: ['\\(2 \\times 4 = 8\\).', '\\(8 + 1 = 9\\).'],
          explanation: '\\(y = 2(4) + 1 = 9\\).'
        },
        {
          id: 'u11-m2',
          q: 'Which of the following points lies on the line \\(y = 3x - 2\\)?',
          options: ['(3, 7)', '(2, 5)', '(1, 3)', '(4, 8)'],
          answer: '(3, 7)',
          hint: 'Test each point: plug x into 3x - 2 and see if it equals y.',
          stepByStep: ['Test (3, 7): \\(3(3) - 2 = 9 - 2 = 7\\) (Matches!).', 'Test (2, 5): \\(3(2) - 2 = 4 \\neq 5\\).'],
          explanation: 'Point (3, 7) satisfies \\(y = 3x - 2\\).'
        }
      ],
      hard: [
        {
          id: 'u11-h1',
          q: 'On a conversion graph between South African Rand (R) and US Dollars ($), \\(\\text{R } 180 = \\$10\\). How many Dollars is \\(\\text{R } 900\\)?',
          options: ['$50', '$45', '$60', '$40'],
          answer: '$50',
          hint: 'Find how many times 180 goes into 900: 900 ÷ 180 = 5. Multiply by $10.',
          stepByStep: ['Rate = \\(180 \\div 10 = \\text{R } 18\\) per Dollar.', '\\(900 \\div 18 = 50\\).'],
          explanation: '\\(\\text{R } 900 = \\$50\\).'
        },
        {
          id: 'u11-h2',
          q: 'What is the midpoint of the line segment joining the points \\((-2, 4)\\) and \\((6, 10)\\)?',
          options: ['(2, 7)', '(4, 7)', '(2, 6)', '(4, 14)'],
          answer: '(2, 7)',
          hint: 'Add the x-coordinates and divide by 2; add the y-coordinates and divide by 2.',
          stepByStep: ['Midpoint x = \\((-2 + 6) \\div 2 = 4 \\div 2 = 2\\).', 'Midpoint y = \\((4 + 10) \\div 2 = 14 \\div 2 = 7\\).', 'Coordinate = (2, 7).'],
          explanation: 'The midpoint is (2, 7).'
        }
      ]
    }
  },
  {
    id: 'unit12-ratio-proportion',
    unit: 12,
    title: 'Ratio & Proportion',
    cambridgeRef: '7Nf.17 - 7Nf.20',
    strand: 'Number',
    badge: 'Sharing & Rates',
    whyItMatters: 'Mixing concrete for construction or mixing cordial juice with water requires the exact right ratio so the mixture is neither too weak nor too strong.',
    lesson: {
      keyIdea: 'A ratio compares quantities of the same kind. To share an amount in ratio a:b, find the total number of parts first.',
      concrete: 'Bar model: If Justin and his friend share R 120 in ratio 2:3, draw 2 boxes for Justin and 3 boxes for friend (5 boxes total). Each box holds R 24.',
      visual: 'Box 1: R 24, Box 2: R 24 (Justin = R 48). Box 3: R 24, Box 4: R 24, Box 5: R 24 (Friend = R 72).',
      abstract: 'Sharing \\(N\\) in ratio \\(a : b\\):\n1. Total parts = \\(a + b\\)\n2. Value of 1 part = \\(N \\div (a + b)\\)\n3. Person A = \\(a \\times \\text{value of 1 part}\\)\n4. Person B = \\(b \\times \\text{value of 1 part}\\)',
      rules: [
        'Ratios must be simplified by dividing both sides by their Highest Common Factor (HCF): \\(12 : 18 = 2 : 3\\).',
        'Ratios have NO units when both sides are in the same units: simplify 50 cm : 2 m by converting to 50 cm : 200 cm = 1 : 4.',
        'Direct proportion means when one quantity doubles, the other quantity doubles at the exact same rate.',
        'Use the unitary method to find the cost of 1 item before multiplying to find any number of items.'
      ],
      examples: [
        {
          q: 'Share R 150 in the ratio 2 : 3.',
          solution: 'Total parts = \\(2 + 3 = 5\\). 1 part = \\(150 \\div 5 = \\text{R } 30\\). Share 1 = \\(2 \\times 30 = \\text{R } 60\\), Share 2 = \\(3 \\times 30 = \\text{R } 90\\).'
        },
        {
          q: '5 packs of pens cost R 65. What is the cost of 8 packs?',
          solution: '1 pack costs \\(65 \\div 5 = \\text{R } 13\\). 8 packs cost \\(8 \\times 13 = \\text{R } 104\\).'
        }
      ],
      justinTrap: 'Justin, do NOT divide by the individual ratio number! Divide by the TOTAL parts (sum of the ratio numbers) to find what 1 box is worth!',
      spokenExplanation: 'To share money in a ratio like two to three, add the ratio parts together to get five total parts. Divide the total money by five to find the value of one part, then multiply each person by their share.'
    },
    questions: {
      easy: [
        {
          id: 'u12-e1',
          q: 'Simplify the ratio \\(12 : 18\\) to its lowest terms.',
          options: ['2 : 3', '3 : 2', '6 : 9', '1 : 2'],
          answer: '2 : 3',
          hint: 'Divide both 12 and 18 by their greatest common factor, which is 6.',
          stepByStep: ['\\(12 \\div 6 = 2\\).', '\\(18 \\div 6 = 3\\).', 'Ratio is 2 : 3.'],
          explanation: '\\(12 : 18\\) simplifies to \\(2 : 3\\).'
        },
        {
          id: 'u12-e2',
          q: 'In a class of 30 learners, 18 are boys and 12 are girls. What is the simplified ratio of boys to girls?',
          options: ['3 : 2', '2 : 3', '9 : 6', '6 : 4'],
          answer: '3 : 2',
          hint: 'Boys first (18), girls second (12). Divide both by 6.',
          stepByStep: ['Ratio = 18 : 12.', 'Divide by 6: 3 : 2.'],
          explanation: 'The ratio is 3 : 2.'
        }
      ],
      medium: [
        {
          id: 'u12-m1',
          q: 'Share \\(\\text{R } 150\\) in the ratio \\(2 : 3\\).',
          options: ['R 60 and R 90', 'R 50 and R 100', 'R 70 and R 80', 'R 40 and R 110'],
          answer: 'R 60 and R 90',
          hint: 'Total parts = 2 + 3 = 5. Find 1 part: 150 ÷ 5 = 30.',
          stepByStep: ['Total parts = 5.', '1 part = \\(150 \\div 5 = 30\\).', 'Share 1 = \\(2 \\times 30 = \\text{R } 60\\).', 'Share 2 = \\(3 \\times 30 = \\text{R } 90\\).'],
          explanation: 'The shares are R 60 and R 90.'
        },
        {
          id: 'u12-m2',
          q: '5 packs of pens cost \\(\\text{R } 65\\). How much do 8 packs of pens cost at the same rate?',
          options: ['R 104', 'R 96', 'R 112', 'R 100'],
          answer: 'R 104',
          hint: 'Find the cost of 1 pack first (65 ÷ 5), then multiply by 8.',
          stepByStep: ['1 pack = \\(65 \\div 5 = \\text{R } 13\\).', '8 packs = \\(8 \\times 13 = \\text{R } 104\\).'],
          explanation: '8 packs cost R 104.'
        }
      ],
      hard: [
        {
          id: 'u12-h1',
          q: 'Justin and Liam share prize money in the ratio \\(4 : 5\\). If Liam receives \\(\\text{R } 45\\) more than Justin, what was the total prize money shared?',
          options: ['R 405', 'R 360', 'R 450', 'R 225'],
          answer: 'R 405',
          hint: 'Liam has 1 extra part (5 - 4 = 1 part). So 1 part = R 45. Total parts = 4 + 5 = 9 parts.',
          stepByStep: ['Difference in parts = \\(5 - 4 = 1\\) part.', '1 part = R 45.', 'Total parts = \\(4 + 5 = 9\\) parts.', 'Total money = \\(9 \\times 45 = \\text{R } 405\\).'],
          explanation: 'The total prize money was R 405.'
        },
        {
          id: 'u12-h2',
          q: 'Best Buy Comparison: Shop A sells 500 g of cereal for R 35. Shop B sells 800 g of the same cereal for R 52. Which is better value per 100 g?',
          options: [
            'Shop B (R 6.50 per 100 g vs R 7.00)',
            'Shop A (R 7.00 per 100 g vs R 6.50)',
            'Both are identical value',
            'Cannot tell'
          ],
          answer: 'Shop B (R 6.50 per 100 g vs R 7.00)',
          hint: 'Calculate price per 100 g for each: Shop A is 35 ÷ 5; Shop B is 52 ÷ 8.',
          stepByStep: ['Shop A: \\(35 \\div 5 = \\text{R } 7.00\\) per 100 g.', 'Shop B: \\(52 \\div 8 = \\text{R } 6.50\\) per 100 g.', 'Shop B is cheaper per 100 g.'],
          explanation: 'Shop B is cheaper at R 6.50 per 100 g compared to R 7.00.'
        }
      ]
    }
  },
  {
    id: 'unit13-probability',
    unit: 13,
    title: 'Probability & Likelihood',
    cambridgeRef: '7Sp.01 - 7Sp.04',
    strand: 'Statistics & Probability',
    badge: 'Chance & Odds',
    whyItMatters: 'Weather forecasters calculate probability of rain in Vanderbijlpark, and board games like Monopoly depend on dice probabilities.',
    lesson: {
      keyIdea: 'Probability measures how likely an event is to occur on a scale from 0 (impossible) to 1 (certain).',
      concrete: 'Tossing a coin: There are 2 equally likely outcomes (Heads or Tails). Chance of heads is 1 out of 2 = 1/2 = 0.5 = 50%.',
      visual: 'Probability scale: 0 (Impossible) --- 0.25 (Unlikely) --- 0.5 (Even chance) --- 0.75 (Likely) --- 1.0 (Certain).',
      abstract: 'Theoretical Probability: \\(P(E) = \\frac{\\text{Number of successful outcomes}}{\\text{Total number of possible outcomes}}\\)\n• \\(P(\\text{NOT } E) = 1 - P(E)\\)\n• Sum of all mutually exclusive probabilities = 1',
      rules: [
        'Probability is always between 0 and 1 (never negative, never greater than 1).',
        'Theoretical probability = successful outcomes ÷ total outcomes.',
        'The probability of an event NOT happening is \\(1 - P(E)\\).',
        'Experimental probability (relative frequency) = count of times event occurred ÷ total trials.'
      ],
      examples: [
        {
          q: 'A fair 6-sided dice is rolled. What is the probability of rolling a prime number (2, 3, 5)?',
          solution: 'There are 3 prime numbers out of 6 possible numbers. \\(P(\\text{prime}) = \\frac{3}{6} = \\frac{1}{2}\\).'
        },
        {
          q: 'The probability of rain tomorrow is 0.28. What is the probability of no rain?',
          solution: '\\(P(\\text{no rain}) = 1 - 0.28 = 0.72\\).'
        }
      ],
      justinTrap: 'Justin, probability can NEVER be greater than 1 (or 100%)! If you get an answer like 1.4 or 6/4, check your fraction upside down!',
      spokenExplanation: 'Probability is a number between zero and one. Zero means impossible, one means completely certain, and zero point five is an even fifty-fifty chance.'
    },
    questions: {
      easy: [
        {
          id: 'u13-e1',
          q: 'What is the probability of an event that is completely impossible?',
          options: ['0', '1', '0.5', '-1'],
          answer: '0',
          hint: 'Impossible means zero chance of occurring.',
          stepByStep: ['An impossible event can never occur under any circumstance.', 'On the 0 to 1 probability scale, impossible is represented by 0.'],
          explanation: 'The probability of an impossible event is 0.'
        },
        {
          id: 'u13-e2',
          q: 'A fair 6-sided dice is rolled. What is the probability of rolling an odd number (1, 3, 5)?',
          options: ['\\frac{1}{2}', '\\frac{1}{3}', '\\frac{1}{6}', '\\frac{2}{3}'],
          answer: '\\frac{1}{2}',
          hint: 'There are 3 odd numbers (1, 3, 5) out of 6 total numbers.',
          stepByStep: ['Odd numbers = 3.', 'Total outcomes = 6.', '\\(\\frac{3}{6} = \\frac{1}{2}\\).'],
          explanation: '\\(P(\\text{odd}) = \\frac{3}{6} = \\frac{1}{2}\\).'
        }
      ],
      medium: [
        {
          id: 'u13-m1',
          q: 'A bag contains 5 red balls, 3 blue balls, and 2 yellow balls. What is the probability of picking a blue ball at random?',
          options: ['\\frac{3}{10}', '\\frac{3}{7}', '\\frac{1}{3}', '\\frac{1}{5}'],
          answer: '\\frac{3}{10}',
          hint: 'Find the total balls first: 5 + 3 + 2 = 10. Put blue balls (3) over total.',
          stepByStep: ['Total balls = \\(5 + 3 + 2 = 10\\).', 'Blue balls = 3.', 'Probability = \\(\\frac{3}{10}\\).'],
          explanation: '\\(P(\\text{blue}) = \\frac{3}{10}\\).'
        },
        {
          id: 'u13-m2',
          q: 'The probability that it rains in Vanderbijlpark tomorrow is \\(0.28\\). What is the probability that it will NOT rain?',
          options: ['0.72', '0.82', '0.62', '0.28'],
          answer: '0.72',
          hint: 'The probability of something NOT happening is 1 minus the probability it happens.',
          stepByStep: ['The probability of an event NOT happening is 1 minus P(happening).', '\\(1 - 0.28 = 0.72\\).'],
          explanation: '\\(P(\\text{no rain}) = 1 - 0.28 = 0.72\\).'
        }
      ],
      hard: [
        {
          id: 'u13-h1',
          q: 'A spinner with 8 equal sections numbered 1 to 8 is spun. What is the probability of landing on a prime number?',
          options: ['\\frac{1}{2}', '\\frac{3}{8}', '\\frac{5}{8}', '\\frac{1}{4}'],
          answer: '\\frac{1}{2}',
          hint: 'The prime numbers between 1 and 8 are 2, 3, 5, and 7. (Remember 1 is NOT prime!).',
          stepByStep: ['Prime numbers: 2, 3, 5, 7 (4 primes).', 'Total outcomes = 8.', '\\(\\frac{4}{8} = \\frac{1}{2}\\).'],
          explanation: 'There are 4 primes out of 8, so the probability is \\(\\frac{1}{2}\\).'
        },
        {
          id: 'u13-h2',
          q: 'In a probability trial, a coin was tossed 200 times and landed on Heads 112 times. What is the experimental probability (relative frequency) of Heads?',
          options: ['0.56', '0.50', '0.44', '0.62'],
          answer: '0.56',
          hint: 'Divide the number of times Heads appeared by the total number of tosses.',
          stepByStep: ['Relative frequency is the count of successful outcomes divided by total trials.', '\\(\\frac{112}{200} = \\frac{56}{100} = 0.56\\).'],
          explanation: 'The relative frequency is 0.56.'
        }
      ]
    }
  },
  {
    id: 'unit14-position-transformation',
    unit: 14,
    title: 'Position & Transformation',
    cambridgeRef: '7Gg.13 - 7Gg.16',
    strand: 'Geometry & Measure',
    badge: 'Bearings & Vectors',
    whyItMatters: 'Pilots landing airplanes at O.R. Tambo Airport fly on precise three-figure compass bearings to avoid collisions.',
    lesson: {
      keyIdea: 'Bearings are angles measured clockwise from North using 3 digits. Transformations move shapes: reflections (flip), rotations (turn), translations (slide).',
      concrete: 'Face North (000°). Turn clockwise to face East (090°), South (180°), and West (270°). Always 3 digits!',
      visual: 'Vector translation: \\(\\begin{pmatrix} x \\\\ y \\end{pmatrix}\\) means slide \\(x\\) units right and \\(y\\) units up.',
      abstract: '• 3-Figure Bearing: Measured CLOCKWISE from NORTH, written with 3 digits (e.g. 045°)\n• Back bearing = bearing ± 180°\n• Reflection in x-axis: \\((x, y) \\to (x, -y)\\)\n• Reflection in y-axis: \\((x, y) \\to (-x, y)\\)',
      rules: [
        'Three-figure bearings must ALWAYS start from North, rotate CLOCKWISE, and be written with 3 DIGITS (e.g. 065°).',
        'Translation slides a shape without rotating or resizing it.',
        'Reflection creates a mirror image across a mirror line.',
        'Rotation turns a shape around a fixed centre point by a specified angle and direction.'
      ],
      examples: [
        {
          q: 'Justin faces North and turns 135° clockwise. What is his 3-figure bearing?',
          solution: 'Starting from North and going clockwise 135° gives bearing 135°.'
        },
        {
          q: 'Reflect the point \\((3, 5)\\) across the x-axis.',
          solution: 'Across the x-axis, the x-coordinate stays the same and the y-coordinate changes sign: \\((3, -5)\\).'
        }
      ],
      justinTrap: 'Justin, bearings MUST have 3 digits! Writing 45° is penalized in Cambridge exams — you MUST write 045°!',
      spokenExplanation: 'Three figure bearings are always measured clockwise starting from North, and must be written with three digits, like zero four five degrees. A reflection flips a shape across a mirror line.'
    },
    questions: {
      easy: [
        {
          id: 'u14-e1',
          q: 'Three-figure bearings are always measured in which direction starting from North?',
          options: ['Clockwise', 'Anticlockwise', 'Eastward', 'Any direction'],
          answer: 'Clockwise',
          hint: 'Think of the hands of a clock turning from 12.',
          stepByStep: ['Bearings start from North (000°).', 'They are measured clockwise.'],
          explanation: 'Bearings are measured clockwise from North.'
        },
        {
          id: 'u14-e2',
          q: 'What is the three-figure bearing for East?',
          options: ['090°', '90°', '180°', '270°'],
          answer: '090°',
          hint: 'East is a quarter turn (90°), but must be written with 3 digits.',
          stepByStep: ['East is 90° clockwise from North.', 'Written with 3 digits: 090°.'],
          explanation: 'East is 090°.'
        }
      ],
      medium: [
        {
          id: 'u14-m1',
          q: 'A boat sails on a bearing of \\(140^\\circ\\). What is the back bearing to return directly to its starting port?',
          options: ['320°', '220°', '040°', '360°'],
          answer: '320°',
          hint: 'Add 180° to the forward bearing (if under 180°). 140° + 180° = ?',
          stepByStep: ['For forward bearings under 180°, add 180° to find the reverse back bearing.', 'Back bearing = \\(140 + 180 = 320^\\circ\\).'],
          explanation: 'The back bearing is \\(320^\\circ\\).'
        },
        {
          id: 'u14-m2',
          q: 'The point \\((3, 5)\\) is reflected across the \\(x\\)-axis. What are the coordinates of the reflected point?',
          options: ['(3, -5)', '(-3, 5)', '(-3, -5)', '(5, 3)'],
          answer: '(3, -5)',
          hint: 'Across the horizontal x-axis, x stays 3, and y flips from +5 to -5.',
          stepByStep: ['Reflection in x-axis: \\((x, y) \\to (x, -y)\\).', '\\((3, 5) \\to (3, -5)\\).'],
          explanation: 'The reflected coordinate is (3, -5).'
        }
      ],
      hard: [
        {
          id: 'u14-h1',
          q: 'The point \\((-4, 2)\\) is translated by the vector \\(\\begin{pmatrix} 6 \\\\ -5 \\end{pmatrix}\\). What are the new coordinates?',
          options: ['(2, -3)', '(-10, 7)', '(2, 7)', '(-2, -3)'],
          answer: '(2, -3)',
          hint: 'Add top number (6) to x; add bottom number (-5) to y.',
          stepByStep: ['New x = \\(-4 + 6 = 2\\).', 'New y = \\(2 + (-5) = -3\\).', 'Image point = (2, -3).'],
          explanation: 'The image point is (2, -3).'
        },
        {
          id: 'u14-h2',
          q: 'The point \\((2, 3)\\) is rotated \\(90^\\circ\\) clockwise around the origin \\((0, 0)\\). What are the coordinates of its image?',
          options: ['(3, -2)', '(-3, 2)', '(-2, -3)', '(2, -3)'],
          answer: '(3, -2)',
          hint: 'Rotating 90° clockwise maps (x, y) to (y, -x).',
          stepByStep: ['Original point = (2, 3).', 'Clockwise 90° turn: \\((x, y) \\to (y, -x)\\).', 'New point = (3, -2).'],
          explanation: 'The rotated image is (3, -2).'
        }
      ]
    }
  },
  {
    id: 'unit15-area-perimeter-vol',
    unit: 15,
    title: 'Area, Perimeter & Volume',
    cambridgeRef: '7Gg.17 - 7Gg.22',
    strand: 'Geometry & Measure',
    badge: '2D & 3D Measurement',
    whyItMatters: 'Calculating how much paint is needed for a room (area) or how much water fills a swimming pool (volume in litres) are essential life skills.',
    lesson: {
      keyIdea: 'Perimeter is the distance around the outside edge (1D). Area is the surface covered (2D). Volume is the 3D space enclosed.',
      concrete: 'Walking around a garden fence is perimeter. Laying grass sod on the soil is area. Filling the pool with water is volume.',
      visual: 'Triangle area = half of rectangle: \\(\\frac{1}{2} \\times \\text{base} \\times \\text{perpendicular height}\\). Cuboid volume = \\(l \\times w \\times h\\).',
      abstract: '• Perimeter of polygon: sum of all outer sides\n• Area of rectangle: \\(A = l \\times w\\)\n• Area of triangle: \\(A = \\frac{1}{2} b h\\)\n• Volume of cuboid: \\(V = l \\times w \\times h\\)\n• Surface area of cuboid: \\(2(lw + lh + wh)\\)',
      rules: [
        'Perimeter has linear units (cm, m). Area has square units (cm², m²). Volume has cubic units (cm³, m³).',
        'Area of a triangle ALWAYS uses the PERPENDICULAR height (at 90° to base), never the sloping side!',
        'Compound L-shapes can be split into two separate rectangles to find the total area.',
        'Volume of a cuboid = \\(\\text{length} \\times \\text{width} \\times \\text{height}\\).'
      ],
      examples: [
        {
          q: 'Find the area of a triangle with base 14 cm and perpendicular height 6 cm.',
          solution: '\\(A = \\frac{1}{2} \\times 14 \\times 6 = 7 \\times 6 = 42\\text{ cm}^2\\).'
        },
        {
          q: 'Find the volume of a cuboid with length 8 cm, width 4 cm, and height 5 cm.',
          solution: '\\(V = 8 \\times 4 \\times 5 = 160\\text{ cm}^3\\).'
        }
      ],
      justinTrap: 'Justin, do NOT use the sloping diagonal side to find triangle area! The height MUST meet the base at a right angle (90°)!',
      spokenExplanation: 'Perimeter is the fence around the shape. Area is the grass covering the surface, which is base times perpendicular height divided by two for triangles. Volume is the water inside, which is length times width times height.'
    },
    questions: {
      easy: [
        {
          id: 'u15-e1',
          q: 'Calculate the perimeter of a rectangle with length \\(12\\text{ cm}\\) and width \\(5\\text{ cm}\\).',
          options: ['34 cm', '60 cm', '17 cm', '24 cm'],
          answer: '34 cm',
          hint: 'Add all four sides: 12 + 5 + 12 + 5 (or 2 × (12 + 5)).',
          stepByStep: ['\\(12 + 5 = 17\\).', '\\(17 \\times 2 = 34\\text{ cm}\\).'],
          explanation: 'The perimeter is 34 cm.'
        },
        {
          id: 'u15-e2',
          q: 'Calculate the area of a square with side length \\(7\\text{ cm}\\).',
          options: ['49 cm²', '28 cm²', '14 cm²', '21 cm²'],
          answer: '49 cm²',
          hint: 'Area of square = side × side.',
          stepByStep: ['Area of a square = side length multiplied by itself (\\(s^2\\)).', '\\(7 \\times 7 = 49\\text{ cm}^2\\).'],
          explanation: 'The area is 49 cm².'
        }
      ],
      medium: [
        {
          id: 'u15-m1',
          q: 'Find the area of a triangle with base \\(14\\text{ cm}\\) and perpendicular height \\(6\\text{ cm}\\).',
          options: ['42 cm²', '84 cm²', '20 cm²', '48 cm²'],
          answer: '42 cm²',
          hint: 'Area of triangle = 1/2 × base × height.',
          stepByStep: ['\\(\\frac{1}{2} \\times 14 = 7\\).', '\\(7 \\times 6 = 42\\text{ cm}^2\\).'],
          explanation: 'The area is 42 cm².'
        },
        {
          id: 'u15-m2',
          q: 'Calculate the volume of a rectangular prism (cuboid) with length \\(8\\text{ cm}\\), width \\(4\\text{ cm}\\), and height \\(5\\text{ cm}\\).',
          options: ['160 cm³', '34 cm³', '64 cm³', '320 cm³'],
          answer: '160 cm³',
          hint: 'Volume = length × width × height.',
          stepByStep: ['\\(8 \\times 4 = 32\\).', '\\(32 \\times 5 = 160\\text{ cm}^3\\).'],
          explanation: 'The volume is 160 cm³.'
        }
      ],
      hard: [
        {
          id: 'u15-h1',
          q: 'An L-shaped floor is divided into two rectangles: Rectangle A (\\(6\\text{ m} \\times 4\\text{ m}\\)) and Rectangle B (\\(3\\text{ m} \\times 2\\text{ m}\\)). What is the total area?',
          options: ['30 m²', '24 m²', '36 m²', '28 m²'],
          answer: '30 m²',
          hint: 'Calculate the area of Rectangle A and Rectangle B separately, then add them.',
          stepByStep: ['Area A = \\(6 \\times 4 = 24\\text{ m}^2\\).', 'Area B = \\(3 \\times 2 = 6\\text{ m}^2\\).', 'Total = \\(24 + 6 = 30\\text{ m}^2\\).'],
          explanation: 'The total area is 30 m².'
        },
        {
          id: 'u15-h2',
          q: 'A cuboid has dimensions \\(5\\text{ cm} \\times 4\\text{ cm} \\times 3\\text{ cm}\\). What is its total surface area?',
          options: ['94 cm²', '60 cm²', '47 cm²', '120 cm²'],
          answer: '94 cm²',
          hint: 'A cuboid has 3 pairs of matching faces: front/back, top/bottom, left/right.',
          stepByStep: ['Face 1: \\(5 \\times 4 = 20\\).', 'Face 2: \\(5 \\times 3 = 15\\).', 'Face 3: \\(4 \\times 3 = 12\\).', 'Sum of 3 faces = \\(20 + 15 + 12 = 47\\).', 'Total (all 6 faces) = \\(47 \\times 2 = 94\\text{ cm}^2\\).'],
          explanation: 'The total surface area is 94 cm².'
        }
      ]
    }
  },
  {
    id: 'unit16-interpreting-data',
    unit: 16,
    title: 'Interpreting & Comparing Data',
    cambridgeRef: '7Ss.05 - 7Ss.08',
    strand: 'Statistics & Probability',
    badge: 'Averages & Range',
    whyItMatters: 'Comparing cricket or rugby team averages and consistency (range) helps coaches decide which player to select for the starting lineup.',
    lesson: {
      keyIdea: 'We summarize and compare datasets using measures of central tendency (Mean, Median, Mode) and a measure of spread (Range).',
      concrete: 'Lines of learners: Mode is the most popular shoe size. Median is the person standing right in the middle when lined up from shortest to tallest.',
      visual: 'Ordered set: 2, 3, 5, 7, 8, 9, 11 -> Middle number is 7 (Median). Highest (11) - Lowest (2) = 9 (Range).',
      abstract: '• Mean = \\(\\frac{\\text{Sum of all values}}{\\text{Number of values}}\\)\n• Median = Middle value after ordering from least to greatest\n• Mode = Most frequent value\n• Range = \\(\\text{Maximum} - \\text{Minimum}\\) (measures consistency)',
      rules: [
        'Before finding the median, ALWAYS sort the numbers from smallest to largest first!',
        'The range is NOT an average — it measures spread and consistency (smaller range = more consistent).',
        'If there is an even number of values, the median is the midpoint between the two middle numbers.',
        'When comparing two groups, compare one average (e.g. Mean) AND the consistency (Range).'
      ],
      examples: [
        {
          q: 'Find the median of: 8, 3, 9, 2, 7.',
          solution: 'Order first: 2, 3, 7, 8, 9. The middle number is 7.'
        },
        {
          q: 'Calculate the mean of: 14, 18, 12, 16.',
          solution: 'Sum = \\(14 + 18 + 12 + 16 = 60\\). Count = 4. Mean = \\(60 \\div 4 = 15\\).'
        }
      ],
      justinTrap: 'Justin, NEVER calculate the median without ordering the numbers first! Finding the middle of unsorted numbers gives the wrong answer!',
      spokenExplanation: 'To find the median, you must sort the numbers from smallest to largest first and pick the middle one. The mean is found by adding all values and dividing by the count. The range is the highest minus the lowest.'
    },
    questions: {
      easy: [
        {
          id: 'u16-e1',
          q: 'What is the mode of the dataset: \\(4, 7, 7, 8, 9, 7, 3\\)?',
          options: ['7', '8', '4', '9'],
          answer: '7',
          hint: 'Mode is the number that appears most frequently.',
          stepByStep: ['7 appears three times.', 'No other number appears more than once.'],
          explanation: 'The mode is 7.'
        },
        {
          id: 'u16-e2',
          q: 'Find the range of the numbers: \\(12, 5, 18, 9, 21, 14\\).',
          options: ['16', '21', '5', '14'],
          answer: '16',
          hint: 'Subtract the smallest number from the largest number.',
          stepByStep: ['Highest = 21.', 'Lowest = 5.', 'Range = \\(21 - 5 = 16\\).'],
          explanation: 'The range is 16.'
        }
      ],
      medium: [
        {
          id: 'u16-m1',
          q: 'Find the median of this dataset: \\(9, 3, 7, 12, 5\\).',
          options: ['7', '9', '5', '8'],
          answer: '7',
          hint: 'Sort the numbers from smallest to largest first, then find the middle number.',
          stepByStep: ['Sort numbers: 3, 5, 7, 9, 12.', 'Middle value is 7.'],
          explanation: 'The median is 7.'
        },
        {
          id: 'u16-m2',
          q: 'Calculate the mean of the test marks: \\(14, 18, 12, 16\\).',
          options: ['15', '14', '16', '18'],
          answer: '15',
          hint: 'Add the 4 numbers together, then divide the total by 4.',
          stepByStep: ['Sum = \\(14 + 18 + 12 + 16 = 60\\).', 'Mean = \\(60 \\div 4 = 15\\).'],
          explanation: 'The mean is 15.'
        }
      ],
      hard: [
        {
          id: 'u16-h1',
          q: 'Justin took 4 tests and scored \\(15, 18, 14,\\) and \\(17\\). What mark does he need on his 5th test to achieve an overall mean of \\(17\\)?',
          options: ['21', '19', '18', '20'],
          answer: '21',
          hint: 'To have a mean of 17 over 5 tests, the total marks must be 5 × 17 = 85. Subtract the first 4 test marks.',
          stepByStep: ['Target total for 5 tests = \\(5 \\times 17 = 85\\).', 'Current sum of 4 tests = \\(15 + 18 + 14 + 17 = 64\\).', 'Required 5th test = \\(85 - 64 = 21\\).'],
          explanation: 'He needs 21 marks on the 5th test.'
        },
        {
          id: 'u16-h2',
          q: 'Class 7A has a mean score of 68 with a range of 15. Class 7B has a mean score of 68 with a range of 32. Which class showed more consistent performance?',
          options: [
            'Class 7A (smaller range of 15 means less spread)',
            'Class 7B (larger range of 32 means more spread)',
            'Both are equally consistent',
            'Cannot tell without medians'
          ],
          answer: 'Class 7A (smaller range of 15 means less spread)',
          hint: 'A smaller range means the marks are clustered closer together, indicating higher consistency.',
          stepByStep: ['Both classes have the same mean (68).', 'Class 7A range = 15; Class 7B range = 32.', 'Smaller range = higher consistency.'],
          explanation: 'Class 7A is more consistent because its range is smaller (15 vs 32).'
        }
      ]
    }
  }
];

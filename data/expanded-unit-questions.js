// data/expanded-unit-questions.js
// Substantially expanded question banks for Cambridge Stage 7 Units 1 - 16
// Each unit has 4 additional Easy, 4 additional Medium, and 4 additional Hard questions
// Combined with existing curriculum questions, each unit provides 18 curriculum questions + 5 past exam questions = 23 questions!

export const EXPANDED_UNIT_QUESTIONS = {
  "unit1-integers": {
    "easy": [
      {
        "id": "u1-e3",
        "q": "Calculate: \\(-14 + 6\\)",
        "options": [
          "-8",
          "8",
          "-20",
          "20"
        ],
        "answer": "-8",
        "hint": "Start at -14 on the number line and jump 6 steps to the right.",
        "stepByStep": [
          "Start at -14.",
          "Adding a positive number means moving right: -14 + 6 = -8."
        ],
        "explanation": "\\(-14 + 6 = -8\\)."
      },
      {
        "id": "u1-e4",
        "q": "Calculate: \\(9 - 15\\)",
        "options": [
          "-6",
          "6",
          "-24",
          "24"
        ],
        "answer": "-6",
        "hint": "Subtracting a larger number from a smaller number produces a negative answer.",
        "stepByStep": [
          "Subtract 9 to reach 0.",
          "Subtract the remaining 6 to land on -6."
        ],
        "explanation": "\\(9 - 15 = -6\\)."
      },
      {
        "id": "u1-e5",
        "q": "Evaluate the square number: \\(4^2\\)",
        "options": [
          "16",
          "8",
          "12",
          "20"
        ],
        "answer": "16",
        "hint": "A number squared means multiplying it by itself: 4 × 4.",
        "stepByStep": [
          "4 squared = 4 × 4.",
          "4 × 4 = 16."
        ],
        "explanation": "\\(4^2 = 4 \\times 4 = 16\\)."
      },
      {
        "id": "u1-e6",
        "q": "Find the positive square root: \\(\\sqrt{49}\\)",
        "options": [
          "7",
          "6",
          "8",
          "14"
        ],
        "answer": "7",
        "hint": "What number multiplied by itself gives 49?",
        "stepByStep": [
          "Find the number such that n × n = 49.",
          "Since 7 × 7 = 49, the square root is 7."
        ],
        "explanation": "\\(\\sqrt{49} = 7\\)."
      }
    ],
    "medium": [
      {
        "id": "u1-m3",
        "q": "Calculate: \\((-8) \\times 7\\)",
        "options": [
          "-56",
          "56",
          "-15",
          "15"
        ],
        "answer": "-56",
        "hint": "A negative number multiplied by a positive number gives a negative result.",
        "stepByStep": [
          "Multiply absolute values: 8 × 7 = 56.",
          "Different signs give a negative answer: -56."
        ],
        "explanation": "\\((-8) \\times 7 = -56\\)."
      },
      {
        "id": "u1-m4",
        "q": "Calculate: \\((-48) \\div (-6)\\)",
        "options": [
          "8",
          "-8",
          "7",
          "-7"
        ],
        "answer": "8",
        "hint": "Dividing two negative numbers always produces a positive result.",
        "stepByStep": [
          "Two negative signs cancel out to make a positive.",
          "48 ÷ 6 = 8."
        ],
        "explanation": "\\((-48) \\div (-6) = +8\\)."
      },
      {
        "id": "u1-m5",
        "q": "Evaluate: \\(2^3 + 3^2\\)",
        "options": [
          "17",
          "12",
          "13",
          "18"
        ],
        "answer": "17",
        "hint": "Calculate 2 cubed and 3 squared separately, then add.",
        "stepByStep": [
          "2³ = 2 × 2 × 2 = 8.",
          "3² = 3 × 3 = 9.",
          "8 + 9 = 17."
        ],
        "explanation": "\\(2^3 + 3^2 = 8 + 9 = 17\\)."
      },
      {
        "id": "u1-m6",
        "q": "Work out: \\(-12 - (-19)\\)",
        "options": [
          "7",
          "-31",
          "-7",
          "31"
        ],
        "answer": "7",
        "hint": "Subtracting a negative number is equivalent to adding the positive.",
        "stepByStep": [
          "Rewrite as -12 + 19.",
          "Start at -12 and jump 19 right: -12 + 19 = 7."
        ],
        "explanation": "\\(-12 - (-19) = -12 + 19 = 7\\)."
      }
    ],
    "hard": [
      {
        "id": "u1-h3",
        "q": "Evaluate: \\((-3)^2 - (-2)^3\\)",
        "options": [
          "17",
          "1",
          "-17",
          "-1"
        ],
        "answer": "17",
        "hint": "Remember that (-3)² is positive 9, while (-2)³ is negative 8.",
        "stepByStep": [
          "(-3)² = (-3) × (-3) = +9.",
          "(-2)³ = (-2) × (-2) × (-2) = -8.",
          "9 - (-8) = 9 + 8 = 17."
        ],
        "explanation": "\\((-3)^2 - (-2)^3 = 9 - (-8) = 9 + 8 = 17\\)."
      },
      {
        "id": "u1-h4",
        "q": "A submarine is at \\(-140\\text{ m}\\). It rises \\(65\\text{ m}\\) and then dives \\(45\\text{ m}\\). What is its final depth?",
        "options": [
          "-120 m",
          "-160 m",
          "-30 m",
          "-250 m"
        ],
        "answer": "-120 m",
        "hint": "Rising means adding depth (+65), and diving means subtracting depth (-45).",
        "stepByStep": [
          "-140 + 65 = -75 m.",
          "-75 - 45 = -120 m."
        ],
        "explanation": "Final depth is \\(-140 + 65 - 45 = -120\\text{ m}\\)."
      },
      {
        "id": "u1-h5",
        "q": "Find the value of: \\(\\sqrt{169} + \\sqrt[3]{64}\\)",
        "options": [
          "17",
          "15",
          "19",
          "21"
        ],
        "answer": "17",
        "hint": "13 × 13 = 169, and 4 × 4 × 4 = 64.",
        "stepByStep": [
          "\\(\\sqrt{169} = 13\\).",
          "\\(\\sqrt[3]{64} = 4\\).",
          "13 + 4 = 17."
        ],
        "explanation": "\\(\\sqrt{169} + \\sqrt[3]{64} = 13 + 4 = 17\\)."
      },
      {
        "id": "u1-h6",
        "q": "If \\(x = -4\\) and \\(y = 3\\), calculate the value of \\(x^2 - 2y\\)",
        "options": [
          "10",
          "-22",
          "22",
          "-10"
        ],
        "answer": "10",
        "hint": "Substitute x = -4 and y = 3 into the expression.",
        "stepByStep": [
          "x² = (-4)² = 16.",
          "2y = 2 × 3 = 6.",
          "16 - 6 = 10."
        ],
        "explanation": "\\((-4)^2 - 2(3) = 16 - 6 = 10\\)."
      }
    ]
  },
  "unit2-expressions": {
    "easy": [
      {
        "id": "u2-e3",
        "q": "Simplify by collecting like terms: \\(7a + 4b - 3a + 2b\\)",
        "options": [
          "4a + 6b",
          "10a + 6b",
          "4a + 2b",
          "10ab"
        ],
        "answer": "4a + 6b",
        "hint": "Group the a-terms together and the b-terms together.",
        "stepByStep": [
          "7a - 3a = 4a.",
          "4b + 2b = 6b.",
          "Combine: 4a + 6b."
        ],
        "explanation": "\\(7a + 4b - 3a + 2b = 4a + 6b\\)."
      },
      {
        "id": "u2-e4",
        "q": "Solve for \\(y\\): \\(4y = 36\\)",
        "options": [
          "9",
          "8",
          "32",
          "144"
        ],
        "answer": "9",
        "hint": "Undo multiplication by 4 by dividing both sides by 4.",
        "stepByStep": [
          "Divide both sides by 4: y = 36 ÷ 4.",
          "y = 9."
        ],
        "explanation": "\\(4y = 36 \\implies y = 9\\)."
      },
      {
        "id": "u2-e5",
        "q": "If \\(m = 6\\), evaluate: \\(5m - 8\\)",
        "options": [
          "22",
          "38",
          "24",
          "18"
        ],
        "answer": "22",
        "hint": "Substitute 6 in place of m: 5 × 6 - 8.",
        "stepByStep": [
          "5 × 6 = 30.",
          "30 - 8 = 22."
        ],
        "explanation": "\\(5(6) - 8 = 30 - 8 = 22\\)."
      },
      {
        "id": "u2-e6",
        "q": "Solve for \\(p\\): \\(p - 9 = 15\\)",
        "options": [
          "24",
          "6",
          "14",
          "22"
        ],
        "answer": "24",
        "hint": "Undo subtraction of 9 by adding 9 to both sides.",
        "stepByStep": [
          "Add 9 to both sides: p = 15 + 9.",
          "p = 24."
        ],
        "explanation": "\\(p = 15 + 9 = 24\\)."
      }
    ],
    "medium": [
      {
        "id": "u2-m3",
        "q": "Expand the bracket: \\(5(3x - 4)\\)",
        "options": [
          "15x - 20",
          "15x - 4",
          "8x - 20",
          "15x + 20"
        ],
        "answer": "15x - 20",
        "hint": "Multiply each term inside the bracket by 5.",
        "stepByStep": [
          "5 × 3x = 15x.",
          "5 × (-4) = -20.",
          "Combine: 15x - 20."
        ],
        "explanation": "\\(5(3x - 4) = 15x - 20\\)."
      },
      {
        "id": "u2-m4",
        "q": "Solve for \\(x\\): \\(4x + 7 = 31\\)",
        "options": [
          "6",
          "8",
          "9.5",
          "5"
        ],
        "answer": "6",
        "hint": "Subtract 7 from both sides first, then divide by 4.",
        "stepByStep": [
          "Subtract 7: 4x = 24.",
          "Divide by 4: x = 6."
        ],
        "explanation": "\\(4x = 24 \\implies x = 6\\)."
      },
      {
        "id": "u2-m5",
        "q": "If \\(v = u + at\\), find \\(v\\) when \\(u = 5\\), \\(a = 3\\), and \\(t = 4\\)",
        "options": [
          "17",
          "32",
          "23",
          "12"
        ],
        "answer": "17",
        "hint": "Follow BIDMAS: multiply a × t first, then add u.",
        "stepByStep": [
          "a × t = 3 × 4 = 12.",
          "v = 5 + 12 = 17."
        ],
        "explanation": "\\(v = 5 + 3(4) = 5 + 12 = 17\\)."
      },
      {
        "id": "u2-m6",
        "q": "Simplify: \\(6(x + 2) - 4x\\)",
        "options": [
          "2x + 12",
          "2x + 2",
          "10x + 12",
          "2x - 12"
        ],
        "answer": "2x + 12",
        "hint": "Expand the bracket first: 6x + 12, then subtract 4x.",
        "stepByStep": [
          "Expand: 6x + 12.",
          "Collect like terms: 6x - 4x + 12 = 2x + 12."
        ],
        "explanation": "\\(6x + 12 - 4x = 2x + 12\\)."
      }
    ],
    "hard": [
      {
        "id": "u2-h3",
        "q": "Solve for \\(x\\): \\(5(x - 2) = 3x + 14\\)",
        "options": [
          "12",
          "6",
          "8",
          "4"
        ],
        "answer": "12",
        "hint": "Expand the left side first: 5x - 10 = 3x + 14.",
        "stepByStep": [
          "Expand left: 5x - 10 = 3x + 14.",
          "Subtract 3x: 2x - 10 = 14.",
          "Add 10: 2x = 24.",
          "Divide by 2: x = 12."
        ],
        "explanation": "\\(5x - 10 = 3x + 14 \\implies 2x = 24 \\implies x = 12\\)."
      },
      {
        "id": "u2-h4",
        "q": "Solve the equation: \\(\\frac{3x + 1}{4} = 7\\)",
        "options": [
          "9",
          "8",
          "27",
          "10"
        ],
        "answer": "9",
        "hint": "Multiply both sides by 4 to clear the denominator.",
        "stepByStep": [
          "Multiply by 4: 3x + 1 = 28.",
          "Subtract 1: 3x = 27.",
          "Divide by 3: x = 9."
        ],
        "explanation": "\\(3x + 1 = 28 \\implies 3x = 27 \\implies x = 9\\)."
      },
      {
        "id": "u2-h5",
        "q": "Expand and simplify completely: \\(3(2x + 5) - 2(x - 4)\\)",
        "options": [
          "4x + 23",
          "4x + 7",
          "4x - 7",
          "8x + 23"
        ],
        "answer": "4x + 23",
        "hint": "Be careful with signs: -2 × (-4) = +8.",
        "stepByStep": [
          "First bracket: 6x + 15.",
          "Second bracket: -2x + 8.",
          "Combine: 6x - 2x = 4x, and 15 + 8 = 23."
        ],
        "explanation": "\\(6x + 15 - 2x + 8 = 4x + 23\\)."
      },
      {
        "id": "u2-h6",
        "q": "The perimeter of a rectangle is \\(2(l + w)\\). If perimeter is \\(50\\text{ cm}\\) and length \\(l = 16\\text{ cm}\\), find width \\(w\\)",
        "options": [
          "9 cm",
          "17 cm",
          "18 cm",
          "8 cm"
        ],
        "answer": "9 cm",
        "hint": "2(16 + w) = 50. Divide by 2 first: 16 + w = 25.",
        "stepByStep": [
          "16 + w = 50 ÷ 2 = 25.",
          "w = 25 - 16 = 9 cm."
        ],
        "explanation": "\\(2(16 + w) = 50 \\implies 16 + w = 25 \\implies w = 9\\text{ cm}\\)."
      }
    ]
  },
  "unit3-placevalue": {
    "easy": [
      {
        "id": "u3-e3",
        "q": "Round \\(4.768\\) to 1 decimal place",
        "options": [
          "4.8",
          "4.7",
          "4.77",
          "5.0"
        ],
        "answer": "4.8",
        "hint": "Look at the second decimal digit (6). Since 6 >= 5, round 7 up to 8.",
        "stepByStep": [
          "First decimal digit is 7, next digit is 6.",
          "Since 6 >= 5, round 7 up to 8 -> 4.8."
        ],
        "explanation": "\\(4.768 \\approx 4.8\\) to 1 d.p."
      },
      {
        "id": "u3-e4",
        "q": "Work out: \\(3.45 \\times 100\\)",
        "options": [
          "345",
          "34.5",
          "3450",
          "0.0345"
        ],
        "answer": "345",
        "hint": "Multiplying by 100 moves the decimal point 2 places to the right.",
        "stepByStep": [
          "Shift decimal 2 places right from 3.45.",
          "Result is 345."
        ],
        "explanation": "\\(3.45 \\times 100 = 345\\)."
      },
      {
        "id": "u3-e5",
        "q": "Which decimal is the smallest: \\(0.405\\), \\(0.45\\), \\(0.045\\), \\(0.4\\)?",
        "options": [
          "0.045",
          "0.405",
          "0.4",
          "0.45"
        ],
        "answer": "0.045",
        "hint": "Look at the tenths column first: 0.045 has 0 tenths.",
        "stepByStep": [
          "0.045 has 0 in the tenths column.",
          "All others have 4 in the tenths column, so 0.045 is the smallest."
        ],
        "explanation": "\\(0.045\\) is the smallest value."
      },
      {
        "id": "u3-e6",
        "q": "Calculate: \\(6.2 + 3.9\\)",
        "options": [
          "10.1",
          "9.11",
          "10.0",
          "9.1"
        ],
        "answer": "10.1",
        "hint": "Add the tenths: 2 + 9 = 11 tenths = 1 whole and 1 tenth.",
        "stepByStep": [
          "6 + 3 = 9.",
          "0.2 + 0.9 = 1.1.",
          "9 + 1.1 = 10.1."
        ],
        "explanation": "\\(6.2 + 3.9 = 10.1\\)."
      }
    ],
    "medium": [
      {
        "id": "u3-m3",
        "q": "Work out: \\(48.6 \\div 100\\)",
        "options": [
          "0.486",
          "4.86",
          "0.0486",
          "486"
        ],
        "answer": "0.486",
        "hint": "Dividing by 100 shifts the decimal point 2 places to the left.",
        "stepByStep": [
          "Shift decimal 2 places left from 48.6.",
          "Result = 0.486."
        ],
        "explanation": "\\(48.6 \\div 100 = 0.486\\)."
      },
      {
        "id": "u3-m4",
        "q": "Round \\(18.473\\) to 2 decimal places",
        "options": [
          "18.47",
          "18.48",
          "18.50",
          "18.4"
        ],
        "answer": "18.47",
        "hint": "The third decimal place is 3. Since 3 < 5, keep 47 unchanged.",
        "stepByStep": [
          "Target is 2 d.p. (18.47).",
          "Next digit is 3 (< 5), so round down to 18.47."
        ],
        "explanation": "\\(18.473 \\approx 18.47\\)."
      },
      {
        "id": "u3-m5",
        "q": "Calculate: \\(14.2 - 6.85\\)",
        "options": [
          "7.35",
          "7.45",
          "8.65",
          "7.65"
        ],
        "answer": "7.35",
        "hint": "Write 14.2 as 14.20 to line up decimal columns.",
        "stepByStep": [
          "14.20 - 6.85.",
          "Borrow across columns: 14.20 - 6.85 = 7.35."
        ],
        "explanation": "\\(14.2 - 6.85 = 7.35\\)."
      },
      {
        "id": "u3-m6",
        "q": "Calculate: \\(0.6 \\times 0.07\\)",
        "options": [
          "0.042",
          "0.42",
          "0.0042",
          "4.2"
        ],
        "answer": "0.042",
        "hint": "6 × 7 = 42. Count decimal places: 1 + 2 = 3 decimal places.",
        "stepByStep": [
          "6 × 7 = 42.",
          "Count 3 decimal places from right: 0.042."
        ],
        "explanation": "\\(0.6 \\times 0.07 = 0.042\\)."
      }
    ],
    "hard": [
      {
        "id": "u3-h3",
        "q": "Work out: \\(4.8 \\div 0.06\\)",
        "options": [
          "80",
          "8",
          "0.8",
          "800"
        ],
        "answer": "80",
        "hint": "Multiply dividend and divisor by 100: 480 ÷ 6.",
        "stepByStep": [
          "Multiply both by 100: 480 ÷ 6.",
          "480 ÷ 6 = 80."
        ],
        "explanation": "\\(4.8 \\div 0.06 = 480 \\div 6 = 80\\)."
      },
      {
        "id": "u3-h4",
        "q": "Justin buys \\(3.5\\text{ kg}\\) of bananas at \\(\\text{R } 14.80\\) per kg. How much does he pay?",
        "options": [
          "R 51.80",
          "R 51.00",
          "R 52.80",
          "R 44.40"
        ],
        "answer": "R 51.80",
        "hint": "Multiply 3.5 by 14.80.",
        "stepByStep": [
          "3 × 14.80 = R 44.40.",
          "0.5 × 14.80 = R 7.40.",
          "44.40 + 7.40 = R 51.80."
        ],
        "explanation": "\\(3.5 \\times 14.80 = \\text{R } 51.80\\)."
      },
      {
        "id": "u3-h5",
        "q": "Round \\(0.04782\\) to 2 significant figures",
        "options": [
          "0.048",
          "0.05",
          "0.047",
          "0.0478"
        ],
        "answer": "0.048",
        "hint": "Leading zeros are not significant. The first significant figure is 4, second is 7.",
        "stepByStep": [
          "First 2 sig figs: 4 and 7 (0.047...).",
          "Next digit is 8 >= 5, so round up 7 to 8 -> 0.048."
        ],
        "explanation": "\\(0.04782 \\approx 0.048\\) to 2 s.f."
      },
      {
        "id": "u3-h6",
        "q": "Evaluate: \\((0.3)^2 + 0.15 \\times 4\\)",
        "options": [
          "0.69",
          "0.24",
          "0.75",
          "1.29"
        ],
        "answer": "0.69",
        "hint": "Calculate (0.3)² = 0.09 and 0.15 × 4 = 0.60, then add.",
        "stepByStep": [
          "(0.3)² = 0.09.",
          "0.15 × 4 = 0.60.",
          "0.09 + 0.60 = 0.69."
        ],
        "explanation": "\\((0.3)^2 + 0.15 \\times 4 = 0.09 + 0.60 = 0.69\\)."
      }
    ]
  },
  "unit7-fractions-mixed": {
    "easy": [
      {
        "id": "u7-e3",
        "q": "Convert \\(\\frac{19}{4}\\) to a mixed number",
        "options": [
          "4 3/4",
          "4 1/4",
          "3 3/4",
          "5 1/4"
        ],
        "answer": "4 3/4",
        "hint": "19 divided by 4 is 4 with remainder 3.",
        "stepByStep": [
          "19 ÷ 4 = 4 remainder 3.",
          "Write as 4 3/4."
        ],
        "explanation": "\\(\\frac{19}{4} = 4\\frac{3}{4}\\)."
      },
      {
        "id": "u7-e4",
        "q": "Work out: \\(\\frac{2}{7} + \\frac{3}{7}\\)",
        "options": [
          "5/7",
          "5/14",
          "6/7",
          "1/7"
        ],
        "answer": "5/7",
        "hint": "The denominators are the same, so add the numerators directly.",
        "stepByStep": [
          "Add numerators: 2 + 3 = 5.",
          "Keep denominator 7: 5/7."
        ],
        "explanation": "\\(\\frac{2}{7} + \\frac{3}{7} = \\frac{5}{7}\\)."
      },
      {
        "id": "u7-e5",
        "q": "Simplify \\(\\frac{16}{24}\\) to its lowest terms",
        "options": [
          "2/3",
          "4/6",
          "3/4",
          "1/2"
        ],
        "answer": "2/3",
        "hint": "Divide numerator and denominator by their HCF of 8.",
        "stepByStep": [
          "16 ÷ 8 = 2.",
          "24 ÷ 8 = 3.",
          "Fraction = 2/3."
        ],
        "explanation": "\\(\\frac{16}{24} = \\frac{2}{3}\\)."
      },
      {
        "id": "u7-e6",
        "q": "Convert \\(3\\frac{2}{5}\\) to an improper fraction",
        "options": [
          "17/5",
          "15/5",
          "11/5",
          "13/5"
        ],
        "answer": "17/5",
        "hint": "Multiply whole number by denominator and add numerator: (3 × 5) + 2.",
        "stepByStep": [
          "3 × 5 = 15.",
          "15 + 2 = 17.",
          "Improper fraction = 17/5."
        ],
        "explanation": "\\(3\\frac{2}{5} = \\frac{17}{5}\\)."
      }
    ],
    "medium": [
      {
        "id": "u7-m3",
        "q": "Calculate: \\(\\frac{3}{4} + \\frac{2}{5}\\)",
        "options": [
          "23/20",
          "5/9",
          "1 1/20",
          "19/20"
        ],
        "answer": "23/20",
        "hint": "Find common denominator 20: 15/20 + 8/20.",
        "stepByStep": [
          "3/4 = 15/20.",
          "2/5 = 8/20.",
          "15/20 + 8/20 = 23/20."
        ],
        "explanation": "\\(\\frac{3}{4} + \\frac{2}{5} = \\frac{15 + 8}{20} = \\frac{23}{20}\\)."
      },
      {
        "id": "u7-m4",
        "q": "Calculate: \\(\\frac{5}{6} - \\frac{1}{4}\\)",
        "options": [
          "7/12",
          "4/2",
          "2/3",
          "1/2"
        ],
        "answer": "7/12",
        "hint": "Lowest common multiple of 6 and 4 is 12.",
        "stepByStep": [
          "5/6 = 10/12.",
          "1/4 = 3/12.",
          "10/12 - 3/12 = 7/12."
        ],
        "explanation": "\\(\\frac{5}{6} - \\frac{1}{4} = \\frac{10 - 3}{12} = \\frac{7}{12}\\)."
      },
      {
        "id": "u7-m5",
        "q": "Work out: \\(\\frac{4}{9} \\times \\frac{3}{8}\\) in simplest form",
        "options": [
          "1/6",
          "12/72",
          "1/4",
          "2/9"
        ],
        "answer": "1/6",
        "hint": "Cross-cancel common factors before multiplying.",
        "stepByStep": [
          "Cancel 4 with 8: 1 and 2.",
          "Cancel 3 with 9: 1 and 3.",
          "Multiply numerators: 1 × 1 = 1.",
          "Multiply denominators: 3 × 2 = 6."
        ],
        "explanation": "\\(\\frac{4}{9} \\times \\frac{3}{8} = \\frac{1}{6}\\)."
      },
      {
        "id": "u7-m6",
        "q": "Calculate: \\(\\frac{5}{8} \\div \\frac{3}{4}\\) in simplest form",
        "options": [
          "5/6",
          "15/32",
          "6/5",
          "1 1/4"
        ],
        "answer": "5/6",
        "hint": "Multiply by the reciprocal of 3/4, which is 4/3.",
        "stepByStep": [
          "Rewrite as (5/8) × (4/3).",
          "Cancel 4 with 8 to get 1 and 2.",
          "(5 × 1) / (2 × 3) = 5/6."
        ],
        "explanation": "\\(\\frac{5}{8} \\div \\frac{3}{4} = \\frac{5}{8} \\times \\frac{4}{3} = \\frac{5}{6}\\)."
      }
    ],
    "hard": [
      {
        "id": "u7-h3",
        "q": "Work out: \\(2\\frac{1}{3} + 1\\frac{3}{4}\\)",
        "options": [
          "4 1/12",
          "3 4/7",
          "3 11/12",
          "4 5/12"
        ],
        "answer": "4 1/12",
        "hint": "Common denominator for 3 and 4 is 12: 1/3 = 4/12 and 3/4 = 9/12.",
        "stepByStep": [
          "2 4/12 + 1 9/12 = 3 13/12.",
          "Convert 13/12 to 1 1/12.",
          "3 + 1 1/12 = 4 1/12."
        ],
        "explanation": "\\(2\\frac{1}{3} + 1\\frac{3}{4} = 4\\frac{1}{12}\\)."
      },
      {
        "id": "u7-h4",
        "q": "Calculate: \\(3\\frac{1}{2} - 1\\frac{5}{6}\\)",
        "options": [
          "1 2/3",
          "1 1/3",
          "2 1/3",
          "1 5/6"
        ],
        "answer": "1 2/3",
        "hint": "Convert to improper fractions: 7/2 - 11/6.",
        "stepByStep": [
          "7/2 = 21/6.",
          "21/6 - 11/6 = 10/6.",
          "10/6 simplifies to 5/3 = 1 2/3."
        ],
        "explanation": "\\(3\\frac{1}{2} - 1\\frac{5}{6} = 1\\frac{2}{3}\\)."
      },
      {
        "id": "u7-h5",
        "q": "A recipe uses \\(2\\frac{1}{4}\\text{ cups}\\) of flour. Justin wants to make \\(1\\frac{1}{2}\\) batches. How many cups of flour does he need?",
        "options": [
          "3 3/8 cups",
          "3 1/8 cups",
          "3 1/2 cups",
          "4 1/4 cups"
        ],
        "answer": "3 3/8 cups",
        "hint": "Multiply (9/4) by (3/2).",
        "stepByStep": [
          "2 1/4 = 9/4, and 1 1/2 = 3/2.",
          "(9/4) × (3/2) = 27/8.",
          "27/8 = 3 3/8 cups."
        ],
        "explanation": "\\(2\\frac{1}{4} \\times 1\\frac{1}{2} = 3\\frac{3}{8}\\text{ cups}\\)."
      },
      {
        "id": "u7-h6",
        "q": "Work out: \\(1\\frac{7}{8} \\div 2\\frac{1}{2}\\) in simplest form",
        "options": [
          "3/4",
          "4/5",
          "1/2",
          "7/10"
        ],
        "answer": "3/4",
        "hint": "Convert to improper fractions: 15/8 ÷ 5/2, then flip and multiply.",
        "stepByStep": [
          "15/8 ÷ 5/2 = (15/8) × (2/5).",
          "Cancel 15 with 5 = 3, and 2 with 8 = 4.",
          "Result = 3/4."
        ],
        "explanation": "\\(1\\frac{7}{8} \\div 2\\frac{1}{2} = \\frac{3}{4}\\)."
      }
    ]
  },
  "unit5-angles": {
    "easy": [
      {
        "id": "u5-e3",
        "q": "Two angles on a straight line are \\(125^\\circ\\) and \\(x^\\circ\\). Find \\(x\\)",
        "options": [
          "55°",
          "65°",
          "45°",
          "155°"
        ],
        "answer": "55°",
        "hint": "Angles on a straight line add up to 180°.",
        "stepByStep": [
          "Angles on a straight line always sum to 180°.",
          "Subtract: 180° - 125° = 55°."
        ],
        "explanation": "\\(x = 180^\\circ - 125^\\circ = 55^\\circ\\)."
      },
      {
        "id": "u5-e4",
        "q": "Three angles around a point are \\(120^\\circ\\), \\(140^\\circ\\), and \\(y^\\circ\\). Find \\(y\\)",
        "options": [
          "100°",
          "110°",
          "90°",
          "80°"
        ],
        "answer": "100°",
        "hint": "Angles around a point sum to 360°.",
        "stepByStep": [
          "120° + 140° = 260°.",
          "360° - 260° = 100°."
        ],
        "explanation": "\\(y = 360^\\circ - 260^\\circ = 100^\\circ\\)."
      },
      {
        "id": "u5-e5",
        "q": "Which of these is a valid 3-figure bearing for North-East?",
        "options": [
          "045°",
          "45°",
          "450°",
          "135°"
        ],
        "answer": "045°",
        "hint": "Bearings must always be written with three digits.",
        "stepByStep": [
          "North-East is 45° clockwise from North.",
          "Add leading zero to make 3 digits: 045°."
        ],
        "explanation": "Bearings require 3 digits: \\(045^\\circ\\)."
      },
      {
        "id": "u5-e6",
        "q": "Two lines intersect. If one angle is \\(48^\\circ\\), what is its vertically opposite angle?",
        "options": [
          "48°",
          "132°",
          "96°",
          "42°"
        ],
        "answer": "48°",
        "hint": "Vertically opposite angles are equal.",
        "stepByStep": [
          "Vertically opposite angles are identical.",
          "Therefore the opposite angle is 48°."
        ],
        "explanation": "Vertically opposite angles are equal, so it is \\(48^\\circ\\)."
      }
    ],
    "medium": [
      {
        "id": "u5-m3",
        "q": "Two parallel lines are crossed by a transversal. If an interior angle is \\(72^\\circ\\), what is its co-interior (allied) angle?",
        "options": [
          "108°",
          "72°",
          "18°",
          "118°"
        ],
        "answer": "108°",
        "hint": "Co-interior angles (C-angles) between parallel lines add up to 180°.",
        "stepByStep": [
          "Co-interior angles between parallel lines add up to 180°.",
          "Subtract: 180° - 72° = 108°."
        ],
        "explanation": "\\(180^\\circ - 72^\\circ = 108^\\circ\\)."
      },
      {
        "id": "u5-m4",
        "q": "Two parallel lines are cut by a transversal. Angle \\(A = 115^\\circ\\). What is its corresponding (F-angle)?",
        "options": [
          "115°",
          "65°",
          "75°",
          "125°"
        ],
        "answer": "115°",
        "hint": "Corresponding angles on parallel lines are equal.",
        "stepByStep": [
          "Corresponding angles match in position in the F-shape.",
          "Angle = 115°."
        ],
        "explanation": "Corresponding angles are equal: \\(115^\\circ\\)."
      },
      {
        "id": "u5-m5",
        "q": "An airplane flies on a bearing of \\(130^\\circ\\). What is the back-bearing for its return flight?",
        "options": [
          "310°",
          "220°",
          "050°",
          "290°"
        ],
        "answer": "310°",
        "hint": "Since forward bearing is < 180°, add 180° to find back-bearing.",
        "stepByStep": [
          "130° is less than 180°.",
          "130° + 180° = 310°."
        ],
        "explanation": "\\(130^\\circ + 180^\\circ = 310^\\circ\\)."
      },
      {
        "id": "u5-m6",
        "q": "Three angles meet at a point in the ratio \\(1 : 2 : 3\\). What is the largest angle?",
        "options": [
          "180°",
          "120°",
          "150°",
          "90°"
        ],
        "answer": "180°",
        "hint": "Total ratio parts = 1 + 2 + 3 = 6. Angles at a point sum to 360°.",
        "stepByStep": [
          "360° ÷ 6 = 60° per part.",
          "Largest angle = 3 parts = 3 × 60° = 180°."
        ],
        "explanation": "\\(\\frac{360^\\circ}{6} \\times 3 = 180^\\circ\\)."
      }
    ],
    "hard": [
      {
        "id": "u5-h3",
        "q": "Point Q is on a bearing of \\(285^\\circ\\) from Point P. What is the bearing of Point P from Point Q?",
        "options": [
          "105°",
          "095°",
          "115°",
          "285°"
        ],
        "answer": "105°",
        "hint": "When forward bearing is > 180°, subtract 180° to find back-bearing.",
        "stepByStep": [
          "285° is greater than 180°.",
          "285° - 180° = 105°."
        ],
        "explanation": "\\(285^\\circ - 180^\\circ = 105^\\circ\\)."
      },
      {
        "id": "u5-h4",
        "q": "In an isosceles triangle, one angle is \\(46^\\circ\\) and the other two angles are equal. Calculate the size of each equal angle",
        "options": [
          "67°",
          "74°",
          "58°",
          "64°"
        ],
        "answer": "67°",
        "hint": "Angles in a triangle add to 180°. Subtract 46°, then divide by 2.",
        "stepByStep": [
          "180° - 46° = 134°.",
          "134° ÷ 2 = 67°."
        ],
        "explanation": "\\(\\frac{180^\\circ - 46^\\circ}{2} = 67^\\circ\\)."
      },
      {
        "id": "u5-h5",
        "q": "Two co-interior angles between parallel lines are \\(3x^\\circ\\) and \\((2x + 20)^\\circ\\). Find \\(x\\)",
        "options": [
          "32",
          "36",
          "40",
          "28"
        ],
        "answer": "32",
        "hint": "Co-interior angles add up to 180°: 3x + 2x + 20 = 180.",
        "stepByStep": [
          "5x + 20 = 180.",
          "5x = 160.",
          "x = 32."
        ],
        "explanation": "\\(5x = 160 \\implies x = 32\\)."
      },
      {
        "id": "u5-h6",
        "q": "A ship sails from Port on bearing \\(070^\\circ\\) to Beacon A, then turns \\(90^\\circ\\) clockwise towards Island B. What is the bearing of Island B from Beacon A?",
        "options": [
          "160°",
          "150°",
          "170°",
          "020°"
        ],
        "answer": "160°",
        "hint": "Add 90° clockwise to the initial bearing of 070°.",
        "stepByStep": [
          "Start at 070°.",
          "Turn 90° clockwise: 070° + 090° = 160°."
        ],
        "explanation": "\\(070^\\circ + 90^\\circ = 160^\\circ\\)."
      }
    ]
  },
  "unit6-collecting-data": {
    "easy": [
      {
        "id": "u6-e3",
        "q": "Find the mode of the numbers: \\(4, 7, 7, 8, 9, 7, 5\\)",
        "options": [
          "7",
          "8",
          "5",
          "4"
        ],
        "answer": "7",
        "hint": "The mode is the number that appears most frequently.",
        "stepByStep": [
          "7 appears 3 times.",
          "All other numbers appear once, so mode = 7."
        ],
        "explanation": "The modal score is 7 because it appears 3 times."
      },
      {
        "id": "u6-e4",
        "q": "Find the range of the scores: \\(12, 19, 8, 25, 14\\)",
        "options": [
          "17",
          "19",
          "13",
          "25"
        ],
        "answer": "17",
        "hint": "Range = highest value minus lowest value.",
        "stepByStep": [
          "Highest score is 25.",
          "Lowest score is 8.",
          "25 - 8 = 17."
        ],
        "explanation": "\\(25 - 8 = 17\\)."
      },
      {
        "id": "u6-e5",
        "q": "Calculate the mean of \\(6, 8, 10\\)",
        "options": [
          "8",
          "7",
          "9",
          "24"
        ],
        "answer": "8",
        "hint": "Add the 3 numbers and divide by 3.",
        "stepByStep": [
          "Sum = 6 + 8 + 10 = 24.",
          "24 ÷ 3 = 8."
        ],
        "explanation": "\\(24 \\div 3 = 8\\)."
      },
      {
        "id": "u6-e6",
        "q": "Find the median of the numbers: \\(3, 5, 8, 11, 14\\)",
        "options": [
          "8",
          "5",
          "11",
          "8.2"
        ],
        "answer": "8",
        "hint": "The numbers are already sorted. Pick the middle value.",
        "stepByStep": [
          "There are 5 numbers.",
          "The 3rd number is 8, so median = 8."
        ],
        "explanation": "Median = 8."
      }
    ],
    "medium": [
      {
        "id": "u6-m3",
        "q": "Find the median of this even dataset: \\(4, 7, 9, 11, 14, 17\\)",
        "options": [
          "10",
          "9",
          "11",
          "9.5"
        ],
        "answer": "10",
        "hint": "With 6 numbers, average the two middle values (9 and 11).",
        "stepByStep": [
          "Middle values are 9 and 11.",
          "(9 + 11) ÷ 2 = 20 ÷ 2 = 10."
        ],
        "explanation": "Median = \\(\\frac{9 + 11}{2} = 10\\)."
      },
      {
        "id": "u6-m4",
        "q": "Five learners scored: \\(14, 16, 18, 12,\\) and \\(20\\). What is their mean score?",
        "options": [
          "16",
          "15",
          "17",
          "18"
        ],
        "answer": "16",
        "hint": "Sum all 5 scores, then divide by 5.",
        "stepByStep": [
          "14 + 16 + 18 + 12 + 20 = 80.",
          "80 ÷ 5 = 16."
        ],
        "explanation": "\\(80 \\div 5 = 16\\)."
      },
      {
        "id": "u6-m5",
        "q": "In a frequency table, scores are: \\(5\\) (freq \\(2\\)), \\(6\\) (freq \\(5\\)), \\(7\\) (freq \\(3\\)). What is the modal score?",
        "options": [
          "6",
          "5",
          "7",
          "10"
        ],
        "answer": "6",
        "hint": "The modal score has the highest frequency.",
        "stepByStep": [
          "Score 6 has frequency 5, which is the highest.",
          "Therefore mode is 6."
        ],
        "explanation": "Modal score is 6."
      },
      {
        "id": "u6-m6",
        "q": "The mean of 4 numbers is \\(12\\). Three of the numbers are \\(10, 14,\\) and \\(11\\). Find the fourth number",
        "options": [
          "13",
          "12",
          "15",
          "9"
        ],
        "answer": "13",
        "hint": "Total sum must be 4 × 12 = 48. Subtract the 3 known numbers.",
        "stepByStep": [
          "Target sum = 4 × 12 = 48.",
          "Known sum = 10 + 14 + 11 = 35.",
          "48 - 35 = 13."
        ],
        "explanation": "The 4th number is \\(48 - 35 = 13\\)."
      }
    ],
    "hard": [
      {
        "id": "u6-h3",
        "q": "Justin took 5 tests and has a mean score of \\(78\\%\\). What score must he get on his 6th test to raise his overall mean to \\(80\\%\\)?",
        "options": [
          "90%",
          "88%",
          "92%",
          "85%"
        ],
        "answer": "90%",
        "hint": "Target total for 6 tests is 6 × 80 = 480. Current total for 5 tests is 5 × 78 = 390.",
        "stepByStep": [
          "Target sum = 6 × 80 = 480.",
          "Current sum = 5 × 78 = 390.",
          "480 - 390 = 90%."
        ],
        "explanation": "He needs \\(480 - 390 = 90\\%\\)."
      },
      {
        "id": "u6-h4",
        "q": "A frequency table shows: \\(1\\) (freq \\(3\\)), \\(2\\) (freq \\(4\\)), \\(3\\) (freq \\(5\\)), \\(4\\) (freq \\(8\\)). Calculate the median score",
        "options": [
          "3",
          "3.5",
          "4",
          "2.5"
        ],
        "answer": "3",
        "hint": "Total frequency = 20. The median is the average of 10th and 11th values.",
        "stepByStep": [
          "Positions 1-3: score 1.",
          "Positions 4-7: score 2.",
          "Positions 8-12: score 3.",
          "Both 10th and 11th values are 3, so median = 3."
        ],
        "explanation": "Median is 3."
      },
      {
        "id": "u6-h5",
        "q": "A set of 6 numbers has a mean of \\(15\\). When a new number \\(22\\) is added, what is the new mean?",
        "options": [
          "16",
          "15.5",
          "17",
          "16.5"
        ],
        "answer": "16",
        "hint": "Original sum = 6 × 15 = 90. New sum = 90 + 22 = 112. Divide by 7.",
        "stepByStep": [
          "Original sum = 6 × 15 = 90.",
          "New sum = 90 + 22 = 112.",
          "112 ÷ 7 = 16."
        ],
        "explanation": "New mean = \\(112 \\div 7 = 16\\)."
      },
      {
        "id": "u6-h6",
        "q": "Find the mean of the numbers: \\(15, 23, 18, 29, 35\\)",
        "options": [
          "24",
          "23",
          "25",
          "26"
        ],
        "answer": "24",
        "hint": "Add the 5 numbers: 15 + 23 + 18 + 29 + 35 = 120. Divide by 5.",
        "stepByStep": [
          "Sum = 120.",
          "120 ÷ 5 = 24."
        ],
        "explanation": "\\(120 \\div 5 = 24\\)."
      }
    ]
  },
  "unit4-f-d-p": {
    "easy": [
      {
        "id": "u4-e3",
        "q": "Convert \\(0.75\\) to a percentage",
        "options": [
          "75%",
          "7.5%",
          "0.75%",
          "750%"
        ],
        "answer": "75%",
        "hint": "Multiply by 100 to convert a decimal into a percentage.",
        "stepByStep": [
          "0.75 × 100 = 75.",
          "Add % symbol: 75%."
        ],
        "explanation": "\\(0.75 = 75\\%\\)."
      },
      {
        "id": "u4-e4",
        "q": "Convert \\(40\\%\\) to a fraction in simplest form",
        "options": [
          "2/5",
          "4/10",
          "4/5",
          "1/4"
        ],
        "answer": "2/5",
        "hint": "Write 40/100 and divide top and bottom by 20.",
        "stepByStep": [
          "40/100.",
          "Divide by 20: 2/5."
        ],
        "explanation": "\\(40\\% = \\frac{40}{100} = \\frac{2}{5}\\)."
      },
      {
        "id": "u4-e5",
        "q": "Convert \\(\\frac{7}{10}\\) to a decimal",
        "options": [
          "0.7",
          "0.07",
          "7.0",
          "0.77"
        ],
        "answer": "0.7",
        "hint": "7 tenths is written with 7 in the tenths position.",
        "stepByStep": [
          "The denominator is 10, which indicates the tenths place value.",
          "7 divided by 10 = 0.7."
        ],
        "explanation": "\\(\\frac{7}{10} = 0.7\\)."
      },
      {
        "id": "u4-e6",
        "q": "Find \\(10\\%\\) of \\(\\text{R } 350\\)",
        "options": [
          "R 35",
          "R 3.50",
          "R 350",
          "R 70"
        ],
        "answer": "R 35",
        "hint": "To find 10%, divide by 10.",
        "stepByStep": [
          "To find 10% of any value, divide the amount by 10.",
          "350 ÷ 10 = R 35."
        ],
        "explanation": "\\(10\\%\\text{ of R } 350 = \\text{R } 35\\)."
      }
    ],
    "medium": [
      {
        "id": "u4-m3",
        "q": "Calculate \\(35\\%\\) of \\(\\text{R } 240\\)",
        "options": [
          "R 84",
          "R 70",
          "R 96",
          "R 80"
        ],
        "answer": "R 84",
        "hint": "10% is R24. 30% is R72. 5% is R12. 72 + 12 = 84.",
        "stepByStep": [
          "10% = 24.",
          "30% = 3 × 24 = 72.",
          "5% = 12.",
          "72 + 12 = R 84."
        ],
        "explanation": "\\(0.35 \\times 240 = \\text{R } 84\\)."
      },
      {
        "id": "u4-m4",
        "q": "Convert \\(\\frac{3}{8}\\) to a decimal",
        "options": [
          "0.375",
          "0.38",
          "0.35",
          "0.425"
        ],
        "answer": "0.375",
        "hint": "1/8 is 0.125. Multiply 0.125 by 3.",
        "stepByStep": [
          "1/8 = 0.125.",
          "3 × 0.125 = 0.375."
        ],
        "explanation": "\\(\\frac{3}{8} = 0.375\\)."
      },
      {
        "id": "u4-m5",
        "q": "Arrange in order from smallest to largest: \\(\\frac{3}{5}, 65\\%, 0.58\\)",
        "options": [
          "0.58, 3/5, 65%",
          "3/5, 0.58, 65%",
          "65%, 3/5, 0.58",
          "0.58, 65%, 3/5"
        ],
        "answer": "0.58, 3/5, 65%",
        "hint": "Convert all to decimals: 3/5 = 0.60, 65% = 0.65, 0.58.",
        "stepByStep": [
          "0.58 = 0.58.",
          "3/5 = 0.60.",
          "65% = 0.65.",
          "Order: 0.58 < 0.60 < 0.65."
        ],
        "explanation": "In order: \\(0.58, \\frac{3}{5}, 65\\%\\)."
      },
      {
        "id": "u4-m6",
        "q": "In a class of \\(30\\) learners, \\(18\\) walk to school. What percentage walk to school?",
        "options": [
          "60%",
          "54%",
          "65%",
          "50%"
        ],
        "answer": "60%",
        "hint": "18/30 simplifies to 3/5 = 60%.",
        "stepByStep": [
          "18 ÷ 30 = 0.60.",
          "0.60 × 100 = 60%."
        ],
        "explanation": "\\(\\frac{18}{30} \\times 100 = 60\\%\\)."
      }
    ],
    "hard": [
      {
        "id": "u4-h3",
        "q": "Justin scored \\(34\\) out of \\(40\\) in a science quiz. What is his percentage mark?",
        "options": [
          "85%",
          "82.5%",
          "80%",
          "87.5%"
        ],
        "answer": "85%",
        "hint": "34/40 = 17/20. Multiply numerator and denominator by 5.",
        "stepByStep": [
          "34/40 = 17/20.",
          "17 × 5 = 85, so 85/100 = 85%."
        ],
        "explanation": "\\(\\frac{34}{40} \\times 100 = 85\\%\\)."
      },
      {
        "id": "u4-h4",
        "q": "Calculate \\(17.5\\%\\) of \\(\\text{R } 400\\) without a calculator",
        "options": [
          "R 70",
          "R 65",
          "R 75",
          "R 80"
        ],
        "answer": "R 70",
        "hint": "10% is 40, 5% is 20, 2.5% is 10. Add them up.",
        "stepByStep": [
          "10% = 40.",
          "5% = 20.",
          "2.5% = 10.",
          "40 + 20 + 10 = R 70."
        ],
        "explanation": "\\(17.5\\%\\text{ of 400} = \\text{R } 70\\)."
      },
      {
        "id": "u4-h5",
        "q": "A bicycle originally priced at \\(\\text{R } 1600\\) is reduced by \\(15\\%\\). What is the sale price?",
        "options": [
          "R 1360",
          "R 1440",
          "R 1380",
          "R 1240"
        ],
        "answer": "R 1360",
        "hint": "10% of 1600 is 160; 5% is 80. Discount = 240.",
        "stepByStep": [
          "Discount = 160 + 80 = R 240.",
          "Sale price = 1600 - 240 = R 1360."
        ],
        "explanation": "\\(1600 - 240 = \\text{R } 1360\\)."
      },
      {
        "id": "u4-h6",
        "q": "Express \\(\\frac{5}{12}\\) as a percentage rounded to 1 decimal place",
        "options": [
          "41.7%",
          "41.5%",
          "42.0%",
          "40.8%"
        ],
        "answer": "41.7%",
        "hint": "5 ÷ 12 = 0.41666... Multiply by 100: 41.666...",
        "stepByStep": [
          "500 ÷ 12 = 41.666...%",
          "Round to 1 d.p. = 41.7%."
        ],
        "explanation": "\\(\\frac{5}{12} \\approx 41.7\\%\\)."
      }
    ]
  },
  "unit8-shapes-polyhedra": {
    "easy": [
      {
        "id": "u8-e3",
        "q": "How many sides does a regular octagon have?",
        "options": [
          "8",
          "6",
          "7",
          "10"
        ],
        "answer": "8",
        "hint": "Octa- means 8 (like octopus).",
        "stepByStep": [
          "The prefix octa- means 8 (like an octopus with 8 arms).",
          "Therefore, a regular octagon has 8 sides."
        ],
        "explanation": "An octagon has 8 sides."
      },
      {
        "id": "u8-e4",
        "q": "How many faces does a cube have?",
        "options": [
          "6",
          "8",
          "12",
          "4"
        ],
        "answer": "6",
        "hint": "Think of a standard playing die: numbers 1 to 6 on 6 faces.",
        "stepByStep": [
          "A cube has top, bottom, front, back, left, and right faces.",
          "All 6 faces are identical squares."
        ],
        "explanation": "A cube has 6 faces."
      },
      {
        "id": "u8-e5",
        "q": "How many vertices does a square-based pyramid have?",
        "options": [
          "5",
          "4",
          "8",
          "6"
        ],
        "answer": "5",
        "hint": "4 corners on the square base plus 1 apex at the top.",
        "stepByStep": [
          "A square base has 4 vertices.",
          "The triangular faces meet at 1 apex on top: 4 + 1 = 5 vertices."
        ],
        "explanation": "A square pyramid has 5 vertices."
      },
      {
        "id": "u8-e6",
        "q": "What is the order of rotational symmetry of an equilateral triangle?",
        "options": [
          "3",
          "1",
          "2",
          "6"
        ],
        "answer": "3",
        "hint": "A regular polygon has rotational symmetry equal to its number of sides.",
        "stepByStep": [
          "Rotates onto itself at 120°, 240°, and 360°.",
          "Order = 3."
        ],
        "explanation": "Order of rotational symmetry = 3."
      }
    ],
    "medium": [
      {
        "id": "u8-m3",
        "q": "A polygon has 6 sides (hexagon). Calculate the sum of its interior angles",
        "options": [
          "720°",
          "540°",
          "900°",
          "360°"
        ],
        "answer": "720°",
        "hint": "Use formula: (n - 2) × 180° with n = 6.",
        "stepByStep": [
          "n - 2 = 6 - 2 = 4 triangles.",
          "4 × 180° = 720°."
        ],
        "explanation": "\\((6 - 2) \\times 180^\\circ = 720^\\circ\\)."
      },
      {
        "id": "u8-m4",
        "q": "Calculate the size of each interior angle in a regular hexagon",
        "options": [
          "120°",
          "108°",
          "135°",
          "140°"
        ],
        "answer": "120°",
        "hint": "Divide the total angle sum of 720° equally by 6.",
        "stepByStep": [
          "The sum of interior angles in a hexagon is 720°.",
          "Divide equally among all 6 angles: 720° ÷ 6 = 120°."
        ],
        "explanation": "\\(\\frac{720^\\circ}{6} = 120^\\circ\\)."
      },
      {
        "id": "u8-m5",
        "q": "A polyhedron has 8 vertices and 12 edges. Using Euler's formula \\(V - E + F = 2\\), find the number of faces \\(F\\)",
        "options": [
          "6",
          "8",
          "10",
          "4"
        ],
        "answer": "6",
        "hint": "8 - 12 + F = 2. Simplify: -4 + F = 2.",
        "stepByStep": [
          "8 - 12 + F = 2.",
          "-4 + F = 2.",
          "F = 6."
        ],
        "explanation": "\\(F = 6\\) (this is a cuboid or octahedron dual)."
      },
      {
        "id": "u8-m6",
        "q": "How many lines of symmetry does a regular hexagon have?",
        "options": [
          "6",
          "3",
          "12",
          "4"
        ],
        "answer": "6",
        "hint": "A regular n-sided polygon always has n lines of symmetry.",
        "stepByStep": [
          "3 lines through opposite vertices.",
          "3 lines through midpoints of opposite sides.",
          "Total = 6 lines."
        ],
        "explanation": "A regular hexagon has 6 lines of symmetry."
      }
    ],
    "hard": [
      {
        "id": "u8-h3",
        "q": "Each exterior angle of a regular polygon is \\(40^\\circ\\). How many sides does the polygon have?",
        "options": [
          "9",
          "8",
          "10",
          "12"
        ],
        "answer": "9",
        "hint": "Exterior angles always sum to 360°. Divide 360° by 40°.",
        "stepByStep": [
          "Number of sides = 360° ÷ 40°.",
          "360 ÷ 40 = 9."
        ],
        "explanation": "Number of sides = \\(360^\\circ \\div 40^\\circ = 9\\) (nonagon)."
      },
      {
        "id": "u8-h4",
        "q": "A regular polygon has an interior angle of \\(135^\\circ\\). How many sides does it have?",
        "options": [
          "8",
          "10",
          "12",
          "6"
        ],
        "answer": "8",
        "hint": "Exterior angle = 180° - 135° = 45°. Then sides = 360° ÷ 45°.",
        "stepByStep": [
          "Exterior angle = 180° - 135° = 45°.",
          "Sides = 360° ÷ 45° = 8."
        ],
        "explanation": "It has \\(8\\) sides (regular octagon)."
      },
      {
        "id": "u8-h5",
        "q": "A triangular prism has vertices \\(V\\), edges \\(E\\), and faces \\(F\\). Verify Euler's formula",
        "options": [
          "6 - 9 + 5 = 2",
          "8 - 12 + 6 = 2",
          "5 - 8 + 5 = 2",
          "6 - 8 + 4 = 2"
        ],
        "answer": "6 - 9 + 5 = 2",
        "hint": "A triangular prism has 6 vertices, 9 edges, and 5 faces.",
        "stepByStep": [
          "V = 6, E = 9, F = 5.",
          "6 - 9 + 5 = -3 + 5 = 2."
        ],
        "explanation": "\\(V - E + F = 6 - 9 + 5 = 2\\)."
      },
      {
        "id": "u8-h6",
        "q": "The sum of the interior angles of an n-sided polygon is \\(1440^\\circ\\). Find \\(n\\)",
        "options": [
          "10",
          "12",
          "8",
          "11"
        ],
        "answer": "10",
        "hint": "(n - 2) × 180° = 1440°. Divide 1440 by 180.",
        "stepByStep": [
          "1440 ÷ 180 = 8.",
          "n - 2 = 8.",
          "n = 10."
        ],
        "explanation": "\\(n = 8 + 2 = 10\\) (decagon)."
      }
    ]
  },
  "unit9-sequences": {
    "easy": [
      {
        "id": "u9-e3",
        "q": "State the term-to-term rule for the sequence: \\(4, 9, 14, 19, 24...\\)",
        "options": [
          "Add 5",
          "Add 4",
          "Multiply by 2",
          "Add 6"
        ],
        "answer": "Add 5",
        "hint": "Find the difference between consecutive terms: 9 - 4.",
        "stepByStep": [
          "9 - 4 = 5.",
          "14 - 9 = 5.",
          "Rule is: Add 5."
        ],
        "explanation": "The term-to-term rule is Add 5."
      },
      {
        "id": "u9-e4",
        "q": "Find the next two terms in the sequence: \\(27, 24, 21, 18...\\)",
        "options": [
          "15, 12",
          "16, 13",
          "15, 11",
          "14, 11"
        ],
        "answer": "15, 12",
        "hint": "The term-to-term rule is subtract 3.",
        "stepByStep": [
          "18 - 3 = 15.",
          "15 - 3 = 12."
        ],
        "explanation": "Next terms are 15, 12."
      },
      {
        "id": "u9-e5",
        "q": "The position-to-term rule is \\(4n + 1\\). Find the 3rd term",
        "options": [
          "13",
          "11",
          "15",
          "9"
        ],
        "answer": "13",
        "hint": "Substitute n = 3 into 4n + 1.",
        "stepByStep": [
          "4 × 3 = 12.",
          "12 + 1 = 13."
        ],
        "explanation": "\\(4(3) + 1 = 13\\)."
      },
      {
        "id": "u9-e6",
        "q": "A function machine multiplies input by \\(3\\) and adds \\(4\\). If input is \\(5\\), what is output?",
        "options": [
          "19",
          "17",
          "27",
          "23"
        ],
        "answer": "19",
        "hint": "Multiply 5 by 3 first, then add 4.",
        "stepByStep": [
          "5 × 3 = 15.",
          "15 + 4 = 19."
        ],
        "explanation": "Output = 19."
      }
    ],
    "medium": [
      {
        "id": "u9-m3",
        "q": "Find the nth term rule for the sequence: \\(5, 8, 11, 14, 17...\\)",
        "options": [
          "3n + 2",
          "3n + 5",
          "5n + 3",
          "2n + 3"
        ],
        "answer": "3n + 2",
        "hint": "The common difference is 3 (3n). First term: 3(1) + c = 5, so c = 2.",
        "stepByStep": [
          "Common difference = +3 -> 3n.",
          "For n = 1: 3(1) = 3; need +2 to make 5.",
          "Rule = 3n + 2."
        ],
        "explanation": "The nth term is \\(3n + 2\\)."
      },
      {
        "id": "u9-m4",
        "q": "Find the nth term rule for the sequence: \\(7, 11, 15, 19, 23...\\)",
        "options": [
          "4n + 3",
          "4n + 7",
          "3n + 4",
          "4n - 1"
        ],
        "answer": "4n + 3",
        "hint": "Difference is 4 (4n). 4(1) + 3 = 7.",
        "stepByStep": [
          "Difference = 4 -> 4n.",
          "First term is 7: 4(1) + 3 = 7.",
          "Rule = 4n + 3."
        ],
        "explanation": "The nth term is \\(4n + 3\\)."
      },
      {
        "id": "u9-m5",
        "q": "The nth term of a sequence is \\(5n - 3\\). Find the 12th term",
        "options": [
          "57",
          "60",
          "54",
          "63"
        ],
        "answer": "57",
        "hint": "Substitute n = 12 into 5n - 3.",
        "stepByStep": [
          "5 × 12 = 60.",
          "60 - 3 = 57."
        ],
        "explanation": "\\(5(12) - 3 = 57\\)."
      },
      {
        "id": "u9-m6",
        "q": "A sequence has nth term \\(2n + 5\\). Is \\(42\\) a term in this sequence?",
        "options": [
          "No, because (42 - 5) / 2 = 18.5 which is not an integer",
          "Yes, it is the 21st term",
          "Yes, it is the 18th term",
          "Cannot be determined"
        ],
        "answer": "No, because (42 - 5) / 2 = 18.5 which is not an integer",
        "hint": "Solve 2n + 5 = 42 for n.",
        "stepByStep": [
          "2n + 5 = 42.",
          "2n = 37 -> n = 18.5.",
          "n must be a whole number, so 42 is not in the sequence."
        ],
        "explanation": "No, because \\(n = 18.5\\) is not an integer."
      }
    ],
    "hard": [
      {
        "id": "u9-h3",
        "q": "Find the nth term rule for the decreasing sequence: \\(29, 25, 21, 17, 13...\\)",
        "options": [
          "33 - 4n",
          "-4n + 29",
          "4n + 25",
          "30 - 4n"
        ],
        "answer": "33 - 4n",
        "hint": "Common difference is -4. Zero-th term is 29 - (-4) = 33.",
        "stepByStep": [
          "Difference is -4 -> -4n.",
          "For n = 1: -4(1) + c = 29 -> c = 33.",
          "Rule: 33 - 4n."
        ],
        "explanation": "The nth term is \\(33 - 4n\\)."
      },
      {
        "id": "u9-h4",
        "q": "A pattern of matchsticks has \\(n\\)-th term \\(3n + 1\\). How many matchsticks are needed for the 25th pattern?",
        "options": [
          "76",
          "75",
          "78",
          "81"
        ],
        "answer": "76",
        "hint": "Substitute n = 25 into 3n + 1.",
        "stepByStep": [
          "3 × 25 = 75.",
          "75 + 1 = 76."
        ],
        "explanation": "\\(3(25) + 1 = 76\\)."
      },
      {
        "id": "u9-h5",
        "q": "Which term in the sequence with nth term \\(6n - 5\\) is equal to \\(139\\)?",
        "options": [
          "24th term",
          "23rd term",
          "25th term",
          "22nd term"
        ],
        "answer": "24th term",
        "hint": "Set 6n - 5 = 139 and solve for n.",
        "stepByStep": [
          "6n - 5 = 139.",
          "6n = 144.",
          "n = 24."
        ],
        "explanation": "\\(6n = 144 \\implies n = 24\\)."
      },
      {
        "id": "u9-h6",
        "q": "The first four terms of a sequence are \\(2, 8, 18, 32...\\). State the nth term rule",
        "options": [
          "2n²",
          "n² + 1",
          "4n - 2",
          "3n² - 1"
        ],
        "answer": "2n²",
        "hint": "Compare with square numbers: 1, 4, 9, 16. Each term is double n².",
        "stepByStep": [
          "1² × 2 = 2.",
          "2² × 2 = 8.",
          "3² × 2 = 18.",
          "Rule is 2n²."
        ],
        "explanation": "The nth term is \\(2n^2\\)."
      }
    ]
  },
  "unit12-ratio-proportion": {
    "easy": [
      {
        "id": "u12-e3",
        "q": "Simplify the ratio \\(18 : 24\\) to its simplest form",
        "options": [
          "3 : 4",
          "2 : 3",
          "9 : 12",
          "6 : 8"
        ],
        "answer": "3 : 4",
        "hint": "Divide both numbers by their highest common factor (6).",
        "stepByStep": [
          "18 ÷ 6 = 3.",
          "24 ÷ 6 = 4.",
          "Ratio = 3 : 4."
        ],
        "explanation": "\\(18 : 24 = 3 : 4\\)."
      },
      {
        "id": "u12-e4",
        "q": "Simplify the ratio \\(15\\text{ cm} : 1.2\\text{ m}\\)",
        "options": [
          "1 : 8",
          "15 : 12",
          "1 : 80",
          "5 : 4"
        ],
        "answer": "1 : 8",
        "hint": "Convert 1.2 m to cm: 1.2 × 100 = 120 cm.",
        "stepByStep": [
          "1.2 m = 120 cm.",
          "15 : 120.",
          "Divide by 15: 1 : 8."
        ],
        "explanation": "\\(15\\text{ cm} : 120\\text{ cm} = 1 : 8\\)."
      },
      {
        "id": "u12-e5",
        "q": "If 4 pens cost \\(\\text{R } 28\\), how much do 6 pens cost?",
        "options": [
          "R 42",
          "R 36",
          "R 48",
          "R 35"
        ],
        "answer": "R 42",
        "hint": "Find cost of 1 pen first: 28 ÷ 4 = R7.",
        "stepByStep": [
          "1 pen = 28 ÷ 4 = R 7.",
          "6 pens = 6 × 7 = R 42."
        ],
        "explanation": "Cost = \\(6 \\times 7 = \\text{R } 42\\)."
      },
      {
        "id": "u12-e6",
        "q": "Write the ratio \\(2 : 5\\) in the form \\(1 : n\\)",
        "options": [
          "1 : 2.5",
          "1 : 5",
          "1 : 2",
          "1 : 0.4"
        ],
        "answer": "1 : 2.5",
        "hint": "Divide both parts by 2.",
        "stepByStep": [
          "2 ÷ 2 = 1.",
          "5 ÷ 2 = 2.5."
        ],
        "explanation": "\\(2 : 5 = 1 : 2.5\\)."
      }
    ],
    "medium": [
      {
        "id": "u12-m3",
        "q": "Share \\(\\text{R } 450\\) in the ratio \\(4 : 5\\). What is the larger share?",
        "options": [
          "R 250",
          "R 200",
          "R 225",
          "R 275"
        ],
        "answer": "R 250",
        "hint": "Total parts = 4 + 5 = 9. Divide R450 by 9, then multiply by 5.",
        "stepByStep": [
          "450 ÷ 9 = R 50 per part.",
          "Larger share = 5 × 50 = R 250."
        ],
        "explanation": "Larger share = \\(\\text{R } 250\\)."
      },
      {
        "id": "u12-m4",
        "q": "Two angles in a triangle are in the ratio \\(2 : 3\\). If the third angle is \\(80^\\circ\\), find the smallest angle",
        "options": [
          "40°",
          "60°",
          "30°",
          "50°"
        ],
        "answer": "40°",
        "hint": "Sum of remaining two angles = 180° - 80° = 100°. Divide in ratio 2 : 3.",
        "stepByStep": [
          "180° - 80° = 100°.",
          "Total parts = 2 + 3 = 5.",
          "100° ÷ 5 = 20° per part.",
          "Smallest = 2 × 20° = 40°."
        ],
        "explanation": "Smallest angle = \\(40^\\circ\\)."
      },
      {
        "id": "u12-m5",
        "q": "A car travels \\(180\\text{ km}\\) on \\(15\\text{ litres}\\) of petrol. How far can it travel on \\(24\\text{ litres}\\)?",
        "options": [
          "288 km",
          "270 km",
          "300 km",
          "260 km"
        ],
        "answer": "288 km",
        "hint": "Calculate km per litre first: 180 ÷ 15 = 12 km/l.",
        "stepByStep": [
          "180 ÷ 15 = 12 km per litre.",
          "12 × 24 = 288 km."
        ],
        "explanation": "Distance = \\(288\\text{ km}\\)."
      },
      {
        "id": "u12-m6",
        "q": "Divide \\(84\\text{ kg}\\) in the ratio \\(2 : 3 : 7\\). What is the smallest share?",
        "options": [
          "14 kg",
          "21 kg",
          "49 kg",
          "12 kg"
        ],
        "answer": "14 kg",
        "hint": "Total parts = 2 + 3 + 7 = 12. 84 ÷ 12 = 7 kg per part.",
        "stepByStep": [
          "84 ÷ 12 = 7 kg.",
          "Smallest share = 2 × 7 = 14 kg."
        ],
        "explanation": "Smallest share = \\(14\\text{ kg}\\)."
      }
    ],
    "hard": [
      {
        "id": "u12-h3",
        "q": "In a school of \\(720\\) learners, the ratio of boys to girls is \\(5 : 4\\). How many more boys than girls are there?",
        "options": [
          "80",
          "60",
          "90",
          "100"
        ],
        "answer": "80",
        "hint": "Total parts = 9. Find 1 part: 720 ÷ 9 = 80.",
        "stepByStep": [
          "720 ÷ 9 = 80 per part.",
          "Difference between 5 parts and 4 parts is 1 part.",
          "1 × 80 = 80."
        ],
        "explanation": "There are 80 more boys than girls."
      },
      {
        "id": "u12-h4",
        "q": "Justin and Liam share money in the ratio \\(3 : 7\\). Liam receives \\(\\text{R } 280\\) more than Justin. How much money did they share in total?",
        "options": [
          "R 700",
          "R 560",
          "R 840",
          "R 640"
        ],
        "answer": "R 700",
        "hint": "Difference in parts = 7 - 3 = 4 parts = R280. Find 1 part = 70.",
        "stepByStep": [
          "4 parts = R 280 -> 1 part = R 70.",
          "Total parts = 3 + 7 = 10 parts.",
          "10 × 70 = R 700."
        ],
        "explanation": "Total shared = \\(\\text{R } 700\\)."
      },
      {
        "id": "u12-h5",
        "q": "A recipe for 8 muffins requires \\(320\\text{ g}\\) of flour. How much flour is needed to make 20 muffins?",
        "options": [
          "800 g",
          "750 g",
          "640 g",
          "840 g"
        ],
        "answer": "800 g",
        "hint": "320 ÷ 8 = 40 g per muffin. Multiply by 20.",
        "stepByStep": [
          "1 muffin = 320 ÷ 8 = 40 g.",
          "20 muffins = 20 × 40 = 800 g."
        ],
        "explanation": "Flour needed = \\(800\\text{ g}\\)."
      },
      {
        "id": "u12-h6",
        "q": "Three siblings share an inheritance in the ratio \\(2 : 5 : 8\\). The largest share is \\(\\text{R } 48\\,000\\). What is the total inheritance?",
        "options": [
          "R 90 000",
          "R 80 000",
          "R 96 000",
          "R 100 000"
        ],
        "answer": "R 90 000",
        "hint": "8 parts = R 48 000, so 1 part = 6000. Total parts = 15.",
        "stepByStep": [
          "1 part = 48 000 ÷ 8 = R 6000.",
          "Total parts = 2 + 5 + 8 = 15.",
          "15 × 6000 = R 90 000."
        ],
        "explanation": "Total inheritance = \\(\\text{R } 90\\,000\\)."
      }
    ]
  },
  "unit11-graphs-coords": {
    "easy": [
      {
        "id": "u11-e3",
        "q": "In which quadrant is the point \\((-4, -5)\\) located?",
        "options": [
          "Quadrant 3",
          "Quadrant 1",
          "Quadrant 2",
          "Quadrant 4"
        ],
        "answer": "Quadrant 3",
        "hint": "Both x and y are negative in Quadrant 3.",
        "stepByStep": [
          "x is negative (left) and y is negative (down).",
          "This is Quadrant 3."
        ],
        "explanation": "\\((-4, -5)\\) is in Quadrant 3."
      },
      {
        "id": "u11-e4",
        "q": "What is the equation of the horizontal line passing through \\((3, 7)\\)?",
        "options": [
          "y = 7",
          "x = 3",
          "y = 3",
          "x = 7"
        ],
        "answer": "y = 7",
        "hint": "Horizontal lines have equation y = constant.",
        "stepByStep": [
          "The y-coordinate is 7 for all points on this horizontal line.",
          "Equation is y = 7."
        ],
        "explanation": "Horizontal line is \\(y = 7\\)."
      },
      {
        "id": "u11-e5",
        "q": "State the coordinates of the origin",
        "options": [
          "(0, 0)",
          "(1, 1)",
          "(0, 1)",
          "(1, 0)"
        ],
        "answer": "(0, 0)",
        "hint": "The origin is where the x-axis and y-axis intersect.",
        "stepByStep": [
          "At the origin, x = 0 and y = 0.",
          "Coordinates are (0, 0)."
        ],
        "explanation": "The origin is \\((0, 0)\\)."
      },
      {
        "id": "u11-e6",
        "q": "Find the midpoint of the line segment joining \\((2, 4)\\) and \\((6, 10)\\)",
        "options": [
          "(4, 7)",
          "(8, 14)",
          "(4, 6)",
          "(3, 7)"
        ],
        "answer": "(4, 7)",
        "hint": "Average the x-coordinates and average the y-coordinates.",
        "stepByStep": [
          "x-midpoint = (2 + 6) / 2 = 4.",
          "y-midpoint = (4 + 10) / 2 = 7.",
          "Midpoint = (4, 7)."
        ],
        "explanation": "Midpoint = \\((4, 7)\\)."
      }
    ],
    "medium": [
      {
        "id": "u11-m3",
        "q": "Find the midpoint of the points \\(A(-3, 8)\\) and \\(B(5, -2)\\)",
        "options": [
          "(1, 3)",
          "(2, 6)",
          "(-1, 3)",
          "(1, 5)"
        ],
        "answer": "(1, 3)",
        "hint": "Midpoint formula: ((x1 + x2)/2, (y1 + y2)/2).",
        "stepByStep": [
          "(-3 + 5) / 2 = 2 / 2 = 1.",
          "(8 + (-2)) / 2 = 6 / 2 = 3.",
          "Midpoint = (1, 3)."
        ],
        "explanation": "Midpoint is \\((1, 3)\\)."
      },
      {
        "id": "u11-m4",
        "q": "For the straight line \\(y = 3x - 5\\), find the value of \\(y\\) when \\(x = 4\\)",
        "options": [
          "7",
          "12",
          "17",
          "9"
        ],
        "answer": "7",
        "hint": "Substitute x = 4 into 3x - 5.",
        "stepByStep": [
          "3(4) = 12.",
          "12 - 5 = 7."
        ],
        "explanation": "\\(y = 3(4) - 5 = 7\\)."
      },
      {
        "id": "u11-m5",
        "q": "What is the gradient of the line \\(y = -2x + 6\\)?",
        "options": [
          "-2",
          "6",
          "2",
          "-6"
        ],
        "answer": "-2",
        "hint": "In y = mx + c, the coefficient of x is the gradient m.",
        "stepByStep": [
          "The number multiplying x is -2.",
          "Gradient = -2."
        ],
        "explanation": "Gradient \\(m = -2\\)."
      },
      {
        "id": "u11-m6",
        "q": "Which of these points lies on the line \\(y = 2x + 1\\)?",
        "options": [
          "(3, 7)",
          "(2, 6)",
          "(4, 8)",
          "(1, 4)"
        ],
        "answer": "(3, 7)",
        "hint": "Substitute x = 3: 2(3) + 1 = 7.",
        "stepByStep": [
          "Substitute x = 3 into the equation: 2(3) + 1 = 6 + 1 = 7.",
          "The calculated y-value is 7, which exactly matches coordinates (3, 7)."
        ],
        "explanation": "\\((3, 7)\\) satisfies \\(y = 2x + 1\\)."
      }
    ],
    "hard": [
      {
        "id": "u11-h3",
        "q": "Line segment PQ has midpoint \\(M(3, 5)\\). If \\(P(1, 2)\\), find coordinates of \\(Q\\)",
        "options": [
          "(5, 8)",
          "(4, 7)",
          "(2, 3.5)",
          "(5, 7)"
        ],
        "answer": "(5, 8)",
        "hint": "(1 + x)/2 = 3 and (2 + y)/2 = 5.",
        "stepByStep": [
          "1 + x = 6 -> x = 5.",
          "2 + y = 10 -> y = 8.",
          "Q = (5, 8)."
        ],
        "explanation": "\\(Q = (5, 8)\\)."
      },
      {
        "id": "u11-h4",
        "q": "A travel graph shows Justin cycling \\(18\\text{ km}\\) in \\(45\\text{ minutes}\\). What is his average speed in \\(\\text{km/h}\\)?",
        "options": [
          "24 km/h",
          "20 km/h",
          "18 km/h",
          "22.5 km/h"
        ],
        "answer": "24 km/h",
        "hint": "45 minutes = 0.75 hours (or 3/4 hour). Speed = 18 ÷ 0.75.",
        "stepByStep": [
          "45 mins = 3/4 hour.",
          "18 ÷ (3/4) = 18 × (4/3) = 24 km/h."
        ],
        "explanation": "Speed = \\(24\\text{ km/h}\\)."
      },
      {
        "id": "u11-h5",
        "q": "Find the point of intersection of the lines \\(y = 2x + 1\\) and \\(y = 7\\)",
        "options": [
          "(3, 7)",
          "(7, 3)",
          "(4, 7)",
          "(2, 7)"
        ],
        "answer": "(3, 7)",
        "hint": "Substitute y = 7 into 2x + 1 = 7.",
        "stepByStep": [
          "2x + 1 = 7.",
          "2x = 6 -> x = 3.",
          "Intersection is (3, 7)."
        ],
        "explanation": "Intersection point = \\((3, 7)\\)."
      },
      {
        "id": "u11-h6",
        "q": "A conversion graph between Gallons and Litres shows \\(5\\text{ gallons} = 22.7\\text{ litres}\\). How many litres is \\(12\\text{ gallons}\\)?",
        "options": [
          "54.48 litres",
          "50.25 litres",
          "56.75 litres",
          "48.50 litres"
        ],
        "answer": "54.48 litres",
        "hint": "1 gallon = 22.7 ÷ 5 = 4.54 litres. Multiply by 12.",
        "stepByStep": [
          "1 gallon = 4.54 litres.",
          "12 × 4.54 = 54.48 litres."
        ],
        "explanation": "\\(12\\text{ gallons} = 54.48\\text{ litres}\\)."
      }
    ]
  },
  "unit10-percentages-finance": {
    "easy": [
      {
        "id": "u10-e3",
        "q": "A car travels at \\(90\\text{ km/h}\\) for \\(3\\text{ hours}\\). How far does it travel?",
        "options": [
          "270 km",
          "240 km",
          "300 km",
          "180 km"
        ],
        "answer": "270 km",
        "hint": "Distance = Speed × Time.",
        "stepByStep": [
          "Use the distance formula: Distance = Speed × Time.",
          "Multiply: 90 km/h × 3 h = 270 km."
        ],
        "explanation": "Distance = \\(270\\text{ km}\\)."
      },
      {
        "id": "u10-e4",
        "q": "An item bought for \\(\\text{R } 150\\) is sold for \\(\\text{R } 195\\). Calculate the profit",
        "options": [
          "R 45",
          "R 50",
          "R 35",
          "R 40"
        ],
        "answer": "R 45",
        "hint": "Profit = Selling Price - Cost Price.",
        "stepByStep": [
          "Use profit formula: Profit = Selling Price - Cost Price.",
          "Subtract: 195 - 150 = R 45."
        ],
        "explanation": "Profit = \\(\\text{R } 45\\)."
      },
      {
        "id": "u10-e5",
        "q": "Calculate simple interest on \\(\\text{R } 1000\\) at \\(5\\%\\) per year for \\(2\\text{ years}\\)",
        "options": [
          "R 100",
          "R 50",
          "R 150",
          "R 105"
        ],
        "answer": "R 100",
        "hint": "Interest = (P × R × T) / 100.",
        "stepByStep": [
          "Use simple interest formula: I = (P × R × T) / 100.",
          "Calculate: (1000 × 5 × 2) / 100 = 10 000 / 100 = R 100."
        ],
        "explanation": "Interest = \\(\\text{R } 100\\)."
      },
      {
        "id": "u10-e6",
        "q": "Pack A has 6 sodas for \\(\\text{R } 48\\). What is the price per soda?",
        "options": [
          "R 8",
          "R 6",
          "R 7",
          "R 9"
        ],
        "answer": "R 8",
        "hint": "Divide total price by number of sodas.",
        "stepByStep": [
          "Find unit price by dividing total cost by quantity.",
          "Calculate: 48 ÷ 6 = R 8 per soda."
        ],
        "explanation": "Price = \\(\\text{R } 8\\)."
      }
    ],
    "medium": [
      {
        "id": "u10-m3",
        "q": "Store A sells \\(500\\text{ g}\\) of cereal for \\(\\text{R } 35\\). Store B sells \\(750\\text{ g}\\) for \\(\\text{R } 48\\). Which is better value?",
        "options": [
          "Store B (R 0.064/g vs R 0.070/g)",
          "Store A (cheaper total cost)",
          "Both are equal value",
          "Cannot compare different sizes"
        ],
        "answer": "Store B (R 0.064/g vs R 0.070/g)",
        "hint": "Calculate price per gram: 35/500 = 0.070 vs 48/750 = 0.064.",
        "stepByStep": [
          "Store A: 35 ÷ 500 = R 0.070 per gram.",
          "Store B: 48 ÷ 750 = R 0.064 per gram.",
          "Store B is cheaper per gram."
        ],
        "explanation": "Store B is better value."
      },
      {
        "id": "u10-m4",
        "q": "A train travels \\(260\\text{ km}\\) in \\(3\\text{ hours } 15\\text{ minutes}\\). What is its average speed in \\(\\text{km/h}\\)?",
        "options": [
          "80 km/h",
          "85 km/h",
          "75 km/h",
          "90 km/h"
        ],
        "answer": "80 km/h",
        "hint": "15 minutes = 0.25 hours, so time = 3.25 hours.",
        "stepByStep": [
          "Time = 3.25 hours.",
          "260 ÷ 3.25 = 80 km/h."
        ],
        "explanation": "Speed = \\(80\\text{ km/h}\\)."
      },
      {
        "id": "u10-m5",
        "q": "If \\(1\\text{ GBP} = \\text{R } 23.50\\), convert \\(\\text{GBP } 60\\) into South African Rand",
        "options": [
          "R 1410",
          "R 1380",
          "R 1450",
          "R 1350"
        ],
        "answer": "R 1410",
        "hint": "Multiply 60 by 23.50.",
        "stepByStep": [
          "60 × 23 = 1380.",
          "60 × 0.50 = 30.",
          "1380 + 30 = R 1410."
        ],
        "explanation": "\\(60 \\times 23.50 = \\text{R } 1410\\)."
      },
      {
        "id": "u10-m6",
        "q": "A merchant buys goods for \\(\\text{R } 600\\) and sells them at a \\(25\\%\\) profit. What is the selling price?",
        "options": [
          "R 750",
          "R 725",
          "R 800",
          "R 700"
        ],
        "answer": "R 750",
        "hint": "25% of 600 = 150. Add to cost price.",
        "stepByStep": [
          "Profit = 0.25 × 600 = R 150.",
          "Selling price = 600 + 150 = R 750."
        ],
        "explanation": "Selling price = \\(\\text{R } 750\\)."
      }
    ],
    "hard": [
      {
        "id": "u10-h3",
        "q": "Justin invests \\(\\text{R } 8000\\) at a simple interest rate of \\(7.5\\%\\) per year for \\(4\\text{ years}\\). Calculate the total amount in his account",
        "options": [
          "R 10 400",
          "R 2400",
          "R 10 800",
          "R 11 200"
        ],
        "answer": "R 10 400",
        "hint": "Calculate Interest: (8000 × 7.5 × 4) / 100 = 2400. Total = 8000 + 2400.",
        "stepByStep": [
          "Interest = (8000 × 7.5 × 4) / 100 = R 2400.",
          "Total amount = 8000 + 2400 = R 10 400."
        ],
        "explanation": "Total = \\(\\text{R } 10\\,400\\)."
      },
      {
        "id": "u10-h4",
        "q": "A phone bought for \\(\\text{R } 4500\\) is sold for \\(\\text{R } 3600\\). Calculate the percentage loss",
        "options": [
          "20%",
          "25%",
          "15%",
          "18%"
        ],
        "answer": "20%",
        "hint": "Loss = 4500 - 3600 = 900. Percentage loss = (900 / 4500) × 100.",
        "stepByStep": [
          "Loss = R 900.",
          "(900 / 4500) × 100 = (1/5) × 100 = 20%."
        ],
        "explanation": "Percentage loss = \\(20\\%\\)."
      },
      {
        "id": "u10-h5",
        "q": "A marathon runner runs \\(42\\text{ km}\\) in \\(3\\text{ hours and } 30\\text{ minutes}\\). What was their pace in minutes per kilometre?",
        "options": [
          "5 minutes/km",
          "4.5 minutes/km",
          "5.5 minutes/km",
          "6 minutes/km"
        ],
        "answer": "5 minutes/km",
        "hint": "Convert 3 h 30 min to minutes: 210 minutes. Divide by 42 km.",
        "stepByStep": [
          "3 h 30 min = 210 minutes.",
          "210 ÷ 42 = 5 minutes per km."
        ],
        "explanation": "Pace = \\(5\\text{ minutes/km}\\)."
      },
      {
        "id": "u10-h6",
        "q": "If \\(1\\text{ EUR} = \\text{R } 20.40\\), how many Euros can Justin buy with \\(\\text{R } 5100\\)?",
        "options": [
          "250 EUR",
          "240 EUR",
          "260 EUR",
          "245 EUR"
        ],
        "answer": "250 EUR",
        "hint": "Divide 5100 by 20.40.",
        "stepByStep": [
          "Divide total Rand by exchange rate to find Euros.",
          "Calculate: 5100 ÷ 20.40 = 250 EUR."
        ],
        "explanation": "\\(5100 \\div 20.40 = 250\\text{ EUR}\\)."
      }
    ]
  },
  "unit13-probability": {
    "easy": [
      {
        "id": "u13-e3",
        "q": "A standard 6-sided die is rolled. What is the probability of rolling a 4?",
        "options": [
          "1/6",
          "4/6",
          "1/4",
          "1/2"
        ],
        "answer": "1/6",
        "hint": "There is only one face with a 4 out of 6 possible outcomes.",
        "stepByStep": [
          "1 favorable outcome (4).",
          "6 total outcomes.",
          "Probability = 1/6."
        ],
        "explanation": "\\(P(4) = \\frac{1}{6}\\)."
      },
      {
        "id": "u13-e4",
        "q": "On the probability scale, what number represents an event that is impossible?",
        "options": [
          "0",
          "1",
          "0.5",
          "-1"
        ],
        "answer": "0",
        "hint": "Impossible events have probability zero.",
        "stepByStep": [
          "An impossible event can never occur.",
          "Its probability is 0."
        ],
        "explanation": "Probability of impossible event = 0."
      },
      {
        "id": "u13-e5",
        "q": "A spinner has 8 equal sections numbered 1 to 8. What is the probability of landing on an even number?",
        "options": [
          "1/2",
          "3/8",
          "5/8",
          "1/4"
        ],
        "answer": "1/2",
        "hint": "Even numbers are {2, 4, 6, 8} (4 numbers out of 8).",
        "stepByStep": [
          "Even numbers = 4.",
          "4/8 simplifies to 1/2."
        ],
        "explanation": "\\(P(\\text{even}) = \\frac{4}{8} = \\frac{1}{2}\\)."
      },
      {
        "id": "u13-e6",
        "q": "A bag contains 7 red pens and 3 blue pens. What is the probability of picking a blue pen?",
        "options": [
          "3/10",
          "7/10",
          "1/3",
          "3/7"
        ],
        "answer": "3/10",
        "hint": "Total pens = 7 + 3 = 10. Blue pens = 3.",
        "stepByStep": [
          "Total pens = 10.",
          "Blue pens = 3.",
          "Probability = 3/10."
        ],
        "explanation": "\\(P(\\text{blue}) = \\frac{3}{10}\\)."
      }
    ],
    "medium": [
      {
        "id": "u13-m3",
        "q": "A card is drawn from a standard deck of 52 cards. What is the probability of drawing a King?",
        "options": [
          "1/13",
          "4/13",
          "1/52",
          "1/4"
        ],
        "answer": "1/13",
        "hint": "There are 4 Kings in a 52-card deck: 4/52.",
        "stepByStep": [
          "4 Kings out of 52 cards.",
          "4/52 simplifies to 1/13."
        ],
        "explanation": "\\(P(\\text{King}) = \\frac{4}{52} = \\frac{1}{13}\\)."
      },
      {
        "id": "u13-m4",
        "q": "The probability of winning a prize in a raffle is \\(0.08\\). What is the probability of NOT winning a prize?",
        "options": [
          "0.92",
          "0.82",
          "0.90",
          "0.88"
        ],
        "answer": "0.92",
        "hint": "Probabilities of complementary events sum to 1: 1 - 0.08.",
        "stepByStep": [
          "The sum of probabilities of all complementary events equals 1.",
          "Calculate: 1.00 - 0.08 = 0.92."
        ],
        "explanation": "\\(P(\\text{not winning}) = 1 - 0.08 = 0.92\\)."
      },
      {
        "id": "u13-m5",
        "q": "A 6-sided die is rolled. What is the probability of getting a prime number?",
        "options": [
          "1/2",
          "1/3",
          "2/3",
          "1/6"
        ],
        "answer": "1/2",
        "hint": "The prime numbers on a die are 2, 3, and 5 (3 numbers).",
        "stepByStep": [
          "Primes: {2, 3, 5}. (1 is not prime!).",
          "3 out of 6 outcomes = 3/6 = 1/2."
        ],
        "explanation": "\\(P(\\text{prime}) = \\frac{3}{6} = \\frac{1}{2}\\)."
      },
      {
        "id": "u13-m6",
        "q": "A spinner has 5 sectors: 2 Green, 2 Red, 1 Yellow. What is the probability of NOT landing on Green?",
        "options": [
          "3/5",
          "2/5",
          "1/5",
          "4/5"
        ],
        "answer": "3/5",
        "hint": "Not Green = 2 Red + 1 Yellow = 3 sectors.",
        "stepByStep": [
          "Non-green sectors = 3.",
          "Total sectors = 5.",
          "Probability = 3/5."
        ],
        "explanation": "\\(P(\\text{not Green}) = \\frac{3}{5}\\)."
      }
    ],
    "hard": [
      {
        "id": "u13-h3",
        "q": "Two fair coins are tossed together. What is the probability of getting at least one Head?",
        "options": [
          "3/4",
          "1/2",
          "1/4",
          "2/3"
        ],
        "answer": "3/4",
        "hint": "Sample space: {HH, HT, TH, TT}. Only TT has no Heads.",
        "stepByStep": [
          "Possible outcomes = 4 (HH, HT, TH, TT).",
          "At least one Head: HH, HT, TH (3 outcomes).",
          "Probability = 3/4."
        ],
        "explanation": "\\(P(\\text{at least 1 H}) = \\frac{3}{4}\\)."
      },
      {
        "id": "u13-h4",
        "q": "Two fair 6-sided dice are rolled and their scores added. What is the probability of getting a total of 7?",
        "options": [
          "1/6",
          "7/36",
          "1/12",
          "5/36"
        ],
        "answer": "1/6",
        "hint": "Pairs that sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 pairs.",
        "stepByStep": [
          "Total pairs = 36.",
          "6 pairs sum to 7.",
          "6/36 = 1/6."
        ],
        "explanation": "\\(P(\\text{sum } 7) = \\frac{6}{36} = \\frac{1}{6}\\)."
      },
      {
        "id": "u13-h5",
        "q": "A box has 4 blue, 6 white, and 5 green socks. What is the probability of picking a sock that is NOT white?",
        "options": [
          "3/5",
          "2/5",
          "9/15",
          "2/3"
        ],
        "answer": "3/5",
        "hint": "Total socks = 4 + 6 + 5 = 15. Not white = 4 + 5 = 9.",
        "stepByStep": [
          "Not white = 4 blue + 5 green = 9.",
          "9/15 simplifies to 3/5."
        ],
        "explanation": "\\(P(\\text{not white}) = \\frac{9}{15} = \\frac{3}{5}\\)."
      },
      {
        "id": "u13-h6",
        "q": "The probability that Justin's soccer team wins is \\(0.65\\), and the probability they draw is \\(0.20\\). What is the probability that they lose?",
        "options": [
          "0.15",
          "0.25",
          "0.35",
          "0.85"
        ],
        "answer": "0.15",
        "hint": "P(win) + P(draw) + P(lose) = 1.",
        "stepByStep": [
          "P(win or draw) = 0.65 + 0.20 = 0.85.",
          "P(lose) = 1 - 0.85 = 0.15."
        ],
        "explanation": "\\(P(\\text{lose}) = 1 - 0.85 = 0.15\\)."
      }
    ]
  },
  "unit14-position-transformation": {
    "easy": [
      {
        "id": "u14-e3",
        "q": "What does the translation vector \\(\\begin{pmatrix} 4 \\\\ -3 \\end{pmatrix}\\) mean in words?",
        "options": [
          "4 units right and 3 units down",
          "4 units left and 3 units down",
          "4 units up and 3 units right",
          "4 units right and 3 units up"
        ],
        "answer": "4 units right and 3 units down",
        "hint": "Top number is horizontal (+ right, - left); bottom number is vertical (+ up, - down).",
        "stepByStep": [
          "Top number +4 = 4 units right.",
          "Bottom number -3 = 3 units down."
        ],
        "explanation": "Vector represents 4 units right and 3 units down."
      },
      {
        "id": "u14-e4",
        "q": "Point \\(A(3, 5)\\) is reflected in the y-axis. What are the coordinates of its image \\(A'\\)?",
        "options": [
          "(-3, 5)",
          "(3, -5)",
          "(-3, -5)",
          "(5, 3)"
        ],
        "answer": "(-3, 5)",
        "hint": "Reflection in the y-axis flips the sign of the x-coordinate: (x, y) -> (-x, y).",
        "stepByStep": [
          "Flip x sign: 3 -> -3.",
          "Keep y unchanged: 5.",
          "Image is (-3, 5)."
        ],
        "explanation": "\\(A' = (-3, 5)\\)."
      },
      {
        "id": "u14-e5",
        "q": "Point \\(B(2, -4)\\) is reflected in the x-axis. What are the coordinates of its image \\(B'\\)?",
        "options": [
          "(2, 4)",
          "(-2, -4)",
          "(-2, 4)",
          "(4, 2)"
        ],
        "answer": "(2, 4)",
        "hint": "Reflection in the x-axis flips the sign of the y-coordinate: (x, y) -> (x, -y).",
        "stepByStep": [
          "Keep x = 2.",
          "Flip y: -4 -> +4.",
          "Image = (2, 4)."
        ],
        "explanation": "\\(B' = (2, 4)\\)."
      },
      {
        "id": "u14-e6",
        "q": "How many degrees is a half-turn rotation?",
        "options": [
          "180°",
          "90°",
          "270°",
          "360°"
        ],
        "answer": "180°",
        "hint": "A full turn is 360°, so half a turn is 360° ÷ 2.",
        "stepByStep": [
          "A full revolution is 360 degrees.",
          "A half-turn is one half of a full turn: 360° ÷ 2 = 180°."
        ],
        "explanation": "A half-turn is \\(180^\\circ\\)."
      }
    ],
    "medium": [
      {
        "id": "u14-m3",
        "q": "Point \\(P(-2, 6)\\) is translated by vector \\(\\begin{pmatrix} 5 \\\\ -4 \\end{pmatrix}\\). What are the coordinates of \\(P'\\)?",
        "options": [
          "(3, 2)",
          "(-7, 10)",
          "(3, 10)",
          "(-7, 2)"
        ],
        "answer": "(3, 2)",
        "hint": "Add vector components: (-2 + 5, 6 + (-4)).",
        "stepByStep": [
          "x = -2 + 5 = 3.",
          "y = 6 - 4 = 2.",
          "P' = (3, 2)."
        ],
        "explanation": "\\(P' = (3, 2)\\)."
      },
      {
        "id": "u14-m4",
        "q": "Point \\(Q(4, 1)\\) is translated to \\(Q'(1, 7)\\). What was the translation vector?",
        "options": [
          "( -3, 6 )",
          "( 3, -6 )",
          "( 5, 8 )",
          "( -3, -6 )"
        ],
        "answer": "( -3, 6 )",
        "hint": "Vector = (new - old): (1 - 4, 7 - 1).",
        "stepByStep": [
          "x change = 1 - 4 = -3.",
          "y change = 7 - 1 = 6.",
          "Vector = (-3, 6)."
        ],
        "explanation": "Translation vector is \\((-3, 6)\\)."
      },
      {
        "id": "u14-m5",
        "q": "Point \\(R(3, 4)\\) is rotated \\(90^\\circ\\) clockwise about origin \\((0, 0)\\). What are the coordinates of \\(R'\\)?",
        "options": [
          "(4, -3)",
          "(-4, 3)",
          "(-3, -4)",
          "(3, -4)"
        ],
        "answer": "(4, -3)",
        "hint": "Rotation 90° clockwise maps (x, y) -> (y, -x).",
        "stepByStep": [
          "Swap coordinates: (4, 3).",
          "Invert new y: (4, -3)."
        ],
        "explanation": "\\(R' = (4, -3)\\)."
      },
      {
        "id": "u14-m6",
        "q": "Point \\(S(2, 5)\\) is reflected in the line \\(y = x\\). What are the coordinates of \\(S'\\)?",
        "options": [
          "(5, 2)",
          "(-2, -5)",
          "(-5, -2)",
          "(2, -5)"
        ],
        "answer": "(5, 2)",
        "hint": "Reflecting in y = x swaps the x and y coordinates: (x, y) -> (y, x).",
        "stepByStep": [
          "Reflecting across the line y = x exchanges the x and y coordinates.",
          "Swapping values: (2, 5) becomes (5, 2)."
        ],
        "explanation": "\\(S' = (5, 2)\\)."
      }
    ],
    "hard": [
      {
        "id": "u14-h3",
        "q": "Point \\(T(5, 2)\\) is reflected across the line \\(x = 2\\). What are the coordinates of \\(T'\\)?",
        "options": [
          "(-1, 2)",
          "(1, 2)",
          "(-1, -2)",
          "(2, 5)"
        ],
        "answer": "(-1, 2)",
        "hint": "T is 3 units right of x = 2 (5 - 2 = 3). Image is 3 units left: 2 - 3 = -1.",
        "stepByStep": [
          "Distance from mirror line = 5 - 2 = 3 units.",
          "Image x = 2 - 3 = -1.",
          "y stays 2 -> (-1, 2)."
        ],
        "explanation": "\\(T' = (-1, 2)\\)."
      },
      {
        "id": "u14-h4",
        "q": "Point \\(U(3, 7)\\) is reflected across the line \\(y = 4\\). What are the coordinates of \\(U'\\)?",
        "options": [
          "(3, 1)",
          "(3, -1)",
          "(1, 7)",
          "(3, 3)"
        ],
        "answer": "(3, 1)",
        "hint": "U is 3 units above y = 4 (7 - 4 = 3). Image is 3 units below: 4 - 3 = 1.",
        "stepByStep": [
          "Distance from mirror line = 7 - 4 = 3 units.",
          "Image y = 4 - 3 = 1.",
          "x stays 3 -> (3, 1)."
        ],
        "explanation": "\\(U' = (3, 1)\\)."
      },
      {
        "id": "u14-h5",
        "q": "A shape with area \\(12\\text{ cm}^2\\) is enlarged by scale factor \\(3\\). What is the area of the enlarged image?",
        "options": [
          "108 cm²",
          "36 cm²",
          "72 cm²",
          "144 cm²"
        ],
        "answer": "108 cm²",
        "hint": "Area scales by scale factor squared (k² = 3² = 9).",
        "stepByStep": [
          "Area scale factor = 3² = 9.",
          "New area = 12 × 9 = 108 cm²."
        ],
        "explanation": "Enlarged area = \\(12 \\times 3^2 = 108\\text{ cm}^2\\)."
      },
      {
        "id": "u14-h6",
        "q": "Point \\(A(1, 2)\\) is rotated \\(180^\\circ\\) about the point \\((3, 3)\\). What are the coordinates of the image?",
        "options": [
          "(5, 4)",
          "(4, 5)",
          "(5, 3)",
          "(2, 4)"
        ],
        "answer": "(5, 4)",
        "hint": "A 180° rotation means (3, 3) is the midpoint between A and its image.",
        "stepByStep": [
          "x: 2(3) - 1 = 5.",
          "y: 2(3) - 2 = 4.",
          "Image = (5, 4)."
        ],
        "explanation": "Rotated image = \\((5, 4)\\)."
      }
    ]
  },
  "unit15-area-perimeter-vol": {
    "easy": [
      {
        "id": "u15-e3",
        "q": "Calculate the area of a right-angled triangle with base \\(8\\text{ cm}\\) and height \\(5\\text{ cm}\\)",
        "options": [
          "20 cm²",
          "40 cm²",
          "26 cm²",
          "13 cm²"
        ],
        "answer": "20 cm²",
        "hint": "Area of a triangle = (base × height) / 2.",
        "stepByStep": [
          "8 × 5 = 40.",
          "40 ÷ 2 = 20 cm²."
        ],
        "explanation": "Area = \\(20\\text{ cm}^2\\)."
      },
      {
        "id": "u15-e4",
        "q": "A rectangle has length \\(14\\text{ m}\\) and perimeter \\(46\\text{ m}\\). What is its width?",
        "options": [
          "9 m",
          "18 m",
          "12 m",
          "8 m"
        ],
        "answer": "9 m",
        "hint": "Perimeter = 2(length + width). 46 ÷ 2 = 23. Width = 23 - 14.",
        "stepByStep": [
          "Length + width = 46 ÷ 2 = 23 m.",
          "Width = 23 - 14 = 9 m."
        ],
        "explanation": "Width = \\(9\\text{ m}\\)."
      },
      {
        "id": "u15-e5",
        "q": "Calculate the volume of a cuboid with length \\(6\\text{ cm}\\), width \\(4\\text{ cm}\\), and height \\(5\\text{ cm}\\)",
        "options": [
          "120 cm³",
          "100 cm³",
          "60 cm³",
          "150 cm³"
        ],
        "answer": "120 cm³",
        "hint": "Volume = length × width × height.",
        "stepByStep": [
          "6 × 4 = 24.",
          "24 × 5 = 120 cm³."
        ],
        "explanation": "Volume = \\(120\\text{ cm}^3\\)."
      },
      {
        "id": "u15-e6",
        "q": "Find the perimeter of a regular pentagon with sides of length \\(7.5\\text{ cm}\\)",
        "options": [
          "37.5 cm",
          "35.0 cm",
          "45.0 cm",
          "30.0 cm"
        ],
        "answer": "37.5 cm",
        "hint": "A pentagon has 5 equal sides: 5 × 7.5.",
        "stepByStep": [
          "A regular pentagon has 5 equal sides.",
          "Multiply side length by 5: 5 × 7.5 = 37.5 cm."
        ],
        "explanation": "Perimeter = \\(37.5\\text{ cm}\\)."
      }
    ],
    "medium": [
      {
        "id": "u15-m3",
        "q": "Calculate the area of a parallelogram with base \\(12\\text{ cm}\\) and perpendicular height \\(7\\text{ cm}\\)",
        "options": [
          "84 cm²",
          "42 cm²",
          "96 cm²",
          "38 cm²"
        ],
        "answer": "84 cm²",
        "hint": "Area of a parallelogram = base × perpendicular height.",
        "stepByStep": [
          "Use formula: Area of parallelogram = base × perpendicular height.",
          "Multiply base and height: 12 cm × 7 cm = 84 cm²."
        ],
        "explanation": "Area = \\(84\\text{ cm}^2\\)."
      },
      {
        "id": "u15-m4",
        "q": "Calculate the area of a trapezium with parallel sides \\(9\\text{ cm}\\) and \\(15\\text{ cm}\\) and height \\(8\\text{ cm}\\)",
        "options": [
          "96 cm²",
          "192 cm²",
          "84 cm²",
          "120 cm²"
        ],
        "answer": "96 cm²",
        "hint": "Area = 1/2 × (a + b) × h.",
        "stepByStep": [
          "a + b = 9 + 15 = 24.",
          "Half of 24 = 12.",
          "12 × 8 = 96 cm²."
        ],
        "explanation": "Area = \\(96\\text{ cm}^2\\)."
      },
      {
        "id": "u15-m5",
        "q": "Calculate the circumference of a circle with radius \\(7\\text{ cm}\\) (using \\(\\pi = \\frac{22}{7}\\))",
        "options": [
          "44 cm",
          "22 cm",
          "154 cm",
          "88 cm"
        ],
        "answer": "44 cm",
        "hint": "Circumference = 2 × π × r.",
        "stepByStep": [
          "Use the circumference formula: C = 2 × π × r.",
          "Substitute values: 2 × (22/7) × 7 = 2 × 22 = 44 cm."
        ],
        "explanation": "Circumference = \\(44\\text{ cm}\\)."
      },
      {
        "id": "u15-m6",
        "q": "A cuboid has volume \\(240\\text{ cm}^3\\). If length is \\(8\\text{ cm}\\) and width is \\(5\\text{ cm}\\), find its height",
        "options": [
          "6 cm",
          "8 cm",
          "5 cm",
          "12 cm"
        ],
        "answer": "6 cm",
        "hint": "Base area = 8 × 5 = 40 cm². Height = 240 ÷ 40.",
        "stepByStep": [
          "8 × 5 = 40 cm².",
          "240 ÷ 40 = 6 cm."
        ],
        "explanation": "Height = \\(6\\text{ cm}\\)."
      }
    ],
    "hard": [
      {
        "id": "u15-h3",
        "q": "Calculate the total surface area of a cuboid measuring \\(5\\text{ cm} \\times 4\\text{ cm} \\times 3\\text{ cm}\\)",
        "options": [
          "94 cm²",
          "60 cm²",
          "90 cm²",
          "120 cm²"
        ],
        "answer": "94 cm²",
        "hint": "Surface area = 2(lw + lh + wh).",
        "stepByStep": [
          "lw = 5 × 4 = 20.",
          "lh = 5 × 3 = 15.",
          "wh = 4 × 3 = 12.",
          "Sum = 20 + 15 + 12 = 47.",
          "Total SA = 2 × 47 = 94 cm²."
        ],
        "explanation": "Surface area = \\(94\\text{ cm}^2\\)."
      },
      {
        "id": "u15-h4",
        "q": "A circle has an area of \\(154\\text{ cm}^2\\). Using \\(\\pi = \\frac{22}{7}\\), calculate its radius",
        "options": [
          "7 cm",
          "14 cm",
          "3.5 cm",
          "49 cm"
        ],
        "answer": "7 cm",
        "hint": "Area = π × r². r² = 154 ÷ (22/7) = 154 × (7/22) = 49.",
        "stepByStep": [
          "r² = 154 × (7/22) = 7 × 7 = 49.",
          "r = √49 = 7 cm."
        ],
        "explanation": "Radius = \\(7\\text{ cm}\\)."
      },
      {
        "id": "u15-h5",
        "q": "A composite L-shape is formed from two rectangles: \\(8\\text{ cm} \\times 4\\text{ cm}\\) and \\(6\\text{ cm} \\times 3\\text{ cm}\\). Calculate total area",
        "options": [
          "50 cm²",
          "48 cm²",
          "54 cm²",
          "46 cm²"
        ],
        "answer": "50 cm²",
        "hint": "Calculate area of each rectangle and add them together.",
        "stepByStep": [
          "Rectangle 1: 8 × 4 = 32 cm².",
          "Rectangle 2: 6 × 3 = 18 cm².",
          "Total area = 32 + 18 = 50 cm²."
        ],
        "explanation": "Total area = \\(50\\text{ cm}^2\\)."
      },
      {
        "id": "u15-h6",
        "q": "A swimming pool is \\(25\\text{ m}\\) long, \\(10\\text{ m}\\) wide, and \\(2\\text{ m}\\) deep. How many litres of water does it hold? (\\(1\\text{ m}^3 = 1000\\text{ litres}\\))",
        "options": [
          "500 000 litres",
          "50 000 litres",
          "5 000 000 litres",
          "250 000 litres"
        ],
        "answer": "500 000 litres",
        "hint": "Volume = 25 × 10 × 2 = 500 m³. Multiply by 1000 to get litres.",
        "stepByStep": [
          "Volume = 25 × 10 × 2 = 500 m³.",
          "Litres = 500 × 1000 = 500 000 litres."
        ],
        "explanation": "Capacity = \\(500\\,000\\text{ litres}\\)."
      }
    ]
  },
  "unit16-interpreting-data": {
    "easy": [
      {
        "id": "u16-e3",
        "q": "In a pie chart, what angle represents half of the total data?",
        "options": [
          "180°",
          "90°",
          "360°",
          "270°"
        ],
        "answer": "180°",
        "hint": "A full circle is 360°. Half is 360° ÷ 2.",
        "stepByStep": [
          "A full circle covers 360 degrees.",
          "Half of the circle covers 360° ÷ 2 = 180°."
        ],
        "explanation": "Half of a pie chart is \\(180^\\circ\\)."
      },
      {
        "id": "u16-e4",
        "q": "On a dual bar chart, what do the two adjacent bars for each category allow you to do?",
        "options": [
          "Directly compare two different groups or periods",
          "Show the total sum only",
          "Calculate the median directly",
          "Replace a pie chart"
        ],
        "answer": "Directly compare two different groups or periods",
        "hint": "Dual bar charts present two sets of data side-by-side (like boys vs girls).",
        "stepByStep": [
          "Dual bars show two categories together side-by-side.",
          "This allows direct visual comparison between two groups."
        ],
        "explanation": "Dual bar charts allow direct comparison between two groups."
      },
      {
        "id": "u16-e5",
        "q": "In a stem-and-leaf plot with key \\(4 \\mid 2 = 42\\), what does \\(6 \\mid 8\\) represent?",
        "options": [
          "68",
          "6.8",
          "6 + 8",
          "14"
        ],
        "answer": "68",
        "hint": "The stem 6 is tens and the leaf 8 is units.",
        "stepByStep": [
          "Stem 6 represents 60.",
          "Leaf 8 represents 8.",
          "Number = 68."
        ],
        "explanation": "\\(6 \\mid 8 = 68\\)."
      },
      {
        "id": "u16-e6",
        "q": "In a Venn diagram of sets A and B, where are items that belong to BOTH sets placed?",
        "options": [
          "In the overlapping intersection region",
          "Outside both circles",
          "Only in circle A",
          "Only in circle B"
        ],
        "answer": "In the overlapping intersection region",
        "hint": "The overlap between circles represents the intersection (A ∩ B).",
        "stepByStep": [
          "The overlap between circle A and circle B contains elements common to both.",
          "This is called the intersection."
        ],
        "explanation": "Common elements are in the overlapping intersection."
      }
    ],
    "medium": [
      {
        "id": "u16-m3",
        "q": "In a pie chart of 120 learners, 30 choose swimming. What angle should represent swimming?",
        "options": [
          "90°",
          "60°",
          "45°",
          "120°"
        ],
        "answer": "90°",
        "hint": "Fraction = 30/120 = 1/4. Angle = 1/4 × 360°.",
        "stepByStep": [
          "30 / 120 = 1/4.",
          "1/4 × 360° = 90°."
        ],
        "explanation": "Angle = \\(90^\\circ\\)."
      },
      {
        "id": "u16-m4",
        "q": "A stem-and-leaf diagram shows: Stem 5: 2, 4, 8; Stem 6: 1, 3, 5, 9; Stem 7: 0, 4. What is the range?",
        "options": [
          "22",
          "24",
          "18",
          "20"
        ],
        "answer": "22",
        "hint": "Highest value = 74, lowest value = 52. Range = 74 - 52.",
        "stepByStep": [
          "Highest = 74.",
          "Lowest = 52.",
          "74 - 52 = 22."
        ],
        "explanation": "Range = \\(22\\)."
      },
      {
        "id": "u16-m5",
        "q": "Universal set \\(\\xi = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}\\). Set \\(P = \\{\\text{prime numbers}\\}\\). How many elements are in \\(P\\)?",
        "options": [
          "4",
          "5",
          "3",
          "6"
        ],
        "answer": "4",
        "hint": "Primes between 1 and 10 are {2, 3, 5, 7}. (1 is not prime).",
        "stepByStep": [
          "Prime numbers: 2, 3, 5, 7.",
          "Count = 4."
        ],
        "explanation": "There are \\(4\\) prime numbers."
      },
      {
        "id": "u16-m6",
        "q": "A pie chart has an angle of \\(45^\\circ\\) for cycling. If 8 students cycle, how many students are there in total?",
        "options": [
          "64",
          "56",
          "72",
          "80"
        ],
        "answer": "64",
        "hint": "45° is 1/8 of a full circle (360° ÷ 45° = 8). Total students = 8 × 8.",
        "stepByStep": [
          "360° ÷ 45° = 8 sectors.",
          "8 × 8 = 64 students."
        ],
        "explanation": "Total students = \\(64\\)."
      }
    ],
    "hard": [
      {
        "id": "u16-h3",
        "q": "Class X has median \\(72\\) and range \\(14\\). Class Y has median \\(72\\) and range \\(28\\). Which statement is correct?",
        "options": [
          "Class X is more consistent because its range is smaller",
          "Class Y scored higher on average",
          "Class Y is more consistent because its range is larger",
          "Both classes had identical mark distributions"
        ],
        "answer": "Class X is more consistent because its range is smaller",
        "hint": "A smaller range means scores are less spread out, meaning higher consistency.",
        "stepByStep": [
          "Both classes have the same median (72).",
          "Class X has a smaller range (14 vs 28).",
          "Smaller range means greater consistency."
        ],
        "explanation": "Class X is more consistent because its range is smaller."
      },
      {
        "id": "u16-h4",
        "q": "A survey of 40 students showed: 25 like soccer, 18 like rugby, and 8 like both. How many students like NEITHER sport?",
        "options": [
          "5",
          "7",
          "9",
          "3"
        ],
        "answer": "5",
        "hint": "Total who like at least one sport = 25 + 18 - 8 = 35.",
        "stepByStep": [
          "Union: 25 + 18 - 8 = 35 students.",
          "Neither: 40 - 35 = 5 students."
        ],
        "explanation": "\\(40 - 35 = 5\\) students like neither."
      },
      {
        "id": "u16-h5",
        "q": "A stem-and-leaf plot has 19 ordered values. Which position gives the median?",
        "options": [
          "10th value",
          "9.5th value",
          "9th value",
          "11th value"
        ],
        "answer": "10th value",
        "hint": "(n + 1) / 2 = (19 + 1) / 2 = 10th value.",
        "stepByStep": [
          "n = 19 is odd.",
          "(19 + 1) / 2 = 20 / 2 = 10th value."
        ],
        "explanation": "Median is the \\(10^{\\text{th}}\\) value."
      },
      {
        "id": "u16-h6",
        "q": "Team Alpha has mean score \\(64\\) with range \\(8\\). Team Beta has mean score \\(71\\) with range \\(18\\). What does this tell us?",
        "options": [
          "Team Beta scored higher on average, but Team Alpha was more consistent",
          "Team Alpha scored higher on average and was more consistent",
          "Team Beta was more consistent and scored higher",
          "No conclusion can be made"
        ],
        "answer": "Team Beta scored higher on average, but Team Alpha was more consistent",
        "hint": "Mean measures average; range measures consistency (smaller range = more consistent).",
        "stepByStep": [
          "Team Beta mean (71) > Team Alpha mean (64): Beta scored higher on average.",
          "Team Alpha range (8) < Team Beta range (18): Alpha was more consistent."
        ],
        "explanation": "Team Beta scored higher on average, but Team Alpha was more consistent."
      }
    ]
  }
};

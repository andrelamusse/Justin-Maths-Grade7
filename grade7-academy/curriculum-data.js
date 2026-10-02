// curriculum-data.js - Complete Grade 7 English Mathematics Curriculum
// Covers all 5 standard strands: Numbers, Patterns & Algebra, Geometry, Measurement, Data & Probability.

export const GRADE_7_STRANDS = [
  {
    id: 'numbers',
    name: '1. Numbers & Operations',
    icon: '🔢',
    description: 'Integers, exponents, fractions, decimals, percentages, and financial maths.',
    topics: [
      {
        id: 'integers',
        title: 'Integers & Directed Numbers',
        badge: 'Core Foundation',
        summary: 'Understanding positive and negative whole numbers on the number line.',
        lesson: {
          keyIdea: 'Integers are all positive whole numbers, negative whole numbers, and zero (... -3, -2, -1, 0, 1, 2, 3 ...).',
          rules: [
            'On a number line, numbers get LARGER as you move RIGHT and SMALLER as you move LEFT.',
            'Adding a positive moves RIGHT: 3 + 4 = 7.',
            'Adding a negative is the same as subtracting: 5 + (-3) = 5 - 3 = 2.',
            'Subtracting a negative is like taking away cold, so it gets WARMER (add!): 4 - (-3) = 4 + 3 = 7.'
          ],
          examples: [
            { question: 'Calculate: -4 + 7', solution: 'Start at -4 on the number line. Move 7 units right. You pass 0 and land on +3.' },
            { question: 'Calculate: -3 - 5', solution: 'Start at -3. Move 5 units left (colder/deeper). You land on -8.' },
            { question: 'Calculate: 6 - (-4)', solution: 'Subtracting a negative becomes addition: 6 + 4 = 10.' }
          ]
        },
        questions: [
          {
            q: 'What is -5 + 8?',
            options: ['-13', '3', '-3', '13'],
            answer: '3',
            explanation: 'Start at -5, move 8 units to the right: -5 + 8 = +3.'
          },
          {
            q: 'Which integer is smaller: -9 or -4?',
            options: ['-9', '-4', 'They are equal', 'Cannot tell'],
            answer: '-9',
            explanation: '-9 is further to the left on the number line than -4, so -9 is colder and smaller.'
          },
          {
            q: 'Calculate: 7 - (-5)',
            options: ['2', '-2', '12', '-12'],
            answer: '12',
            explanation: 'Subtracting a negative turns into addition: 7 - (-5) = 7 + 5 = 12.'
          },
          {
            q: 'Calculate: -6 + (-4)',
            options: ['-10', '10', '-2', '2'],
            answer: '-10',
            explanation: 'Starting at -6 and adding -4 moves 4 units further left: -6 + (-4) = -10.'
          }
        ]
      },
      {
        id: 'exponents',
        title: 'Exponents & Roots',
        badge: 'Powers & Roots',
        summary: 'Squares, cubes, square roots, and cube roots.',
        lesson: {
          keyIdea: 'An exponent shows how many times a number is multiplied by itself. A root is the opposite of an exponent.',
          rules: [
            'Square: 5² means 5 × 5 = 25.',
            'Cube: 4³ means 4 × 4 × 4 = 64.',
            'Square root (√): √36 asks "what number multiplied by itself gives 36?" Answer: 6 (since 6 × 6 = 36).',
            'Cube root (∛): ∛27 asks "what number multiplied by itself 3 times gives 27?" Answer: 3 (since 3 × 3 × 3 = 27).'
          ],
          examples: [
            { question: 'Evaluate: 3² + 4²', solution: '3² = 9 and 4² = 16. So 9 + 16 = 25.' },
            { question: 'Find √100 - √49', solution: '√100 = 10, √49 = 7. 10 - 7 = 3.' }
          ]
        },
        questions: [
          {
            q: 'What is 6²?',
            options: ['12', '36', '62', '18'],
            answer: '36',
            explanation: '6² means 6 × 6 = 36.'
          },
          {
            q: 'What is √81?',
            options: ['9', '8.1', '18', '7'],
            answer: '9',
            explanation: '9 × 9 = 81, so √81 = 9.'
          },
          {
            q: 'What is 2³?',
            options: ['6', '8', '16', '5'],
            answer: '8',
            explanation: '2³ means 2 × 2 × 2 = 8.'
          },
          {
            q: 'What is ∛64?',
            options: ['4', '8', '16', '2'],
            answer: '4',
            explanation: '4 × 4 × 4 = 64, so the cube root of 64 is 4.'
          }
        ]
      },
      {
        id: 'fractions',
        title: 'Fractions & Operations',
        badge: 'Fractions Mastery',
        summary: 'Simplifying, equivalent fractions, adding, subtracting, and multiplying.',
        lesson: {
          keyIdea: 'A fraction represents parts of a whole: Numerator / Denominator.',
          rules: [
            'To add or subtract fractions, they MUST have the SAME common denominator.',
            'Example: 1/4 + 2/4 = 3/4.',
            'If denominators are different, find LCM: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.',
            'To multiply fractions, multiply top by top, bottom by bottom: (2/3) × (4/5) = 8/15.'
          ],
          examples: [
            { question: 'Simplify: 12/18', solution: 'Divide numerator and denominator by their HCF (6): 12÷6 / 18÷6 = 2/3.' },
            { question: 'Calculate: 3/5 + 1/10', solution: 'Common denominator is 10. 3/5 = 6/10. 6/10 + 1/10 = 7/10.' }
          ]
        },
        questions: [
          {
            q: 'Simplify the fraction 8/12 to its lowest terms:',
            options: ['2/3', '4/6', '1/2', '3/4'],
            answer: '2/3',
            explanation: 'Divide both 8 and 12 by 4: 8÷4 = 2, 12÷4 = 3. Lowest form is 2/3.'
          },
          {
            q: 'Calculate: 2/7 + 3/7',
            options: ['5/14', '5/7', '6/49', '1/7'],
            answer: '5/7',
            explanation: 'Denominators are already the same, so add numerators: 2 + 3 = 5, keeping denominator 7 -> 5/7.'
          },
          {
            q: 'Calculate: 1/2 + 1/4',
            options: ['2/6', '3/4', '1/6', '2/4'],
            answer: '3/4',
            explanation: 'Change 1/2 to 2/4. Then 2/4 + 1/4 = 3/4.'
          },
          {
            q: 'Calculate: (2/3) × (3/5)',
            options: ['5/8', '2/5', '6/8', '1/2'],
            answer: '2/5',
            explanation: 'Multiply tops: 2 × 3 = 6. Multiply bottoms: 3 × 5 = 15. Simplify 6/15 by dividing by 3 -> 2/5.'
          }
        ]
      },
      {
        id: 'decimals-percentages',
        title: 'Decimals, Percentages & Financial Maths',
        badge: 'Real World Maths',
        summary: 'Converting between fractions, decimals, and percentages; discounts, profit & loss.',
        lesson: {
          keyIdea: 'Percent means "per hundred" (out of 100). Decimals represent tenths (0.1), hundredths (0.01), and thousandths (0.001).',
          rules: [
            'To convert fraction to %: multiply by 100%. (3/4 × 100% = 75%).',
            'To find % of an amount: convert to fraction or decimal and multiply. 20% of 80 = 0.20 × 80 = 16.',
            'Profit = Selling Price - Cost Price (when Selling Price > Cost Price).',
            'Loss = Cost Price - Selling Price (when Cost Price > Selling Price).'
          ],
          examples: [
            { question: 'Find 10% of $150', solution: '10% = 1/10. 150 ÷ 10 = $15.' },
            { question: 'An item costs $40. You get a 25% discount. What is the discount?', solution: '25% = 1/4. 40 ÷ 4 = $10 discount.' }
          ]
        },
        questions: [
          {
            q: 'What is 50% written as a decimal?',
            options: ['0.05', '0.5', '5.0', '0.005'],
            answer: '0.5',
            explanation: '50% = 50/100 = 0.5.'
          },
          {
            q: 'What is 10% of 240?',
            options: ['24', '12', '48', '2.4'],
            answer: '24',
            explanation: '10% is 1/10th. 240 ÷ 10 = 24.'
          },
          {
            q: 'A shirt costs $60. It has a 20% discount. How much money do you save?',
            options: ['10', '12', '15', '20'],
            answer: '12',
            explanation: '10% of 60 is 6, so 20% is 6 × 2 = 12.'
          },
          {
            q: 'A shop buys a book for $15 and sells it for $22. What is their profit?',
            options: ['$7', '$37', '$8', '$12'],
            answer: '$7',
            explanation: 'Profit = Selling Price - Cost Price = 22 - 15 = $7.'
          }
        ]
      }
    ]
  },
  {
    id: 'algebra',
    name: '2. Patterns, Functions & Algebra',
    icon: '📈',
    description: 'Sequences, algebraic expressions, like terms, and solving linear equations.',
    topics: [
      {
        id: 'sequences',
        title: 'Number Sequences & General Rules',
        badge: 'Pattern Spotter',
        summary: 'Finding the pattern, difference, and the nth-term formula.',
        lesson: {
          keyIdea: 'A number sequence is a list of numbers following a rule. Arithmetic sequences add or subtract the same constant difference each time.',
          rules: [
            'Find the common difference (d) between consecutive terms.',
            'Example: 3, 7, 11, 15... The difference is +4.',
            'The rule starts with: 4n.',
            'For n = 1: 4(1) = 4. We want 3, so subtract 1: Rule is 4n - 1.'
          ],
          examples: [
            { question: 'Find next term in: 5, 11, 17, 23, ...', solution: 'The difference is +6 each time. Next term is 23 + 6 = 29.' }
          ]
        },
        questions: [
          {
            q: 'What is the next number in the pattern: 4, 9, 14, 19, ...?',
            options: ['23', '24', '25', '29'],
            answer: '24',
            explanation: 'The pattern adds 5 each step: 19 + 5 = 24.'
          },
          {
            q: 'What is the rule for the sequence: 2, 5, 8, 11, ...?',
            options: ['3n - 1', '3n + 1', '2n + 1', 'n + 3'],
            answer: '3n - 1',
            explanation: 'Difference is 3 -> 3n. For n=1, 3(1) - 1 = 2.'
          },
          {
            q: 'If the rule is Tn = 4n + 3, what is the 5th term (n = 5)?',
            options: ['20', '23', '27', '17'],
            answer: '23',
            explanation: 'Substitute n = 5: 4(5) + 3 = 20 + 3 = 23.'
          }
        ]
      },
      {
        id: 'expressions',
        title: 'Algebraic Expressions & Like Terms',
        badge: 'Variables & Terms',
        summary: 'Variables, coefficients, constants, and simplifying like terms.',
        lesson: {
          keyIdea: 'Algebra uses letters (variables) like x and y to represent unknown numbers.',
          rules: [
            'Variable: the letter representing a number (e.g. x).',
            'Coefficient: the number multiplied by the variable (in 5x, 5 is the coefficient).',
            'Constant: a standalone number with no variable (in 3x + 7, 7 is the constant).',
            'Like Terms: terms that have the exact same variable. You can ONLY combine like terms: 3x + 4x = 7x. You CANNOT combine 3x + 4y!'
          ],
          examples: [
            { question: 'Simplify: 5x + 3y + 2x - y', solution: 'Group like terms: (5x + 2x) + (3y - y) = 7x + 2y.' }
          ]
        },
        questions: [
          {
            q: 'In the expression 7x - 4, what is the coefficient of x?',
            options: ['7', '-4', 'x', '3'],
            answer: '7',
            explanation: 'The coefficient is the number multiplying the variable, which is 7.'
          },
          {
            q: 'Simplify: 4a + 3b + 2a',
            options: ['9ab', '6a + 3b', '7a + 2b', '6ab'],
            answer: '6a + 3b',
            explanation: 'Combine the like terms (4a + 2a = 6a), leaving 6a + 3b.'
          },
          {
            q: 'Simplify: 8x - 3x + 5',
            options: ['10x', '5x + 5', '13x', '5x - 5'],
            answer: '5x + 5',
            explanation: '8x - 3x = 5x. Add 5 -> 5x + 5.'
          }
        ]
      },
      {
        id: 'equations',
        title: 'Solving Linear Equations',
        badge: 'Balance the Scales',
        summary: 'One-step and two-step equations solved by inverse operations.',
        lesson: {
          keyIdea: 'An equation is like a balanced scale. Whatever you do to one side, you MUST do to the other side to keep it balanced!',
          rules: [
            'Inverse of Addition (+) is Subtraction (-).',
            'Inverse of Multiplication (×) is Division (÷).',
            'To solve x + 7 = 15: subtract 7 from both sides -> x = 15 - 7 -> x = 8.',
            'To solve 3x = 21: divide both sides by 3 -> x = 21 ÷ 3 -> x = 7.',
            'To solve 2x + 5 = 17: first subtract 5 -> 2x = 12. Then divide by 2 -> x = 6.'
          ],
          examples: [
            { question: 'Solve: 4x - 3 = 13', solution: 'Add 3 to both sides: 4x = 16. Divide by 4: x = 4.' }
          ]
        },
        questions: [
          {
            q: 'Solve for x: x + 9 = 22',
            options: ['13', '31', '11', '12'],
            answer: '13',
            explanation: 'Subtract 9 from both sides: x = 22 - 9 = 13.'
          },
          {
            q: 'Solve for x: 5x = 35',
            options: ['5', '6', '7', '8'],
            answer: '7',
            explanation: 'Divide both sides by 5: x = 35 ÷ 5 = 7.'
          },
          {
            q: 'Solve for x: 2x + 4 = 16',
            options: ['6', '8', '10', '12'],
            answer: '6',
            explanation: 'First subtract 4: 2x = 12. Then divide by 2: x = 6.'
          },
          {
            q: 'Solve for x: 3x - 5 = 10',
            options: ['5', '3', '15', '2'],
            answer: '5',
            explanation: 'First add 5 to both sides: 3x = 15. Then divide by 3: x = 5.'
          }
        ]
      }
    ]
  },
  {
    id: 'geometry',
    name: '3. Space & Shape (Geometry)',
    icon: '📐',
    description: 'Lines, angles, triangles, quadrilaterals, 3D objects, and transformations.',
    topics: [
      {
        id: 'angles',
        title: 'Angles & Lines',
        badge: 'Angle Master',
        summary: 'Acute, Right, Obtuse, Straight, Reflex, and Angle Relationships.',
        lesson: {
          keyIdea: 'An angle measures the amount of turn between two intersecting rays, measured in degrees (°).',
          rules: [
            'Acute Angle: greater than 0° and less than 90°.',
            'Right Angle: exactly 90° (looks like a square corner L).',
            'Obtuse Angle: greater than 90° and less than 180°.',
            'Straight Angle: exactly 180° (a straight line).',
            'Reflex Angle: greater than 180° and less than 360°.',
            'Angles on a straight line add up to 180°.',
            'Angles around a point (revolution) add up to 360°.'
          ],
          examples: [
            { question: 'Two angles on a straight line are x and 115°. Find x.', solution: 'x + 115° = 180°, so x = 180° - 115° = 65°.' }
          ]
        },
        questions: [
          {
            q: 'An angle measuring 45° is classified as:',
            options: ['Acute', 'Right', 'Obtuse', 'Reflex'],
            answer: 'Acute',
            explanation: 'Any angle less than 90° is an acute angle.'
          },
          {
            q: 'Two angles on a straight line add up to:',
            options: ['90°', '180°', '270°', '360°'],
            answer: '180°',
            explanation: 'A straight line always equals 180°.'
          },
          {
            q: 'If angle A and angle B are on a straight line, and angle A is 70°, what is angle B?',
            options: ['110°', '20°', '90°', '120°'],
            answer: '110°',
            explanation: '180° - 70° = 110°.'
          },
          {
            q: 'What type of angle is 210°?',
            options: ['Obtuse', 'Reflex', 'Acute', 'Straight'],
            answer: 'Reflex',
            explanation: 'An angle between 180° and 360° is a reflex angle.'
          }
        ]
      },
      {
        id: 'triangles',
        title: 'Triangles & Angle Sum',
        badge: 'Triangle Properties',
        summary: 'Equilateral, Isosceles, Scalene, and the 180° interior angle rule.',
        lesson: {
          keyIdea: 'The interior angles of ANY triangle always add up to 180°!',
          rules: [
            'Interior angle sum: Angle A + Angle B + Angle C = 180°.',
            'Equilateral Triangle: All 3 sides equal, all 3 angles are 60°.',
            'Isosceles Triangle: 2 sides equal, 2 base angles equal.',
            'Scalene Triangle: All sides and all angles are different.',
            'Right-angled Triangle: One angle is exactly 90°.'
          ],
          examples: [
            { question: 'A triangle has angles 50° and 70°. Find the third angle.', solution: '50° + 70° = 120°. Third angle = 180° - 120° = 60°.' }
          ]
        },
        questions: [
          {
            q: 'What is the sum of the interior angles of any triangle?',
            options: ['90°', '180°', '270°', '360°'],
            answer: '180°',
            explanation: 'The three angles inside every flat triangle always total 180°.'
          },
          {
            q: 'A triangle has angles of 60° and 80°. What is the third angle?',
            options: ['40°', '50°', '60°', '140°'],
            answer: '40°',
            explanation: '60° + 80° = 140°. 180° - 140° = 40°.'
          },
          {
            q: 'In an equilateral triangle, what is the size of each angle?',
            options: ['45°', '60°', '90°', '120°'],
            answer: '60°',
            explanation: '180° ÷ 3 = 60° for each angle.'
          },
          {
            q: 'An isosceles triangle has two equal angles of 50°. What is the vertex angle?',
            options: ['80°', '100°', '50°', '65°'],
            answer: '80°',
            explanation: '50° + 50° = 100°. 180° - 100° = 80°.'
          }
        ]
      },
      {
        id: '3d-shapes',
        title: '3D Objects & Polyhedra',
        badge: 'Spatial Vision',
        summary: 'Faces, Edges, Vertices of prisms, pyramids, and cylinders.',
        lesson: {
          keyIdea: '3D objects have length, width, and height. Polyhedra are 3D shapes with flat faces.',
          rules: [
            'Face (F): A flat surface of the 3D shape.',
            'Edge (E): The line segment where two faces meet.',
            'Vertex (V): The corner point where three or more edges meet.',
            'Cube / Rectangular Prism: 6 faces, 12 edges, 8 vertices.',
            'Triangular Prism: 5 faces (2 triangular bases, 3 rectangular sides), 9 edges, 6 vertices.'
          ],
          examples: [
            { question: 'How many vertices does a cube have?', solution: 'A cube has 8 corner points (vertices).' }
          ]
        },
        questions: [
          {
            q: 'How many faces does a standard cube have?',
            options: ['4', '6', '8', '12'],
            answer: '6',
            explanation: 'A cube has 6 square faces (top, bottom, and 4 sides).'
          },
          {
            q: 'How many edges does a rectangular prism have?',
            options: ['6', '8', '10', '12'],
            answer: '12',
            explanation: 'A rectangular prism has 12 edges (4 on top, 4 on bottom, 4 vertical).'
          },
          {
            q: 'How many vertices does a triangular pyramid (tetrahedron) have?',
            options: ['3', '4', '5', '6'],
            answer: '4',
            explanation: 'It has 3 vertices on the base triangle plus 1 top apex vertex = 4 vertices.'
          }
        ]
      }
    ]
  },
  {
    id: 'measurement',
    name: '4. Measurement & Geometry of 2D & 3D',
    icon: '📏',
    description: 'Perimeter, area, volume, surface area, and metric unit conversions.',
    topics: [
      {
        id: 'perimeter-area',
        title: 'Perimeter & Area of Rectangles & Triangles',
        badge: 'Measure Master',
        summary: 'Formulas for perimeter (distance around) and area (space inside).',
        lesson: {
          keyIdea: 'Perimeter is the distance ALL THE WAY AROUND the outside. Area is the flat space INSIDE measured in square units (cm², m²).',
          rules: [
            'Perimeter of Rectangle: P = 2(length + breadth) = 2l + 2b.',
            'Area of Rectangle: Area = length × breadth = l × b.',
            'Area of Triangle: Area = 1/2 × base × perpendicular height = 1/2(b × h).'
          ],
          examples: [
            { question: 'Find area of rectangle: length 8 cm, width 5 cm', solution: 'Area = 8 × 5 = 40 cm².' },
            { question: 'Find area of triangle: base 10 m, height 6 m', solution: 'Area = 1/2 × 10 × 6 = 30 m².' }
          ]
        },
        questions: [
          {
            q: 'A rectangle has a length of 7 cm and a width of 4 cm. What is its perimeter?',
            options: ['28 cm', '22 cm', '11 cm', '14 cm'],
            answer: '22 cm',
            explanation: 'Perimeter = 2(7 + 4) = 2(11) = 22 cm.'
          },
          {
            q: 'What is the area of a rectangle with length 9 cm and breadth 6 cm?',
            options: ['54 cm²', '30 cm²', '15 cm²', '48 cm²'],
            answer: '54 cm²',
            explanation: 'Area = length × breadth = 9 × 6 = 54 cm².'
          },
          {
            q: 'Find the area of a triangle with base 8 cm and height 5 cm:',
            options: ['40 cm²', '20 cm²', '13 cm²', '26 cm²'],
            answer: '20 cm²',
            explanation: 'Area = 1/2 × base × height = 1/2 × 8 × 5 = 20 cm².'
          }
        ]
      },
      {
        id: 'surface-area-volume',
        title: 'Surface Area & Volume of Rectangular Prisms',
        badge: '3D Measurement',
        summary: 'Volume (capacity/space inside) and total surface area.',
        lesson: {
          keyIdea: 'Volume measures how much 3D space an object occupies in cubic units (cm³, m³). Surface area is the total area of all 6 faces.',
          rules: [
            'Volume of Rectangular Prism = length × breadth × height = l × b × h.',
            'Total Surface Area = 2(lb + lh + bh).',
            'Capacity link: 1 cm³ = 1 mL, and 1000 cm³ = 1 Litre.'
          ],
          examples: [
            { question: 'Find volume of a box: length 5 cm, width 3 cm, height 4 cm', solution: 'Volume = 5 × 3 × 4 = 60 cm³.' }
          ]
        },
        questions: [
          {
            q: 'A box has length 4 cm, width 3 cm, and height 2 cm. What is its volume?',
            options: ['24 cm³', '18 cm³', '9 cm³', '12 cm³'],
            answer: '24 cm³',
            explanation: 'Volume = 4 × 3 × 2 = 24 cm³.'
          },
          {
            q: 'A cube has sides of 3 cm. What is its volume?',
            options: ['9 cm³', '18 cm³', '27 cm³', '54 cm³'],
            answer: '27 cm³',
            explanation: 'Volume = 3 × 3 × 3 = 27 cm³.'
          },
          {
            q: 'How many millilitres (mL) is equal to 250 cm³?',
            options: ['25 mL', '250 mL', '2.5 mL', '2500 mL'],
            answer: '250 mL',
            explanation: '1 cm³ is exactly equal to 1 mL, so 250 cm³ = 250 mL.'
          }
        ]
      },
      {
        id: 'conversions',
        title: 'Metric Conversions (Length, Mass, Capacity)',
        badge: 'Unit Wizard',
        summary: 'Converting between mm, cm, m, km; grams and kg; mL and Litres.',
        lesson: {
          keyIdea: 'The metric system is built on powers of 10 (kilo = 1000, centi = 1/100, milli = 1/1000).',
          rules: [
            'Length: 1 cm = 10 mm, 1 m = 100 cm, 1 km = 1000 m.',
            'Mass: 1 kg = 1000 grams.',
            'Capacity: 1 Litre = 1000 mL.',
            'Rule of thumb: Going to a SMALLER unit? MULTIPLY! Going to a BIGGER unit? DIVIDE!'
          ],
          examples: [
            { question: 'Convert 3.5 km to metres:', solution: 'Multiply by 1000: 3.5 × 1000 = 3500 m.' },
            { question: 'Convert 4500 g to kg:', solution: 'Divide by 1000: 4500 ÷ 1000 = 4.5 kg.' }
          ]
        },
        questions: [
          {
            q: 'How many centimetres (cm) are in 4.5 metres?',
            options: ['45 cm', '450 cm', '4500 cm', '0.45 cm'],
            answer: '450 cm',
            explanation: '1 m = 100 cm, so 4.5 × 100 = 450 cm.'
          },
          {
            q: 'Convert 2500 mL into Litres (L):',
            options: ['25 L', '2.5 L', '0.25 L', '250 L'],
            answer: '2.5 L',
            explanation: 'Divide by 1000: 2500 ÷ 1000 = 2.5 L.'
          },
          {
            q: 'How many grams (g) are in 3.2 kilograms (kg)?',
            options: ['32 g', '320 g', '3200 g', '32000 g'],
            answer: '3200 g',
            explanation: '1 kg = 1000 g, so 3.2 × 1000 = 3200 g.'
          }
        ]
      }
    ]
  },
  {
    id: 'data-probability',
    name: '5. Data Handling & Probability',
    icon: '📊',
    description: 'Mean, Median, Mode, Range, graphs, and simple probability.',
    topics: [
      {
        id: 'central-tendency',
        title: 'Mean, Median, Mode & Range',
        badge: 'Stats Detective',
        summary: 'Calculating the four measures of central tendency and spread.',
        lesson: {
          keyIdea: 'These four tools summarize a whole set of numbers into single easy-to-understand values.',
          rules: [
            'Mean: Add all the numbers together and divide by the count.',
            'Median: Put numbers in order from least to greatest. The middle number is the median.',
            'Mode: The number that appears MOST often (can have no mode or multiple modes).',
            'Range: The difference between the highest value and lowest value (Highest - Lowest).'
          ],
          examples: [
            { question: 'Find median of: 3, 7, 2, 9, 5', solution: 'Order them: 2, 3, 5, 7, 9. The middle number is 5.' },
            { question: 'Find mean of: 4, 6, 8', solution: '(4 + 6 + 8) = 18. Divide by 3: 18 ÷ 3 = 6.' }
          ]
        },
        questions: [
          {
            q: 'Find the mode of this data set: 4, 7, 2, 7, 9, 3, 7',
            options: ['4', '7', '9', '2'],
            answer: '7',
            explanation: '7 appears three times, more than any other number, so 7 is the mode.'
          },
          {
            q: 'What is the median of: 2, 5, 6, 8, 9?',
            options: ['5', '6', '8', '30'],
            answer: '6',
            explanation: 'Numbers are already ordered; the exact middle number is 6.'
          },
          {
            q: 'What is the range of: 12, 5, 18, 3, 9?',
            options: ['15', '18', '3', '10'],
            answer: '15',
            explanation: 'Highest is 18, lowest is 3. Range = 18 - 3 = 15.'
          },
          {
            q: 'Calculate the mean (average) of: 10, 20, 30',
            options: ['15', '20', '25', '60'],
            answer: '20',
            explanation: '(10 + 20 + 30) = 60. 60 ÷ 3 = 20.'
          }
        ]
      },
      {
        id: 'probability',
        title: 'Probability & Likelihood',
        badge: 'Chance & Chance',
        summary: 'Probability scale from 0 to 1, and calculating chances of events.',
        lesson: {
          keyIdea: 'Probability measures how likely an event is to happen, between 0 (Impossible) and 1 (Certain).',
          rules: [
            'Probability scale: 0 = Impossible, 0.5 = Even chance (50%), 1 = Certain (100%).',
            'Formula: P(Event) = (Number of favorable outcomes) / (Total possible outcomes).',
            'Example: Rolling an even number on a 6-sided die: {2, 4, 6} = 3 outcomes out of 6 -> 3/6 = 1/2 = 50%.'
          ],
          examples: [
            { question: 'Chance of flipping Heads on a fair coin?', solution: '1 favorable / 2 sides = 1/2 (50%).' }
          ]
        },
        questions: [
          {
            q: 'What is the probability of rolling a 4 on a standard 6-sided die?',
            options: ['1/6', '4/6', '1/4', '1/2'],
            answer: '1/6',
            explanation: 'There is only one face with a 4, out of 6 possible outcomes, so 1/6.'
          },
          {
            q: 'A bag has 3 red marbles and 2 blue marbles. What is the probability of picking a blue marble?',
            options: ['2/5', '3/5', '1/2', '2/3'],
            answer: '2/5',
            explanation: 'There are 2 blue marbles out of 5 total marbles = 2/5.'
          },
          {
            q: 'An event that will definitely happen has a probability of:',
            options: ['0', '0.5', '1', '100'],
            answer: '1',
            explanation: 'A certain event has a probability of 1 (or 100%).'
          }
        ]
      }
    ]
  }
];

// cambridge-book7.js - Cambridge Lower Secondary Mathematics Learner's Book 7 Navigator
// Direct 1:1 syllabus mapping for Justin's Cambridge Private School curriculum in Vanderbijlpark.

export const CAMBRIDGE_BOOK_7_UNITS = [
  {
    unit: 1,
    title: 'Integers & Directed Numbers',
    cambridgeRef: 'Curriculum Framework 7Ni.01 - 7Ni.05',
    strandId: 'numbers',
    topicId: 'integers',
    summary: 'Positive and negative numbers, four operations with directed numbers, zero pairs, square roots, and cube roots.',
    keyRule: 'Subtracting a negative turns into adding (+). Multiplying two negatives gives a positive (+).',
    workedExample: {
      q: 'Calculate: -8 - (-12)',
      a: '-8 + 12 = +4'
    }
  },
  {
    unit: 2,
    title: 'Expressions, Formulae & Equations',
    cambridgeRef: 'Curriculum Framework 7Ae.01 - 7Ae.07',
    strandId: 'algebra',
    topicId: 'linear-equations',
    summary: 'Constructing linear expressions, collecting like terms, expanding brackets, and solving linear equations with balance models.',
    keyRule: 'Whatever you do to one side of the equals sign, you must do the exact same thing to the other side.',
    workedExample: {
      q: 'Solve: 3x - 5 = 16',
      a: 'Add 5 to both sides: 3x = 21. Divide by 3: x = 7.'
    }
  },
  {
    unit: 3,
    title: 'Place Value & Decimals',
    cambridgeRef: 'Curriculum Framework 7Np.01 - 7Np.04',
    strandId: 'numbers',
    topicId: 'decimals-percentages',
    summary: 'Multiplying and dividing by 0.1 and 0.01, ordering decimals, rounding to 1 or 2 decimal places, mental decimal strategies.',
    keyRule: 'Multiplying by 0.1 is identical to dividing by 10 (move decimal point 1 place left).',
    workedExample: {
      q: 'Calculate: 45 x 0.01',
      a: '45 ÷ 100 = 0.45'
    }
  },
  {
    unit: 4,
    title: 'Decimals, Fractions & Percentages',
    cambridgeRef: 'Curriculum Framework 7Nf.01 - 7Nf.06',
    strandId: 'numbers',
    topicId: 'fractions',
    summary: 'Equivalence conversions between fractions, decimals, and percentages, recurring decimals, fractions of quantities.',
    keyRule: 'To find a fraction of an amount: divide by the denominator (bottom), then multiply by the numerator (top).',
    workedExample: {
      q: 'Find 3/5 of 40 kg',
      a: '40 ÷ 5 = 8. 8 x 3 = 24 kg.'
    }
  },
  {
    unit: 5,
    title: 'Angles & Constructions',
    cambridgeRef: 'Curriculum Framework 7Gg.01 - 7Gg.06',
    strandId: 'geometry',
    topicId: 'angles-lines',
    summary: 'Angles at a point (360°), straight lines (180°), vertically opposite angles, triangle angle sum, parallel line alternate and corresponding angles.',
    keyRule: 'Angles on a straight line add to 180°. Angles around a point add to 360°.',
    workedExample: {
      q: 'A straight line has angles 115° and x°. Find x.',
      a: 'x = 180° - 115° = 65°'
    }
  },
  {
    unit: 6,
    title: 'Collecting & Displaying Data',
    cambridgeRef: 'Curriculum Framework 7Ss.01 - 7Ss.04',
    strandId: 'data-probability',
    topicId: 'averages',
    summary: 'Discrete vs continuous data, frequency tables, two-way tables, dual and compound bar charts, and reading pie charts.',
    keyRule: 'Discrete data can only be counted in distinct values (e.g. goals scored). Continuous data is measured (e.g. height, time).',
    workedExample: {
      q: 'Is number of siblings discrete or continuous?',
      a: 'Discrete (you count whole siblings: 0, 1, 2...).'
    }
  },
  {
    unit: 7,
    title: 'Fractions & Mixed Numbers',
    cambridgeRef: 'Curriculum Framework 7Nf.07 - 7Nf.12',
    strandId: 'numbers',
    topicId: 'fractions',
    summary: 'Adding and subtracting unlike fractions using the lowest common denominator (LCD), multiplying fractions, dividing fractions by reciprocals.',
    keyRule: 'To divide by a fraction: Keep the first fraction, Change division to multiplication, Flip the second fraction (KCF).',
    workedExample: {
      q: 'Calculate: 2/3 ÷ 4/5',
      a: '2/3 x 5/4 = 10/12 = 5/6.'
    }
  },
  {
    unit: 8,
    title: 'Shapes, Symmetry & 3D Polyhedra',
    cambridgeRef: 'Curriculum Framework 7Gg.07 - 7Gg.12',
    strandId: 'geometry',
    topicId: '3d-objects',
    summary: 'Prisms, pyramids, faces, edges, vertices, Euler’s formula (F + V - E = 2), nets of solids, reflective and rotational symmetry.',
    keyRule: 'A regular polygon has the same number of lines of reflective symmetry and rotational symmetry order as its number of sides.',
    workedExample: {
      q: 'A rectangular prism has how many faces, edges, and vertices?',
      a: '6 faces, 12 edges, 8 vertices.'
    }
  },
  {
    unit: 9,
    title: 'Sequences & Functions',
    cambridgeRef: 'Curriculum Framework 7As.01 - 7As.05',
    strandId: 'algebra',
    topicId: 'sequences',
    summary: 'Term-to-term rules, position-to-term rules, generating sequences from the nth term formula (Tn = dn + c), linear mapping diagrams.',
    keyRule: 'In a linear sequence, the difference between terms (d) multiplies n. The zeroth term is your starting constant.',
    workedExample: {
      q: 'Find the nth term of: 5, 8, 11, 14...',
      a: 'Common difference is +3. First term is 3(1) + 2 = 5. Formula: 3n + 2.'
    }
  },
  {
    unit: 10,
    title: 'Percentages & Financial Maths',
    cambridgeRef: 'Curriculum Framework 7Nf.13 - 7Nf.16',
    strandId: 'numbers',
    topicId: 'decimals-percentages',
    summary: 'Percentage increase and decrease, profit and loss, discounts in sales, expressing one quantity as a percentage of another.',
    keyRule: 'Percentage increase = (Increase ÷ Original) x 100%. Always divide by the ORIGINAL starting value!',
    workedExample: {
      q: 'A shirt costing R200 is discounted by 15%. What is the sale price?',
      a: '10% of 200 = R20, 5% = R10. Total discount = R30. Sale price = R170.'
    }
  },
  {
    unit: 11,
    title: 'Graphs & Coordinates',
    cambridgeRef: 'Curriculum Framework 7As.06 - 7As.09',
    strandId: 'algebra',
    topicId: 'linear-equations',
    summary: 'Cartesian grid in four quadrants, lines parallel to axes (y = c is horizontal, x = k is vertical), plotting conversion graphs.',
    keyRule: 'Always read x along the horizontal corridor first, then y up or down the vertical stairs: (x, y).',
    workedExample: {
      q: 'What is the equation of the horizontal line passing through (3, -4)?',
      a: 'y = -4 (every point on this line has a y-coordinate of -4).'
    }
  },
  {
    unit: 12,
    title: 'Ratio & Proportion',
    cambridgeRef: 'Curriculum Framework 7Nf.17 - 7Nf.20',
    strandId: 'ratio-cram',
    topicId: 'ratio',
    summary: 'Writing and simplifying ratios, sharing amounts in ratios (bar models), direct proportion, unitary method, and best buy rates.',
    keyRule: 'To share an amount in ratio a:b: Find total parts (a + b). Find value of 1 part = Total ÷ parts. Multiply each part.',
    workedExample: {
      q: 'Share R120 in the ratio 2 : 3',
      a: '5 parts total. 1 part = 120 ÷ 5 = R24. Share 1 = 2 x 24 = R48; Share 2 = 3 x 24 = R72.'
    }
  },
  {
    unit: 13,
    title: 'Probability & Likelihood',
    cambridgeRef: 'Curriculum Framework 7Sp.01 - 7Sp.04',
    strandId: 'data-probability',
    topicId: 'probability',
    summary: 'Probability scale from 0 (impossible) to 1 (certain), theoretical probability = successful outcomes ÷ total outcomes.',
    keyRule: 'The sum of probabilities of all mutually exclusive and exhaustive outcomes is always equal to exactly 1.',
    workedExample: {
      q: 'Probability of rolling a prime number on a 6-sided dice (2, 3, 5)?',
      a: '3 prime outcomes out of 6 total = 3/6 = 1/2 (0.5 or 50%).'
    }
  },
  {
    unit: 14,
    title: 'Position & Transformation',
    cambridgeRef: 'Curriculum Framework 7Gg.13 - 7Gg.16',
    strandId: 'geometry',
    topicId: 'angles-lines',
    summary: 'Bearings from North measured clockwise with 3 digits (e.g. 045°), reflections across x-axis and y-axis, translations and rotations.',
    keyRule: 'Three-figure bearings must always be measured clockwise from North and written with 3 digits (e.g. East is 090°).',
    workedExample: {
      q: 'Justin faces North and turns 135° clockwise. What is his 3-figure bearing?',
      a: '135°'
    }
  },
  {
    unit: 15,
    title: 'Area, Perimeter & Volume',
    cambridgeRef: 'Curriculum Framework 7Gg.17 - 7Gg.22',
    strandId: 'measurement',
    topicId: 'perimeter-area',
    summary: 'Perimeter and area of compound shapes (L-shapes), area of triangles (1/2 x base x height), surface area and volume of cuboids (l x w x h).',
    keyRule: 'Area of triangle = 1/2 x base x perpendicular height. Always ensure base and height meet at right angles (90°)!',
    workedExample: {
      q: 'Find the volume of a fish tank with length 40 cm, width 25 cm, and height 30 cm.',
      a: 'V = 40 x 25 x 30 = 30 000 cm³ (which is 30 litres).'
    }
  },
  {
    unit: 16,
    title: 'Interpreting & Comparing Data',
    cambridgeRef: 'Curriculum Framework 7Ss.05 - 7Ss.08',
    strandId: 'data-probability',
    topicId: 'averages',
    summary: 'Measures of central tendency: Mean (sum ÷ count), Median (middle value), Mode (most frequent), and Range (highest - lowest) for comparing distributions.',
    keyRule: 'Before finding the median, ALWAYS sort the numbers from smallest to largest first!',
    workedExample: {
      q: 'Find the median of: 8, 3, 9, 2, 7',
      a: 'Order first: 2, 3, 7, 8, 9. The middle number is 7.'
    }
  }
];

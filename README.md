# 🎓 Justin's Cambridge Lower Secondary Grade 7 Mathematics Academy
### Kainos Cambridge School &bull; Vanderbijlpark, South Africa

A unified, comprehensive, ADHD & dyscalculia friendly mathematics web application engineered specifically for **Justin Lamusse** at **Kainos Cambridge School** in Vanderbijlpark, South Africa.

Hosted live on GitHub Pages: **[https://andrelamusse.github.io/Justin-Maths-Grade7/](https://andrelamusse.github.io/Justin-Maths-Grade7/)**

---

## 🌟 What This Application Delivers

### 1. 📘 Full Cambridge Stage 7 Syllabus Scope (Learner's Book 7, Units 1 to 16)
Every single unit of the Cambridge Lower Secondary Stage 7 Mathematics curriculum is fully implemented:
1. **Unit 1: Integers & Directed Numbers** (`7Ni.01 - 7Ni.05`) — Directed numbers, negative operations, zero pairs, square roots, cube roots.
2. **Unit 2: Expressions, Formulae & Linear Equations** (`7Ae.01 - 7Ae.07`) — Like terms, bracket expansion, balance model equation solving.
3. **Unit 3: Place Value & Decimals** (`7Np.01 - 7Np.04`) — Powers of 10, multiplying/dividing by 0.1 and 0.01, decimal rounding.
4. **Unit 4: Decimals, Fractions & Percentages** (`7Nf.01 - 7Nf.06`) — Equivalence trio, recurring decimals, fractions of quantities.
5. **Unit 5: Angles & Constructions** (`7Gg.01 - 7Gg.06`) — Angles on lines (180°), points (360°), parallel line alternate (Z) and corresponding (F) angles, triangle sum.
6. **Unit 6: Collecting & Displaying Data** (`7Ss.01 - 7Ss.04`) — Discrete vs continuous, frequency tables, two-way tables, pie charts.
7. **Unit 7: Fractions & Mixed Numbers** (`7Nf.07 - 7Nf.12`) — Unlike denominators (LCD), fraction multiplication, Keep-Change-Flip (KCF) division.
8. **Unit 8: Shapes, Symmetry & 3D Polyhedra** (`7Gg.07 - 7Gg.12`) — Euler's formula ($F + V - E = 2$), rotational symmetry, nets of solids.
9. **Unit 9: Sequences & Functions** (`7As.01 - 7As.05`) — Term-to-term, position-to-term $n$-th term formula ($T_n = dn + c$).
10. **Unit 10: Percentages & Financial Maths** (`7Nf.13 - 7Nf.16`) — Discounts, percentage increase/decrease, profit/loss, simple interest ($I = \frac{P \cdot r \cdot t}{100}$).
11. **Unit 11: Graphs & Coordinates** (`7As.06 - 7As.09`) — 4 quadrants, horizontal ($y = c$) and vertical ($x = k$) lines, conversion graphs.
12. **Unit 12: Ratio & Proportion** (`7Nf.17 - 7Nf.20`) — Simplifying ratios, dividing amounts (bar models), unitary method, best buys.
13. **Unit 13: Probability & Likelihood** (`7Sp.01 - 7Sp.04`) — 0 to 1 probability scale, theoretical probability, complementary events ($1 - P$).
14. **Unit 14: Position & Transformation** (`7Gg.13 - 7Gg.16`) — Three-figure bearings (clockwise from North), translations, reflections, rotations.
15. **Unit 15: Area, Perimeter & Volume** (`7Gg.17 - 7Gg.22`) — Compound L-shapes, triangle area ($\frac{1}{2}bh$), cuboid volume and surface area.
16. **Unit 16: Interpreting & Comparing Data** (`7Ss.05 - 7Ss.08`) — Mean, median, mode, range (consistency comparisons).

---

### 2. 🧠 Neuro-Visual ADHD & Dyscalculia Learning Architecture
- **Concrete $\to$ Visual $\to$ Abstract (CVA):** Every lesson begins with tactile/real-world analogies (e.g. freezing winter mornings along the Vaal River at $-3^\circ\text{C}$, pocket money in South African Rand R), progresses to visual mental models, and concludes with clear mathematical rules.
- **Audio Dual-Coding (SpeechCoach):** Integrated Web Speech API reads lessons, worked examples, and hints aloud with natural pronunciation of mathematical symbols.
- **Justin's Watch-Out Traps:** Specific ADHD coaching callouts highlighting common stumbling blocks before they occur.
- **Multi-Tier Practice Arena:** Every unit features 3 distinct difficulty tiers:
  - 🟢 **Easy:** Scaffolded numbers and direct conceptual recall.
  - 🟡 **Medium:** Standard Cambridge exam-style questions.
  - 🔴 **Hard:** Multi-step problem solving and reasoning.
  - ⚡ **All Tiers:** Progressive mode for streak ramp-up.
- **Touch Scratchpad / Whiteboard:** Built directly into quiz and exam screens so Justin can sketch working, frog jumps, or calculations on his phone or laptop screen.

---

### 3. 📐 Textbook-Grade Mathematical Typography
- Integrated with **KaTeX** via CDN + a pure CSS/HTML fallback parser.
- Fractions are rendered vertically ($\frac{a}{b}$), operations are rendered with proper mathematical symbols ($\times$, $\div$, $\pm$, $-$), roots ($\sqrt{x}$, $\sqrt[3]{x}$), powers ($x^2$), and degrees ($^\circ$).
- **Zero raw programming syntax** (no `2/3`, `*`, `sqrt(x)`).

---

### 4. 🛠️ 6 Interactive Virtual Manipulatives Lab
1. ⚖️ **Linear Equation Balance Scale:** SVG balance beam that realistically tilts; add/remove $x$-blocks and unit weights to both sides to solve linear equations visually.
2. 🧱 **Interactive Fraction Wall:** Tap any fraction brick (from 1 whole down to $\frac{1}{12}$) to highlight all vertically aligned equivalent fractions with instant decimal and percentage conversions.
3. 📐 **Angle Protractor & Visualizer:** Real-time rotating angle ray with classification (acute, right, obtuse, straight, reflex) and complementary/supplementary partner calculations.
4. 🌡️ **Integer Thermometer & Number Line:** Dual vertical mercury tube and horizontal number line to visualize positive and negative values with zero freezing reference.
5. 📍 **Cartesian 4-Quadrant Coordinate Plotter:** Interactive coordinate plane ($-5$ to $+5$) with quadrant detection and projection lines.
6. 🍫 **Ratio Bar Model Visualizer:** Enter ratio parts and total Rand amount to dynamically render proportional blocks showing the exact value of 1 part and each person's share.

---

### 5. 🎓 Kainos Cambridge School Assessment Center
- **Cambridge Stage 7 Progression Tests:**
  - **Paper 1 (Non-Calculator):** 45 Marks, 1 Hour.
  - **Paper 2 (Calculator Allowed):** 45 Marks, 1 Hour.
- **Cambridge Primary Checkpoint Stage 6 Bridge Exams:**
  - **Paper 1 & Paper 2 (Non-Calculator):** 40 Marks each (diagnostic bridge).
- **Features:**
  - In-app interactive test simulator mode with countdown timer, marking scheme, and detailed question-by-question report card.
  - Direct links to official formatted printable HTML exams and downloadable PDFs located in `./cambridge-stage7-exams/`.
  - Comprehensive memorandums with teacher coaching notes tailored for Justin.

---

### 6. 📱 100% Responsive for Mobile Phone & Laptop
- Zero horizontal scrolling (`overflow-x: hidden`).
- Fluid touch targets ($\ge 48\text{px}$) for phone use.
- Accessible font toggle (**Lexend** / **OpenDyslexic**).
- High-contrast Light Mode and Dark Mode.
- LocalStorage persistence for XP, streaks, mastered units, and display settings.

---

## 🧪 Automated Test Suite

Run the full automated test suite using Node.js built-in test runner:

```bash
node --test
```

All 45 automated tests verify:
- Complete 16-unit Cambridge Stage 7 syllabus sequence.
- CVA lesson structure and personal coaching tips across all units.
- Multi-tier questions with valid single matching answers.
- Exact mathematical accuracy across arithmetic, fractions, equations, geometry, ratio, probability, and statistics.
- KaTeX typography rendering engine and speech translation.
- Past exam paper catalog, PDF file integrity, and grading simulator logic.

# 🚀 Justin's Math Suite: Grade 7 Academy & Neuro-Visual Grinder

A specialized dual-application mathematics learning suite engineered for **Justin**, a Grade 7 learner who experiences difficulties visualizing arithmetic in his head (ADHD, dyscalculia, dyslexia, or working memory challenges).

Both applications are 100% self-contained, high-performance static web apps ready to host directly on **GitHub Pages** with **zero build steps** and **zero external dependencies**.

---

## 🌟 The Two Applications

### 1. 🧠 Neuro-Visual Basic Math Grinder (`/basic-math-grinder/`)
> **The Priority Application** — Master the foundational core operations ($1+4$, $7+3$, $34+23$, $2 \times 4$, $12 \div 3$).

- **The Problem It Solves:** When a learner cannot picture quantities in their mind, traditional mental drills fail and cause cognitive shutdown.
- **Multisensory CPA Visualizations (Concrete $\to$ Pictorial $\to$ Abstract):**
  - **Ten-Frames & Double Ten-Frames:** Red and blue physical counters filling 10-grids, making "bridging to 10" visible and tangible.
  - **Base-Ten (Dienes) Blocks:** 3D-styled Ten Rods and Unit Cubes for 2-digit numbers ($34 + 23$), showing place-value grouping and regrouping/carrying.
  - **Interactive Number Line (Frog Leap):** Animated arcs showing forward jumps for addition and backward hops for subtraction.
  - **Dot Array Grids:** Visual arrays for multiplication ($2 \times 4$ shows 2 rows of 4 tiles), linking to repeated addition.
  - **Equal Sharing Groups:** Dividing cookies into colored plates with count badges.
- **Verbal Voice Coach (Web Speech API):**
  - Speaks step-by-step mental math tricks in clear, unhurried English (e.g. *"Nine is almost 10! Add 10, then step back 1"* or *"Let's break 34 + 23 into tens and ones"*).
- **ADHD-Friendly Dopamine Loop:**
  - Single question on screen with zero cognitive clutter.
  - No stress timers by default.
  - **Streak Shield:** Wrong answers gently drop streak by only 1 instead of resetting to 0, preventing emotional frustration.
  - Joyful synthesized audio chimes (Web Audio API) and confetti rewards on streaks.
  - On-screen touch keypad + physical keyboard support (Enter, 0-9, Backspace).
  - Built-in scratchpad for digital doodling and working out problems.

---

### 2. 📐 Justin's Grade 7 English Maths Academy (`/grade7-academy/`)
> Full curriculum mastery aligned with South African CAPS / UK KS3 / Common Core Grade 7 English Mathematics.

- **Strand 1: Numbers & Operations:**
  - Integers & Directed Numbers (positive/negative rules, number line).
  - Exponents, Squares, Cubes, Square Roots ($\sqrt{81}$) and Cube Roots ($\sqrt[3]{64}$).
  - Common Fractions (simplifying, adding/subtracting unlike denominators, multiplying).
  - Decimals, Percentages & Financial Maths (discounts, profit & loss).
- **Strand 2: Patterns, Functions & Algebra:**
  - Number Sequences and $T_n$ formulas ($4n - 1$).
  - Algebraic Expressions, variables, coefficients, and combining like terms.
  - Solving Linear Equations ($2x + 4 = 16$).
- **Strand 3: Space & Shape (Geometry):**
  - Angles (Acute, Right, Obtuse, Straight, Reflex) and complementary/supplementary angles.
  - Triangle interior angle sum ($180^\circ$) and triangle classifications.
  - 3D Polyhedra (Faces, Edges, Vertices for prisms and pyramids).
- **Strand 4: Measurement:**
  - Perimeter and Area of Rectangles and Triangles ($A = \frac{1}{2} b \times h$).
  - Surface Area and Volume of Rectangular Prisms ($V = l \times b \times h$).
  - Metric unit conversions ($mm \leftrightarrow cm \leftrightarrow m \leftrightarrow km$, $g \leftrightarrow kg$, $mL \leftrightarrow L$).
- **Strand 5: Data Handling & Probability:**
  - Mean, Median, Mode, and Range calculations.
  - Probability scale (Impossible $0$ to Certain $1$).
- **Interactive Virtual Labs:**
  - ⚖️ **Equation Balance Scale:** Interactive two-pan balance scale to visualize equations.
  - 🧱 **Fraction Wall:** Interactive alignment of halves, thirds, quarters, fifths, sixths, eighths, tenths, twelfths.
  - 📐 **Angle Protractor:** Real-time rotating angle ray with angle classification.
  - 🌡️ **Integer Thermometer:** Freezing point $0^\circ\text{C}$ with warming (+) and cooling (-).
- **Challenge Exam Mode:**
  - 10-question randomized mock test with detailed report card and percentage breakdown.

---

## 🧭 Master Portal Hub (`/index.html`)

The repository root includes a launchpad connecting both applications:
- Displays Justin's aggregate XP, problems solved, highest streak, and mastered topics.
- Direct quick-launch links to both apps.
- Comprehensive pedagogy guide for parents and tutors.
- GitHub Pages setup guide.

---

## 🌐 How to Host on GitHub & GitHub Pages

Since all code is written in vanilla HTML5, CSS3, and ES6+ modules without any build tools or external servers, hosting is 100% free on GitHub Pages:

### Step 1: Initialize Git and Push to GitHub
Open a terminal in this folder (`Justin Maths Grade 7`):

```bash
git init
git add .
git commit -m "feat: complete Justin Maths Grade 7 suite and neuro-visual grinder"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Turn on GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (top navigation bar).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment**:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click **Save**.
6. Wait 60–90 seconds. GitHub will display your live website URL:
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

Both apps are immediately usable on desktops, laptops, Chromebooks, iPads, tablets, and phones!

---

## 💻 Running Locally (Offline)

You can run the suite locally anytime:
- Simply double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.
- Or start a quick local server using Python or Node.js:
  ```bash
  # Using Node:
  npx serve .
  # OR using Python:
  python -m http.server 8000
  ```
  Then visit `http://localhost:8000`.

---

## 🧪 Automated Test Suite

The project includes an automated test suite verifying mathematical correctness, question generation, CPA visualizer models, and edge cases:

```bash
node --test tests/*.test.js
```

### Test Coverage Highlights:
- **`tests/basic-math.test.js`**: Validates question generators for $+$, $-$, $\times$, $\div$ across all difficulty levels, no division by zero, exact integer quotients, and verbal speech script generation.
- **`tests/grade7.test.js`**: Validates curriculum structure across all 5 strands and checks mathematical accuracy of answer keys.
- **`tests/visualizers.test.js`**: Validates ten-frame slot math, base-ten tens/ones decomposition, and multiplication arrays.
- **`tests/edge-cases.test.js`**: 1,000-iteration stress testing with randomized operands ensuring zero `NaN` values, clean math, and exhaustive question bank checks.

---

## 🧠 Pedagogy Note for Justin's Learning

1. **Start with the Basic Math Grinder for 10–15 minutes daily**:
   - Have Justin grind Level 1 and Level 2 addition and subtraction facts.
   - Encourage him to tap **"📢 Explain"** so he hears the logic aloud.
   - Encourage him to tap **"Show Visualizer 👁️"** to see the red/blue dots and blocks until the visual patterns lock into his memory.
2. **Transition to Grade 7 Academy**:
   - Use the **Interactive Tools Lab** first (e.g. playing with the Equation Balance Scale or Fraction Wall) before tackling the quizzes.
   - Use the **"Read Aloud"** button on lessons to prevent reading fatigue.

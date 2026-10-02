// app.js - Main Application Logic for Neuro-Visual Basic Math Grinder
import { MathVisualizer } from './visualizers.js';
import { sound } from './audio.js';
import { generateVerbalExplanation } from './speech-scripts.js';

// Level definitions (Preserved for full backwards compatibility)
export const LEVEL_DEFINITIONS = {
  '+': [
    { id: 1, name: 'Micro Basics (1 - 5)', desc: '1+4, 2+3, 1+1...' },
    { id: 2, name: 'Making 10', desc: '7+3, 6+4, 8+2...' },
    { id: 3, name: 'Teens & Bridges', desc: '8+5, 9+7, 7+6...' },
    { id: 4, name: '2-Digit (No Regrouping)', desc: '34+23, 42+15...' },
    { id: 5, name: '2-Digit (With Regrouping)', desc: '48+27, 39+45...' }
  ],
  '-': [
    { id: 1, name: 'Facts within 5', desc: '5-2, 4-1, 3-2...' },
    { id: 2, name: 'Facts within 10', desc: '10-4, 8-3, 9-5...' },
    { id: 3, name: 'Teen Bridges', desc: '14-6, 13-5, 17-9...' },
    { id: 4, name: '2-Digit (No Borrowing)', desc: '47-23, 68-35...' },
    { id: 5, name: '2-Digit (With Borrowing)', desc: '52-28, 71-34...' }
  ],
  '×': [
    { id: 1, name: '2x, 5x, 10x Tables', desc: 'Double, nickels & tens' },
    { id: 2, name: '3x, 4x Tables', desc: 'Triples & double-doubles' },
    { id: 3, name: '6x, 7x, 8x, 9x Tables', desc: 'Upper times tables' },
    { id: 4, name: '11x & 12x Tables', desc: 'Eleventh & twelfth facts' },
    { id: 5, name: 'Mastery Mix (1 - 12)', desc: 'All times tables mix' }
  ],
  '÷': [
    { id: 1, name: 'Halves & ÷2', desc: '8÷2, 14÷2, 20÷2...' },
    { id: 2, name: '÷5 & ÷10', desc: '35÷5, 70÷10, 45÷5...' },
    { id: 3, name: '÷3 & ÷4', desc: '24÷3, 36÷4, 28÷4...' },
    { id: 4, name: 'Mastery Division', desc: 'Even division up to 144' }
  ]
};

// Streamlined 7 Category Definitions
export const CATEGORIES = [
  {
    id: 'add',
    name: 'Addition (+)',
    symbol: '+',
    icon: '➕',
    ops: ['+'],
    desc: 'Practice addition facts'
  },
  {
    id: 'sub',
    name: 'Subtraction (-)',
    symbol: '-',
    icon: '➖',
    ops: ['-'],
    desc: 'Practice subtraction facts'
  },
  {
    id: 'mul',
    name: 'Multiplication (×)',
    symbol: '×',
    icon: '✖️',
    ops: ['×'],
    desc: 'Practice multiplication tables'
  },
  {
    id: 'div',
    name: 'Division (÷)',
    symbol: '÷',
    icon: '➗',
    ops: ['÷'],
    desc: 'Practice division facts'
  },
  {
    id: 'mixed_add_sub',
    name: 'Mixed Addition & Subtraction (+ & -)',
    shortName: 'Mixed (+ & -)',
    symbol: '+ & -',
    icon: '➕➖',
    ops: ['+', '-'],
    desc: 'Mixed addition and subtraction problems'
  },
  {
    id: 'mixed_mul_div',
    name: 'Mixed Multiplication & Division (× & ÷)',
    shortName: 'Mixed (× & ÷)',
    symbol: '× & ÷',
    icon: '✖️➗',
    ops: ['×', '÷'],
    desc: 'Mixed multiplication and division problems'
  },
  {
    id: 'all_mixed',
    name: 'All 4 Operations Mixed (+, -, ×, ÷)',
    shortName: 'All 4 Mixed (+, -, ×, ÷)',
    symbol: '+, -, ×, ÷',
    icon: '🎲',
    ops: ['+', '-', '×', '÷'],
    desc: 'All 4 operations combined'
  }
];

// 4 Sub-Category Difficulty Options
export const SUB_CATEGORIES = [
  {
    id: 'easy',
    name: 'Easy',
    icon: '🌱',
    desc: 'Core fundamentals & small numbers'
  },
  {
    id: 'medium',
    name: 'Medium',
    icon: '⚡',
    desc: 'Bridges to 10 & 2-digit basics'
  },
  {
    id: 'hard',
    name: 'Hard',
    icon: '🔥',
    desc: 'Regrouping, borrowing & upper tables'
  },
  {
    id: 'all',
    name: 'All (Gradual)',
    icon: '🚀',
    desc: 'Progressive mode: dynamically ramps up difficulty as questions are solved'
  }
];

export class MathGrinderApp {
  constructor() {
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
    this.updateCategoryUI();
    this.updateSubCategoryUI();
    this.updateStatsUI();
    this.nextQuestion();
  }

  cacheDom() {
    this.dom = {
      appContainer: document.getElementById('grinder-app'),
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

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key >= '0' && e.key <= '9') {
        this.handleKeyInput(e.key);
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
    let a = 1;
    let b = 1;
    let result = 2;

    if (op === '+') {
      if (level === 1) {
        // Micro basics (1 to 5)
        a = Math.floor(Math.random() * 5) + 1;
        b = Math.floor(Math.random() * 5) + 1;
      } else if (level === 2) {
        // Making 10
        a = Math.floor(Math.random() * 9) + 1;
        b = 10 - a;
        if (Math.random() > 0.5) {
          // slight variation around 10
          b = Math.min(10, Math.max(1, 10 - a + (Math.random() > 0.5 ? 1 : -1)));
        }
      } else if (level === 3) {
        // Teens & bridges (6 to 9 adding 4 to 9)
        a = Math.floor(Math.random() * 4) + 6; // 6,7,8,9
        b = Math.floor(Math.random() * 5) + 5; // 5,6,7,8,9
      } else if (level === 4) {
        // 2-digit without carry (e.g. 34 + 23)
        const aTens = Math.floor(Math.random() * 5) + 1; // 1 to 5
        const bTens = Math.floor(Math.random() * (9 - aTens)) + 1; // sum <= 9
        const aOnes = Math.floor(Math.random() * 9) + 1; // 1 to 9
        const bOnes = Math.floor(Math.random() * (10 - aOnes)); // 0 to 9 - aOnes inclusive, sum <= 9
        a = aTens * 10 + aOnes;
        b = bTens * 10 + bOnes;
      } else if (level === 5) {
        // 2-digit with carry (e.g. 48 + 27)
        const aTens = Math.floor(Math.random() * 4) + 1; // 1 to 4
        const bTens = Math.floor(Math.random() * (8 - aTens)) + 1; // sum <= 8
        const aOnes = Math.floor(Math.random() * 9) + 1; // 1 to 9
        const minB = 10 - aOnes;
        const bOnes = Math.floor(Math.random() * (10 - minB)) + minB; // minB to 9, sum >= 10
        a = aTens * 10 + aOnes;
        b = bTens * 10 + bOnes;
      }
      result = a + b;

    } else if (op === '-') {
      if (level === 1) {
        // Facts within 5
        a = Math.floor(Math.random() * 4) + 2; // 2 to 5
        b = Math.floor(Math.random() * a) + 1; // 1 to a
      } else if (level === 2) {
        // Facts within 10
        a = Math.floor(Math.random() * 5) + 6; // 6 to 10
        b = Math.floor(Math.random() * (a - 1)) + 1;
      } else if (level === 3) {
        // Teen bridges (11 to 18 minus single digit crossing 10)
        a = Math.floor(Math.random() * 8) + 11; // 11 to 18
        const aOnes = a - 10; // 1 to 8
        const minB = aOnes + 1; // must bridge across 10
        const maxB = 9; // single digit subtrahend
        b = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
      } else if (level === 4) {
        // 2-digit no borrow (e.g. 47 - 23, 68 - 35)
        const aTens = Math.floor(Math.random() * 6) + 3; // 3 to 8
        const bTens = Math.floor(Math.random() * (aTens - 1)) + 1; // 1 to aTens - 1
        const aOnes = Math.floor(Math.random() * 10); // 0 to 9
        const bOnes = Math.floor(Math.random() * (aOnes + 1)); // 0 to aOnes
        a = aTens * 10 + aOnes;
        b = bTens * 10 + bOnes;
      } else if (level === 5) {
        // 2-digit with borrow (e.g. 52 - 28)
        const aTens = Math.floor(Math.random() * 6) + 3; // 3 to 8
        const bTens = Math.floor(Math.random() * (aTens - 1)) + 1; // 1 to aTens - 1
        const bOnes = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const aOnes = Math.floor(Math.random() * bOnes); // 0 to bOnes - 1 (guaranteed aOnes < bOnes)
        a = aTens * 10 + aOnes;
        b = bTens * 10 + bOnes;
      }
      result = a - b;

    } else if (op === '×') {
      if (level === 1) {
        const table = [2, 5, 10][Math.floor(Math.random() * 3)];
        const multiplier = Math.floor(Math.random() * 10) + 1;
        a = table;
        b = multiplier;
      } else if (level === 2) {
        const table = [3, 4][Math.floor(Math.random() * 2)];
        const multiplier = Math.floor(Math.random() * 10) + 1;
        a = table;
        b = multiplier;
      } else if (level === 3) {
        const table = [6, 7, 8, 9][Math.floor(Math.random() * 4)];
        const multiplier = Math.floor(Math.random() * 9) + 2;
        a = table;
        b = multiplier;
      } else if (level === 4) {
        const table = [11, 12][Math.floor(Math.random() * 2)];
        const multiplier = Math.floor(Math.random() * 10) + 1;
        a = table;
        b = multiplier;
      } else if (level === 5) {
        a = Math.floor(Math.random() * 12) + 1;
        b = Math.floor(Math.random() * 12) + 1;
      }
      result = a * b;

    } else if (op === '÷') {
      let divisor = 2;
      let maxQuotient = 10;
      if (level === 1) divisor = 2;
      else if (level === 2) divisor = [5, 10][Math.floor(Math.random() * 2)];
      else if (level === 3) divisor = [3, 4][Math.floor(Math.random() * 2)];
      else {
        divisor = Math.floor(Math.random() * 11) + 2; // 2 to 12
        maxQuotient = 12; // up to 144
      }

      const quotient = Math.floor(Math.random() * maxQuotient) + 1;
      b = divisor;
      result = quotient;
      a = b * result;
    }

    return { op, a, b, result };
  }

  generateByDifficulty(op, difficulty = 'easy') {
    if (op === '+') {
      if (difficulty === 'easy') {
        const lvl = Math.random() < 0.5 ? 1 : 2;
        return this.generateByLevel('+', lvl);
      } else if (difficulty === 'medium') {
        const lvl = Math.random() < 0.5 ? 3 : 4;
        return this.generateByLevel('+', lvl);
      } else {
        // hard: 85% level 5 (regrouping), 15% level 4
        const lvl = Math.random() < 0.85 ? 5 : 4;
        return this.generateByLevel('+', lvl);
      }
    } else if (op === '-') {
      if (difficulty === 'easy') {
        const lvl = Math.random() < 0.5 ? 1 : 2;
        return this.generateByLevel('-', lvl);
      } else if (difficulty === 'medium') {
        const lvl = Math.random() < 0.5 ? 3 : 4;
        return this.generateByLevel('-', lvl);
      } else {
        // hard: level 5 (borrowing)
        return this.generateByLevel('-', 5);
      }
    } else if (op === '×' || op === '*') {
      if (difficulty === 'easy') {
        return this.generateByLevel('×', 1); // 2x, 5x, 10x
      } else if (difficulty === 'medium') {
        const lvl = Math.random() < 0.5 ? 2 : 3; // 3x, 4x, or 6x-9x
        return this.generateByLevel('×', lvl);
      } else {
        // hard: level 3 (20%), level 4 (40%), level 5 (40%)
        const r = Math.random();
        const lvl = r < 0.2 ? 3 : (r < 0.6 ? 4 : 5);
        return this.generateByLevel('×', lvl);
      }
    } else if (op === '÷' || op === '/') {
      if (difficulty === 'easy') {
        const lvl = Math.random() < 0.5 ? 1 : 2; // ÷2, ÷5, ÷10
        return this.generateByLevel('÷', lvl);
      } else if (difficulty === 'medium') {
        const lvl = Math.random() < 0.7 ? 3 : 2; // ÷3, ÷4, ÷5
        return this.generateByLevel('÷', lvl);
      } else {
        // hard: level 4 (mastery up to 144)
        return this.generateByLevel('÷', 4);
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

    // 3. Determine operation from category
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
    this.currentQuestion = this.generateQuestion(this.currentCategory, this.currentSubCategory);
    this.currentOp = this.currentQuestion.op;

    if (this.dom) {
      if (this.dom.numA) this.dom.numA.textContent = this.currentQuestion.a;
      if (this.dom.opSymbol) this.dom.opSymbol.textContent = this.currentQuestion.op;
      if (this.dom.numB) this.dom.numB.textContent = this.currentQuestion.b;
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
    } else {
      // Limit to 4 digits
      if (this.userAnswer.length < 4) {
        this.userAnswer += val;
      }
    }

    if (this.dom.answerDisplay) {
      this.dom.answerDisplay.textContent = this.userAnswer === '' ? '?' : this.userAnswer;
    }
  }

  submitAnswer() {
    if (this.userAnswer === '' || this.userAnswer === '?') return;

    const entered = parseInt(this.userAnswer, 10);
    const correct = this.currentQuestion.result;

    if (entered === correct) {
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
    const { op, a, b, result } = this.currentQuestion;

    let html = '<div class="breakdown-card"><h4>🧩 Step-by-Step Breakdown</h4>';

    if (op === '+') {
      if (a >= 10 && b >= 10) {
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
    } else if (op === '-') {
      if (a >= 10 && b >= 10 && (a % 10) >= (b % 10)) {
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
      html += `
        <div class="bd-step">Think of ${a} bags, with ${b} items in each bag.</div>
        <div class="bd-step">Repeated addition: ${Array(a).fill(b).join(' + ')} = <span class="highlight-total">${result}</span></div>
      `;
    } else if (op === '÷') {
      html += `
        <div class="bd-step">Share ${a} cookies equally with ${b} friends.</div>
        <div class="bd-step">Everyone gets <span class="highlight-total">${result}</span> cookies each!</div>
        <div class="bd-step">Check with multiplication: ${b} &times; ${result} = <span class="highlight-total">${a}</span></div>
      `;
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

    const { op, a, b, result } = this.currentQuestion;
    const text = generateVerbalExplanation(op, a, b, result);

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

    // Badge calculation
    let badge = '🌱 Math Rookie';
    if (this.xp >= 1000) badge = '👑 Math Master Wizard';
    else if (this.xp >= 600) badge = '⚡ Calculation Champion';
    else if (this.xp >= 300) badge = '🛡️ Number Knight';
    else if (this.xp >= 100) badge = '🔥 Fact Finder';

    if (this.dom.levelBadge) {
      this.dom.levelBadge.textContent = badge;
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

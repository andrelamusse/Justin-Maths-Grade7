// app.js - Justin's Cambridge Grade 7 Mathematics Academy Main Controller
// Tailored for Justin Lamusse at Kainos Cambridge School, Vanderbijlpark.

import { CAMBRIDGE_STAGE_7_UNITS } from './data/cambridge-units-data.js';
import { MathRenderer } from './js/math-renderer.js';
import { globalSpeech } from './js/speech-coach.js';
import { ManipulativesLab } from './js/manipulatives.js';
import { KAINOS_PAPERS_CATALOG, KainosExamSimulator } from './js/kainos-exams.js';

export class JustinMathsApp {
  constructor() {
    this.units = CAMBRIDGE_STAGE_7_UNITS;
    this.currentUnitId = 'unit1-integers';
    this.currentTier = 'medium'; // 'easy' | 'medium' | 'hard' | 'all'
    this.currentQuestionIdx = 0;
    this.quizAnswers = [];
    this.activeTab = 'units';
    this.strandFilter = 'all';

    // Student Progress & Gamification
    this.state = {
      xp: 0,
      streak: 0,
      bestStreak: 0,
      masteredUnits: {},
      theme: 'light',
      font: 'lexend',
      audioMuted: false
    };

    this.manipulatives = new ManipulativesLab();
    this.examSim = new KainosExamSimulator();
    this.scratchpadDrawing = false;

    this.loadState();
  }

  loadState() {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('justin_cambridge7_state_v1');
        if (saved) {
          this.state = Object.assign(this.state, JSON.parse(saved));
        }
      }
    } catch (e) {
      console.warn('Could not load saved state', e);
    }
  }

  saveState() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('justin_cambridge7_state_v1', JSON.stringify(this.state));
      }
    } catch (e) {
      console.warn('Could not save state', e);
    }
  }

  init() {
    this.applyPreferences();
    this.bindHeaderControls();
    this.bindNavTabs();
    this.renderUnitsGrid();
    this.renderKainosPapersCatalog();
    this.manipulatives.init('manipulatives-content');
    this.updateStatsDisplay();

    // Check URL hash for routing
    const hash = window.location.hash.replace('#', '');
    if (hash && ['units', 'practice', 'manipulatives', 'exams', 'grinder'].includes(hash)) {
      this.switchTab(hash);
    } else {
      this.switchTab('units');
    }
  }

  applyPreferences() {
    document.body.className = `font-${this.state.font} theme-${this.state.theme}`;
  }

  updateStatsDisplay() {
    const xpEl = document.getElementById('stat-xp');
    const streakEl = document.getElementById('stat-streak');
    const masteryEl = document.getElementById('stat-mastery');

    if (xpEl) xpEl.textContent = `${this.state.xp} XP`;
    if (streakEl) streakEl.textContent = `${this.state.streak} 🔥`;
    if (masteryEl) {
      const count = Object.keys(this.state.masteredUnits).length;
      masteryEl.textContent = `${count}/16 ⭐`;
    }
  }

  awardXP(points = 10) {
    this.state.xp += points;
    this.state.streak += 1;
    if (this.state.streak > this.state.bestStreak) {
      this.state.bestStreak = this.state.streak;
    }
    this.updateStatsDisplay();
    this.saveState();
    this.playTone(587.33, 'sine', 0.15); // High D5 chime
    setTimeout(() => this.playTone(880, 'sine', 0.25), 120); // A5 chime
  }

  recordMistake() {
    this.state.streak = 0;
    this.updateStatsDisplay();
    this.saveState();
    this.playTone(220, 'triangle', 0.3); // Low A3 buzz
  }

  playTone(freq, type = 'sine', duration = 0.2) {
    if (this.state.audioMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy
    }
  }

  bindHeaderControls() {
    const themeBtn = document.getElementById('btn-toggle-theme');
    const fontBtn = document.getElementById('btn-toggle-font');
    const soundBtn = document.getElementById('btn-toggle-sound');

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        this.applyPreferences();
        this.saveState();
      });
    }

    if (fontBtn) {
      fontBtn.addEventListener('click', () => {
        this.state.font = this.state.font === 'lexend' ? 'dyslexic' : 'lexend';
        this.applyPreferences();
        this.saveState();
      });
    }

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.state.audioMuted = !this.state.audioMuted;
        soundBtn.textContent = this.state.audioMuted ? '🔇' : '🔊';
        this.saveState();
      });
    }
  }

  bindNavTabs() {
    const tabs = document.querySelectorAll('.nav-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.currentTarget.dataset.tab;
        this.switchTab(tabName);
      });
    });
  }

  switchTab(tabName) {
    this.activeTab = tabName;
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    const activePane = document.getElementById(`pane-${tabName}`);
    if (activePane) activePane.classList.add('active');

    // Scroll to top of view
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tabName === 'manipulatives') {
      this.manipulatives.renderCurrentTool();
    }
  }

  // ==============================================================
  // VIEW: UNITS OVERVIEW (1 to 16)
  // ==============================================================
  renderUnitsGrid() {
    const grid = document.getElementById('units-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filterChips = document.querySelectorAll('.strand-chip');
    filterChips.forEach(chip => {
      chip.onclick = (e) => {
        filterChips.forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.strandFilter = e.currentTarget.dataset.strand;
        this.renderUnitsGrid();
      };
    });

    const filtered = this.strandFilter === 'all'
      ? this.units
      : this.units.filter(u => u.strand.toLowerCase().includes(this.strandFilter.toLowerCase()));

    filtered.forEach(unit => {
      const card = document.createElement('article');
      card.className = 'unit-card';
      const isMastered = !!this.state.masteredUnits[unit.id];

      card.innerHTML = `
        <div class="unit-card-top">
          <div class="unit-badge-row">
            <span class="unit-num-badge">Unit ${unit.unit}</span>
            <span class="unit-strand-tag">${unit.strand}</span>
          </div>
          <h3>${unit.title}</h3>
          <div class="unit-cambridge-ref">📋 ${unit.cambridgeRef}</div>
          <p class="unit-card-summary">${unit.whyItMatters}</p>
        </div>

        <div class="unit-card-actions">
          <button class="btn-unit-action btn-learn" data-unit="${unit.id}">
            📖 Lesson
          </button>
          <button class="btn-unit-action btn-quiz" data-unit="${unit.id}">
            ✍️ Practice ${isMastered ? '⭐' : ''}
          </button>
        </div>
      `;

      card.querySelector('.btn-learn').onclick = () => {
        this.openUnitDetail(unit.id);
      };

      card.querySelector('.btn-quiz').onclick = () => {
        this.openPracticeArena(unit.id);
      };

      grid.appendChild(card);
    });
  }

  // ==============================================================
  // VIEW: UNIT LESSON & STRATEGY DETAIL
  // ==============================================================
  openUnitDetail(unitId) {
    this.currentUnitId = unitId;
    const unit = this.units.find(u => u.id === unitId);
    if (!unit) return;

    const container = document.getElementById('unit-detail-workspace');
    if (!container) return;

    const rulesHtml = unit.lesson.rules.map(r => `<li>${MathRenderer.render(r)}</li>`).join('');
    const examplesHtml = unit.lesson.examples.map((ex, i) => `
      <div class="worked-example-card">
        <h5>Worked Example ${i + 1}</h5>
        <div class="ex-q">${MathRenderer.render(ex.q)}</div>
        <div class="ex-sol"><strong>Solution:</strong> ${MathRenderer.render(ex.solution)}</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="unit-detail-container">
        <div class="unit-detail-header">
          <div class="unit-header-title-box">
            <h2>Unit ${unit.unit}: ${unit.title}</h2>
            <div class="meta-sub">Cambridge Framework: ${unit.cambridgeRef} &bull; Strand: ${unit.strand}</div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="voice-coach-btn" id="unit-speak-btn">
              🗣️ Listen to Lesson
            </button>
            <button class="primary-action-btn" id="start-unit-quiz-btn">
              ✍️ Practice Quiz &rarr;
            </button>
          </div>
        </div>

        <!-- CVA Neuro-Visual Stepper -->
        <div class="cva-stepper">
          <div class="cva-card">
            <span class="cva-badge concrete">1. Concrete Real-World</span>
            <p>${unit.lesson.concrete}</p>
          </div>
          <div class="cva-card">
            <span class="cva-badge visual">2. Visual Mental Model</span>
            <p>${unit.lesson.visual}</p>
          </div>
          <div class="cva-card">
            <span class="cva-badge abstract">3. Abstract Rule</span>
            <p>${unit.lesson.abstract.replace(/\n/g, '<br>')}</p>
          </div>
        </div>

        <!-- Key Rules -->
        <div class="lesson-rules-box">
          <h4>📌 Cambridge Stage 7 Rules &amp; Strategies:</h4>
          <ul>${rulesHtml}</ul>
        </div>

        <!-- Worked Examples -->
        <h4 style="margin: 20px 0 12px; font-weight:800;">📝 Step-by-Step Worked Examples:</h4>
        <div class="worked-examples-grid">
          ${examplesHtml}
        </div>

        <!-- Justin's Watch-Out Trap -->
        <div class="justin-trap-callout">
          <span class="trap-icon">🛡️</span>
          <div>
            <strong>Justin's Watch-Out Coaching Trap:</strong>
            <p style="margin-top:4px;">${unit.lesson.justinTrap}</p>
          </div>
        </div>
      </div>
    `;

    const speakBtn = container.querySelector('#unit-speak-btn');
    globalSpeech.onStateChange = (isPlaying) => {
      if (speakBtn) {
        speakBtn.classList.toggle('speaking', isPlaying);
        speakBtn.textContent = isPlaying ? '⏹️ Stop Speaking' : '🗣️ Listen to Lesson';
      }
    };

    speakBtn.onclick = () => {
      globalSpeech.toggle(`${unit.title}. ${unit.lesson.keyIdea}. ${unit.lesson.spokenExplanation}`);
    };

    container.querySelector('#start-unit-quiz-btn').onclick = () => {
      this.openPracticeArena(unit.id);
    };

    this.switchTab('detail');
  }

  // ==============================================================
  // VIEW: PRACTICE QUIZ ARENA
  // ==============================================================
  openPracticeArena(unitId, tier = 'medium') {
    this.currentUnitId = unitId;
    this.currentTier = tier;
    this.currentQuestionIdx = 0;
    this.quizAnswers = [];
    this.switchTab('practice');
    this.renderQuizQuestion();
  }

  getAvailableQuestions() {
    const unit = this.units.find(u => u.id === this.currentUnitId) || this.units[0];
    if (this.currentTier === 'all') {
      return [...unit.questions.easy, ...unit.questions.medium, ...unit.questions.hard];
    }
    return unit.questions[this.currentTier] || unit.questions.medium;
  }

  renderQuizQuestion() {
    const container = document.getElementById('practice-workspace');
    if (!container) return;

    const unit = this.units.find(u => u.id === this.currentUnitId) || this.units[0];
    const questions = this.getAvailableQuestions();

    if (this.currentQuestionIdx >= questions.length) {
      this.renderQuizResults(unit, questions);
      return;
    }

    const q = questions[this.currentQuestionIdx];

    const optionsHtml = q.options.map(opt => `
      <button class="option-btn" data-opt="${encodeURIComponent(opt)}">
        ${MathRenderer.render(opt)}
      </button>
    `).join('');

    container.innerHTML = `
      <div class="quiz-arena-header">
        <div>
          <h2 style="font-size:1.3rem; font-weight:800;">Unit ${unit.unit}: ${unit.title}</h2>
          <span style="font-size:0.85rem; color:var(--text-muted);">${unit.strand} &bull; Practice Arena</span>
        </div>

        <div class="tier-selector-group">
          <button class="tier-pill ${this.currentTier === 'easy' ? 'active' : ''}" data-tier="easy">🟢 Easy</button>
          <button class="tier-pill ${this.currentTier === 'medium' ? 'active' : ''}" data-tier="medium">🟡 Medium</button>
          <button class="tier-pill ${this.currentTier === 'hard' ? 'active' : ''}" data-tier="hard">🔴 Hard</button>
          <button class="tier-pill ${this.currentTier === 'all' ? 'active' : ''}" data-tier="all">⚡ All Tiers</button>
        </div>
      </div>

      <div class="quiz-card">
        <div class="quiz-card-header">
          <span class="quiz-progress-text">Question ${this.currentQuestionIdx + 1} of ${questions.length}</span>
          <span class="quiz-difficulty-badge ${this.currentTier}">${this.currentTier.toUpperCase()}</span>
        </div>

        <div class="quiz-q-prompt">
          ${MathRenderer.render(q.q)}
        </div>

        <div class="options-grid">
          ${optionsHtml}
        </div>

        <div id="quiz-feedback-anchor"></div>

        <div class="quiz-actions-row">
          <button class="scratchpad-toggle-btn" id="btn-toggle-scratchpad">
            ✏️ Scratchpad / Working
          </button>
          <button class="action-pill reset" id="quiz-hint-btn">
            💡 Show Hint
          </button>
        </div>

        <!-- Scratchpad Canvas -->
        <div class="scratchpad-wrapper" id="scratchpad-box" style="display:none;">
          <div class="scratchpad-bar">
            <span>Doodle or calculate on your screen</span>
            <button class="btn-clear-pad" id="btn-clear-canvas">Clear</button>
          </div>
          <canvas class="scratchpad-canvas" id="scratchpad-canvas"></canvas>
        </div>
      </div>
    `;

    // Tier buttons
    container.querySelectorAll('.tier-pill').forEach(pill => {
      pill.onclick = (e) => {
        const selectedTier = e.currentTarget.dataset.tier;
        this.openPracticeArena(this.currentUnitId, selectedTier);
      };
    });

    // Scratchpad toggle
    const padBtn = container.querySelector('#btn-toggle-scratchpad');
    const padBox = container.querySelector('#scratchpad-box');
    padBtn.onclick = () => {
      const isHidden = padBox.style.display === 'none';
      padBox.style.display = isHidden ? 'flex' : 'none';
      if (isHidden) this.setupScratchpad();
    };

    // Hint button
    container.querySelector('#quiz-hint-btn').onclick = () => {
      alert(`💡 Justin's Hint: ${q.hint}`);
    };

    // Option selection
    let answered = false;
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.onclick = (e) => {
        if (answered) return;
        answered = true;

        const chosen = decodeURIComponent(e.currentTarget.dataset.opt);
        const isCorrect = chosen === q.answer;

        if (isCorrect) {
          e.currentTarget.classList.add('selected-correct');
          this.awardXP(10);
        } else {
          e.currentTarget.classList.add('selected-wrong');
          this.recordMistake();

          // Highlight the actual correct answer
          container.querySelectorAll('.option-btn').forEach(b => {
            if (decodeURIComponent(b.dataset.opt) === q.answer) {
              b.classList.add('selected-correct');
            }
          });
        }

        this.quizAnswers.push({ q, chosen, isCorrect });
        this.showQuizFeedback(q, isCorrect);
      };
    });
  }

  showQuizFeedback(q, isCorrect) {
    const anchor = document.getElementById('quiz-feedback-anchor');
    if (!anchor) return;

    const stepsHtml = q.stepByStep.map(s => `<li>${MathRenderer.render(s)}</li>`).join('');

    anchor.innerHTML = `
      <div class="quiz-feedback-box ${isCorrect ? 'correct' : 'incorrect'}">
        <div class="feedback-title">${isCorrect ? '🎉 Excellent, Justin! (+10 XP)' : '⚠️ Not quite — let\'s inspect the steps!'}</div>
        <p style="font-size:0.95rem; margin-bottom: 8px;">${MathRenderer.render(q.explanation)}</p>
        <div style="font-size:0.88rem; color:var(--text-secondary);">
          <strong>Step-by-step breakdown:</strong>
          <ul style="padding-left:18px; margin-top:4px;">${stepsHtml}</ul>
        </div>
        <button class="primary-action-btn" id="btn-next-quiz-q" style="margin-top:14px;">
          Next Question &rarr;
        </button>
      </div>
    `;

    document.getElementById('btn-next-quiz-q').onclick = () => {
      this.currentQuestionIdx++;
      this.renderQuizQuestion();
    };
  }

  renderQuizResults(unit, questions) {
    const container = document.getElementById('practice-workspace');
    if (!container) return;

    const correctCount = this.quizAnswers.filter(a => a.isCorrect).length;
    const total = questions.length;
    const pct = Math.round((correctCount / total) * 100);

    if (pct >= 80) {
      this.state.masteredUnits[unit.id] = true;
      this.updateStatsDisplay();
      this.saveState();
    }

    container.innerHTML = `
      <div class="quiz-card report-card">
        <div class="report-score-ring">
          <div class="report-pct-text">${pct}%</div>
          <div class="report-grade-badge">${correctCount}/${total} Correct</div>
        </div>

        <h2 style="font-size:1.5rem; font-weight:800; margin-bottom:8px;">
          ${pct >= 80 ? '🌟 Unit Mastered!' : '💪 Great Practice, Justin!'}
        </h2>
        <p style="color:var(--text-secondary); max-width:500px; margin:0 auto 20px;">
          ${pct >= 80
            ? `You have achieved mastery in Unit ${unit.unit}: ${unit.title}! A golden star has been added to your profile.`
            : `Keep going! Review the steps below and try again to lock in your mastery star.`}
        </p>

        <div style="display:flex; justify-content:center; gap:12px;">
          <button class="primary-action-btn" id="retry-quiz-btn">
            ↺ Retry Quiz
          </button>
          <button class="action-pill util" id="back-to-units-btn" style="padding:12px 20px;">
            📘 All Units
          </button>
        </div>
      </div>
    `;

    container.querySelector('#retry-quiz-btn').onclick = () => {
      this.openPracticeArena(unit.id, this.currentTier);
    };

    container.querySelector('#back-to-units-btn').onclick = () => {
      this.switchTab('units');
    };
  }

  setupScratchpad() {
    const canvas = document.getElementById('scratchpad-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth - 26;
    canvas.height = 200;

    ctx.strokeStyle = '#1E40AF';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const startDraw = (e) => {
      this.scratchpadDrawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
      if (!this.scratchpadDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const stopDraw = () => {
      this.scratchpadDrawing = false;
    };

    canvas.onmousedown = startDraw;
    canvas.onmousemove = draw;
    window.onmouseup = stopDraw;

    canvas.ontouchstart = startDraw;
    canvas.ontouchmove = draw;
    window.ontouchend = stopDraw;

    const clearBtn = document.getElementById('btn-clear-canvas');
    if (clearBtn) {
      clearBtn.onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // ==============================================================
  // VIEW: KAINOS CAMBRIDGE ASSESSMENT PAPERS & SIMULATOR
  // ==============================================================
  renderKainosPapersCatalog() {
    const grid = document.getElementById('papers-catalog-grid');
    if (!grid) return;
    grid.innerHTML = '';

    KAINOS_PAPERS_CATALOG.forEach(paper => {
      const card = document.createElement('article');
      card.className = 'paper-catalog-card';

      card.innerHTML = `
        <div>
          <div class="paper-card-badge-row">
            <span class="paper-code-badge">${paper.code}</span>
            <span class="paper-mode-badge ${paper.calculatorAllowed ? 'calc' : 'nocalc'}">${paper.mode}</span>
          </div>
          <h3>${paper.title}</h3>
          <div class="paper-meta-details">
            <span>⏱️ ${paper.durationMinutes} Minutes</span>
            <span>🎯 ${paper.totalMarks} Marks</span>
          </div>
          <p class="paper-description-text">${paper.description}</p>
        </div>

        <div class="paper-card-actions">
          <button class="btn-start-sim" data-paper="${paper.id}">
            ⚡ Start Interactive Test Simulator
          </button>
          <div class="paper-doc-links-row">
            <a href="${paper.htmlUrl}" target="_blank" class="btn-doc-link" title="Open formatted printable exam in new tab">
              📄 View Exam
            </a>
            <a href="${paper.memoHtmlUrl}" target="_blank" class="btn-doc-link" title="Open step-by-step marking memo with tutor coaching tips">
              📋 Mark Scheme
            </a>
            <a href="${paper.pdfUrl}" download class="btn-doc-link" title="Download printable PDF">
              📥 PDF
            </a>
          </div>
        </div>
      `;

      card.querySelector('.btn-start-sim').onclick = () => {
        this.startKainosExamSimulator(paper.id);
      };

      grid.appendChild(card);
    });
  }

  startKainosExamSimulator(paperId) {
    this.examSim.setPaper(paperId);
    this.switchTab('exams');

    const container = document.getElementById('exam-sim-workspace');
    if (!container) return;

    this.renderExamSimStep();
  }

  renderExamSimStep() {
    const container = document.getElementById('exam-sim-workspace');
    if (!container) return;

    if (this.examSim.isFinished) {
      this.renderExamSimResults();
      return;
    }

    const q = this.examSim.getCurrentQuestion();
    const paper = this.examSim.paper;
    const progress = `${this.examSim.currentIndex + 1} of ${this.examSim.questions.length}`;

    const optionsHtml = q.options.map(opt => `
      <button class="option-btn" data-opt="${encodeURIComponent(opt)}">
        ${MathRenderer.render(opt)}
      </button>
    `).join('');

    container.innerHTML = `
      <div class="exam-sim-container">
        <div class="exam-sim-header">
          <div class="exam-sim-title">
            <h3>${paper.title}</h3>
            <span style="font-size:0.85rem; color:var(--text-muted);">Question ${progress} &bull; [${q.marks} Mark${q.marks > 1 ? 's' : ''}]</span>
          </div>
          <div class="exam-timer-chip" id="sim-timer-box">
            ⏱️ ${paper.durationMinutes}:00
          </div>
        </div>

        <div class="quiz-q-prompt">
          <strong>Question ${q.num}${q.part ? ' ' + q.part : ''}:</strong> ${MathRenderer.render(q.q)}
        </div>

        <div class="options-grid">
          ${optionsHtml}
        </div>
      </div>
    `;

    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.onclick = (e) => {
        const chosen = decodeURIComponent(e.currentTarget.dataset.opt);
        this.examSim.recordAnswer(chosen);
        this.renderExamSimStep();
      };
    });
  }

  renderExamSimResults() {
    const container = document.getElementById('exam-sim-workspace');
    if (!container) return;

    const res = this.examSim.getResults();

    const reviewItems = res.breakdown.map((item, idx) => `
      <div class="review-item ${item.isCorrect ? 'pass' : 'fail'}">
        <div><strong>Q${item.qNum}:</strong> ${MathRenderer.render(item.prompt)}</div>
        <div style="margin:4px 0;">
          Justin's Answer: <em>${MathRenderer.render(item.chosen)}</em> | Correct: <strong>${MathRenderer.render(item.correct)}</strong>
          <span style="float:right; font-weight:800;">${item.marksAwarded}/${item.maxMarks} Marks</span>
        </div>
        <small style="color:var(--text-secondary); display:block; margin-top:4px;">
          📋 <strong>Memo:</strong> ${MathRenderer.render(item.memo)}<br>
          🛡️ <strong>Tutor Tip:</strong> ${item.tutorTip}
        </small>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="exam-sim-container report-card">
        <div class="report-score-ring">
          <div class="report-pct-text">${res.percentage}%</div>
          <div class="report-grade-badge">${res.grade}</div>
        </div>

        <h2>${res.paperTitle} Complete!</h2>
        <p style="color:var(--text-secondary); margin-bottom:20px;">
          Score: ${res.marksScored} out of ${res.totalPossibleMarks} Marks (${res.percentage}%)
        </p>

        <h3 style="text-align:left; margin-bottom:12px;">Detailed Question-by-Question Marking Memo:</h3>
        <div class="review-list">
          ${reviewItems}
        </div>

        <button class="primary-action-btn" id="btn-return-exam-catalog" style="margin-top:16px;">
          &larr; Return to Past Papers Hub
        </button>
      </div>
    `;

    container.querySelector('#btn-return-exam-catalog').onclick = () => {
      container.innerHTML = '';
      this.switchTab('exams');
    };
  }
}

// Global initialization
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.app = new JustinMathsApp();
    window.app.init();
  });
}

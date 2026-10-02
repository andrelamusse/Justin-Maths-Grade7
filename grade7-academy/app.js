// app.js - Grade 7 English Mathematics Academy Main Engine
import { GRADE_7_STRANDS } from './curriculum-data.js';
import { Grade7Tools } from './interactive-tools.js';
import { speechReader } from './speech.js';

export class Grade7AcademyApp {
  constructor() {
    this.strands = GRADE_7_STRANDS;
    this.currentStrandId = this.strands[0].id;
    this.currentTopicId = this.strands[0].topics[0].id;
    this.activeTab = 'lesson'; // 'lesson' | 'practice' | 'tools' | 'exam'
    this.practiceIndex = 0;
    this.practiceScore = 0;
    this.examQuestions = [];
    this.examIndex = 0;
    this.examAnswers = [];
    this.progress = {
      completedTopics: {},
      examScores: []
    };
    this.settings = {
      font: 'lexend',
      theme: 'light'
    };

    this.tools = new Grade7Tools();
    this.loadProgress();
  }

  loadProgress() {
    try {
      if (typeof localStorage === 'undefined') return;
      const saved = localStorage.getItem('justin_grade7_progress_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.progress = parsed.progress || this.progress;
        this.settings = parsed.settings || this.settings;
      }
    } catch (e) {
      console.warn('Could not load saved progress', e);
    }
  }

  saveProgress() {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem('justin_grade7_progress_v1', JSON.stringify({
        progress: this.progress,
        settings: this.settings
      }));
    } catch (e) {
      console.warn('Could not save progress', e);
    }
  }

  init() {
    this.cacheDom();
    this.bindEvents();
    this.applySettings();
    this.renderStrandNav();
    this.renderCurrentView();
    this.tools.init();
    this.updateProgressBadges();
  }

  cacheDom() {
    this.dom = {
      strandNav: document.getElementById('strand-nav-list'),
      topicNav: document.getElementById('topic-nav-list'),
      contentArea: document.getElementById('main-curriculum-content'),
      viewTabs: document.querySelectorAll('.nav-view-tab'),
      themeBtn: document.getElementById('theme-toggle-btn'),
      fontBtn: document.getElementById('font-toggle-btn'),
      totalStarsEl: document.getElementById('total-mastery-stars'),
      readAloudHeaderBtn: document.getElementById('read-aloud-global-btn')
    };
  }

  bindEvents() {
    this.dom.viewTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        this.switchView(view);
      });
    });

    if (this.dom.themeBtn) {
      this.dom.themeBtn.addEventListener('click', () => {
        this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
        this.applySettings();
        this.saveProgress();
      });
    }

    if (this.dom.fontBtn) {
      this.dom.fontBtn.addEventListener('click', () => {
        this.settings.font = this.settings.font === 'lexend' ? 'dyslexic' : 'lexend';
        this.applySettings();
        this.saveProgress();
      });
    }

    if (this.dom.readAloudHeaderBtn) {
      this.dom.readAloudHeaderBtn.addEventListener('click', () => {
        this.readCurrentLessonAloud();
      });
    }
  }

  getCurrentTopic() {
    const strand = this.strands.find(s => s.id === this.currentStrandId) || this.strands[0];
    const topic = strand.topics.find(t => t.id === this.currentTopicId) || strand.topics[0];
    return { strand, topic };
  }

  renderStrandNav() {
    if (!this.dom.strandNav) return;
    this.dom.strandNav.innerHTML = '';

    this.strands.forEach(strand => {
      const btn = document.createElement('button');
      btn.className = `strand-btn ${strand.id === this.currentStrandId ? 'active' : ''}`;
      btn.innerHTML = `<span class="strand-icon">${strand.icon}</span> <span class="strand-name">${strand.name}</span>`;
      btn.onclick = () => {
        this.currentStrandId = strand.id;
        this.currentTopicId = strand.topics[0].id;
        this.practiceIndex = 0;
        this.practiceScore = 0;
        this.renderStrandNav();
        this.renderTopicNav();
        this.renderCurrentView();
      };
      this.dom.strandNav.appendChild(btn);
    });

    this.renderTopicNav();
  }

  renderTopicNav() {
    if (!this.dom.topicNav) return;
    this.dom.topicNav.innerHTML = '';

    const strand = this.strands.find(s => s.id === this.currentStrandId);
    if (!strand) return;

    strand.topics.forEach(topic => {
      const btn = document.createElement('button');
      const isCompleted = this.progress.completedTopics[topic.id];
      btn.className = `topic-pill-btn ${topic.id === this.currentTopicId ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
      btn.innerHTML = `<span>${topic.title}</span> ${isCompleted ? '<span class="star-check">★</span>' : ''}`;
      btn.onclick = () => {
        this.currentTopicId = topic.id;
        this.practiceIndex = 0;
        this.practiceScore = 0;
        this.renderTopicNav();
        this.renderCurrentView();
      };
      this.dom.topicNav.appendChild(btn);
    });
  }

  switchView(viewName) {
    speechReader.stop();
    this.activeTab = viewName;
    this.dom.viewTabs.forEach(t => t.classList.toggle('active', t.dataset.view === viewName));

    // Hide or show workspace containers
    const lessonWrap = document.getElementById('lesson-workspace');
    const practiceWrap = document.getElementById('practice-workspace');
    const toolsWrap = document.getElementById('tools-workspace');
    const examWrap = document.getElementById('exam-workspace');

    if (lessonWrap) lessonWrap.classList.toggle('hidden', viewName !== 'lesson');
    if (practiceWrap) practiceWrap.classList.toggle('hidden', viewName !== 'practice');
    if (toolsWrap) toolsWrap.classList.toggle('hidden', viewName !== 'tools');
    if (examWrap) examWrap.classList.toggle('hidden', viewName !== 'exam');

    if (viewName === 'lesson') {
      this.renderLessonView();
    } else if (viewName === 'practice') {
      this.renderPracticeView();
    } else if (viewName === 'tools') {
      this.tools.renderCurrentTool();
    } else if (viewName === 'exam') {
      this.startExamMode();
    }
  }

  renderCurrentView() {
    this.switchView(this.activeTab);
  }

  // --- LESSON VIEW ---
  renderLessonView() {
    const wrap = document.getElementById('lesson-workspace');
    if (!wrap) return;

    const { strand, topic } = this.getCurrentTopic();

    let rulesHtml = topic.lesson.rules.map(r => `<li>${r}</li>`).join('');
    let examplesHtml = topic.lesson.examples.map(ex => `
      <div class="worked-example-card">
        <div class="ex-question"><strong>Example:</strong> ${ex.question}</div>
        <div class="ex-solution"><strong>Step-by-step solution:</strong> ${ex.solution}</div>
      </div>
    `).join('');

    wrap.innerHTML = `
      <div class="lesson-card">
        <div class="lesson-header-row">
          <div>
            <span class="topic-category-tag">${strand.name}</span>
            <h2 class="lesson-title">${topic.title}</h2>
          </div>
          <button class="speak-lesson-btn" id="speak-this-lesson-btn" title="Listen to lesson aloud">
            📢 Read Aloud
          </button>
        </div>

        <div class="key-idea-box">
          <h4>💡 Core Concept:</h4>
          <p>${topic.lesson.keyIdea}</p>
        </div>

        <div class="rules-section">
          <h3>📌 Essential Rules & Strategies</h3>
          <ul class="lesson-rules-list">
            ${rulesHtml}
          </ul>
        </div>

        <div class="examples-section">
          <h3>✍️ Worked Examples (Justin's Visual Walkthrough)</h3>
          ${examplesHtml}
        </div>

        <div class="lesson-footer-action">
          <button class="primary-action-btn" id="start-practice-from-lesson-btn">
            Test Your Knowledge in Practice Mode &rarr;
          </button>
        </div>
      </div>
    `;

    wrap.querySelector('#speak-this-lesson-btn').onclick = () => {
      this.readCurrentLessonAloud();
    };

    wrap.querySelector('#start-practice-from-lesson-btn').onclick = () => {
      this.switchView('practice');
    };
  }

  readCurrentLessonAloud() {
    const btn = document.getElementById('speak-this-lesson-btn');
    if (speechReader.currentlySpeaking) {
      speechReader.stop();
      if (btn) btn.textContent = '📢 Read Aloud';
      return;
    }

    const { topic } = this.getCurrentTopic();
    const text = `${topic.title}. ${topic.lesson.keyIdea}. Here are the rules: ${topic.lesson.rules.join('. ')}.`;
    if (btn) btn.textContent = '⏹️ Stop';

    speechReader.speak(text, () => {
      if (btn) btn.textContent = '⏹️ Stop';
    }, () => {
      if (btn) btn.textContent = '📢 Read Aloud';
    });
  }

  // --- PRACTICE QUIZ VIEW ---
  renderPracticeView() {
    const wrap = document.getElementById('practice-workspace');
    if (!wrap) return;

    const { topic } = this.getCurrentTopic();
    const questions = topic.questions;

    if (this.practiceIndex >= questions.length) {
      // Completed practice for this topic!
      this.progress.completedTopics[topic.id] = true;
      this.saveProgress();
      this.updateProgressBadges();

      wrap.innerHTML = `
        <div class="practice-complete-card">
          <div class="star-burst-icon">🌟</div>
          <h2>Fantastic Work, Justin!</h2>
          <p>You have mastered <strong>${topic.title}</strong>!</p>
          <div class="score-pill">Your Score: ${this.practiceScore} / ${questions.length}</div>
          <div class="complete-actions">
            <button class="pill-btn add-btn" id="restart-practice-btn">↺ Practice Again</button>
            <button class="pill-btn reset-btn" id="next-topic-btn">Next Topic &rarr;</button>
          </div>
        </div>
      `;

      wrap.querySelector('#restart-practice-btn').onclick = () => {
        this.practiceIndex = 0;
        this.practiceScore = 0;
        this.renderPracticeView();
      };

      wrap.querySelector('#next-topic-btn').onclick = () => {
        this.goToNextTopic();
      };
      return;
    }

    const currentQ = questions[this.practiceIndex];

    const optionsHtml = currentQ.options.map((opt, i) => `
      <button class="practice-option-btn" data-opt="${opt}">
        <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
        <span class="opt-text">${opt}</span>
      </button>
    `).join('');

    wrap.innerHTML = `
      <div class="practice-quiz-card">
        <div class="quiz-top-bar">
          <span class="quiz-progress-text">Question ${this.practiceIndex + 1} of ${questions.length}</span>
          <button class="speak-btn-mini" id="speak-question-btn" title="Read question aloud">📢 Read</button>
        </div>

        <h3 class="quiz-question-title">${currentQ.q}</h3>

        <div class="practice-options-grid">
          ${optionsHtml}
        </div>

        <div id="quiz-feedback-box" class="quiz-feedback-box hidden"></div>
      </div>
    `;

    wrap.querySelector('#speak-question-btn').onclick = () => {
      speechReader.speak(currentQ.q);
    };

    const optButtons = wrap.querySelectorAll('.practice-option-btn');
    optButtons.forEach(btn => {
      btn.onclick = (e) => {
        const selected = e.currentTarget.dataset.opt;
        this.handlePracticeAnswer(selected, currentQ, optButtons);
      };
    });
  }

  handlePracticeAnswer(selected, qObj, buttons) {
    buttons.forEach(b => b.disabled = true);
    const feedbackBox = document.getElementById('quiz-feedback-box');
    if (!feedbackBox) return;
    feedbackBox.classList.remove('hidden');

    const isCorrect = selected === qObj.answer;
    if (isCorrect) {
      this.practiceScore++;
      feedbackBox.className = 'quiz-feedback-box correct';
      feedbackBox.innerHTML = `
        <div class="fb-title">✅ Excellent! That's correct!</div>
        <p class="fb-explanation">${qObj.explanation}</p>
        <button class="next-q-btn" id="next-practice-q-btn">Continue &rarr;</button>
      `;
    } else {
      feedbackBox.className = 'quiz-feedback-box incorrect';
      feedbackBox.innerHTML = `
        <div class="fb-title">💡 Let's review this step!</div>
        <p class="fb-explanation">The correct answer is <strong>${qObj.answer}</strong>.</p>
        <p class="fb-sub">${qObj.explanation}</p>
        <button class="next-q-btn" id="next-practice-q-btn">Got it, Next &rarr;</button>
      `;
    }

    buttons.forEach(b => {
      if (b.dataset.opt === qObj.answer) b.classList.add('correct-choice');
      else if (b.dataset.opt === selected && !isCorrect) b.classList.add('incorrect-choice');
    });

    document.getElementById('next-practice-q-btn').onclick = () => {
      this.practiceIndex++;
      this.renderPracticeView();
    };
  }

  goToNextTopic() {
    const strand = this.strands.find(s => s.id === this.currentStrandId);
    if (!strand) return;
    const curIdx = strand.topics.findIndex(t => t.id === this.currentTopicId);

    if (curIdx < strand.topics.length - 1) {
      this.currentTopicId = strand.topics[curIdx + 1].id;
    } else {
      const strandIdx = this.strands.findIndex(s => s.id === this.currentStrandId);
      if (strandIdx < this.strands.length - 1) {
        this.currentStrandId = this.strands[strandIdx + 1].id;
        this.currentTopicId = this.strands[strandIdx + 1].topics[0].id;
      }
    }
    this.practiceIndex = 0;
    this.practiceScore = 0;
    this.renderStrandNav();
    this.renderCurrentView();
  }

  // --- GRADE 7 MOCK EXAM MODE ---
  startExamMode() {
    const wrap = document.getElementById('exam-workspace');
    if (!wrap) return;

    // Build 10 randomized exam questions across all strands
    const allQuestions = [];
    this.strands.forEach(s => {
      s.topics.forEach(t => {
        t.questions.forEach(q => {
          allQuestions.push({
            ...q,
            strandName: s.name,
            topicTitle: t.title
          });
        });
      });
    });

    // Shuffle and pick 10
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    this.examQuestions = shuffled.slice(0, 10);
    this.examIndex = 0;
    this.examAnswers = [];

    this.renderExamQuestion();
  }

  renderExamQuestion() {
    const wrap = document.getElementById('exam-workspace');
    if (!wrap) return;

    if (this.examIndex >= this.examQuestions.length) {
      this.renderExamResults();
      return;
    }

    const q = this.examQuestions[this.examIndex];
    const optionsHtml = q.options.map((opt, i) => `
      <button class="exam-option-btn" data-opt="${opt}">
        <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
        <span class="opt-text">${opt}</span>
      </button>
    `).join('');

    wrap.innerHTML = `
      <div class="exam-card">
        <div class="exam-header-bar">
          <span class="exam-title-badge">🏆 Grade 7 Challenge Exam</span>
          <span class="exam-progress-counter">Question ${this.examIndex + 1} of ${this.examQuestions.length}</span>
        </div>

        <div class="exam-strand-tag">${q.strandName} &bull; ${q.topicTitle}</div>
        <h3 class="exam-q-text">${q.q}</h3>

        <div class="exam-options-grid">
          ${optionsHtml}
        </div>
      </div>
    `;

    wrap.querySelectorAll('.exam-option-btn').forEach(btn => {
      btn.onclick = (e) => {
        const chosen = e.currentTarget.dataset.opt;
        this.examAnswers.push({
          question: q.q,
          chosen,
          correct: q.answer,
          isCorrect: chosen === q.answer,
          explanation: q.explanation
        });
        this.examIndex++;
        this.renderExamQuestion();
      };
    });
  }

  renderExamResults() {
    const wrap = document.getElementById('exam-workspace');
    if (!wrap) return;

    const total = this.examQuestions.length;
    const correctCount = this.examAnswers.filter(a => a.isCorrect).length;
    const pct = Math.round((correctCount / total) * 100);

    let grade = 'A*';
    if (pct < 50) grade = 'Needs Practice';
    else if (pct < 70) grade = 'B (Good Effort)';
    else if (pct < 85) grade = 'A (Great Work)';
    else grade = 'A+ (Outstanding!)';

    const reviewItems = this.examAnswers.map((item, idx) => `
      <div class="exam-review-item ${item.isCorrect ? 'correct' : 'incorrect'}">
        <div><strong>Q${idx + 1}:</strong> ${item.question}</div>
        <div>Your Answer: <em>${item.chosen}</em> | Correct: <strong>${item.correct}</strong></div>
        <small>${item.explanation}</small>
      </div>
    `).join('');

    wrap.innerHTML = `
      <div class="exam-report-card">
        <h2>🎉 Exam Complete, Justin!</h2>
        <div class="report-score-box">
          <div class="report-pct">${pct}%</div>
          <div class="report-grade">${grade}</div>
          <p>Score: ${correctCount} out of ${total} questions correct</p>
        </div>

        <h3>Question Breakdown & Review:</h3>
        <div class="exam-review-list">
          ${reviewItems}
        </div>

        <button class="primary-action-btn" id="retake-exam-btn" style="margin-top:20px;">
          Retake Challenge Exam ↺
        </button>
      </div>
    `;

    wrap.querySelector('#retake-exam-btn').onclick = () => {
      this.startExamMode();
    };
  }

  updateProgressBadges() {
    const count = Object.keys(this.progress.completedTopics).length;
    if (this.dom.totalStarsEl) {
      this.dom.totalStarsEl.textContent = `⭐ ${count} Topics Mastered`;
    }
  }

  applySettings() {
    document.body.className = `font-${this.settings.font} theme-${this.settings.theme}`;
    if (this.dom.themeBtn) {
      this.dom.themeBtn.textContent = `🎨 Theme: ${this.settings.theme.toUpperCase()}`;
    }
    if (this.dom.fontBtn) {
      this.dom.fontBtn.textContent = `🔤 Font: ${this.settings.font === 'lexend' ? 'Lexend' : 'Dyslexic'}`;
    }
  }
}

if (typeof window !== 'undefined' && document.getElementById('grade7-app')) {
  window.grade7App = new Grade7AcademyApp();
  window.grade7App.init();
}

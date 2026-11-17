// js/speech-coach.js - ADHD/Dyscalculia Audio Dual-Coding Engine for Justin
// Provides natural spoken explanations of lessons, worked examples, and hints.
// Translates math notation into natural, conversational English.

export class SpeechCoach {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isPlaying = false;
    this.onStateChange = null;
    this.voice = null;
    this.initVoice();
  }

  initVoice() {
    if (!this.synth) return;
    const setVoice = () => {
      const voices = this.synth.getVoices();
      // Prefer friendly English voices (e.g. Google UK English, Natural, Samantha)
      this.voice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google')))
        || voices.find(v => v.lang.startsWith('en'))
        || null;
    };

    setVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = setVoice;
    }
  }

  /**
   * Translates LaTeX / mathematical expressions into spoken English words.
   * e.g. -8 - (-12) => "negative 8 minus negative 12"
   * \frac{3}{4} => "three quarters" or "3 over 4"
   */
  static toSpokenEnglish(text) {
    if (!text) return '';

    let s = text;

    // Remove HTML tags
    s = s.replace(/<[^>]*>/g, ' ');

    // Fractions \frac{a}{b}
    s = s.replace(/\\frac\{1\}\{2\}/g, 'one half');
    s = s.replace(/\\frac\{1\}\{4\}/g, 'one quarter');
    s = s.replace(/\\frac\{3\}\{4\}/g, 'three quarters');
    s = s.replace(/\\frac\{1\}\{3\}/g, 'one third');
    s = s.replace(/\\frac\{2\}\{3\}/g, 'two thirds');
    s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 over $2');

    // Roots
    s = s.replace(/\\sqrt\[3\]\{([^{}]+)\}/g, 'the cube root of $1');
    s = s.replace(/\\sqrt\{([^{}]+)\}/g, 'the square root of $1');
    s = s.replace(/√([0-9a-zA-Z]+)/g, 'the square root of $1');

    // Powers
    s = s.replace(/([a-zA-Z0-9]+)\^2/g, '$1 squared');
    s = s.replace(/([a-zA-Z0-9]+)\^3/g, '$1 cubed');
    s = s.replace(/([a-zA-Z0-9]+)\^\{([^{}]+)\}/g, '$1 to the power of $2');

    // Operators
    s = s.replace(/\\times|×/g, ' multiplied by ');
    s = s.replace(/\\div|÷/g, ' divided by ');
    s = s.replace(/\\pm|±/g, ' plus or minus ');
    s = s.replace(/\\leq|≤/g, ' is less than or equal to ');
    s = s.replace(/\\geq|≥/g, ' is greater than or equal to ');
    s = s.replace(/\\neq|≠/g, ' is not equal to ');
    s = s.replace(/=/g, ' equals ');
    s = s.replace(/°|\\circ/g, ' degrees ');

    // Negative numbers
    s = s.replace(/-\s*(\d+)/g, 'negative $1');
    s = s.replace(/−\s*(\d+)/g, 'negative $1');

    // South African Currency
    s = s.replace(/R\s*(\d+)/g, '$1 Rand');

    // Clean up LaTeX wrappers
    s = s.replace(/\\\(|\\\)|\\\[|\\\]|\$|\$\$/g, ' ');
    s = s.replace(/\\text\{([^{}]+)\}/g, '$1');

    // Collapse multiple spaces
    s = s.replace(/\s+/g, ' ').trim();

    return s;
  }

  speak(text, onEnd = null) {
    if (!this.synth) return;
    this.stop();

    const spokenText = SpeechCoach.toSpokenEnglish(text);
    if (!spokenText) return;

    this.currentUtterance = new SpeechSynthesisUtterance(spokenText);
    if (this.voice) {
      this.currentUtterance.voice = this.voice;
    }
    this.currentUtterance.rate = 0.95; // Slightly slower for clarity
    this.currentUtterance.pitch = 1.0;

    this.currentUtterance.onstart = () => {
      this.isPlaying = true;
      if (this.onStateChange) this.onStateChange(true);
    };

    this.currentUtterance.onend = () => {
      this.isPlaying = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEnd) onEnd();
    };

    this.currentUtterance.onerror = () => {
      this.isPlaying = false;
      if (this.onStateChange) this.onStateChange(false);
    };

    this.synth.speak(this.currentUtterance);
  }

  stop() {
    if (!this.synth) return;
    this.synth.cancel();
    this.isPlaying = false;
    if (this.onStateChange) this.onStateChange(false);
  }

  toggle(text, onEnd = null) {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.speak(text, onEnd);
    }
  }
}

export const globalSpeech = new SpeechCoach();

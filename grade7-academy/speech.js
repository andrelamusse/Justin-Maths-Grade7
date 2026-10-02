// speech.js - Text-to-Speech Engine for Grade 7 Academy
// Calibrated for accessible, natural, stress-free audio reading.

class Grade7Speech {
  constructor() {
    this.speechEnabled = true;
    this.speechRate = 0.92;
    this.selectedVoice = null;
    this.init();
  }

  init() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => this.loadVoice();
      this.loadVoice();
    }
  }

  loadVoice() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    this.selectedVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google')))
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0];
  }

  speak(text, onStart, onEnd) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    if (!this.speechEnabled || !text) {
      if (onEnd) onEnd();
      return;
    }

    const cleanText = text
      .replace(/[²]/g, ' squared ')
      .replace(/[³]/g, ' cubed ')
      .replace(/[√]/g, ' square root of ')
      .replace(/[∛]/g, ' cube root of ')
      .replace(/[°]/g, ' degrees ')
      .replace(/[\/]/g, ' over ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedVoice) utterance.voice = this.selectedVoice;
    utterance.rate = this.speechRate;

    if (onStart) utterance.onstart = onStart;
    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speechReader = new Grade7Speech();

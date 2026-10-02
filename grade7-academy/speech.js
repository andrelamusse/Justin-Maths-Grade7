// speech.js - Text-to-Speech Engine for Grade 7 Academy
// Calibrated for accessible, natural, stress-free audio reading.

class Grade7Speech {
  constructor() {
    this.speechEnabled = true;
    this.speechRate = 0.92;
    this.selectedVoice = null;
    this.currentlySpeaking = false;
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
    this.stop();
    if (!this.speechEnabled || !text) {
      if (onEnd) onEnd();
      return;
    }

    if (!this.selectedVoice) {
      this.loadVoice();
    }

    const cleanText = text
      .replace(/\$([0-9.]+)/g, '$1 dollars')
      .replace(/cm²/g, ' square centimetres ')
      .replace(/m²/g, ' square metres ')
      .replace(/cm³/g, ' cubic centimetres ')
      .replace(/m³/g, ' cubic metres ')
      .replace(/[²]/g, ' squared ')
      .replace(/[³]/g, ' cubed ')
      .replace(/[√]/g, ' square root of ')
      .replace(/[∛]/g, ' cube root of ')
      .replace(/[°]/g, ' degrees ')
      .replace(/÷/g, ' divided by ')
      .replace(/×/g, ' times ')
      .replace(/[\/]/g, ' over ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedVoice) utterance.voice = this.selectedVoice;
    utterance.rate = this.speechRate;

    utterance.onstart = () => {
      this.currentlySpeaking = true;
      if (onStart) onStart();
    };

    const handleFinish = () => {
      this.currentlySpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onend = handleFinish;
    utterance.onerror = handleFinish;

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentlySpeaking = false;
    }
  }
}

export const speechReader = new Grade7Speech();

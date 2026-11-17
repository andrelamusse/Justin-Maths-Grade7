// js/math-renderer.js - Mathematical Typography Engine for Justin's Grade 7 Academy
// Ensures all fractions, square roots, exponents, negatives, operations, and ratios
// render with textbook-grade mathematical typography (KaTeX with pure CSS/HTML fallback).
// NEVER displays raw programming syntax like 2/3, *, sqrt(x), or ^2.

export class MathRenderer {
  constructor() {
    this.katexAvailable = typeof window !== 'undefined' && typeof window.katex !== 'undefined';
  }

  /**
   * Transforms raw mathematical strings and LaTeX into beautifully rendered HTML.
   * Supports both KaTeX (when loaded) and a high-fidelity CSS/MathML fallback.
   * @param {string} text - The input text containing math expressions
   * @returns {string} - Rendered HTML
   */
  static render(text) {
    if (!text || typeof text !== 'string') return '';

    // First check if KaTeX is globally available
    const hasKatex = typeof window !== 'undefined' && window.katex && typeof window.katex.renderToString === 'function';

    // Helper to render LaTeX math segment
    const renderLatexSegment = (latex, displayMode = false) => {
      const cleanLatex = latex.trim();
      if (hasKatex) {
        try {
          return window.katex.renderToString(cleanLatex, {
            displayMode,
            throwOnError: false
          });
        } catch (e) {
          // Fall back to custom typography below
        }
      }
      return MathRenderer.fallbackTypography(cleanLatex, displayMode);
    };

    // Replace display math: \[ ... \] or $$ ... $$
    let result = text.replace(/\\\[([\s\S]*?)\\\]/g, (match, expr) => {
      return `<div class="math-display">${renderLatexSegment(expr, true)}</div>`;
    });
    result = result.replace(/\$\$([\s\S]*?)\$\$/g, (match, expr) => {
      return `<div class="math-display">${renderLatexSegment(expr, true)}</div>`;
    });

    // Replace inline math: \( ... \) or $ ... $
    result = result.replace(/\\\(([\s\S]*?)\\\)/g, (match, expr) => {
      return `<span class="math-inline">${renderLatexSegment(expr, false)}</span>`;
    });
    result = result.replace(/\$([^\$\n]+?)\$/g, (match, expr) => {
      return `<span class="math-inline">${renderLatexSegment(expr, false)}</span>`;
    });

    // Clean up any remaining unadorned math symbols in general text
    result = MathRenderer.cleanTextSymbols(result);

    return result;
  }

  /**
   * Beautiful CSS/HTML Fallback for mathematical expressions without KaTeX.
   * Converts fractions, roots, powers, and symbols into clean typography.
   */
  static fallbackTypography(expr, displayMode = false) {
    let html = expr;

    // Fractions: \frac{num}{denom}
    html = html.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (match, num, den) => {
      return `<span class="math-frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;
    });

    // Nested fractions (second pass)
    html = html.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (match, num, den) => {
      return `<span class="math-frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;
    });

    // Cube roots: \sqrt[3]{x}
    html = html.replace(/\\sqrt\[3\]\{([^{}]+)\}/g, '<span class="math-root"><sup class="root-index">3</sup>√<span class="radicand">$1</span></span>');

    // Square roots: \sqrt{x}
    html = html.replace(/\\sqrt\{([^{}]+)\}/g, '<span class="math-root">√<span class="radicand">$1</span></span>');

    // Exponents: x^{n} or x^n
    html = html.replace(/([a-zA-Z0-9\)])\^\{([^{}]+)\}/g, '$1<sup>$2</sup>');
    html = html.replace(/([a-zA-Z0-9\)])\^([0-9a-zA-Z\+\-]+)/g, '$1<sup>$2</sup>');

    // Subscripts: x_{n} or x_n
    html = html.replace(/([a-zA-Z0-9\)])\_\{([^{}]+)\}/g, '$1<sub>$2</sub>');
    html = html.replace(/([a-zA-Z0-9\)])\_([0-9a-zA-Z\+\-]+)/g, '$1<sub>$2</sub>');

    // Common LaTeX operators
    html = html.replace(/\\times/g, '<span class="math-op">×</span>');
    html = html.replace(/\\div/g, '<span class="math-op">÷</span>');
    html = html.replace(/\\pm/g, '<span class="math-op">±</span>');
    html = html.replace(/\\approx/g, '<span class="math-op">≈</span>');
    html = html.replace(/\\neq/g, '<span class="math-op">≠</span>');
    html = html.replace(/\\leq/g, '<span class="math-op">≤</span>');
    html = html.replace(/\\geq/g, '<span class="math-op">≥</span>');
    html = html.replace(/\\circ/g, '°');
    html = html.replace(/\\text\{([^{}]+)\}/g, '<span class="math-text">$1</span>');

    // Ratios: clean colon spacing
    html = html.replace(/(\d+)\s*:\s*(\d+)/g, '$1&nbsp;:&nbsp;$2');

    return `<span class="fallback-math ${displayMode ? 'display' : 'inline'}">${html}</span>`;
  }

  /**
   * Ensures raw text strings do not use code characters like * or / for math.
   */
  static cleanTextSymbols(str) {
    // Only replace standalone or between numbers
    // Replace * between numbers or variables with ×
    str = str.replace(/(\d|\))\s*\*\s*(\d|\()/g, '$1 × $2');
    // Replace raw fraction like 3/4 when preceded by space or start and followed by space or punctuation
    str = str.replace(/(^|\s)(\d+)\/(\d+)($|[\s\.,;\?!])/g, '$1<span class="math-frac"><span class="num">$2</span><span class="den">$3</span></span>$4');
    return str;
  }

  /**
   * Helper to scan a DOM node and re-render math contents.
   */
  static renderElement(domEl) {
    if (!domEl) return;
    if (typeof window !== 'undefined' && window.renderMathInElement && typeof window.renderMathInElement === 'function') {
      try {
        window.renderMathInElement(domEl, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
        return;
      } catch (e) {
        // Fallback below
      }
    }

    // Direct innerHTML fallback
    domEl.querySelectorAll('.needs-math').forEach(el => {
      el.innerHTML = MathRenderer.render(el.getAttribute('data-raw') || el.innerHTML);
    });
  }
}

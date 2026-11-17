// js/math-renderer.js - Mathematical Typography Engine for Justin's Grade 7 Academy
// Ensures all fractions, square roots, exponents, negatives, operations, and ratios
// render with textbook-grade mathematical typography (KaTeX with pure CSS/HTML fallback).
// NEVER displays raw programming syntax like 2/3, *, sqrt(x), or ^2.

export class MathRenderer {
  constructor() {
    this.katexAvailable = typeof window !== 'undefined' && typeof window.katex !== 'undefined';
  }

  /**
   * Helper to extract content within balanced curly braces starting at startIndex.
   * Handles nested braces correctly (e.g. \frac{\text{R } 150}{3}).
   */
  static extractBraceContent(str, startIndex) {
    if (str[startIndex] !== '{') return null;
    let depth = 0;
    for (let i = startIndex; i < str.length; i++) {
      if (str[i] === '{') depth++;
      else if (str[i] === '}') {
        depth--;
        if (depth === 0) {
          return { content: str.slice(startIndex + 1, i), endIndex: i };
        }
      }
    }
    return null;
  }

  /**
   * Recursively parses all \frac{num}{den} occurrences using balanced brace matching.
   */
  static parseFractions(str) {
    let out = '';
    let i = 0;
    while (i < str.length) {
      const fracIdx = str.indexOf('\\frac', i);
      if (fracIdx === -1) {
        out += str.slice(i);
        break;
      }
      out += str.slice(i, fracIdx);

      const b1Open = str.indexOf('{', fracIdx + 5);
      if (b1Open === -1) {
        out += '\\frac';
        i = fracIdx + 5;
        continue;
      }

      const firstBrace = MathRenderer.extractBraceContent(str, b1Open);
      if (!firstBrace) {
        out += '\\frac';
        i = fracIdx + 5;
        continue;
      }

      const b2Open = str.indexOf('{', firstBrace.endIndex + 1);
      if (b2Open === -1 || b2Open > firstBrace.endIndex + 3) {
        out += '\\frac';
        i = fracIdx + 5;
        continue;
      }

      const secondBrace = MathRenderer.extractBraceContent(str, b2Open);
      if (!secondBrace) {
        out += '\\frac';
        i = fracIdx + 5;
        continue;
      }

      const numParsed = MathRenderer.fallbackInline(firstBrace.content);
      const denParsed = MathRenderer.fallbackInline(secondBrace.content);
      out += `<span class="math-frac"><span class="num">${numParsed}</span><span class="den">${denParsed}</span></span>`;
      i = secondBrace.endIndex + 1;
    }
    return out;
  }

  /**
   * Inner fallback helper for inline math fragments without outer wrapper.
   */
  static fallbackInline(expr) {
    let html = expr;

    // Fractions with balanced braces
    html = MathRenderer.parseFractions(html);

    // Matrix / Column Vectors: \begin{pmatrix} a \\ b \end{pmatrix}
    html = html.replace(/\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}/g, (match, body) => {
      const rows = body.trim().split(/\\\\|\n/).map(r => r.trim()).filter(Boolean);
      const rowsHtml = rows.map(r => `<span class="vec-cell">${MathRenderer.fallbackInline(r)}</span>`).join('');
      return `<span class="math-vector"><span class="vec-bracket">(</span><span class="vec-col">${rowsHtml}</span><span class="vec-bracket">)</span></span>`;
    });

    // Recurring decimals: \dot{3}
    html = html.replace(/\\dot\{([^{}]+)\}/g, '<span class="recurring-dot">$1</span>');

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

    // Common LaTeX operators & symbols
    html = html.replace(/\\times/g, '<span class="math-op">×</span>');
    html = html.replace(/\\div/g, '<span class="math-op">÷</span>');
    html = html.replace(/\\pm/g, '<span class="math-op">±</span>');
    html = html.replace(/\\approx/g, '<span class="math-op">≈</span>');
    html = html.replace(/\\neq/g, '<span class="math-op">≠</span>');
    html = html.replace(/\\leq/g, '<span class="math-op">≤</span>');
    html = html.replace(/\\geq/g, '<span class="math-op">≥</span>');
    html = html.replace(/\\implies/g, '<span class="math-sym">⟹</span>');
    html = html.replace(/\\to/g, '<span class="math-sym">→</span>');
    html = html.replace(/\\dots/g, '…');
    html = html.replace(/\^?\\circ/g, '°');
    html = html.replace(/\\text\{([^{}]+)\}/g, '<span class="math-text">$1</span>');

    // Ratios: clean colon spacing
    html = html.replace(/(\d+)\s*:\s*(\d+)/g, '$1&nbsp;:&nbsp;$2');

    return html;
  }

  /**
   * Beautiful CSS/HTML Fallback for mathematical expressions without KaTeX.
   * Converts fractions, roots, powers, vectors, and symbols into clean typography.
   */
  static fallbackTypography(expr, displayMode = false) {
    const html = MathRenderer.fallbackInline(expr);
    return `<span class="fallback-math ${displayMode ? 'display' : 'inline'}">${html}</span>`;
  }

  /**
   * Transforms raw mathematical strings and LaTeX into beautifully rendered HTML.
   * Supports both KaTeX (when loaded) and a high-fidelity CSS/HTML fallback.
   * Auto-detects bare LaTeX commands (e.g. \frac{7}{20}, 3\frac{1}{4}) even without delimiters.
   * @param {string} text - The input text containing math expressions
   * @returns {string} - Rendered HTML
   */
  static render(text) {
    if (!text || typeof text !== 'string') return '';

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

    const tokens = [];
    const saveToken = (html) => {
      const id = `___MATH_TOK_${tokens.length}___`;
      tokens.push(html);
      return id;
    };

    let result = text;

    // 1. Display math: \[ ... \] and $$ ... $$
    result = result.replace(/\\\[([\s\S]*?)\\\]/g, (match, expr) => {
      return saveToken(`<div class="math-display">${renderLatexSegment(expr, true)}</div>`);
    });
    result = result.replace(/\$\$([\s\S]*?)\$\$/g, (match, expr) => {
      return saveToken(`<div class="math-display">${renderLatexSegment(expr, true)}</div>`);
    });

    // 2. Inline math: \( ... \) and $ ... $
    result = result.replace(/\\\(([\s\S]*?)\\\)/g, (match, expr) => {
      return saveToken(`<span class="math-inline">${renderLatexSegment(expr, false)}</span>`);
    });
    result = result.replace(/\$([^\$\n]+?)\$/g, (match, expr) => {
      return saveToken(`<span class="math-inline">${renderLatexSegment(expr, false)}</span>`);
    });

    const latexCmdRegex = /\\(?:frac|sqrt|times|div|pm|approx|neq|leq|geq|circ|text|begin|pmatrix|dots|implies|to|dot)/;

    // 3. Bare LaTeX expressions (e.g. "\frac{7}{20}", "3\frac{1}{4}", "\sqrt{100}")
    if (latexCmdRegex.test(result)) {
      if (/^\s*(?:[0-9]+\s*)?\\(?:frac|sqrt|begin\{pmatrix\})/.test(result.trim())) {
        result = saveToken(`<span class="math-inline">${renderLatexSegment(result.trim(), false)}</span>`);
      } else {
        result = result.replace(/(?:[0-9]+\s*)?\\frac\{[^{}]+\}\{[^{}]+\}/g, (m) => {
          return saveToken(`<span class="math-inline">${renderLatexSegment(m, false)}</span>`);
        });
        result = result.replace(/\\sqrt(?:\[3\])?\{[^{}]+\}/g, (m) => {
          return saveToken(`<span class="math-inline">${renderLatexSegment(m, false)}</span>`);
        });
        result = result.replace(/\\begin\{pmatrix\}[\s\S]*?\\end\{pmatrix\}/g, (m) => {
          return saveToken(`<span class="math-inline">${renderLatexSegment(m, false)}</span>`);
        });
        if (latexCmdRegex.test(result)) {
          result = MathRenderer.fallbackInline(result);
        }
      }
    }

    // 4. Clean text symbols on remaining text (e.g. raw 3/4, 3 1/2, 2 * 3)
    result = MathRenderer.cleanTextSymbols(result);

    // 5. Restore all tokens
    for (let i = 0; i < tokens.length; i++) {
      result = result.replace(`___MATH_TOK_${i}___`, tokens[i]);
    }

    return result;
  }

  /**
   * Ensures raw text strings do not use code characters like * or / for math.
   * Formats mixed numbers (e.g. "3 1/2") and simple fractions ("3/4", "-3/4").
   */
  static cleanTextSymbols(str) {
    if (!str || typeof str !== 'string') return '';
    // Replace * between numbers or variables with ×
    str = str.replace(/(\d|\))\s*\*\s*(\d|\()/g, '$1 × $2');
    // Replace mixed fractions like "3 1/2" or "2 3/4"
    str = str.replace(/(^|\s)(\d+)\s+(\d+)\/(\d+)($|[\s\.,;\?!])/g, '$1$2&nbsp;<span class="math-frac"><span class="num">$3</span><span class="den">$4</span></span>$5');
    // Replace raw fraction like "3/4" or "-3/4"
    str = str.replace(/(^|[\s(])(-?\d+)\/(\d+)($|[\s\.,;\?!)\%])/g, '$1<span class="math-frac"><span class="num">$2</span><span class="den">$3</span></span>$4');
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

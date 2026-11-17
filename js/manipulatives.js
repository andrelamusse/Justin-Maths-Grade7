// js/manipulatives.js - 6 Interactive Virtual Math Manipulatives for Grade 7
// Visual, hands-on, ADHD/dyscalculia friendly learning tools:
// 1. Equation Balance Scale
// 2. Interactive Fraction Wall
// 3. Angle Visualizer & Parallel Line Explorer
// 4. Integer Thermometer & Number Line
// 5. Cartesian 4-Quadrant Coordinate Plotter
// 6. Ratio Bar Model Visualizer

export class ManipulativesLab {
  constructor() {
    this.activeTool = 'balance';
  }

  init(containerId = 'manipulatives-content') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.bindToolTabs();
    this.renderCurrentTool();
  }

  bindToolTabs() {
    const tabButtons = document.querySelectorAll('.manipulative-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tool = e.currentTarget.dataset.tool;
        this.setTool(tool);
      });
    });
  }

  setTool(toolName) {
    this.activeTool = toolName;
    document.querySelectorAll('.manipulative-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tool === toolName);
    });
    this.renderCurrentTool();
  }

  renderCurrentTool() {
    if (!this.container) return;
    this.container.innerHTML = '';

    switch (this.activeTool) {
      case 'balance':
        this.renderEquationBalance();
        break;
      case 'fractions':
        this.renderFractionWall();
        break;
      case 'angles':
        this.renderAngleVisualizer();
        break;
      case 'integers':
        this.renderIntegerThermometer();
        break;
      case 'coordinates':
        this.renderCoordinatePlotter();
        break;
      case 'ratio':
        this.renderRatioBarModel();
        break;
    }
  }

  // ==============================================================
  // 1. INTERACTIVE EQUATION BALANCE SCALE
  // ==============================================================
  renderEquationBalance() {
    const card = document.createElement('div');
    card.className = 'tool-card balance-card';

    let leftX = 2;
    let leftUnits = 4;
    let rightX = 0;
    let rightUnits = 10;
    const xSecret = 3; // Weight of 1x

    const getLeftWeight = () => leftX * xSecret + leftUnits;
    const getRightWeight = () => rightX * xSecret + rightUnits;

    card.innerHTML = `
      <div class="tool-header">
        <div class="tool-title-wrap">
          <span class="tool-icon">⚖️</span>
          <div>
            <h3>Equation Balance Scale</h3>
            <p>Solve <strong>2x + 4 = 10</strong> by keeping both sides balanced!</p>
          </div>
        </div>
      </div>

      <div class="scale-visual-area">
        <svg id="scale-svg" viewBox="0 0 600 240" class="scale-svg">
          <!-- Stand & Fulcrum -->
          <polygon points="300,150 270,225 330,225" fill="#334155"/>
          <rect x="230" y="222" width="140" height="14" rx="5" fill="#1e293b"/>
          <circle cx="300" cy="150" r="10" fill="#0f172a"/>

          <!-- Tilting Beam -->
          <g id="scale-beam" transform="rotate(0 300 150)">
            <rect x="80" y="146" width="440" height="8" rx="4" fill="#64748b"/>
            <!-- Left Pan Strings & Pan -->
            <line x1="120" y1="150" x2="70" y2="195" stroke="#94a3b8" stroke-width="2"/>
            <line x1="120" y1="150" x2="170" y2="195" stroke="#94a3b8" stroke-width="2"/>
            <path d="M 50,195 Q 120,220 190,195 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
            <text x="120" y="188" font-size="12" font-weight="700" text-anchor="middle" fill="#1e293b">Left Pan</text>

            <!-- Right Pan Strings & Pan -->
            <line x1="480" y1="150" x2="430" y2="195" stroke="#94a3b8" stroke-width="2"/>
            <line x1="480" y1="150" x2="530" y2="195" stroke="#94a3b8" stroke-width="2"/>
            <path d="M 410,195 Q 480,220 550,195 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
            <text x="480" y="188" font-size="12" font-weight="700" text-anchor="middle" fill="#1e293b">Right Pan</text>
          </g>
        </svg>

        <div id="balance-badge" class="balance-badge balanced">⚖️ Scale is Balanced! Both sides are equal.</div>
      </div>

      <div class="balance-controls-grid">
        <div class="pan-box left-pan-box">
          <div class="pan-title">Left Pan: <strong id="left-expr-display">2x + 4</strong></div>
          <div class="btn-cluster">
            <button class="action-pill add" id="left-add-x">+ 1x</button>
            <button class="action-pill sub" id="left-sub-x">- 1x</button>
            <button class="action-pill add" id="left-add-unit">+ 1</button>
            <button class="action-pill sub" id="left-sub-unit">- 1</button>
          </div>
        </div>

        <div class="pan-box right-pan-box">
          <div class="pan-title">Right Pan: <strong id="right-expr-display">10</strong></div>
          <div class="btn-cluster">
            <button class="action-pill add" id="right-add-x">+ 1x</button>
            <button class="action-pill sub" id="right-sub-x">- 1x</button>
            <button class="action-pill add" id="right-add-unit">+ 1</button>
            <button class="action-pill sub" id="right-sub-unit">- 1</button>
          </div>
        </div>
      </div>

      <div class="balance-actions-bar">
        <button class="action-pill util" id="subtract-4-both-btn">⚡ Take 4 from Both Sides</button>
        <button class="action-pill util" id="halve-both-btn">➗ Halve Both Sides (÷ 2)</button>
        <button class="action-pill reset" id="reset-balance-btn">↺ Reset (2x + 4 = 10)</button>
      </div>
    `;

    this.container.appendChild(card);

    const updateVisual = () => {
      const beam = card.querySelector('#scale-beam');
      const badge = card.querySelector('#balance-badge');
      const leftDisplay = card.querySelector('#left-expr-display');
      const rightDisplay = card.querySelector('#right-expr-display');

      const formatExpr = (xCount, units) => {
        const parts = [];
        if (xCount > 0) parts.push(xCount === 1 ? 'x' : `${xCount}x`);
        if (units > 0) parts.push(`${units}`);
        if (parts.length === 0) return '0';
        return parts.join(' + ');
      };

      leftDisplay.textContent = formatExpr(leftX, leftUnits);
      rightDisplay.textContent = formatExpr(rightX, rightUnits);

      const leftW = getLeftWeight();
      const rightW = getRightWeight();
      const diff = leftW - rightW;

      let angle = 0;
      if (diff > 0) angle = -Math.min(14, diff * 2);
      else if (diff < 0) angle = Math.min(14, Math.abs(diff) * 2);

      if (beam) beam.setAttribute('transform', `rotate(${angle} 300 150)`);

      if (diff === 0) {
        badge.className = 'balance-badge balanced';
        if (leftX === 1 && leftUnits === 0 && rightX === 0) {
          badge.textContent = `🎉 Solved! 1x = ${rightUnits}! (x = ${rightUnits})`;
        } else if (rightX === 1 && rightUnits === 0 && leftX === 0) {
          badge.textContent = `🎉 Solved! x = ${leftUnits}!`;
        } else {
          badge.textContent = `⚖️ Balanced! Both sides are equal.`;
        }
      } else if (diff > 0) {
        badge.className = 'balance-badge heavier';
        badge.textContent = `⚠️ Left side is heavier! (Not equal)`;
      } else {
        badge.className = 'balance-badge lighter';
        badge.textContent = `⚠️ Right side is heavier! (Not equal)`;
      }
    };

    card.querySelector('#left-add-x').onclick = () => { leftX++; updateVisual(); };
    card.querySelector('#left-sub-x').onclick = () => { if (leftX > 0) leftX--; updateVisual(); };
    card.querySelector('#left-add-unit').onclick = () => { leftUnits++; updateVisual(); };
    card.querySelector('#left-sub-unit').onclick = () => { if (leftUnits > 0) leftUnits--; updateVisual(); };

    card.querySelector('#right-add-x').onclick = () => { rightX++; updateVisual(); };
    card.querySelector('#right-sub-x').onclick = () => { if (rightX > 0) rightX--; updateVisual(); };
    card.querySelector('#right-add-unit').onclick = () => { rightUnits++; updateVisual(); };
    card.querySelector('#right-sub-unit').onclick = () => { if (rightUnits > 0) rightUnits--; updateVisual(); };

    card.querySelector('#subtract-4-both-btn').onclick = () => {
      if (leftUnits >= 4 && rightUnits >= 4) {
        leftUnits -= 4;
        rightUnits -= 4;
        updateVisual();
      }
    };

    card.querySelector('#halve-both-btn').onclick = () => {
      if (leftX % 2 === 0 && leftUnits % 2 === 0 && rightX % 2 === 0 && rightUnits % 2 === 0) {
        leftX /= 2; leftUnits /= 2; rightX /= 2; rightUnits /= 2;
        updateVisual();
      }
    };

    card.querySelector('#reset-balance-btn').onclick = () => {
      leftX = 2; leftUnits = 4; rightX = 0; rightUnits = 10;
      updateVisual();
    };

    updateVisual();
  }

  // ==============================================================
  // 2. INTERACTIVE FRACTION WALL
  // ==============================================================
  renderFractionWall() {
    const card = document.createElement('div');
    card.className = 'tool-card fraction-card';

    card.innerHTML = `
      <div class="tool-header">
        <div class="tool-title-wrap">
          <span class="tool-icon">🧱</span>
          <div>
            <h3>Interactive Fraction Wall</h3>
            <p>Tap any fraction strip to see matching equivalent fractions align!</p>
          </div>
        </div>
      </div>

      <div class="fraction-wall-grid" id="fraction-wall-container"></div>

      <div class="fraction-info-banner" id="fraction-info-box">
        💡 Tap any fraction brick above to inspect its equivalent fractions, decimal, and percentage!
      </div>
    `;

    this.container.appendChild(card);

    const wallGrid = card.querySelector('#fraction-wall-container');
    const infoBox = card.querySelector('#fraction-info-box');

    const denominations = [
      { name: '1 Whole', count: 1, color: '#2563EB' },
      { name: 'Halves', count: 2, color: '#059669' },
      { name: 'Thirds', count: 3, color: '#D97706' },
      { name: 'Quarters', count: 4, color: '#DB2777' },
      { name: 'Fifths', count: 5, color: '#7C3AED' },
      { name: 'Sixths', count: 6, color: '#0891B2' },
      { name: 'Eighths', count: 8, color: '#EA580C' },
      { name: 'Tenths', count: 10, color: '#4F46E5' },
      { name: 'Twelfths', count: 12, color: '#0D9488' }
    ];

    denominations.forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = 'fraction-row';

      for (let i = 0; i < row.count; i++) {
        const block = document.createElement('button');
        block.className = 'fraction-block';
        block.type = 'button';
        block.dataset.num = i + 1;
        block.dataset.denom = row.count;
        block.style.backgroundColor = row.color;
        block.textContent = row.count === 1 ? '1 Whole' : `1/${row.count}`;

        block.onclick = () => {
          const selectedNumerator = i + 1;
          const selectedDenominator = row.count;
          const targetVal = selectedNumerator / selectedDenominator;

          const equivalents = [];
          card.querySelectorAll('.fraction-block').forEach(b => {
            const bNum = parseInt(b.dataset.num, 10);
            const bDenom = parseInt(b.dataset.denom, 10);
            const val = bNum / bDenom;
            if (Math.abs(val - targetVal) < 0.0001) {
              b.classList.add('active-brick');
              equivalents.push(bNum === bDenom ? '1' : `${bNum}/${bDenom}`);
            } else {
              b.classList.remove('active-brick');
            }
          });

          const dec = targetVal.toFixed(3);
          const pct = (targetVal * 100).toFixed(1);
          const eqText = equivalents.length > 1 ? equivalents.join(' = ') : `${selectedNumerator}/${selectedDenominator}`;

          infoBox.innerHTML = `
            <div style="font-weight:700; margin-bottom: 4px;">
              Equivalents: <span style="color:#059669; font-size:1.15rem;">${eqText}</span>
            </div>
            <div style="display:flex; gap:12px; flex-wrap:wrap; font-size:0.95rem;">
              <span>Decimal: <strong>${dec}</strong></span>
              <span>Percentage: <strong>${pct}%</strong></span>
            </div>
          `;
        };

        rowEl.appendChild(block);
      }
      wallGrid.appendChild(rowEl);
    });
  }

  // ==============================================================
  // 3. INTERACTIVE ANGLE VISUALIZER & PROTRACTOR
  // ==============================================================
  renderAngleVisualizer() {
    const card = document.createElement('div');
    card.className = 'tool-card angle-card';

    card.innerHTML = `
      <div class="tool-header">
        <div class="tool-title-wrap">
          <span class="tool-icon">📐</span>
          <div>
            <h3>Angle Visualizer &amp; Protractor</h3>
            <p>Drag the angle slider to see acute, right, obtuse, straight, and reflex angles.</p>
          </div>
        </div>
      </div>

      <div class="angle-display-wrap">
        <svg id="angle-svg" viewBox="0 0 360 260" class="angle-svg"></svg>
      </div>

      <div class="angle-slider-bar">
        <label for="angle-slider-input">Angle: <strong id="angle-slider-val">65°</strong></label>
        <input type="range" id="angle-slider-input" min="5" max="355" value="65" class="custom-slider">
      </div>

      <div class="angle-info-chips">
        <div class="info-chip">
          <small>Classification</small>
          <strong id="angle-class-text">Acute Angle (&lt; 90°)</strong>
        </div>
        <div class="info-chip">
          <small>Supplementary (to 180°)</small>
          <strong id="angle-supp-text">115°</strong>
        </div>
        <div class="info-chip">
          <small>Complementary (to 90°)</small>
          <strong id="angle-comp-text">25°</strong>
        </div>
      </div>
    `;

    this.container.appendChild(card);

    const slider = card.querySelector('#angle-slider-input');
    const valText = card.querySelector('#angle-slider-val');
    const classText = card.querySelector('#angle-class-text');
    const suppText = card.querySelector('#angle-supp-text');
    const compText = card.querySelector('#angle-comp-text');
    const svg = card.querySelector('#angle-svg');

    const updateAngle = (deg) => {
      valText.textContent = `${deg}°`;

      if (deg < 90) classText.textContent = 'Acute Angle (< 90°)';
      else if (deg === 90) classText.textContent = 'Right Angle (= 90°)';
      else if (deg < 180) classText.textContent = 'Obtuse Angle (90° - 180°)';
      else if (deg === 180) classText.textContent = 'Straight Angle (= 180°)';
      else classText.textContent = 'Reflex Angle (> 180°)';

      suppText.textContent = deg <= 180 ? `${180 - deg}°` : 'N/A (> 180°)';
      compText.textContent = deg <= 90 ? `${90 - deg}°` : 'N/A (> 90°)';

      const cx = 180;
      const cy = 180;
      const r = 110;

      const baseEndX = cx + r;
      const baseEndY = cy;

      const rad = (deg * Math.PI) / 180;
      const rotEndX = cx + r * Math.cos(-rad);
      const rotEndY = cy + r * Math.sin(-rad);

      const arcR = 40;
      const arcEndX = cx + arcR * Math.cos(-rad);
      const arcEndY = cy + arcR * Math.sin(-rad);
      const largeArc = deg > 180 ? 1 : 0;
      const arcPath = `M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 ${largeArc} 0 ${arcEndX} ${arcEndY}`;

      let html = `
        <!-- Origin Vertex -->
        <circle cx="${cx}" cy="${cy}" r="6" fill="#1e293b"/>
        <!-- Arc -->
        <path d="${arcPath}" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" stroke-width="3"/>
        <!-- Base Ray -->
        <line x1="${cx}" y1="${cy}" x2="${baseEndX}" y2="${baseEndY}" stroke="#2563eb" stroke-width="4" stroke-linecap="round"/>
        <polygon points="${baseEndX},${baseEndY - 4} ${baseEndX + 8},${baseEndY} ${baseEndX},${baseEndY + 4}" fill="#2563eb"/>
        <!-- Rotating Ray -->
        <line x1="${cx}" y1="${cy}" x2="${rotEndX}" y2="${rotEndY}" stroke="#10b981" stroke-width="4" stroke-linecap="round"/>
      `;

      if (deg === 90) {
        html += `<rect x="${cx}" y="${cy - 20}" width="20" height="20" fill="none" stroke="#dc2626" stroke-width="2"/>`;
      }

      svg.innerHTML = html;
    };

    slider.addEventListener('input', (e) => {
      updateAngle(parseInt(e.target.value, 10));
    });

    updateAngle(65);
  }

  // ==============================================================
  // 4. INTEGER THERMOMETER & NUMBER LINE
  // ==============================================================
  renderIntegerThermometer() {
    const card = document.createElement('div');
    card.className = 'tool-card thermo-card';

    card.innerHTML = `
      <div class="tool-header">
        <div class="tool-title-wrap">
          <span class="tool-icon">🌡️</span>
          <div>
            <h3>Integer Thermometer</h3>
            <p>See positive (+) and negative (-) integers. Freezing point is 0°C.</p>
          </div>
        </div>
      </div>

      <div class="thermo-layout-grid">
        <div class="thermo-visual">
          <div class="thermo-markers">
            <span class="tm pos">+20°C</span>
            <span class="tm pos">+10°C</span>
            <span class="tm zero">0°C (Freezing)</span>
            <span class="tm neg">-10°C</span>
            <span class="tm neg">-20°C</span>
          </div>
          <div class="thermo-tube-outer">
            <div id="mercury-bar" class="mercury-bar"></div>
          </div>
        </div>

        <div class="thermo-controls-col">
          <div class="current-temp-badge" id="temp-display">Current: <strong>+5°C</strong></div>
          <div class="temp-btn-grid">
            <button class="action-pill add" id="temp-plus-5">🔥 +5°C Warmer</button>
            <button class="action-pill add" id="temp-plus-1">🔺 +1°C</button>
            <button class="action-pill sub" id="temp-minus-1">🔻 -1°C</button>
            <button class="action-pill sub" id="temp-minus-5">❄️ -5°C Colder</button>
            <button class="action-pill reset" id="temp-zero">0°C Freezing</button>
          </div>
          <div class="temp-story-box" id="temp-story">
            At +5°C, temperature is 5 units ABOVE zero.
          </div>
        </div>
      </div>
    `;

    this.container.appendChild(card);

    let temp = 5;
    const mercury = card.querySelector('#mercury-bar');
    const display = card.querySelector('#temp-display');
    const story = card.querySelector('#temp-story');

    const updateThermo = () => {
      const pct = Math.max(0, Math.min(100, ((temp + 20) / 40) * 100));
      mercury.style.height = `${pct}%`;
      mercury.style.backgroundColor = temp < 0 ? '#38bdf8' : (temp === 0 ? '#94a3b8' : '#ef4444');

      display.innerHTML = `Current: <strong>${temp > 0 ? `+${temp}` : temp}°C</strong>`;
      if (temp > 0) {
        story.innerHTML = `☀️ <strong>Positive Integer (+${temp}):</strong> ${temp} degrees above freezing.`;
      } else if (temp === 0) {
        story.innerHTML = `❄️ <strong>Zero (0°C):</strong> The exact neutral boundary between positive and negative numbers!`;
      } else {
        story.innerHTML = `🧊 <strong>Negative Integer (${temp}):</strong> ${Math.abs(temp)} degrees below freezing cold!`;
      }
    };

    card.querySelector('#temp-plus-5').onclick = () => { if (temp <= 15) temp += 5; updateThermo(); };
    card.querySelector('#temp-plus-1').onclick = () => { if (temp < 20) temp += 1; updateThermo(); };
    card.querySelector('#temp-minus-1').onclick = () => { if (temp > -20) temp -= 1; updateThermo(); };
    card.querySelector('#temp-minus-5').onclick = () => { if (temp >= -15) temp -= 5; updateThermo(); };
    card.querySelector('#temp-zero').onclick = () => { temp = 0; updateThermo(); };

    updateThermo();
  }

  // ==============================================================
  // 5. CARTESIAN 4-QUADRANT COORDINATE PLOTTER
  // ==============================================================
  renderCoordinatePlotter() {
    const card = document.createElement('div');
    card.className = 'tool-card coord-card';

    card.innerHTML = `
      <div class="tool-header">
        <div class="tool-title-wrap">
          <span class="tool-icon">📍</span>
          <div>
            <h3>Cartesian 4-Quadrant Coordinate Grid</h3>
            <p>Click anywhere on the grid or adjust sliders to plot (x, y).</p>
          </div>
        </div>
      </div>

      <div class="coord-visual-area">
        <svg id="coord-svg" viewBox="0 0 320 320" class="coord-svg"></svg>
      </div>

      <div class="coord-sliders-row">
        <div>
          <label>x-axis (horizontal): <strong id="coord-x-val">2</strong></label>
          <input type="range" id="coord-x-slider" min="-5" max="5" value="2" class="custom-slider">
        </div>
        <div>
          <label>y-axis (vertical): <strong id="coord-y-val">3</strong></label>
          <input type="range" id="coord-y-slider" min="-5" max="5" value="3" class="custom-slider">
        </div>
      </div>

      <div class="coord-info-banner" id="coord-info-box">
        Point: <strong>(2, 3)</strong> in <strong>Quadrant 1 (+, +)</strong>
      </div>
    `;

    this.container.appendChild(card);

    let ptX = 2;
    let ptY = 3;

    const svg = card.querySelector('#coord-svg');
    const sliderX = card.querySelector('#coord-x-slider');
    const sliderY = card.querySelector('#coord-y-slider');
    const valX = card.querySelector('#coord-x-val');
    const valY = card.querySelector('#coord-y-val');
    const infoBox = card.querySelector('#coord-info-box');

    const updateGrid = () => {
      valX.textContent = `${ptX}`;
      valY.textContent = `${ptY}`;

      let quadrant = '';
      if (ptX > 0 && ptY > 0) quadrant = 'Quadrant 1 (+, +)';
      else if (ptX < 0 && ptY > 0) quadrant = 'Quadrant 2 (-, +)';
      else if (ptX < 0 && ptY < 0) quadrant = 'Quadrant 3 (-, -)';
      else if (ptX > 0 && ptY < 0) quadrant = 'Quadrant 4 (+, -)';
      else if (ptX === 0 && ptY === 0) quadrant = 'The Origin (0, 0)';
      else if (ptX === 0) quadrant = 'On the y-axis';
      else quadrant = 'On the x-axis';

      infoBox.innerHTML = `Point: <strong style="color:#2563eb; font-size:1.15rem;">(${ptX}, ${ptY})</strong> lies in <strong>${quadrant}</strong>`;

      // Render SVG coordinate plane (-5 to +5)
      // SVG width/height = 320. Origin cx = 160, cy = 160. Scale: 1 unit = 26px
      const cx = 160;
      const cy = 160;
      const unit = 26;

      let svgContent = `
        <defs>
          <pattern id="grid-pattern" width="${unit}" height="${unit}" patternUnits="userSpaceOnUse">
            <path d="M ${unit} 0 L 0 0 0 ${unit}" fill="none" stroke="#e2e8f0" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="320" height="320" fill="url(#grid-pattern)" />

        <!-- Axes -->
        <line x1="10" y1="${cy}" x2="310" y2="${cy}" stroke="#334155" stroke-width="2"/>
        <line x1="${cx}" y1="10" x2="${cx}" y2="310" stroke="#334155" stroke-width="2"/>
        <text x="305" y="${cy - 8}" font-size="11" font-weight="700" fill="#334155">x</text>
        <text x="${cx + 8}" y="18" font-size="11" font-weight="700" fill="#334155">y</text>
      `;

      // Axis ticks
      for (let i = -5; i <= 5; i++) {
        if (i === 0) continue;
        const xPos = cx + i * unit;
        const yPos = cy - i * unit;
        svgContent += `<line x1="${xPos}" y1="${cy - 3}" x2="${xPos}" y2="${cy + 3}" stroke="#64748b" stroke-width="1.5"/>`;
        svgContent += `<line x1="${cx - 3}" y1="${yPos}" x2="${cx + 3}" y2="${yPos}" stroke="#64748b" stroke-width="1.5"/>`;
        if (Math.abs(i) % 2 === 0 || Math.abs(i) === 5) {
          svgContent += `<text x="${xPos}" y="${cy + 14}" font-size="9" text-anchor="middle" fill="#64748b">${i}</text>`;
          svgContent += `<text x="${cx - 10}" y="${yPos + 3}" font-size="9" text-anchor="end" fill="#64748b">${i}</text>`;
        }
      }

      // Plot the point
      const ptSvgX = cx + ptX * unit;
      const ptSvgY = cy - ptY * unit;

      svgContent += `
        <!-- Projection lines -->
        <line x1="${ptSvgX}" y1="${cy}" x2="${ptSvgX}" y2="${ptSvgY}" stroke="#2563eb" stroke-dasharray="3,3" stroke-width="1.5"/>
        <line x1="${cx}" y1="${ptSvgY}" x2="${ptSvgX}" y2="${ptSvgY}" stroke="#2563eb" stroke-dasharray="3,3" stroke-width="1.5"/>

        <!-- Plotted Circle -->
        <circle cx="${ptSvgX}" cy="${ptSvgY}" r="7" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
        <text x="${ptSvgX + 8}" y="${ptSvgY - 8}" font-size="11" font-weight="800" fill="#ef4444">(${ptX}, ${ptY})</text>
      `;

      svg.innerHTML = svgContent;
    };

    sliderX.addEventListener('input', (e) => {
      ptX = parseInt(e.target.value, 10);
      updateGrid();
    });

    sliderY.addEventListener('input', (e) => {
      ptY = parseInt(e.target.value, 10);
      updateGrid();
    });

    svg.addEventListener('click', (e) => {
      const rect = svg.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const scaleX = 320 / rect.width;
      const scaleY = 320 / rect.height;
      const svgX = clickX * scaleX;
      const svgY = clickY * scaleY;

      ptX = Math.round((svgX - 160) / 26);
      ptY = Math.round((160 - svgY) / 26);
      ptX = Math.max(-5, Math.min(5, ptX));
      ptY = Math.max(-5, Math.min(5, ptY));

      sliderX.value = ptX;
      sliderY.value = ptY;
      updateGrid();
    });

    updateGrid();
  }

  // ==============================================================
  // 6. RATIO BAR MODEL VISUALIZER
  // ==============================================================
  renderRatioBarModel() {
    const card = document.createElement('div');
    card.className = 'tool-card ratio-card';

    card.innerHTML = `
      <div class="tool-header">
        <div class="tool-title-wrap">
          <span class="tool-icon">🍫</span>
          <div>
            <h3>Ratio Bar Model Visualizer</h3>
            <p>Divide amounts into visual parts to make sharing ratios crystal clear.</p>
          </div>
        </div>
      </div>

      <div class="ratio-inputs-bar">
        <div class="input-pair">
          <label>Justin's Share (Parts):</label>
          <input type="number" id="ratio-a-input" value="2" min="1" max="10" class="num-input">
        </div>
        <div class="input-pair">
          <label>Friend's Share (Parts):</label>
          <input type="number" id="ratio-b-input" value="3" min="1" max="10" class="num-input">
        </div>
        <div class="input-pair">
          <label>Total Amount (Rand R):</label>
          <input type="number" id="ratio-total-input" value="150" min="5" max="10000" step="5" class="num-input">
        </div>
      </div>

      <div class="ratio-bar-display" id="ratio-bar-container"></div>

      <div class="ratio-summary-box" id="ratio-summary-box"></div>
    `;

    this.container.appendChild(card);

    const inputA = card.querySelector('#ratio-a-input');
    const inputB = card.querySelector('#ratio-b-input');
    const inputTotal = card.querySelector('#ratio-total-input');
    const barContainer = card.querySelector('#ratio-bar-container');
    const summaryBox = card.querySelector('#ratio-summary-box');

    const updateRatioBar = () => {
      const a = Math.max(1, parseInt(inputA.value, 10) || 1);
      const b = Math.max(1, parseInt(inputB.value, 10) || 1);
      const total = Math.max(1, parseFloat(inputTotal.value) || 0);

      const totalParts = a + b;
      const partValue = total / totalParts;
      const shareA = a * partValue;
      const shareB = b * partValue;

      let blocksHtml = '<div class="ratio-bar-track">';
      for (let i = 0; i < a; i++) {
        blocksHtml += `<div class="ratio-block part-a" title="Justin: 1 Part = R ${partValue.toFixed(2)}">R ${partValue.toFixed(0)}</div>`;
      }
      for (let j = 0; j < b; j++) {
        blocksHtml += `<div class="ratio-block part-b" title="Friend: 1 Part = R ${partValue.toFixed(2)}">R ${partValue.toFixed(0)}</div>`;
      }
      blocksHtml += '</div>';

      barContainer.innerHTML = blocksHtml;

      summaryBox.innerHTML = `
        <div class="ratio-step-pill">1. Total Parts = <strong>${a} + ${b} = ${totalParts} parts</strong></div>
        <div class="ratio-step-pill">2. Value of 1 Part = <strong>R ${total} ÷ ${totalParts} = R ${partValue.toFixed(2)}</strong></div>
        <div class="ratio-step-pill result">
          🎯 <strong>Justin receives:</strong> ${a} × R ${partValue.toFixed(2)} = <span style="color:#2563eb; font-weight:800;">R ${shareA.toFixed(2)}</span><br>
          🎯 <strong>Friend receives:</strong> ${b} × R ${partValue.toFixed(2)} = <span style="color:#059669; font-weight:800;">R ${shareB.toFixed(2)}</span>
        </div>
      `;
    };

    inputA.addEventListener('input', updateRatioBar);
    inputB.addEventListener('input', updateRatioBar);
    inputTotal.addEventListener('input', updateRatioBar);

    updateRatioBar();
  }
}

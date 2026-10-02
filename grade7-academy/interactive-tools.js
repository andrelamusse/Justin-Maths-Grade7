// interactive-tools.js - Interactive Virtual Math Labs for Grade 7
// Visual, hands-on manipulatives: Equation Balance, Fraction Wall, Angle Visualizer, Integer Thermometer

export class Grade7Tools {
  constructor() {
    this.activeTool = 'balance';
  }

  init() {
    this.cacheDom();
    this.bindEvents();
    this.renderCurrentTool();
  }

  cacheDom() {
    this.container = document.getElementById('tools-workspace');
    this.toolButtons = document.querySelectorAll('.tool-tab-btn');
  }

  bindEvents() {
    this.toolButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tool = e.currentTarget.dataset.tool;
        this.activeTool = tool;
        this.toolButtons.forEach(b => b.classList.toggle('active', b.dataset.tool === tool));
        this.renderCurrentTool();
      });
    });
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
    }
  }

  // --- 1. INTERACTIVE EQUATION BALANCE SCALE ---
  renderEquationBalance() {
    const card = document.createElement('div');
    card.className = 'tool-card balance-card';

    let leftX = 2;
    let leftUnits = 4;
    let rightX = 0;
    let rightUnits = 10;
    const xValue = 3; // Secret solution value

    const getLeftTotal = () => leftX * xValue + leftUnits;
    const getRightTotal = () => rightX * xValue + rightUnits;

    card.innerHTML = `
      <div class="tool-header">
        <h3>⚖️ Equation Balance Scale</h3>
        <p>An equation is true when both sides weigh the same. Solve: <strong>2x + 4 = 10</strong> by doing the exact same thing to both sides!</p>
      </div>

      <div class="scale-visual-area">
        <svg id="scale-svg" viewBox="0 0 600 240" class="scale-svg">
          <!-- Stand & Fulcrum -->
          <polygon points="300,160 280,220 320,220" fill="#475569"/>
          <rect x="250" y="218" width="100" height="12" rx="4" fill="#334155"/>
          <circle cx="300" cy="160" r="8" fill="#1e293b"/>

          <!-- Beam -->
          <g id="scale-beam" transform="rotate(0 300 160)">
            <rect x="100" y="156" width="400" height="8" rx="4" fill="#64748b"/>
            <!-- Left Pan Strings & Pan -->
            <line x1="120" y1="160" x2="80" y2="200" stroke="#94a3b8" stroke-width="2"/>
            <line x1="120" y1="160" x2="160" y2="200" stroke="#94a3b8" stroke-width="2"/>
            <path d="M 60,200 Q 120,220 180,200 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>

            <!-- Right Pan Strings & Pan -->
            <line x1="480" y1="160" x2="440" y2="200" stroke="#94a3b8" stroke-width="2"/>
            <line x1="480" y1="160" x2="520" y2="200" stroke="#94a3b8" stroke-width="2"/>
            <path d="M 420,200 Q 480,220 540,200 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
          </g>
        </svg>

        <div id="balance-status-badge" class="balance-badge balanced">Scale is Balanced! (Equal =)</div>
      </div>

      <div class="balance-controls-grid">
        <div class="pan-controls left-pan-ctrl">
          <h4>Left Side (<span id="left-expr-text">2x + 4</span>)</h4>
          <div class="btn-group">
            <button class="pill-btn add-btn" id="left-add-x">+ 1x Block</button>
            <button class="pill-btn sub-btn" id="left-sub-x">- 1x Block</button>
          </div>
          <div class="btn-group">
            <button class="pill-btn add-btn" id="left-add-unit">+ 1 Unit</button>
            <button class="pill-btn sub-btn" id="left-sub-unit">- 1 Unit</button>
          </div>
        </div>

        <div class="pan-controls right-pan-ctrl">
          <h4>Right Side (<span id="right-expr-text">10</span>)</h4>
          <div class="btn-group">
            <button class="pill-btn add-btn" id="right-add-x">+ 1x Block</button>
            <button class="pill-btn sub-btn" id="right-sub-x">- 1x Block</button>
          </div>
          <div class="btn-group">
            <button class="pill-btn add-btn" id="right-add-unit">+ 1 Unit</button>
            <button class="pill-btn sub-btn" id="right-sub-unit">- 1 Unit</button>
          </div>
        </div>
      </div>

      <div class="balance-actions-bar" style="display:flex; justify-content:center; gap:12px; margin-top:12px;">
        <button class="pill-btn add-btn" id="halve-both-btn" title="Divide both sides by 2">➗ Halve Both Sides (÷ 2)</button>
        <button class="pill-btn reset-btn" id="reset-balance-btn">↺ Reset to 2x + 4 = 10</button>
      </div>
    `;

    this.container.appendChild(card);

    const updateScaleVisual = () => {
      const beam = card.querySelector('#scale-beam');
      const badge = card.querySelector('#balance-status-badge');
      const leftExpr = card.querySelector('#left-expr-text');
      const rightExpr = card.querySelector('#right-expr-text');

      const formatExpr = (xCount, units) => {
        const parts = [];
        if (xCount > 0) parts.push(xCount === 1 ? 'x' : `${xCount}x`);
        if (units > 0) parts.push(`${units}`);
        if (parts.length === 0) return '0';
        return parts.join(' + ');
      };

      leftExpr.textContent = formatExpr(leftX, leftUnits);
      rightExpr.textContent = formatExpr(rightX, rightUnits);

      const leftW = getLeftTotal();
      const rightW = getRightTotal();
      const diff = leftW - rightW;

      let angle = 0;
      if (diff > 0) angle = -Math.min(15, diff * 2.5); // tilts left
      else if (diff < 0) angle = Math.min(15, Math.abs(diff) * 2.5); // tilts right

      if (beam) {
        beam.setAttribute('transform', `rotate(${angle} 300 160)`);
      }

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
        badge.textContent = `Left side is heavier!`;
      } else {
        badge.className = 'balance-badge lighter';
        badge.textContent = `Right side is heavier!`;
      }
    };

    // Button wiring
    card.querySelector('#left-add-x').onclick = () => { leftX++; updateScaleVisual(); };
    card.querySelector('#left-sub-x').onclick = () => { if (leftX > 0) leftX--; updateScaleVisual(); };
    card.querySelector('#left-add-unit').onclick = () => { leftUnits++; updateScaleVisual(); };
    card.querySelector('#left-sub-unit').onclick = () => { if (leftUnits > 0) leftUnits--; updateScaleVisual(); };

    card.querySelector('#right-add-x').onclick = () => { rightX++; updateScaleVisual(); };
    card.querySelector('#right-sub-x').onclick = () => { if (rightX > 0) rightX--; updateScaleVisual(); };
    card.querySelector('#right-add-unit').onclick = () => { rightUnits++; updateScaleVisual(); };
    card.querySelector('#right-sub-unit').onclick = () => { if (rightUnits > 0) rightUnits--; updateScaleVisual(); };

    card.querySelector('#halve-both-btn').onclick = () => {
      if (leftX % 2 === 0 && leftUnits % 2 === 0 && rightX % 2 === 0 && rightUnits % 2 === 0) {
        leftX /= 2; leftUnits /= 2; rightX /= 2; rightUnits /= 2;
        updateScaleVisual();
      } else {
        alert('Both sides must have even numbers of blocks and units to divide by 2 cleanly!');
      }
    };

    card.querySelector('#reset-balance-btn').onclick = () => {
      leftX = 2; leftUnits = 4; rightX = 0; rightUnits = 10;
      updateScaleVisual();
    };

    updateScaleVisual();
  }

  // --- 2. INTERACTIVE FRACTION WALL ---
  renderFractionWall() {
    const card = document.createElement('div');
    card.className = 'tool-card fraction-card';

    card.innerHTML = `
      <div class="tool-header">
        <h3>🧱 Interactive Fraction Wall</h3>
        <p>Click any fraction block to see equivalent fractions vertically align!</p>
      </div>

      <div class="fraction-wall-container" id="fraction-wall-grid">
        <!-- Rendered dynamically -->
      </div>
      <div class="selected-fraction-info" id="fraction-info-box">
        Tap any fraction strip to inspect its decimal and percentage value.
      </div>
    `;

    this.container.appendChild(card);

    const wallGrid = card.querySelector('#fraction-wall-grid');
    const infoBox = card.querySelector('#fraction-info-box');

    const denominations = [
      { name: '1 Whole', count: 1, color: '#3B82F6' },
      { name: '1/2 Halves', count: 2, color: '#10B981' },
      { name: '1/3 Thirds', count: 3, color: '#F59E0B' },
      { name: '1/4 Quarters', count: 4, color: '#EC4899' },
      { name: '1/5 Fifths', count: 5, color: '#8B5CF6' },
      { name: '1/6 Sixths', count: 6, color: '#06B6D4' },
      { name: '1/8 Eighths', count: 8, color: '#F97316' },
      { name: '1/10 Tenths', count: 10, color: '#6366F1' },
      { name: '1/12 Twelfths', count: 12, color: '#14B8A6' }
    ];

    denominations.forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = 'fraction-row';

      for (let i = 0; i < row.count; i++) {
        const block = document.createElement('div');
        block.className = 'fraction-block';
        block.dataset.num = i + 1;
        block.dataset.denom = row.count;
        block.style.backgroundColor = row.color;
        block.textContent = row.count === 1 ? '1' : `1/${row.count}`;

        block.onclick = () => {
          const selectedNumerator = i + 1;
          const selectedDenominator = row.count;
          const targetVal = selectedNumerator / selectedDenominator;

          // Find and highlight all blocks that align to this cumulative value
          const equivalents = [];
          document.querySelectorAll('.fraction-block').forEach(b => {
            const bNum = parseInt(b.dataset.num, 10);
            const bDenom = parseInt(b.dataset.denom, 10);
            const val = bNum / bDenom;
            if (Math.abs(val - targetVal) < 0.0001) {
              b.classList.add('selected-block');
              equivalents.push(bNum === bDenom ? '1' : `${bNum}/${bDenom}`);
            } else {
              b.classList.remove('selected-block');
            }
          });

          const dec = targetVal.toFixed(3);
          const pct = (targetVal * 100).toFixed(1);
          const eqText = equivalents.length > 1 ? equivalents.join(' = ') : `${selectedNumerator}/${selectedDenominator}`;

          infoBox.innerHTML = `
            <div style="font-size: 1.05rem; margin-bottom: 6px;">
              <strong>Equivalents Aligning:</strong> <span class="highlight-total" style="color:#059669; font-weight:800; font-size:1.15rem;">${eqText}</span>
            </div>
            <div>
              <span class="hl-badge">Decimal: ${dec}</span> 
              <span class="hl-badge">Percentage: ${pct}%</span>
            </div>
          `;
        };

        rowEl.appendChild(block);
      }
      wallGrid.appendChild(rowEl);
    });
  }

  // --- 3. INTERACTIVE ANGLE VISUALIZER & PROTRACTOR ---
  renderAngleVisualizer() {
    const card = document.createElement('div');
    card.className = 'tool-card angle-card';

    card.innerHTML = `
      <div class="tool-header">
        <h3>📐 Interactive Angle Visualizer</h3>
        <p>Drag the angle slider to see acute, right, obtuse, straight, and reflex angles in real time.</p>
      </div>

      <div class="angle-display-wrap">
        <svg id="angle-svg" viewBox="0 0 400 300" class="angle-svg"></svg>
      </div>

      <div class="angle-controls-bar">
        <label for="angle-slider" class="angle-slider-label">
          Angle: <strong id="angle-deg-label">65°</strong>
        </label>
        <input type="range" id="angle-slider" min="5" max="355" value="65" class="angle-range-slider">
      </div>

      <div class="angle-details-grid">
        <div class="angle-detail-chip">
          <small>Classification</small>
          <strong id="angle-class-name">Acute Angle (&lt; 90°)</strong>
        </div>
        <div class="angle-detail-chip">
          <small>Supplementary Partner (to 180°)</small>
          <strong id="supp-deg-label">115°</strong>
        </div>
        <div class="angle-detail-chip">
          <small>Complementary Partner (to 90°)</small>
          <strong id="comp-deg-label">25°</strong>
        </div>
      </div>
    `;

    this.container.appendChild(card);

    const slider = card.querySelector('#angle-slider');
    const degLabel = card.querySelector('#angle-deg-label');
    const classNameEl = card.querySelector('#angle-class-name');
    const suppLabel = card.querySelector('#supp-deg-label');
    const compLabel = card.querySelector('#comp-deg-label');
    const svg = card.querySelector('#angle-svg');

    const updateAngle = (deg) => {
      degLabel.textContent = `${deg}°`;

      // Classification
      if (deg < 90) classNameEl.textContent = 'Acute Angle (< 90°)';
      else if (deg === 90) classNameEl.textContent = 'Right Angle (= 90°)';
      else if (deg < 180) classNameEl.textContent = 'Obtuse Angle (90° - 180°)';
      else if (deg === 180) classNameEl.textContent = 'Straight Angle (= 180°)';
      else classNameEl.textContent = 'Reflex Angle (> 180°)';

      // Supplementary & Complementary
      suppLabel.textContent = deg <= 180 ? `${180 - deg}°` : 'N/A (> 180°)';
      compLabel.textContent = deg <= 90 ? `${90 - deg}°` : 'N/A (> 90°)';

      // Render SVG
      const cx = 200;
      const cy = 200;
      const r = 130;

      // Base ray (pointing right at 0 degrees)
      const baseEndX = cx + r;
      const baseEndY = cy;

      // Rotating ray
      const rad = (deg * Math.PI) / 180;
      const rotEndX = cx + r * Math.cos(-rad);
      const rotEndY = cy + r * Math.sin(-rad);

      // Arc
      const arcR = 45;
      const arcEndX = cx + arcR * Math.cos(-rad);
      const arcEndY = cy + arcR * Math.sin(-rad);
      const largeArcFlag = deg > 180 ? 1 : 0;
      const arcPath = `M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 ${largeArcFlag} 0 ${arcEndX} ${arcEndY}`;

      let svgHtml = `
        <!-- Vertex -->
        <circle cx="${cx}" cy="${cy}" r="6" fill="#1E293B"/>

        <!-- Arc sector -->
        <path d="${arcPath}" fill="none" stroke="#F59E0B" stroke-width="4"/>

        <!-- Base ray -->
        <line x1="${cx}" y1="${cy}" x2="${baseEndX}" y2="${baseEndY}" stroke="#2563EB" stroke-width="4" stroke-linecap="round"/>
        <polygon points="${baseEndX},${baseEndY - 5} ${baseEndX + 10},${baseEndY} ${baseEndX},${baseEndY + 5}" fill="#2563EB"/>

        <!-- Rotating ray -->
        <line x1="${cx}" y1="${cy}" x2="${rotEndX}" y2="${rotEndY}" stroke="#10B981" stroke-width="4" stroke-linecap="round"/>
      `;

      if (deg === 90) {
        // Right angle square indicator
        svgHtml += `<rect x="${cx}" y="${cy - 20}" width="20" height="20" fill="none" stroke="#DC2626" stroke-width="2"/>`;
      }

      svg.innerHTML = svgHtml;
    };

    slider.addEventListener('input', (e) => {
      updateAngle(parseInt(e.target.value, 10));
    });

    updateAngle(65);
  }

  // --- 4. INTEGER THERMOMETER ---
  renderIntegerThermometer() {
    const card = document.createElement('div');
    card.className = 'tool-card thermo-card';

    card.innerHTML = `
      <div class="tool-header">
        <h3>🌡️ Integer Thermometer</h3>
        <p>Visualize positive and negative numbers. Freezing point is 0°C. Cold is below zero (-), hot is above zero (+).</p>
      </div>

      <div class="thermo-display-grid">
        <div class="thermo-tube-area">
          <div class="thermo-scale">
            <span class="scale-mark pos">+20°C</span>
            <span class="scale-mark pos">+10°C</span>
            <span class="scale-mark zero">0°C (Freezing)</span>
            <span class="scale-mark neg">-10°C</span>
            <span class="scale-mark neg">-20°C</span>
          </div>
          <div class="thermo-tube">
            <div id="mercury-column" class="mercury-column"></div>
          </div>
        </div>

        <div class="thermo-interactive-col">
          <div class="current-temp-badge" id="temp-badge">Current: <strong>+5°C</strong></div>
          <div class="temp-control-buttons">
            <button class="pill-btn add-btn" id="warm-up-5-btn">🔥 +5°</button>
            <button class="pill-btn add-btn" id="warm-up-1-btn">🔺 +1°</button>
            <button class="pill-btn sub-btn" id="cool-down-1-btn">🔻 -1°</button>
            <button class="pill-btn sub-btn" id="cool-down-5-btn">❄️ -5°</button>
            <button class="pill-btn reset-btn" id="zero-temp-btn">0° Freeze</button>
          </div>
          <div class="temp-math-explanation" id="temp-math-box">
            At 5°C, the temperature is 5 units ABOVE zero.
          </div>
        </div>
      </div>
    `;

    this.container.appendChild(card);

    let temp = 5;
    const mercury = card.querySelector('#mercury-column');
    const badge = card.querySelector('#temp-badge');
    const box = card.querySelector('#temp-math-box');

    const updateThermo = () => {
      // Map -20 to +20 range onto 0% - 100% height
      const pct = Math.max(0, Math.min(100, ((temp + 20) / 40) * 100));
      mercury.style.height = `${pct}%`;
      mercury.style.backgroundColor = temp < 0 ? '#38BDF8' : '#EF4444';

      badge.innerHTML = `Current: <strong>${temp > 0 ? `+${temp}` : temp}°C</strong>`;
      if (temp > 0) {
        box.innerHTML = `☀️ Positive Integer: <strong>+${temp}</strong>. It is ${temp} degrees <em>above</em> zero.`;
      } else if (temp === 0) {
        box.innerHTML = `❄️ Zero: <strong>0°C</strong>. The exact baseline where positive and negative numbers meet!`;
      } else {
        box.innerHTML = `🧊 Negative Integer: <strong>${temp}</strong>. It is ${Math.abs(temp)} degrees <em>below</em> zero!`;
      }
    };

    card.querySelector('#warm-up-5-btn').onclick = () => { if (temp <= 15) temp += 5; updateThermo(); };
    card.querySelector('#warm-up-1-btn').onclick = () => { if (temp < 20) temp += 1; updateThermo(); };
    card.querySelector('#cool-down-1-btn').onclick = () => { if (temp > -20) temp -= 1; updateThermo(); };
    card.querySelector('#cool-down-5-btn').onclick = () => { if (temp >= -15) temp -= 5; updateThermo(); };
    card.querySelector('#zero-temp-btn').onclick = () => { temp = 0; updateThermo(); };

    updateThermo();
  }
}

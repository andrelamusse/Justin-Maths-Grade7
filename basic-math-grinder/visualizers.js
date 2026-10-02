// visualizers.js - Concrete-Pictorial-Abstract (CPA) Interactive Visualizations
// Specially engineered for learners who struggle to visualize numbers mentally.

export class MathVisualizer {
  constructor(containerElement) {
    this.container = containerElement;
  }

  clear() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }

  render(operation, a, b, result) {
    this.clear();
    if (!this.container) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'visualizer-wrapper';

    // Choose the best visual model for the problem
    if (operation === '+' || operation === '-') {
      const useTenFrame = (operation === '+' && (a + b) <= 20) || (operation === '-' && a <= 20);
      if (useTenFrame) {
        wrapper.appendChild(this.createTenFrameElement(operation, a, b, result));
        wrapper.appendChild(this.createNumberLineElement(operation, a, b, result));
      } else {
        wrapper.appendChild(this.createBaseTenElement(operation, a, b, result));
        wrapper.appendChild(this.createNumberLineElement(operation, a, b, result));
      }
    } else if (operation === '×' || operation === '*') {
      wrapper.appendChild(this.createArrayElement(a, b, result));
      wrapper.appendChild(this.createRepeatedAdditionElement(a, b, result));
    } else if (operation === '÷' || operation === '/') {
      wrapper.appendChild(this.createSharingElement(a, b, result));
    }

    this.container.appendChild(wrapper);
  }

  // --- 1. TEN-FRAME VISUALIZER ---
  createTenFrameElement(op, a, b, result) {
    const section = document.createElement('div');
    section.className = 'vis-section vis-ten-frame';

    const title = document.createElement('div');
    title.className = 'vis-title';
    title.textContent = op === '+' ? 'Ten-Frame (See how numbers build to 10)' : 'Ten-Frame (Take away)';
    section.appendChild(title);

    const framesContainer = document.createElement('div');
    framesContainer.className = 'ten-frames-row';

    if (op === '+') {
      const sum = a + b;
      const numFrames = sum > 10 ? 2 : 1;

      for (let f = 0; f < numFrames; f++) {
        const frameBox = document.createElement('div');
        frameBox.className = 'ten-frame-grid';
        frameBox.setAttribute('aria-label', `Ten-frame ${f + 1}`);

        for (let i = 0; i < 10; i++) {
          const slotIndex = f * 10 + i;
          const cell = document.createElement('div');
          cell.className = 'tf-cell';

          if (slotIndex < a) {
            const counter = document.createElement('span');
            counter.className = 'counter red-counter';
            counter.title = `Item ${slotIndex + 1} from ${a}`;
            cell.appendChild(counter);
          } else if (slotIndex < sum) {
            const counter = document.createElement('span');
            counter.className = 'counter blue-counter';
            counter.title = `Added item ${slotIndex - a + 1} from ${b}`;
            cell.appendChild(counter);
          }

          frameBox.appendChild(cell);
        }
        framesContainer.appendChild(frameBox);
      }

      // Friendly breakdown badge
      const badge = document.createElement('div');
      badge.className = 'vis-badge';
      if (sum > 10 && a < 10) {
        const neededFor10 = 10 - a;
        const remainder = b - neededFor10;
        badge.innerHTML = `<span class="tag-red">${a} red</span> + <span class="tag-blue">${neededFor10} blue (makes 10)</span> + <span class="tag-blue">${remainder} blue</span> = <strong>${sum}</strong>`;
      } else {
        badge.innerHTML = `<span class="tag-red">${a} red</span> + <span class="tag-blue">${b} blue</span> = <strong>${sum}</strong>`;
      }
      section.appendChild(framesContainer);
      section.appendChild(badge);

    } else if (op === '-') {
      // Subtraction: a dots total, cross out b dots
      const numFrames = a > 10 ? 2 : 1;
      for (let f = 0; f < numFrames; f++) {
        const frameBox = document.createElement('div');
        frameBox.className = 'ten-frame-grid';

        for (let i = 0; i < 10; i++) {
          const slotIndex = f * 10 + i;
          const cell = document.createElement('div');
          cell.className = 'tf-cell';

          if (slotIndex < a) {
            const counter = document.createElement('span');
            // If slotIndex is in the last b items, mark as crossed out
            if (slotIndex >= a - b) {
              counter.className = 'counter crossed-counter';
              counter.innerHTML = '&times;';
              counter.title = 'Taken away';
            } else {
              counter.className = 'counter red-counter';
              counter.title = 'Remaining';
            }
            cell.appendChild(counter);
          }
          frameBox.appendChild(cell);
        }
        framesContainer.appendChild(frameBox);
      }

      const badge = document.createElement('div');
      badge.className = 'vis-badge';
      badge.innerHTML = `Started with <strong>${a}</strong>, crossed out <strong>${b}</strong> &rarr; <strong>${result}</strong> left`;
      section.appendChild(framesContainer);
      section.appendChild(badge);
    }

    return section;
  }

  // --- 2. BASE-TEN BLOCKS (DIENES) VISUALIZER ---
  createBaseTenElement(op, a, b, result) {
    const section = document.createElement('div');
    section.className = 'vis-section vis-base-ten';

    const title = document.createElement('div');
    title.className = 'vis-title';
    title.textContent = 'Base-10 Blocks (Tens & Ones Place Value)';
    section.appendChild(title);

    const aTens = Math.floor(a / 10);
    const aOnes = a % 10;
    const bTens = Math.floor(b / 10);
    const bOnes = b % 10;

    const rowsContainer = document.createElement('div');
    rowsContainer.className = 'base-ten-rows';

    // First number
    const row1 = this.renderBlockRow(a, aTens, aOnes, 'Number 1');
    rowsContainer.appendChild(row1);

    // Operator symbol badge
    const opBadge = document.createElement('div');
    opBadge.className = 'base-ten-op-divider';
    opBadge.innerHTML = `<span>${op}</span>`;
    rowsContainer.appendChild(opBadge);

    // Second number
    const row2 = this.renderBlockRow(b, bTens, bOnes, 'Number 2');
    rowsContainer.appendChild(row2);

    section.appendChild(rowsContainer);

    // Summary calculation
    const summary = document.createElement('div');
    summary.className = 'base-ten-summary';

    if (op === '+') {
      const totalTensVal = (aTens + bTens) * 10;
      const totalOnesVal = aOnes + bOnes;
      let carryNote = '';
      if (totalOnesVal >= 10) {
        carryNote = `<div class="carry-alert">💡 <strong>Look closely at the ones:</strong> ${aOnes} + ${bOnes} = ${totalOnesVal}. 10 of these ones trade into 1 new Ten rod!</div>`;
      }
      summary.innerHTML = `
        <div class="summary-steps">
          <div class="step-chip tens-chip">Tens: ${aTens * 10} + ${bTens * 10} = ${totalTensVal}</div>
          <div class="step-chip ones-chip">Ones: ${aOnes} + ${bOnes} = ${totalOnesVal}</div>
          <div class="step-chip result-chip">Total: ${totalTensVal} + ${totalOnesVal} = <strong>${result}</strong></div>
        </div>
        ${carryNote}
      `;
    } else {
      // Subtraction
      if (aOnes >= bOnes) {
        summary.innerHTML = `
          <div class="summary-steps">
            <div class="step-chip tens-chip">Tens: ${aTens * 10} - ${bTens * 10} = ${(aTens - bTens) * 10}</div>
            <div class="step-chip ones-chip">Ones: ${aOnes} - ${bOnes} = ${aOnes - bOnes}</div>
            <div class="step-chip result-chip">Total Remaining: <strong>${result}</strong></div>
          </div>
        `;
      } else {
        // Regrouping / Borrowing
        const regroupedTens = (aTens - 1) * 10;
        const regroupedOnes = aOnes + 10;
        const finalTens = (aTens - 1 - bTens) * 10;
        const finalOnes = regroupedOnes - bOnes;
        summary.innerHTML = `
          <div class="summary-steps">
            <div class="step-chip tens-chip">Tens (Regrouped): ${regroupedTens} - ${bTens * 10} = ${finalTens}</div>
            <div class="step-chip ones-chip">Ones (Unbundled): ${regroupedOnes} - ${bOnes} = ${finalOnes}</div>
            <div class="step-chip result-chip">Total Remaining: <strong>${result}</strong></div>
          </div>
          <div class="carry-alert">💡 <strong>Regrouping:</strong> ${aOnes} is smaller than ${bOnes}. We trade 1 Ten rod into 10 Ones cubes! That gives ${regroupedOnes} ones.</div>
        `;
      }
    }

    section.appendChild(summary);
    return section;
  }

  renderBlockRow(num, tens, ones, label) {
    const row = document.createElement('div');
    row.className = 'base-ten-row';

    const labelEl = document.createElement('div');
    labelEl.className = 'row-label';
    labelEl.innerHTML = `<strong>${num}</strong> <small>(${tens} tens, ${ones} ones)</small>`;
    row.appendChild(labelEl);

    const blocksArea = document.createElement('div');
    blocksArea.className = 'blocks-area';

    // Tens rods
    const tensGroup = document.createElement('div');
    tensGroup.className = 'tens-group';
    for (let t = 0; t < tens; t++) {
      const rod = document.createElement('div');
      rod.className = 'ten-rod';
      rod.title = 'Ten Rod (10)';
      for (let s = 0; s < 10; s++) {
        const seg = document.createElement('div');
        seg.className = 'rod-segment';
        rod.appendChild(seg);
      }
      tensGroup.appendChild(rod);
    }
    blocksArea.appendChild(tensGroup);

    // Ones cubes
    const onesGroup = document.createElement('div');
    onesGroup.className = 'ones-group';
    for (let o = 0; o < ones; o++) {
      const cube = document.createElement('div');
      cube.className = 'one-cube';
      cube.title = 'One Unit (1)';
      onesGroup.appendChild(cube);
    }
    blocksArea.appendChild(onesGroup);

    row.appendChild(blocksArea);
    return row;
  }

  // --- 3. INTERACTIVE NUMBER LINE (FROG LEAP) ---
  createNumberLineElement(op, a, b, result) {
    const section = document.createElement('div');
    section.className = 'vis-section vis-number-line';

    const title = document.createElement('div');
    title.className = 'vis-title';
    title.textContent = 'Number Line (Step-by-Step Jump)';
    section.appendChild(title);

    const svgWrapper = document.createElement('div');
    svgWrapper.className = 'number-line-svg-container';

    // Compute range of number line
    let minVal = 0;
    let maxVal = 20;

    if (op === '+') {
      minVal = Math.max(0, Math.floor((Math.min(a, result) - 2) / 5) * 5);
      maxVal = Math.ceil((result + 3) / 5) * 5;
    } else {
      minVal = Math.max(0, Math.floor((Math.min(result, a) - 2) / 5) * 5);
      maxVal = Math.ceil((a + 3) / 5) * 5;
    }
    if (maxVal - minVal < 10) maxVal = minVal + 10;

    const totalSpan = maxVal - minVal;
    const svgWidth = 650;
    const svgHeight = 110;
    const lineY = 75;
    const padX = 40;
    const plotWidth = svgWidth - padX * 2;

    const valToX = (v) => padX + ((v - minVal) / totalSpan) * plotWidth;

    let svgHtml = `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="number-line-svg">`;
    // Baseline
    svgHtml += `<line x1="${padX - 10}" y1="${lineY}" x2="${svgWidth - padX + 10}" y2="${lineY}" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>`;
    // Arrows
    svgHtml += `<polygon points="${padX - 12},${lineY} ${padX - 4},${lineY - 4} ${padX - 4},${lineY + 4}" fill="#64748b"/>`;
    svgHtml += `<polygon points="${svgWidth - padX + 12},${lineY} ${svgWidth - padX + 4},${lineY - 4} ${svgWidth - padX + 4},${lineY + 4}" fill="#64748b"/>`;

    // Ticks
    const tickStep = totalSpan > 30 ? 5 : 1;
    const tickSet = new Set();
    for (let v = minVal; v <= maxVal; v += tickStep) {
      tickSet.add(v);
    }
    tickSet.add(a);
    tickSet.add(result);
    const sortedTicks = Array.from(tickSet).filter(v => v >= minVal && v <= maxVal).sort((x, y) => x - y);

    for (const v of sortedTicks) {
      const x = valToX(v);
      const isKey = v === a || v === result;
      const isMajor = v % 5 === 0;
      const tickH = isKey ? 15 : (isMajor ? 14 : 8);
      const strokeW = isKey ? 2.5 : (isMajor ? 2 : 1.5);
      const strokeCol = isKey ? (v === result ? (op === '+' ? '#10b981' : '#f59e0b') : '#3b82f6') : (isMajor ? '#64748b' : '#94a3b8');
      svgHtml += `<line x1="${x}" y1="${lineY - tickH}" x2="${x}" y2="${lineY + tickH}" stroke="${strokeCol}" stroke-width="${strokeW}"/>`;
      if (isMajor || isKey) {
        const textCol = isKey ? (v === result ? (op === '+' ? '#10b981' : '#f59e0b') : '#2563eb') : '#475569';
        svgHtml += `<text x="${x}" y="${lineY + 26}" font-size="12" font-weight="${isKey ? 'bold' : 'normal'}" fill="${textCol}" text-anchor="middle">${v}</text>`;
      }
    }

    // Jumps
    const startX = valToX(a);
    const endX = valToX(result);

    // Draw jump arc
    const arcHeight = Math.min(45, Math.abs(endX - startX) * 0.35 + 15);
    const midX = (startX + endX) / 2;
    const arcControlY = lineY - arcHeight;

    const strokeColor = op === '+' ? '#10b981' : '#f59e0b';
    const arcPath = `M ${startX} ${lineY} Q ${midX} ${arcControlY} ${endX} ${lineY}`;
    svgHtml += `<path d="${arcPath}" fill="none" stroke="${strokeColor}" stroke-width="3" stroke-dasharray="4,2"/>`;

    // Arc jump label
    const jumpLabel = op === '+' ? `+${b}` : `-${b}`;
    svgHtml += `<rect x="${midX - 22}" y="${arcControlY - 18}" width="44" height="20" rx="10" fill="${strokeColor}"/>`;
    svgHtml += `<text x="${midX}" y="${arcControlY - 4}" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">${jumpLabel}</text>`;

    // Start point dot
    svgHtml += `<circle cx="${startX}" cy="${lineY}" r="6" fill="#3b82f6"/>`;
    svgHtml += `<text x="${startX}" y="${lineY - 10}" font-size="11" font-weight="bold" fill="#3b82f6" text-anchor="middle">Start (${a})</text>`;

    // End point dot
    svgHtml += `<circle cx="${endX}" cy="${lineY}" r="7" fill="${strokeColor}"/>`;
    svgHtml += `<text x="${endX}" y="${lineY - 10}" font-size="11" font-weight="bold" fill="${strokeColor}" text-anchor="middle">Landed: ${result}</text>`;

    svgHtml += `</svg>`;
    svgWrapper.innerHTML = svgHtml;
    section.appendChild(svgWrapper);

    return section;
  }

  // --- 4. MULTIPLICATION ARRAY GRID ---
  createArrayElement(a, b, result) {
    const section = document.createElement('div');
    section.className = 'vis-section vis-array';

    const title = document.createElement('div');
    title.className = 'vis-title';
    title.textContent = `Dot Array (${a} rows of ${b})`;
    section.appendChild(title);

    const arrayBox = document.createElement('div');
    arrayBox.className = 'array-grid-box';
    arrayBox.style.gridTemplateColumns = `repeat(${b}, 1fr)`;

    for (let r = 0; r < a; r++) {
      for (let c = 0; c < b; c++) {
        const dot = document.createElement('div');
        dot.className = 'array-dot';
        dot.title = `Row ${r + 1}, Col ${c + 1}`;
        dot.innerHTML = `<span class="dot-inner"></span>`;
        arrayBox.appendChild(dot);
      }
    }

    section.appendChild(arrayBox);

    const footer = document.createElement('div');
    footer.className = 'vis-badge';
    footer.innerHTML = `<strong>${a}</strong> groups of <strong>${b}</strong> = <strong>${result}</strong> dots`;
    section.appendChild(footer);

    return section;
  }

  // Repeated addition breakdown for multiplication
  createRepeatedAdditionElement(a, b, result) {
    const section = document.createElement('div');
    section.className = 'vis-section vis-repeated-add';

    const title = document.createElement('div');
    title.className = 'vis-title';
    title.textContent = 'Repeated Addition (Skip Counting)';
    section.appendChild(title);

    const parts = Array(a).fill(b);
    const expr = parts.join(' + ');

    const row = document.createElement('div');
    row.className = 'repeated-addition-row';
    row.innerHTML = `<span class="rep-expr">${expr}</span> = <strong class="rep-result">${result}</strong>`;
    section.appendChild(row);

    return section;
  }

  // --- 5. DIVISION SHARING GROUPS ---
  createSharingElement(a, b, result) {
    const section = document.createElement('div');
    section.className = 'vis-section vis-sharing';

    const title = document.createElement('div');
    title.className = 'vis-title';
    title.textContent = `Equal Sharing (${a} items shared into ${b} groups)`;
    section.appendChild(title);

    const groupsContainer = document.createElement('div');
    groupsContainer.className = 'sharing-groups-container';

    for (let g = 0; g < b; g++) {
      const groupCard = document.createElement('div');
      groupCard.className = 'sharing-group-card';

      const groupHeader = document.createElement('div');
      groupHeader.className = 'group-header';
      groupHeader.textContent = `Group ${g + 1}`;
      groupCard.appendChild(groupHeader);

      const itemsGrid = document.createElement('div');
      itemsGrid.className = 'group-items-grid';

      for (let i = 0; i < result; i++) {
        const item = document.createElement('span');
        item.className = 'sharing-token';
        itemsGrid.appendChild(item);
      }
      groupCard.appendChild(itemsGrid);

      const countBadge = document.createElement('div');
      countBadge.className = 'group-count-badge';
      countBadge.textContent = `${result} items`;
      groupCard.appendChild(countBadge);

      groupsContainer.appendChild(groupCard);
    }

    section.appendChild(groupsContainer);

    const footer = document.createElement('div');
    footer.className = 'vis-badge';
    footer.innerHTML = `<strong>${a}</strong> divided by <strong>${b}</strong> = <strong>${result}</strong> in each group`;
    section.appendChild(footer);

    return section;
  }
}

// visualizers.test.js - Unit tests for visualizer mathematical models
import test from 'node:test';
import assert from 'node:assert/strict';

// Test Ten-Frame slot mapping
function computeTenFrameSlots(op, a, b) {
  if (op === '+') {
    const sum = a + b;
    const numFrames = sum > 10 ? 2 : 1;
    let redCount = 0;
    let blueCount = 0;
    for (let f = 0; f < numFrames; f++) {
      for (let i = 0; i < 10; i++) {
        const slot = f * 10 + i;
        if (slot < a) redCount++;
        else if (slot < sum) blueCount++;
      }
    }
    return { numFrames, redCount, blueCount, total: redCount + blueCount };
  } else if (op === '-') {
    const numFrames = a > 10 ? 2 : 1;
    let remaining = 0;
    let crossed = 0;
    for (let f = 0; f < numFrames; f++) {
      for (let i = 0; i < 10; i++) {
        const slot = f * 10 + i;
        if (slot < a) {
          if (slot >= a - b) crossed++;
          else remaining++;
        }
      }
    }
    return { numFrames, remaining, crossed, initial: remaining + crossed };
  }
}

// Test Base-Ten block decomposition
function decomposeBaseTen(num) {
  const tens = Math.floor(num / 10);
  const ones = num % 10;
  return { tens, ones, tensValue: tens * 10, onesValue: ones, total: tens * 10 + ones };
}

test('Ten-frame slot calculations for single and double frames', () => {
  // 1+4
  const tf1 = computeTenFrameSlots('+', 1, 4);
  assert.equal(tf1.numFrames, 1);
  assert.equal(tf1.redCount, 1);
  assert.equal(tf1.blueCount, 4);
  assert.equal(tf1.total, 5);

  // 7+5 (bridges 10)
  const tf2 = computeTenFrameSlots('+', 7, 5);
  assert.equal(tf2.numFrames, 2);
  assert.equal(tf2.redCount, 7);
  assert.equal(tf2.blueCount, 5);
  assert.equal(tf2.total, 12);

  // 14 - 6
  const tf3 = computeTenFrameSlots('-', 14, 6);
  assert.equal(tf3.numFrames, 2);
  assert.equal(tf3.initial, 14);
  assert.equal(tf3.crossed, 6);
  assert.equal(tf3.remaining, 8);
});

test('Base-ten block decomposition correctly handles tens and ones', () => {
  const d34 = decomposeBaseTen(34);
  assert.equal(d34.tens, 3);
  assert.equal(d34.ones, 4);
  assert.equal(d34.total, 34);

  const d23 = decomposeBaseTen(23);
  assert.equal(d23.tens, 2);
  assert.equal(d23.ones, 3);
  assert.equal(d23.total, 23);

  // Combine 34 + 23
  const totalTens = (d34.tens + d23.tens) * 10;
  const totalOnes = d34.ones + d23.ones;
  assert.equal(totalTens + totalOnes, 57);
});

test('Multiplication array dimension logic', () => {
  const a = 2;
  const b = 4;
  const totalDots = a * b;
  assert.equal(totalDots, 8);
  const repeatedAdd = Array(a).fill(b).reduce((acc, curr) => acc + curr, 0);
  assert.equal(repeatedAdd, 8);
});

test('Division equal sharing distribution logic', () => {
  const a = 12;
  const b = 3;
  const perGroup = a / b;
  assert.equal(perGroup, 4);
  assert.equal(perGroup * b, a);
});

test('Ten-frame eligibility for teen subtraction where a + b > 20', () => {
  // E.g. 17 - 9: sum is 26 > 20, but a is 17 <= 20, which fits in 2 ten-frames
  const op = '-';
  const a = 17;
  const b = 9;
  const useTenFrame = (op === '+' && (a + b) <= 20) || (op === '-' && a <= 20);
  assert.ok(useTenFrame, '17 - 9 must qualify for Ten-Frames');

  const tf = computeTenFrameSlots('-', 17, 9);
  assert.equal(tf.numFrames, 2);
  assert.equal(tf.crossed, 9);
  assert.equal(tf.remaining, 8);
});

test('Base-ten block subtraction with regrouping produces valid place-value components', () => {
  const a = 52;
  const b = 28;
  const aTens = Math.floor(a / 10);
  const aOnes = a % 10;
  const bTens = Math.floor(b / 10);
  const bOnes = b % 10;

  assert.ok(aOnes < bOnes, 'Should require borrowing');

  // Regrouping logic
  const regroupedTens = (aTens - 1) * 10;
  const regroupedOnes = aOnes + 10;
  const finalTens = (aTens - 1 - bTens) * 10;
  const finalOnes = regroupedOnes - bOnes;

  assert.ok(finalTens >= 0, 'Final tens cannot be negative');
  assert.ok(finalOnes >= 0, 'Final ones cannot be negative');
  assert.equal(finalTens + finalOnes, 24, '52 - 28 must equal 24');
  assert.equal(regroupedOnes, 12, '2 ones regrouped with 1 ten becomes 12 ones');
});

test('Fraction wall equivalence alignment logic', () => {
  const targetNum = 1;
  const targetDenom = 2;
  const targetVal = targetNum / targetDenom;

  const testDenoms = [1, 2, 3, 4, 5, 6, 8, 10, 12];
  const matches = [];

  for (const denom of testDenoms) {
    for (let num = 1; num <= denom; num++) {
      if (Math.abs((num / denom) - targetVal) < 0.0001) {
        matches.push(`${num}/${denom}`);
      }
    }
  }

  assert.ok(matches.includes('1/2'));
  assert.ok(matches.includes('2/4'));
  assert.ok(matches.includes('3/6'));
  assert.ok(matches.includes('4/8'));
  assert.ok(matches.includes('5/10'));
  assert.ok(matches.includes('6/12'));
  assert.equal(matches.length, 6, 'Should find 6 equivalent representations for 1/2');
});

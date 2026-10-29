// ratio.js - Grade 7 Ratio & Rate Exam Cram Engine
// Built for Justin: Visual Bar Models, Verbal Coaching, 10 Core Grade 7 Ratio Topics, 3 Mock Exams & Cheat Sheet.

import { sound } from './audio.js';

export function gcd(a, b) {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

export function gcd3(a, b, c) {
  return gcd(gcd(a, b), c);
}

export function simplifyRatio(a, b) {
  const divisor = gcd(a, b);
  return `${Math.round(a / divisor)}:${Math.round(b / divisor)}`;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const RATIO_TOPICS = [
  {
    id: 'writing',
    num: 1,
    name: '1. Writing Ratios (a:b)',
    shortName: '1. Write a:b',
    icon: '✍️',
    desc: 'Part-to-part and part-to-whole ratios from counts'
  },
  {
    id: 'simplify',
    num: 2,
    name: '2. Simplifying & Units',
    shortName: '2. Simplify',
    icon: '✂️',
    desc: 'Simplify ratios & convert cm/m, g/kg, R/c, min/hr first'
  },
  {
    id: 'equivalent',
    num: 3,
    name: '3. Missing Value (x)',
    shortName: '3. Missing x',
    icon: '🔍',
    desc: 'Equivalent ratios like 2 : 5 = x : 20'
  },
  {
    id: 'sharing',
    num: 4,
    name: '4. Sharing in a Ratio',
    shortName: '4. Share Total',
    icon: '🍰',
    desc: 'Divide an amount into 2-part or 3-part ratios'
  },
  {
    id: 'one_part',
    num: 5,
    name: '5. Given One Part',
    shortName: '5. Given 1 Part',
    icon: '🧩',
    desc: 'Find the other part or total when given one share'
  },
  {
    id: 'fractions_pct',
    num: 6,
    name: '6. Ratio ↔ % & Compare',
    shortName: '6. Ratio & %',
    icon: '💯',
    desc: 'Convert ratios to fractions/percentages & compare'
  },
  {
    id: 'unit_rates',
    num: 7,
    name: '7. Speed & Unit Rates',
    shortName: '7. Unit Rates',
    icon: '🚗',
    desc: 'Speed (km/h), price per kg (R/kg), and rate per minute'
  },
  {
    id: 'proportion_best_buy',
    num: 8,
    name: '8. Proportion & Best Buy',
    shortName: '8. Best Buy',
    icon: '🛒',
    desc: 'Direct proportion scaling and cheapest unit price'
  },
  {
    id: 'scale_maps',
    num: 9,
    name: '9. Map Scales & Recipes',
    shortName: '9. Scales',
    icon: '🗺️',
    desc: 'Map scale 1 : n and scaling recipe ingredients'
  },
  {
    id: 'word_problems',
    num: 10,
    name: '10. Exam Word Problems',
    shortName: '10. Exam Mix',
    icon: '🏆',
    desc: 'Full Grade 7 exam word problems combining ratio skills'
  }
];

export const RATIO_SUB_CATEGORIES = [
  { id: 'easy', name: 'Easy', icon: '🌱', desc: 'Step-by-step foundation questions' },
  { id: 'medium', name: 'Medium', icon: '⚡', desc: 'Standard Grade 7 test questions' },
  { id: 'hard', name: 'Hard', icon: '🔥', desc: 'Tricky unit conversions & multi-step exam problems' },
  { id: 'all', name: 'All (Gradual)', icon: '🚀', desc: 'Starts easy and ramps up as your streak grows' }
];

export const CHEAT_SHEET_DATA = [
  {
    title: '1. Order Matters in Ratios!',
    badge: 'Rule #1',
    lines: [
      'The order of words matches the order of numbers.',
      'Example: "3 dogs to 5 cats" is 3:5 (NEVER 5:3).',
      'Watch out for "to the TOTAL": add all parts together for the total!'
    ]
  },
  {
    title: '2. Simplifying & Unit Conversions',
    badge: 'Same Units First!',
    lines: [
      'Divide both numbers by the biggest number that goes into both (HCF).',
      'Different units? Convert the BIG unit into the SMALL unit first:',
      '1 m = 100 cm  •  1 km = 1000 m  •  1 kg = 1000 g  •  R1 = 100c  •  1 hr = 60 min'
    ]
  },
  {
    title: '3. The 3-Step Box Trick (Sharing in a Ratio)',
    badge: 'Exam Favourite',
    lines: [
      'Step 1 (Add): Add the ratio parts to get Total Parts (e.g. 2 + 3 = 5 parts).',
      'Step 2 (Divide): Find 1 part = Total Amount ÷ Total Parts (e.g. R100 ÷ 5 = R20).',
      'Step 3 (Multiply): Multiply 1 part by the share you want (e.g. 3 × R20 = R60).'
    ]
  },
  {
    title: '4. Equivalent Ratios (Arrow Multiplier)',
    badge: '2 : 5 = x : 20',
    lines: [
      'Look at the pair you know: How did 5 become 20? We multiplied by 4 (20 ÷ 5 = 4).',
      'Do the EXACT same to the other side: x = 2 × 4 = 8.',
      'Whatever you multiply or divide on the left, do the same on the right!'
    ]
  },
  {
    title: '5. Ratios to Percentages (%)',
    badge: 'Total = 100%',
    lines: [
      'Step 1: Add the parts to find the denominator (e.g. 1 : 3 has 1 + 3 = 4 parts).',
      'Step 2: Find what 1 part is worth out of 100%: 100 ÷ 4 = 25%.',
      'Step 3: Multiply by the part asked (e.g. 3 parts × 25% = 75%).'
    ]
  },
  {
    title: '6. Speed, Unit Rates & Best Buy',
    badge: 'Find 1 Unit!',
    lines: [
      'Unit Rate = Total ÷ Count (e.g. R45 for 3 kg → 45 ÷ 3 = R15 per 1 kg).',
      'Speed = Distance ÷ Time (e.g. 240 km in 3 hours → 240 ÷ 3 = 80 km/h).',
      'Best Buy = Compare the price of 1 single item. Smaller unit price wins!'
    ]
  }
];

const COPRIME_PAIRS = [
  [1, 2], [1, 3], [2, 3], [1, 4], [3, 4],
  [1, 5], [2, 5], [3, 5], [4, 5], [1, 6],
  [5, 6], [2, 7], [3, 7], [4, 7], [5, 7],
  [3, 8], [5, 8], [7, 8], [2, 9], [4, 9]
];

export class RatioExamApp {
  constructor() {
    this.currentView = 'practice'; // 'practice' | 'mock' | 'cheatsheet'
    this.currentTopic = 'writing'; // topic id or 'weak_filter'
    this.currentSubCategory = 'all'; // default to Gradual Ramp-Up for Justin
    this.weakTopics = [];
    this.currentQuestion = null;
    this.userAnswer = '';
    this.streak = 0;
    this.bestStreak = 0;
    this.totalSolved = 0;
    this.xp = 0;
    this.isSpeaking = false;
    this.timerEnabled = false;
    this.timerSeconds = 0;
    this.timerInterval = null;

    // Mock exam state
    this.activeMock = null; // { id, title, questions, index, answers, completed }

    this.settings = {
      font: 'lexend',
      theme: 'cream',
      soundFx: true
    };

    this.loadState();
  }

  loadState() {
    try {
      if (typeof localStorage === 'undefined') return;
      const saved = localStorage.getItem('justin_ratio_cram_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.streak = parsed.streak || 0;
        this.bestStreak = parsed.bestStreak || 0;
        this.totalSolved = parsed.totalSolved || 0;
        this.xp = parsed.xp || 0;
        if (parsed.currentTopic) this.currentTopic = parsed.currentTopic;
        if (parsed.currentSubCategory) this.currentSubCategory = parsed.currentSubCategory;
        if (Array.isArray(parsed.weakTopics)) this.weakTopics = parsed.weakTopics;
        if (parsed.settings) this.settings = { ...this.settings, ...parsed.settings };
      }
    } catch (e) {
      console.warn('Could not load saved ratio state', e);
    }
  }

  saveState() {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem('justin_ratio_cram_v1', JSON.stringify({
        streak: this.streak,
        bestStreak: this.bestStreak,
        totalSolved: this.totalSolved,
        xp: this.xp,
        currentTopic: this.currentTopic,
        currentSubCategory: this.currentSubCategory,
        weakTopics: this.weakTopics,
        settings: this.settings
      }));
    } catch (e) {
      console.warn('Could not save ratio state', e);
    }
  }

  getProgressiveTier(streak = this.streak) {
    if (streak >= 6) return 'hard';
    if (streak >= 3) return 'medium';
    return 'easy';
  }

  // =========================================================================
  // 10 TOPIC GENERATORS (Easy, Medium, Hard)
  // =========================================================================

  generateTopic1Writing(tier) {
    const [a, b] = pick(COPRIME_PAIRS);
    const items = pick([
      { nameA: 'red apples', nameB: 'green apples', whole: 'apples', colorA: '#EF4444', colorB: '#10B981' },
      { nameA: 'blue marbles', nameB: 'yellow marbles', whole: 'marbles', colorA: '#3B82F6', colorB: '#F59E0B' },
      { nameA: 'boys', nameB: 'girls', whole: 'learners', colorA: '#2563EB', colorB: '#8B5CF6' },
      { nameA: 'dogs', nameB: 'cats', whole: 'pets', colorA: '#D97706', colorB: '#EC4899' }
    ]);

    if (tier === 'easy') {
      const ans = `${a}:${b}`;
      return {
        topicId: 'writing',
        tier,
        marks: 1,
        answerType: 'ratio',
        prompt: `In a group, there are ${a} ${items.nameA} and ${b} ${items.nameB}. Write the ratio of ${items.nameA} to ${items.nameB} in the form a:b.`,
        equationDisplay: `${a} : ${b}`,
        answer: ans,
        unitSuffix: '',
        tip: `Rule: First word goes first! Count ${items.nameA} (${a}), put a colon (:), then count ${items.nameB} (${b}).`,
        verbal: `Look at the order of the words. First it asks for ${items.nameA}, which is ${a}. Next it asks for ${items.nameB}, which is ${b}. So we write ${a} colon ${b}.`,
        steps: [
          `Step 1: Count the first group (${items.nameA}) = ${a}.`,
          `Step 2: Count the second group (${items.nameB}) = ${b}.`,
          `Step 3: Put them in order with a colon: ${a}:${b}.`
        ],
        barModel: {
          title: `Visual Count: ${a} ${items.nameA} and ${b} ${items.nameB}`,
          groups: [
            { label: items.nameA, count: a, boxText: '1', color: items.colorA },
            { label: items.nameB, count: b, boxText: '1', color: items.colorB }
          ],
          summary: `${items.nameA} (${a}) : ${items.nameB} (${b})`
        }
      };
    } else if (tier === 'medium') {
      const total = a + b;
      const ans = `${a}:${total}`;
      return {
        topicId: 'writing',
        tier,
        marks: 2,
        answerType: 'ratio',
        prompt: `A basket has ${a} ${items.nameA} and ${b} ${items.nameB}. Write the ratio of ${items.nameA} to the TOTAL number of ${items.whole}.`,
        equationDisplay: `${a} to Total`,
        answer: ans,
        unitSuffix: '',
        tip: `Watch out for "TOTAL"! Add both groups (${a} + ${b} = ${total}) to get the second number of your ratio.`,
        verbal: `This question asks for ${items.nameA} compared to the total. There are ${a} ${items.nameA}. For the total, add ${a} plus ${b} which is ${total}. So the ratio is ${a} colon ${total}.`,
        steps: [
          `Step 1: Number of ${items.nameA} = ${a}.`,
          `Step 2: Find the TOTAL ${items.whole} = ${a} + ${b} = ${total}.`,
          `Step 3: Write ${items.nameA} to total = ${a}:${total}.`
        ],
        barModel: {
          title: `Part-to-Whole: ${a} out of ${total} total`,
          groups: [
            { label: items.nameA, count: a, boxText: '1', color: items.colorA },
            { label: items.nameB, count: b, boxText: '1', color: items.colorB }
          ],
          summary: `Total = ${a} + ${b} = ${total} parts`
        }
      };
    } else {
      const total = a + b;
      const ans = `${b}:${a}`;
      return {
        topicId: 'writing',
        tier,
        marks: 2,
        answerType: 'ratio',
        prompt: `There are ${total} ${items.whole} altogether. ${a} of them are ${items.nameA} and the rest are ${items.nameB}. Write the ratio of ${items.nameB} to ${items.nameA}.`,
        equationDisplay: `${items.nameB} : ${items.nameA}`,
        answer: ans,
        unitSuffix: '',
        tip: `1) Subtract from the total to find ${items.nameB}: ${total} - ${a} = ${b}. 2) Put ${items.nameB} FIRST in your ratio!`,
        verbal: `First find how many ${items.nameB} there are by subtracting ${a} from the total ${total}, which leaves ${b}. The question asks for ${items.nameB} first and ${items.nameA} second, so write ${b} colon ${a}.`,
        steps: [
          `Step 1: Find ${items.nameB} = Total ${total} minus ${a} = ${b}.`,
          `Step 2: Check the order asked: ${items.nameB} first (${b}), then ${items.nameA} (${a}).`,
          `Step 3: Write the ratio: ${b}:${a}.`
        ],
        barModel: {
          title: `Total = ${total} (${a} ${items.nameA}, so ${b} ${items.nameB})`,
          groups: [
            { label: items.nameB, count: b, boxText: '1', color: items.colorB },
            { label: items.nameA, count: a, boxText: '1', color: items.colorA }
          ],
          summary: `Order: ${items.nameB} (${b}) : ${items.nameA} (${a})`
        }
      };
    }
  }

  generateTopic2Simplify(tier) {
    if (tier === 'easy') {
      const [p, q] = pick(COPRIME_PAIRS.slice(0, 10));
      const factor = pick([2, 3, 4, 5, 10]);
      const rawA = p * factor;
      const rawB = q * factor;
      const ans = `${p}:${q}`;
      return {
        topicId: 'simplify',
        tier,
        marks: 1,
        answerType: 'ratio',
        prompt: `Simplify the ratio ${rawA} : ${rawB} to its simplest form.`,
        equationDisplay: `${rawA} : ${rawB}`,
        answer: ans,
        unitSuffix: '',
        tip: `Divide both numbers by their Highest Common Factor (${factor}).`,
        verbal: `Both ${rawA} and ${rawB} can be divided by ${factor}. ${rawA} divided by ${factor} is ${p}, and ${rawB} divided by ${factor} is ${q}. The simplest ratio is ${p} colon ${q}.`,
        steps: [
          `Step 1: Find the biggest number that divides into ${rawA} and ${rawB}: that is ${factor}.`,
          `Step 2: Left side: ${rawA} ÷ ${factor} = ${p}.`,
          `Step 3: Right side: ${rawB} ÷ ${factor} = ${q}. Answer: ${p}:${q}.`
        ],
        barModel: {
          title: `Grouping by ${factor}s`,
          groups: [
            { label: `${rawA} = ${p} boxes of ${factor}`, count: p, boxText: `${factor}`, color: '#2563EB' },
            { label: `${rawB} = ${q} boxes of ${factor}`, count: q, boxText: `${factor}`, color: '#8B5CF6' }
          ],
          summary: `Each box holds ${factor} → Simplified ratio is ${p}:${q}`
        }
      };
    } else if (tier === 'medium') {
      const [p, q] = pick(COPRIME_PAIRS);
      const factor = pick([6, 7, 8, 9, 12]);
      const rawA = p * factor;
      const rawB = q * factor;
      const ans = `${p}:${q}`;
      return {
        topicId: 'simplify',
        tier,
        marks: 2,
        answerType: 'ratio',
        prompt: `Write the ratio ${rawA} : ${rawB} in its simplest form.`,
        equationDisplay: `${rawA} : ${rawB}`,
        answer: ans,
        unitSuffix: '',
        tip: `Divide both sides by ${factor} (or divide in smaller steps until no number goes into both).`,
        verbal: `Let's simplify ${rawA} colon ${rawB}. The highest common factor is ${factor}. ${rawA} divided by ${factor} equals ${p}, and ${rawB} divided by ${factor} equals ${q}. So we get ${p} colon ${q}.`,
        steps: [
          `Step 1: Highest Common Factor of ${rawA} and ${rawB} is ${factor}.`,
          `Step 2: ${rawA} ÷ ${factor} = ${p}.`,
          `Step 3: ${rawB} ÷ ${factor} = ${q}. Simplified ratio: ${p}:${q}.`
        ],
        barModel: {
          title: `Each box = ${factor}`,
          groups: [
            { label: `${rawA}`, count: p, boxText: `${factor}`, color: '#2563EB' },
            { label: `${rawB}`, count: q, boxText: `${factor}`, color: '#8B5CF6' }
          ],
          summary: `${p} boxes : ${q} boxes = ${p}:${q}`
        }
      };
    } else {
      // Hard: Unit conversion before simplifying!
      const unitTemplates = [
        { small: 'cm', big: 'm', mult: 100, smallVals: [20, 25, 40, 50, 60, 75, 80], bigVals: [1, 2, 3] },
        { small: 'g', big: 'kg', mult: 1000, smallVals: [200, 250, 400, 500, 600, 750], bigVals: [1, 2, 3] },
        { small: 'c', big: 'R', mult: 100, smallVals: [20, 40, 50, 60, 80], bigVals: [1, 2, 3], prefixBig: true },
        { small: 'min', big: 'hr', mult: 60, smallVals: [15, 20, 30, 40, 45], bigVals: [1, 2] }
      ];
      const u = pick(unitTemplates);
      const sVal = pick(u.smallVals);
      const bVal = pick(u.bigVals);
      const convertedBig = bVal * u.mult;
      const hcf = gcd(sVal, convertedBig);
      const p = sVal / hcf;
      const q = convertedBig / hcf;
      const ans = `${p}:${q}`;
      const bigLabel = u.prefixBig ? `R${bVal}` : `${bVal} ${u.big}`;
      const smallLabel = u.prefixBig ? `${sVal}c` : `${sVal} ${u.small}`;
      const convLabel = u.prefixBig ? `${convertedBig}c` : `${convertedBig} ${u.small}`;
      const ruleText = u.prefixBig ? `R1 = 100c` : `1 ${u.big} = ${u.mult} ${u.small}`;

      return {
        topicId: 'simplify',
        tier,
        marks: 3,
        answerType: 'ratio',
        prompt: `First make the units the same (${ruleText}), then simplify: ${smallLabel} : ${bigLabel}`,
        equationDisplay: `${smallLabel} : ${bigLabel}`,
        answer: ans,
        unitSuffix: '',
        tip: `1) Convert the bigger unit first: ${bigLabel} = ${convLabel}. 2) Now simplify ${sVal} : ${convertedBig} by dividing by ${hcf}.`,
        verbal: `The units are different! Since ${ruleText}, change ${bigLabel} into ${convLabel}. Now our ratio is ${sVal} to ${convertedBig}. Divide both by ${hcf} to get ${p} colon ${q}.`,
        steps: [
          `Step 1: Convert ${bigLabel} to ${u.small}: ${bVal} × ${u.mult} = ${convLabel}.`,
          `Step 2: Write in same units: ${sVal} : ${convertedBig}.`,
          `Step 3: Divide both sides by ${hcf} → ${p}:${q}.`
        ],
        barModel: {
          title: `Same Units: ${sVal} : ${convertedBig} (divide by ${hcf})`,
          groups: [
            { label: smallLabel, count: p, boxText: `${hcf}`, color: '#10B981' },
            { label: `${bigLabel} (${convLabel})`, count: q, boxText: `${hcf}`, color: '#3B82F6' }
          ],
          summary: `${p} parts : ${q} parts = ${p}:${q}`
        }
      };
    }
  }

  generateTopic3Equivalent(tier) {
    const [a, b] = pick(COPRIME_PAIRS.slice(0, 14));
    if (tier === 'easy') {
      const k = randInt(2, 5);
      const c = a * k;
      const x = b * k;
      return {
        topicId: 'equivalent',
        tier,
        marks: 1,
        answerType: 'number',
        prompt: `Find the missing number (?) in the equivalent ratio: ${a} : ${b} = ${c} : ?`,
        equationDisplay: `${a} : ${b} = ${c} : ?`,
        answer: String(x),
        unitSuffix: '',
        tip: `Arrow Trick: How did ${a} become ${c}? We multiplied by ${k} (${c} ÷ ${a} = ${k}). Multiply ${b} by ${k} too!`,
        verbal: `Look at the first numbers: ${a} became ${c}. Since ${a} times ${k} is ${c}, we multiply the second number ${b} by ${k} as well. ${b} times ${k} equals ${x}.`,
        steps: [
          `Step 1: Find the multiplier: ${c} ÷ ${a} = ${k} (we multiplied by ${k}).`,
          `Step 2: Multiply the other side by ${k}: ${b} × ${k} = ${x}.`,
          `Step 3: Missing number = ${x}.`
        ],
        barModel: {
          title: `Scale Factor = ×${k} inside every box`,
          groups: [
            { label: `${a} boxes = ${c}`, count: a, boxText: `${k}`, color: '#2563EB' },
            { label: `${b} boxes = ?`, count: b, boxText: `${k}`, color: '#8B5CF6' }
          ],
          summary: `${b} boxes × ${k} per box = ${x}`
        }
      };
    } else if (tier === 'medium') {
      const k = randInt(4, 9);
      const x = a * k;
      const d = b * k;
      return {
        topicId: 'equivalent',
        tier,
        marks: 2,
        answerType: 'number',
        prompt: `Find the missing value x in the equivalent ratio: ${a} : ${b} = x : ${d}`,
        equationDisplay: `${a} : ${b} = x : ${d}`,
        answer: String(x),
        unitSuffix: '',
        tip: `Compare the second numbers: ${b} grew to ${d}. Divide ${d} ÷ ${b} = ${k}. Now multiply ${a} × ${k}!`,
        verbal: `Look at the second pair of numbers: ${b} grew into ${d}. ${d} divided by ${b} is ${k}. Now multiply ${a} by ${k} to get ${x}.`,
        steps: [
          `Step 1: Find the multiplier from ${b} to ${d}: ${d} ÷ ${b} = ${k}.`,
          `Step 2: Multiply the first part ${a} by ${k}: ${a} × ${k} = ${x}.`,
          `Step 3: x = ${x}.`
        ],
        barModel: {
          title: `1 Box = ${d} ÷ ${b} = ${k}`,
          groups: [
            { label: `x (${a} boxes)`, count: a, boxText: `${k}`, color: '#2563EB' },
            { label: `${d} (${b} boxes)`, count: b, boxText: `${k}`, color: '#8B5CF6' }
          ],
          summary: `x = ${a} × ${k} = ${x}`
        }
      };
    } else {
      const k = randInt(5, 11);
      const red = a * k;
      const white = b * k;
      return {
        topicId: 'equivalent',
        tier,
        marks: 2,
        answerType: 'number',
        prompt: `To mix pink paint, red and white paint are mixed in the ratio ${a} : ${b}. If you use ${white} litres of white paint, how many litres of red paint do you need?`,
        equationDisplay: `${a} : ${b} = ? : ${white}`,
        answer: String(red),
        unitSuffix: 'L',
        tip: `White is the ${b} parts (${white} L). Find 1 part (${white} ÷ ${b} = ${k} L), then multiply by ${a} red parts!`,
        verbal: `White paint has ${b} parts and equals ${white} litres. Divide ${white} by ${b} to find that 1 part is ${k} litres. Red paint has ${a} parts, so ${a} times ${k} equals ${red} litres.`,
        steps: [
          `Step 1: ${b} parts of white paint = ${white} L.`,
          `Step 2: 1 part = ${white} ÷ ${b} = ${k} L.`,
          `Step 3: Red paint (${a} parts) = ${a} × ${k} = ${red} L.`
        ],
        barModel: {
          title: `1 Box = ${white} ÷ ${b} = ${k} L`,
          groups: [
            { label: `Red (${a} parts)`, count: a, boxText: `${k}`, color: '#EF4444' },
            { label: `White (${b} parts = ${white}L)`, count: b, boxText: `${k}`, color: '#64748B' }
          ],
          summary: `Red = ${a} × ${k} = ${red} L`
        }
      };
    }
  }

  generateTopic4Sharing(tier) {
    if (tier === 'easy') {
      const [a, b] = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5]]);
      const totalParts = a + b;
      const onePart = randInt(4, 12);
      const totalAmount = totalParts * onePart;
      const askLarger = Math.random() < 0.5;
      const targetParts = askLarger ? Math.max(a, b) : Math.min(a, b);
      const targetWord = askLarger ? 'LARGER' : 'SMALLER';
      const ans = targetParts * onePart;

      return {
        topicId: 'sharing',
        tier,
        marks: 2,
        answerType: 'number',
        prompt: `Share R${totalAmount} in the ratio ${a} : ${b}. How much is the ${targetWord} share (in Rand)?`,
        equationDisplay: `Share R${totalAmount} in ${a}:${b}`,
        answer: String(ans),
        unitSuffix: 'Rand',
        tip: `3-Step Box Trick: 1) Add parts (${a}+${b}=${totalParts}). 2) Divide total (R${totalAmount}÷${totalParts}=R${onePart}). 3) Multiply by ${targetParts}!`,
        verbal: `Step 1: Add the parts: ${a} plus ${b} equals ${totalParts} parts. Step 2: Divide ${totalAmount} by ${totalParts} to get ${onePart} Rand in each box. Step 3: For the ${targetWord.toLowerCase()} share of ${targetParts} parts, multiply ${targetParts} times ${onePart} to get ${ans} Rand.`,
        steps: [
          `Step 1 (Total Parts): ${a} + ${b} = ${totalParts} parts altogether.`,
          `Step 2 (Value of 1 Part): R${totalAmount} ÷ ${totalParts} = R${onePart} per part.`,
          `Step 3 (${targetWord} Share): ${targetParts} parts × R${onePart} = R${ans}.`
        ],
        barModel: {
          title: `Total = R${totalAmount} shared across ${totalParts} equal boxes (R${onePart} each)`,
          groups: [
            { label: `Share 1 (${a} parts)`, count: a, boxText: `R${onePart}`, color: '#2563EB' },
            { label: `Share 2 (${b} parts)`, count: b, boxText: `R${onePart}`, color: '#10B981' }
          ],
          summary: `1 box = R${onePart}  •  ${targetWord} share (${targetParts} boxes) = R${ans}`
        }
      };
    } else if (tier === 'medium') {
      const [a, b] = pick([[2, 3], [3, 4], [3, 5], [4, 5], [2, 7], [5, 7]]);
      const totalParts = a + b;
      const onePart = randInt(8, 20);
      const totalAmount = totalParts * onePart;
      const askFirst = Math.random() < 0.5;
      const person = askFirst ? 'Justin' : 'Liam';
      const personParts = askFirst ? a : b;
      const ans = personParts * onePart;

      return {
        topicId: 'sharing',
        tier,
        marks: 3,
        answerType: 'number',
        prompt: `Justin and Liam share R${totalAmount} in the ratio ${a} : ${b}. How many Rand does ${person} get?`,
        equationDisplay: `R${totalAmount} in ${a}:${b} (${person})`,
        answer: String(ans),
        unitSuffix: 'Rand',
        tip: `Justin gets ${a} parts and Liam gets ${b} parts. Total parts = ${totalParts}. Find 1 part first!`,
        verbal: `Add the parts: ${a} plus ${b} equals ${totalParts} parts in total. Divide ${totalAmount} Rand by ${totalParts} to get ${onePart} Rand for 1 part. ${person} has ${personParts} parts, so ${personParts} times ${onePart} equals ${ans} Rand.`,
        steps: [
          `Step 1 (Add Parts): ${a} + ${b} = ${totalParts} total parts.`,
          `Step 2 (Find 1 Part): R${totalAmount} ÷ ${totalParts} = R${onePart}.`,
          `Step 3 (${person}'s Share): ${personParts} × R${onePart} = R${ans}.`
        ],
        barModel: {
          title: `Total R${totalAmount} ÷ ${totalParts} parts = R${onePart} per box`,
          groups: [
            { label: `Justin (${a} parts)`, count: a, boxText: `R${onePart}`, color: '#2563EB' },
            { label: `Liam (${b} parts)`, count: b, boxText: `R${onePart}`, color: '#8B5CF6' }
          ],
          summary: `${person} gets ${personParts} × R${onePart} = R${ans}`
        }
      };
    } else {
      // Hard: 3-part ratio sharing (a : b : c)
      const triples = [[1, 2, 3], [2, 3, 4], [1, 3, 4], [2, 3, 5], [1, 4, 5], [3, 4, 5]];
      const [a, b, c] = pick(triples);
      const totalParts = a + b + c;
      const onePart = randInt(6, 18);
      const totalSweets = totalParts * onePart;
      const ans = c * onePart; // c is always the largest in these triples

      return {
        topicId: 'sharing',
        tier,
        marks: 3,
        answerType: 'number',
        prompt: `Share ${totalSweets} sweets among three friends in the 3-part ratio ${a} : ${b} : ${c}. How many sweets is the LARGEST share?`,
        equationDisplay: `${totalSweets} in ${a}:${b}:${c}`,
        answer: String(ans),
        unitSuffix: 'sweets',
        tip: `Add all 3 parts (${a} + ${b} + ${c} = ${totalParts}). Divide ${totalSweets} ÷ ${totalParts}, then multiply by the largest part (${c}).`,
        verbal: `For a 3-part ratio, add all three numbers: ${a} plus ${b} plus ${c} equals ${totalParts} parts. Divide ${totalSweets} by ${totalParts} to get ${onePart} sweets per part. The largest share is ${c} parts, so ${c} times ${onePart} equals ${ans} sweets.`,
        steps: [
          `Step 1 (Add All 3 Parts): ${a} + ${b} + ${c} = ${totalParts} parts.`,
          `Step 2 (Find 1 Part): ${totalSweets} ÷ ${totalParts} = ${onePart} sweets.`,
          `Step 3 (Largest Share = ${c} parts): ${c} × ${onePart} = ${ans} sweets.`
        ],
        barModel: {
          title: `3-Part Ratio: ${totalParts} boxes in total (${onePart} per box)`,
          groups: [
            { label: `Part 1 (${a})`, count: a, boxText: `${onePart}`, color: '#3B82F6' },
            { label: `Part 2 (${b})`, count: b, boxText: `${onePart}`, color: '#F59E0B' },
            { label: `Largest (${c})`, count: c, boxText: `${onePart}`, color: '#10B981' }
          ],
          summary: `Largest share = ${c} boxes × ${onePart} = ${ans}`
        }
      };
    }
  }

  generateTopic5OnePart(tier) {
    const [a, b] = pick([[2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [3, 7]]);
    const onePart = randInt(5, 14);
    const valA = a * onePart;
    const valB = b * onePart;
    const totalParts = a + b;
    const totalVal = totalParts * onePart;

    if (tier === 'easy') {
      return {
        topicId: 'one_part',
        tier,
        marks: 2,
        answerType: 'number',
        prompt: `In a club, boys and girls are in the ratio ${a} : ${b}. There are ${valA} boys. How many girls are there?`,
        equationDisplay: `Boys (${a}) = ${valA} → Girls (${b}) = ?`,
        answer: String(valB),
        unitSuffix: 'girls',
        tip: `Careful! ${valA} is NOT the total — it is the ${a} boy boxes! Divide ${valA} ÷ ${a} = ${onePart} per box, then multiply by ${b}.`,
        verbal: `Notice that ${valA} is just the boys, which is ${a} boxes. So 1 box equals ${valA} divided by ${a}, which is ${onePart}. Girls have ${b} boxes, so multiply ${b} times ${onePart} to get ${valB} girls.`,
        steps: [
          `Step 1: Boys have ${a} parts, which equals ${valA}.`,
          `Step 2: Find 1 part = ${valA} ÷ ${a} = ${onePart}.`,
          `Step 3: Girls (${b} parts) = ${b} × ${onePart} = ${valB}.`
        ],
        barModel: {
          title: `Boys (${a} boxes) = ${valA} → Each box is ${onePart}`,
          groups: [
            { label: `Boys = ${valA}`, count: a, boxText: `${onePart}`, color: '#2563EB' },
            { label: `Girls = ?`, count: b, boxText: `${onePart}`, color: '#EC4899' }
          ],
          summary: `Girls = ${b} boxes × ${onePart} = ${valB}`
        }
      };
    } else if (tier === 'medium') {
      return {
        topicId: 'one_part',
        tier,
        marks: 3,
        answerType: 'number',
        prompt: `Red and blue tokens are in the ratio ${a} : ${b}. There are ${valA} red tokens. How many tokens are there in TOTAL?`,
        equationDisplay: `Red (${a}) = ${valA} → Total (${totalParts}) = ?`,
        answer: String(totalVal),
        unitSuffix: 'tokens',
        tip: `1) Find 1 box from red: ${valA} ÷ ${a} = ${onePart}. 2) Total boxes = ${a} + ${b} = ${totalParts}. Multiply ${totalParts} × ${onePart}!`,
        verbal: `Red has ${a} boxes and equals ${valA} tokens. Divide ${valA} by ${a} so 1 box is ${onePart}. Altogether there are ${a} plus ${b} equals ${totalParts} boxes. Multiply ${totalParts} times ${onePart} to get ${totalVal} tokens in total.`,
        steps: [
          `Step 1: Find 1 part from Red: ${valA} ÷ ${a} = ${onePart}.`,
          `Step 2: Find Total Parts: ${a} + ${b} = ${totalParts} parts.`,
          `Step 3: Total tokens = ${totalParts} × ${onePart} = ${totalVal}.`
        ],
        barModel: {
          title: `1 Box = ${valA} ÷ ${a} = ${onePart}  •  Total Boxes = ${totalParts}`,
          groups: [
            { label: `Red (${a} boxes = ${valA})`, count: a, boxText: `${onePart}`, color: '#EF4444' },
            { label: `Blue (${b} boxes)`, count: b, boxText: `${onePart}`, color: '#3B82F6' }
          ],
          summary: `Total = ${totalParts} boxes × ${onePart} = ${totalVal}`
        }
      };
    } else {
      // Hard: Given difference between shares, find total
      const diffParts = b - a; // since b > a in all selected pairs
      const diffRand = diffParts * onePart;
      return {
        topicId: 'one_part',
        tier,
        marks: 3,
        answerType: 'number',
        prompt: `Ana and Ben share money in the ratio ${a} : ${b}. Ben gets R${diffRand} MORE than Ana. What is the TOTAL amount shared (in Rand)?`,
        equationDisplay: `Diff (${diffParts} parts) = R${diffRand}`,
        answer: String(totalVal),
        unitSuffix: 'Rand',
        tip: `Ben has ${b} - ${a} = ${diffParts} more boxes than Ana. Those ${diffParts} extra boxes equal R${diffRand}!`,
        verbal: `Compare their boxes: Ben has ${b} boxes and Ana has ${a} boxes, which is ${diffParts} extra boxes. Those ${diffParts} boxes equal ${diffRand} Rand, so 1 box is ${diffRand} divided by ${diffParts} which is ${onePart} Rand. Total boxes is ${a} plus ${b} equals ${totalParts}. ${totalParts} times ${onePart} is ${totalVal} Rand.`,
        steps: [
          `Step 1 (Extra Parts): ${b} minus ${a} = ${diffParts} extra parts.`,
          `Step 2 (Find 1 Part): R${diffRand} ÷ ${diffParts} = R${onePart} per part.`,
          `Step 3 (Total Amount): (${a} + ${b}) = ${totalParts} parts × R${onePart} = R${totalVal}.`
        ],
        barModel: {
          title: `Difference = ${diffParts} extra box(es) = R${diffRand} (1 box = R${onePart})`,
          groups: [
            { label: `Ana (${a} boxes)`, count: a, boxText: `R${onePart}`, color: '#8B5CF6' },
            { label: `Ben (${b} boxes)`, count: b, boxText: `R${onePart}`, color: '#10B981' }
          ],
          summary: `Total (${totalParts} boxes) = ${totalParts} × R${onePart} = R${totalVal}`
        }
      };
    }
  }

  generateTopic6FractionsPct(tier) {
    if (tier === 'easy') {
      const pairs = [[1, 1], [1, 3], [3, 1], [1, 4], [2, 3], [3, 2], [3, 7], [7, 3]];
      const [a, b] = pick(pairs);
      const total = a + b; // 2, 4, 5, or 10
      const perPartPct = 100 / total;
      const pctA = a * perPartPct;

      return {
        topicId: 'fractions_pct',
        tier,
        marks: 2,
        answerType: 'number',
        prompt: `Cordial syrup and water are mixed in the ratio ${a} : ${b}. What percentage (%) of the total drink is cordial syrup?`,
        equationDisplay: `${a} out of ${total} → ?%`,
        answer: String(pctA),
        unitSuffix: '%',
        tip: `1) Total parts = ${a} + ${b} = ${total}. 2) Whole drink is 100%, so 1 part = 100% ÷ ${total} = ${perPartPct}%. Multiply by ${a}!`,
        verbal: `First add the parts: ${a} plus ${b} is ${total} parts in total. Since the whole drink is 100 percent, divide 100 by ${total} to get ${perPartPct} percent for each part. Syrup has ${a} parts, so ${a} times ${perPartPct} equals ${pctA} percent.`,
        steps: [
          `Step 1 (Total Parts): ${a} + ${b} = ${total} parts (fraction of syrup is ${a}/${total}).`,
          `Step 2 (1 Part as %): 100% ÷ ${total} = ${perPartPct}% per part.`,
          `Step 3 (Syrup %): ${a} × ${perPartPct}% = ${pctA}%.`
        ],
        barModel: {
          title: `100% split into ${total} boxes (${perPartPct}% per box)`,
          groups: [
            { label: `Syrup (${a})`, count: a, boxText: `${perPartPct}%`, color: '#EF4444' },
            { label: `Water (${b})`, count: b, boxText: `${perPartPct}%`, color: '#3B82F6' }
          ],
          summary: `Syrup = ${a} × ${perPartPct}% = ${pctA}%`
        }
      };
    } else if (tier === 'medium') {
      const pairs = [[3, 17], [7, 13], [9, 11], [6, 19], [11, 14], [9, 16]];
      const [a, b] = pick(pairs);
      const total = a + b; // 20 or 25
      const perPartPct = 100 / total; // 5 or 4
      const pctA = a * perPartPct;

      return {
        topicId: 'fractions_pct',
        tier,
        marks: 2,
        answerType: 'number',
        prompt: `In a metal alloy, gold and silver are mixed in the ratio ${a} : ${b}. What percentage (%) of the total alloy is gold?`,
        equationDisplay: `${a} : ${b} (Total ${total}) → ?%`,
        answer: String(pctA),
        unitSuffix: '%',
        tip: `Add parts: ${a} + ${b} = ${total}. Divide 100 ÷ ${total} = ${perPartPct}% per part, then multiply ${a} × ${perPartPct}%!`,
        verbal: `Add the parts first: ${a} plus ${b} equals ${total}. Now divide 100 percent by ${total} to find that each part is ${perPartPct} percent. Gold is ${a} parts, so ${a} times ${perPartPct} gives ${pctA} percent.`,
        steps: [
          `Step 1: Total parts = ${a} + ${b} = ${total} (fraction is ${a}/${total}).`,
          `Step 2: 100% ÷ ${total} = ${perPartPct}% per part.`,
          `Step 3: Gold percentage = ${a} × ${perPartPct}% = ${pctA}%.`
        ],
        barModel: {
          title: `Total = ${total} parts → Each part = 100% ÷ ${total} = ${perPartPct}%`,
          groups: [
            { label: `Gold (${a} parts)`, count: Math.min(a, 6), boxText: `${perPartPct}%`, color: '#D97706' },
            { label: `Silver (${b} parts)`, count: Math.min(b, 6), boxText: `${perPartPct}%`, color: '#64748B' }
          ],
          summary: `Gold = ${a} parts × ${perPartPct}% = ${pctA}%`
        }
      };
    } else {
      // Hard: Percentage to simplified ratio
      const pctChoices = [15, 20, 25, 30, 35, 40, 45, 60, 65, 75, 80];
      const pctA = pick(pctChoices);
      const pctB = 100 - pctA;
      const ans = simplifyRatio(pctA, pctB);
      const hcf = gcd(pctA, pctB);
      const p = pctA / hcf;
      const q = pctB / hcf;

      return {
        topicId: 'fractions_pct',
        tier,
        marks: 3,
        answerType: 'ratio',
        prompt: `${pctA}% of the learners in a hall wear glasses and the rest do not. Write the SIMPLIFIED ratio of learners who wear glasses to those who do not.`,
        equationDisplay: `${pctA}% : ${pctB}%`,
        answer: ans,
        unitSuffix: '',
        tip: `1) Percentages add up to 100%, so the rest is 100 - ${pctA} = ${pctB}%. 2) Simplify ${pctA} : ${pctB} by dividing by ${hcf}.`,
        verbal: `Since percentages out of a whole add up to 100, subtract ${pctA} from 100 to get ${pctB} percent who do not wear glasses. That gives the ratio ${pctA} to ${pctB}. Divide both by ${hcf} to get ${p} colon ${q}.`,
        steps: [
          `Step 1: Find the other percentage: 100% minus ${pctA}% = ${pctB}%.`,
          `Step 2: Write the unsimplified ratio: ${pctA} : ${pctB}.`,
          `Step 3: Divide both by ${hcf} → ${p}:${q}.`
        ],
        barModel: {
          title: `100% = ${pctA}% (Glasses) + ${pctB}% (No Glasses)`,
          groups: [
            { label: `Glasses (${pctA}%)`, count: Math.min(p, 7), boxText: `${hcf}%`, color: '#2563EB' },
            { label: `No Glasses (${pctB}%)`, count: Math.min(q, 7), boxText: `${hcf}%`, color: '#10B981' }
          ],
          summary: `Simplified ratio = ${p}:${q}`
        }
      };
    }
  }

  generateTopic7UnitRates(tier) {
    if (tier === 'easy') {
      const qty = randInt(3, 8);
      const unitPrice = randInt(6, 15);
      const total = qty * unitPrice;
      const item = pick(['notebooks', 'pens', 'chocolate bars', 'kg of apples', 'litres of milk']);

      return {
        topicId: 'unit_rates',
        tier,
        marks: 1,
        answerType: 'number',
        prompt: `${qty} ${item} cost R${total}. What is the unit rate (cost of 1 single unit in Rand)?`,
        equationDisplay: `R${total} ÷ ${qty}`,
        answer: String(unitPrice),
        unitSuffix: 'Rand',
        tip: `"Unit rate" means the value of 1 single unit! Divide Total Cost ÷ Quantity (R${total} ÷ ${qty}).`,
        verbal: `To find the cost of 1 single unit, divide the total price ${total} Rand by ${qty}. ${total} divided by ${qty} equals ${unitPrice} Rand.`,
        steps: [
          `Step 1: Total cost for ${qty} units = R${total}.`,
          `Step 2: Divide by ${qty} to find 1 unit: R${total} ÷ ${qty} = R${unitPrice}.`,
          `Step 3: Unit price = R${unitPrice}.`
        ],
        barModel: {
          title: `Total R${total} shared across ${qty} units`,
          groups: [
            { label: `${qty} ${item}`, count: qty, boxText: `R${unitPrice}`, color: '#10B981' }
          ],
          summary: `1 unit = R${total} ÷ ${qty} = R${unitPrice}`
        }
      };
    } else if (tier === 'medium') {
      const hours = randInt(2, 6);
      const speed = pick([60, 70, 80, 90, 100, 110, 120]);
      const dist = hours * speed;

      return {
        topicId: 'unit_rates',
        tier,
        marks: 2,
        answerType: 'number',
        prompt: `A car travels ${dist} km in ${hours} hours at a constant speed. What is its average speed in km/h?`,
        equationDisplay: `${dist} km ÷ ${hours} h`,
        answer: String(speed),
        unitSuffix: 'km/h',
        tip: `Speed (km/h) = Distance ÷ Time. Divide ${dist} km by ${hours} hours!`,
        verbal: `Speed in kilometres per hour means how many kilometres the car travels in 1 hour. Divide the distance ${dist} by ${hours} hours to get ${speed} kilometres per hour.`,
        steps: [
          `Step 1: Formula: Speed = Distance ÷ Time.`,
          `Step 2: Calculate ${dist} km ÷ ${hours} hours = ${speed} km/h.`,
          `Step 3: Speed = ${speed} km/h.`
        ],
        barModel: {
          title: `${dist} km covered in ${hours} equal hours`,
          groups: [
            { label: `${hours} hours`, count: hours, boxText: `${speed}km`, color: '#2563EB' }
          ],
          summary: `1 hour = ${dist} ÷ ${hours} = ${speed} km/h`
        }
      };
    } else {
      const mins1 = randInt(3, 6);
      const ratePerMin = pick([15, 20, 25, 30, 40]);
      const pages1 = mins1 * ratePerMin;
      const mins2 = mins1 + randInt(2, 5);
      const pages2 = mins2 * ratePerMin;

      return {
        topicId: 'unit_rates',
        tier,
        marks: 3,
        answerType: 'number',
        prompt: `A factory machine packs ${pages1} boxes in ${mins1} minutes. At this same rate, how many boxes will it pack in ${mins2} minutes?`,
        equationDisplay: `${pages1} in ${mins1}m → ? in ${mins2}m`,
        answer: String(pages2),
        unitSuffix: 'boxes',
        tip: `Unitary Method: 1) Find 1 minute first (${pages1} ÷ ${mins1} = ${ratePerMin}). 2) Multiply by ${mins2} minutes!`,
        verbal: `First find how many boxes the machine packs in 1 single minute: ${pages1} divided by ${mins1} equals ${ratePerMin} boxes per minute. Now multiply ${ratePerMin} by ${mins2} minutes to get ${pages2} boxes.`,
        steps: [
          `Step 1 (Rate for 1 min): ${pages1} ÷ ${mins1} = ${ratePerMin} boxes per minute.`,
          `Step 2 (For ${mins2} mins): ${ratePerMin} × ${mins2} = ${pages2} boxes.`,
          `Step 3: Total packed = ${pages2} boxes.`
        ],
        barModel: {
          title: `1 minute = ${pages1} ÷ ${mins1} = ${ratePerMin} boxes`,
          groups: [
            { label: `${mins2} minutes`, count: Math.min(mins2, 8), boxText: `${ratePerMin}`, color: '#8B5CF6' }
          ],
          summary: `${mins2} mins × ${ratePerMin} per min = ${pages2} boxes`
        }
      };
    }
  }

  generateTopic8ProportionBestBuy(tier) {
    if (tier === 'easy') {
      const q1 = randInt(2, 5);
      const unitCost = randInt(5, 12);
      const cost1 = q1 * unitCost;
      const q2 = q1 + randInt(2, 4);
      const cost2 = q2 * unitCost;

      return {
        topicId: 'proportion_best_buy',
        tier,
        marks: 2,
        answerType: 'number',
        prompt: `If ${q1} muffins cost R${cost1}, how much will ${q2} muffins cost at the same rate (in Rand)?`,
        equationDisplay: `${q1} → R${cost1}, so ${q2} → R?`,
        answer: String(cost2),
        unitSuffix: 'Rand',
        tip: `Find the price of 1 muffin first (R${cost1} ÷ ${q1} = R${unitCost}), then multiply by ${q2} muffins!`,
        verbal: `First find the cost of 1 muffin by dividing ${cost1} Rand by ${q1}, which gives ${unitCost} Rand. Then for ${q2} muffins, multiply ${q2} times ${unitCost} to get ${cost2} Rand.`,
        steps: [
          `Step 1 (1 Muffin): R${cost1} ÷ ${q1} = R${unitCost}.`,
          `Step 2 (${q2} Muffins): ${q2} × R${unitCost} = R${cost2}.`,
          `Step 3: Cost = R${cost2}.`
        ],
        barModel: {
          title: `1 muffin = R${cost1} ÷ ${q1} = R${unitCost}`,
          groups: [
            { label: `${q1} muffins = R${cost1}`, count: q1, boxText: `R${unitCost}`, color: '#2563EB' },
            { label: `${q2} muffins = R${cost2}`, count: q2, boxText: `R${unitCost}`, color: '#10B981' }
          ],
          summary: `${q2} × R${unitCost} = R${cost2}`
        }
      };
    } else if (tier === 'medium') {
      // Best Buy Comparison with quickChoices!
      const qtyA = randInt(3, 5);
      const qtyB = qtyA + randInt(1, 3);
      const cheapUnit = randInt(7, 14);
      const priceyUnit = cheapUnit + randInt(2, 5);
      const aIsCheaper = Math.random() < 0.5;
      const unitA = aIsCheaper ? cheapUnit : priceyUnit;
      const unitB = aIsCheaper ? priceyUnit : cheapUnit;
      const totalA = qtyA * unitA;
      const totalB = qtyB * unitB;

      return {
        topicId: 'proportion_best_buy',
        tier,
        marks: 3,
        answerType: 'number',
        quickChoices: [
          { label: `Deal A: R${unitA}/kg`, value: String(unitA) },
          { label: `Deal B: R${unitB}/kg`, value: String(unitB) }
        ],
        prompt: `Best Buy! Deal A is ${qtyA} kg for R${totalA}. Deal B is ${qtyB} kg for R${totalB}. What is the unit price per 1 kg (in Rand) of the CHEAPER (better value) deal?`,
        equationDisplay: `R${totalA}÷${qtyA} vs R${totalB}÷${qtyB}`,
        answer: String(cheapUnit),
        unitSuffix: 'Rand/kg',
        tip: `1) Deal A: R${totalA} ÷ ${qtyA} = R${unitA}/kg. 2) Deal B: R${totalB} ÷ ${qtyB} = R${unitB}/kg. Pick the smaller price!`,
        verbal: `Let's compare the price for 1 kilogram. Deal A is ${totalA} divided by ${qtyA}, which is ${unitA} Rand per kilogram. Deal B is ${totalB} divided by ${qtyB}, which is ${unitB} Rand per kilogram. The cheaper unit price is ${cheapUnit} Rand.`,
        steps: [
          `Step 1 (Deal A unit price): R${totalA} ÷ ${qtyA} kg = R${unitA} per kg.`,
          `Step 2 (Deal B unit price): R${totalB} ÷ ${qtyB} kg = R${unitB} per kg.`,
          `Step 3 (Compare): R${cheapUnit} is cheaper than R${priceyUnit}. Answer: ${cheapUnit}.`
        ],
        barModel: {
          title: `Compare 1 Single Box (1 kg) from Each Deal`,
          groups: [
            { label: `Deal A (${qtyA} kg = R${totalA})`, count: qtyA, boxText: `R${unitA}`, color: '#3B82F6' },
            { label: `Deal B (${qtyB} kg = R${totalB})`, count: qtyB, boxText: `R${unitB}`, color: '#10B981' }
          ],
          summary: `Cheaper unit rate = R${cheapUnit} per kg`
        }
      };
    } else {
      const workers1 = randInt(4, 7);
      const perWorker = randInt(4, 9);
      const items1 = workers1 * perWorker;
      const workers2 = workers1 + randInt(2, 5);
      const items2 = workers2 * perWorker;

      return {
        topicId: 'proportion_best_buy',
        tier,
        marks: 3,
        answerType: 'number',
        prompt: `${workers1} bakers can bake ${items1} loaves of bread in an hour. Working at the same rate, how many loaves can ${workers2} bakers bake in an hour?`,
        equationDisplay: `${workers1} bakers → ${items1}, ${workers2} → ?`,
        answer: String(items2),
        unitSuffix: 'loaves',
        tip: `1) Find how many loaves 1 baker makes (${items1} ÷ ${workers1} = ${perWorker}). 2) Multiply by ${workers2} bakers!`,
        verbal: `First find what 1 baker makes by dividing ${items1} loaves by ${workers1} bakers, which is ${perWorker} loaves per baker. Now multiply ${perWorker} by ${workers2} bakers to get ${items2} loaves.`,
        steps: [
          `Step 1 (1 Baker): ${items1} ÷ ${workers1} = ${perWorker} loaves.`,
          `Step 2 (${workers2} Bakers): ${workers2} × ${perWorker} = ${items2} loaves.`,
          `Step 3: Total loaves = ${items2}.`
        ],
        barModel: {
          title: `1 Baker = ${items1} ÷ ${workers1} = ${perWorker} loaves`,
          groups: [
            { label: `${workers2} Bakers`, count: Math.min(workers2, 8), boxText: `${perWorker}`, color: '#D97706' }
          ],
          summary: `${workers2} bakers × ${perWorker} loaves = ${items2}`
        }
      };
    }
  }

  generateTopic9ScaleMaps(tier) {
    if (tier === 'easy') {
      const basePeople = pick([2, 3, 4, 5]);
      const mult = randInt(2, 4);
      const targetPeople = basePeople * mult;
      const baseGrams = pick([50, 100, 120, 150, 200]);
      const targetGrams = baseGrams * mult;

      return {
        topicId: 'scale_maps',
        tier,
        marks: 1,
        answerType: 'number',
        prompt: `A recipe for ${basePeople} people uses ${baseGrams} g of flour. How many grams of flour do you need to make the recipe for ${targetPeople} people?`,
        equationDisplay: `${basePeople} people → ${baseGrams}g, ${targetPeople} → ?g`,
        answer: String(targetGrams),
        unitSuffix: 'g',
        tip: `How many times bigger is the group? ${targetPeople} ÷ ${basePeople} = ${mult} times bigger! Multiply ${baseGrams} g × ${mult}.`,
        verbal: `We are scaling from ${basePeople} people up to ${targetPeople} people. ${targetPeople} divided by ${basePeople} is ${mult}, so we need ${mult} times as much flour. ${baseGrams} times ${mult} equals ${targetGrams} grams.`,
        steps: [
          `Step 1 (Scale Factor): ${targetPeople} ÷ ${basePeople} = ${mult} times as much.`,
          `Step 2 (Multiply Flour): ${baseGrams} g × ${mult} = ${targetGrams} g.`,
          `Step 3: Flour needed = ${targetGrams} g.`
        ],
        barModel: {
          title: `Recipe Scaled ×${mult} (each batch of ${basePeople} people uses ${baseGrams} g)`,
          groups: [
            { label: `${mult} batches (${targetPeople} people)`, count: mult, boxText: `${baseGrams}g`, color: '#F59E0B' }
          ],
          summary: `${mult} × ${baseGrams} g = ${targetGrams} g`
        }
      };
    } else if (tier === 'medium') {
      const scaleN = pick([20, 50, 100, 200]);
      const mapCm = randInt(3, 8);
      const realCm = mapCm * scaleN;

      return {
        topicId: 'scale_maps',
        tier,
        marks: 2,
        answerType: 'number',
        prompt: `A drawing has a scale of 1 : ${scaleN}. A wall is ${mapCm} cm long on the drawing. How many cm long is the real wall?`,
        equationDisplay: `Scale 1 : ${scaleN} (${mapCm} cm → ? cm)`,
        answer: String(realCm),
        unitSuffix: 'cm',
        tip: `Scale 1 : ${scaleN} means 1 cm on paper = ${scaleN} cm in real life. Multiply ${mapCm} × ${scaleN}!`,
        verbal: `A scale of 1 to ${scaleN} means every 1 centimetre on the drawing is ${scaleN} centimetres in real life. For ${mapCm} centimetres, multiply ${mapCm} times ${scaleN} to get ${realCm} centimetres.`,
        steps: [
          `Step 1: Scale 1 : ${scaleN} means 1 cm represents ${scaleN} cm.`,
          `Step 2: Multiply map length by ${scaleN}: ${mapCm} × ${scaleN} = ${realCm} cm.`,
          `Step 3: Real length = ${realCm} cm.`
        ],
        barModel: {
          title: `Each 1 cm on map = ${scaleN} cm in real life`,
          groups: [
            { label: `${mapCm} cm on map`, count: mapCm, boxText: `${scaleN}cm`, color: '#2563EB' }
          ],
          summary: `Real length = ${mapCm} × ${scaleN} = ${realCm} cm`
        }
      };
    } else {
      const kmPerCm = pick([4, 5, 8, 10, 15, 20]);
      const mapCm = randInt(4, 9);
      const realKm = mapCm * kmPerCm;

      return {
        topicId: 'scale_maps',
        tier,
        marks: 3,
        answerType: 'number',
        prompt: `On a map, the scale is 1 cm : ${kmPerCm} km. Two towns are ${realKm} km apart in real life. How many cm apart are they on the map?`,
        equationDisplay: `1 cm : ${kmPerCm} km (? cm : ${realKm} km)`,
        answer: String(mapCm),
        unitSuffix: 'cm',
        tip: `Going from real distance back to the map: divide the real distance (${realKm} km) by ${kmPerCm} km per cm!`,
        verbal: `Each 1 centimetre on the map stands for ${kmPerCm} kilometres. To find how many centimetres make ${realKm} kilometres, divide ${realKm} by ${kmPerCm}, which gives ${mapCm} centimetres.`,
        steps: [
          `Step 1: 1 cm on map = ${kmPerCm} km in real life.`,
          `Step 2: Divide real distance by ${kmPerCm}: ${realKm} ÷ ${kmPerCm} = ${mapCm} cm.`,
          `Step 3: Map distance = ${mapCm} cm.`
        ],
        barModel: {
          title: `${realKm} km split into steps of ${kmPerCm} km (1 cm each)`,
          groups: [
            { label: `${mapCm} cm on map = ${realKm} km`, count: mapCm, boxText: `${kmPerCm}km`, color: '#10B981' }
          ],
          summary: `${realKm} km ÷ ${kmPerCm} km/cm = ${mapCm} cm`
        }
      };
    }
  }

  generateTopic10WordProblems(tier) {
    if (tier === 'easy') {
      const [a, b] = pick([[1, 3], [1, 4], [2, 3], [2, 5]]);
      const onePart = randInt(4, 10);
      const cement = a * onePart;
      const sand = b * onePart;

      return {
        topicId: 'word_problems',
        tier,
        marks: 2,
        answerType: 'number',
        prompt: `A builder mixes cement and sand in the ratio ${a} : ${b}. If he uses ${cement} bags of cement, how many bags of sand does he need?`,
        equationDisplay: `Cement (${a}) = ${cement} → Sand (${b}) = ?`,
        answer: String(sand),
        unitSuffix: 'bags',
        tip: `1) Cement has ${a} part(s) = ${cement} bags, so 1 part = ${cement} ÷ ${a} = ${onePart}. 2) Sand = ${b} × ${onePart}!`,
        verbal: `Cement is ${a} parts and uses ${cement} bags. Divide ${cement} by ${a} so 1 part is ${onePart} bags. Sand is ${b} parts, so multiply ${b} times ${onePart} to get ${sand} bags of sand.`,
        steps: [
          `Step 1: 1 part = ${cement} ÷ ${a} = ${onePart} bags.`,
          `Step 2: Sand (${b} parts) = ${b} × ${onePart} = ${sand} bags.`,
          `Step 3: Answer = ${sand} bags.`
        ],
        barModel: {
          title: `1 Box = ${onePart} bags`,
          groups: [
            { label: `Cement (${a})`, count: a, boxText: `${onePart}`, color: '#64748B' },
            { label: `Sand (${b})`, count: b, boxText: `${onePart}`, color: '#F59E0B' }
          ],
          summary: `Sand = ${b} × ${onePart} = ${sand} bags`
        }
      };
    } else if (tier === 'medium') {
      // Triangle angles in ratio (sum = 180)
      const triples = [
        [1, 2, 3], // sum 6 -> 1 part = 30
        [2, 3, 4], // sum 9 -> 1 part = 20
        [1, 4, 5], // sum 10 -> 1 part = 18
        [2, 3, 5], // sum 10 -> 1 part = 18
        [3, 4, 5]  // sum 12 -> 1 part = 15
      ];
      const [a, b, c] = pick(triples);
      const totalParts = a + b + c;
      const onePart = 180 / totalParts;
      const largest = c * onePart;

      return {
        topicId: 'word_problems',
        tier,
        marks: 3,
        answerType: 'number',
        prompt: `The three interior angles of a triangle are in the ratio ${a} : ${b} : ${c}. Remember that angles in a triangle add up to 180°. What is the size of the LARGEST angle (in degrees)?`,
        equationDisplay: `180° in ratio ${a}:${b}:${c}`,
        answer: String(largest),
        unitSuffix: '°',
        tip: `1) Total parts = ${a} + ${b} + ${c} = ${totalParts}. 2) 1 part = 180° ÷ ${totalParts} = ${onePart}°. 3) Multiply by ${c}!`,
        verbal: `The angles of a triangle always add up to 180 degrees. Add the ratio parts: ${a} plus ${b} plus ${c} equals ${totalParts} parts. Divide 180 by ${totalParts} to get ${onePart} degrees per part. The largest angle has ${c} parts, so ${c} times ${onePart} equals ${largest} degrees.`,
        steps: [
          `Step 1 (Total Parts): ${a} + ${b} + ${c} = ${totalParts} parts.`,
          `Step 2 (1 Part): 180° ÷ ${totalParts} = ${onePart}°.`,
          `Step 3 (Largest Angle): ${c} × ${onePart}° = ${largest}°.`
        ],
        barModel: {
          title: `Triangle Sum = 180° across ${totalParts} parts (${onePart}° per box)`,
          groups: [
            { label: `Angle 1 (${a})`, count: a, boxText: `${onePart}°`, color: '#3B82F6' },
            { label: `Angle 2 (${b})`, count: b, boxText: `${onePart}°`, color: '#8B5CF6' },
            { label: `Largest (${c})`, count: c, boxText: `${onePart}°`, color: '#10B981' }
          ],
          summary: `Largest angle = ${c} × ${onePart}° = ${largest}°`
        }
      };
    } else {
      // Hard: Rectangle perimeter ratio problem
      const [lenParts, widParts] = pick([[3, 2], [4, 1], [5, 3], [5, 2], [4, 3]]);
      const halfPerimParts = lenParts + widParts;
      const onePart = randInt(3, 8);
      const halfPerim = halfPerimParts * onePart;
      const perimeter = halfPerim * 2;
      const lengthVal = lenParts * onePart;

      return {
        topicId: 'word_problems',
        tier,
        marks: 4,
        answerType: 'number',
        prompt: `The length and width of a rectangle are in the ratio ${lenParts} : ${widParts}. One length plus one width equals ${halfPerim} cm (Total Perimeter = ${perimeter} cm). Find the LENGTH of the rectangle in cm.`,
        equationDisplay: `L : W = ${lenParts} : ${widParts} (L+W = ${halfPerim} cm)`,
        answer: String(lengthVal),
        unitSuffix: 'cm',
        tip: `1) Length + Width = ${lenParts} + ${widParts} = ${halfPerimParts} parts. 2) 1 part = ${halfPerim} ÷ ${halfPerimParts} = ${onePart} cm. 3) Length = ${lenParts} × ${onePart} cm!`,
        verbal: `One length plus one width has ${lenParts} plus ${widParts} which is ${halfPerimParts} parts, and equals ${halfPerim} centimetres. Divide ${halfPerim} by ${halfPerimParts} so 1 part is ${onePart} centimetres. The length has ${lenParts} parts, so ${lenParts} times ${onePart} equals ${lengthVal} centimetres.`,
        steps: [
          `Step 1 (Parts for L + W): ${lenParts} + ${widParts} = ${halfPerimParts} parts.`,
          `Step 2 (Find 1 Part): ${halfPerim} cm ÷ ${halfPerimParts} = ${onePart} cm.`,
          `Step 3 (Length = ${lenParts} parts): ${lenParts} × ${onePart} cm = ${lengthVal} cm.`
        ],
        barModel: {
          title: `Length + Width = ${halfPerim} cm (${halfPerimParts} boxes of ${onePart} cm)`,
          groups: [
            { label: `Length (${lenParts} parts)`, count: lenParts, boxText: `${onePart}cm`, color: '#2563EB' },
            { label: `Width (${widParts} parts)`, count: widParts, boxText: `${onePart}cm`, color: '#10B981' }
          ],
          summary: `Length = ${lenParts} × ${onePart} cm = ${lengthVal} cm`
        }
      };
    }
  }

  generateQuestion(topicId = this.currentTopic, subCat = this.currentSubCategory) {
    let resolvedTopic = topicId;
    if (resolvedTopic === 'weak_filter') {
      resolvedTopic = this.weakTopics.length > 0
        ? pick(this.weakTopics)
        : pick(RATIO_TOPICS).id;
    }
    if (!RATIO_TOPICS.some(t => t.id === resolvedTopic)) {
      resolvedTopic = pick(RATIO_TOPICS).id;
    }

    let tier = subCat || 'easy';
    if (tier === 'all') {
      tier = this.getProgressiveTier(this.streak);
    }
    if (!['easy', 'medium', 'hard'].includes(tier)) {
      tier = 'easy';
    }

    let q;
    switch (resolvedTopic) {
      case 'writing': q = this.generateTopic1Writing(tier); break;
      case 'simplify': q = this.generateTopic2Simplify(tier); break;
      case 'equivalent': q = this.generateTopic3Equivalent(tier); break;
      case 'sharing': q = this.generateTopic4Sharing(tier); break;
      case 'one_part': q = this.generateTopic5OnePart(tier); break;
      case 'fractions_pct': q = this.generateTopic6FractionsPct(tier); break;
      case 'unit_rates': q = this.generateTopic7UnitRates(tier); break;
      case 'proportion_best_buy': q = this.generateTopic8ProportionBestBuy(tier); break;
      case 'scale_maps': q = this.generateTopic9ScaleMaps(tier); break;
      case 'word_problems':
      default:
        q = this.generateTopic10WordProblems(tier);
        break;
    }

    const topicMeta = RATIO_TOPICS.find(t => t.id === q.topicId) || RATIO_TOPICS[0];
    q.topicName = topicMeta.name;
    q.subCategory = subCat;
    return q;
  }

  normalizeAnswer(val) {
    return String(val || '')
      .trim()
      .replace(/\s+/g, '')
      .replace(/to/gi, ':')
      .replace(/^R/i, '')
      .replace(/%$/i, '');
  }

  checkUserAnswer(userRaw, question = this.currentQuestion) {
    if (!question) return false;
    const cleaned = this.normalizeAnswer(userRaw);
    const expected = this.normalizeAnswer(question.answer);
    if (!cleaned) return false;
    if (cleaned === expected) return true;

    // If numeric, check exact numeric value
    if (question.answerType === 'number' && !cleaned.includes(':')) {
      const nUser = Number(cleaned);
      const nExp = Number(expected);
      if (!Number.isNaN(nUser) && nUser === nExp) return true;
    }
    return false;
  }

  // =========================================================================
  // 3 MOCK TESTS GENERATOR (15 Questions Across All 10 Topics)
  // =========================================================================

  createMockTest(mockNumber = 1) {
    const configs = {
      1: {
        id: 1,
        title: 'Mock Test 1: Foundation Exam',
        tierSchedule: [
          'easy', 'easy', 'easy', 'easy', 'easy',
          'easy', 'easy', 'easy', 'medium', 'medium',
          'medium', 'medium', 'medium', 'medium', 'hard'
        ]
      },
      2: {
        id: 2,
        title: 'Mock Test 2: Standard Grade 7 Exam',
        tierSchedule: [
          'easy', 'easy', 'easy', 'easy', 'medium',
          'medium', 'medium', 'medium', 'medium', 'medium',
          'hard', 'hard', 'hard', 'hard', 'hard'
        ]
      },
      3: {
        id: 3,
        title: 'Mock Test 3: Distinction Challenge',
        tierSchedule: [
          'medium', 'medium', 'medium', 'medium', 'medium',
          'hard', 'hard', 'hard', 'hard', 'hard',
          'hard', 'hard', 'hard', 'hard', 'hard'
        ]
      }
    };

    const cfg = configs[mockNumber] || configs[1];
    // Guarantee all 10 topics are covered in the 15 questions (10 core + 5 high-weight exam topics)
    const topicOrder = [
      'writing',
      'simplify',
      'equivalent',
      'sharing',
      'one_part',
      'fractions_pct',
      'unit_rates',
      'proportion_best_buy',
      'scale_maps',
      'word_problems',
      'simplify',
      'sharing',
      'one_part',
      'unit_rates',
      'word_problems'
    ];

    const questions = topicOrder.map((tId, idx) => {
      const tier = cfg.tierSchedule[idx] || 'medium';
      const q = this.generateQuestion(tId, tier);
      q.questionNumber = idx + 1;
      return q;
    });

    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 2), 0);

    this.activeMock = {
      id: cfg.id,
      title: cfg.title,
      questions,
      totalMarks,
      index: 0,
      answers: [],
      completed: false
    };

    return this.activeMock;
  }

  submitMockAnswer(rawInput) {
    if (!this.activeMock || this.activeMock.completed) return null;
    const q = this.activeMock.questions[this.activeMock.index];
    const isCorrect = this.checkUserAnswer(rawInput, q);
    const earnedMarks = isCorrect ? q.marks : 0;

    this.activeMock.answers.push({
      question: q,
      userAnswer: String(rawInput || '').trim() || '—',
      isCorrect,
      earnedMarks,
      maxMarks: q.marks
    });

    if (this.activeMock.index + 1 < this.activeMock.questions.length) {
      this.activeMock.index += 1;
    } else {
      this.activeMock.completed = true;
    }

    return { isCorrect, earnedMarks };
  }

  gradeMockTest(mock = this.activeMock) {
    if (!mock) return null;
    const earnedMarks = mock.answers.reduce((acc, a) => acc + a.earnedMarks, 0);
    const totalMarks = mock.totalMarks || 1;
    const percentage = Math.round((earnedMarks / totalMarks) * 100);

    const topicStats = {};
    RATIO_TOPICS.forEach(t => {
      topicStats[t.id] = { id: t.id, name: t.name, correct: 0, total: 0 };
    });

    mock.answers.forEach(a => {
      const tId = a.question.topicId;
      if (topicStats[tId]) {
        topicStats[tId].total += 1;
        if (a.isCorrect) topicStats[tId].correct += 1;
      }
    });

    const missedTopicIds = Object.values(topicStats)
      .filter(s => s.total > 0 && s.correct < s.total)
      .map(s => s.id);

    return {
      title: mock.title,
      earnedMarks,
      totalMarks,
      percentage,
      correctCount: mock.answers.filter(a => a.isCorrect).length,
      totalQuestions: mock.questions.length,
      topicBreakdown: Object.values(topicStats).filter(s => s.total > 0),
      missedTopicIds,
      answers: mock.answers
    };
  }

  // =========================================================================
  // BROWSER UI & INTERACTION LOGIC
  // =========================================================================

  init() {
    if (typeof document === 'undefined') return;
    this.cacheDOM();
    this.applySettings();
    this.renderTopicButtons();
    this.renderSubCategoryPills();
    this.renderCheatSheet();
    this.bindEvents();
    this.updateStatsUI();
    this.nextQuestion();
  }

  cacheDOM() {
    this.dom = {
      viewTabs: document.querySelectorAll('.view-tab-btn'),
      practiceView: document.getElementById('view-practice'),
      mockView: document.getElementById('view-mock'),
      cheatsheetView: document.getElementById('view-cheatsheet'),

      topicGrid: document.getElementById('ratio-topic-grid'),
      subCatRow: document.getElementById('ratio-sub-category-row'),
      tierIndicator: document.getElementById('gradual-tier-indicator'),
      tierBadge: document.getElementById('tier-badge'),
      tierDetails: document.getElementById('tier-details'),
      weakFilterBanner: document.getElementById('weak-filter-banner'),
      clearWeakBtn: document.getElementById('clear-weak-filter-btn'),

      topicBadge: document.getElementById('question-topic-badge'),
      marksBadge: document.getElementById('question-marks-badge'),
      mockProgressBadge: document.getElementById('mock-progress-badge'),
      promptText: document.getElementById('question-prompt-text'),
      equationChip: document.getElementById('equation-chip'),
      answerDisplay: document.getElementById('answer-display'),
      unitLabel: document.getElementById('answer-unit-label'),
      feedbackMsg: document.getElementById('feedback-message'),

      barModelCard: document.getElementById('bar-model-container'),
      tipText: document.getElementById('how-it-works-tip'),
      speakBtn: document.getElementById('speak-btn'),
      speechCaption: document.getElementById('speech-caption-bar'),
      visToggleBtn: document.getElementById('vis-toggle-btn'),
      breakdownBtn: document.getElementById('breakdown-btn'),
      breakdownContainer: document.getElementById('breakdown-container'),
      QuickChoicesRow: document.getElementById('quick-choices-row'),

      keypadBtns: document.querySelectorAll('.key-btn[data-val]'),
      submitBtn: document.getElementById('submit-btn'),
      skipBtn: document.getElementById('next-question-btn'),

      streakVal: document.getElementById('streak-val'),
      solvedVal: document.getElementById('solved-val'),
      xpVal: document.getElementById('xp-val'),
      timerToggle: document.getElementById('timer-toggle'),
      themeToggle: document.getElementById('theme-toggle'),
      fontToggle: document.getElementById('font-toggle'),
      soundToggle: document.getElementById('sound-toggle'),

      scratchpadToggle: document.getElementById('scratchpad-toggle'),
      scratchpadWrapper: document.getElementById('scratchpad-wrapper'),
      scratchpadCanvas: document.getElementById('scratchpad-canvas'),

      mockIntroCards: document.getElementById('mock-selector-cards'),
      mockActiveBanner: document.getElementById('mock-active-banner'),
      mockTitleLabel: document.getElementById('mock-active-title'),
      quitMockBtn: document.getElementById('quit-mock-btn'),
      mockReportContainer: document.getElementById('mock-report-container'),
      cheatsheetGrid: document.getElementById('cheatsheet-grid'),
      readCheatsheetBtn: document.getElementById('read-cheatsheet-btn')
    };
  }

  renderTopicButtons() {
    if (!this.dom.topicGrid) return;
    this.dom.topicGrid.innerHTML = RATIO_TOPICS.map(t => `
      <button class="category-btn ratio-topic-btn ${this.currentTopic === t.id ? 'active' : ''}" data-topic="${t.id}" title="${t.desc}">
        <span class="cat-icon">${t.icon}</span> ${t.shortName}
      </button>
    `).join('');

    this.dom.topicGrid.querySelectorAll('.ratio-topic-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setTopic(btn.dataset.topic);
      });
    });

    if (this.dom.weakFilterBanner) {
      this.dom.weakFilterBanner.classList.toggle('hidden', this.currentTopic !== 'weak_filter');
    }
  }

  renderSubCategoryPills() {
    if (!this.dom.subCatRow) return;
    this.dom.subCatRow.innerHTML = RATIO_SUB_CATEGORIES.map(s => `
      <button class="sub-cat-pill ${this.currentSubCategory === s.id ? 'active' : ''}" data-sub="${s.id}" title="${s.desc}">
        <span class="sub-icon">${s.icon}</span> ${s.name}
      </button>
    `).join('');

    this.dom.subCatRow.querySelectorAll('.sub-cat-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setSubCategory(btn.dataset.sub);
      });
    });

    this.updateGradualBanner();
  }

  updateGradualBanner() {
    if (!this.dom.tierIndicator) return;
    if (this.currentSubCategory === 'all') {
      this.dom.tierIndicator.classList.remove('hidden');
      const tier = this.getProgressiveTier(this.streak);
      const titles = { easy: 'Easy 🌱', medium: 'Medium ⚡', hard: 'Hard 🔥' };
      if (this.dom.tierBadge) {
        this.dom.tierBadge.className = `gradual-tier-badge tier-${tier}`;
        this.dom.tierBadge.textContent = titles[tier];
      }
      if (this.dom.tierDetails) {
        const nextMsg = tier === 'easy' ? 'Streak 3 for Medium ⚡' : (tier === 'medium' ? 'Streak 6 for Hard 🔥' : 'Max Exam Level 🔥');
        this.dom.tierDetails.textContent = `(Streak: ${this.streak} 🔥 • ${nextMsg})`;
      }
    } else {
      this.dom.tierIndicator.classList.add('hidden');
    }
  }

  setTopic(topicId) {
    this.currentTopic = topicId;
    if (this.currentSubCategory === 'all') {
      this.streak = 0;
    }
    this.renderTopicButtons();
    this.updateStatsUI();
    this.nextQuestion();
    this.saveState();
  }

  setSubCategory(subId) {
    this.currentSubCategory = subId;
    if (subId === 'all') {
      this.streak = 0;
    }
    this.renderSubCategoryPills();
    this.updateStatsUI();
    this.nextQuestion();
    this.saveState();
  }

  switchView(viewName) {
    sound.stopSpeech();
    this.isSpeaking = false;
    this.currentView = viewName;

    this.dom.viewTabs.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    if (viewName === 'cheatsheet') {
      this.dom.practiceView.classList.add('hidden');
      this.dom.mockView.classList.add('hidden');
      this.dom.cheatsheetView.classList.remove('hidden');
    } else if (viewName === 'mock') {
      this.dom.cheatsheetView.classList.add('hidden');
      if (this.activeMock && !this.activeMock.completed) {
        this.dom.mockView.classList.add('hidden');
        this.dom.practiceView.classList.remove('hidden');
      } else {
        this.dom.practiceView.classList.add('hidden');
        this.dom.mockView.classList.remove('hidden');
      }
    } else {
      // Topic practice
      this.activeMock = null;
      this.dom.mockActiveBanner.classList.add('hidden');
      this.dom.mockProgressBadge.classList.add('hidden');
      document.getElementById('practice-selectors-wrap').classList.remove('hidden');
      this.dom.mockView.classList.add('hidden');
      this.dom.cheatsheetView.classList.add('hidden');
      this.dom.practiceView.classList.remove('hidden');
      this.nextQuestion();
    }
  }

  nextQuestion() {
    sound.stopSpeech();
    this.isSpeaking = false;
    if (this.dom.speakBtn) {
      this.dom.speakBtn.textContent = '📢 Explain';
      this.dom.speakBtn.classList.remove('speaking');
    }

    if (this.activeMock && !this.activeMock.completed) {
      this.currentQuestion = this.activeMock.questions[this.activeMock.index];
      this.dom.mockProgressBadge.classList.remove('hidden');
      this.dom.mockProgressBadge.textContent = `Question ${this.activeMock.index + 1} of ${this.activeMock.questions.length}`;
    } else {
      this.currentQuestion = this.generateQuestion(this.currentTopic, this.currentSubCategory);
      if (this.dom.mockProgressBadge) this.dom.mockProgressBadge.classList.add('hidden');
    }

    this.userAnswer = '';
    this.renderQuestionUI();
  }

  renderQuestionUI() {
    const q = this.currentQuestion;
    if (!q || !this.dom.promptText) return;

    this.dom.topicBadge.textContent = q.topicName || 'Ratio Practice';
    this.dom.marksBadge.textContent = `[${q.marks || 2} ${q.marks === 1 ? 'Mark' : 'Marks'}]`;
    this.dom.promptText.textContent = q.prompt;
    this.dom.equationChip.textContent = q.equationDisplay;
    this.dom.answerDisplay.textContent = '?';
    this.dom.answerDisplay.className = 'answer-box';
    this.dom.unitLabel.textContent = q.unitSuffix || (q.answerType === 'ratio' ? '(ratio a:b)' : '');
    this.dom.feedbackMsg.textContent = '';
    this.dom.feedbackMsg.className = 'feedback-msg';

    this.dom.speechCaption.innerHTML = 'Tap <strong>📢 Explain</strong> to hear calm step-by-step voice coaching.';
    this.dom.tipText.textContent = `💡 How It Works: ${q.tip}`;

    // Render Visual Bar Model
    this.renderBarModel(q.barModel, false);

    // Hide breakdown initially
    this.dom.breakdownContainer.classList.add('hidden');
    this.dom.breakdownBtn.textContent = 'Break it Down 🧩';

    // Quick-select choices if present
    if (this.dom.QuickChoicesRow) {
      if (q.quickChoices && q.quickChoices.length > 0) {
        this.dom.QuickChoicesRow.classList.remove('hidden');
        this.dom.QuickChoicesRow.innerHTML = q.quickChoices.map(c => `
          <button class="quick-choice-btn" data-choice="${c.value}">${c.label}</button>
        `).join('');
        this.dom.QuickChoicesRow.querySelectorAll('.quick-choice-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            this.userAnswer = btn.dataset.choice;
            this.updateAnswerBox();
            sound.playTap();
          });
        });
      } else {
        this.dom.QuickChoicesRow.classList.add('hidden');
        this.dom.QuickChoicesRow.innerHTML = '';
      }
    }

    this.updateGradualBanner();
  }

  renderBarModel(barModel, revealValues = false) {
    if (!this.dom.barModelCard || !barModel) return;
    const groupsHtml = barModel.groups.map(g => {
      const safeCount = Math.max(1, Math.min(g.count || 1, 10));
      const boxes = Array.from({ length: safeCount }, () => `
        <div class="ratio-part-box" style="background:${g.color};">
          ${revealValues ? g.boxText : '•'}
        </div>
      `).join('');
      return `
        <div class="ratio-bar-group">
          <div class="ratio-group-label">${g.label}</div>
          <div class="ratio-boxes-flex">${boxes}</div>
        </div>
      `;
    }).join('');

    this.dom.barModelCard.innerHTML = `
      <div class="bar-model-title">📊 Visual Bar Model: ${barModel.title}</div>
      <div class="ratio-groups-wrap">${groupsHtml}</div>
      <div class="bar-model-summary">${revealValues ? barModel.summary : 'Tap "Break it Down 🧩" to reveal exact box values!'}</div>
    `;
  }

  handleKeyInput(val) {
    sound.playTap();
    if (val === 'clear') {
      this.userAnswer = '';
    } else if (val === 'backspace') {
      this.userAnswer = this.userAnswer.slice(0, -1);
    } else if (val === ':') {
      if (!this.userAnswer.includes(':') && this.userAnswer.length > 0 && this.userAnswer.length < 8) {
        this.userAnswer += ':';
      }
    } else if (/^[0-9]$/.test(val)) {
      if (this.userAnswer.length < 9) {
        this.userAnswer += val;
      }
    }
    this.updateAnswerBox();
  }

  updateAnswerBox() {
    if (!this.dom.answerDisplay) return;
    this.dom.answerDisplay.textContent = this.userAnswer || '?';
    this.dom.answerDisplay.classList.remove('correct', 'incorrect');
  }

  submitAnswer() {
    if (!this.currentQuestion) return;
    if (!this.userAnswer) {
      this.dom.feedbackMsg.textContent = 'Type your answer using the number pad (use : for ratios)!';
      this.dom.feedbackMsg.className = 'feedback-msg try-again';
      return;
    }

    // If inside an active Mock Test
    if (this.activeMock && !this.activeMock.completed) {
      const res = this.submitMockAnswer(this.userAnswer);
      if (res && res.isCorrect) {
        sound.playSuccess();
      } else {
        sound.playTap();
      }
      if (this.activeMock.completed) {
        this.showMockReportCard();
      } else {
        this.nextQuestion();
      }
      return;
    }

    const isCorrect = this.checkUserAnswer(this.userAnswer, this.currentQuestion);
    if (isCorrect) {
      this.streak += 1;
      if (this.streak > this.bestStreak) this.bestStreak = this.streak;
      this.totalSolved += 1;
      this.xp += (this.currentQuestion.marks || 2) * 10;

      this.dom.answerDisplay.classList.add('correct');
      this.dom.feedbackMsg.textContent = `🎉 Spot On! ${this.currentQuestion.answer} ${this.currentQuestion.unitSuffix || ''} (+${(this.currentQuestion.marks || 2) * 10} XP)`;
      this.dom.feedbackMsg.className = 'feedback-msg success-burst';

      if (this.streak % 5 === 0) {
        sound.playStreakBonus();
      } else {
        sound.playSuccess();
      }

      this.renderBarModel(this.currentQuestion.barModel, true);
      this.updateStatsUI();
      this.saveState();

      setTimeout(() => {
        this.nextQuestion();
      }, 1100);
    } else {
      // Streak Shield: never reset to 0, drop by at most 1
      this.streak = Math.max(0, this.streak - 1);
      sound.playGentleTryAgain();
      this.dom.answerDisplay.classList.add('incorrect');
      const firstHint = this.currentQuestion.steps[0] || this.currentQuestion.tip;
      this.dom.feedbackMsg.textContent = `🛡️ Almost! Hint: ${firstHint}`;
      this.dom.feedbackMsg.className = 'feedback-msg try-again';
      this.renderBarModel(this.currentQuestion.barModel, true);
      this.updateStatsUI();
      this.saveState();
    }
  }

  toggleBreakdown() {
    if (!this.currentQuestion || !this.dom.breakdownContainer) return;
    const isHidden = this.dom.breakdownContainer.classList.contains('hidden');
    if (isHidden) {
      this.dom.breakdownContainer.classList.remove('hidden');
      this.dom.breakdownBtn.textContent = 'Hide Breakdown 🧩';
      this.dom.breakdownContainer.innerHTML = `
        <div class="breakdown-card">
          <h4>🧩 Step-by-Step Worked Solution</h4>
          ${this.currentQuestion.steps.map(s => `<div class="bd-step">✅ ${s}</div>`).join('')}
          <div class="bd-step highlight-total">🎯 Answer: ${this.currentQuestion.answer} ${this.currentQuestion.unitSuffix || ''}</div>
        </div>
      `;
      this.renderBarModel(this.currentQuestion.barModel, true);
    } else {
      this.dom.breakdownContainer.classList.add('hidden');
      this.dom.breakdownBtn.textContent = 'Break it Down 🧩';
    }
  }

  speakCurrentQuestion() {
    if (!this.currentQuestion) return;
    if (this.isSpeaking) {
      sound.stopSpeech();
      this.isSpeaking = false;
      this.dom.speakBtn.textContent = '📢 Explain';
      this.dom.speakBtn.classList.remove('speaking');
      return;
    }

    const text = this.currentQuestion.verbal;
    this.dom.speechCaption.textContent = text;
    this.isSpeaking = true;
    this.dom.speakBtn.textContent = '⏹️ Stop';
    this.dom.speakBtn.classList.add('speaking');

    sound.speak(
      text.replace(/:/g, ' to '),
      null,
      () => {
        this.isSpeaking = false;
        if (this.dom.speakBtn) {
          this.dom.speakBtn.textContent = '📢 Explain';
          this.dom.speakBtn.classList.remove('speaking');
        }
      }
    );
  }

  startMockExam(mockNum) {
    this.createMockTest(mockNum);
    this.dom.mockView.classList.add('hidden');
    this.dom.cheatsheetView.classList.add('hidden');
    this.dom.practiceView.classList.remove('hidden');
    document.getElementById('practice-selectors-wrap').classList.add('hidden');
    this.dom.mockActiveBanner.classList.remove('hidden');
    this.dom.mockTitleLabel.textContent = `${this.activeMock.title} (${this.activeMock.totalMarks} Marks)`;
    this.nextQuestion();
  }

  showMockReportCard() {
    const report = this.gradeMockTest(this.activeMock);
    if (!report) return;

    this.weakTopics = report.missedTopicIds;
    this.saveState();

    this.dom.practiceView.classList.add('hidden');
    this.dom.mockView.classList.remove('hidden');
    this.dom.mockReportContainer.classList.remove('hidden');

    const badge = report.percentage >= 80 ? '🏆 Distinction Ready!' : (report.percentage >= 60 ? '⭐ Solid Pass — Polish Weak Spots!' : '💪 Keep Grinding — Practise Weak Topics Below!');

    const topicsHtml = report.topicBreakdown.map(t => {
      const ok = t.correct === t.total;
      return `
        <div class="report-topic-pill ${ok ? 'topic-pass' : 'topic-miss'}">
          ${ok ? '✅' : '🎯'} ${t.name}: <strong>${t.correct}/${t.total}</strong>
        </div>
      `;
    }).join('');

    const missedQuestionsHtml = report.answers
      .filter(a => !a.isCorrect)
      .map(a => `
        <div class="missed-review-card">
          <div><strong>Q${a.question.questionNumber} (${a.question.topicName}):</strong> ${a.question.prompt}</div>
          <div style="margin-top:4px;">Your answer: <span style="color:#DC2626;font-weight:700;">${a.userAnswer}</span> &bull; Correct Answer: <span style="color:#059669;font-weight:800;">${a.question.answer} ${a.question.unitSuffix || ''}</span></div>
          <div style="margin-top:4px;font-size:0.88rem;color:var(--text-muted);">${a.question.steps.join(' → ')}</div>
        </div>
      `).join('');

    this.dom.mockReportContainer.innerHTML = `
      <div class="report-card-box">
        <h3>📊 ${report.title} — Report Card</h3>
        <div class="report-score-big">${report.earnedMarks} / ${report.totalMarks} Marks (${report.percentage}%)</div>
        <div class="report-badge-line">${badge} &bull; ${report.correctCount}/${report.totalQuestions} Questions Correct</div>

        <div class="report-topics-grid">${topicsHtml}</div>

        <div class="report-actions-row">
          ${report.missedTopicIds.length > 0 ? `
            <button id="practise-weak-btn" class="launch-weak-btn">
              🎯 Practise My Weak Topics (${report.missedTopicIds.length} Topics)
            </button>
          ` : `
            <div style="color:#059669;font-weight:800;">🌟 Zero weak topics! You got 100%!</div>
          `}
        </div>

        ${missedQuestionsHtml ? `
          <div class="missed-list-wrap">
            <h4>🔍 Step-by-Step Review of Missed Questions:</h4>
            ${missedQuestionsHtml}
          </div>
        ` : ''}
      </div>
    `;

    const weakBtn = document.getElementById('practise-weak-btn');
    if (weakBtn) {
      weakBtn.addEventListener('click', () => {
        this.currentTopic = 'weak_filter';
        this.switchView('practice');
        this.renderTopicButtons();
        this.nextQuestion();
      });
    }
  }

  renderCheatSheet() {
    if (!this.dom.cheatsheetGrid) return;
    this.dom.cheatsheetGrid.innerHTML = CHEAT_SHEET_DATA.map(card => `
      <article class="cheat-card">
        <div class="cheat-card-header">
          <h4>${card.title}</h4>
          <span class="cheat-badge">${card.badge}</span>
        </div>
        <ul class="cheat-list">
          ${card.lines.map(line => `<li>${line}</li>`).join('')}
        </ul>
      </article>
    `).join('');
  }

  updateStatsUI() {
    if (!this.dom.streakVal) return;
    this.dom.streakVal.textContent = this.streak;
    this.dom.solvedVal.textContent = this.totalSolved;
    this.dom.xpVal.textContent = this.xp;
  }

  applySettings() {
    if (typeof document === 'undefined') return;
    document.body.className = `font-${this.settings.font} theme-${this.settings.theme}`;
    sound.soundEnabled = this.settings.soundFx;
    if (this.dom && this.dom.soundToggle) {
      this.dom.soundToggle.textContent = this.settings.soundFx ? '🔊 Sound: ON' : '🔇 Sound: OFF';
    }
  }

  bindEvents() {
    this.dom.viewTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchView(btn.dataset.view);
      });
    });

    if (this.dom.clearWeakBtn) {
      this.dom.clearWeakBtn.addEventListener('click', () => {
        this.setTopic('writing');
      });
    }

    this.dom.keypadBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleKeyInput(btn.dataset.val);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (this.currentView !== 'practice' && !(this.activeMock && !this.activeMock.completed)) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key >= '0' && e.key <= '9') {
        this.handleKeyInput(e.key);
      } else if (e.key === ':' || e.key === ';') {
        this.handleKeyInput(':');
      } else if (e.key === 'Backspace') {
        this.handleKeyInput('backspace');
      } else if (e.key === 'Enter') {
        this.submitAnswer();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        this.handleKeyInput('clear');
      } else if (e.key === 's' || e.key === 'S') {
        this.speakCurrentQuestion();
      }
    });

    if (this.dom.submitBtn) {
      this.dom.submitBtn.addEventListener('click', () => this.submitAnswer());
    }

    if (this.dom.skipBtn) {
      this.dom.skipBtn.addEventListener('click', () => this.nextQuestion());
    }

    if (this.dom.speakBtn) {
      this.dom.speakBtn.addEventListener('click', () => this.speakCurrentQuestion());
    }

    if (this.dom.breakdownBtn) {
      this.dom.breakdownBtn.addEventListener('click', () => this.toggleBreakdown());
    }

    if (this.dom.visToggleBtn) {
      this.dom.visToggleBtn.addEventListener('click', () => {
        const hidden = this.dom.barModelCard.classList.toggle('hidden');
        this.dom.visToggleBtn.textContent = hidden ? 'Show Bar Model 👁️' : 'Hide Bar Model 👁️';
      });
    }

    if (this.dom.themeToggle) {
      this.dom.themeToggle.addEventListener('click', () => {
        const themes = ['cream', 'dark', 'pastel'];
        this.settings.theme = themes[(themes.indexOf(this.settings.theme) + 1) % themes.length];
        this.applySettings();
        this.saveState();
      });
    }

    if (this.dom.fontToggle) {
      this.dom.fontToggle.addEventListener('click', () => {
        this.settings.font = this.settings.font === 'lexend' ? 'dyslexic' : 'lexend';
        this.applySettings();
        this.saveState();
      });
    }

    if (this.dom.soundToggle) {
      this.dom.soundToggle.addEventListener('click', () => {
        this.settings.soundFx = !this.settings.soundFx;
        this.applySettings();
        this.saveState();
      });
    }

    if (this.dom.timerToggle) {
      this.dom.timerToggle.addEventListener('click', () => {
        this.timerEnabled = !this.timerEnabled;
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.timerEnabled) {
          this.timerSeconds = 0;
          this.dom.timerToggle.textContent = '⏱️ 0:00';
          this.timerInterval = setInterval(() => {
            this.timerSeconds += 1;
            const m = Math.floor(this.timerSeconds / 60);
            const s = String(this.timerSeconds % 60).padStart(2, '0');
            this.dom.timerToggle.textContent = `⏱️ ${m}:${s}`;
          }, 1000);
        } else {
          this.dom.timerToggle.textContent = '⏱️ Timer: OFF';
        }
      });
    }

    document.querySelectorAll('.start-mock-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const num = Number(btn.dataset.mock);
        this.startMockExam(num);
      });
    });

    if (this.dom.quitMockBtn) {
      this.dom.quitMockBtn.addEventListener('click', () => {
        this.activeMock = null;
        this.switchView('mock');
      });
    }

    if (this.dom.readCheatsheetBtn) {
      this.dom.readCheatsheetBtn.addEventListener('click', () => {
        const allText = CHEAT_SHEET_DATA.map(c => `${c.title}. ${c.lines.join(' ')}`).join(' ');
        sound.speak(allText);
      });
    }

    this.initScratchpad();
  }

  initScratchpad() {
    if (!this.dom.scratchpadToggle || !this.dom.scratchpadCanvas) return;
    const canvas = this.dom.scratchpadCanvas;
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let isEraser = false;

    const resize = () => {
      if (this.dom.scratchpadWrapper.classList.contains('hidden')) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && canvas.width !== rect.width) {
        canvas.width = rect.width;
        canvas.height = 140;
      }
    };

    this.dom.scratchpadToggle.addEventListener('click', () => {
      const hidden = this.dom.scratchpadWrapper.classList.toggle('hidden');
      this.dom.scratchpadToggle.textContent = hidden ? 'Scratchpad ✏️' : 'Hide Scratchpad ✏️';
      if (!hidden) resize();
    });

    const penBtn = document.getElementById('scratchpad-pen-btn');
    const eraserBtn = document.getElementById('scratchpad-eraser-btn');
    const clearBtn = document.getElementById('clear-scratchpad-btn');

    if (penBtn && eraserBtn) {
      penBtn.addEventListener('click', () => {
        isEraser = false;
        penBtn.classList.add('active');
        eraserBtn.classList.remove('active');
      });
      eraserBtn.addEventListener('click', () => {
        isEraser = true;
        eraserBtn.classList.add('active');
        penBtn.classList.remove('active');
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
    }

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / (rect.width || 1)),
        y: (clientY - rect.top) * (canvas.height / (rect.height || 1))
      };
    };

    const start = (e) => {
      e.preventDefault();
      drawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const move = (e) => {
      if (!drawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.lineWidth = isEraser ? 20 : 3;
      ctx.lineCap = 'round';
      ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
      ctx.strokeStyle = '#2563EB';
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const end = () => { drawing = false; };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);
  }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.ratioExamApp = new RatioExamApp();
    window.ratioExamApp.init();
  });
}

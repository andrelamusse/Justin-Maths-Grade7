// speech-scripts.js - Neuro-cognitive verbal explanations for dyscalculia/ADHD learners
// Generates clear, non-overwhelming, spoken step-by-step guidance.

export function generateVerbalExplanation(operation, a, b, result) {
  switch (operation) {
    case '+':
      return generateAdditionExplanation(a, b, result);
    case '-':
      return generateSubtractionExplanation(a, b, result);
    case '×':
    case '*':
      return generateMultiplicationExplanation(a, b, result);
    case '÷':
    case '/':
      return generateDivisionExplanation(a, b, result);
    default:
      return `${a} ${operation} ${b} equals ${result}.`;
  }
}

function generateAdditionExplanation(a, b, result) {
  // Adding 1
  if (a === 1) return `Start at ${b}, and count up just one more: that gives ${result}!`;
  if (b === 1) return `Start at ${a}, and count up just one more: that gives ${result}!`;

  // Doubles
  if (a === b && a <= 12) return `A double! Double ${a} is ${result}.`;

  // Facts making 10 (Number bonds to 10)
  if (a + b === 10) {
    return `${a} and ${b} are best friends of 10! Together they make a full ten-frame of 10.`;
  }

  // Single digit basics within 5
  if (a <= 5 && b <= 5) {
    return `Imagine ${a} counters, then add ${b} more. Count them together: ${result}!`;
  }

  // Adding 9 trick (for sums greater than 10)
  if ((a === 9 || b === 9) && a + b > 10) {
    const other = a === 9 ? b : a;
    return `Here is a secret trick for adding 9! Nine is almost 10. First add 10 to ${other} to get ${other + 10}. Then step back by 1. That leaves ${result}!`;
  }

  // Making 10 bridge
  if (a < 10 && b < 10 && a + b > 10) {
    const needFor10 = 10 - a;
    const remaining = b - needFor10;
    return `Let's make a 10 first! ${a} needs ${needFor10} more to fill up a 10. Split ${b} into ${needFor10} and ${remaining}. ${a} plus ${needFor10} is 10, plus ${remaining} more makes ${result}!`;
  }

  // Near doubles (e.g. 6 + 7)
  if (Math.abs(a - b) === 1 && a < 10 && b < 10) {
    const smaller = Math.min(a, b);
    return `This is a near-double! Double ${smaller} is ${smaller * 2}, plus 1 more makes ${result}!`;
  }

  // Two digit numbers without carry (e.g. 34 + 23)
  if (a >= 10 && b >= 10 && (a % 10) + (b % 10) < 10) {
    const aTens = Math.floor(a / 10) * 10;
    const bTens = Math.floor(b / 10) * 10;
    const aOnes = a % 10;
    const bOnes = b % 10;
    const tensSum = aTens + bTens;
    const onesSum = aOnes + bOnes;
    return `Let's break this into tens and ones! First the tens: ${aTens} plus ${bTens} is ${tensSum}. Now the ones: ${aOnes} plus ${bOnes} is ${onesSum}. Put them together: ${tensSum} plus ${onesSum} equals ${result}!`;
  }

  // Two digit numbers with carry (e.g. 48 + 27)
  if (a >= 10 && b >= 10) {
    const aTens = Math.floor(a / 10) * 10;
    const bTens = Math.floor(b / 10) * 10;
    const aOnes = a % 10;
    const bOnes = b % 10;
    const tensSum = aTens + bTens;
    const onesSum = aOnes + bOnes;
    return `Let's solve this step by step. First add the tens: ${aTens} plus ${bTens} is ${tensSum}. Next add the ones: ${aOnes} plus ${bOnes} is ${onesSum}. Finally, add ${tensSum} plus ${onesSum} to get ${result}!`;
  }

  // Two digit plus one digit (e.g. 24 + 5 or 38 + 7)
  if ((a >= 10 && b < 10) || (b >= 10 && a < 10)) {
    const twoD = a >= 10 ? a : b;
    const oneD = a >= 10 ? b : a;
    const tens = Math.floor(twoD / 10) * 10;
    const ones = twoD % 10;
    const newOnes = ones + oneD;
    if (newOnes < 10) {
      return `Start at ${twoD}. Keep the ${tens} in mind, and add the ones: ${ones} plus ${oneD} is ${newOnes}. So the answer is ${result}!`;
    } else {
      return `Start at ${twoD}. Add ${10 - ones} to reach the next ten (${tens + 10}), then add the rest to reach ${result}!`;
    }
  }

  // Fallback
  return `${a} plus ${b} equals ${result}. Count the blocks to see the total!`;
}

function generateSubtractionExplanation(a, b, result) {
  if (b === 1) {
    return `Start at ${a}, and take one step backward on the number line. You land on ${result}!`;
  }
  if (a === b) {
    return `When you take away everything you started with, you have 0 left!`;
  }
  if (a <= 10) {
    return `Imagine you have ${a} dots. Cross out ${b} of them. You have ${result} left!`;
  }

  // Teen subtraction bridging 10 (e.g. 14 - 6)
  if (a > 10 && a < 20 && b < 10) {
    const stepTo10 = a - 10;
    const stepAfter10 = b - stepTo10;
    return `Let's jump back to 10 first! From ${a}, jump back ${stepTo10} steps to reach 10. You still need to take away ${stepAfter10} more. 10 minus ${stepAfter10} leaves ${result}!`;
  }

  // 2-digit without borrow (e.g. 47 - 23 or 15 - 12)
  if (a >= 10 && b >= 10 && (a % 10) >= (b % 10)) {
    const aTens = Math.floor(a / 10) * 10;
    const bTens = Math.floor(b / 10) * 10;
    const tensDiff = aTens - bTens;
    const onesDiff = (a % 10) - (b % 10);
    return `Break it down: ${aTens} minus ${bTens} is ${tensDiff}. Then ${(a % 10)} minus ${(b % 10)} is ${onesDiff}. Combine them to get ${result}!`;
  }

  // 2-digit with borrow / jumping up strategy (e.g. 52 - 28)
  if (a >= 20 && b >= 10) {
    const nextTen = Math.ceil(b / 10) * 10;
    const jumpToTen = nextTen - b;
    const jumpToTarget = a - nextTen;
    if (jumpToTarget === 0) {
      return `Think of jumping up like a frog! From ${b}, jump ${jumpToTen} steps directly up to ${a}! The difference is ${result}!`;
    }
    return `Think of jumping up like a frog! From ${b}, jump ${jumpToTen} steps to reach ${nextTen}. Then jump ${jumpToTarget} more steps to reach ${a}. Add those jumps: ${jumpToTen} plus ${jumpToTarget} is ${result}!`;
  }

  // 2-digit minus 1-digit (e.g. 35 - 3 or 42 - 5)
  if (a >= 20 && b < 10) {
    const ones = a % 10;
    const tens = Math.floor(a / 10) * 10;
    if (ones >= b) {
      return `Keep the tens (${tens}). Subtract the ones: ${ones} minus ${b} is ${ones - b}. Put them together: ${result}!`;
    } else {
      return `From ${a}, count back ${ones} steps to reach ${tens}. Then count back ${b - ones} more steps to land on ${result}!`;
    }
  }

  return `Start at ${a}, subtract ${b}, and you arrive at ${result}.`;
}

function generateMultiplicationExplanation(a, b, result) {
  if (a === 1) return `One group of ${b} is just ${b}!`;
  if (b === 1) return `${a} group of 1 is just ${a}!`;
  if (a === 2) return `Multiplying by 2 means doubling! Double ${b} is ${result}.`;
  if (b === 2) return `Multiplying by 2 means doubling! Double ${a} is ${result}.`;

  if (a === 5 || b === 5) {
    const other = a === 5 ? b : a;
    return `Count by fives ${other} times! 5, 10, 15, 20... up to ${result}.`;
  }

  if (a === 10 || b === 10) {
    const other = a === 10 ? b : a;
    return `Multiplying by 10 is super fast! Take ${other} and put a zero at the end: ${result}!`;
  }

  return `${a} times ${b} means ${a} rows with ${b} dots in each row. Count them up to get ${result}!`;
}

function generateDivisionExplanation(a, b, result) {
  if (b === 1) return `Sharing ${a} items with 1 person means they get all ${a}!`;
  if (a === b) return `Sharing ${a} items among ${b} people means everyone gets exactly 1!`;
  if (b === 2) return `Dividing by 2 means finding half! Half of ${a} is ${result}.`;

  return `${a} divided by ${b} asks: how many groups of ${b} can we make from ${a}? The answer is ${result}!`;
}

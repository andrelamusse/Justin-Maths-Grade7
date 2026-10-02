// hub.js - Portal Hub Stats and Interactions

document.addEventListener('DOMContentLoaded', () => {
  loadCombinedStats();
});

function loadCombinedStats() {
  let grinderXp = 0;
  let grinderSolved = 0;
  let grinderStreak = 0;
  let grade7MasteredCount = 0;

  // Read Grinder stats
  try {
    const grinderData = localStorage.getItem('justin_math_grinder_v1');
    if (grinderData) {
      const parsed = JSON.parse(grinderData);
      grinderXp = parsed.xp || 0;
      grinderSolved = parsed.totalSolved || 0;
      grinderStreak = parsed.bestStreak || 0;
    }
  } catch (e) {
    console.warn('Error reading grinder storage', e);
  }

  // Read Grade 7 Academy stats
  try {
    const grade7Data = localStorage.getItem('justin_grade7_progress_v1');
    if (grade7Data) {
      const parsed = JSON.parse(grade7Data);
      if (parsed.progress && parsed.progress.completedTopics) {
        grade7MasteredCount = Object.keys(parsed.progress.completedTopics).length;
      }
    }
  } catch (e) {
    console.warn('Error reading Grade 7 storage', e);
  }

  // Populate UI
  const totalXpEl = document.getElementById('stat-total-xp');
  const totalSolvedEl = document.getElementById('stat-total-solved');
  const bestStreakEl = document.getElementById('stat-best-streak');
  const masteredTopicsEl = document.getElementById('stat-mastered-topics');

  if (totalXpEl) totalXpEl.textContent = grinderXp;
  if (totalSolvedEl) totalSolvedEl.textContent = grinderSolved;
  if (bestStreakEl) bestStreakEl.textContent = grinderStreak;
  if (masteredTopicsEl) masteredTopicsEl.textContent = grade7MasteredCount;
}

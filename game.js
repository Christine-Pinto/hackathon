// ============================================================
// EmojiHunt - Game Logic
// ============================================================

// ---- Constants ----

const GRID_SIZE = 12;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const MAX_HINTS = 4;
const WRONG_TAP_PENALTY = 3;
const LAUNCH_DATE = '2026-02-10';

// ---- Emoji Families ----

const FAMILIES = [
  { theme: 'Sea Creatures', target: '🐙', distractors: ['🦑','🦐','🦀','🦞','🐡','🐠','🦈','🐟','🦭'] },
  { theme: 'Bugs & Critters', target: '🐛', distractors: ['🐜','🦗','🕷️','🦎','🐊','🐸','🐍','🦂','🪲'] },
  { theme: 'Weapons (RPG)', target: '🗡️', distractors: ['🔪','🪓','🏹','🔫','🪃','🛡️','⚔️','🪄','💣'] },
  { theme: 'Space', target: '🛸', distractors: ['🚀','🌍','🌙','☄️','🪐','🌌','🔭','🛰️','👽'] },
  { theme: 'Effects', target: '⚡', distractors: ['💫','✨','🌟','💥','🔥','❄️','🌪️','💨','🫧'] },
  { theme: 'Villains', target: '👾', distractors: ['🤖','💀','👹','👻','🎃','🧟','🦹','😈','🥷'] },
  { theme: 'Japanese Food', target: '🍙', distractors: ['🍣','🍱','🍜','🍛','🍡','🍘','🥟','🍤','🫕'] },
  { theme: 'Animals', target: '🦊', distractors: ['🐺','🐶','🐱','🦁','🐯','🐻','🐼','🐨','🦝'] },
  { theme: 'Tech', target: '🖥️', distractors: ['💻','🖨️','⌨️','🖱️','📱','💾','📀','🕹️','🔌'] },
  { theme: 'Magic', target: '🔮', distractors: ['🪄','✨','🧿','🎱','💎','🌀','🎭','🪬','🧙'] },
  { theme: 'Music', target: '🎸', distractors: ['🎹','🥁','🎺','🎻','🪘','🎷','🪗','🎤','🎵'] },
  { theme: 'Sports', target: '⚽', distractors: ['🏀','🏈','⚾','🎾','🏐','🏓','🏒','🥊','🏋️'] },
  { theme: 'Faces', target: '🥸', distractors: ['😎','🤓','🧐','🤠','🥳','🤩','😏','🫠','🤭'] },
  { theme: 'Vehicles', target: '🏎️', distractors: ['🚗','🚕','🚙','🚌','🚎','🏍️','🚐','🚓','🚑'] },
  { theme: 'Weather', target: '🌩️', distractors: ['☀️','🌤️','⛅','🌦️','🌧️','❄️','🌪️','🌫️','🌈'] },
  { theme: 'Plants', target: '🌵', distractors: ['🌲','🌳','🌴','🎋','🌿','☘️','🍀','🎍','🪴'] },
  { theme: 'Cat Faces', target: '😼', distractors: ['😺','😸','😹','😻','😽','🙀','😿','😾','🐱'] },
  { theme: 'Hands', target: '🤙', distractors: ['👋','✋','🖐️','🖖','👌','🤌','🤏','✌️','🤞'] },
  { theme: 'Fruit', target: '🍑', distractors: ['🍎','🍐','🍊','🍋','🍇','🍓','🍒','🥭','🍌'] },
  { theme: 'Drinks', target: '🧋', distractors: ['☕','🍵','🥤','🍶','🍺','🍷','🥃','🧃','🍹'] },
  { theme: 'Books', target: '📕', distractors: ['📗','📘','📙','📓','📔','📒','📖','📚','📑'] },
  { theme: 'Monkeys', target: '🙈', distractors: ['🙉','🙊','🐵','🐒','🦍','🦧','🐵','🙉','🙊'] },
  { theme: 'Sweets', target: '🍩', distractors: ['🍪','🍰','🧁','🍫','🍬','🍭','🎂','🥧','🍦'] },
  { theme: 'Balls', target: '🎱', distractors: ['⚽','🏀','🏈','⚾','🎾','🏐','🥎','🏉','🪀'] },
  { theme: 'Trains', target: '🚄', distractors: ['🚂','🚃','🚅','🚆','🚇','🚈','🚉','🚊','🚝'] },
  { theme: 'Dragons & Dinos', target: '🐲', distractors: ['🐉','🦕','🦖','🐊','🦎','🐍','🐸','🦴','🔥'] },
  { theme: 'Hats & Crowns', target: '👑', distractors: ['🎩','🧢','⛑️','🪖','🎓','👒','🤠','💂','🎪'] },
  { theme: 'Tools', target: '🔧', distractors: ['🔨','⛏️','🪛','🪚','🔩','⚙️','🗜️','🪝','🧲'] },
  { theme: 'Spooky', target: '👻', distractors: ['💀','☠️','🎃','👹','👺','😈','🧟','🦇','🕸️'] },
  { theme: 'Ocean', target: '🐋', distractors: ['🐳','🐬','🦈','🐟','🐠','🐡','🦐','🦭','🪸'] },
];

// ---- Punny Titles ----

const TITLES = {
  5: [
    'Byakugan activated!',
    'Observation Haki: MAXED',
    'You have Eagle Vision',
    'Main character energy',
    'Built different',
    'No hints? Nani?!',
    'Ultra Instinct unlocked',
    'The One from the Matrix',
  ],
  4: [
    'Almost went Ultra Instinct',
    'Just a small power-up needed',
    'A-rank hunter',
    'One hint? Still goated',
    'Scouter says... impressive',
  ],
  3: [
    'ENHANCE! ...ok one more ENHANCE!',
    'B-rank but still vibing',
    'The clues were... helpful',
    'Mid-game power boost',
    'Side character arc complete',
  ],
  2: [
    "It's dangerous to go alone",
    'You need a bigger minimap',
    'GPS: recalculating...',
    'Have you tried wearing glasses?',
  ],
  1: [
    '!! (MGS alert sound)',
    'Task failed successfully',
    'NPC energy but you made it',
    'The real treasure was the hints',
  ],
};

// ---- Seeded RNG (mulberry32) ----

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Shuffle array in place using provided rng function
function shuffle(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---- Day & Puzzle Number ----

function getUTCToday() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function getUTCDateString(date) {
  return date.toISOString().slice(0, 10);
}

function getDaysSinceEpoch() {
  return Math.floor(getUTCToday().getTime() / 86400000);
}

function getPuzzleNumber() {
  const launch = new Date(LAUNCH_DATE + 'T00:00:00Z');
  const diff = getUTCToday().getTime() - launch.getTime();
  return Math.floor(diff / 86400000) + 1;
}

function getTodayDateString() {
  return getUTCDateString(getUTCToday());
}

// ---- Game State ----

const state = {
  mode: 'daily', // 'daily' or 'practice'
  family: null,
  grid: [], // array of emoji strings, length = TOTAL_CELLS
  targetPos: -1,
  fadeOrder: [], // pre-shuffled indices of non-target cells for hint fading
  fadedCells: new Set(),
  hintsUsed: 0,
  wrongTaps: 0,
  journey: [],
  startTime: 0,
  elapsed: 0,
  penalty: 0, // accumulated wrong tap penalty in seconds
  timerInterval: null,
  found: false,
  puzzleNumber: 0,
};

// ---- DOM References ----

const dom = {};

function cacheDom() {
  dom.screenWelcome = document.getElementById('screen-welcome');
  dom.screenGame = document.getElementById('screen-game');
  dom.btnPlayDaily = document.getElementById('btn-play-daily');
  dom.btnPlayPracticeWelcome = document.getElementById('btn-play-practice-welcome');
  dom.btnHelp = document.getElementById('btn-help');
  dom.btnStats = document.getElementById('btn-stats');
  dom.targetEmoji = document.getElementById('target-emoji');
  dom.timer = document.getElementById('timer');
  dom.btnHint = document.getElementById('btn-hint');
  dom.hintText = document.getElementById('hint-text');
  dom.grid = document.getElementById('grid');
  dom.starsDisplay = document.getElementById('stars-display');
  dom.modalResults = document.getElementById('modal-results');
  dom.resultsTitle = document.getElementById('results-title');
  dom.resultsStars = document.getElementById('results-stars');
  dom.resultsInfo = document.getElementById('results-info');
  dom.resultsStatsLine = document.getElementById('results-stats-line');
  dom.resultsJourney = document.getElementById('results-journey');
  dom.btnCopy = document.getElementById('btn-copy');
  dom.copyToast = document.getElementById('copy-toast');
  dom.resultsStreak = document.getElementById('results-streak');
  dom.resultsCountdown = document.getElementById('results-countdown');
  dom.btnPracticeFromResults = document.getElementById('btn-practice-from-results');
  dom.modalPracticeResults = document.getElementById('modal-practice-results');
  dom.practiceResultsStars = document.getElementById('practice-results-stars');
  dom.practiceResultsInfo = document.getElementById('practice-results-info');
  dom.btnPracticeAgain = document.getElementById('btn-practice-again');
  dom.btnBackDaily = document.getElementById('btn-back-daily');
  dom.modalStats = document.getElementById('modal-stats');
  dom.btnCloseStats = document.getElementById('btn-close-stats');
  dom.statsSummary = document.getElementById('stats-summary');
  dom.statsDistribution = document.getElementById('stats-distribution');
  dom.statsTimes = document.getElementById('stats-times');
  dom.modalHelp = document.getElementById('modal-help');
  dom.btnCloseHelp = document.getElementById('btn-close-help');
}

// ---- LocalStorage ----

function loadJSON(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadSettings() {
  return loadJSON('emojihunt_settings') || { sound: false, hasSeenWelcome: false };
}

function saveSettings(settings) {
  saveJSON('emojihunt_settings', settings);
}

function loadTodayResult() {
  const data = loadJSON('emojihunt_today');
  if (data && data.date === getTodayDateString()) return data;
  return null;
}

function saveTodayResult() {
  saveJSON('emojihunt_today', {
    date: getTodayDateString(),
    puzzleNumber: state.puzzleNumber,
    stars: getStars(),
    time: parseFloat(getElapsedDisplay()),
    journey: [...state.journey],
    hintsUsed: state.hintsUsed,
    wrongTaps: state.wrongTaps,
    familyTarget: state.family.target,
  });
}

function loadStats() {
  return loadJSON('emojihunt_stats') || {
    played: 0,
    distribution: [0, 0, 0, 0, 0], // index 0 = 1 star, index 4 = 5 stars
    currentStreak: 0,
    maxStreak: 0,
    bestTime: null,
    totalTime: 0,
    lastPlayedDate: null,
  };
}

function saveStats(stats) {
  saveJSON('emojihunt_stats', stats);
}

function updateStats() {
  const stats = loadStats();
  const stars = getStars();
  const time = parseFloat(getElapsedDisplay());
  const today = getTodayDateString();

  stats.played++;
  stats.distribution[stars - 1]++;
  stats.totalTime += time;
  if (stats.bestTime === null || time < stats.bestTime) {
    stats.bestTime = time;
  }

  // Streak logic
  if (stats.lastPlayedDate) {
    const lastDate = new Date(stats.lastPlayedDate + 'T00:00:00Z');
    const todayDate = new Date(today + 'T00:00:00Z');
    const diffDays = Math.floor((todayDate - lastDate) / 86400000);
    if (diffDays === 1) {
      stats.currentStreak++;
    } else if (diffDays > 1) {
      stats.currentStreak = 1;
    }
    // diffDays === 0 means already played today (shouldn't happen but safe)
  } else {
    stats.currentStreak = 1;
  }

  if (stats.currentStreak > stats.maxStreak) {
    stats.maxStreak = stats.currentStreak;
  }

  stats.lastPlayedDate = today;
  saveStats(stats);
}

// ---- Scoring ----

function getStars() {
  return Math.max(1, MAX_HINTS + 1 - state.hintsUsed);
}

function getElapsedDisplay() {
  return (state.elapsed + state.penalty).toFixed(1);
}

// ---- Puzzle Selection ----

function selectFamily(rng) {
  // Shuffle family indices and pick first one (deterministic for daily)
  const indices = Array.from({ length: FAMILIES.length }, (_, i) => i);
  shuffle(indices, rng);
  return FAMILIES[indices[0]];
}

// ---- Grid Building ----

function buildGrid(rng) {
  const family = state.family;
  const grid = [];

  // Place target at a random position
  state.targetPos = Math.floor(rng() * TOTAL_CELLS);

  // Fill grid with distractors
  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (i === state.targetPos) {
      grid.push(family.target);
    } else {
      grid.push(family.distractors[Math.floor(rng() * family.distractors.length)]);
    }
  }

  state.grid = grid;

  // Pre-compute fade order for hints
  const nonTargetIndices = [];
  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (i !== state.targetPos) nonTargetIndices.push(i);
  }
  shuffle(nonTargetIndices, rng);
  state.fadeOrder = nonTargetIndices;
}

function renderGrid() {
  dom.grid.innerHTML = '';
  state.grid.forEach((emoji, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = emoji;
    cell.dataset.index = index;
    cell.style.animationDelay = `${(index % 24) * 12}ms`;
    cell.style.animation = 'fadeInCell 0.2s ease backwards';
    cell.addEventListener('click', () => handleCellTap(index));
    dom.grid.appendChild(cell);
  });
}

// ---- Timer ----

function startTimer() {
  state.startTime = performance.now();
  state.elapsed = 0;
  state.penalty = 0;
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.elapsed = (performance.now() - state.startTime) / 1000;
    updateTimerDisplay();
  }, 50);
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  state.elapsed = (performance.now() - state.startTime) / 1000;
}

function updateTimerDisplay() {
  dom.timer.textContent = getElapsedDisplay() + 's';
}

// ---- Stars Display ----

function renderStars() {
  const stars = getStars();
  dom.starsDisplay.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const span = document.createElement('span');
    span.className = 'star' + (i >= stars ? ' dimmed' : '');
    span.textContent = '⭐';
    dom.starsDisplay.appendChild(span);
  }
}

// ---- Hint Button ----

function updateHintButton() {
  const remaining = MAX_HINTS - state.hintsUsed;
  if (remaining <= 0) {
    dom.btnHint.disabled = true;
    dom.hintText.textContent = 'No hints left';
  } else {
    dom.btnHint.disabled = false;
    dom.hintText.textContent = `Hint (-1⭐)`;
  }
}

// ---- Game Logic ----

function handleCellTap(index) {
  if (state.found) return;

  const cell = dom.grid.children[index];

  // Ignore taps on faded cells
  if (state.fadedCells.has(index)) return;

  if (index === state.targetPos) {
    // Correct!
    state.found = true;
    state.journey.push('🎯');
    stopTimer();
    celebrate(cell);
  } else {
    // Wrong tap
    state.wrongTaps++;
    state.penalty += WRONG_TAP_PENALTY;
    state.journey.push('❌');
    updateTimerDisplay();

    // Animate wrong tap
    cell.classList.remove('wrong');
    void cell.offsetWidth; // force reflow for re-animation
    cell.classList.add('wrong');
    setTimeout(() => cell.classList.remove('wrong'), 300);
  }
}

function useHint() {
  if (state.hintsUsed >= MAX_HINTS || state.found) return;

  state.hintsUsed++;
  state.journey.push('💡');

  // Calculate which cells to fade this hint
  const totalNonTarget = TOTAL_CELLS - 1; // 143
  const alreadyFaded = state.fadedCells.size;
  const remaining = totalNonTarget - alreadyFaded;

  let toFadeCount;
  if (state.hintsUsed === MAX_HINTS) {
    // Last hint: leave only 3 distractors visible
    toFadeCount = Math.max(0, remaining - 3);
  } else {
    toFadeCount = Math.floor(remaining / 2);
  }

  // Fade the next chunk from the pre-shuffled fadeOrder
  let faded = 0;
  for (let i = 0; i < state.fadeOrder.length && faded < toFadeCount; i++) {
    const idx = state.fadeOrder[i];
    if (!state.fadedCells.has(idx)) {
      state.fadedCells.add(idx);
      dom.grid.children[idx].classList.add('faded');
      faded++;
    }
  }

  renderStars();
  updateHintButton();
}

function celebrate(cell) {
  cell.classList.add('found');
  dom.grid.classList.add('dimmed');

  setTimeout(() => {
    if (state.mode === 'daily') {
      saveTodayResult();
      updateStats();
      showDailyResults();
    } else {
      showPracticeResults();
    }
  }, 1200);
}

// ---- Results: Daily ----

function showDailyResults() {
  const stars = getStars();
  const puzzleNum = state.puzzleNumber;
  const dayNum = getDaysSinceEpoch();

  // Title
  const titlePool = TITLES[stars];
  dom.resultsTitle.textContent = titlePool[dayNum % titlePool.length];

  // Stars with pop animation
  dom.resultsStars.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const span = document.createElement('span');
    span.className = 'star-pop' + (i >= stars ? ' dimmed' : '');
    span.textContent = '⭐';
    span.style.animationDelay = `${i * 150}ms`;
    dom.resultsStars.appendChild(span);
  }

  // Info
  dom.resultsInfo.textContent = `${state.family.target} found in ${getElapsedDisplay()}s`;
  dom.resultsStatsLine.textContent = `${state.hintsUsed} hint${state.hintsUsed !== 1 ? 's' : ''}, ${state.wrongTaps} miss${state.wrongTaps !== 1 ? 'es' : ''}`;

  // Journey
  dom.resultsJourney.textContent = state.journey.join('');

  // Streak
  const stats = loadStats();
  if (stats.currentStreak > 1) {
    dom.resultsStreak.textContent = `🔥 ${stats.currentStreak} day streak`;
    dom.resultsStreak.style.display = '';
  } else {
    dom.resultsStreak.style.display = 'none';
  }

  // Copy button reset
  dom.copyToast.classList.add('hidden');

  // Show/hide elements for daily mode
  dom.btnCopy.style.display = '';
  dom.resultsJourney.style.display = '';
  dom.resultsStreak.style.display = stats.currentStreak > 1 ? '' : 'none';
  dom.resultsCountdown.style.display = '';
  dom.btnPracticeFromResults.style.display = '';

  startCountdown();
  showModal(dom.modalResults);

  // Confetti for 5 stars
  if (stars === 5 && typeof confetti === 'function') {
    setTimeout(() => {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 50, spread: 90, origin: { y: 0.7 } }), 300);
    }, 400);
  }
}

// ---- Results: Practice ----

function showPracticeResults() {
  const stars = getStars();

  dom.practiceResultsStars.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const span = document.createElement('span');
    span.className = 'star-pop' + (i >= stars ? ' dimmed' : '');
    span.textContent = '⭐';
    span.style.animationDelay = `${i * 150}ms`;
    dom.practiceResultsStars.appendChild(span);
  }

  dom.practiceResultsInfo.textContent = `${state.family.target} found in ${getElapsedDisplay()}s`;

  showModal(dom.modalPracticeResults);
}

// ---- Copy to Clipboard ----

function copyResults() {
  const stars = getStars();
  const starStr = '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
  const journeyStr = state.journey.join('');
  const text = [
    `🔍 EmojiHunt #${state.puzzleNumber} ${state.family.target}`,
    journeyStr,
    `${starStr} ${getElapsedDisplay()}s`,
    'emojihunt.io',
  ].join('\n');

  navigator.clipboard.writeText(text).then(() => {
    dom.copyToast.classList.remove('hidden');
    setTimeout(() => dom.copyToast.classList.add('hidden'), 2000);
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    dom.copyToast.classList.remove('hidden');
    setTimeout(() => dom.copyToast.classList.add('hidden'), 2000);
  });
}

// ---- Countdown ----

let countdownInterval = null;

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  function update() {
    const now = new Date();
    const tomorrow = new Date(Date.UTC(
      now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1
    ));
    const diff = tomorrow - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    dom.resultsCountdown.textContent =
      `Next puzzle in ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  update();
  countdownInterval = setInterval(update, 1000);
}

// ---- Stats Modal ----

function showStatsModal() {
  const stats = loadStats();

  // Summary
  const avgTime = stats.played > 0 ? (stats.totalTime / stats.played).toFixed(1) : '-';
  dom.statsSummary.innerHTML = `
    <div class="stat-item"><div class="stat-value">${stats.played}</div><div class="stat-label">Played</div></div>
    <div class="stat-item"><div class="stat-value">${stats.currentStreak}</div><div class="stat-label">Streak</div></div>
    <div class="stat-item"><div class="stat-value">${stats.maxStreak}</div><div class="stat-label">Best</div></div>
    <div class="stat-item"><div class="stat-value">${stats.bestTime !== null ? stats.bestTime.toFixed(1) + 's' : '-'}</div><div class="stat-label">Fastest</div></div>
  `;

  // Distribution
  const maxCount = Math.max(...stats.distribution, 1);
  const todayResult = loadTodayResult();
  const todayStars = todayResult ? todayResult.stars : null;

  dom.statsDistribution.innerHTML = '';
  for (let i = 4; i >= 0; i--) {
    const count = stats.distribution[i];
    const pct = (count / maxCount) * 100;
    const isToday = todayStars === i + 1;
    dom.statsDistribution.innerHTML += `
      <div class="dist-row">
        <span class="dist-label">${i + 1}⭐</span>
        <div class="dist-bar-container">
          <div class="dist-bar${isToday ? ' highlight' : ''}" style="width: ${Math.max(pct, 8)}%">${count}</div>
        </div>
      </div>
    `;
  }

  // Times
  dom.statsTimes.innerHTML = `Avg time: ${avgTime}s`;

  showModal(dom.modalStats);
}

// ---- Modal Helpers ----

function showModal(modal) {
  modal.classList.remove('hidden');
}

function hideModal(modal) {
  modal.classList.add('hidden');
}

function hideAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}

// ---- Screen Management ----

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
}

// ---- Game Initialization ----

function initGame(mode) {
  state.mode = mode;
  state.found = false;
  state.hintsUsed = 0;
  state.wrongTaps = 0;
  state.journey = [];
  state.fadedCells = new Set();
  state.penalty = 0;
  state.elapsed = 0;

  hideAllModals();

  if (mode === 'daily') {
    const dayNum = getDaysSinceEpoch();
    state.puzzleNumber = getPuzzleNumber();
    const rng = mulberry32(dayNum);
    state.family = selectFamily(rng);
    buildGrid(rng);
  } else {
    // Practice: use Math.random
    const rngFn = () => Math.random();
    const familyIndex = Math.floor(Math.random() * FAMILIES.length);
    state.family = FAMILIES[familyIndex];
    state.puzzleNumber = 0;
    buildGrid(rngFn);
  }

  dom.targetEmoji.textContent = state.family.target;
  dom.timer.textContent = '0.0s';
  dom.grid.classList.remove('dimmed');
  renderGrid();
  renderStars();
  updateHintButton();
  showScreen('screen-game');
  startTimer();
}

// ---- Already Played Today ----

function showAlreadyPlayed() {
  const result = loadTodayResult();
  if (!result) return;

  // Reconstruct state for display
  state.mode = 'daily';
  state.puzzleNumber = result.puzzleNumber;
  state.hintsUsed = result.hintsUsed;
  state.wrongTaps = result.wrongTaps;
  state.journey = result.journey;
  state.elapsed = result.time;
  state.penalty = 0;
  state.family = FAMILIES.find(f => f.target === result.familyTarget) || FAMILIES[0];

  showScreen('screen-game');
  // Show results directly
  const stars = result.stars;
  const dayNum = getDaysSinceEpoch();
  const titlePool = TITLES[stars];
  dom.resultsTitle.textContent = titlePool[dayNum % titlePool.length];

  dom.resultsStars.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const span = document.createElement('span');
    span.className = i < stars ? '' : 'dimmed';
    span.textContent = '⭐';
    dom.resultsStars.appendChild(span);
  }

  dom.resultsInfo.textContent = `${result.familyTarget} found in ${result.time.toFixed(1)}s`;
  dom.resultsStatsLine.textContent = `${result.hintsUsed} hint${result.hintsUsed !== 1 ? 's' : ''}, ${result.wrongTaps} miss${result.wrongTaps !== 1 ? 'es' : ''}`;
  dom.resultsJourney.textContent = result.journey.join('');

  const stats = loadStats();
  if (stats.currentStreak > 1) {
    dom.resultsStreak.textContent = `🔥 ${stats.currentStreak} day streak`;
    dom.resultsStreak.style.display = '';
  } else {
    dom.resultsStreak.style.display = 'none';
  }

  dom.btnCopy.style.display = '';
  dom.resultsJourney.style.display = '';
  dom.resultsCountdown.style.display = '';
  dom.btnPracticeFromResults.style.display = '';
  dom.copyToast.classList.add('hidden');

  startCountdown();
  showModal(dom.modalResults);
}

// ---- Event Binding ----

function bindEvents() {
  // Welcome buttons
  dom.btnPlayDaily.addEventListener('click', () => {
    const settings = loadSettings();
    settings.hasSeenWelcome = true;
    saveSettings(settings);
    initGame('daily');
  });

  dom.btnPlayPracticeWelcome.addEventListener('click', () => {
    const settings = loadSettings();
    settings.hasSeenWelcome = true;
    saveSettings(settings);
    initGame('practice');
  });

  // Game screen buttons
  dom.btnHint.addEventListener('click', useHint);
  dom.btnHelp.addEventListener('click', () => showModal(dom.modalHelp));
  dom.btnStats.addEventListener('click', showStatsModal);

  // Results modal buttons
  dom.btnCopy.addEventListener('click', copyResults);
  dom.btnPracticeFromResults.addEventListener('click', () => {
    hideAllModals();
    initGame('practice');
  });

  // Practice results buttons
  dom.btnPracticeAgain.addEventListener('click', () => {
    hideAllModals();
    initGame('practice');
  });

  dom.btnBackDaily.addEventListener('click', () => {
    hideAllModals();
    const todayResult = loadTodayResult();
    if (todayResult) {
      showAlreadyPlayed();
    } else {
      initGame('daily');
    }
  });

  // Close buttons
  dom.btnCloseStats.addEventListener('click', () => hideModal(dom.modalStats));
  dom.btnCloseHelp.addEventListener('click', () => hideModal(dom.modalHelp));

  // Close modals on backdrop click (only for help and stats)
  [dom.modalStats, dom.modalHelp].forEach(modal => {
    modal.querySelector('.modal-backdrop').addEventListener('click', () => hideModal(modal));
  });
}

// ---- Main Init ----

function init() {
  cacheDom();
  bindEvents();

  const settings = loadSettings();
  const todayResult = loadTodayResult();

  if (todayResult) {
    // Already played today: show game screen with results
    showAlreadyPlayed();
  } else if (settings.hasSeenWelcome) {
    // Returning player, hasn't played today: go straight to game
    initGame('daily');
  } else {
    // First visit: show welcome
    showScreen('screen-welcome');
  }
}

document.addEventListener('DOMContentLoaded', init);

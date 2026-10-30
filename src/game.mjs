import {
  calculateMemoryScore,
  createMemoryTask,
  isMemoryAnswerCorrect,
  memorySolution,
} from './memory-logic.mjs';

export const AGE_GROUPS = ['8-12', '13-17', '18+'];

export const DIFFICULTY_PROFILES = [
  { id: 1, name: 'Entspannt', easy: 5, challenging: 0 },
  { id: 2, name: 'Locker', easy: 4, challenging: 1 },
  { id: 3, name: 'Ausgewogen', easy: 3, challenging: 2 },
  { id: 4, name: 'Knifflig', easy: 2, challenging: 3 },
  { id: 5, name: 'Schwer', easy: 1, challenging: 4 },
  { id: 6, name: 'Extrem', easy: 0, challenging: 5 },
];

export const TASKS = [
  { mechanic: 'Memory Logic' },
  {
    mechanic: 'Zahlenfolge',
    inputType: 'sequence',
  },
  {
    mechanic: 'Muster fortsetzen',
    question: 'Welches Zeichen kommt als Nächstes? ○ △ ○ △ ○ ?',
    options: ['○', '△', '□'],
    answer: '△',
    challenging: {
      question: 'Welches Zeichen kommt als Nächstes? ○ △ △ ○ △ △ ○ ?',
      options: ['○', '△', '□'],
      answer: '△',
    },
  },
  {
    mechanic: 'Was passt nicht?',
    question: 'Welche Zahl passt nicht in die Reihe?',
    options: ['2', '4', '6', '9'],
    answer: '9',
    challenging: {
      question: 'Welche Zahl ist keine Quadratzahl?',
      options: ['4', '9', '16', '20'],
      answer: '20',
    },
  },
  {
    mechanic: 'Raster-Logik',
    question: 'In jeder Zeile wechseln sich A und B ab: A B / B ?',
    options: ['A', 'B', 'C'],
    answer: 'A',
    challenging: {
      question: 'Jede Zahl rechts ist doppelt so groß wie die links: 2 → 4, 3 → 6, 4 → ?',
      options: ['6', '8', '10'],
      answer: '8',
    },
  },
  {
    mechanic: 'Drehen & Denken',
    question: 'Ein Pfeil ↑ wird um 90° im Uhrzeigersinn gedreht. Wohin zeigt er?',
    options: ['←', '→', '↓'],
    answer: '→',
    challenging: {
      question: 'Ein Pfeil ↗ wird um 90° im Uhrzeigersinn gedreht. Wohin zeigt er?',
      options: ['↖', '↘', '↙'],
      answer: '↘',
    },
  },
  {
    mechanic: 'Reihenfolge',
    question: 'Welche Zahlenfolge ist aufsteigend geordnet?',
    options: ['2 · 5 · 8', '5 · 2 · 8', '8 · 5 · 2'],
    answer: '2 · 5 · 8',
    challenging: {
      question: 'Anna ist vor Bo an der Reihe. Cem ist nach Bo an der Reihe. Wer steht in der Mitte?',
      options: ['Anna', 'Bo', 'Cem'],
      answer: 'Bo',
    },
  },
  {
    mechanic: 'Visueller Vergleich',
    question: 'Was hat sich verändert? ● ◆ ●  →  ● ○ ●',
    options: ['Das mittlere Zeichen', 'Das linke Zeichen', 'Das rechte Zeichen'],
    answer: 'Das mittlere Zeichen',
    challenging: {
      question: 'Was hat sich verändert? ● ◆ ▲  →  ● ○ ■',
      options: ['Die letzten beiden Zeichen', 'Das letzte Zeichen', 'Nur das mittlere Zeichen'],
      answer: 'Die letzten beiden Zeichen',
    },
  },
  {
    mechanic: 'Wortlogik',
    question: 'Katze verhält sich zu Kätzchen wie Hund zu …',
    options: ['Welpe', 'Pferd', 'Pfote'],
    answer: 'Welpe',
    challenging: {
      question: 'Kapitel verhält sich zu Buch wie Strophe zu …',
      options: ['Melodie', 'Lied', 'Instrument'],
      answer: 'Lied',
    },
  },
  {
    mechanic: 'Rechenlogik',
    inputType: 'arithmetic',
  },
];

const SEQUENCE_LIMITS = { '8-12': 100, '13-17': 1_000, '18+': 10_000 };
const SEQUENCE_SCALES = { '8-12': 1, '13-17': 5, '18+': 20 };

const SEQUENCE_TEMPLATES = {
  leicht: [
    {
      kind: 'difference',
      start: 3,
      parameter: 4,
      patternHint: 'Addiere bei jedem Schritt dieselbe Zahl.',
    },
    {
      kind: 'factor',
      start: 1,
      parameter: 2,
      patternHint: 'Multipliziere jeden Folgenterm mit demselben Faktor.',
    },
  ],
  anspruchsvoll: [
    {
      kind: 'alternating',
      start: 1,
      firstDifference: 2,
      secondDifference: 5,
      patternHint: 'Es wechseln sich zwei verschiedene Differenzen ab.',
    },
    {
      kind: 'second-difference',
      start: 2,
      firstDifference: 1,
      secondDifference: 2,
      patternHint: 'Betrachte die Differenzen zwischen benachbarten Zahlen.',
    },
  ],
};

function sequenceTerms(template, difficulty, scale) {
  const count = difficulty === 'leicht' ? 5 : 6;
  const terms = [template.start * scale];
  if (template.kind === 'difference') {
    while (terms.length < count + 1) terms.push(terms.at(-1) + template.parameter * scale);
  } else if (template.kind === 'factor') {
    while (terms.length < count + 1) terms.push(terms.at(-1) * template.parameter);
  } else if (template.kind === 'alternating') {
    while (terms.length < count + 1) {
      const difference = terms.length % 2 === 1 ? template.firstDifference : template.secondDifference;
      terms.push(terms.at(-1) + difference * scale);
    }
  } else {
    let difference = template.firstDifference * scale;
    while (terms.length < count + 1) {
      terms.push(terms.at(-1) + difference);
      difference += template.secondDifference * scale;
    }
  }
  return terms;
}

export function validateNumberSequence(terms, answer, difficulty) {
  if (!Array.isArray(terms) || terms.length !== (difficulty === 'leicht' ? 5 : 6)
    || !Number.isInteger(answer) || [...terms, answer].some((term) => !Number.isInteger(term) || term < 0)) return false;
  const differences = terms.slice(1).map((term, index) => term - terms[index]);
  const candidates = [];
  if (difficulty === 'leicht') {
    if (differences.every((difference) => difference === differences[0]) && differences[0] !== 0) {
      candidates.push(terms.at(-1) + differences[0]);
    }
    for (let factor = 2; factor <= 4; factor += 1) {
      if (terms.slice(1).every((term, index) => term === terms[index] * factor)) candidates.push(terms.at(-1) * factor);
    }
  } else {
    if (differences.length >= 3 && differences[0] !== differences[1]
      && differences.every((difference, index) => difference === differences[index % 2])) {
      candidates.push(terms.at(-1) + differences[1]);
    }
    const secondDifferences = differences.slice(1).map((difference, index) => difference - differences[index]);
    if (secondDifferences.length && secondDifferences.every((difference) => difference === secondDifferences[0])
      && secondDifferences[0] !== 0) {
      candidates.push(terms.at(-1) + differences.at(-1) + secondDifferences[0]);
    }
  }
  return candidates.length > 0 && candidates.every((candidate) => candidate === answer);
}

export function createSequenceTask(ageGroup, difficulty, random = Math.random) {
  const level = difficulty === 'leicht' ? 'leicht' : 'anspruchsvoll';
  const templates = SEQUENCE_TEMPLATES[level];
  const template = templates[Math.floor(random() * templates.length)];
  const terms = sequenceTerms(template, level, SEQUENCE_SCALES[ageGroup]);
  const shown = terms.slice(0, level === 'leicht' ? 5 : 6);
  const answer = terms.at(-1);
  const scale = SEQUENCE_SCALES[ageGroup];
  const rule = template.kind === 'difference'
    ? `Die Folge wächst bei jedem Schritt um ${template.parameter * scale}.`
    : template.kind === 'factor'
      ? `Jede Zahl wird mit ${template.parameter} multipliziert.`
      : template.kind === 'alternating'
        ? `Die Differenzen wechseln zwischen ${template.firstDifference * scale} und ${template.secondDifference * scale}.`
        : `Die Differenz wächst bei jedem Schritt um ${template.secondDifference * scale}.`;
  const calculation = template.kind === 'factor'
    ? `${shown.at(-1)} × ${template.parameter} = ${answer}`
    : `${shown.at(-1)} + ${answer - shown.at(-1)} = ${answer}`;
  if (terms.some((term) => term > SEQUENCE_LIMITS[ageGroup]) || !validateNumberSequence(shown, answer, level)) {
    throw new TypeError('Die Zahlenfolge erfüllt das Altersgruppenprofil nicht.');
  }
  return {
    inputType: 'sequence',
    question: `Welche Zahl setzt die Folge fort? ${shown.join(' · ')} · ?`,
    sequence: shown,
    answer,
    rule,
    hints: [
      level === 'leicht' ? 'Prüfe, ob die Folge eine konstante Differenz oder einen konstanten Faktor nutzt.' : 'Die Folge nutzt abwechselnde Differenzen oder eine konstante zweite Differenz.',
      template.patternHint,
    ],
    explanation: `Folge: ${[...shown, answer].join(' · ')}. Regel: ${rule} Berechnung: ${calculation}.`,
  };
}

const ARITHMETIC_TEMPLATES = {
  '8-12': {
    leicht: {
      fields: [{ name: 'x', min: 0, max: 10 }, { name: 'y', min: 0, max: 10 }],
      equations: ['x + y = 11'],
      conditions: ['x < y', 'x ist gerade (durch 2 teilbar)', 'y > 8'],
      solution: { x: 2, y: 9 },
      options: [{ x: 3, y: 8 }, { x: 4, y: 7 }, { x: 1, y: 10 }],
      reasoning: 'Weil y größer als 8 ist und x + y = 11 gilt, bleiben nur y = 9 mit x = 2 oder y = 10 mit x = 1. x muss gerade sein, daher ist nur (2, 9) möglich.',
      isValid: ({ x, y }) => x + y === 11 && x < y && x % 2 === 0 && y > 8,
    },
    anspruchsvoll: {
      fields: ['x', 'y', 'z'].map((name) => ({ name, min: 0, max: 12 })),
      equations: ['x + y = 12', 'y + z = 9'],
      conditions: ['y ist gerade (durch 2 teilbar)', 'x ≤ 8', 'z > 4'],
      solution: { x: 8, y: 4, z: 5 },
      options: [
        { x: 6, y: 6, z: 3 }, { x: 8, y: 4, z: 4 }, { x: 10, y: 2, z: 7 },
        { x: 7, y: 5, z: 4 },
      ],
      reasoning: 'Aus y + z = 9 und z > 4 folgt y < 5. Mit geradem y, x + y = 12 und x ≤ 8 bleibt y = 4, also x = 8 und z = 5.',
      isValid: ({ x, y, z }) => x + y === 12 && y + z === 9 && y % 2 === 0 && x <= 8 && z > 4,
    },
  },
  '13-17': {
    leicht: {
      fields: [{ name: 'x', min: -10, max: 10 }, { name: 'y', min: -10, max: 10 }],
      equations: ['2 × x + y = 8'],
      conditions: ['x ≥ 2', 'x < y', 'x ist gerade (durch 2 teilbar)'],
      solution: { x: 2, y: 4 },
      options: [{ x: 4, y: 0 }, { x: 3, y: 2 }, { x: 2, y: 3 }],
      reasoning: 'Aus 2 × x + y = 8 und x ≥ 2 sowie x < y folgt x = 2 und y = 4. Beide Bedingungen und die Gleichung sind damit erfüllt.',
      isValid: ({ x, y }) => 2 * x + y === 8 && x >= 2 && x < y && x % 2 === 0,
    },
    anspruchsvoll: {
      fields: ['x', 'y', 'z'].map((name) => ({ name, min: -10, max: 10 })),
      equations: ['2 × x + y = 14', 'y + z = 10'],
      conditions: ['x ≤ 3', 'z > 0'],
      solution: { x: 3, y: 8, z: 2 },
      options: [
        { x: 2, y: 10, z: 0 }, { x: 4, y: 6, z: 4 }, { x: 1, y: 10, z: 0 },
        { x: 3, y: 6, z: 4 },
      ],
      reasoning: 'Aus y + z = 10 und z > 0 folgt y < 10. Mit 2 × x + y = 14 und x ≤ 3 bleibt x = 3, y = 8 und z = 2.',
      isValid: ({ x, y, z }) => 2 * x + y === 14 && y + z === 10 && x <= 3 && z > 0,
    },
  },
  '18+': {
    leicht: {
      fields: [{ name: 'x', min: -10, max: 10 }, { name: 'y', min: -10, max: 10 }],
      equations: ['x² + y = 13'],
      conditions: ['x > 0', 'x ist gerade (durch 2 teilbar)', 'y > 0'],
      solution: { x: 2, y: 9 },
      options: [{ x: 4, y: -3 }, { x: 2, y: 8 }, { x: 3, y: 4 }],
      reasoning: 'Aus x² + y = 13 und y > 0 folgt x² < 13. Die einzige positive gerade Zahl dafür ist x = 2, also y = 9.',
      isValid: ({ x, y }) => x ** 2 + y === 13 && x > 0 && x % 2 === 0 && y > 0,
    },
    anspruchsvoll: {
      fields: [{ name: 'x', min: 1, max: 10 }, { name: 'y', min: -20, max: 20 }, { name: 'z', min: -20, max: 20 }],
      equations: ['x² + y = 20', 'y + z = 9'],
      conditions: ['x ist gerade (durch 2 teilbar)', 'y ≥ 0', 'z > 0'],
      solution: { x: 4, y: 4, z: 5 },
      options: [
        { x: 2, y: 16, z: -7 }, { x: 6, y: -16, z: 15 }, { x: 4, y: 3, z: 6 },
        { x: 2, y: 15, z: -6 },
      ],
      reasoning: 'Aus x² + y = 20 und y ≥ 0 folgt x² ≤ 20. Aus y + z = 9 und z > 0 folgt x² > 11. Die einzige gerade Zahl dazwischen ist x = 4; damit y = 4 und z = 5.',
      isValid: ({ x, y, z }) => x ** 2 + y === 20 && y + z === 9 && x % 2 === 0 && y >= 0 && z > 0,
    },
  },
};

export function validateArithmeticPuzzle(puzzle) {
  if (!puzzle?.fields || typeof puzzle.isValid !== 'function') return false;
  const solutions = [];
  function search(index, assignment) {
    if (index === puzzle.fields.length) {
      if (puzzle.isValid(assignment)) solutions.push({ ...assignment });
      return;
    }
    const { name, min, max } = puzzle.fields[index];
    for (let value = min; value <= max; value += 1) search(index + 1, { ...assignment, [name]: value });
  }
  search(0, {});
  return solutions.length === 1
    && puzzle.fields.every(({ name }) => solutions[0][name] === puzzle.solution[name])
    && puzzle.options.length >= 4
    && puzzle.options.length <= 6
    && puzzle.options.every((option) => puzzle.fields.every(({ name, min, max }) => Number.isInteger(option[name]) && option[name] >= min && option[name] <= max))
    && new Set(puzzle.options.map((option) => puzzle.fields.map(({ name }) => option[name]).join(','))).size === puzzle.options.length
    && puzzle.options.filter((option) => puzzle.fields.every(({ name }) => option[name] === puzzle.solution[name])).length === 1
    && puzzle.options.filter((option) => !puzzle.isValid(option)).length === puzzle.options.length - 1;
}

function assignmentLabel(fields, values) {
  return fields.map(({ name }) => `${name} = ${values[name]}`).join(', ');
}

export function createArithmeticTask(ageGroup, difficulty, random = Math.random) {
  const level = difficulty === 'leicht' ? 'leicht' : 'anspruchsvoll';
  const puzzle = { ...ARITHMETIC_TEMPLATES[ageGroup][level] };
  puzzle.options = shuffled([puzzle.solution, ...puzzle.options], random);
  if (!validateArithmeticPuzzle(puzzle)) throw new TypeError('Die Rechenlogik-Aufgabe ist nicht eindeutig lösbar.');
  const options = puzzle.options.map((values) => ({
    values,
    label: assignmentLabel(puzzle.fields, values),
  }));
  const answer = assignmentLabel(puzzle.fields, puzzle.solution);
  return {
    inputType: 'arithmetic',
    question: 'Wähle die vollständige Belegung, die alle Gleichungen und Bedingungen erfüllt.',
    fields: puzzle.fields,
    equations: puzzle.equations,
    conditions: puzzle.conditions,
    options,
    answer,
    hints: [
      level === 'leicht' ? 'Prüfe zuerst die angezeigte Gleichung.' : 'Beginne mit der Gleichung, die die meisten Felder verbindet.',
      level === 'leicht' ? `Prüfe zusätzlich: ${puzzle.conditions[0]}.` : 'Prüfe, welche Zusatzbedingungen beide Gleichungen gemeinsam einschränken.',
    ],
    explanation: `${puzzle.reasoning} Lösung: ${answer}.`,
  };
}

export function validateSequenceInput(value, maximum) {
  const input = String(value).trim();
  if (!/^\+?\d+$/.test(input)) return { valid: false, error: 'Gib eine ganze Zahl ohne Trennzeichen ein.' };
  const number = Number(input);
  if (!Number.isSafeInteger(number) || number < 0 || number > maximum) {
    return { valid: false, error: `Die Zahl muss zwischen 0 und ${maximum} liegen.` };
  }
  return { valid: true, value: number };
}

export function undoSequenceInput(value) {
  const shortened = String(value).slice(0, -1);
  return !shortened || shortened === '+' || shortened.startsWith('0') ? '' : shortened;
}

export function hintCost(ageGroup, level) {
  return level === 1 ? (ageGroup === '18+' ? 10 : 0) : level === 2 ? 20 : 0;
}

export function pointsAfterHints(ageGroup, hintsUsed) {
  return Math.max(0, 100 - hintsUsed.reduce((total, level) => total + hintCost(ageGroup, level), 0));
}

export function resetMechanicAttempt(task) {
  task.inputValue = '';
  task.selectedOption = null;
  task.feedback = '';
}

export function registerMechanicError(task) {
  task.errors += 1;
  task.inputValue = '';
  task.selectedOption = null;
  task.feedback = task.errors === 3
    ? 'Drei Fehler – die Aufgabe ist beendet und zählt 0 Punkte.'
    : `Das war leider nicht richtig. Noch ${3 - task.errors} ${3 - task.errors === 1 ? 'Versuch' : 'Versuche'}.`;
  return task.errors >= 3;
}

export function berlinDay(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function calculateDailyScore(taskPoints) {
  if (!Array.isArray(taskPoints) || taskPoints.length !== 5) {
    throw new TypeError('Eine Runde muss genau fünf Aufgabenpunkte enthalten.');
  }
  const sum = taskPoints.reduce((total, points) => total + (points ?? 0), 0);
  return Math.floor(sum / 5 + 0.5);
}

export function recordTaskResult(round, officialAttempt, points, streak) {
  if (round.kind === 'extra') return { officialAttempt, streak };
  const firstTask = officialAttempt === null;
  const attempt = firstTask
    ? {
      ageGroup: round.ageGroup,
      profileId: round.profileId,
      status: 'in-progress',
      taskPoints: [null, null, null, null, null],
    }
    : { ...officialAttempt, taskPoints: [...officialAttempt.taskPoints] };
  attempt.taskPoints[round.currentIndex] = points;
  return {
    officialAttempt: attempt,
    streak: firstTask ? streak + 1 : streak,
  };
}

function shuffled(items, random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function createRound({ kind = 'official', ageGroup, profileId, random = Math.random }) {
  const profile = DIFFICULTY_PROFILES.find(({ id }) => id === profileId);
  if (!AGE_GROUPS.includes(ageGroup) || !profile || !['official', 'extra'].includes(kind)) {
    throw new TypeError('Ungültige Altersgruppe, Schwierigkeit oder Rundenart.');
  }
  const selectedTasks = shuffled(TASKS, random).slice(0, 5);
  const difficulty = shuffled([
    ...Array(profile.easy).fill('leicht'),
    ...Array(profile.challenging).fill('anspruchsvoll'),
  ], random);

  return {
    kind,
    ageGroup,
    profileId,
    state: 'active',
    startedAt: Date.now(),
    tasks: selectedTasks.map((task, index) => {
      const taskDifficulty = difficulty[index];
      if (task.mechanic === 'Memory Logic') {
        return {
          mechanic: task.mechanic,
          difficulty: taskDifficulty,
          ...createMemoryTask({ ageGroup, difficulty: taskDifficulty, random }),
        };
      }
      const content = task.inputType === 'sequence'
        ? createSequenceTask(ageGroup, taskDifficulty, random)
        : task.inputType === 'arithmetic'
          ? createArithmeticTask(ageGroup, taskDifficulty, random)
          : taskDifficulty === 'anspruchsvoll' ? task.challenging : task;
      return {
        mechanic: task.mechanic,
        ...content,
        difficulty: taskDifficulty,
        errors: 0,
        hintsUsed: [],
        inputValue: '',
        selectedOption: null,
        feedback: '',
        points: null,
      };
    }),
    currentIndex: 0,
  };
}

const STORAGE_KEY = 'mind-5-state-v1';

function emptyRecords() {
  return Object.fromEntries(AGE_GROUPS.map((ageGroup) => [ageGroup, { bestScore: null }]));
}

function newState() {
  return {
    selectedAgeGroup: '13-17',
    selectedProfile: 3,
    currentDay: { day: berlinDay(), officialAttempt: null },
    recordsByAgeGroup: emptyRecords(),
    streak: 0,
    pendingConfirmations: [],
    activeRound: null,
  };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

function loadState() {
  let state = newState();
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && AGE_GROUPS.includes(stored.selectedAgeGroup)) {
      state = {
        ...state,
        ...stored,
        selectedProfile: DIFFICULTY_PROFILES.some(({ id }) => id === stored.selectedProfile) ? stored.selectedProfile : 3,
        recordsByAgeGroup: { ...emptyRecords(), ...stored.recordsByAgeGroup },
        currentDay: stored.currentDay ?? state.currentDay,
        pendingConfirmations: Array.isArray(stored.pendingConfirmations) ? stored.pendingConfirmations : [],
      };
    }
  } catch {
    // A damaged local record starts a clean session.
  }

  if (state.currentDay.day !== berlinDay()) {
    const officialAttemptInProgress = state.currentDay.officialAttempt?.status === 'in-progress';
    if (officialAttemptInProgress) {
      state.currentDay.officialAttempt.status = 'abandoned';
      state.currentDay.officialAttempt.score = calculateDailyScore(state.currentDay.officialAttempt.taskPoints);
      updateBestScore(state, state.currentDay.officialAttempt);
    }
    if (state.activeRound && (state.activeRound.kind === 'extra' || !officialAttemptInProgress)) {
      state.pendingConfirmations.push('discarded-round');
    }
    state.pendingConfirmations.push('new-day');
    state.currentDay = { day: berlinDay(), officialAttempt: null };
    state.activeRound = null;
  } else if (state.activeRound) {
    if (state.activeRound.kind === 'official' && state.currentDay.officialAttempt?.status === 'in-progress') {
      state.currentDay.officialAttempt.status = 'abandoned';
      state.currentDay.officialAttempt.score = calculateDailyScore(state.currentDay.officialAttempt.taskPoints);
      updateBestScore(state, state.currentDay.officialAttempt);
    } else {
      state.pendingConfirmations.push('discarded-round');
    }
    state.activeRound = null;
  }
  return state;
}

function updateBestScore(state, attempt) {
  const record = state.recordsByAgeGroup[attempt.ageGroup];
  if (attempt.score > 0 && (record.bestScore === null || attempt.score > record.bestScore)) {
    record.bestScore = attempt.score;
  }
}

const host = typeof document === 'undefined' ? null : document.querySelector('#game');

if (host) {
  const dialog = document.querySelector('#result-dialog');
  const dialogMessage = document.querySelector('#dialog-message');
  const continueButton = document.querySelector('#dialog-continue');
  const finishButton = document.querySelector('#dialog-finish');
  dialog.addEventListener('cancel', (event) => event.preventDefault());
  let state = loadState();
  let storageAvailable = saveState(state);
  let pendingTaskPoints = null;
  let pendingTaskSolution = null;
  let solutionRevealed = false;
  let pendingRoundExit = false;

  function persist() {
    storageAvailable = saveState(state);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[character]);
  }

  function finishAttempt(status) {
    const attempt = state.currentDay.officialAttempt;
    if (!attempt) return;
    attempt.status = status;
    attempt.score = calculateDailyScore(attempt.taskPoints);
    attempt.completedAt = new Date().toISOString();
    updateBestScore(state, attempt);
  }

  function completeActiveTask(points) {
    const round = state.activeRound;
    const task = round.tasks[round.currentIndex];
    task.points = points;
    const update = recordTaskResult(round, state.currentDay.officialAttempt, points, state.streak);
    state.currentDay.officialAttempt = update.officialAttempt;
    state.streak = update.streak;
    persist();
  }

  function showTaskResult(points, reason, detail = '', exitRound = false, revealAfterConfirm = false) {
    pendingTaskPoints = points;
    pendingRoundExit = exitRound;
    const task = state.activeRound.tasks[state.activeRound.currentIndex];
    pendingTaskSolution = revealAfterConfirm
      ? detail || task.explanation || `Lösung: ${task.answer}`
      : null;
    solutionRevealed = false;
    const finalTask = exitRound || state.activeRound.currentIndex === 4;
    document.querySelector('#dialog-title').textContent = reason;
    const result = points === 0
      ? 'Diese Aufgabe zählt mit 0 Punkten.'
      : `Gut gemacht! Diese Aufgabe zählt mit ${points} Punkten.`;
    dialogMessage.textContent = [result, revealAfterConfirm ? '' : detail].filter(Boolean).join('\n\n');
    continueButton.textContent = pendingTaskSolution ? 'Lösung ansehen' : 'Weiter';
    continueButton.hidden = finalTask;
    finishButton.textContent = pendingTaskSolution ? 'Lösung ansehen' : 'Abschließen';
    finishButton.hidden = !finalTask;
    dialog.showModal();
  }

  function confirmTaskResult() {
    if (pendingTaskSolution && !solutionRevealed) {
      solutionRevealed = true;
      document.querySelector('#dialog-title').textContent = 'Lösung und Erklärung';
      dialogMessage.textContent = pendingTaskSolution;
      continueButton.textContent = 'Weiter';
      finishButton.textContent = 'Abschließen';
      return;
    }
    advanceTask();
  }

  function advanceTask() {
    completeActiveTask(pendingTaskPoints);
    pendingTaskPoints = null;
    dialog.close();
    const round = state.activeRound;
    if (pendingRoundExit) {
      pendingRoundExit = false;
      round.state = 'finished';
      if (round.kind === 'official') finishAttempt('abandoned');
      else if (!state.currentDay.officialAttempt) state.pendingConfirmations.push('discarded-round');
      state.activeRound = null;
    } else if (round.currentIndex === 4) {
      round.state = 'finished';
      if (round.kind === 'official') finishAttempt('completed');
      state.activeRound = null;
    } else {
      round.currentIndex += 1;
    }
    persist();
    render();
  }

  function abandonRound() {
    const round = state.activeRound;
    const task = round.tasks[round.currentIndex];
    if (task.mechanic === 'Memory Logic') {
      completeMemoryTask(task, 0, 'Aufgabe abgebrochen', true);
      return;
    }
    if (round.kind === 'official' && state.currentDay.officialAttempt) {
      finishAttempt('abandoned');
    } else if (!state.currentDay.officialAttempt) {
      state.pendingConfirmations.push('discarded-round');
    }
    state.activeRound = null;
    persist();
    render();
  }

  function acknowledgePending() {
    const confirmation = state.pendingConfirmations[0];
    if (!confirmation) return false;
    const message = confirmation === 'new-day'
      ? 'Ein neuer Spieltag hat begonnen. Deine heutige Runde ist bereit.'
      : 'Die Runde aus der vorherigen Sitzung wurde nicht fortgesetzt.';
    window.alert(message);
    state.pendingConfirmations.shift();
    persist();
    return true;
  }

  function startRound(kind) {
    if (acknowledgePending()) {
      render();
      return;
    }
    if (kind === 'extra' && !window.confirm('Weitere Runde – ohne Wertung. Tagesergebnis, Streak und Bestwert bleiben unverändert. Möchtest du starten?')) return;
    state.activeRound = createRound({
      kind,
      ageGroup: state.selectedAgeGroup,
      profileId: state.selectedProfile,
    });
    persist();
    render();
  }

  function beginTaskAction(action) {
    const task = state.activeRound.tasks[state.activeRound.currentIndex];
    if (task.mechanic === 'Memory Logic') {
      const message = action === 'skip'
        ? 'Aufgabe überspringen? Sie wird endgültig mit 0 Punkten gewertet.'
        : 'Lösung anzeigen? Die Aufgabe wird endgültig mit 0 Punkten gewertet.';
      if (!window.confirm(message)) return;
      completeMemoryTask(task, 0, action === 'skip' ? 'Aufgabe übersprungen' : 'Lösung angezeigt');
      return;
    }
    if (action === 'skip') {
      if (!window.confirm('Aufgabe überspringen? Sie wird endgültig mit 0 Punkten gewertet.')) return;
      if (task.inputType === 'sequence' || task.inputType === 'arithmetic') {
        showTaskResult(0, 'Aufgabe übersprungen', '', false, true);
        return;
      }
      completeActiveTask(0);
      if (state.activeRound.currentIndex === 4) {
        state.activeRound.state = 'finished';
        if (state.activeRound.kind === 'official') finishAttempt('completed');
        state.activeRound = null;
        persist();
        render();
      } else {
        state.activeRound.currentIndex += 1;
        persist();
        render();
      }
      return;
    }
    if (!window.confirm('Lösung anzeigen? Die Aufgabe wird endgültig mit 0 Punkten gewertet.')) return;
    if (task.inputType === 'sequence' || task.inputType === 'arithmetic') {
      showTaskResult(0, 'Lösung angezeigt', '', false, true);
      return;
    }
    window.alert(`Lösung: ${task.answer}`);
    completeActiveTask(0);
    if (state.activeRound.currentIndex === 4) {
      state.activeRound.state = 'finished';
      if (state.activeRound.kind === 'official') finishAttempt('completed');
      state.activeRound = null;
    } else {
      state.activeRound.currentIndex += 1;
    }
    persist();
    render();
  }

  function completeMemoryTask(task, points, reason, exitRound = false) {
    task.memoryPhase = 'complete';
    task.points = points;
    showTaskResult(points, reason, memorySolution(task), exitRound);
  }

  function renderMemoryTask(round, task, alert) {
    const inQuestions = task.memoryPhase === 'questions';
    const question = task.questions[task.questionIndex];
    const progressItems = (inQuestions ? task.questions : task.information).map((_, index) => {
      const currentIndex = inQuestions ? task.questionIndex : task.informationIndex;
      const label = inQuestions ? `Frage ${index + 1}` : `Information ${index + 1}`;
      const status = index < currentIndex ? 'done' : index === currentIndex ? 'current' : '';
      return `<span class="${status}" aria-current="${index === currentIndex ? 'step' : 'false'}">${label}</span>`;
    }).join('');
    const phaseHeading = inQuestions ? `Frage ${task.questionIndex + 1} von ${task.questions.length}` : 'Merkphase';
    const phaseProgressLabel = inQuestions ? 'Fragenfortschritt' : 'Merkphasenfortschritt';
    const taskActions = `<div class="actions">
      <button id="skip" type="button">Aufgabe überspringen</button>
      <button id="solution" type="button">Lösung anzeigen</button>
      <button id="restart" type="button">Neustart</button>
      <button id="pause" type="button">Pause</button>
    </div>`;
    let content;

    if (task.memoryPhase === 'intro') {
      content = `<p>Merke dir die Informationen. Sie werden einzeln gezeigt und können nicht zurückgerufen werden.</p>
        <button id="memory-start" class="primary" type="button">Merkphase starten</button>`;
    } else if (task.memoryPhase === 'showing') {
      const lastInformation = task.informationIndex === task.information.length - 1;
      content = `<p class="fine-print">Information ${task.informationIndex + 1} von ${task.information.length}</p>
        <p class="question">${escapeHtml(task.information[task.informationIndex])}</p>
        <button id="memory-next-info" class="primary" type="button">${lastInformation ? 'Fragen starten' : 'Weiter'}</button>`;
    } else if (task.questionResult) {
      const resultMessage = task.questionResult === 'correct'
        ? 'Richtig.'
        : task.questionResult === 'skipped'
          ? 'Frage übersprungen. Dafür gibt es keine Punkte.'
          : `Das war leider nicht richtig. Fehler: ${escapeHtml(task.errors)} von 3.`;
      content = `<p class="question">${escapeHtml(question.question)}</p>
        <p class="status" role="status" aria-live="polite">${resultMessage}</p>
        <button id="memory-next-question" class="primary" type="button">Weiter</button>`;
    } else {
      const multiSelect = question.answers.length > 1;
      const choices = question.options.map((option) => {
        const selected = task.selectedAnswers.includes(option);
        return `<button class="choice" type="button" aria-pressed="${selected}" data-memory-option="${escapeHtml(option)}">${escapeHtml(option)}</button>`;
      }).join('');
      const hintButton = task.hintsUsed < 2
        ? `<button id="memory-hint" type="button">Hinweis verwenden (${2 - task.hintsUsed} übrig)</button>`
        : '';
      content = `<p class="question">${escapeHtml(question.question)}</p>
        <p class="fine-print">${multiSelect ? 'Wähle alle richtigen Antworten.' : 'Wähle eine Antwort.'}</p>
        <div class="choices">${choices}</div>
        <p id="feedback" class="status" role="status" aria-live="polite">${escapeHtml(task.hintMessage)}</p>
        <p class="fine-print">Fehler: ${escapeHtml(task.errors)} von 3</p>
        <div class="actions">
          <button id="memory-check" class="primary" type="button" ${task.selectedAnswers.length ? '' : 'disabled'}>Antwort prüfen</button>
          ${hintButton}
          <button id="skip-question" type="button">Frage überspringen</button>
        </div>`;
    }

    host.innerHTML = `${alert}<section class="card">
      <p class="fine-print">${round.kind === 'extra' ? '<strong>Weitere Runde – ohne Wertung</strong> · ' : ''}Memory Logic · ${escapeHtml(task.difficulty)}</p>
      <h2>Aufgabe ${escapeHtml(round.currentIndex + 1)} von 5 · ${escapeHtml(phaseHeading)}</h2>
      <div class="progress" aria-label="${phaseProgressLabel}">${progressItems}</div>
      ${content}
      ${taskActions}
    </section>`;

    host.querySelector('#memory-start')?.addEventListener('click', () => {
      task.memoryPhase = 'showing';
      persist();
      render();
    });
    host.querySelector('#memory-next-info')?.addEventListener('click', () => {
      if (task.informationIndex === task.information.length - 1) {
        task.memoryPhase = 'questions';
      } else {
        task.informationIndex += 1;
      }
      persist();
      render();
    });
    host.querySelectorAll('[data-memory-option]').forEach((button) => {
      button.addEventListener('click', () => {
        const option = button.dataset.memoryOption;
        if (question.answers.length === 1) {
          task.selectedAnswers = [option];
        } else if (task.selectedAnswers.includes(option)) {
          task.selectedAnswers = task.selectedAnswers.filter((answer) => answer !== option);
        } else {
          task.selectedAnswers.push(option);
        }
        persist();
        render();
      });
    });
    host.querySelector('#memory-check')?.addEventListener('click', () => {
      if (!task.selectedAnswers.length) return;
      if (isMemoryAnswerCorrect(task.selectedAnswers, question.answers)) {
        task.correctQuestions += 1;
        task.questionResult = 'correct';
      } else {
        task.errors += 1;
        if (task.errors >= 3) {
          persist();
          completeMemoryTask(task, 0, 'Drei Fehler – Aufgabe beendet');
          return;
        }
        task.questionResult = 'wrong';
      }
      task.selectedAnswers = [];
      task.hintMessage = '';
      persist();
      render();
    });
    host.querySelector('#memory-next-question')?.addEventListener('click', () => {
      task.questionIndex += 1;
      task.questionResult = null;
      task.selectedAnswers = [];
      task.hintMessage = '';
      if (task.questionIndex === task.questions.length) {
        completeMemoryTask(task, calculateMemoryScore(task, round.ageGroup), 'Memory Logic abgeschlossen');
        return;
      }
      persist();
      render();
    });
    host.querySelector('#memory-hint')?.addEventListener('click', () => {
      task.hintMessage = question.hints[task.hintsUsed];
      task.hintsUsed += 1;
      persist();
      render();
    });
    host.querySelector('#skip-question')?.addEventListener('click', () => {
      if (!window.confirm('Frage überspringen? Sie erhält 0 Punkte und wird geschlossen.')) return;
      task.questionResult = 'skipped';
      task.selectedAnswers = [];
      task.hintMessage = '';
      persist();
      render();
    });
    host.querySelector('#restart')?.addEventListener('click', () => {
      if (!window.confirm('Aufgabe neu starten? Fehler und verwendete Hinweise bleiben erhalten.')) return;
      task.memoryPhase = 'intro';
      task.informationIndex = 0;
      task.selectedAnswers = [];
      task.hintMessage = '';
      persist();
      render();
    });
    host.querySelector('#skip').addEventListener('click', () => beginTaskAction('skip'));
    host.querySelector('#solution').addEventListener('click', () => beginTaskAction('solution'));
    host.querySelector('#pause').addEventListener('click', () => pauseRound());
  }

  function pauseRound(message = 'Die Runde ist pausiert.') {
    if (!state.activeRound || state.activeRound.state !== 'active') return;
    state.activeRound.state = 'paused';
    state.activeRound.pausedAt = Date.now();
    persist();
    render(message);
  }

  function render(message = '') {
    const round = state.activeRound;
    const profile = DIFFICULTY_PROFILES.find(({ id }) => id === state.selectedProfile) ?? DIFFICULTY_PROFILES[2];
    const attempt = state.currentDay.officialAttempt;
    const alert = `${state.pendingConfirmations.length ? '<p class="status" role="status">Bitte bestätige den Hinweis zum letzten Spielstand, bevor du eine neue Runde startest.</p>' : ''}${!storageAvailable ? '<p class="status" role="status">Speichern ist nicht verfügbar. Fortschritte bleiben nur in diesem Browserfenster erhalten.</p>' : ''}${message ? `<p class="status" role="status">${escapeHtml(message)}</p>` : ''}`;

    if (round?.state === 'paused') {
      host.innerHTML = `${alert}<section class="card"><h2>Runde pausiert</h2><p>Die Zeitmessung ist angehalten. Wähle ausdrücklich „Fortsetzen“, wenn du weiterspielen möchtest.</p><div class="actions"><button id="resume" class="primary" type="button">Fortsetzen</button><button id="leave" class="danger" type="button">Runde verlassen</button></div></section>`;
      host.querySelector('#resume').addEventListener('click', () => {
        round.state = 'active';
        delete round.pausedAt;
        persist();
        render();
      });
      host.querySelector('#leave').addEventListener('click', () => {
        if (window.confirm('Runde verlassen? Eine offizielle Runde wird als abgebrochen gewertet.')) abandonRound();
      });
      return;
    }

    if (round) {
      const task = round.tasks[round.currentIndex];
      if (task.mechanic === 'Memory Logic') {
        renderMemoryTask(round, task, alert);
        return;
      }
      const progress = round.tasks.map((item, index) => `<span class="${index < round.currentIndex ? 'done' : ''} ${index === round.currentIndex ? 'current' : ''}" aria-current="${index === round.currentIndex ? 'step' : 'false'}">Aufgabe ${index + 1}</span>`).join('');
      const specialized = task.inputType === 'sequence' || task.inputType === 'arithmetic';
      const choices = task.inputType === 'arithmetic'
        ? task.options.map((option, index) => `<label class="choice"><input type="radio" name="arithmetic-answer" data-option value="${index}" ${task.selectedOption === index ? 'checked' : ''}> ${escapeHtml(option.label)}</label>`).join('')
        : task.inputType ? '' : task.options.map((option) => `<button class="choice" type="button" data-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join('');
      const arithmeticDetails = task.inputType === 'arithmetic'
        ? `<div class="puzzle-details"><h3>Gleichungen</h3><ul>${task.equations.map((equation) => `<li>${escapeHtml(equation)}</li>`).join('')}</ul><h3>Bedingungen</h3><ul>${task.conditions.map((condition) => `<li>${escapeHtml(condition)}</li>`).join('')}</ul><p>Wertebereiche: ${task.fields.map(({ name, min, max }) => `${escapeHtml(name)} ∈ {${min} … ${max}}`).join('; ')}</p></div><div class="choices" role="radiogroup" aria-label="Vollständige Feldbelegung">${choices}</div>`
        : '';
      const sequenceInput = task.inputType === 'sequence'
        ? `<label for="sequence-answer">Nächste Zahl</label><input id="sequence-answer" type="text" inputmode="numeric" autocomplete="off" maxlength="6" aria-describedby="sequence-range" value="${escapeHtml(task.inputValue)}"><p id="sequence-range" class="fine-print">Ganze Zahl von 0 bis ${SEQUENCE_LIMITS[round.ageGroup]}.</p>`
        : '';
      const specializedActions = specialized
        ? `<div class="actions"><button id="restart" type="button" ${task.errors >= 3 ? 'disabled' : ''}>Neustart</button>${task.inputType === 'sequence' ? '<button id="undo" type="button">Rückgängig</button>' : `<button id="clear-selection" type="button" ${task.selectedOption === null ? 'disabled' : ''}>Auswahl aufheben</button>`}<button id="hint" type="button" ${task.hintsUsed.length >= 2 ? 'disabled' : ''}>${task.hintsUsed.length >= 2 ? 'Keine Hinweise mehr' : 'Nächsten Hinweis anzeigen'}</button><button id="check" class="primary" type="button">Prüfen</button></div><p class="fine-print">Mögliche Punkte: ${pointsAfterHints(round.ageGroup, task.hintsUsed)} von 100</p>${task.hintText ? `<p class="status" role="status">Hinweis ${task.hintsUsed.length}: ${escapeHtml(task.hintText)}</p>` : ''}`
        : '';
      host.innerHTML = `${alert}<section class="card">
        <p class="fine-print">${round.kind === 'extra' ? '<strong>Weitere Runde – ohne Wertung</strong> · ' : ''}${escapeHtml(task.mechanic)} · ${escapeHtml(task.difficulty)}</p>
        <h2>Aufgabe ${escapeHtml(round.currentIndex + 1)} von 5</h2>
        <div class="progress" aria-label="Rundenfortschritt">${progress}</div>
        <p class="question">${escapeHtml(task.question)}</p>
        ${arithmeticDetails}${sequenceInput}${!specialized ? `<div class="choices">${choices}</div>` : ''}
        <p id="feedback" class="status" role="status" aria-live="polite">${escapeHtml(task.feedback)}</p>
        <p id="error-count" class="fine-print">Fehler: ${escapeHtml(task.errors)} von 3</p>
        ${specializedActions}
        <div class="actions"><button id="skip" type="button">Überspringen</button><button id="solution" type="button">Lösung anzeigen</button><button id="pause" type="button">Pause</button></div>
      </section>`;
      host.querySelectorAll('[data-answer]').forEach((button) => {
        button.addEventListener('click', () => {
          const currentTask = state.activeRound.tasks[state.activeRound.currentIndex];
          if (button.dataset.answer === currentTask.answer) {
            showTaskResult(currentTask.errors >= 3 ? 0 : 100, 'Aufgabe ausgewertet');
          } else {
            currentTask.errors += 1;
            const feedback = host.querySelector('#feedback');
            if (currentTask.errors >= 3) {
              feedback.textContent = 'Drei Fehler – die Aufgabe ist beendet und zählt 0 Punkte.';
              host.querySelectorAll('[data-answer]').forEach((choice) => { choice.disabled = true; });
              showTaskResult(0, 'Aufgabe beendet');
            } else {
              feedback.textContent = `Das war leider nicht richtig. Noch ${3 - currentTask.errors} ${3 - currentTask.errors === 1 ? 'Versuch' : 'Versuche'}.`;
              persist();
            }
          }
        });
      });
      if (task.inputType === 'sequence') {
        const answerInput = host.querySelector('#sequence-answer');
        answerInput.addEventListener('input', () => {
          task.inputValue = answerInput.value;
        });
        answerInput.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            host.querySelector('#check').click();
          }
        });
        host.querySelector('#undo').addEventListener('click', () => {
          task.inputValue = undoSequenceInput(task.inputValue);
          task.feedback = '';
          persist();
          render();
          host.querySelector('#sequence-answer').focus();
        });
      }
      if (task.inputType === 'arithmetic') {
        host.querySelectorAll('[data-option]').forEach((input) => {
          input.addEventListener('change', () => {
            task.selectedOption = Number(input.value);
            task.feedback = '';
            host.querySelector('#clear-selection').disabled = false;
            persist();
          });
        });
        host.querySelector('#clear-selection').addEventListener('click', () => {
          task.selectedOption = null;
          task.feedback = '';
          persist();
          render();
        });
      }
      if (specialized) {
        host.querySelector('#check').addEventListener('click', () => {
          let correct = false;
          if (task.inputType === 'sequence') {
            const result = validateSequenceInput(task.inputValue, SEQUENCE_LIMITS[round.ageGroup]);
            if (!result.valid) {
              task.feedback = result.error;
              host.querySelector('#feedback').textContent = task.feedback;
              return;
            }
            correct = result.value === task.answer;
          } else {
            if (task.selectedOption === null) {
              task.feedback = 'Wähle zuerst eine vollständige Belegung aus.';
              host.querySelector('#feedback').textContent = task.feedback;
              return;
            }
            correct = task.options[task.selectedOption]?.label === task.answer;
          }
          if (correct) {
            task.feedback = '';
            showTaskResult(pointsAfterHints(round.ageGroup, task.hintsUsed), 'Richtig', '', false, true);
            return;
          }
          const taskEnded = registerMechanicError(task);
          persist();
          if (taskEnded) {
            showTaskResult(0, 'Aufgabe beendet', '', false, true);
          } else {
            render();
          }
        });
        host.querySelector('#restart').addEventListener('click', () => {
          if (!window.confirm('Aufgabe neu starten? Fehler und verwendete Hinweise bleiben erhalten.')) return;
          resetMechanicAttempt(task);
          persist();
          render();
          host.querySelector(task.inputType === 'sequence' ? '#sequence-answer' : '[data-option]')?.focus();
        });
        host.querySelector('#hint').addEventListener('click', () => {
          const level = task.hintsUsed.length;
          if (level >= 2 || task.errors >= 3) return;
          task.hintsUsed.push(level + 1);
          task.hintText = task.hints[level];
          persist();
          render();
        });
      }
      host.querySelector('#skip').addEventListener('click', () => beginTaskAction('skip'));
      host.querySelector('#solution').addEventListener('click', () => beginTaskAction('solution'));
      host.querySelector('#pause').addEventListener('click', () => pauseRound());
      return;
    }

    const dailyResult = attempt?.ageGroup === state.selectedAgeGroup ? attempt.score : null;
    const records = state.recordsByAgeGroup[state.selectedAgeGroup] ?? { bestScore: null };
    const result = attempt && dailyResult !== null
      ? `<section class="card" aria-labelledby="daily-result-heading"><h2 id="daily-result-heading">Dein Tagesergebnis</h2><p><strong>${escapeHtml(dailyResult)} von 100 Punkten</strong> · ${attempt.status === 'abandoned' ? 'Runde abgebrochen' : 'Runde abgeschlossen'}</p><div class="result-grid">${attempt.taskPoints.map((points, index) => `<p>Aufgabe ${index + 1}: <strong>${escapeHtml(points ?? 0)} Punkte</strong></p>`).join('')}</div></section>`
      : attempt
        ? `<section class="card"><h2>Dein Tagesergebnis</h2><p>Der offizielle Versuch wurde bereits für ${escapeHtml(attempt.ageGroup)} gespielt. Ein Altersgruppenwechsel setzt die Tagesanzeige zurück.</p></section>`
        : '<section class="card"><h2>Dein Tagesergebnis</h2><p>Noch keine offizielle Runde abgeschlossen.</p></section>';
    const startText = attempt ? 'Offizielle Runde bereits gespielt' : 'Offizielle Runde starten';
    const mayStartOfficial = !attempt;
    const canStartExtra = Boolean(attempt && attempt.status !== 'in-progress');
    host.innerHTML = `${alert}${result}
      <section class="card" aria-labelledby="setup-heading">
        <h2 id="setup-heading">Deine nächste Runde</h2>
        <label for="age-group">Altersgruppe</label>
        <select id="age-group" ${attempt?.status === 'in-progress' ? 'disabled' : ''}>${AGE_GROUPS.map((age) => `<option value="${age}" ${state.selectedAgeGroup === age ? 'selected' : ''}>${age === '18+' ? '18 Jahre und älter' : `${age} Jahre`}</option>`).join('')}</select>
        <p class="fine-print">Ein Wechsel setzt die aktuelle Tagesanzeige und den Streak zurück. Persönliche Bestwerte bleiben je Altersgruppe erhalten.</p>
        <h3>Schwierigkeitsprofil</h3>
        <div class="profile-grid" role="group" aria-label="Schwierigkeitsprofil">${DIFFICULTY_PROFILES.map((item) => `<button class="profile-option" type="button" aria-pressed="${item.id === profile.id}" data-profile="${item.id}"><span><strong>${item.id}. ${item.name}</strong><small>${item.easy} leicht · ${item.challenging} anspruchsvoll</small></span></button>`).join('')}</div>
        <p>Bestwert für ${escapeHtml(state.selectedAgeGroup)}: <strong>${records.bestScore === null ? 'Noch kein Bestwert' : `${escapeHtml(records.bestScore)} Punkte`}</strong></p>
        <div class="actions">
          <button id="start-official" class="primary" type="button" ${mayStartOfficial ? '' : 'disabled'}>${startText}</button>
          <button id="start-extra" type="button" ${canStartExtra ? '' : 'disabled'}>Weitere Runde – ohne Wertung</button>
        </div>
      </section>`;

    host.querySelector('#age-group').addEventListener('change', (event) => {
      const nextAgeGroup = event.target.value;
      if (nextAgeGroup !== state.selectedAgeGroup) {
        state.selectedAgeGroup = nextAgeGroup;
        state.streak = 0;
        persist();
        render();
      }
    });
    host.querySelectorAll('[data-profile]').forEach((button) => {
      button.addEventListener('click', () => {
        state.selectedProfile = Number(button.dataset.profile);
        persist();
        render();
      });
    });
    host.querySelector('#start-official').addEventListener('click', () => startRound('official'));
    host.querySelector('#start-extra').addEventListener('click', () => startRound('extra'));
  }

  continueButton.addEventListener('click', confirmTaskResult);
  finishButton.addEventListener('click', confirmTaskResult);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseRound('Die Runde wurde beim Verlassen des Tabs pausiert.');
  });
  window.addEventListener('blur', () => pauseRound('Die Runde wurde beim Wechsel aus dem Fenster pausiert.'));

  if (state.pendingConfirmations.length) acknowledgePending();
  render();
}

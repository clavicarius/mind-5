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
  {
    mechanic: 'Memory Logic',
    question: 'Alle Miras sind blau. Nela ist eine Mira. Welche Aussage stimmt?',
    options: ['Nela ist blau', 'Nela ist rot', 'Nela ist keine Mira'],
    answer: 'Nela ist blau',
    challenging: {
      question: 'Alle Varo sind Teli. Kein Teli ist Marn. Suni ist ein Varo. Was muss stimmen?',
      options: ['Suni ist kein Marn', 'Suni ist ein Marn', 'Suni ist kein Teli'],
      answer: 'Suni ist kein Marn',
    },
  },
  {
    mechanic: 'Zahlenfolge',
    question: 'Welche Zahl setzt die Folge fort? 3 · 6 · 9 · 12 · ?',
    options: ['14', '15', '18'],
    answer: '15',
    challenging: {
      question: 'Welche Zahl setzt die Folge fort? 2 · 6 · 12 · 20 · ?',
      options: ['28', '30', '32'],
      answer: '30',
    },
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
    question: 'Wie viel ist 4 + 3 × 2?',
    options: ['14', '10', '11'],
    answer: '10',
    challenging: {
      question: 'x + 3 = 11 und y = 2 × x. Wie groß ist y?',
      options: ['14', '16', '22'],
      answer: '16',
    },
  },
];

export const ACTIVITY_CONTENT = {
  'Was passt nicht?': {
    '8-12': {
      leicht: {
        surface: 'odd-one-out',
        question: 'Vier Formen haben eine gemeinsame Eigenschaft. Welches Element passt nicht dazu?',
        rule: 'Die Form ist ein Kreis.',
        options: ['roter Kreis', 'blauer Kreis', 'grüner Kreis', 'gelber Kreis', 'rotes Dreieck'],
        answer: 'rotes Dreieck',
        ruleMatches: ['roter Kreis', 'blauer Kreis', 'grüner Kreis', 'gelber Kreis'],
        explanations: ['Kreis', 'Kreis', 'Kreis', 'Kreis', 'Dreieck'],
      },
      anspruchsvoll: {
        surface: 'odd-one-out',
        question: 'Vier Gleichungen haben auf beiden Seiten denselben Wert. Welche Gleichung passt nicht dazu?',
        rule: 'Beide Seiten der Gleichung haben denselben Wert.',
        options: ['8 + 7 = 10 + 5', '9 + 6 = 10 + 5', '14 − 4 = 5 + 5', '6 + 8 = 7 + 7', '18 − 7 = 6 + 6'],
        answer: '18 − 7 = 6 + 6',
        ruleMatches: ['8 + 7 = 10 + 5', '9 + 6 = 10 + 5', '14 − 4 = 5 + 5', '6 + 8 = 7 + 7'],
        explanations: ['15 = 15', '15 = 15', '10 = 10', '14 = 14', '11 ≠ 12'],
      },
    },
    '13-17': {
      leicht: {
        surface: 'odd-one-out',
        question: 'Vier Begriffe gehören zu einer gemeinsamen Kategorie. Welcher Begriff passt nicht dazu?',
        rule: 'Der Begriff bezeichnet einen Wochentag.',
        options: ['Montag', 'Donnerstag', 'Samstag', 'Sonntag', 'April'],
        answer: 'April',
        ruleMatches: ['Montag', 'Donnerstag', 'Samstag', 'Sonntag'],
        explanations: ['Wochentag', 'Wochentag', 'Wochentag', 'Wochentag', 'Monat'],
      },
      anspruchsvoll: {
        surface: 'odd-one-out',
        question: 'Vier Gleichungen gelten für jeden Wert von x. Welche Gleichung passt nicht dazu?',
        rule: 'Beide Terme sind für jeden Wert von x gleich.',
        options: ['2(x + 3) = 2x + 6', '3(x − 2) = 3x − 6', '4(x + 1) = 4x + 4', 'x + x = 2x', '5(x − 1) = 5x − 1'],
        answer: '5(x − 1) = 5x − 1',
        ruleMatches: ['2(x + 3) = 2x + 6', '3(x − 2) = 3x − 6', '4(x + 1) = 4x + 4', 'x + x = 2x'],
        explanations: ['beide Seiten sind 2x + 6', 'beide Seiten sind 3x − 6', 'beide Seiten sind 4x + 4', 'beide Seiten sind 2x', 'links steht 5x − 5'],
      },
    },
    '18+': {
      leicht: {
        surface: 'odd-one-out',
        question: 'Vier Zahlen haben eine gemeinsame Eigenschaft. Welche Zahl passt nicht dazu?',
        rule: 'Die Zahl ist durch 2 teilbar.',
        options: ['12', '18', '24', '30', '35'],
        answer: '35',
        ruleMatches: ['12', '18', '24', '30'],
        explanations: ['gerade', 'gerade', 'gerade', 'gerade', 'ungerade'],
      },
      anspruchsvoll: {
        surface: 'odd-one-out',
        question: 'Welche Aussage über Mengen gilt nicht immer? ∩ bedeutet gemeinsame Elemente, ∪ bedeutet Elemente aus mindestens einer Menge und ∅ ist die leere Menge.',
        rule: 'Die Gleichheit gilt für alle Mengen A und B.',
        options: ['A ∩ B = B ∩ A', 'A ∪ B = B ∪ A', 'A ∩ A = A', 'A ∪ ∅ = A', 'A ∩ ∅ = A'],
        answer: 'A ∩ ∅ = A',
        ruleMatches: ['A ∩ B = B ∩ A', 'A ∪ B = B ∪ A', 'A ∩ A = A', 'A ∪ ∅ = A'],
        explanations: ['Schnittmengen sind vertauschbar', 'Vereinigungen sind vertauschbar', 'Schnittmenge mit sich selbst', 'leere Menge ergänzt nichts', 'Schnitt mit leerer Menge ist ∅'],
      },
    },
  },
  Reihenfolge: {
    '8-12': {
      leicht: {
        surface: 'ordering',
        question: 'Ordne die Personen von links nach rechts: Wer ist zuerst an der Reihe und wer zuletzt?',
        items: ['Mia', 'Leo', 'Sam', 'Ali'],
        hints: ['Leo steht unmittelbar vor Mia.', 'Sam steht nach Mia.', 'Ali steht unmittelbar nach Sam.'],
        constraints: [
          { type: 'immediatelyBefore', first: 'Leo', second: 'Mia' },
          { type: 'before', first: 'Mia', second: 'Sam' },
          { type: 'immediatelyBefore', first: 'Sam', second: 'Ali' },
        ],
        answer: ['Leo', 'Mia', 'Sam', 'Ali'],
        explanation: 'Leo und Mia stehen direkt nacheinander, danach kommen Sam und Ali.',
      },
      anspruchsvoll: {
        surface: 'ordering',
        question: 'Ordne die Spielsachen von links nach rechts: Was liegt zuerst und was zuletzt?',
        items: ['Drachen', 'Ball', 'Kreisel', 'Jo-Jo', 'Puzzle'],
        hints: ['Das Puzzle liegt an erster Stelle.', 'Der Ball steht an dritter Stelle.', 'Der Drachen liegt unmittelbar vor dem Ball.', 'Das Jo-Jo liegt an letzter Stelle.'],
        constraints: [
          { type: 'position', item: 'Puzzle', position: 1 },
          { type: 'position', item: 'Ball', position: 3 },
          { type: 'immediatelyBefore', first: 'Drachen', second: 'Ball' },
          { type: 'position', item: 'Jo-Jo', position: 5 },
        ],
        answer: ['Puzzle', 'Drachen', 'Ball', 'Kreisel', 'Jo-Jo'],
        explanation: 'Puzzle und Jo-Jo sind festgelegt; Drachen steht direkt vor dem Ball an dritter Stelle.',
      },
    },
    '13-17': {
      leicht: {
        surface: 'ordering',
        question: 'Ordne die Karten von links nach rechts für die Präsentation.',
        items: ['A', 'B', 'C', 'D'],
        hints: ['C kommt vor A.', 'A kommt unmittelbar vor D.', 'B kommt nach D.'],
        constraints: [
          { type: 'before', first: 'C', second: 'A' },
          { type: 'immediatelyBefore', first: 'A', second: 'D' },
          { type: 'before', first: 'D', second: 'B' },
        ],
        answer: ['C', 'A', 'D', 'B'],
        explanation: 'C muss vor dem direkt anschließenden Paar A, D liegen; B folgt auf D.',
      },
      anspruchsvoll: {
        surface: 'ordering',
        question: 'Ordne die Programmpunkte von links nach rechts.',
        items: ['A', 'B', 'C', 'D', 'E'],
        hints: ['E steht an erster Stelle.', 'C steht an dritter Stelle.', 'A steht unmittelbar vor C.', 'D steht an letzter Stelle.'],
        constraints: [
          { type: 'position', item: 'E', position: 1 },
          { type: 'position', item: 'C', position: 3 },
          { type: 'immediatelyBefore', first: 'A', second: 'C' },
          { type: 'position', item: 'D', position: 5 },
        ],
        answer: ['E', 'A', 'C', 'B', 'D'],
        explanation: 'E und D belegen Anfang und Ende; A muss direkt vor C an dritter Stelle stehen.',
      },
    },
    '18+': {
      leicht: {
        surface: 'ordering',
        question: 'Ordne die Arbeitsschritte von links nach rechts: Was geschieht zuerst und was zuletzt?',
        items: ['Bericht', 'Entwurf', 'Prüfung', 'Versand'],
        hints: ['Der Entwurf kommt vor der Prüfung.', 'Die Prüfung kommt unmittelbar vor dem Versand.', 'Der Bericht kommt vor dem Entwurf.'],
        constraints: [
          { type: 'before', first: 'Bericht', second: 'Entwurf' },
          { type: 'before', first: 'Entwurf', second: 'Prüfung' },
          { type: 'immediatelyBefore', first: 'Prüfung', second: 'Versand' },
        ],
        answer: ['Bericht', 'Entwurf', 'Prüfung', 'Versand'],
        explanation: 'Bericht und Entwurf müssen vor dem Paar Prüfung, Versand stehen.',
      },
      anspruchsvoll: {
        surface: 'ordering',
        question: 'Ordne die Prozessschritte von links nach rechts.',
        items: ['A', 'B', 'C', 'D', 'E'],
        hints: ['E steht an erster Stelle.', 'C steht an dritter Stelle.', 'A steht unmittelbar vor C.', 'D steht an letzter Stelle.'],
        constraints: [
          { type: 'position', item: 'E', position: 1 },
          { type: 'position', item: 'C', position: 3 },
          { type: 'immediatelyBefore', first: 'A', second: 'C' },
          { type: 'position', item: 'D', position: 5 },
        ],
        answer: ['E', 'A', 'C', 'B', 'D'],
        explanation: 'E und D belegen Anfang und Ende; A muss direkt vor C an dritter Stelle stehen.',
      },
    },
  },
  Wortlogik: {
    '8-12': {
      leicht: {
        surface: 'word-logic',
        question: 'Hund : Welpe = Katze : ?',
        examples: [['Hund', 'Welpe']],
        target: 'Katze',
        relation: 'Tier und Jungtier',
        options: ['Kätzchen', 'Lamm', 'Fohlen', 'Küken'],
        answer: 'Kätzchen',
        explanation: 'Ein Welpe ist ein junges Tier; ein junges Tier der Katze heißt Kätzchen.',
      },
      anspruchsvoll: {
        surface: 'word-logic',
        question: 'Pferd : ?',
        examples: [['Hund', 'Welpe'], ['Katze', 'Kätzchen']],
        target: 'Pferd',
        relation: 'Tier und Jungtier',
        options: ['Fohlen', 'Kalb', 'Ferkel', 'Lamm', 'Küken'],
        answer: 'Fohlen',
        explanation: 'Beide Beispiele nennen das Jungtier; das Jungtier eines Pferdes ist ein Fohlen.',
      },
    },
    '13-17': {
      leicht: {
        surface: 'word-logic',
        question: 'heiß : kalt = schnell : ?',
        examples: [['heiß', 'kalt']],
        target: 'schnell',
        relation: 'Gegensatz',
        options: ['langsam', 'rasch', 'zügig', 'flink'],
        answer: 'langsam',
        explanation: 'Kalt ist das Gegenteil von heiß; langsam ist das Gegenteil von schnell.',
      },
      anspruchsvoll: {
        surface: 'word-logic',
        question: 'laut : ?',
        examples: [['heiß', 'kalt'], ['hell', 'dunkel']],
        target: 'laut',
        relation: 'Gegensatz',
        options: ['leise', 'hell', 'schnell', 'schwer', 'rund'],
        answer: 'leise',
        explanation: 'Beide Beispielpaare bestehen aus Gegensätzen; leise ist das Gegenteil von laut.',
      },
    },
    '18+': {
      leicht: {
        surface: 'word-logic',
        question: 'Problem : ?',
        examples: [['Frage', 'Antwort']],
        target: 'Problem',
        relation: 'Eine passende Antwort oder Behebung',
        options: ['Lösung', 'Ursache', 'Frage', 'Thema'],
        answer: 'Lösung',
        explanation: 'Eine Antwort passt zu einer Frage; eine Lösung behebt ein Problem.',
      },
      anspruchsvoll: {
        surface: 'word-logic',
        question: 'Vorteil : ?',
        examples: [['Gewinn', 'Verlust'], ['Zustimmung', 'Ablehnung']],
        target: 'Vorteil',
        relation: 'Gegensatz',
        options: ['Nachteil', 'Gewinn', 'Absicht', 'Menge', 'Vorteil'],
        answer: 'Nachteil',
        explanation: 'Die Beispielpaare bezeichnen Gegensätze; der Gegensatz zu Vorteil ist Nachteil.',
      },
    },
  },
};

function orderingSatisfies(order, constraints) {
  const positions = new Map(order.map((item, index) => [item, index + 1]));
  return constraints.every((constraint) => {
    if (constraint.type === 'position') return positions.get(constraint.item) === constraint.position;
    const first = positions.get(constraint.first);
    const second = positions.get(constraint.second);
    return constraint.type === 'immediatelyBefore' ? second === first + 1 : first < second;
  });
}

function countValidOrderings(items, constraints) {
  let count = 0;
  function visit(prefix, remaining) {
    if (!remaining.length) {
      if (orderingSatisfies(prefix, constraints)) count += 1;
      return;
    }
    remaining.forEach((item, index) => {
      visit([...prefix, item], remaining.filter((_, remainingIndex) => remainingIndex !== index));
    });
  }
  visit([], items);
  return count;
}

export function validateTaskContent(task) {
  if (task.surface === 'odd-one-out') {
    return task.options.length === 5
      && task.ruleMatches.length === 4
      && task.options.includes(task.answer)
      && !task.ruleMatches.includes(task.answer)
      && task.ruleMatches.every((item) => task.options.includes(item))
      && task.explanations.length === 5;
  }
  if (task.surface === 'ordering') {
    return [4, 5].includes(task.items.length)
      && new Set(task.items).size === task.items.length
      && task.answer.length === task.items.length
      && new Set(task.answer).size === task.items.length
      && task.items.every((item) => task.answer.includes(item))
      && countValidOrderings(task.items, task.constraints) === 1
      && orderingSatisfies(task.answer, task.constraints);
  }
  if (task.surface === 'word-logic') {
    return [1, 2].includes(task.examples.length)
      && [4, 5, 6].includes(task.options.length)
      && new Set(task.options).size === task.options.length
      && task.options.includes(task.answer);
  }
  return true;
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
      const baseContent = taskDifficulty === 'anspruchsvoll' ? task.challenging : task;
      const content = ACTIVITY_CONTENT[task.mechanic]?.[ageGroup]?.[taskDifficulty] ?? baseContent;
      if (!validateTaskContent(content)) {
        throw new TypeError(`Ungültiger Aufgabeninhalt für ${task.mechanic}.`);
      }
      const optionPairs = content.options?.map((option, optionIndex) => ({
        option,
        explanation: content.explanations?.[optionIndex],
      }));
      const shuffledOptionPairs = optionPairs ? shuffled(optionPairs, random) : null;
      const selectedContent = {
        ...content,
        ...(shuffledOptionPairs ? {
          options: shuffledOptionPairs.map(({ option }) => option),
          ...(content.explanations ? { explanations: shuffledOptionPairs.map(({ explanation }) => explanation) } : {}),
        } : {}),
        ...(content.items ? { items: shuffled(content.items, random) } : {}),
      };
      return {
        mechanic: task.mechanic,
        ...selectedContent,
        difficulty: taskDifficulty,
        errors: 0,
        points: null,
        incorrectAnswers: [],
        ...(content.surface === 'ordering' ? { currentOrder: [...selectedContent.items] } : {}),
        ...(content.surface !== 'ordering' ? { selectedAnswer: null } : {}),
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
  let state = loadState();
  let storageAvailable = saveState(state);
  let pendingTaskPoints = null;

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

  function taskSolution(task) {
    if (task.surface === 'odd-one-out') {
      const itemReasons = task.options
        .map((option, index) => `${option}: ${task.explanations[index]}`)
        .join('; ');
      return `Regel: ${task.rule} Lösung: ${task.answer}. ${itemReasons}`;
    }
    if (task.surface === 'ordering') {
      return `Reihenfolge: ${task.answer.join(' → ')}. ${task.explanation}`;
    }
    if (task.surface === 'word-logic') {
      return `Lösung: ${task.answer}. ${task.explanation}`;
    }
    return `Lösung: ${task.answer}`;
  }

  function showTaskResult(points, reason) {
    pendingTaskPoints = points;
    const finalTask = state.activeRound.currentIndex === 4;
    document.querySelector('#dialog-title').textContent = reason;
    const result = points === 0
      ? 'Diese Aufgabe zählt mit 0 Punkten.'
      : `Gut gemacht! Diese Aufgabe zählt mit ${points} Punkten.`;
    dialogMessage.textContent = `${result} ${taskSolution(state.activeRound.tasks[state.activeRound.currentIndex])}`;
    continueButton.textContent = 'Weiter';
    continueButton.hidden = finalTask;
    finishButton.hidden = !finalTask;
    dialog.showModal();
  }

  function advanceTask() {
    completeActiveTask(pendingTaskPoints);
    pendingTaskPoints = null;
    dialog.close();
    const round = state.activeRound;
    if (round.currentIndex === 4) {
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
    if (action === 'skip') {
      if (!window.confirm('Aufgabe überspringen? Sie wird endgültig mit 0 Punkten gewertet.')) return;
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
    window.alert(taskSolution(task));
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
      const progress = round.tasks.map((item, index) => `<span class="${index < round.currentIndex ? 'done' : ''} ${index === round.currentIndex ? 'current' : ''}" aria-current="${index === round.currentIndex ? 'step' : 'false'}">Aufgabe ${index + 1}</span>`).join('');
      const choices = task.options?.map((option) => `<button class="choice ${task.incorrectAnswers.includes(option) ? 'incorrect' : ''}" type="button" aria-pressed="${task.selectedAnswer === option}" data-answer="${escapeHtml(option)}">${escapeHtml(option)}${task.incorrectAnswers.includes(option) ? '<span class="fine-print"> · zuvor falsch gewählt</span>' : ''}</button>`).join('');
      const ordering = task.surface === 'ordering'
        ? `<p class="fine-print">Verschiebe die Elemente. Mit den Schaltflächen lassen sie sich auch vollständig per Tastatur ordnen.</p><ol id="order-list" class="order-list" aria-label="Deine Reihenfolge">${task.currentOrder.map((item, index) => `<li class="order-item" draggable="true" data-order-index="${index}"><span>${escapeHtml(item)}</span><span class="actions"><button type="button" data-move="${index}" data-direction="-1" aria-label="${escapeHtml(item)} nach links">←</button><button type="button" data-move="${index}" data-direction="1" aria-label="${escapeHtml(item)} nach rechts">→</button></span></li>`).join('')}</ol>`
        : '';
      const wordExamples = task.surface === 'word-logic'
        ? `<p class="fine-print"><strong>Beispiele:</strong> ${task.examples.map(([first, second]) => `${escapeHtml(first)} : ${escapeHtml(second)}`).join(' · ')}</p><p class="question">${escapeHtml(task.target)} : ?</p>`
        : '';
      const taskQuestion = task.surface === 'word-logic' ? wordExamples : `<p class="question">${escapeHtml(task.question)}</p>`;
      const answerSurface = task.surface === 'ordering'
        ? ordering
        : `<div class="choices">${choices}</div>`;
      host.innerHTML = `${alert}<section class="card">
        <p class="fine-print">${round.kind === 'extra' ? '<strong>Weitere Runde – ohne Wertung</strong> · ' : ''}${escapeHtml(task.mechanic)} · ${escapeHtml(task.difficulty)}</p>
        <h2>Aufgabe ${escapeHtml(round.currentIndex + 1)} von 5</h2>
        <div class="progress" aria-label="Rundenfortschritt">${progress}</div>
        ${taskQuestion}
        ${task.surface === 'odd-one-out' ? '<p class="fine-print">Wähle genau ein Element und bestätige deine Auswahl.</p>' : ''}
        ${answerSurface}
        <p id="feedback" class="status" role="status" aria-live="polite"></p>
        <p class="fine-print">Fehler: ${escapeHtml(task.errors)} von 3</p>
        <div class="actions"><button id="check-answer" class="primary" type="button">Prüfen</button><button id="skip" type="button">Überspringen</button><button id="solution" type="button">Lösung anzeigen</button><button id="pause" type="button">Pause</button></div>
      </section>`;
      host.querySelectorAll('[data-answer]').forEach((button) => {
        button.addEventListener('click', () => {
          task.selectedAnswer = task.selectedAnswer === button.dataset.answer ? null : button.dataset.answer;
          host.querySelectorAll('[data-answer]').forEach((choice) => {
            choice.setAttribute('aria-pressed', String(choice.dataset.answer === task.selectedAnswer));
          });
          persist();
        });
      });
      host.querySelector('#check-answer').addEventListener('click', () => {
        const answer = task.surface === 'ordering' ? task.currentOrder : task.selectedAnswer;
        if (answer === null || answer === undefined) {
          host.querySelector('#feedback').textContent = 'Wähle zuerst eine Antwort aus.';
          return;
        }
        const correct = task.surface === 'ordering'
          ? answer.length === task.answer.length && answer.every((item, index) => item === task.answer[index])
          : answer === task.answer;
        if (correct) {
          showTaskResult(100, 'Aufgabe ausgewertet');
          return;
        }
        task.errors += 1;
        task.incorrectAnswers.push(task.surface === 'ordering' ? answer.join(' → ') : answer);
        if (task.errors >= 3) {
          host.querySelector('#feedback').textContent = 'Drei Fehler – die Aufgabe ist beendet und zählt 0 Punkte.';
          showTaskResult(0, 'Aufgabe beendet');
          return;
        }
        if (task.surface !== 'ordering') task.selectedAnswer = null;
        persist();
        render(`Das war leider nicht richtig. Noch ${3 - task.errors} ${3 - task.errors === 1 ? 'Versuch' : 'Versuche'}.`);
        host.querySelector('#check-answer').focus();
      });
      host.querySelectorAll('[data-move]').forEach((button) => {
        button.addEventListener('click', () => {
          const index = Number(button.dataset.move);
          const nextIndex = index + Number(button.dataset.direction);
          if (nextIndex < 0 || nextIndex >= task.currentOrder.length) return;
          [task.currentOrder[index], task.currentOrder[nextIndex]] = [task.currentOrder[nextIndex], task.currentOrder[index]];
          persist();
          render();
          host.querySelector(`[data-move="${nextIndex}"][data-direction="${button.dataset.direction}"]`)?.focus();
        });
      });
      if (task.surface === 'ordering') {
        let draggedIndex = null;
        host.querySelectorAll('[data-order-index]').forEach((item) => {
          item.addEventListener('dragstart', (event) => {
            draggedIndex = Number(item.dataset.orderIndex);
            event.dataTransfer?.setData('text/plain', String(draggedIndex));
          });
          item.addEventListener('dragover', (event) => event.preventDefault());
          item.addEventListener('drop', (event) => {
            event.preventDefault();
            const from = draggedIndex ?? Number(event.dataTransfer?.getData('text/plain'));
            const to = Number(item.dataset.orderIndex);
            if (!Number.isInteger(from) || from === to) return;
            const [moved] = task.currentOrder.splice(from, 1);
            task.currentOrder.splice(to, 0, moved);
            draggedIndex = null;
            persist();
            render();
          });
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

  continueButton.addEventListener('click', advanceTask);
  finishButton.addEventListener('click', () => {
    completeActiveTask(pendingTaskPoints);
    pendingTaskPoints = null;
    state.activeRound.state = 'finished';
    if (state.activeRound.kind === 'official') finishAttempt('completed');
    state.activeRound = null;
    dialog.close();
    persist();
    render();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseRound('Die Runde wurde beim Verlassen des Tabs pausiert.');
  });
  window.addEventListener('blur', () => pauseRound('Die Runde wurde beim Wechsel aus dem Fenster pausiert.'));

  if (state.pendingConfirmations.length) acknowledgePending();
  render();
}

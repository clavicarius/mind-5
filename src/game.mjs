import {
  calculateMemoryScore,
  createMemoryTask,
  isMemoryAnswerCorrect,
  memorySolution,
} from './memory-logic.mjs';
import {
  createVisualTask,
  isVisualAnswerCorrect,
  renderVisualPrompt,
} from './visual-logic.mjs';

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
  { mechanic: 'Muster fortsetzen', inputType: 'visual' },
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
  { mechanic: 'Raster-Logik', inputType: 'visual' },
  { mechanic: 'Drehen & Denken', inputType: 'visual' },
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
  { mechanic: 'Visueller Vergleich', inputType: 'visual' },
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
const VISUAL_MECHANICS = ['Muster fortsetzen', 'Raster-Logik', 'Drehen & Denken', 'Visueller Vergleich'];

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
  task.selectedPositions = [];
  task.feedback = '';
}

export function registerMechanicError(task) {
  task.errors += 1;
  task.inputValue = '';
  task.selectedOption = null;
  task.selectedPositions = [];
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
      const baseContent = task.inputType === 'sequence'
        ? createSequenceTask(ageGroup, taskDifficulty, random)
        : task.inputType === 'arithmetic'
          ? createArithmeticTask(ageGroup, taskDifficulty, random)
          : VISUAL_MECHANICS.includes(task.mechanic)
            ? createVisualTask(task.mechanic, ageGroup, taskDifficulty, random)
            : taskDifficulty === 'anspruchsvoll' ? task.challenging : task;
      const content = ACTIVITY_CONTENT[task.mechanic]?.[ageGroup]?.[taskDifficulty] ?? baseContent;
      if (!validateTaskContent(content)) {
        throw new TypeError(`Ungültiger Aufgabeninhalt für ${task.mechanic}.`);
      }
      const optionPairs = content.surface && content.options
        ? content.options.map((option, optionIndex) => ({
          option,
          explanation: content.explanations?.[optionIndex],
        }))
        : null;
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
        hintsUsed: [],
        inputValue: '',
        selectedOption: null,
        selectedPositions: [],
        feedback: '',
        points: null,
        incorrectAnswers: [],
        ...(selectedContent.surface === 'ordering' ? { currentOrder: [...selectedContent.items] } : {}),
        ...(selectedContent.surface && selectedContent.surface !== 'ordering' ? { selectedAnswer: null } : {}),
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
  let touchDragStartIndex = null;
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

  function taskSolution(task) {
    if (task.inputType?.startsWith('visual-')) return task.explanation;
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

  function showTaskResult(points, reason, detail = '', exitRound = false, revealAfterConfirm = false) {
    pendingTaskPoints = points;
    pendingRoundExit = exitRound;
    const task = state.activeRound.tasks[state.activeRound.currentIndex];
    pendingTaskSolution = revealAfterConfirm
      ? detail || task.explanation || taskSolution(task)
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
      if (task.surface) {
        showTaskResult(0, 'Aufgabe übersprungen', taskSolution(task), false, true);
        return;
      }
      if (task.inputType === 'sequence' || task.inputType === 'arithmetic' || task.inputType?.startsWith('visual-')) {
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
    if (task.inputType === 'sequence' || task.inputType === 'arithmetic' || task.inputType?.startsWith('visual-')) {
      showTaskResult(0, 'Lösung angezeigt', '', false, true);
      return;
    }
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
      const visualTask = task.inputType === 'visual-choice' || task.inputType === 'visual-comparison';
      const specialized = task.inputType === 'sequence' || task.inputType === 'arithmetic' || visualTask;
      const choices = task.inputType === 'arithmetic'
        ? task.options.map((option, index) => `<label class="choice"><input type="radio" name="arithmetic-answer" data-option value="${index}" ${task.selectedOption === index ? 'checked' : ''}> ${escapeHtml(option.label)}</label>`).join('')
        : task.inputType ? '' : task.options?.map((option) => `<button class="choice ${task.incorrectAnswers?.includes(option) ? 'incorrect' : ''}" type="button" aria-pressed="${task.selectedAnswer === option}" data-answer="${escapeHtml(option)}">${escapeHtml(option)}${task.incorrectAnswers?.includes(option) ? '<span class="fine-print"> · zuvor falsch gewählt</span>' : ''}</button>`).join('');
      const visualPrompt = visualTask ? renderVisualPrompt(task, task.selectedPositions) : '';
      const ordering = task.surface === 'ordering'
        ? `<p class="fine-print">Verschiebe die Elemente per Ziehen oder mit den Schaltflächen, die auch vollständig per Tastatur bedienbar sind.</p><ol id="order-list" class="order-list" aria-label="Deine Reihenfolge">${task.currentOrder.map((item, index) => `<li class="order-item" draggable="true" data-order-index="${index}"><span class="drag-handle" aria-hidden="true">⠿</span><span>${escapeHtml(item)}</span><span class="actions"><button type="button" data-move="${index}" data-direction="-1" aria-label="${escapeHtml(item)} nach links">←</button><button type="button" data-move="${index}" data-direction="1" aria-label="${escapeHtml(item)} nach rechts">→</button></span></li>`).join('')}</ol>`
        : '';
      const wordExamples = task.surface === 'word-logic'
        ? `<p class="fine-print"><strong>Beispiele:</strong> ${task.examples.map(([first, second]) => `${escapeHtml(first)} : ${escapeHtml(second)}`).join(' · ')}</p><p class="question">${escapeHtml(task.target)} : ?</p>`
        : '';
      const taskQuestion = task.surface === 'word-logic' ? wordExamples : `<p class="question">${escapeHtml(task.question)}</p>`;
      const arithmeticDetails = task.inputType === 'arithmetic'
        ? `<div class="puzzle-details"><h3>Gleichungen</h3><ul>${task.equations.map((equation) => `<li>${escapeHtml(equation)}</li>`).join('')}</ul><h3>Bedingungen</h3><ul>${task.conditions.map((condition) => `<li>${escapeHtml(condition)}</li>`).join('')}</ul><p>Wertebereiche: ${task.fields.map(({ name, min, max }) => `${escapeHtml(name)} ∈ {${min} … ${max}}`).join('; ')}</p></div><div class="choices" role="radiogroup" aria-label="Vollständige Feldbelegung">${choices}</div>`
        : '';
      const sequenceInput = task.inputType === 'sequence'
        ? `<label for="sequence-answer">Nächste Zahl</label><input id="sequence-answer" type="text" inputmode="numeric" autocomplete="off" maxlength="6" aria-describedby="sequence-range" value="${escapeHtml(task.inputValue)}"><p id="sequence-range" class="fine-print">Ganze Zahl von 0 bis ${SEQUENCE_LIMITS[round.ageGroup]}.</p>`
        : '';
      const specializedActions = specialized
        ? `<div class="actions"><button id="restart" type="button" ${task.errors >= 3 ? 'disabled' : ''}>Neustart</button>${task.inputType === 'sequence' ? '<button id="undo" type="button">Rückgängig</button>' : `<button id="clear-selection" type="button" ${(task.inputType === 'visual-comparison' ? task.selectedPositions.length === 0 : task.selectedOption === null) ? 'disabled' : ''}>Auswahl aufheben</button>`}<button id="hint" type="button" ${task.hintsUsed.length >= 2 ? 'disabled' : ''}>${task.hintsUsed.length >= 2 ? 'Keine Hinweise mehr' : 'Nächsten Hinweis anzeigen'}</button><button id="check" class="primary" type="button">Prüfen</button></div><p class="fine-print">Mögliche Punkte: ${pointsAfterHints(round.ageGroup, task.hintsUsed)} von 100</p>${task.hintText ? `<p class="status" role="status">Hinweis ${task.hintsUsed.length}: ${escapeHtml(task.hintText)}</p>` : ''}`
        : '';
      host.innerHTML = `${alert}<section class="card">
        <p class="fine-print">${round.kind === 'extra' ? '<strong>Weitere Runde – ohne Wertung</strong> · ' : ''}${escapeHtml(task.mechanic)} · ${escapeHtml(task.difficulty)}</p>
        <h2>Aufgabe ${escapeHtml(round.currentIndex + 1)} von 5</h2>
        <div class="progress" aria-label="Rundenfortschritt">${progress}</div>
        ${taskQuestion}
        ${task.surface === 'odd-one-out' ? '<p class="fine-print">Wähle genau ein Element und bestätige deine Auswahl.</p>' : ''}
        ${visualPrompt}${arithmeticDetails}${sequenceInput}${task.surface === 'ordering' ? ordering : !specialized ? `<div class="choices">${choices}</div>` : ''}
        <p id="feedback" class="status" role="status" aria-live="polite">${escapeHtml(task.feedback)}</p>
        <p id="error-count" class="fine-print">Fehler: ${escapeHtml(task.errors)} von 3</p>
        ${specializedActions}
        <div class="actions">${task.surface ? '<button id="check-answer" class="primary" type="button">Prüfen</button>' : ''}<button id="skip" type="button">Überspringen</button><button id="solution" type="button">Lösung anzeigen</button><button id="pause" type="button">Pause</button></div>
      </section>`;
      host.querySelectorAll('[data-answer]').forEach((button) => {
        button.addEventListener('click', () => {
          if (task.surface) {
            task.selectedAnswer = task.selectedAnswer === button.dataset.answer ? null : button.dataset.answer;
            host.querySelectorAll('[data-answer]').forEach((choice) => {
              choice.setAttribute('aria-pressed', String(choice.dataset.answer === task.selectedAnswer));
            });
            persist();
            return;
          }
          if (button.dataset.answer === task.answer) {
            showTaskResult(task.errors >= 3 ? 0 : 100, 'Aufgabe ausgewertet');
          } else {
            task.errors += 1;
            if (task.errors >= 3) {
              host.querySelector('#feedback').textContent = 'Drei Fehler – die Aufgabe ist beendet und zählt 0 Punkte.';
              host.querySelectorAll('[data-answer]').forEach((choice) => { choice.disabled = true; });
              showTaskResult(0, 'Aufgabe beendet');
            } else {
              host.querySelector('#feedback').textContent = `Das war leider nicht richtig. Noch ${3 - task.errors} ${3 - task.errors === 1 ? 'Versuch' : 'Versuche'}.`;
              persist();
            }
          }
        });
      });
      if (task.surface) {
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
            showTaskResult(100, 'Aufgabe ausgewertet', taskSolution(task), false, true);
            return;
          }
          task.errors += 1;
          task.incorrectAnswers.push(task.surface === 'ordering' ? answer.join(' → ') : answer);
          if (task.errors >= 3) {
            host.querySelector('#feedback').textContent = 'Drei Fehler – die Aufgabe ist beendet und zählt 0 Punkte.';
            showTaskResult(0, 'Aufgabe beendet', taskSolution(task), false, true);
            return;
          }
          if (task.surface !== 'ordering') task.selectedAnswer = null;
          persist();
          render(`Das war leider nicht richtig. Noch ${3 - task.errors} ${3 - task.errors === 1 ? 'Versuch' : 'Versuche'}.`);
          host.querySelector('#check-answer').focus();
        });
      }
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
      if (visualTask) {
        host.querySelectorAll('[data-visual-option]').forEach((button) => {
          button.addEventListener('click', () => {
            task.selectedOption = Number(button.dataset.visualOption);
            task.feedback = '';
            persist();
            render();
          });
        });
        host.querySelectorAll('[data-compare-position]').forEach((button) => {
          button.addEventListener('click', () => {
            const position = Number(button.dataset.comparePosition);
            task.selectedPositions = task.selectedPositions.includes(position)
              ? task.selectedPositions.filter((selected) => selected !== position)
              : [...task.selectedPositions, position].sort((a, b) => a - b);
            task.feedback = '';
            persist();
            render();
          });
        });
        host.querySelector('#clear-selection').addEventListener('click', () => {
          task.selectedOption = null;
          task.selectedPositions = [];
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
          } else if (task.inputType === 'arithmetic') {
            if (task.selectedOption === null) {
              task.feedback = 'Wähle zuerst eine vollständige Belegung aus.';
              host.querySelector('#feedback').textContent = task.feedback;
              return;
            }
            correct = task.options[task.selectedOption]?.label === task.answer;
          } else {
            const selectionEmpty = task.inputType === 'visual-comparison'
              ? task.selectedPositions.length === 0
              : task.selectedOption === null;
            if (selectionEmpty) {
              task.feedback = task.inputType === 'visual-comparison'
                ? 'Wähle zuerst mindestens eine Position aus.'
                : 'Wähle zuerst eine Kachel aus.';
              host.querySelector('#feedback').textContent = task.feedback;
              return;
            }
            correct = isVisualAnswerCorrect(task, task.selectedOption, task.selectedPositions);
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
          host.querySelector(task.inputType === 'sequence'
            ? '#sequence-answer'
            : '[data-option], [data-visual-option], [data-compare-position]')?.focus();
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

  host.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch') return;
    const handle = event.target.closest?.('.drag-handle');
    const item = handle?.closest('[data-order-index]');
    if (item) touchDragStartIndex = Number(item.dataset.orderIndex);
  });
  host.addEventListener('pointerup', (event) => {
    if (touchDragStartIndex === null) return;
    const from = touchDragStartIndex;
    touchDragStartIndex = null;
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('#order-list [data-order-index]');
    const to = Number(target?.dataset.orderIndex);
    const activeTask = state.activeRound?.tasks[state.activeRound.currentIndex];
    if (!target || from === to || activeTask?.surface !== 'ordering') return;
    const [moved] = activeTask.currentOrder.splice(from, 1);
    activeTask.currentOrder.splice(to, 0, moved);
    persist();
    render();
  });
  host.addEventListener('pointercancel', () => { touchDragStartIndex = null; });

  continueButton.addEventListener('click', confirmTaskResult);
  finishButton.addEventListener('click', confirmTaskResult);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseRound('Die Runde wurde beim Verlassen des Tabs pausiert.');
  });
  window.addEventListener('blur', () => pauseRound('Die Runde wurde beim Wechsel aus dem Fenster pausiert.'));

  if (state.pendingConfirmations.length) acknowledgePending();
  render();
}

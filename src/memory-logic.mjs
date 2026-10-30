const EASY_TASK = {
  information: [
    'Mia nimmt nur einen Apfel als Snack.',
    'Ben nimmt nur eine Birne als Snack.',
    'Lea nimmt nur Trauben als Snack.',
    'Tom nimmt nur eine Banane als Snack.',
  ],
  questions: [
    {
      question: 'Was nimmt Mia als Snack?',
      options: ['Apfel', 'Birne', 'Trauben', 'Banane'],
      answers: ['Apfel'],
      explanation: 'Mia nimmt nur einen Apfel als Snack.',
      hints: ['Achte auf die Person und den Snack.', 'Die gesuchte Information nennt Mia.'],
    },
    {
      question: 'Wer nimmt eine Birne als Snack?',
      options: ['Mia', 'Ben', 'Lea', 'Tom'],
      answers: ['Ben'],
      explanation: 'Ben nimmt nur eine Birne als Snack.',
      hints: ['Suche nach der Birne.', 'Die gesuchte Information nennt eine Person.'],
    },
    {
      question: 'Was nimmt Lea als Snack?',
      options: ['Apfel', 'Birne', 'Trauben', 'Banane'],
      answers: ['Trauben'],
      explanation: 'Lea nimmt nur Trauben als Snack.',
      hints: ['Achte auf Lea und den Snack.', 'Die gesuchte Information nennt Lea.'],
    },
  ],
};

const CHALLENGING_INFORMATION = [
  'Mia hat nur die Sternkarte.',
  'Ben hat nur die Mondkarte.',
  'Lea hat nur die Sonnenkarte.',
  'Sam hat nur die Wolkenkarte.',
  'Noa hat nur die Herzkarte.',
  'Die Sternkarte führt nur zu Raum 2.',
  'Die Mondkarte führt nur zu Raum 1.',
  'Die Sonnenkarte führt nur zu Raum 3.',
];

const PEOPLE = ['Mia', 'Ben', 'Lea', 'Sam', 'Noa'];
const SYMBOLS = ['Sternkarte', 'Mondkarte', 'Sonnenkarte', 'Wolkenkarte', 'Herzkarte'];
const ROOMS = ['Raum 1', 'Raum 2', 'Raum 3', 'Raum 4', 'Raum 5', 'Raum 6'];

function randomIndex(length, random) {
  return Math.min(length - 1, Math.floor(random() * length));
}

function shuffled(items, random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1, random);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function question(questionText, options, answers, explanation, hints, random) {
  return {
    question: questionText,
    options: shuffled(options, random),
    answers,
    explanation,
    hints,
  };
}

function challengingTask(random) {
  const informationCount = 6 + randomIndex(3, random);
  const optionCount = 5 + randomIndex(2, random);
  const information = CHALLENGING_INFORMATION.slice(0, informationCount);
  const extraOption = optionCount === 6;
  const statementOptions = (truths, falsehoods) => shuffled(
    [...truths, ...falsehoods].slice(0, optionCount),
    random,
  );
  const personStatements = (attribute) => PEOPLE.map((person) => `${person} ${attribute}`);
  const roomOptions = (person) => [
    ...ROOMS.slice(0, optionCount).map((destination) => `${person}s Karte führt zu ${destination}.`),
    ...(extraOption ? [`${person}s Karte hat kein Ziel.`] : []),
  ].slice(0, optionCount);
  const cardOptions = (person) => [
    ...SYMBOLS.map((symbol) => `${person} hat eine ${symbol}.`),
    ...(extraOption ? [`${person} hat keine Karte.`] : []),
  ].slice(0, optionCount);
  const ownerOptions = (symbol) => [
    ...PEOPLE.map((person) => `${person} hat eine ${symbol}.`),
    ...(extraOption ? [`Niemand hat eine ${symbol}.`] : []),
  ].slice(0, optionCount);
  const destinationQuestion = (person, symbol, room) => question(
    `In welchen Raum führt ${person}s Karte?`,
    roomOptions(person),
    [`${person}s Karte führt zu ${room}.`],
    `${person} hat nur die ${symbol}. Die ${symbol} führt nur zu ${room}.`,
    ['Verknüpfe die Kartenart mit ihrem Ziel.', `Die Information über ${person} nennt die Kartenart.`],
    random,
  );

  const multiSelectOptions = statementOptions(
    PEOPLE.slice(1).map((person) => `${person} hat ein anderes Zeichen als Mia.`),
    [
      'Mia hat ein anderes Zeichen als Mia.',
      ...(extraOption ? ['Ben hat dasselbe Zeichen wie Mia.'] : []),
    ],
  );
  const questions = [
    destinationQuestion('Mia', 'Sternkarte', 'Raum 2'),
    question(
      'Welches Zeichen steht auf Bens Karte?',
      cardOptions('Ben'),
      ['Ben hat eine Mondkarte.'],
      'Ben hat nur die Mondkarte.',
      ['Achte auf Ben und das Zeichen seiner Karte.', 'Die Information über Ben nennt seine Kartenart.'],
      random,
    ),
    question(
      'Welche Aussagen treffen zu?',
      multiSelectOptions,
      PEOPLE.slice(1).map((person) => `${person} hat ein anderes Zeichen als Mia.`),
      'Mia hat nur die Sternkarte. Ben, Lea, Sam und Noa haben andere Karten.',
      ['Vergleiche jedes Zeichen mit Mias Zeichen.', 'Die fünf Informationen nennen die Karten aller Personen.'],
      random,
    ),
    question(
      'Wer hat eine Herzkarte?',
      ownerOptions('Herzkarte'),
      ['Noa hat eine Herzkarte.'],
      'Noa hat nur die Herzkarte.',
      ['Suche nach der Herzkarte.', 'Die gesuchte Information nennt eine Person.'],
      random,
    ),
    informationCount === 6
      ? question(
        'Wer hat eine Wolkenkarte?',
        personStatements('hat eine Wolkenkarte.').concat(extraOption ? ['Niemand hat eine Wolkenkarte.'] : []).slice(0, optionCount),
        ['Sam hat eine Wolkenkarte.'],
        'Sam hat nur die Wolkenkarte.',
        ['Suche nach der Wolkenkarte.', 'Die gesuchte Information nennt eine Person.'],
        random,
      )
      : destinationQuestion(
        informationCount === 7 ? 'Ben' : 'Lea',
        informationCount === 7 ? 'Mondkarte' : 'Sonnenkarte',
        informationCount === 7 ? 'Raum 1' : 'Raum 3',
      ),
  ];

  return { information, questions };
}

export function createMemoryTask({ ageGroup, difficulty, random = Math.random }) {
  if (!['8-12', '13-17', '18+'].includes(ageGroup)
    || !['leicht', 'anspruchsvoll'].includes(difficulty)
    || typeof random !== 'function') {
    throw new TypeError('Ungültige Einstellungen für Memory Logic.');
  }
  const content = difficulty === 'leicht' ? EASY_TASK : challengingTask(random);
  return {
    ...content,
    memoryPhase: 'intro',
    informationIndex: 0,
    questionIndex: 0,
    selectedAnswers: [],
    questionResult: null,
    correctQuestions: 0,
    hintsUsed: 0,
    hintMessage: '',
    errors: 0,
    points: null,
  };
}

export function isMemoryAnswerCorrect(selectedAnswers, correctAnswers) {
  if (!Array.isArray(selectedAnswers) || !Array.isArray(correctAnswers)
    || selectedAnswers.length !== correctAnswers.length) return false;
  const selected = new Set(selectedAnswers);
  return selected.size === correctAnswers.length
    && correctAnswers.every((answer) => selected.has(answer));
}

export function calculateMemoryScore(task, ageGroup) {
  if (task.errors >= 3) return 0;
  const penalty = (ageGroup === '18+' && task.hintsUsed > 0 ? 10 : 0)
    + (task.hintsUsed > 1 ? 20 : 0);
  return Math.max(0, Math.floor((task.correctQuestions / task.questions.length * 100) - penalty + 0.5));
}

export function memorySolution(task) {
  return task.questions.map(({ question: prompt, answers, explanation }, index) => (
    `Frage ${index + 1}: ${prompt}\nLösung: ${answers.map((answer) => answer.replace(/[.!?]$/, '')).join('; ')}.\n${explanation}`
  )).join('\n\n');
}

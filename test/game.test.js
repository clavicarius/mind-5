const assert = require('node:assert/strict');
const { test } = require('node:test');
const {
  AGE_GROUPS,
  ACTIVITY_CONTENT,
  DIFFICULTY_PROFILES,
  TASKS,
  berlinDay,
  calculateDailyScore,
  createArithmeticTask,
  createRound,
  createSequenceTask,
  hintCost,
  pointsAfterHints,
  registerMechanicError,
  recordTaskResult,
  validateTaskContent,
  resetMechanicAttempt,
  undoSequenceInput,
  validateNumberSequence,
  validateSequenceInput,
} = require('../src/game.mjs');
const {
  calculateMemoryScore,
  createMemoryTask,
  isMemoryAnswerCorrect,
} = require('../src/memory-logic.mjs');

test('offers all age groups and six exact difficulty profiles', () => {
  assert.deepEqual(AGE_GROUPS, ['8-12', '13-17', '18+']);
  assert.deepEqual(DIFFICULTY_PROFILES.map(({ easy, challenging }) => [easy, challenging]), [
    [5, 0], [4, 1], [3, 2], [2, 3], [1, 4], [0, 5],
  ]);
});

test('creates five tasks with the selected profile distribution', () => {
  for (const profile of DIFFICULTY_PROFILES) {
    const round = createRound({
      ageGroup: '13-17',
      profileId: profile.id,
      random: () => 0.37,
    });
    assert.equal(round.tasks.length, 5);
    assert.equal(new Set(round.tasks.map(({ mechanic }) => mechanic)).size, 5);
    assert.equal(round.tasks.filter(({ difficulty }) => difficulty === 'leicht').length, profile.easy);
    assert.equal(round.tasks.filter(({ difficulty }) => difficulty === 'anspruchsvoll').length, profile.challenging);
  }
});

test('creates ordering tasks without requiring answer options', () => {
  let value = 10;
  const round = createRound({
    kind: 'extra',
    ageGroup: '13-17',
    profileId: 3,
    random: () => {
      value = (value * 16_807) % 2_147_483_647;
      return (value - 1) / 2_147_483_646;
    },
  });
  assert.equal(round.tasks[0].surface, 'ordering');
  assert.equal(round.tasks[0].currentOrder.length, round.tasks[0].items.length);
});

test('validates round settings and marks further rounds consistently', () => {
  assert.throws(() => createRound({ ageGroup: '7-11', profileId: 1 }), TypeError);
  assert.throws(() => createRound({ ageGroup: '18+', profileId: 7 }), TypeError);
  const extraRound = createRound({ kind: 'extra', ageGroup: '18+', profileId: 6 });
  assert.equal(extraRound.kind, 'extra');
  assert.equal(extraRound.tasks.length, 5);
});

test('calculates the daily score from exactly five tasks, with unfinished tasks at zero', () => {
  assert.equal(calculateDailyScore([100, 100, 100, 100, 0]), 80);
  assert.equal(calculateDailyScore([100, 100, 99, 99, null]), 80);
  assert.equal(calculateDailyScore([0, 0, 0, 0, 0]), 0);
  assert.throws(() => calculateDailyScore([100, 100]), TypeError);
});

test('creates an official attempt on its first finalized task, but extra rounds do not affect it', () => {
  const official = createRound({ ageGroup: '8-12', profileId: 2 });
  const first = recordTaskResult(official, null, 100, 4);
  assert.equal(first.officialAttempt.status, 'in-progress');
  assert.equal(first.officialAttempt.ageGroup, '8-12');
  assert.equal(first.officialAttempt.profileId, 2);
  assert.equal(first.officialAttempt.taskPoints[0], 100);
  assert.equal(first.streak, 5);

  const secondRoundState = { ...official, currentIndex: 1 };
  const second = recordTaskResult(secondRoundState, first.officialAttempt, 75, first.streak);
  assert.equal(second.officialAttempt.taskPoints[0], 100);
  assert.equal(second.officialAttempt.taskPoints[1], 75);
  assert.equal(second.streak, first.streak);

  const extra = createRound({ kind: 'extra', ageGroup: '18+', profileId: 6 });
  const extraResult = recordTaskResult(extra, second.officialAttempt, 0, second.streak);
  assert.equal(extraResult.officialAttempt, second.officialAttempt);
  assert.equal(extraResult.streak, second.streak);
  assert.equal(extraResult.officialAttempt.taskPoints[1], 75);
});

test('uses the Berlin calendar day rather than UTC', () => {
  assert.equal(berlinDay(new Date('2026-10-28T23:30:00Z')), '2026-10-29');
});

test('creates profile-conformant number sequences and arithmetic assignments', () => {
  assert.equal(TASKS.length, 10);
  const maximums = { '8-12': 100, '13-17': 1_000, '18+': 10_000 };
  for (const ageGroup of AGE_GROUPS) {
    for (const [difficulty, count, optionCount, equationCount] of [
      ['leicht', 5, 4, 1],
      ['anspruchsvoll', 6, 5, 2],
    ]) {
      const sequence = createSequenceTask(ageGroup, difficulty, () => 0.37);
      assert.equal(sequence.sequence.length, count);
      assert.ok([...sequence.sequence, sequence.answer].every((term) => term <= maximums[ageGroup]));
      assert.ok(validateNumberSequence(sequence.sequence, sequence.answer, difficulty));

      const arithmetic = createArithmeticTask(ageGroup, difficulty, () => 0.37);
      assert.equal(arithmetic.options.length, optionCount);
      assert.equal(arithmetic.equations.length, equationCount);
      assert.equal(new Set(arithmetic.options.map(({ label }) => label)).size, optionCount);
      assert.equal(arithmetic.options.filter(({ label }) => label === arithmetic.answer).length, 1);
      assert.ok(arithmetic.options.every(({ values }) => arithmetic.fields.every(({ name, min, max }) => (
        Number.isInteger(values[name]) && values[name] >= min && values[name] <= max
      ))));
    }
  }
  const multiplicationSequence = createSequenceTask('18+', 'leicht', () => 0.99);
  assert.equal(multiplicationSequence.answer, 640);
  assert.match(multiplicationSequence.rule, /mit 2 multipliziert/);
});

test('validates number entry and undo without accepting partial or formatted values', () => {
  assert.deepEqual(validateSequenceInput(' +30 ', 100), { valid: true, value: 30 });
  for (const input of ['', '+', '3.5', '1,000', 'abc', '-1', '101']) {
    assert.equal(validateSequenceInput(input, 100).valid, false, input);
  }
  assert.equal(undoSequenceInput('123'), '12');
  assert.equal(undoSequenceInput('+12'), '+1');
  assert.equal(undoSequenceInput('+'), '');
  assert.equal(undoSequenceInput('03'), '');
  assert.equal(undoSequenceInput('0'), '');
});

test('applies hint costs and preserves them across an attempt reset', () => {
  assert.equal(hintCost('8-12', 1), 0);
  assert.equal(hintCost('18+', 1), 10);
  assert.equal(hintCost('13-17', 2), 20);
  assert.equal(pointsAfterHints('18+', [1, 2]), 70);
  assert.equal(pointsAfterHints('8-12', [1, 2]), 80);

  const task = {
    errors: 1,
    hintsUsed: [1],
    inputValue: '48',
    selectedOption: 2,
    feedback: 'wrong',
  };
  resetMechanicAttempt(task);
  assert.equal(task.inputValue, '');
  assert.equal(task.selectedOption, null);
  assert.equal(task.feedback, '');
  assert.equal(task.errors, 1);
  assert.deepEqual(task.hintsUsed, [1]);
});

test('counts only confirmed wrong mechanic answers and ends on the third error', () => {
  const task = { errors: 0, inputValue: '99', selectedOption: 1, hintsUsed: [1] };
  assert.equal(registerMechanicError(task), false);
  assert.equal(task.errors, 1);
  assert.equal(task.inputValue, '');
  assert.equal(task.selectedOption, null);
  assert.equal(registerMechanicError(task), false);
  assert.equal(registerMechanicError(task), true);
  assert.equal(task.errors, 3);
  assert.deepEqual(task.hintsUsed, [1]);
});

test('all included mechanic answers are selectable', () => {
  assert.equal(TASKS.length, 10);
  const easy = createRound({ ageGroup: '13-17', profileId: 1, random: () => 0 });
  const challenging = createRound({ ageGroup: '13-17', profileId: 6, random: () => 0 });
  for (const task of TASKS) {
    if (task.mechanic === 'Memory Logic' || task.inputType) continue;
    assert.ok(task.options.includes(task.answer), `${task.mechanic} answer must be selectable`);
    assert.ok(task.challenging.options.includes(task.challenging.answer), `${task.mechanic} challenging answer must be selectable`);
  }
  assert.ok(easy.tasks.every(({ mechanic, difficulty, answer, options }) => (
    mechanic === 'Memory Logic' ? difficulty === 'leicht' && options === undefined
      : mechanic === 'Zahlenfolge' ? difficulty === 'leicht' && answer !== undefined && options === undefined
        : mechanic === 'Rechenlogik' ? difficulty === 'leicht' && options.length === 4 && options.some(({ label }) => label === answer)
          : difficulty === 'leicht' && options.includes(answer)
  )));
  assert.ok(challenging.tasks.every(({ mechanic, difficulty, answer, options }) => (
    mechanic === 'Memory Logic' ? difficulty === 'anspruchsvoll' && options === undefined
      : mechanic === 'Zahlenfolge' ? difficulty === 'anspruchsvoll' && answer !== undefined && options === undefined
        : mechanic === 'Rechenlogik' ? difficulty === 'anspruchsvoll' && options.length >= 5 && options.some(({ label }) => label === answer)
          : difficulty === 'anspruchsvoll' && options.includes(answer)
  )));
});

test('builds profile-aligned Memory Logic information, questions, and answer options', () => {
  for (const ageGroup of AGE_GROUPS) {
    const easy = createMemoryTask({ ageGroup, difficulty: 'leicht', random: () => 0.4 });
    assert.equal(easy.information.length, 4);
    assert.equal(easy.questions.length, 3);
    assert.ok(easy.information.every((information) => information.split(/\s+/).length <= 10));
    assert.ok(easy.questions.every(({ options, answers, hints }) => (
      options.length === 4
        && answers.length === 1
        && answers.every((answer) => options.includes(answer))
        && hints.length === 2
    )));

    for (const random of [() => 0, () => 0.4, () => 0.99]) {
      const challenging = createMemoryTask({ ageGroup, difficulty: 'anspruchsvoll', random });
      assert.ok([6, 7, 8].includes(challenging.information.length));
      assert.ok(challenging.information.every((information) => information.split(/\s+/).length <= 10));
      assert.equal(challenging.questions.length, 5);
      assert.ok(challenging.questions.every(({ options, answers, hints }) => (
        [5, 6].includes(options.length)
          && new Set(options).size === options.length
          && answers.length > 0
          && hints.length === 2
          && answers.every((answer) => options.includes(answer))
      )));
      assert.ok(challenging.questions.some(({ answers }) => answers.length > 1));
    }
  }
});

test('checks complete answer sets and calculates Memory Logic points and hint penalties', () => {
  assert.equal(isMemoryAnswerCorrect(['a', 'b'], ['b', 'a']), true);
  assert.equal(isMemoryAnswerCorrect(['a'], ['a', 'b']), false);
  assert.equal(isMemoryAnswerCorrect(['a', 'a'], ['a']), false);
  assert.equal(isMemoryAnswerCorrect(['a', 'b', 'c'], ['a', 'b']), false);

  const task = { correctQuestions: 4, questions: Array(5), errors: 0, hintsUsed: 0 };
  assert.equal(calculateMemoryScore(task, '8-12'), 80);
  assert.equal(calculateMemoryScore({ ...task, hintsUsed: 1 }, '18+'), 70);
  assert.equal(calculateMemoryScore({ ...task, hintsUsed: 2 }, '8-12'), 60);
  assert.equal(calculateMemoryScore({ ...task, hintsUsed: 2 }, '18+'), 50);
  assert.equal(calculateMemoryScore({ ...task, errors: 3 }, '13-17'), 0);
});

test('each text and ordering activity has valid age- and difficulty-specific content', () => {
  for (const mechanic of ['Was passt nicht?', 'Reihenfolge', 'Wortlogik']) {
    assert.deepEqual(Object.keys(ACTIVITY_CONTENT[mechanic]).sort(), [...AGE_GROUPS].sort());
    for (const ageGroup of AGE_GROUPS) {
      for (const difficulty of ['leicht', 'anspruchsvoll']) {
        const content = ACTIVITY_CONTENT[mechanic][ageGroup][difficulty];
        assert.ok(validateTaskContent(content), `${mechanic}, ${ageGroup}, ${difficulty} must be valid`);

        if (content.surface === 'odd-one-out') {
          assert.equal(content.options.length, 5);
          assert.equal(content.ruleMatches.length, 4);
          assert.ok(!content.ruleMatches.includes(content.answer));
        } else if (content.surface === 'ordering') {
          assert.equal(content.items.length, difficulty === 'leicht' ? 4 : 5);
          assert.equal(content.answer.length, content.items.length);
        } else {
          assert.equal(content.examples.length, difficulty === 'leicht' ? 1 : 2);
          assert.equal(content.options.length, difficulty === 'leicht' ? 4 : 5);
          assert.ok(content.options.includes(content.answer));
        }
      }
    }
  }
});

test('rejects ambiguous ordering and incomplete odd-one-out content', () => {
  const ordering = ACTIVITY_CONTENT.Reihenfolge['8-12'].leicht;
  assert.equal(validateTaskContent({
    ...ordering,
    constraints: [{ type: 'before', first: 'Leo', second: 'Mia' }],
  }), false);

  const oddOneOut = ACTIVITY_CONTENT['Was passt nicht?']['8-12'].leicht;
  assert.equal(validateTaskContent({ ...oddOneOut, options: oddOneOut.options.slice(1) }), false);
});

const assert = require('node:assert/strict');
const { test } = require('node:test');
const {
  AGE_GROUPS,
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
  resetMechanicAttempt,
  undoSequenceInput,
  validateNumberSequence,
  validateSequenceInput,
} = require('../src/game.mjs');

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

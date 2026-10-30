const assert = require('node:assert/strict');
const { test } = require('node:test');
const {
  AGE_GROUPS,
  ACTIVITY_CONTENT,
  DIFFICULTY_PROFILES,
  TASKS,
  berlinDay,
  calculateDailyScore,
  createRound,
  recordTaskResult,
  validateTaskContent,
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

test('each included question has one answer present among its choices', () => {
  assert.equal(TASKS.length, 10);
  const easy = createRound({ ageGroup: '13-17', profileId: 1, random: () => 0 });
  const challenging = createRound({ ageGroup: '13-17', profileId: 6, random: () => 0 });
  for (const task of TASKS) {
    assert.ok(task.options.includes(task.answer), `${task.mechanic} answer must be selectable`);
    assert.ok(task.challenging.options.includes(task.challenging.answer), `${task.mechanic} challenging answer must be selectable`);
  }
  assert.ok(easy.tasks.every(({ difficulty, answer, options }) => difficulty === 'leicht' && options.includes(answer)));
  assert.ok(challenging.tasks.every(({ difficulty, answer, options }) => difficulty === 'anspruchsvoll' && options.includes(answer)));
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

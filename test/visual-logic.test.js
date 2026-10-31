const assert = require('node:assert/strict');
const { test } = require('node:test');
const {
  createVisualTask,
  isVisualAnswerCorrect,
  renderVisualPrompt,
  validateVisualTask,
} = require('../src/visual-logic.mjs');

const ageGroups = ['8-12', '13-17', '18+'];
const difficulties = ['leicht', 'anspruchsvoll'];
const mechanics = ['Muster fortsetzen', 'Raster-Logik', 'Drehen & Denken', 'Visueller Vergleich'];

function seededRandom(seed) {
  let state = seed;
  return () => {
    state = (state * 1_103_515_245 + 12_345) % 2 ** 31;
    return state / 2 ** 31;
  };
}

test('generates valid visual tasks for every age group and difficulty', () => {
  for (const ageGroup of ageGroups) {
    for (const difficulty of difficulties) {
      for (const mechanic of mechanics) {
        for (const seed of [0, 1, 17, 91, 2026]) {
          const task = createVisualTask(mechanic, ageGroup, difficulty, seededRandom(seed));
          assert.equal(task.difficulty, difficulty);
          assert.equal(validateVisualTask(task), true, `${mechanic}, ${ageGroup}, ${difficulty}, seed ${seed}`);

          if (task.inputType === 'visual-choice') {
            assert.equal(task.options.length, task.visual.options.length);
            assert.ok(task.options.includes(task.answer));
            assert.equal(isVisualAnswerCorrect(task, task.answer), true);
            assert.equal(isVisualAnswerCorrect(task, (task.answer + 1) % task.options.length), false);
          } else {
            assert.equal(task.visual.left.length, difficulty === 'leicht' ? 6 : 8);
            assert.equal(task.answer.length, difficulty === 'leicht' ? 2 : 3);
            assert.equal(isVisualAnswerCorrect(task, null, task.answer), true);
            assert.equal(isVisualAnswerCorrect(task, null, task.answer.slice(1)), false);
          }
          assert.match(renderVisualPrompt(task, task.answer), /aria-label=/);
        }
      }
    }
  }
});

test('uses the profile counts for sequence, grid, rotation, and comparison tasks', () => {
  for (const difficulty of difficulties) {
    const pattern = createVisualTask('Muster fortsetzen', '13-17', difficulty, seededRandom(3));
    assert.equal(pattern.visual.sequence.length, difficulty === 'leicht' ? 5 : 7);
    assert.equal(pattern.visual.options.length, difficulty === 'leicht' ? 4 : pattern.visual.options.length);
    assert.ok(difficulty === 'leicht' || [5, 6].includes(pattern.visual.options.length));

    const grid = createVisualTask('Raster-Logik', '13-17', difficulty, seededRandom(4));
    assert.equal(grid.visual.grid.length, 3);
    assert.equal(grid.visual.grid.flat().filter((cell) => cell === null).length, 1);
    assert.equal(grid.visual.features.length, difficulty === 'leicht' ? 1 : 2);
    assert.ok(difficulty === 'leicht' ? grid.visual.options.length === 4 : [5, 6].includes(grid.visual.options.length));

    const rotation = createVisualTask('Drehen & Denken', '18+', difficulty, seededRandom(5));
    assert.equal(rotation.visual.options.length, 4);
    assert.equal(rotation.visual.source.length, difficulty === 'leicht' ? 1 : 2);

    const comparison = createVisualTask('Visueller Vergleich', '8-12', difficulty, seededRandom(6));
    assert.equal(comparison.visual.left.length, difficulty === 'leicht' ? 6 : 8);
    assert.equal(comparison.answer.length, difficulty === 'leicht' ? 2 : 3);
  }
});

test('rejects invalid profiles and requires complete visual-comparison selections', () => {
  assert.throws(() => createVisualTask('Raster-Logik', '7-11', 'leicht'), TypeError);
  assert.throws(() => createVisualTask('Unbekannt', '18+', 'leicht'), TypeError);
  assert.throws(() => createVisualTask('Muster fortsetzen', '18+', 'mittel'), TypeError);

  const task = createVisualTask('Visueller Vergleich', '18+', 'leicht', seededRandom(7));
  assert.equal(isVisualAnswerCorrect(task, null, []), false);
  assert.equal(isVisualAnswerCorrect(task, null, [...task.answer, task.answer[0]]), false);
});

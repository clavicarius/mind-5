const SHAPES = {
  '8-12': [
    { name: 'Kreis', glyph: '●' },
    { name: 'Dreieck', glyph: '▲' },
    { name: 'Quadrat', glyph: '■' },
    { name: 'Raute', glyph: '◆' },
  ],
  '13-17': [
    { name: 'Kreis', glyph: '○' },
    { name: 'Dreieck', glyph: '△' },
    { name: 'Quadrat', glyph: '□' },
    { name: 'Fünfeck', glyph: '⬠' },
  ],
  '18+': [
    { name: 'Kreis', glyph: '◉' },
    { name: 'Dreieck', glyph: '◬' },
    { name: 'Raute', glyph: '⬥' },
    { name: 'Sechseck', glyph: '⬡' },
  ],
};
const FILLS = ['voll', 'gestreift', 'leer'];
const SIZES = ['klein', 'mittel', 'groß'];

function choose(items, random) {
  return items[Math.floor(random() * items.length)];
}

function shuffled(items, random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function modelKey(model) {
  return JSON.stringify(model);
}

function shapeModel(shape, fill = 'voll') {
  return { shape, fill };
}

function createPatternTask(ageGroup, difficulty, random) {
  const shapes = SHAPES[ageGroup].map(({ name }) => name);
  const hard = difficulty === 'anspruchsvoll';
  const shapeCycle = shuffled(shapes, random).slice(0, hard ? 2 : choose([2, 3], random));
  const fillCycle = hard ? shuffled(FILLS, random) : ['voll'];
  const sequenceLength = hard ? 7 : 5;
  const expected = Array.from({ length: sequenceLength }, (_, index) => (
    shapeModel(shapeCycle[index % shapeCycle.length], fillCycle[index % fillCycle.length])
  ));
  const optionPool = hard
    ? shapes.flatMap((shape) => FILLS.map((fill) => shapeModel(shape, fill)))
    : shapes.map((shape) => shapeModel(shape));
  const optionCount = hard ? choose([5, 6], random) : 4;
  const options = shuffled([
    expected.at(-1),
    ...shuffled(optionPool.filter((option) => modelKey(option) !== modelKey(expected.at(-1))), random)
      .slice(0, optionCount - 1),
  ], random);
  const answer = options.findIndex((option) => modelKey(option) === modelKey(expected.at(-1)));
  const rule = hard
    ? 'Form und Füllung wiederholen sich jeweils in festen Teilfolgen.'
    : `Die Formen wiederholen sich in einer Folge mit ${shapeCycle.length} Elementen.`;
  const task = {
    inputType: 'visual-choice',
    visualType: 'pattern',
    question: 'Welche Kachel setzt die Folge fort?',
    visual: {
      sequence: [...expected.slice(0, -1), null],
      options,
      rule: { shapeCycle, fillCycle },
    },
    options: options.map((_, index) => index),
    answer,
    hints: [
      'Achte darauf, welche Formen oder Muster sich wiederholen.',
      hard ? 'Prüfe Form und Füllung jeweils als eigene Teilfolge.' : rule,
    ],
    explanation: `Die Folge wird mit ${expected.at(-1).shape}${hard ? `, ${expected.at(-1).fill}` : ''} fortgesetzt. ${rule}`,
  };
  return task;
}

function latinGrid(values, rowShift, columnShift) {
  return Array.from({ length: 3 }, (_, row) => (
    Array.from({ length: 3 }, (_, column) => values[(row * rowShift + column * columnShift) % 3])
  ));
}

function gridModel(shape, fill) {
  return fill === undefined ? { shape } : { shape, fill };
}

function satisfiesGridFeature(grid, row, column, feature, value) {
  const allowedValues = new Set(grid.flat().map((cell) => cell?.[feature]).filter((item) => item !== undefined));
  if (!allowedValues.has(value)) return false;
  const rowValues = grid[row].map((cell, index) => index === column ? value : cell?.[feature]);
  const columnValues = grid.map((cells, index) => index === row ? value : cells[column]?.[feature]);
  return new Set(rowValues).size === 3 && new Set(columnValues).size === 3;
}

function createGridTask(ageGroup, difficulty, random) {
  const hard = difficulty === 'anspruchsvoll';
  const shapes = shuffled(SHAPES[ageGroup].map(({ name }) => name), random).slice(0, 3);
  const fills = hard ? shuffled(FILLS, random) : undefined;
  const grid = latinGrid(shapes, choose([1, 2], random), choose([1, 2], random))
    .map((row, rowIndex) => row.map((shape, columnIndex) => gridModel(
      shape,
      fills?.[(rowIndex * choose([1, 2], random) + columnIndex) % 3],
    )));
  if (hard) {
    const fillGrid = latinGrid(fills, choose([1, 2], random), choose([1, 2], random));
    grid.forEach((row, rowIndex) => row.forEach((cell, columnIndex) => {
      cell.fill = fillGrid[rowIndex][columnIndex];
    }));
  }
  const row = Math.floor(random() * 3);
  const column = Math.floor(random() * 3);
  const answer = grid[row][column];
  grid[row][column] = null;
  const optionsPool = hard
    ? shapes.flatMap((shape) => fills.map((fill) => gridModel(shape, fill)))
    : [...shapes, ...SHAPES[ageGroup].map(({ name }) => name).filter((shape) => !shapes.includes(shape)).slice(0, 1)]
      .map((shape) => gridModel(shape));
  const optionCount = hard ? choose([5, 6], random) : 4;
  const options = shuffled([
    answer,
    ...shuffled(optionsPool.filter((option) => modelKey(option) !== modelKey(answer)), random)
      .slice(0, optionCount - 1),
  ], random);
  const answerIndex = options.findIndex((option) => modelKey(option) === modelKey(answer));
  return {
    inputType: 'visual-choice',
    visualType: 'grid',
    question: 'Welche Kachel vervollständigt das Raster?',
    visual: { grid, options, missing: { row, column }, features: hard ? ['shape', 'fill'] : ['shape'] },
    options: options.map((_, index) => index),
    answer: answerIndex,
    hints: [
      'Vergleiche die Formen in der fehlenden Zeile und Spalte.',
      hard ? 'Prüfe Form und Füllung unabhängig voneinander.' : 'In jeder Zeile und Spalte kommt jede Form genau einmal vor.',
    ],
    explanation: `In Zeile ${row + 1} und Spalte ${column + 1} fehlen ${answer.shape}${hard ? ` und die Füllung „${answer.fill}“` : ''}.`,
  };
}

function rotateScene(scene, size, angle) {
  const turns = angle / 90;
  return scene.map((component) => ({
    cells: component.cells.map(([row, column]) => {
      let nextRow = row;
      let nextColumn = column;
      for (let turn = 0; turn < turns; turn += 1) {
        [nextRow, nextColumn] = [nextColumn, size - 1 - nextRow];
      }
      return [nextRow, nextColumn];
    }).sort(([rowA, columnA], [rowB, columnB]) => rowA - rowB || columnA - columnB),
  }));
}

function mirrorScene(scene, size) {
  return scene.map((component) => ({
    cells: component.cells.map(([row, column]) => [row, size - 1 - column])
      .sort(([rowA, columnA], [rowB, columnB]) => rowA - rowB || columnA - columnB),
  }));
}

function sceneKey(scene) {
  return JSON.stringify(scene.map(({ cells }) => cells).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))));
}

function createRotationTask(ageGroup, difficulty, random) {
  const hard = difficulty === 'anspruchsvoll';
  const ageIndex = ['8-12', '13-17', '18+'].indexOf(ageGroup);
  const size = (hard ? 6 : 5) + ageIndex;
  const easyShape = [
    [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2]],
    [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2], [3, 1]],
  ][ageIndex];
  const hardShape = [
    [[0, 0], [0, 1], [1, 1]],
    [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2]],
  ][ageIndex];
  const secondShape = [
    [[0, 0], [1, 0], [1, 1]],
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2]],
  ][ageIndex];
  const source = hard
    ? [
      { cells: hardShape },
      { cells: secondShape.map(([row, column]) => [row + 3, column + 3]) },
    ]
    : [{ cells: easyShape }];
  const angle = choose([90, 180, 270], random);
  const correct = rotateScene(source, size, angle);
  const options = shuffled([
    correct,
    ...[90, 180, 270].filter((otherAngle) => otherAngle !== angle)
      .map((otherAngle) => rotateScene(source, size, otherAngle)),
    mirrorScene(source, size),
  ], random);
  const answer = options.findIndex((option) => sceneKey(option) === sceneKey(correct));
  return {
    inputType: 'visual-choice',
    visualType: 'rotation',
    question: `Drehe die Vorlage um ${angle}° im Uhrzeigersinn.`,
    visual: { size, source, angle, options },
    options: options.map((_, index) => index),
    answer,
    hints: [
      'Drehe die gesamte Vorlage gemeinsam um ihren Mittelpunkt.',
      'Prüfe die Ausrichtung jeder Form und ihre Position im Raster.',
    ],
    explanation: `Die gesamte Vorlage wird um ${angle}° im Uhrzeigersinn gedreht. Die richtige Abbildung erhält Form und relative Anordnung.`,
  };
}

function compareItemKey(item) {
  return JSON.stringify(item);
}

function createComparisonTask(ageGroup, difficulty, random) {
  const hard = difficulty === 'anspruchsvoll';
  const count = hard ? 8 : 6;
  const shapeNames = SHAPES[ageGroup].map(({ name }) => name);
  const left = Array.from({ length: count }, (_, index) => ({
    shape: shapeNames[index % shapeNames.length],
    fill: FILLS[(index + Math.floor(random() * FILLS.length)) % FILLS.length],
    size: SIZES[index % SIZES.length],
  }));
  const changedPositions = shuffled(Array.from({ length: count }, (_, index) => index), random)
    .slice(0, hard ? 3 : 2)
    .sort((a, b) => a - b);
  const right = left.map((item) => ({ ...item }));
  changedPositions.forEach((position) => {
    const changed = { ...right[position] };
    const changeCount = hard ? choose([1, 2], random) : 1;
    const features = shuffled(['shape', 'fill', 'size'], random).slice(0, changeCount);
    features.forEach((feature) => {
      if (feature === 'shape') {
        changed.shape = choose(shapeNames.filter((shape) => shape !== changed.shape), random);
      } else if (feature === 'fill') {
        changed.fill = choose(FILLS.filter((fill) => fill !== changed.fill), random);
      } else {
        changed.size = choose(SIZES.filter((size) => size !== changed.size), random);
      }
    });
    right[position] = changed;
  });
  return {
    inputType: 'visual-comparison',
    visualType: 'comparison',
    question: 'Wähle links alle Positionen aus, an denen sich ein Gegenstand verändert hat.',
    visual: { left, right, changedPositions },
    options: [],
    answer: changedPositions,
    selectedPositions: [],
    hints: [
      'Vergleiche die Gegenstände an denselben Positionen.',
      'Achte auf Form, Muster und Größe; die Anordnung bleibt gleich.',
    ],
    explanation: changedPositions.map((position) => {
      const before = left[position];
      const after = right[position];
      const changes = ['shape', 'fill', 'size'].filter((feature) => before[feature] !== after[feature]);
      return `Position ${position + 1}: ${changes.map((feature) => ({
        shape: 'Form',
        fill: 'Muster',
        size: 'Größe',
      })[feature]).join(' und ')} geändert.`;
    }).join(' '),
  };
}

function validatePattern(task) {
  const { sequence, options, rule } = task.visual;
  const hard = task.difficulty === 'anspruchsvoll';
  const expectedLength = hard ? 7 : 5;
  if (sequence.length !== expectedLength || sequence.at(-1) !== null
    || sequence.slice(0, -1).some((item) => !item)
    || options.length !== (hard ? options.length : 4)
    || (hard && ![5, 6].includes(options.length))
    || new Set(options.map(modelKey)).size !== options.length) return false;
  const expected = shapeModel(
    rule.shapeCycle[(expectedLength - 1) % rule.shapeCycle.length],
    rule.fillCycle[(expectedLength - 1) % rule.fillCycle.length],
  );
  return sequence.slice(0, -1).every((item, index) => (
    modelKey(item) === modelKey(shapeModel(
      rule.shapeCycle[index % rule.shapeCycle.length],
      rule.fillCycle[index % rule.fillCycle.length],
    ))
  )) && modelKey(options[task.answer]) === modelKey(expected);
}

function validateGrid(task) {
  const { grid, options, missing, features } = task.visual;
  const hard = task.difficulty === 'anspruchsvoll';
  if (grid.length !== 3 || grid.some((row) => row.length !== 3)
    || grid.flat().filter((cell) => cell === null).length !== 1
    || grid[missing.row][missing.column] !== null
    || features.length !== (hard ? 2 : 1)
    || options.length !== (hard ? options.length : 4)
    || (hard && ![5, 6].includes(options.length))
    || new Set(options.map(modelKey)).size !== options.length) return false;
  for (const feature of features) {
    for (let index = 0; index < 3; index += 1) {
      const row = grid[index].map((cell) => cell?.[feature]).filter((value) => value !== undefined);
      const column = grid.map((cells) => cells[index]?.[feature]).filter((value) => value !== undefined);
      if (new Set(row).size !== row.length || new Set(column).size !== column.length) return false;
      const expected = new Set(grid.flat().map((cell) => cell?.[feature]).filter((value) => value !== undefined)).size;
      if (expected !== 3 || row.length !== 2 && index === missing.row || column.length !== 2 && index === missing.column) return false;
    }
  }
  const validOptions = options.filter((option) => features.every((feature) => (
    satisfiesGridFeature(grid, missing.row, missing.column, feature, option[feature])
  )));
  return validOptions.length === 1 && modelKey(validOptions[0]) === modelKey(options[task.answer]);
}

function validateRotation(task) {
  const { size, source, angle, options } = task.visual;
  const hard = task.difficulty === 'anspruchsvoll';
  const expected = rotateScene(source, size, angle);
  return [90, 180, 270].includes(angle)
    && source.length === (hard ? 2 : 1)
    && source.every(({ cells }) => cells.length >= (hard ? 3 : 3))
    && options.length === 4
    && new Set(options.map(sceneKey)).size === 4
    && options.filter((option) => sceneKey(option) === sceneKey(expected)).length === 1
    && sceneKey(options[task.answer]) === sceneKey(expected);
}

function validateComparison(task) {
  const { left, right, changedPositions } = task.visual;
  const hard = task.difficulty === 'anspruchsvoll';
  if (left.length !== (hard ? 8 : 6) || right.length !== left.length
    || changedPositions.length !== (hard ? 3 : 2)
    || new Set(changedPositions).size !== changedPositions.length
    || JSON.stringify([...changedPositions].sort((a, b) => a - b)) !== JSON.stringify(task.answer)) return false;
  const actualChanges = left.flatMap((item, index) => (
    compareItemKey(item) === compareItemKey(right[index]) ? [] : [index]
  ));
  if (JSON.stringify(actualChanges) !== JSON.stringify(changedPositions)) return false;
  return changedPositions.every((position) => {
    const differences = ['shape', 'fill', 'size'].filter((feature) => (
      left[position][feature] !== right[position][feature]
    ));
    return differences.length >= 1 && differences.length <= (hard ? 2 : 1);
  });
}

export function validateVisualTask(task) {
  if (!task?.visual || !task.difficulty) return false;
  if (task.visualType === 'pattern') return validatePattern(task);
  if (task.visualType === 'grid') return validateGrid(task);
  if (task.visualType === 'rotation') return validateRotation(task);
  if (task.visualType === 'comparison') return validateComparison(task);
  return false;
}

export function createVisualTask(mechanic, ageGroup, difficulty, random = Math.random) {
  if (!SHAPES[ageGroup] || !['leicht', 'anspruchsvoll'].includes(difficulty)) {
    throw new TypeError('Ungültige Altersgruppe oder Schwierigkeitsstufe.');
  }
  const task = mechanic === 'Muster fortsetzen'
    ? createPatternTask(ageGroup, difficulty, random)
    : mechanic === 'Raster-Logik'
      ? createGridTask(ageGroup, difficulty, random)
      : mechanic === 'Drehen & Denken'
        ? createRotationTask(ageGroup, difficulty, random)
        : mechanic === 'Visueller Vergleich'
          ? createComparisonTask(ageGroup, difficulty, random)
          : null;
  if (!task) throw new TypeError('Unbekannte visuelle Mechanik.');
  task.ageGroup = ageGroup;
  task.difficulty = difficulty;
  if (!validateVisualTask(task)) throw new TypeError('Die visuelle Aufgabe erfüllt ihr Profil nicht.');
  return task;
}

export function isVisualAnswerCorrect(task, selectedOption, selectedPositions = []) {
  if (task.inputType === 'visual-choice') return selectedOption === task.answer;
  if (task.inputType !== 'visual-comparison') return false;
  return selectedPositions.length === task.answer.length
    && new Set(selectedPositions).size === selectedPositions.length
    && task.answer.every((position) => selectedPositions.includes(position));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function renderToken(item, ageGroup) {
  const shape = SHAPES[ageGroup]?.find(({ name }) => name === item.shape);
  const glyph = shape?.glyph ?? '□';
  const sizeClass = item.size ? ` size-${escapeHtml(item.size)}` : '';
  return `<span class="shape-token fill-${escapeHtml(item.fill ?? 'voll')}${sizeClass}" aria-hidden="true">${glyph}</span>`;
}

function renderScene(scene, size, label) {
  const cells = scene.flatMap((component, componentIndex) => component.cells.map(([row, column]) => (
    `<rect class="scene-cell component-${componentIndex % 3}" x="${column}" y="${row}" width="0.88" height="0.88" rx="0.08"></rect>`
  ))).join('');
  return `<svg class="shape-canvas" viewBox="0 0 ${size} ${size}" role="img" aria-label="${escapeHtml(label)}">${cells}</svg>`;
}

function renderModel(model, visualType, ageGroup, label, size = null) {
  if (visualType === 'rotation') return renderScene(model, size, label);
  const token = renderToken(model, ageGroup);
  if (visualType === 'grid') return `<span class="grid-token" role="img" aria-label="${escapeHtml(label)}">${token}${model.fill ? `<small>${escapeHtml(model.fill)}</small>` : ''}</span>`;
  return `<span class="pattern-token" role="img" aria-label="${escapeHtml(label)}">${token}${model.fill && model.fill !== 'voll' ? `<small>${escapeHtml(model.fill)}</small>` : ''}</span>`;
}

export function renderVisualPrompt(task, selectedPositions = []) {
  const { visualType, visual } = task;
  if (visualType === 'pattern') {
    const sequence = visual.sequence.map((item, index) => item
      ? `<span class="visual-slot" role="listitem">${renderModel(item, visualType, task.ageGroup, `Position ${index + 1}: ${item.shape}, ${item.fill}`)}</span>`
      : '<span class="visual-slot missing-slot" role="listitem" aria-label="Fehlende Kachel">?</span>').join('');
    return `<div class="visual-sequence" role="list" aria-label="Musterfolge">${sequence}</div><div class="choices visual-choices" role="group" aria-label="Mögliche Fortsetzungen">${renderVisualOptions(task, task.selectedOption)}</div>`;
  }
  if (visualType === 'grid') {
    const rows = [0, 1, 2].map((row) => `<tr>${visual.grid[row].map((item) => item
      ? `<td>${renderModel(item, visualType, task.ageGroup, `${item.shape}${item.fill ? `, ${item.fill}` : ''}`)}</td>`
      : '<td class="missing-slot" aria-label="Fehlende Kachel">?</td>').join('')}</tr>`).join('');
    return `<table class="visual-grid" aria-label="Raster mit einer fehlenden Kachel"><tbody>${rows}</tbody></table><div class="choices visual-choices" role="group" aria-label="Mögliche Rasterkacheln">${renderVisualOptions(task, task.selectedOption)}</div>`;
  }
  if (visualType === 'rotation') {
    return `<div class="rotation-puzzle"><figure><figcaption>Vorlage</figcaption>${renderScene(visual.source, visual.size, 'Vorlage')}</figure><span aria-hidden="true" class="rotation-arrow">↻ ${visual.angle}°</span><div class="rotation-options">${renderVisualOptions(task, task.selectedOption, visual.size)}</div></div>`;
  }
  const renderItems = (items, side) => items.map((item, index) => {
    const selected = side === 'left' && selectedPositions.includes(index);
    const label = `Position ${index + 1}: ${item.shape}, ${item.fill}, ${item.size}`;
    const content = `${renderToken(item, task.ageGroup)}<small>${index + 1}: ${item.fill}, ${item.size}</small>`;
    return side === 'left'
      ? `<button class="compare-item" type="button" aria-label="${escapeHtml(label)}" aria-pressed="${selected}" data-compare-position="${index}">${content}</button>`
      : `<div class="compare-item" role="img" aria-label="${escapeHtml(label)}">${content}</div>`;
  }).join('');
  return `<div class="compare-panels"><section aria-label="Linke Abbildung, Antwortfläche"><h3>Links – wähle veränderte Positionen</h3><div class="compare-grid">${renderItems(visual.left, 'left')}</div></section><section aria-label="Rechte Abbildung"><h3>Rechts</h3><div class="compare-grid">${renderItems(visual.right, 'right')}</div></section></div>`;
}

export function renderVisualOptions(task, selectedOption = null, size = null) {
  return task.visual.options.map((option, index) => {
    const label = task.visualType === 'rotation'
      ? `Abbildung ${index + 1}`
      : `${option.shape}${option.fill ? `, ${option.fill}` : ''}`;
    return `<button class="choice visual-option" type="button" aria-label="${escapeHtml(label)}" aria-pressed="${selectedOption === index}" data-visual-option="${index}">${renderModel(option, task.visualType, task.ageGroup, label, size)}<span>${escapeHtml(label)}</span></button>`;
  }).join('');
}

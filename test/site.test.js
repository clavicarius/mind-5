const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const projectRoot = path.resolve(__dirname, '..');
const html = readFileSync(path.join(projectRoot, 'index.html'), 'utf8');

test('landing page has its primary content and accessible landmarks', () => {
  assert.match(html, /<html\b[^>]*\blang="de"/i);
  assert.match(html, /<title>Mind 5\b[^<]*<\/title>/i);
  assert.match(html, /<main\b[^>]*>[\s\S]*?<h1\b[^>]*>[\s\S]*?<\/h1>[\s\S]*?<\/main>/i);
  assert.match(html, /<nav\b[^>]*\baria-label="[^"]+"/i);
});

test('landing page logo has alternative text and a local image asset', () => {
  const image = html.match(/<img\b[^>]*>/i)?.[0];

  assert.ok(image, 'expected an image with a source and alternative text');
  const source = image.match(/\bsrc="([^"]+)"/i)?.[1];
  const alternativeText = image.match(/\balt="([^"]*)"/i)?.[1];

  assert.ok(alternativeText?.trim(), 'expected non-empty alternative text');
  assert.ok(source, 'expected an image source');
  assert.doesNotMatch(source, /^(?:[a-z]+:|\/)/i, 'expected a relative local image path');
  assert.ok(existsSync(path.resolve(projectRoot, source)), `image not found: ${source}`);
});

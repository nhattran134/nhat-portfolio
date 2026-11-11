// Run: node --experimental-strip-types --test src/data/content.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { byDate } from './content.ts';

test('byDate sorts newest first', () => {
  const items = [{ data: { date: '2026-01-01' } }, { data: { date: '2026-11-01' } }];
  assert.equal(items.sort(byDate)[0].data.date, '2026-11-01');
});

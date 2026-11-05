import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveTheme } from '../src/lib/theme.mjs';

test('resolveTheme honors stored preference over system preference', () => {
  assert.equal(resolveTheme('light', true), 'light');
  assert.equal(resolveTheme('dark', false), 'dark');
});

test('resolveTheme falls back to system preference when no stored value', () => {
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme(null, false), 'light');
});

test('resolveTheme treats invalid stored value as fallback to system preference', () => {
  assert.equal(resolveTheme('invalid', true), 'dark');
  assert.equal(resolveTheme(undefined, false), 'light');
});

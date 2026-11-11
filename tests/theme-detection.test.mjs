import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import { resolveTheme, THEME_INIT_SCRIPT } from '../src/lib/theme.mjs';

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

test('THEME_INIT_SCRIPT matches resolveTheme across stored and invalid states', () => {
  const cases = [
    [null, true, true],
    [null, false, false],
    ['dark', false, true],
    ['light', true, false],
    ['invalid', true, true],
    ['invalid', false, false],
  ];

  for (const [stored, prefersDark, expectedDark] of cases) {
    const classes = new Set(expectedDark ? [] : ['dark']);
    const context = {
      localStorage: { getItem: () => stored },
      window: { matchMedia: () => ({ matches: prefersDark }) },
      document: {
        documentElement: {
          classList: {
            add: (c) => classes.add(c),
            remove: (c) => classes.delete(c),
          },
        },
      },
    };
    vm.runInNewContext(THEME_INIT_SCRIPT, context);
    assert.equal(classes.has('dark'), expectedDark);
  }
});

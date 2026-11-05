/**
 * Resolves theme based on stored value and system preference.
 * @param {string|null|undefined} storedTheme - 'dark' | 'light' | null | undefined
 * @param {boolean} systemPrefersDark - boolean
 * @returns {'dark' | 'light'}
 */
export function resolveTheme(storedTheme, systemPrefersDark) {
  if (storedTheme === 'dark') return 'dark';
  if (storedTheme === 'light') return 'light';
  return systemPrefersDark ? 'dark' : 'light';
}

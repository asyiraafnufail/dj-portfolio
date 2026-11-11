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

export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('cankz_theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s!=='light'&&p)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`;


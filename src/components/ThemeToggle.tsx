'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

function subscribeTheme(callback: () => void) {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'cankz_theme') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const nextDark = e.newValue === 'dark' || (e.newValue !== 'light' && systemDark);
      document.documentElement.classList.toggle('dark', nextDark);
      callback();
    }
  };

  window.addEventListener('cankz-theme-change', callback);
  window.addEventListener('storage', handleStorage);
  return () => {
    window.removeEventListener('cankz-theme-change', callback);
    window.removeEventListener('storage', handleStorage);
  };
}

function getThemeSnapshot(): boolean | null {
  return document.documentElement.classList.contains('dark');
}

function getThemeServerSnapshot(): boolean | null {
  return null;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const isDark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextDark);
    try {
      localStorage.setItem('cankz_theme', nextDark ? 'dark' : 'light');
    } catch {}
    window.dispatchEvent(new Event('cankz-theme-change'));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark === false ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isDark === false ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`relative inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition-all duration-200 hover:border-amber-500 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-amber-400/40 dark:hover:text-amber-300 dark:focus:ring-amber-400/40 ${className}`}
    >
      {isDark === null ? (
        <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5 opacity-60" />
      ) : isDark ? (
        <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-amber-300 transition-transform duration-200 rotate-0 hover:rotate-12" />
      ) : (
        <Moon className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-amber-600 transition-transform duration-200 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    const updateFromDOM = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    updateFromDOM();
    window.addEventListener('cankz-theme-change', updateFromDOM);
    return () => window.removeEventListener('cankz-theme-change', updateFromDOM);
  }, []);

  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains('dark');
    if (nextDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('cankz_theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('cankz_theme', 'light');
      } catch {}
    }
    setIsDark(nextDark);
    window.dispatchEvent(new Event('cankz-theme-change'));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition-all duration-200 hover:border-amber-500 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-amber-400/40 dark:hover:text-amber-300 dark:focus:ring-amber-400/40 ${className}`}
    >
      {!mounted ? (
        <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5 opacity-60" />
      ) : isDark ? (
        <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-amber-300 transition-transform duration-200 rotate-0 hover:rotate-12" />
      ) : (
        <Moon className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-amber-600 transition-transform duration-200 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, KeyRound, Lock, Mail } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';
import ThemeToggle from '@/src/components/ThemeToggle';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message || 'Failed to sign in. Check your email & password.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-stone-50 px-4 py-12 text-stone-900 transition-colors duration-200 dark:bg-slate-950 dark:text-white">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <ThemeToggle />
      </div>

      <div className="glass-panel w-full max-w-sm rounded-2xl border border-stone-200/90 bg-white/90 p-6 sm:p-8 shadow-sm dark:border-amber-400/25 dark:bg-slate-900/60 dark:shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-stone-200 bg-stone-100 text-amber-600 dark:border-white/10 dark:bg-slate-950/80 dark:text-amber-200">
            <Lock className="h-6 w-6 text-amber-600 dark:text-amber-300" />
          </div>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
            CANKZ Admin
          </span>
          <h1 className="mt-2 text-xl font-extrabold tracking-tight text-stone-900 sm:text-2xl dark:text-white">
            Control Panel Login
          </h1>
          <p className="mt-1 text-xs text-stone-500 dark:text-slate-400">
            Sign in to update tracks, venues, and media links.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs font-medium text-red-600 dark:text-red-300">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-700 dark:text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-9 pr-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 dark:border-white/10 dark:bg-slate-950/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-amber-400/60 dark:focus:ring-amber-400/40"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-9 pr-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 dark:border-white/10 dark:bg-slate-950/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-amber-400/60 dark:focus:ring-amber-400/40"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-amber-400 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 shadow-md transition hover:bg-amber-300 hover:shadow-amber-400/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 border-t border-stone-200 pt-4 text-center dark:border-white/5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 transition hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

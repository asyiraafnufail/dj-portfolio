import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EditedSongs from '@/src/components/EditedSongs';
import ThemeToggle from '@/src/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'All Edited Songs | CANKZ',
  description: 'Complete catalogue of custom edits, club bootlegs, and genre flips by CANKZ.',
};

export default function SongsPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 transition-colors duration-200 dark:bg-slate-950 dark:text-white">
      {/* Subpage Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="pt-6 sm:pt-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/#edited-songs"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-700 shadow-sm transition hover:border-amber-500 hover:text-amber-600 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300 dark:shadow-none dark:hover:border-amber-400/30 dark:hover:text-amber-200"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                Back to Home
              </Link>
              <div className="hidden sm:flex items-center gap-2 text-xs text-stone-400 dark:text-slate-500">
                <Link href="/" className="hover:text-stone-700 dark:hover:text-slate-300 transition">
                  Home
                </Link>
                <span className="text-stone-300 dark:text-slate-700">/</span>
                <span className="font-semibold text-amber-700 dark:text-amber-200/90">Edited Songs</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Songs Section */}
      <EditedSongs isPage={true} />

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 text-center text-xs text-stone-500 dark:border-white/10 dark:text-slate-500">
        <p>© 2026 CANKZ. All rights reserved.</p>
      </footer>
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EditedSongs from '@/src/components/EditedSongs';

export const metadata: Metadata = {
  title: 'All Edited Songs | CANKZ',
  description: 'Complete catalogue of custom edits, club bootlegs, and genre flips by CANKZ.',
};

export default function SongsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Back to Home Button (Option 2 - Static at top) */}
      <div className="pt-6 sm:pt-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#edited-songs"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-300 transition hover:border-amber-400/30 hover:text-amber-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-amber-300" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Songs Section */}
      <EditedSongs isPage={true} />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500">
        <p>© 2026 CANKZ. All rights reserved.</p>
      </footer>
    </main>
  );
}

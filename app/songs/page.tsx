import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import EditedSongs from '@/src/components/EditedSongs';
import logoDj from '@/aset/logodj.png';

export const metadata: Metadata = {
  title: 'All Edited Songs | CANKZ',
  description: 'Complete catalogue of custom edits, club bootlegs, and genre flips by CANKZ.',
};

export default function SongsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 py-3.5 shadow-lg backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-amber-400/30 bg-slate-900">
              <Image
                src={logoDj}
                alt="Logo CANKZ"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
            <span className="text-lg font-extrabold tracking-[0.18em] text-white">CANKZ</span>
          </Link>
          <Link
            href="/#edited-songs"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:border-amber-400/30 hover:text-amber-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-amber-300" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Songs Section */}
      <EditedSongs isPage={true} />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500">
        <p>© 2026 CANKZ. All rights reserved.</p>
      </footer>
    </main>
  );
}

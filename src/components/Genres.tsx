'use client';

import { Activity, CircleDot, Disc, Radio, Waves, Zap } from 'lucide-react';

interface Genre {
  id: string;
  title: string;
  tone: string;
  icon: typeof Disc;
}

const genres: Genre[] = [
  { id: 'commercial-edm', title: 'Commercial EDM', tone: 'border-amber-400/25', icon: Zap },
  { id: 'hip-hop', title: 'Hip-Hop', tone: 'border-stone-400/25', icon: Disc },
  { id: 'r-and-b', title: 'R&B', tone: 'border-slate-400/25', icon: Radio },
  { id: 'amapiano', title: 'Amapiano', tone: 'border-amber-400/25', icon: CircleDot },
  { id: 'afrobeats', title: 'Afrobeats', tone: 'border-stone-400/25', icon: Waves },
  { id: 'afro-house', title: 'Afro House', tone: 'border-amber-400/25', icon: Disc },
  { id: 'miami-bass', title: 'Miami Bass', tone: 'border-slate-400/25', icon: Zap },
  { id: 'jersey-club', title: 'Jersey Club', tone: 'border-stone-400/25', icon: CircleDot },
  { id: 'gqom', title: 'Gqom', tone: 'border-amber-400/25', icon: Waves },
  { id: 'indo-bounce', title: 'Indo Bounce', tone: 'border-slate-400/25', icon: Disc },
  { id: 'breakbeat', title: 'Breakbeat', tone: 'border-stone-400/25', icon: Radio },
  { id: 'bassline-bounce', title: 'Bassline Bounce', tone: 'border-amber-400/25', icon: Zap },
];

export default function Genres() {
  return (
    <section id="genres" className="relative overflow-hidden bg-slate-950 pt-10 sm:pt-14 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 sm:mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
            <Activity className="h-3.5 w-3.5" /> Sonic Identity
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Sound Signature &amp; Genres
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-slate-400 sm:text-lg">
            Clean genre range for club sets, private events, coffee shop gigs, and dance floor transitions.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {genres.map((genre) => {
            const Icon = genre.icon;
            return (
              <div
                key={genre.id}
                className={`glass-panel group flex flex-col items-center justify-center text-center rounded-2xl border ${genre.tone} bg-slate-900/40 p-4 sm:p-5 transition duration-300 hover:-translate-y-1 hover:border-amber-400/35 hover:shadow-xl`}
              >
                <div className="mb-2.5 sm:mb-3 flex items-center justify-center rounded-xl border border-white/10 bg-slate-950/80 p-2 sm:p-2.5 text-amber-200 transition group-hover:text-amber-100">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white transition group-hover:text-amber-100">
                  {genre.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

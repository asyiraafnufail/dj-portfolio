'use client';

import { motion } from 'framer-motion';
import { Activity, CircleDot, Disc, Radio, Waves, Zap } from 'lucide-react';

interface Genre {
  id: string;
  title: string;
  description: string;
  tone: string;
  icon: typeof Disc;
}

const genres: Genre[] = [
  { id: 'commercial-edm', title: 'Commercial EDM', description: 'Mainstage anthems & festival-ready drops', tone: 'border-amber-400/25', icon: Zap },
  { id: 'hip-hop', title: 'Hip-Hop', description: 'Classic boom-bap to modern trap heat', tone: 'border-stone-400/25', icon: Disc },
  { id: 'r-and-b', title: 'R&B', description: 'Smooth grooves & vocal-driven vibes', tone: 'border-slate-400/25', icon: Radio },
  { id: 'amapiano', title: 'Amapiano', description: 'Log drums & soulful SA house sound', tone: 'border-amber-400/25', icon: CircleDot },
  { id: 'afrobeats', title: 'Afrobeats', description: 'West African pop fusion & percussion', tone: 'border-stone-400/25', icon: Waves },
  { id: 'afro-house', title: 'Afro House', description: 'Deep tribal rhythms meets 4/4 pulse', tone: 'border-amber-400/25', icon: Disc },
  { id: 'miami-bass', title: 'Miami Bass', description: '808-heavy low-end & uptempo bounce', tone: 'border-slate-400/25', icon: Zap },
  { id: 'jersey-club', title: 'Jersey Club', description: 'Chopped vocals & frantic 130-140 BPM', tone: 'border-stone-400/25', icon: CircleDot },
  { id: 'gqom', title: 'Gqom', description: 'Raw Durban sound: minimal, dark, driving', tone: 'border-amber-400/25', icon: Waves },
  { id: 'indo-bounce', title: 'Indo Bounce', description: 'Local flavor: dangdut samples & club energy', tone: 'border-slate-400/25', icon: Disc },
  { id: 'breakbeat', title: 'Breakbeat', description: 'Broken rhythms, syncopated drums & bass', tone: 'border-stone-400/25', icon: Radio },
  { id: 'bassline-bounce', title: 'Bassline Bounce', description: 'UK 4x4 speed garage & wobble bass', tone: 'border-amber-400/25', icon: Zap },
];

export default function Genres() {
  return (
    <section id="genres" className="relative overflow-hidden bg-slate-950 py-16 sm:py-24">
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-stone-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 sm:mb-16 max-w-3xl text-center">
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

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {genres.map((genre, index) => {
            const Icon = genre.icon;
            return (
              <motion.div
                key={genre.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.035 }}
                className={`glass-panel group flex h-full flex-col justify-between rounded-2xl border ${genre.tone} bg-slate-900/40 p-3.5 sm:p-4 transition duration-300 hover:-translate-y-1 hover:border-amber-400/35 hover:shadow-xl`}
              >
                <div>
                  <div className="mb-3 sm:mb-4 w-fit rounded-xl border border-white/10 bg-slate-950/80 p-2 sm:p-2.5 text-amber-200 transition group-hover:text-amber-100">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white transition group-hover:text-amber-100">
                    {genre.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {genre.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

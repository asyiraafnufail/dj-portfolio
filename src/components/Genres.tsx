'use client';

import { useEffect, useState } from 'react';
import { Activity, CircleDot, Disc, Radio, Waves, Zap } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';

interface Genre {
  id: string;
  title: string;
  tone: string;
  icon: typeof Disc;
}

const iconMap: Record<string, typeof Disc> = {
  Zap,
  Disc,
  Radio,
  CircleDot,
  Waves,
};

const defaultGenres: Genre[] = [
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
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('genres')
          .select('*')
          .order('sort_order', { ascending: true });

        if (data && data.length > 0) {
          setGenreList(
            data.map((d) => ({
              id: d.id,
              title: d.title,
              tone: d.tone || 'border-amber-400/25',
              icon: iconMap[d.icon] || Disc,
            }))
          );
        } else {
          setGenreList(defaultGenres);
        }
      } catch {
        setGenreList(defaultGenres);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <section id="genres" className="relative overflow-hidden bg-stone-50 pt-10 sm:pt-14 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16 dark:bg-slate-950">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 sm:mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 dark:border-amber-400/25 dark:bg-slate-900/80 dark:text-amber-200">
            <Activity className="h-3.5 w-3.5" /> Sonic Identity
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl dark:text-white">
            Sound Signature &amp; Genres
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-stone-600 sm:text-lg dark:text-slate-400">
            Clean genre range for club sets, private events, coffee shop gigs, and dance floor transitions.
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-2 gap-3 sm:gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`genre-skel-${idx}`}
                className="glass-panel rounded-2xl border border-stone-200 bg-white/70 p-2.5 sm:p-3.5 animate-pulse flex flex-col items-center justify-center text-center dark:border-white/5 dark:bg-slate-900/40"
              >
                <div className="mb-1.5 sm:mb-2 h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-stone-200 dark:bg-white/5" />
                <div className="h-3.5 sm:h-4 w-20 sm:w-28 rounded bg-stone-200 dark:bg-white/5" />
              </div>
            ))
          ) : (
            genreList.map((genre) => {
              const Icon = genre.icon;
              return (
                <div
                  key={genre.id}
                  className="glass-panel group flex flex-col items-center justify-center text-center rounded-2xl border border-stone-200/90 bg-white/90 p-2.5 sm:p-3.5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-md dark:border-white/5 dark:bg-slate-900/40 dark:shadow-none dark:hover:border-amber-400/35 dark:hover:shadow-xl"
                >
                  <div className="mb-1.5 sm:mb-2 flex items-center justify-center rounded-xl border border-stone-200 bg-stone-100 p-1.5 sm:p-2 text-amber-600 transition group-hover:text-amber-700 dark:border-white/10 dark:bg-slate-950/80 dark:text-amber-200 dark:group-hover:text-amber-100">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900 transition group-hover:text-amber-700 dark:text-white dark:group-hover:text-amber-100">
                    {genre.title}
                  </h3>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

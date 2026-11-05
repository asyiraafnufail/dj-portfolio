'use client';

import { useEffect, useState } from 'react';
import { CircleDot, Coffee, Dumbbell, Flame, MapPin, Martini, Wine } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';

interface Venue {
  id: string;
  name: string;
  city: string;
  tone: string;
  icon: typeof Coffee;
}

const iconMap: Record<string, typeof Coffee> = {
  Wine,
  Martini,
  Coffee,
  CircleDot,
  Dumbbell,
};

const defaultVenues: Venue[] = [
  {
    id: '1',
    name: 'Peggasus',
    city: 'Yogyakarta',
    tone: 'border-amber-400/25',
    icon: Wine,
  },
  {
    id: '2',
    name: '23 White House',
    city: 'Yogyakarta',
    tone: 'border-stone-400/25',
    icon: Martini,
  },
  {
    id: '3',
    name: 'Five Seven',
    city: 'Yogyakarta',
    tone: 'border-slate-400/25',
    icon: Coffee,
  },
  {
    id: '4',
    name: 'The Gardens',
    city: 'Yogyakarta',
    tone: 'border-amber-400/25',
    icon: CircleDot,
  },
  {
    id: '5',
    name: 'Maison Favor',
    city: 'Yogyakarta',
    tone: 'border-stone-400/25',
    icon: Coffee,
  },
  {
    id: '6',
    name: 'Tons Good',
    city: 'Yogyakarta',
    tone: 'border-slate-400/25',
    icon: Coffee,
  },
  {
    id: '7',
    name: 'Gaskara',
    city: 'Yogyakarta',
    tone: 'border-slate-400/25',
    icon: Coffee,
  },
  {
    id: '8',
    name: '31 Bloc',
    city: 'Yogyakarta',
    tone: 'border-slate-400/25',
    icon: Coffee,
  },
  {
    id: '9',
    name: 'Cobar',
    city: 'Yogyakarta',
    tone: 'border-slate-400/25',
    icon: Coffee,
  },
  {
    id: '10',
    name: 'Flexzone GYM',
    city: 'Klaten',
    tone: 'border-slate-400/25',
    icon: Dumbbell,
  },
];

export default function Experience() {
  const [venueList, setVenueList] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('venues')
          .select('*')
          .order('sort_order', { ascending: true });

        if (data && data.length > 0) {
          setVenueList(
            data.map((d) => ({
              id: d.id,
              name: d.name,
              city: d.city,
              tone: d.tone || 'border-slate-400/25',
              icon: iconMap[d.icon] || Coffee,
            }))
          );
        } else {
          setVenueList(defaultVenues);
        }
      } catch {
        setVenueList(defaultVenues);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return (
    <section id="experience" className="relative overflow-hidden bg-stone-50 pt-10 sm:pt-14 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16 dark:bg-slate-950">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 sm:mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 dark:border-amber-400/25 dark:bg-slate-900/80 dark:text-amber-200">
            <Flame className="h-3.5 w-3.5" /> Gigs &amp; Experiences
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl dark:text-white">
            Which venues have I played at?
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-stone-600 sm:text-lg dark:text-slate-400">
            Coffee shop residencies, club nights, private events, weddings, corporate events &amp; rooftop parties across Sleman &amp; Yogyakarta — steady vibe, clean curation.
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-2 gap-3 sm:gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`venue-skel-${idx}`}
                className="glass-panel rounded-2xl border border-stone-200 bg-white/70 p-3 sm:p-4 animate-pulse flex flex-col justify-center dark:border-white/5 dark:bg-slate-900/40"
              >
                <div className="mb-2 sm:mb-2.5 flex items-center justify-between">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-stone-200 dark:bg-white/5" />
                  <div className="h-3 w-14 rounded bg-stone-200 dark:bg-white/5" />
                </div>
                <div className="h-4 sm:h-5 w-24 sm:w-32 rounded bg-stone-200 dark:bg-white/5" />
              </div>
            ))
          ) : (
            venueList.map((venue) => {
              const Icon = venue.icon;
              return (
                <div
                  key={venue.id}
                  className="glass-panel group flex flex-col justify-center rounded-2xl border border-stone-200/90 bg-white/90 p-3 sm:p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-md dark:border-white/5 dark:bg-slate-900/40 dark:shadow-none dark:hover:border-amber-400/35 dark:hover:shadow-xl"
                >
                  <div>
                    <div className="mb-2 sm:mb-2.5 flex items-center justify-between">
                      <div className="w-fit rounded-xl border border-stone-200 bg-stone-100 p-1.5 sm:p-2 text-amber-600 transition group-hover:text-amber-700 dark:border-white/10 dark:bg-slate-950/80 dark:text-amber-200 dark:group-hover:text-amber-100">
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </div>
                      <span className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-stone-500 dark:text-slate-400">
                        <MapPin className="h-3 w-3 text-amber-600 dark:text-amber-300/80" />
                        {venue.city}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 transition group-hover:text-amber-700 dark:text-white dark:group-hover:text-amber-100">
                      {venue.name}
                    </h3>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

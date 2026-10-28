'use client';

import { CircleDot, Coffee, Dumbbell, Flame, MapPin, Martini, Wine } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  city: string;
  tone: string;
  icon: typeof Coffee;
}

const venues: Venue[] = [
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
  return (
    <section id="experience" className="relative overflow-hidden bg-slate-950 pt-10 sm:pt-14 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 sm:mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
            <Flame className="h-3.5 w-3.5" /> Gigs &amp; Experiences
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Which venues have i played at?
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-slate-400 sm:text-lg">
            Coffee shop residencies, club nights, private events, weddings, corporate events &amp; rooftop parties across Sleman &amp; Yogyakarta — steady vibe, clean curation.
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-2 gap-3 sm:gap-5">
          {venues.map((venue) => {
            const Icon = venue.icon;
            return (
              <div
                key={venue.id}
                className={`glass-panel group flex flex-col rounded-2xl border ${venue.tone} bg-slate-900/40 p-4 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-400/35 hover:shadow-xl`}
              >
                <div>
                  <div className="mb-3 sm:mb-4 flex items-center justify-between">
                    <div className="w-fit rounded-xl border border-white/10 bg-slate-950/80 p-2 sm:p-2.5 text-amber-200 transition group-hover:text-amber-100">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-slate-400">
                      <MapPin className="h-3 w-3 text-amber-300/80" />
                      {venue.city}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white transition group-hover:text-amber-100">
                    {venue.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

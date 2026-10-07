'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  image: string;
}

const venues: Venue[] = [
  {
    id: '1',
    name: 'Kopi Kulo',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Seniman Coffee',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'The Loft Club',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Private Events & Weddings',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Corporate & Brand Events',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Rooftop Parties',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-slate-950 py-16 sm:py-24">
      <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-amber-400/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 sm:mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
            <Flame className="h-3.5 w-3.5" /> Regular Gigs &amp; Residencies
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Where I Play Regularly
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-slate-400 sm:text-lg">
            Coffee shop residencies, club nights, private events, weddings, corporate events &amp; rooftop parties across Sleman &amp; Yogyakarta — steady vibe, clean curation.
          </p>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-7 pb-4 pt-1 sm:-mx-6 sm:px-10 md:mx-0 md:px-0 md:pb-0 md:pt-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible no-scrollbar scroll-smooth">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-panel group relative flex h-[300px] sm:h-[320px] lg:h-[360px] w-[76vw] max-w-[320px] shrink-0 snap-center sm:w-[320px] md:w-auto md:max-w-none md:shrink flex-col justify-end overflow-hidden rounded-2xl transition duration-300 hover:border-amber-400/35 hover:shadow-xl"
            >
              <Image
                src={venue.image}
                alt={venue.name}
                fill
                sizes="(max-width: 640px) 76vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

              <div className="relative z-10 p-5 sm:p-6 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-white transition group-hover:text-amber-100">
                  {venue.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 md:hidden text-slate-500 text-xs">
          <span>Geser untuk melihat venue</span>
          <span>&rarr;</span>
        </div>
      </div>
    </section>
  );
}

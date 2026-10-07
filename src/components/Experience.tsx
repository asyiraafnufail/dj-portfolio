'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, Flame, MapPin } from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  event: string;
  city: string;
  country: string;
  image: string;
  tag: string;
}

const venues: Venue[] = [
  {
    id: '1',
    name: 'Kopi Kulo',
    event: 'Weekend Resident DJ',
    city: 'Sleman',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
    tag: 'Coffee Shop Residency',
  },
  {
    id: '2',
    name: 'Seniman Coffee',
    event: 'Saturday Chill Sessions',
    city: 'Yogyakarta',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop',
    tag: 'Coffee Shop Gig',
  },
  {
    id: '3',
    name: 'The Loft Club',
    event: 'Saturday Night Resident',
    city: 'Yogyakarta',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop',
    tag: 'Club Residency',
  },
  {
    id: '4',
    name: 'Private Events & Weddings',
    event: 'Custom Curated Sets',
    city: 'Yogyakarta & Sleman',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
    tag: 'Private Booking',
  },
  {
    id: '5',
    name: 'Corporate & Brand Events',
    event: 'Product Launch / Afterparty',
    city: 'Yogyakarta',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800&auto=format&fit=crop',
    tag: 'Corporate Event',
  },
  {
    id: '6',
    name: 'Rooftop Parties',
    event: 'Open-Air Sunset Sessions',
    city: 'Sleman',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    tag: 'Rooftop Party',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-slate-950 py-24">
      <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-amber-400/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
            <Flame className="h-3.5 w-3.5" /> Regular Gigs & Residencies
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Where I Play Regularly
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            Coffee shop residencies, club nights, private events, weddings, corporate events & rooftop parties across Sleman & Yogyakarta — steady vibe, clean curation.
          </p>
        </div>

        <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="glass-panel group relative flex h-[380px] min-w-[85vw] snap-center flex-col justify-end overflow-hidden rounded-2xl transition duration-300 hover:border-amber-400/35 hover:shadow-xl sm:min-w-[320px] md:min-w-0"
            >
              <Image
                src={venue.image}
                alt={`${venue.name} - ${venue.city}`}
                fill
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent" />

              <div className="absolute left-4 top-4 z-10">
                <span className="rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200 backdrop-blur-md">
                  {venue.tag}
                </span>
              </div>

              <div className="relative z-10 space-y-2 p-6">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-200">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{venue.city}, {venue.country}</span>
                </div>
                <h3 className="text-2xl font-bold text-white transition group-hover:text-amber-100">
                  {venue.name}
                </h3>
                <p className="flex items-center gap-1 text-xs font-medium text-slate-300">
                  <Building2 className="h-3.5 w-3.5 text-slate-300" />
                  {venue.event}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Headphones } from 'lucide-react';

interface Mixtape {
  id: string;
  title: string;
  soundcloudUrl: string;
  border: string;
}

const mixtapes: Mixtape[] = [
  {
    id: '1',
    title: 'CANKZ SESSIONS #042 - Tech House & Afro Grooves (Live from Bali)',
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1758832035&color=%23fbbf24&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    border: 'border-amber-400/25',
  },
  {
    id: '2',
    title: 'CANKZ - Midnight Melodic Techno Session',
    soundcloudUrl:
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1628392011&color=%23fbbf24&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    border: 'border-stone-400/25',
  },
];

export default function SoundCloudPlayer() {
  return (
    <section id="mixtapes" className="relative overflow-hidden bg-slate-950 py-16 sm:py-24">
      <div className="absolute left-10 top-1/4 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-slate-700/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 sm:mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
            <Headphones className="h-3.5 w-3.5" /> Live Sets &amp; Podcasts
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Latest Mixtapes &amp; Sets
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-slate-400 sm:text-lg">
            Listen directly on SoundCloud. Stream live recordings and club sets.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {mixtapes.map((mixtape) => (
            <div
              key={mixtape.id}
              className={`glass-panel flex flex-col justify-between space-y-4 rounded-3xl border ${mixtape.border} p-5 sm:p-6 transition hover:border-amber-400/35 hover:shadow-xl`}
            >
              <h3 className="line-clamp-2 text-base sm:text-lg font-bold text-white">
                {mixtape.title}
              </h3>

              <div className="min-h-[166px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg">
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={mixtape.soundcloudUrl}
                  className="w-full rounded-2xl"
                  title={mixtape.title}
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-2 text-xs text-slate-400">
                <span className="font-medium text-amber-200">Available for Stream &amp; Download</span>
                <a
                  href="https://soundcloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-amber-200"
                >
                  Open in SoundCloud &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
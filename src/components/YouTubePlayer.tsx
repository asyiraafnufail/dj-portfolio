'use client';

import { Youtube } from 'lucide-react';

interface Mixtape {
  id: string;
  title: string;
  embedUrl: string;
  youtubeUrl: string;
  border: string;
}

const mixtapes: Mixtape[] = [
  {
    id: '1',
    title: 'CANKZ - 2016 VIBES',
    embedUrl: 'https://www.youtube.com/embed/CWrGE1BF-do',
    youtubeUrl: 'https://youtu.be/CWrGE1BF-do?si=ZHoiYlz3_DCcWfo_',
    border: 'border-amber-400/25',
  },
  {
    id: '2',
    title: 'CANKZ - INDOBOUNCE Mixtape',
    embedUrl: 'https://www.youtube.com/embed/UshDWwMbQPo',
    youtubeUrl: 'https://youtu.be/UshDWwMbQPo?si=9NI75xO6G9rsIpKc',
    border: 'border-stone-400/25',
  },
];

export default function YouTubePlayer() {
  return (
    <section id="mixtapes" className="relative overflow-hidden bg-slate-950 pt-10 sm:pt-14 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 sm:mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
            <Youtube className="h-3.5 w-3.5 text-red-500" /> YouTube Mixtapes &amp; Sets
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Latest Mixtapes &amp; Sets
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-slate-400 sm:text-lg">
            Watch live recordings and club sets directly on YouTube.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-2">
          {mixtapes.map((mixtape) => (
            <div
              key={mixtape.id}
              className={`glass-panel flex flex-col justify-between space-y-4 rounded-2xl border ${mixtape.border} p-5 sm:p-6 transition hover:border-amber-400/35 hover:shadow-xl`}
            >
              <h3 className="line-clamp-2 text-base sm:text-lg font-bold text-white">
                {mixtape.title}
              </h3>

              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={mixtape.embedUrl}
                  title={mixtape.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-2 text-xs text-slate-400">
                <span className="font-medium text-amber-200">Available on YouTube</span>
                <a
                  href={mixtape.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-white underline underline-offset-4 hover:text-amber-200"
                >
                  <Youtube className="h-4 w-4 text-red-500" />
                  Watch on YouTube &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
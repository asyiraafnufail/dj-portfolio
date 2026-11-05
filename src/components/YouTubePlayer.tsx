'use client';

import { useEffect, useState } from 'react';
import { Youtube } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';

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
  const [mixtapeList, setMixtapeList] = useState<Mixtape[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMixtapes = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('mixtapes')
          .select('*')
          .order('sort_order', { ascending: true });

        if (data && data.length > 0) {
          setMixtapeList(
            data.map((d) => ({
              id: d.id,
              title: d.title,
              embedUrl: d.embed_url,
              youtubeUrl: d.youtube_url,
              border: d.border || 'border-amber-400/25',
            }))
          );
        } else {
          setMixtapeList(mixtapes);
        }
      } catch {
        setMixtapeList(mixtapes);
      } finally {
        setLoading(false);
      }
    };

    fetchMixtapes();
  }, []);

  return (
    <section id="mixtapes" className="relative overflow-hidden bg-stone-50 pt-10 sm:pt-14 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16 dark:bg-slate-950">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 sm:mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 dark:border-amber-400/25 dark:bg-slate-900/80 dark:text-amber-200">
            <Youtube className="h-3.5 w-3.5 text-red-500" /> YouTube Mixtapes &amp; Sets
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl dark:text-white">
            Latest Mixtapes &amp; Sets
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-stone-600 sm:text-lg dark:text-slate-400">
            Watch live recordings and club sets directly on YouTube.
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-2">
          {loading ? (
            Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={`mixtape-skel-${idx}`}
                className="glass-panel flex flex-col justify-between space-y-4 rounded-2xl border border-stone-200 bg-white/70 p-5 sm:p-6 animate-pulse dark:border-white/5 dark:bg-slate-900/40"
              >
                <div className="h-6 w-3/4 rounded-md bg-stone-200 dark:bg-white/10" />
                <div className="relative aspect-video w-full rounded-xl border border-stone-200 bg-stone-100 flex items-center justify-center dark:border-white/5 dark:bg-slate-950/80">
                  <Youtube className="h-10 w-10 text-stone-300 dark:text-white/10" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="h-3 w-28 rounded-md bg-stone-200 dark:bg-white/5" />
                  <div className="h-3 w-24 rounded-md bg-stone-200 dark:bg-white/10" />
                </div>
              </div>
            ))
          ) : (
            mixtapeList.map((mixtape) => (
              <div
                key={mixtape.id}
                className="glass-panel flex flex-col justify-between space-y-4 rounded-2xl border border-stone-200/90 bg-white/90 p-5 sm:p-6 shadow-sm transition hover:border-amber-500 hover:shadow-md dark:border-white/10 dark:bg-slate-900/40 dark:shadow-none dark:hover:border-amber-400/35 dark:hover:shadow-xl"
              >
                <h3 className="line-clamp-2 text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                  {mixtape.title}
                </h3>

                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-md dark:border-white/10 dark:bg-slate-900">
                  <iframe
                    width="100%"
                    height="100%"
                    src={mixtape.embedUrl}
                    title={mixtape.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full rounded-xl"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-2 text-xs text-stone-500 dark:text-slate-400">
                  <span className="font-semibold text-amber-700 dark:font-medium dark:text-amber-200">Available on YouTube</span>
                  <a
                    href={mixtape.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-stone-900 underline underline-offset-4 hover:text-amber-600 dark:text-white dark:hover:text-amber-200"
                  >
                    <Youtube className="h-4 w-4 text-red-500" />
                    Watch on YouTube &rarr;
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Play, User } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';

export default function HeroAbout() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // 1. Baca cache client-side secara asinkron agar tidak memicu cascading render
    queueMicrotask(() => {
      try {
        const cached = localStorage.getItem('cankz_hero_image');
        if (cached) {
          setHeroImage(cached);
          setLoading(false);
        }
      } catch {
        // Storage unavailable
      }
    });

    // 2. Fetch data terbaru dari Supabase
    const fetchHero = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('site_settings')
          .select('hero_image_url')
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('[HeroAbout] Supabase fetch error:', error);
          return;
        }
        if (data?.hero_image_url) {
          setHeroImage(data.hero_image_url);
          try {
            localStorage.setItem('cankz_hero_image', data.hero_image_url);
          } catch {
            // Storage unavailable
          }
        } else if (data?.hero_image_url === '') {
          setHeroImage(null);
          try {
            localStorage.removeItem('cankz_hero_image');
          } catch {
            // Storage unavailable
          }
        }
      } catch {
        // Network or client error
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  return (
    <section
      id="hero-about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-50 pb-16 pt-24 sm:pt-28 lg:py-32 scroll-mt-0 dark:bg-slate-950"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="order-1 flex justify-center"
          >
            <div className="relative aspect-[4/5] w-full max-w-xs sm:max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white p-1 shadow-xl transition-transform duration-500 hover:scale-[1.01] dark:border-white/10 dark:bg-slate-900 dark:shadow-2xl">
              <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-stone-100 dark:bg-slate-900">
                {/* Skeleton Loader: aktif selama fetch data DB ATAU foto belum selesai diunduh browser */}
                {(!imageLoaded) && (
                  <div className="absolute inset-0 z-10 bg-stone-100/95 animate-pulse flex flex-col items-center justify-center gap-3 dark:bg-slate-950/90">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-300/40 bg-stone-200/50 text-amber-600/40 dark:border-white/5 dark:bg-white/5 dark:text-amber-200/30">
                      <User className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-medium text-stone-500 dark:text-slate-500">Loading Profile...</span>
                  </div>
                )}

                {heroImage ? (
                  <>
                    <Image
                      key={heroImage}
                      src={heroImage}
                      alt="DJ CANKZ (Rafa) - DJ & Music Producer Yogyakarta"
                      fill
                      priority
                      loading="eager"
                      unoptimized
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 500px"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => {
                        setHeroImage(null);
                        setImageLoaded(true);
                      }}
                      className={`object-cover object-center transition-all duration-700 hover:scale-105 ${
                        imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-[5]" />
                  </>
                ) : !loading ? (
                  <div className="relative h-full w-full bg-stone-100 flex flex-col items-center justify-center gap-3 p-6 text-center dark:bg-slate-950">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-400 dark:border-white/10 dark:bg-slate-900 dark:text-slate-600">
                      <User className="h-7 w-7" />
                    </div>
                    <p className="text-xs text-stone-500 dark:text-slate-400">
                      Profile photo not configured yet in admin panel.
                    </p>
                  </div>
                ) : null}

                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-black/60 backdrop-blur-md p-3.5 sm:p-4 text-center sm:text-left z-10 shadow-md">
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-amber-300">Based in</p>
                  <p className="text-xs sm:text-sm font-bold text-white">Sleman, Yogyakarta</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="order-2 flex flex-col space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start">
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 dark:border-amber-400/25 dark:bg-slate-900/80 dark:text-amber-200">
                DJ Portofolio
              </span>
            </div>

            <div>
              <h1 className="text-4xl font-extrabold leading-none tracking-[0.1em] text-stone-900 sm:text-6xl lg:text-7xl dark:text-white">
                CANKZ
              </h1>
              <h2 className="mt-2.5 sm:mt-3 text-base font-medium text-stone-600 sm:text-xl dark:text-slate-300">
                Sleman, Yogyakarta
              </h2>
            </div>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-lg lg:mx-0 dark:text-slate-300">
              CANKZ crafts focused electronic sets with clean transitions, warm groove, and steady stage energy.
              Blending house, melodic techno, and selected club tracks — ready for clubs, private events/parties,
              coffee shop gigs, rooftop sessions, corporate events &amp; weddings. Each performance built for a polished
              experience without losing crowd connection.
            </p>

            <div className="flex flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
              <a
                href="#mixtapes"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-400 px-6 py-3.5 sm:px-8 sm:py-4 text-sm font-bold uppercase tracking-widest text-slate-950 shadow-md transition hover:bg-amber-300 sm:w-auto"
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                Listen Mixtapes
              </a>
              <a
                href="#contact"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-stone-300 bg-white px-6 py-3.5 sm:px-8 sm:py-4 text-sm font-bold uppercase tracking-widest text-stone-800 shadow-sm transition hover:border-amber-500 hover:bg-stone-50 sm:w-auto dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-amber-400/40 dark:hover:bg-slate-800"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-300" />
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

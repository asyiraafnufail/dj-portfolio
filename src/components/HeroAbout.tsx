'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Play } from 'lucide-react';
import photoPorto from '../../aset/fotoporto.jpeg';

export default function HeroAbout() {
  return (
    <section
      id="hero-about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 pb-16 pt-28 lg:py-32"
    >
      <div className="absolute left-10 top-1/4 h-72 w-72 rounded-full bg-amber-400/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-slate-700/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="order-1 flex justify-center"
          >
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 p-1 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-slate-900">
                <Image
                  src={photoPorto}
                  alt="Foto portfolio CANKZ"
                  fill
                  preload
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <div className="glass-panel absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-200">Based in</p>
                  <p className="text-sm font-bold text-white">Sleman, Yogyakarta</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="order-2 flex flex-col space-y-6 text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start">
              <span className="rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
                DJ Portofolio
              </span>
            </div>

            <div>
              <h1 className="text-5xl font-extrabold leading-none tracking-[0.12em] text-white sm:text-6xl lg:text-7xl">
                CANKZ
              </h1>
              <h2 className="mt-3 text-lg font-medium text-slate-300 sm:text-xl">
                Sleman, Yogyakarta
              </h2>
            </div>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">
              CANKZ crafts focused electronic sets with clean transitions, warm groove, and steady stage energy.
              Blending house, melodic techno, and selected club tracks — ready for clubs, private events/parties,
              coffee shop gigs, rooftop sessions, corporate events & weddings. Each performance built for a polished
              experience without losing crowd connection.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
              <a
                href="#mixtapes"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-widest text-slate-950 shadow-lg transition hover:bg-amber-300 sm:w-auto"
              >
                <Play className="h-5 w-5" />
                Listen Mixtapes
              </a>
              <a
                href="#contact"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-8 py-4 text-sm font-bold uppercase tracking-widest text-slate-100 shadow-sm transition hover:border-amber-400/40 hover:bg-slate-800 sm:w-auto"
              >
                <Mail className="h-5 w-5 text-amber-300" />
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

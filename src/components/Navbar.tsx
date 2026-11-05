'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Menu, X } from 'lucide-react';
import logoDj from '../../aset/logodj.png';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'About', href: '#hero-about' },
  { name: 'Genres', href: '#genres' },
  { name: 'Experience', href: '#experience' },
  { name: 'Gallery', href: '#stage-archive' },
  { name: 'Mixtapes', href: '#mixtapes' },
  { name: 'Edits', href: '#edited-songs' },
  { name: 'Assets', href: '#assets-file' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPast = window.scrollY > 20;
      setScrolled((prev) => (prev !== isPast ? isPast : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hash restoration when navigating back from subpages (/songs, /gallery)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    } else {
      window.location.href = '/' + href;
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-stone-200/80 bg-stone-50/85 py-3 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-slate-950/85'
          : 'border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="#hero-about"
            onClick={(e) => handleNavClick(e, '#hero-about')}
            className="flex shrink-0 items-center gap-3"
          >
            <div className="relative flex h-10 w-10 shrink-0 aspect-square items-center justify-center overflow-hidden rounded-full border border-amber-400/30 bg-slate-900 shadow-sm">
              <Image
                src={logoDj}
                alt="Logo CANKZ"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <span className="shrink-0 text-xl font-extrabold tracking-[0.18em] text-stone-900 dark:text-white">CANKZ</span>
          </a>

          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-stone-700 transition hover:text-amber-600 dark:text-slate-300 dark:hover:text-amber-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-950 shadow-sm transition hover:bg-amber-300 inline-flex"
            >
              <Calendar className="h-4 w-4" />
              Book Event
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg border border-stone-200 bg-white p-2 text-stone-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-b border-stone-200/80 bg-stone-50/95 px-4 pb-6 pt-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 md:hidden">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block rounded-xl px-3 py-3 text-base font-semibold text-stone-800 transition hover:bg-stone-200/60 hover:text-amber-600 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-amber-200"
              >
                {link.name}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-300 shadow-sm"
          >
            <Calendar className="h-4 w-4" />
            Book Event
          </a>
        </div>
      )}
    </header>
  );
}

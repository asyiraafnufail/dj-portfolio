'use client';

import { useEffect, useState } from 'react';
import { Calendar, Disc, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#hero-about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Genres', href: '#genres' },
  { name: 'Mixtapes', href: '#mixtapes' },
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-slate-950/85 py-3 shadow-lg backdrop-blur-md'
          : 'border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="#hero-about"
            onClick={(e) => handleNavClick(e, '#hero-about')}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/30 bg-slate-900 text-amber-300">
              <Disc className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-[0.18em] text-white">CANKZ</span>
          </a>

          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-300 transition hover:text-amber-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-950 transition hover:bg-amber-300 md:inline-flex"
          >
            <Calendar className="h-4 w-4" />
            Book Event
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg border border-white/10 bg-slate-900 p-2 text-slate-200 md:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-b border-white/10 bg-slate-950/95 px-4 pb-6 pt-4 backdrop-blur-xl md:hidden">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-200 transition hover:bg-white/5 hover:text-amber-200"
              >
                {link.name}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-300"
          >
            <Calendar className="h-4 w-4" />
            Book Event
          </a>
        </div>
      )}
    </header>
  );
}

'use client';

import { Mail, MapPin, MessageCircle, Youtube } from 'lucide-react';

const socials = [
  { name: 'Instagram', href: 'https://instagram.com', label: '@cankz' },
  { name: 'SoundCloud', href: 'https://soundcloud.com', label: 'CANKZ' },
  { name: 'Spotify', href: 'https://spotify.com', label: 'Artist Profile' },
  { name: 'TikTok', href: 'https://tiktok.com', label: '@cankz' },
  { name: 'YouTube', href: 'https://youtube.com', label: 'Live Sets' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 py-16 sm:py-24">
      <div className="absolute left-0 top-10 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-slate-700/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 sm:mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
            <MessageCircle className="h-3.5 w-3.5" /> Booking Desk
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Get In Touch &amp; Booking
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-slate-400 sm:text-lg">
            Clubs, private events/parties, coffee shop gigs, rooftop sessions, corporate events &amp; weddings. Direct contact below — response within 24 hours.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="glass-panel rounded-3xl border border-white/10 p-5 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">Direct Contact</h3>
            <div className="mt-6 space-y-3.5 sm:space-y-4">
              <a
                href="https://wa.me/6281234567890?text=Hi%20CANKZ%2C%20I%20want%20to%20book%20an%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-amber-400/25 bg-slate-900/70 p-3.5 sm:p-4 text-amber-200 transition hover:border-amber-300 hover:shadow-md"
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">WhatsApp Booking</span>
                  <span className="text-xs sm:text-sm text-amber-200/90 break-all">+62 812 3456 7890</span>
                </span>
              </a>

              <a
                href="mailto:booking@cankz.com"
                className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-amber-400/25 bg-slate-900/70 p-3.5 sm:p-4 text-amber-200 transition hover:border-amber-300 hover:shadow-md"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">Email Booking</span>
                  <span className="text-xs sm:text-sm text-amber-200/90 break-all">booking@cankz.com</span>
                </span>
              </a>

              <div className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-3.5 sm:p-4 text-slate-300">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-amber-200" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">Based In</span>
                  <span className="text-xs sm:text-sm">Sleman, Yogyakarta — available worldwide</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 glass-panel rounded-3xl border border-white/10 p-5 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">Social Media</h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm transition hover:border-amber-400/35 hover:bg-slate-900 hover:text-amber-200"
                >
                  <span className="font-bold text-white">{social.name}</span>
                  <span className="text-slate-400 text-xs sm:text-sm">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-12 sm:mt-16 border-t border-white/10 pt-8 text-center text-xs sm:text-sm text-slate-500">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-300">
            <Youtube className="h-4 w-4 text-amber-200" /> CANKZ
          </div>
          <p className="mt-2">© 2026 CANKZ. Designed for clean club nights and focused dance floors.</p>
        </footer>
      </div>
    </section>
  );
}
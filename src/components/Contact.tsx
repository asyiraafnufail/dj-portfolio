'use client';

import { useEffect, useState } from 'react';
import { Mail, MapPin, MessageCircle, Send, Youtube } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';

const socials = [
  { name: 'Instagram', href: 'https://instagram.com/rafacankz', label: '@rafacankz' },
  { name: 'SoundCloud', href: 'https://soundcloud.com/cankz-685282173?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', label: 'CANKZ' },
  { name: 'TikTok', href: 'https://tiktok.com/@rafanuf', label: '@rafanuf' },
  { name: 'YouTube', href: 'https://youtube.com/@rafacankz?si=iylGlp16BNvfYxqo', label: 'CANKZ' },
];

export default function Contact() {
  const [settings, setSettings] = useState({
    whatsapp_number: '628174957733',
    whatsapp_message: 'Hi CANKZ, I want to book an event.',
    booking_email: 'contactcankz@gmail.com',
    location: 'Sleman, Yogyakarta',
  });

  const [form, setForm] = useState({
    name: '',
    eventDate: '',
    venue: '',
    notes: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('site_settings')
          .select('whatsapp_number, whatsapp_message, booking_email, location')
          .limit(1)
          .maybeSingle();

        if (data) {
          setSettings((prev) => ({
            whatsapp_number: data.whatsapp_number || prev.whatsapp_number,
            whatsapp_message: data.whatsapp_message || prev.whatsapp_message,
            booking_email: data.booking_email || prev.booking_email,
            location: data.location || prev.location,
          }));
        }
      } catch {
        // Fallback to defaults
      }
    };

    fetchSettings();
  }, []);

  const cleanWaNumber = settings.whatsapp_number.replace(/\D/g, '');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = form.name.trim()
      ? `Hi DJ CANKZ, I'm ${form.name.trim()}. Inquiring about performance booking for:\n` +
        `- Event Date: ${form.eventDate || '-'}\n` +
        `- Venue / Location: ${form.venue || '-'}\n` +
        (form.notes ? `- Notes: ${form.notes}\n` : '') +
        `Please share your availability and technical rider. Thank you!`
      : settings.whatsapp_message;

    const url = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const defaultWaUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(settings.whatsapp_message)}`;
  const displayWaNumber = settings.whatsapp_number.startsWith('+')
    ? settings.whatsapp_number
    : `+${settings.whatsapp_number}`;

  return (
    <section id="contact" className="relative overflow-hidden bg-stone-50 pt-10 sm:pt-14 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16 dark:bg-slate-950">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 sm:mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 dark:border-amber-400/25 dark:bg-slate-900/80 dark:text-amber-200">
            <MessageCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" /> Booking Desk
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl dark:text-white">
            Get In Touch &amp; Booking
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-stone-600 sm:text-lg dark:text-slate-400">
            Clubs, private events/parties, coffee shop gigs, rooftop sessions, corporate events &amp; weddings. Direct contact below — response within 24 hours.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          {/* Quick Booking Inquiry Form */}
          <div className="glass-panel rounded-3xl border border-stone-200/90 bg-white/90 p-5 sm:p-8 shadow-sm dark:border-amber-400/25 dark:bg-slate-900/60 dark:shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2 dark:text-white">
              <MessageCircle className="h-5 w-5 text-amber-600 dark:text-amber-300" />
              Quick Booking Inquiry
            </h3>
            <p className="mt-1 text-xs text-stone-500 dark:text-slate-400">
              Fill in your event details below to automatically generate a structured booking message on WhatsApp.
            </p>

            <form onSubmit={handleBookingSubmit} className="mt-5 space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5 dark:text-slate-300">
                    Organizer / Event Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Peggasus Club / Sarah"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 dark:border-white/10 dark:bg-slate-950/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-amber-400/50 dark:focus:ring-0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5 dark:text-slate-300">
                    Planned Event Date
                  </label>
                  <input
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                    className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 dark:border-white/10 dark:bg-slate-950/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-amber-400/50 dark:focus:ring-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5 dark:text-slate-300">
                  Venue / Event Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Yogyakarta / Rooftop Session / Private Club"
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 dark:border-white/10 dark:bg-slate-950/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-amber-400/50 dark:focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5 dark:text-slate-300">
                  Additional Notes (Set Duration / Genre Preference)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 2-hour set, Commercial EDM & Bass House..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 resize-none dark:border-white/10 dark:bg-slate-950/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-amber-400/50 dark:focus:ring-0"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-stone-500 dark:text-slate-400">
                  Pre-formatted message will open directly in your WhatsApp.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-300 transition shadow-md"
                >
                  <Send className="h-4 w-4" />
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>

          <div className="glass-panel rounded-3xl border border-stone-200/90 bg-white/90 p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 text-center sm:text-left dark:text-white">Direct Contact</h3>
            <div className="mt-6 space-y-3.5 sm:space-y-4">
              <a
                href={defaultWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-3.5 sm:p-4 text-amber-700 transition hover:border-amber-500 hover:bg-white hover:shadow-sm dark:border-amber-400/25 dark:bg-slate-900/70 dark:text-amber-200 dark:hover:border-amber-300 dark:hover:bg-slate-900/70 dark:hover:shadow-md"
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-amber-600 dark:text-amber-200" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-stone-900 dark:text-white">WhatsApp Booking</span>
                  <span className="text-xs sm:text-sm text-amber-700 dark:text-amber-200/90 break-all">{displayWaNumber}</span>
                </span>
              </a>

              <a
                href={`mailto:${settings.booking_email}`}
                className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-3.5 sm:p-4 text-amber-700 transition hover:border-amber-500 hover:bg-white hover:shadow-sm dark:border-amber-400/25 dark:bg-slate-900/70 dark:text-amber-200 dark:hover:border-amber-300 dark:hover:bg-slate-900/70 dark:hover:shadow-md"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-amber-600 dark:text-amber-200" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-stone-900 dark:text-white">Email Booking</span>
                  <span className="text-xs sm:text-sm text-amber-700 dark:text-amber-200/90 break-all">{settings.booking_email}</span>
                </span>
              </a>

              <div className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-3.5 sm:p-4 text-stone-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-amber-600 dark:text-amber-200" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-stone-900 dark:text-white">Based In</span>
                  <span className="text-xs sm:text-sm text-stone-600 dark:text-slate-300">{settings.location}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl border border-stone-200/90 bg-white/90 p-5 sm:p-8 shadow-sm dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 text-center sm:text-left dark:text-white">Social Media</h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition hover:border-amber-500 hover:bg-white hover:text-amber-700 dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-amber-400/35 dark:hover:bg-slate-900 dark:hover:text-amber-200"
                >
                  <span className="font-bold text-stone-900 dark:text-white">{social.name}</span>
                  <span className="text-stone-500 text-xs sm:text-sm dark:text-slate-400">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-12 sm:mt-16 border-t border-stone-200 pt-8 text-center text-xs sm:text-sm text-stone-500 dark:border-white/10 dark:text-slate-500">
          <div className="flex items-center justify-center gap-2 font-bold text-stone-800 dark:text-slate-300">
            <Youtube className="h-4 w-4 text-red-500" /> CANKZ
          </div>
          <p className="mt-2">© 2026 CANKZ. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
}
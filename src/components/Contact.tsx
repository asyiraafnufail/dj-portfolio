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
      ? `Halo DJ CANKZ, saya ${form.name.trim()}. Ingin booking performance untuk:\n` +
        `- Tanggal Event: ${form.eventDate || '-'}\n` +
        `- Venue / Lokasi: ${form.venue || '-'}\n` +
        (form.notes ? `- Catatan: ${form.notes}\n` : '') +
        `Mohon info ketersediaan tanggal & riders. Terima kasih!`
      : settings.whatsapp_message;

    const url = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const defaultWaUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(settings.whatsapp_message)}`;
  const displayWaNumber = settings.whatsapp_number.startsWith('+')
    ? settings.whatsapp_number
    : `+${settings.whatsapp_number}`;

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 pt-10 sm:pt-14 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 sm:mb-8 max-w-3xl text-center">
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

        <div className="mx-auto max-w-3xl space-y-6">
          {/* Quick Booking Inquiry Form */}
          <div className="glass-panel rounded-3xl border border-amber-400/25 bg-slate-900/60 p-5 sm:p-8 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-amber-300" />
              Quick Booking Inquiry
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Isi detail acara Anda di bawah ini untuk langsung generate format pesan WhatsApp resmi CANKZ.
            </p>

            <form onSubmit={handleBookingSubmit} className="mt-5 space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Nama Penyelenggara / Event
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Peggasus Club / Sarah"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Rencana Tanggal Event
                  </label>
                  <input
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Venue / Lokasi Acara
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Yogyakarta / Rooftop Session / Private Party"
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Catatan Tambahan (Durasi Set / Preferensi Genre)
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: 2 jam set, Commercial EDM & Bass House..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  Pesan terstruktur otomatis terbuka di WhatsApp Anda.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-300 transition shadow-md"
                >
                  <Send className="h-4 w-4" />
                  Kirim via WhatsApp
                </button>
              </div>
            </form>
          </div>

          <div className="glass-panel rounded-3xl border border-white/10 p-5 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">Direct Contact</h3>
            <div className="mt-6 space-y-3.5 sm:space-y-4">
              <a
                href={defaultWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-amber-400/25 bg-slate-900/70 p-3.5 sm:p-4 text-amber-200 transition hover:border-amber-300 hover:shadow-md"
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">WhatsApp Booking</span>
                  <span className="text-xs sm:text-sm text-amber-200/90 break-all">{displayWaNumber}</span>
                </span>
              </a>

              <a
                href={`mailto:${settings.booking_email}`}
                className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-amber-400/25 bg-slate-900/70 p-3.5 sm:p-4 text-amber-200 transition hover:border-amber-300 hover:shadow-md"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">Email Booking</span>
                  <span className="text-xs sm:text-sm text-amber-200/90 break-all">{settings.booking_email}</span>
                </span>
              </a>

              <div className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-3.5 sm:p-4 text-slate-300">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-amber-200" />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">Based In</span>
                  <span className="text-xs sm:text-sm">{settings.location}</span>
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
          <p className="mt-2">© 2026 CANKZ. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
}
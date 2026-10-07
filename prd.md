# DJ Portfolio Website - AI Agent Master Prompt & Layout Guide

## 1. Executive Summary & Objective
Buat website landing page *Single Page Application* (SPA) portofolio DJ CANKZ yang modern, responsif (Desktop & Mobile), interaktif, simple, dan elegant. Website ini harus memakai estetika visual tema gelap yang rapi, kalem, profesional, dan tidak norak, dengan tata letak spesifik sesuai urutan sections di bawah ini.

---

## 2. Tech Stack & Setup Guidelines
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Dark Mode, Elegant Amber Accents, Glassmorphism ringan)
- **Icons:** `lucide-react`
- **Animations:** `framer-motion`
- **Media Integrations:** SoundCloud iFrame Embed, Next.js `<Image />` component.

---

## 3. UI/UX & Responsive Layout Requirements

### **Prinsip Responsivitas:**
- **Mobile First & Responsive:** Layout harus otomatis menyesuaikan dari tampilan layar HP (`< 768px`) hingga Desktop (`>= 1024px`).
- **Warna & Tema Terkunci:** Background gelap (`bg-slate-950` / `bg-slate-900`), teks terang (`text-white`, `text-slate-300`, `text-slate-400`), aksen utama amber kalem (`bg-amber-400`, `text-amber-200`, `text-amber-300`, `border-amber-400/25`). Hindari warna neon mencolok seperti cyan terang, magenta, pink, purple glow, gradient ramai, efek bling, emoji, atau visual yang terasa generatif/AI.
- **Design Lock:** Konsep visual wajib simple elegant: gelap, bersih, profesional, whitespace cukup, radius lembut, border tipis, glassmorphism ringan, shadow halus. Jangan menambah efek berlebihan, animasi heboh, badge bouncing, ping indicator, atau glow kuat.
- **Brand Lock:** Semua nama panggung, metadata, copy, footer, social label, dan pesan booking wajib memakai nama **CANKZ**. Jangan memakai nama placeholder lain seperti DJ Vortex, Alex, atau nama buatan baru.
- **Lokasi Lock:** Lokasi utama artis wajib **Sleman, Yogyakarta**.
- **Foto Hero Lock:** Foto hero utama wajib memakai aset lokal `aset/fotoporto.jpeg`. Jangan ganti dengan Unsplash/placeholder kecuali user eksplisit meminta.

---

## 4. Sequential Section Breakdown & Layout Specifications

### **SECTION 1: HERO & ABOUT (Side-by-Side di Desktop, Stacked di Mobile)**
*Urutan komponen paling atas.*

- **Desktop Layout (`lg:flex-row` / `lg:grid-cols-2`):**
  - **Sisi Kiri:** 1 Foto Formal DJ dari aset lokal `aset/fotoporto.jpeg` (rasio aspek 4:5 atau 1:1) dengan border tipis dan shadow halus. Jangan gunakan neon glow kuat.
  - **Sisi Kanan:** 
    1. Nama Panggung: **CANKZ** (Typography besar, bold, white text, tanpa gradient ramai).
    2. Lokasi / Subtitle: **Sleman, Yogyakarta** (Subtitle sedang).
    3. Teks *About Me* (Deskripsi biografi singkat, latar belakang musik, dan dedikasi di panggung).
    4. Call to Action (CTA) buttons: "Book Event" & "Listen Mixtapes".
- **Mobile Layout (`flex-col`):**
  - Foto Formal di bagian paling atas (center/full-width).
  - Nama Panggung, Nama Panggilan, dan *About Me* menyusun secara vertikal di bawah foto.

---

### **SECTION 2: EXPERIENCE / PERFORMANCE VENUES**
*Scroll ke bawah dari Hero/About.*

- **Fitur & Konten:**
  - Header: *"Where I've Played"* atau *"Gig Experience"*.
  - Sub-header: Daftar klub, festival, dan venue yang pernah diisi.
- **Tampilan Grid:**
  - **Desktop:** Grid 3 atau 4 kolom (`md:grid-cols-2 lg:grid-cols-3` atau `4`).
  - **Mobile:** Carousel horisontal swipable atau Grid 1 kolom.
- **Setiap Card Venue Berisi:**
  - Foto Venue/Klub saat acara (background card).
  - Overlay gradient gelap agar teks terbaca.
  - Nama Tempat / Nama Event / Kota (misal: *Club Dragonfly - Jakarta*, *DDP Festival - Bali*).

---

### **SECTION 3: GENRES & SOUND SIGNATURE**
*Scroll ke bawah dari Experience.*

- **Fitur & Konten:**
  - Header: *"Music Genres"* atau *"Sound Signature"*.
  - Tampilan visual badge / card daftar genre musik yang dimainkan. Genre terkunci: *Commercial EDM, Hip-Hop, R&B, Amapiano, Afrobeats, Afro House, Miami Bass, Jersey Club, Gqom, Indo Bounce, Breakbeat, Bassline Bounce, UK Garage (UKG)*.
  - Koreksi otomatis penulisan genre/subgenre agar mengikuti ejaan umum industri musik (contoh: `komersial edm` → `Commercial EDM`, `hip hop` → `Hip-Hop`, `rnb` → `R&B`, `afrohouse` → `Afro House`, `ukg` → `UK Garage (UKG)`).
- **Tampilan:**
  - Card interaktif dengan hover halus (border amber lembut / shadow ringan), bukan neon glow.
  - Jangan tampilkan BPM atau Crowd Energy. Genre cukup berupa card/badge singkat berisi nama genre/subgenre. Jangan gunakan bouncing badge, ping indicator, emoji, atau animasi mencolok.

---

### **SECTION 4: SOUNDCLOUD MIXTAPE PLAYER**
*Scroll ke bawah dari Genre.*

- **Fitur & Konten:**
  - Header: *"Latest Mixtapes & Sets"*.
  - Sub-header: *"Listen directly on SoundCloud"*.
- **Tampilan Integrasi:**
  - Menyediakan *container* responsif untuk menampung **SoundCloud Embed Player** (iFrame).
  - **Desktop:** Player lebar penuh (full-width) atau grid 2 player bersisian.
  - **Mobile:** Player bertumpuk vertikal dengan lebar 100% mengikuti lebar layar HP.

---

### **SECTION 5: CONTACT & BOOKING**
*Section paling bawah (Footer & Form).*

- **Fitur & Konten:**
  - Header: *"Get In Touch & Booking"*.
  - **Sisi Kiri / Atas:** Form Kontak Interaktif (Nama, Email, Tanggal Event, Jenis Venue, Pesan).
  - **Sisi Kanan / Bawah:** Informasi Kontak Direct & Social Media:
    - Tombol Direct WhatsApp.
    - Email Booking.
    - Link Ikon Sosial Media: Instagram, SoundCloud, Spotify, TikTok, YouTube.

---

## 5. Instructions for the AI Agent

Saat mengeksekusi kode berdasarkan dokumen ini, AI Agent harus mematuhi aturan berikut:

1. **State Management:**
   - Gunakan directive `'use client';` untuk komponen yang membutuhkan interaktivitas (mobile menu, form handling, SoundCloud embed player).
2. **Component Separation:**
   - Pisahkan setiap section ke dalam folder `src/components/` (misal: `HeroAbout.jsx`, `Experience.jsx`, `Genres.jsx`, `SoundCloudPlayer.jsx`, `Contact.jsx`).
3. **Responsive Utilities:**
   - Gunakan Tailwind breakpoint `sm:`, `md:`, `lg:`, `xl:` untuk memastikan tampilan mobile (`<768px`) dan desktop (`>=1024px`) sesuai dengan spesifikasi di atas.
4. **Media:**
   - Hero wajib memakai aset lokal `aset/fotoporto.jpeg`.
   - Foto venue boleh memakai Unsplash resolusi tinggi kategori *Nightclub* atau *Festival* selama tetap selaras dengan tema gelap elegant.
5. **SoundCloud Integration:**
   - Sertakan URL SoundCloud iFrame embed standar agar pemutar musik langsung berfungsi secara visual.
6. **Single Source of Truth:**
   - Mulai sekarang semua perubahan desain, copy, layout, warna, brand, dan media harus mengacu pada `prd.md` ini.
   - Jika user meminta perubahan yang berpotensi melanggar Design Lock, jelaskan konflik singkat lalu minta konfirmasi sebelum mengubah.
   - Jangan memperkenalkan nama, warna, efek, atau komponen baru yang tidak konsisten dengan konsep simple elegant CANKZ.
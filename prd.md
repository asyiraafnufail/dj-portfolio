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
- **Universal 2-Column Grid Lock:** Layout card box pada section **Experience**, **Genres**, dan **My Edited Songs** terkunci mutlak pada **2 card horizontal (`grid-cols-2`)** di seluruh perangkat (Mobile portrait, Mobile landscape, Tablet, hingga Desktop/Safari Mac). Dilarang beralih ke 3 kolom (`lg:grid-cols-3`) atau 4 kolom (`lg:grid-cols-4`). Kontainer grid dibatasi `max-w-4xl mx-auto` agar proporsi 2 kartu tetap seimbang, padat, dan elegan di layar lebar.
- **Universal Grid Gap & Alignment Symmetry Lock:** Seluruh container card grid pada 5 section utama (**Experience**, **Genres**, **YouTube Player**, **My Edited Songs**, dan **Assets File**) terkunci seragam pada batas lebar maksimal **`mx-auto max-w-4xl`**, sehingga batas tepi kiri dan kanan kartu sejajar lurus secara vertikal dari atas ke bawah pada layar desktop. Jarak gap (horizontal antar-kolom dan vertikal antar-baris kartu) terkunci seragam dan simetris pada **`gap-3 sm:gap-5`** (12px di mobile, 20px di desktop/tablet). Dilarang memakai gap berbeda seperti `gap-4`.
- **Card Box Radius Lock (`rounded-2xl`):** Seluruh content card box di semua section (Experience, Genres, YouTube Mixtape Player, Edited Songs, Assets File, dan sub-item Direct Contact) terkunci seragam menggunakan radius `rounded-2xl`. Kotak pembungkus icon di dalam card terkunci `rounded-xl` (satu tingkat di bawah card). Kontainer video iframe di dalam card player terkunci `rounded-xl`.
- **Background Clean Solid Lock:** Seluruh section wajib mempertahankan latar belakang hitam/gelap solid murni (`bg-slate-950`). Dilarang menambahkan elemen dekoratif lingkaran blur / ambient gradient liar (`bg-slate-700/20`, `blur-3xl`, dsb.) yang menyebabkan noda gradasi tipis, warna belang, atau garis patahan terpotong (`overflow-hidden`) saat ukuran kontainer berubah dinamis.
- **Spacing Vertikal Section Header Lock:** Jarak bawah container header (`badge`, `title`, `description`) menuju container card box atau konten di bawahnya terkunci rapi pada `mb-6 sm:mb-8` di semua section (Experience, Genres, Mixtapes, Edited Songs, Assets File, Contact). Dilarang memakai margin renggang berlebih (`mb-10 sm:mb-16`) agar ritme vertikal tetap proporsional dan padat.
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
  - Terkunci mutlak 2 kolom horizontal (`grid-cols-2`, `max-w-4xl mx-auto`) di seluruh perangkat dan ukuran layar (Mobile portrait, Mobile landscape, Tablet, hingga Desktop/Safari Mac).
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
  - Card minimalis ringkas rata tengah (centered layout): icon di kotak tengah dan nama genre di bawahnya rata tengah (`text-center`, `items-center`), tanpa teks deskripsi tambahan.
  - Tampilan Grid: Terkunci mutlak 2 kolom horizontal (`grid-cols-2`, `max-w-4xl mx-auto`) di seluruh perangkat dan ukuran layar (Mobile, Tablet, Desktop).
  - Card interaktif dengan hover halus (border amber lembut / shadow ringan), bukan neon glow.
  - Jangan tampilkan BPM atau Crowd Energy. Genre cukup berupa card singkat. Dilarang menggunakan animasi pop-up scroll fade-in, bouncing badge, ping indicator, emoji, atau animasi mencolok. Render statis instan.

---

### **SECTION 4: YOUTUBE MIXTAPE PLAYER**
*Scroll ke bawah dari Genre.*

- **Fitur & Konten:**
  - Header: *"Latest Mixtapes & Sets"*.
  - Sub-header: *"Watch live recordings and club sets directly on YouTube"*.
- **Tampilan Integrasi:**
  - Menyediakan *container* responsif untuk menampung **YouTube Embed Player** (iFrame) dengan rasio aspek 16:9 (`aspect-video`), border radius `rounded-xl`, dan pembungkus card `rounded-2xl`.
  - Terkunci pada kontainer `mx-auto max-w-4xl` dengan grid `gap-3 sm:gap-5` selaras dengan section lainnya.
  - **Desktop:** Grid 2 player bersisian (`lg:grid-cols-2`).
  - **Mobile:** Player bertumpuk vertikal (`grid-cols-1`).

---

### **SECTION 5: MY EDITED SONGS**
*Scroll ke bawah dari YouTube / Mixtape Player.*

- **Fitur & Konten:**
  - Header: *"My Edited Songs"*.
  - Sub-header: Custom edits, bootlegs, dan flips garapan CANKZ.
  - **Fitur Pencarian (Search Bar):** Search input bar minimalis di bawah header (`bg-slate-900/60`, border amber halus `border-amber-400/25`, icon `Search`). Memfilter track secara real-time berdasarkan judul lagu, nama artis, dan genre. Dilengkapi tombol reset silang (`X`) dan tampilan *empty state* bersih bila tidak ada track yang cocok.
- **Tampilan Grid:**
  - Terkunci mutlak 2 kolom horizontal (`grid-cols-2`, `max-w-4xl mx-auto`) di seluruh perangkat dan ukuran layar (Mobile portrait, Mobile landscape, Tablet, hingga Desktop/Safari Mac).
- **Setiap Card Track Berisi:**
  - Judul lagu dan nama artist original (compact, langsung nama artist tanpa prefix 'Orig.').
  - Label kualitas audio (contoh: `Quality: WAV` atau `Quality: MP3 (320Kbps)`).
  - Badge genre sesuai Sound Signature.
  - Tombol aksi: *"Download"* di posisi tengah card, bersih tanpa underline.
  - Interaksi Download Modal Pop-up: Klik *"Download"* membuka modal pop-up backdrop transparan blur (`bg-slate-950/80 backdrop-blur-sm`) menampilkan detail lengkap tanpa terpotong (judul lengkap, artis, genre, quality indicator) serta tombol final *"Download Track"* menuju tautan file unduhan. Mendukung penutupan via tombol close (X), klik backdrop luar, atau tombol Escape keyboard.
  - Desain card *glass-panel* kompak selaras dengan tema gelap elegan & aksen amber, render statis instan tanpa animasi scroll fade-in.

---

### **SECTION 6: ASSETS FILE**
*Scroll ke bawah dari Edited Songs.*

- **Fitur & Konten:**
  - Header: *"Assets File"*.
  - Sub-header: *"High-resolution artist photos and official logos for event flyers, club lineups, and promotional artwork"*.
  - 1 Card box horizontal di bagian atas: *"Electronic Press Kit (EPK)"* (PDF Document: biografi artis, profil sound, rider teknis & hospitality).
  - 2 Card spesifikasi di bawahnya (Grid 2 kolom): High-Res Photos (JPG/PNG) & Official Logos (Transparent PNG).
  - Tombol aksi utama: *"Open Google Drive"* menuju link drive aset flyer/promosi.
  - Tampilan selaras dengan tema gelap elegan, border amber tipis, dan glass-panel.

---

### **SECTION 7: CONTACT & BOOKING**
*Section paling bawah (Footer & Form).*

- **Fitur & Konten:**
  - Header: *"Get In Touch & Booking"*.
  - **Sisi Kiri / Atas:** Form Kontak Interaktif (Nama, Email, Tanggal Event, Jenis Venue, Pesan).
  - **Sisi Kanan / Bawah:** Informasi Kontak Direct & Social Media:
    - Tombol Direct WhatsApp.
    - Email Booking.
    - Link Ikon Sosial Media: Instagram, SoundCloud, Spotify, TikTok, YouTube.

---

### **SECTION 8: HEADLESS CMS & CONTROL PANEL (`/login` & `/admin`)**
*Sistem manajemen konten cloud-based menggunakan Supabase PostgreSQL + Auth.*

- **Fitur & Arsitektur:**
  - **Autentikasi & Proteksi Rute:**
    - Endpoint login di `/login` dengan Next.js Edge Middleware (`middleware.ts`) memproteksi `/admin/*`.
    - User terautentikasi otomatis diarahkan dari `/login` ke `/admin`, dan user tanpa sesi dialihkan ke `/login`.
  - **Control Panel Dashboard (`/admin`):**
    - 5 Tab navigasi: `songs`, `mixtapes`, `venues`, `genres`, `settings`.
    - **Operasi CRUD Lengkap:** Tambah baru, hapus item, dan edit item via modal pop-up interaktif untuk setiap kategori data.
    - **Edited Songs:** Input text bebas untuk genre (agar fleksibel memasukkan kombinasi/subgenre), pemilihan audio quality (`WAV` / `MP3`), judul, artist, dan link download/drive.
    - **Custom Dropdown Lock:** Semua select dropdown menggunakan komponen React `CustomSelect` custom dengan icon panah `ChevronDown` presisi, bebas dari bug displacement OS/Safari WebKit.
    - **Admin Tab Bar & Form Layout Symmetry Lock:** Tab navigation bar terkunci `py-3.5 sm:py-4 border-b border-white/10`, button tabs berukuran seragam `h-10 shrink-0 whitespace-nowrap px-4 rounded-xl`, kontainer `main` memakai `pt-0 pb-8 sm:pb-12` agar jarak garis atas (header) dan garis bawah (tab) presisi dan simetris. Spacing form terkunci konsisten (label `mb-1.5`, input `px-3.5 py-2`, separator tombol aksi `pt-2 border-t border-white/5`, list header `pb-1.5 border-b border-white/10`).
    - **Pure 1-Click Arrow Reordering Lock (No Drag-and-Drop):** Urutan item diatur murni menggunakan kontrol tombol panah 1-klik (`ChevronUp` / `ChevronDown`) di sisi kiri setiap kartu item di 4 tab admin (`songs`, `mixtapes`, `venues`, `genres`). Seluruh implementasi drag-and-drop dihapus total guna menghindari konflik scrolling layar sentuh dan gesture trackpad Safari/macOS. Urutan item otomatis langsung di-swap dan disinkronkan ke kolom `sort_order` di Supabase.
    - **Site Settings:** Pengaturan dinamis link folder Google Drive aset promosi, nomor WhatsApp booking, pesan template WhatsApp, email booking, dan lokasi artis.
  - **Resilient Fallback Data Fetching:** Komponen publik memuat data lokal instan saat hidrasi agar nol kedip (*zero loading flash*), kemudian melakukan silent sync dengan Supabase cloud.
  - **Keep-Alive Automation:** GitHub Actions workflow (`.github/workflows/keep-alive-supabase.yml`) melakukan ping terjadwal tiap 3 hari untuk menjaga proyek Supabase tier gratis tetap aktif (*anti-inactivity pause*).

---

## 5. Instructions for the AI Agent

Saat mengeksekusi kode berdasarkan dokumen ini, AI Agent harus mematuhi aturan berikut:

1. **State Management:**
   - Gunakan directive `'use client';` untuk komponen yang membutuhkan interaktivitas (mobile menu, form handling, SoundCloud embed player).
2. **Component Separation:**
   - Pisahkan setiap section ke dalam folder `src/components/` (misal: `HeroAbout.jsx`, `Experience.jsx`, `Genres.jsx`, `YouTubePlayer.jsx`, `EditedSongs.jsx`, `Contact.jsx`).
3. **Responsive Utilities:**
   - Gunakan Tailwind breakpoint `sm:`, `md:`, `lg:`, `xl:` untuk memastikan tampilan mobile (`<768px`) dan desktop (`>=1024px`) sesuai dengan spesifikasi di atas.
4. **Media:**
   - Hero wajib memakai aset lokal (`aset/1.jpg` / `aset/fotoporto.jpeg`).
   - Foto venue boleh memakai Unsplash resolusi tinggi kategori *Nightclub* atau *Festival* selama tetap selaras dengan tema gelap elegant.
5. **YouTube & Media Integration:**
   - Gunakan YouTube Embed Player (iFrame) responsif dengan rasio `aspect-video`.
6. **Single Source of Truth:**
   - Semua perubahan desain, copy, layout, warna, brand, dan media harus mengacu pada `prd.md` ini.
   - Jika user meminta perubahan yang berpotensi melanggar Design Lock, jelaskan konflik singkat lalu minta konfirmasi sebelum mengubah.
   - Jangan memperkenalkan nama, warna, efek, atau komponen baru yang tidak konsisten dengan konsep simple elegant CANKZ.
7. **Next.js & Dependencies Lock:**
   - Versi Next.js dan `eslint-config-next` terkunci di `16.4.3` (exact match, tanpa wildcard `^` atau `~`).
   - `devIndicators: false` wajib dipertahankan di `next.config.ts` dan CSS override di `app/globals.css` agar indikator dev tidak muncul.
   - Dilarang meng-upgrade, me-downgrade, atau mengubah konfigurasi Next.js tanpa persetujuan eksplisit dari user.
8. **Change & PRD Locking Protocol (Alur Konfirmasi Wajib):**
   - Setiap ada permintaan perubahan baru, AI Agent WAJIB:
     1. Menjelaskan dan menyimpulkan rencana/hasil perubahannya terlebih dahulu kepada user.
     2. Menunggu konfirmasi dari user sebelum mengunci perubahan ke dalam `prd.md`.
     3. Hanya meng-update dan mengunci `prd.md` setelah perubahan terbukti fix dan telah disetujui oleh user.
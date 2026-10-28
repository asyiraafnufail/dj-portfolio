# Supabase CMS & Admin Dashboard Migration Plan

Dokumen perencanaan arsitektur, skema database, migrasi data otomatis, dan sistem admin untuk website portofolio DJ CANKZ.

---

## 1. Arsitektur & Tech Stack
- **Database & Auth:** Supabase (PostgreSQL + Supabase Auth)
- **Data Fetching:** Next.js Server Components & Server Actions (aman, cepat, dan SEO-friendly)
- **Keamanan Akses (Row Level Security - RLS):**
  - **Publik (Anonim):** Akses baca saja (`SELECT`) untuk menampilkan data ke pengunjung website.
  - **Admin (Authenticated):** Akses penuh (`INSERT`, `UPDATE`, `DELETE`) hanya untuk akun pemilik web.
- **Keep-Alive Supabase (Anti-Sleep):** GitHub Actions cron otomatis tiap 3 hari.

---

## 2. Struktur Skema Database (PostgreSQL)

### A. Tabel `venues` (Experience Section)
```sql
create table venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  icon text not null default 'Coffee',
  tone text not null default 'border-slate-400/25',
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

### B. Tabel `genres` (Sound Signature Section)
```sql
create table genres (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null default 'Disc', -- Zap, Disc, Radio, Waves, CircleDot
  tone text not null default 'border-amber-400/25',
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

### C. Tabel `mixtapes` (YouTube Player Section)
```sql
create table mixtapes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  embed_url text not null,
  youtube_url text not null,
  border text not null default 'border-amber-400/25',
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

### D. Tabel `edited_songs` (My Edited Songs Section)
```sql
create table edited_songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  original_artist text not null,
  genre text not null,
  quality text not null default 'WAV',
  link text not null,
  border text not null default 'border-amber-400/25',
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

### E. Tabel `site_settings` (Direct Contact & Assets)
```sql
create table site_settings (
  id text primary key, -- 'general'
  google_drive_url text,
  whatsapp_number text,
  whatsapp_message text,
  booking_email text,
  location text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);
```

---

## 3. Otomasi Migrasi Data (Zero Manual Input)

Untuk menghindari input data manual satu per satu:
1. Buat script seeding `scripts/seed-supabase.ts`.
2. Script akan mengekstrak data statis yang saat ini ada di:
   - `Experience.tsx` (10 venues)
   - `Genres.tsx` (12 genres)
   - `YouTubePlayer.tsx` (2 mixtapes)
   - `EditedSongs.tsx` (6 tracks)
   - `AssetsFile.tsx` (link Google Drive)
   - `Contact.tsx` (nomor WA, email)
3. Eksekusi 1 baris perintah:
   ```bash
   npx tsx scripts/seed-supabase.ts
   ```
4. Seluruh data web otomatis langsung tersimpan di Supabase dalam hitungan detik.

---

## 4. Anti-Sleep Supabase (GitHub Actions)

Agar database Supabase gratisan tidak mengalami *pause* (tidur setelah 7 hari tidak aktif):

File workflow: `.github/workflows/keep-alive-supabase.yml`
```yaml
name: Keep Alive Supabase

on:
  schedule:
    # Berjalan setiap 3 hari sekali pukul 00:00 UTC
    - cron: '0 0 */3 * *'
  workflow_dispatch: # Bisa di-trigger manual

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase REST API
        run: |
          curl -s -X GET "${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}/rest/v1/venues?select=id&limit=1" \
          -H "apikey: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}" \
          -H "Authorization: Bearer ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}" > /dev/null
          echo "Supabase successfully pinged."
```

---

## 5. Rencana Tampilan Halaman Admin

1. **`/login`:**
   - Desain gelap elegan selaras dengan tema utama (`bg-slate-950`, form glass-panel, aksen amber).
   - Form input Email & Password dengan error handling yang jelas.
2. **`/admin` (Dashboard):**
   - Tab navigasi bersih:
     - **Genres:** Form tambah genre musik baru (nama genre, pilihan icon: Zap/Disc/Waves/dll., warna border), edit nama genre, hapus genre, dan atur urutan tampil.
     - **Edited Songs:** Tambah lagu baru, ubah link download/drive, ganti label audio quality (`WAV` / `MP3`).
     - **Mixtapes:** Tambah/ganti video YouTube.
     - **Venues:** Tambah venue manggung baru.
     - **Settings:** Ganti nomor WA booking atau link Google Drive flyer.
   - Tombol logout & proteksi route via `middleware.ts`.

---

## 6. Tahapan Eksekusi (Roadmap)

- [ ] **Fase 1: Setup Akun & Kredensial**
  - Buat proyek gratis di Supabase dashboard.
  - Ambil `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] **Fase 2: Eksekusi Skema & Seeding Data**
  - Jalankan skema SQL di Supabase SQL Editor.
  - Jalankan script `seed-supabase.ts` untuk memindahkan data web saat ini.
- [ ] **Fase 3: Pasang Cron Anti-Sleep**
  - Simpan secrets di repository GitHub dan aktifkan GitHub Action.
- [ ] **Fase 4: Bangun Halaman `/login` dan `/admin`**
  - Buat halaman login dan form CMS interaktif.
  - Hubungkan komponen halaman utama (`page.tsx`) agar mengambil data langsung dari Supabase.

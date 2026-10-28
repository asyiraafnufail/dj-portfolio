-- DJ Portfolio CANKZ - Supabase Schema & Security Setup

-- 1. Table: Venues (Gigs & Experiences)
create table if not exists venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  icon text not null default 'Coffee',
  tone text not null default 'border-slate-400/25',
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Table: Genres (Sound Signature)
create table if not exists genres (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null default 'Disc',
  tone text not null default 'border-amber-400/25',
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Table: Mixtapes (YouTube Sets)
create table if not exists mixtapes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  embed_url text not null,
  youtube_url text not null,
  border text not null default 'border-amber-400/25',
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Table: Edited Songs (Bootlegs & Edits)
create table if not exists edited_songs (
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

-- 5. Table: Site Settings (Contact & Assets Drive Link)
create table if not exists site_settings (
  id text primary key default 'general',
  google_drive_url text,
  whatsapp_number text,
  whatsapp_message text,
  booking_email text,
  location text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS
alter table venues enable row level security;
alter table genres enable row level security;
alter table mixtapes enable row level security;
alter table edited_songs enable row level security;
alter table site_settings enable row level security;

-- Public READ (SELECT) Policies - allow everyone to view the portfolio
drop policy if exists "Public read venues" on venues;
create policy "Public read venues" on venues for select using (true);

drop policy if exists "Public read genres" on genres;
create policy "Public read genres" on genres for select using (true);

drop policy if exists "Public read mixtapes" on mixtapes;
create policy "Public read mixtapes" on mixtapes for select using (true);

drop policy if exists "Public read edited_songs" on edited_songs;
create policy "Public read edited_songs" on edited_songs for select using (true);

drop policy if exists "Public read site_settings" on site_settings;
create policy "Public read site_settings" on site_settings for select using (true);

-- Authenticated Admin Policies - allow logged-in user full access (insert/update/delete)
drop policy if exists "Admin all venues" on venues;
create policy "Admin all venues" on venues for all to authenticated using (true) with check (true);

drop policy if exists "Admin all genres" on genres;
create policy "Admin all genres" on genres for all to authenticated using (true) with check (true);

drop policy if exists "Admin all mixtapes" on mixtapes;
create policy "Admin all mixtapes" on mixtapes for all to authenticated using (true) with check (true);

drop policy if exists "Admin all edited_songs" on edited_songs;
create policy "Admin all edited_songs" on edited_songs for all to authenticated using (true) with check (true);

drop policy if exists "Admin all site_settings" on site_settings;
create policy "Admin all site_settings" on site_settings for all to authenticated using (true) with check (true);

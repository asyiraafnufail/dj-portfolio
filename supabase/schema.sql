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

-- 5. Table: Site Settings (Contact, Assets Drive Link & Profile Photo)
create table if not exists site_settings (
  id text primary key default 'general',
  google_drive_url text,
  whatsapp_number text,
  whatsapp_message text,
  booking_email text,
  location text,
  hero_image_url text
);

-- Ensure single-row integrity
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'site_settings_single_row'
  ) then
    alter table site_settings add constraint site_settings_single_row check (id = 'general');
  end if;
end $$;

-- 6. Table: Stage Photos (Live Moments)
create table if not exists stage_photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  sort_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ==========================================
-- PERFORMANCE INDEXES (B-Tree on Sort Order)
-- ==========================================
create index if not exists idx_venues_sort_order on venues (sort_order asc);
create index if not exists idx_genres_sort_order on genres (sort_order asc);
create index if not exists idx_mixtapes_sort_order on mixtapes (sort_order asc);
create index if not exists idx_edited_songs_sort_order on edited_songs (sort_order asc);
create index if not exists idx_stage_photos_sort_order on stage_photos (sort_order asc);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS
alter table venues enable row level security;
alter table genres enable row level security;
alter table mixtapes enable row level security;
alter table edited_songs enable row level security;
alter table site_settings enable row level security;
alter table stage_photos enable row level security;

-- Public READ (SELECT) Policies - allow everyone (anon + authenticated) to view
drop policy if exists "Public read venues" on venues;
create policy "Public read venues" on venues for select to anon, authenticated using (true);

drop policy if exists "Public read genres" on genres;
create policy "Public read genres" on genres for select to anon, authenticated using (true);

drop policy if exists "Public read mixtapes" on mixtapes;
create policy "Public read mixtapes" on mixtapes for select to anon, authenticated using (true);

drop policy if exists "Public read edited_songs" on edited_songs;
create policy "Public read edited_songs" on edited_songs for select to anon, authenticated using (true);

drop policy if exists "Public read site_settings" on site_settings;
create policy "Public read site_settings" on site_settings for select to anon, authenticated using (true);

drop policy if exists "Public read stage_photos" on stage_photos;
create policy "Public read stage_photos" on stage_photos for select to anon, authenticated using (true);

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

drop policy if exists "Admin all stage_photos" on stage_photos;
create policy "Admin all stage_photos" on stage_photos for all to authenticated using (true) with check (true);

-- ==========================================
-- STORAGE POLICIES (Bucket: stage-photos)
-- ==========================================

-- Ensure bucket exists and is public
insert into storage.buckets (id, name, public)
values ('stage-photos', 'stage-photos', true)
on conflict (id) do update set public = true;

-- Public can view photos
drop policy if exists "Public view stage photos" on storage.objects;
create policy "Public view stage photos" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'stage-photos');

-- Authenticated admin has full access (select, insert, update, delete)
drop policy if exists "Admin all stage photos storage" on storage.objects;
drop policy if exists "Admin delete stage photos" on storage.objects;
drop policy if exists "Authenticated insert stage photos" on storage.objects;
drop policy if exists "Authenticated update stage photos" on storage.objects;
drop policy if exists "Authenticated delete stage photos" on storage.objects;

create policy "Admin all stage photos storage" on storage.objects
  for all to authenticated
  using (bucket_id = 'stage-photos')
  with check (bucket_id = 'stage-photos');

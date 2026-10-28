-- DJ Portfolio CANKZ - Initial Data Seed

-- 1. Venues (Gigs)
insert into venues (name, city, icon, tone, sort_order) values
('Peggasus', 'Sleman', 'Wine', 'border-amber-400/25', 1),
('23 White House', 'Yogyakarta', 'Martini', 'border-amber-400/25', 2),
('The Gardens', 'Yogyakarta', 'CircleDot', 'border-stone-400/25', 3),
('Taphouse', 'Yogyakarta', 'Coffee', 'border-stone-400/25', 4),
('Kopikina', 'Yogyakarta', 'Coffee', 'border-slate-400/25', 5),
('Tons Good', 'Yogyakarta', 'Coffee', 'border-slate-400/25', 6),
('Gaskara', 'Yogyakarta', 'Coffee', 'border-slate-400/25', 7),
('31 Bloc', 'Yogyakarta', 'Coffee', 'border-slate-400/25', 8),
('Cobar', 'Yogyakarta', 'Coffee', 'border-slate-400/25', 9),
('Flexzone GYM', 'Klaten', 'Dumbbell', 'border-slate-400/25', 10);

-- 2. Genres (Sound Signature)
insert into genres (title, icon, tone, sort_order) values
('Commercial EDM', 'Zap', 'border-amber-400/25', 1),
('Hip-Hop', 'Disc', 'border-stone-400/25', 2),
('R&B', 'Radio', 'border-slate-400/25', 3),
('Amapiano', 'CircleDot', 'border-amber-400/25', 4),
('Afrobeats', 'Waves', 'border-stone-400/25', 5),
('Afro House', 'Disc', 'border-amber-400/25', 6),
('Miami Bass', 'Zap', 'border-slate-400/25', 7),
('Jersey Club', 'CircleDot', 'border-stone-400/25', 8),
('Gqom', 'Waves', 'border-amber-400/25', 9),
('Indo Bounce', 'Disc', 'border-slate-400/25', 10),
('Breakbeat', 'Radio', 'border-stone-400/25', 11),
('Bassline Bounce', 'Zap', 'border-amber-400/25', 12);

-- 3. Mixtapes (YouTube Sets)
insert into mixtapes (title, embed_url, youtube_url, border, sort_order) values
('CANKZ - 2016 VIBES', 'https://www.youtube.com/embed/CWrGE1BF-do', 'https://youtu.be/CWrGE1BF-do?si=ZHoiYlz3_DCcWfo_', 'border-amber-400/25', 1),
('CANKZ - INDOBOUNCE Mixtape', 'https://www.youtube.com/embed/UshDWwMbQPo', 'https://youtu.be/UshDWwMbQPo?si=9NI75xO6G9rsIpKc', 'border-stone-400/25', 2);

-- 4. Edited Songs
insert into edited_songs (title, original_artist, genre, quality, link, border, sort_order) values
('Astaga Bercanda', 'Mingse, Akbar Chalay', 'Bounce', 'WAV', 'https://drive.google.com/file/d/1CewJEqndnuiyut7k0_y-QvuDDGFQDFg2/view?usp=sharing', 'border-amber-400/25', 1),
('This Is What You Came For (Outro Edit)', 'Calvin Harris feat. Rihanna', 'Dance-Pop', 'MP3 (320Kbps)', 'https://drive.google.com/file/d/1j5lxmkLbsM43tFEh10YuNm0x3rv0H8Eu/view?usp=drive_link', 'border-stone-400/25', 2),
('Not Like Us', 'Kendrick Lamar', 'UK Garage (UKG)', 'WAV', 'https://soundcloud.com', 'border-slate-400/25', 3),
('Doja', 'Central Cee', 'Indo Bounce', 'MP3 (320Kbps)', 'https://soundcloud.com', 'border-amber-400/25', 4),
('Snooze', 'SZA', 'Bassline Bounce', 'WAV', 'https://soundcloud.com', 'border-stone-400/25', 5),
('FE!N', 'Travis Scott ft. Playboi Carti', 'Jersey Club', 'MP3 (320Kbps)', 'https://soundcloud.com', 'border-slate-400/25', 6);

-- 5. Site Settings
insert into site_settings (id, google_drive_url, whatsapp_number, whatsapp_message, booking_email, location)
values (
  'general',
  'https://drive.google.com/drive/folders/1xBZMS4b2Qhd0a0qb-IdmIKTD8HG1-fbz?usp=drive_link',
  '+628174957733',
  'Hi CANKZ, I want to book an event.',
  'contactcankz@gmail.com',
  'Sleman, Yogyakarta'
)
on conflict (id) do update set
  google_drive_url = excluded.google_drive_url,
  whatsapp_number = excluded.whatsapp_number,
  whatsapp_message = excluded.whatsapp_message,
  booking_email = excluded.booking_email,
  location = excluded.location;

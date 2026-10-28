import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Read .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local file not found!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let val = match[2] || '';
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    env[key] = val.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding initial data to Supabase...\n');

  // 1. Venues
  const venues = [
    { name: 'Peggasus', city: 'Sleman', tone: 'border-amber-400/25', icon: 'Wine', sort_order: 1 },
    { name: '23 White House', city: 'Yogyakarta', tone: 'border-amber-400/25', icon: 'Martini', sort_order: 2 },
    { name: 'The Gardens', city: 'Yogyakarta', tone: 'border-stone-400/25', icon: 'CircleDot', sort_order: 3 },
    { name: 'Taphouse', city: 'Yogyakarta', tone: 'border-stone-400/25', icon: 'Coffee', sort_order: 4 },
    { name: 'Kopikina', city: 'Yogyakarta', tone: 'border-slate-400/25', icon: 'Coffee', sort_order: 5 },
    { name: 'Tons Good', city: 'Yogyakarta', tone: 'border-slate-400/25', icon: 'Coffee', sort_order: 6 },
    { name: 'Gaskara', city: 'Yogyakarta', tone: 'border-slate-400/25', icon: 'Coffee', sort_order: 7 },
    { name: '31 Bloc', city: 'Yogyakarta', tone: 'border-slate-400/25', icon: 'Coffee', sort_order: 8 },
    { name: 'Cobar', city: 'Yogyakarta', tone: 'border-slate-400/25', icon: 'Coffee', sort_order: 9 },
    { name: 'Flexzone GYM', city: 'Klaten', tone: 'border-slate-400/25', icon: 'Dumbbell', sort_order: 10 },
  ];

  const { error: venueErr } = await supabase.from('venues').insert(venues);
  if (venueErr) console.error('Venues seed error:', venueErr.message);
  else console.log('✓ 10 Venues successfully inserted.');

  // 2. Genres
  const genres = [
    { title: 'Commercial EDM', tone: 'border-amber-400/25', icon: 'Zap', sort_order: 1 },
    { title: 'Hip-Hop', tone: 'border-stone-400/25', icon: 'Disc', sort_order: 2 },
    { title: 'R&B', tone: 'border-slate-400/25', icon: 'Radio', sort_order: 3 },
    { title: 'Amapiano', tone: 'border-amber-400/25', icon: 'CircleDot', sort_order: 4 },
    { title: 'Afrobeats', tone: 'border-stone-400/25', icon: 'Waves', sort_order: 5 },
    { title: 'Afro House', tone: 'border-amber-400/25', icon: 'Disc', sort_order: 6 },
    { title: 'Miami Bass', tone: 'border-slate-400/25', icon: 'Zap', sort_order: 7 },
    { title: 'Jersey Club', tone: 'border-stone-400/25', icon: 'CircleDot', sort_order: 8 },
    { title: 'Gqom', tone: 'border-amber-400/25', icon: 'Waves', sort_order: 9 },
    { title: 'Indo Bounce', tone: 'border-slate-400/25', icon: 'Disc', sort_order: 10 },
    { title: 'Breakbeat', tone: 'border-stone-400/25', icon: 'Radio', sort_order: 11 },
    { title: 'Bassline Bounce', tone: 'border-amber-400/25', icon: 'Zap', sort_order: 12 },
  ];

  const { error: genreErr } = await supabase.from('genres').insert(genres);
  if (genreErr) console.error('Genres seed error:', genreErr.message);
  else console.log('✓ 12 Genres successfully inserted.');

  // 3. Mixtapes
  const mixtapes = [
    {
      title: 'CANKZ - 2016 VIBES',
      embed_url: 'https://www.youtube.com/embed/CWrGE1BF-do',
      youtube_url: 'https://youtu.be/CWrGE1BF-do?si=ZHoiYlz3_DCcWfo_',
      border: 'border-amber-400/25',
      sort_order: 1,
    },
    {
      title: 'CANKZ - INDOBOUNCE Mixtape',
      embed_url: 'https://www.youtube.com/embed/UshDWwMbQPo',
      youtube_url: 'https://youtu.be/UshDWwMbQPo?si=9NI75xO6G9rsIpKc',
      border: 'border-stone-400/25',
      sort_order: 2,
    },
  ];

  const { error: mixtapeErr } = await supabase.from('mixtapes').insert(mixtapes);
  if (mixtapeErr) console.error('Mixtapes seed error:', mixtapeErr.message);
  else console.log('✓ 2 Mixtapes successfully inserted.');

  // 4. Edited Songs
  const editedSongs = [
    {
      title: 'Astaga Bercanda',
      original_artist: 'Mingse, Akbar Chalay',
      genre: 'Bounce',
      quality: 'WAV',
      link: 'https://drive.google.com/file/d/1CewJEqndnuiyut7k0_y-QvuDDGFQDFg2/view?usp=sharing',
      border: 'border-amber-400/25',
      sort_order: 1,
    },
    {
      title: 'This Is What You Came For (Outro Edit)',
      original_artist: 'Calvin Harris feat. Rihanna',
      genre: 'Dance-Pop',
      quality: 'MP3 (320Kbps)',
      link: 'https://drive.google.com/file/d/1j5lxmkLbsM43tFEh10YuNm0x3rv0H8Eu/view?usp=drive_link',
      border: 'border-stone-400/25',
      sort_order: 2,
    },
    {
      title: 'Not Like Us',
      original_artist: 'Kendrick Lamar',
      genre: 'UK Garage (UKG)',
      quality: 'WAV',
      link: 'https://soundcloud.com',
      border: 'border-slate-400/25',
      sort_order: 3,
    },
    {
      title: 'Doja',
      original_artist: 'Central Cee',
      genre: 'Indo Bounce',
      quality: 'MP3 (320Kbps)',
      link: 'https://soundcloud.com',
      border: 'border-amber-400/25',
      sort_order: 4,
    },
    {
      title: 'Snooze',
      original_artist: 'SZA',
      genre: 'Bassline Bounce',
      quality: 'WAV',
      link: 'https://soundcloud.com',
      border: 'border-stone-400/25',
      sort_order: 5,
    },
    {
      title: 'FE!N',
      original_artist: 'Travis Scott ft. Playboi Carti',
      genre: 'Jersey Club',
      quality: 'MP3 (320Kbps)',
      link: 'https://soundcloud.com',
      border: 'border-slate-400/25',
      sort_order: 6,
    },
  ];

  const { error: songErr } = await supabase.from('edited_songs').insert(editedSongs);
  if (songErr) console.error('Edited songs seed error:', songErr.message);
  else console.log('✓ 6 Edited songs successfully inserted.');

  // 5. Site Settings
  const settings = {
    id: 'general',
    google_drive_url: 'https://drive.google.com/drive/folders/1xBZMS4b2Qhd0a0qb-IdmIKTD8HG1-fbz?usp=drive_link',
    whatsapp_number: '+628174957733',
    whatsapp_message: 'Hi CANKZ, I want to book an event.',
    booking_email: 'contactcankz@gmail.com',
    location: 'Sleman, Yogyakarta',
  };

  const { error: setErr } = await supabase.from('site_settings').upsert(settings);
  if (setErr) console.error('Site settings seed error:', setErr.message);
  else console.log('✓ Site settings successfully inserted.');

  console.log('\nAll data seeded successfully!');
}

seed();

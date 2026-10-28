import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testFetch() {
  const { data: venues, error: vErr } = await supabase.from('venues').select('*').order('sort_order', { ascending: true });
  const { data: genres, error: gErr } = await supabase.from('genres').select('*').order('sort_order', { ascending: true });
  const { data: songs, error: sErr } = await supabase.from('edited_songs').select('*').order('sort_order', { ascending: true });

  if (vErr || gErr || sErr) {
    console.error('Fetch error:', vErr || gErr || sErr);
  } else {
    console.log(`Success! Fetched: ${venues.length} venues, ${genres.length} genres, ${songs.length} songs from Supabase.`);
  }
}

testFetch();

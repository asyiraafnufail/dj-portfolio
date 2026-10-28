'use client';

import { Disc3, Download, Music2 } from 'lucide-react';

interface EditedSong {
  id: string;
  title: string;
  originalArtist: string;
  genre: string;
  link: string;
  border: string;
}

const editedSongs: EditedSong[] = [
  {
    id: '1',
    title: 'Hotline Bling',
    originalArtist: 'Drake',
    genre: 'Amapiano',
    link: 'https://soundcloud.com',
    border: 'border-amber-400/25',
  },
  {
    id: '2',
    title: 'Goosebumps',
    originalArtist: 'Travis Scott',
    genre: 'Afro House',
    link: 'https://soundcloud.com',
    border: 'border-stone-400/25',
  },
  {
    id: '3',
    title: 'Not Like Us',
    originalArtist: 'Kendrick Lamar',
    genre: 'UK Garage (UKG)',
    link: 'https://soundcloud.com',
    border: 'border-slate-400/25',
  },
  {
    id: '4',
    title: 'Doja',
    originalArtist: 'Central Cee',
    genre: 'Indo Bounce',
    link: 'https://soundcloud.com',
    border: 'border-amber-400/25',
  },
  {
    id: '5',
    title: 'Snooze',
    originalArtist: 'SZA',
    genre: 'Bassline Bounce',
    link: 'https://soundcloud.com',
    border: 'border-stone-400/25',
  },
  {
    id: '6',
    title: 'FE!N',
    originalArtist: 'Travis Scott ft. Playboi Carti',
    genre: 'Jersey Club',
    link: 'https://soundcloud.com',
    border: 'border-slate-400/25',
  },
];

export default function EditedSongs() {
  return (
    <section
      id="edited-songs"
      className="relative overflow-hidden bg-slate-950 pt-10 sm:pt-14 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16"
    >
      <div className="absolute right-10 top-1/3 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-slate-700/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 sm:mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
            <Music2 className="h-3.5 w-3.5 text-amber-300" /> Bootlegs &amp; Edits
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            My Edited Songs
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-slate-400 sm:text-lg">
            Custom edits, club bootlegs, and genre flips crafted by CANKZ for your creative mixing.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {editedSongs.map((song) => (
            <div
              key={song.id}
              className={`glass-panel group flex flex-col justify-between rounded-xl border ${song.border} bg-slate-900/40 p-3 sm:p-4 transition duration-300 hover:-translate-y-1 hover:border-amber-400/35 hover:shadow-xl`}
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-950/80 text-amber-200 transition group-hover:text-amber-100">
                    <Disc3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <span className="truncate rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-amber-200">
                    {song.genre}
                  </span>
                </div>

                <div className="mt-2.5 sm:mt-3">
                  <h3 className="line-clamp-1 text-xs sm:text-sm font-bold text-white transition group-hover:text-amber-100">
                    {song.title}
                  </h3>
                  <p className="line-clamp-1 mt-0.5 text-[11px] sm:text-xs text-slate-400">
                    Orig. {song.originalArtist}
                  </p>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex items-center justify-center border-t border-white/5 pt-2.5 sm:pt-3 text-[11px] sm:text-xs text-slate-400">
                <a
                  href={song.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-white transition hover:text-amber-200"
                >
                  <Download className="h-3 w-3 text-amber-300" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

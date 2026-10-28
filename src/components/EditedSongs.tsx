'use client';

import { useEffect, useState } from 'react';
import { Disc3, Download, ExternalLink, Music2, Search, X } from 'lucide-react';

interface EditedSong {
  id: string;
  title: string;
  originalArtist: string;
  genre: string;
  quality: string;
  link: string;
  border: string;
}

const editedSongs: EditedSong[] = [
  {
    id: '1',
    title: 'Astaga Bercanda',
    originalArtist: 'Mingse, Akbar Chalay',
    genre: 'Bounce',
    quality: 'WAV',
    link: 'https://drive.google.com/file/d/1CewJEqndnuiyut7k0_y-QvuDDGFQDFg2/view?usp=sharing',
    border: 'border-amber-400/25',
  },
  {
    id: '2',
    title: 'This Is What You Came For (Outro Edit)',
    originalArtist: 'Calvin Harris feat. Rihanna',
    genre: 'Dance-Pop',
    quality: 'MP3 (320Kbps)',
    link: 'https://drive.google.com/file/d/1j5lxmkLbsM43tFEh10YuNm0x3rv0H8Eu/view?usp=drive_link',
    border: 'border-stone-400/25',
  },
  {
    id: '3',
    title: 'Not Like Us',
    originalArtist: 'Kendrick Lamar',
    genre: 'UK Garage (UKG)',
    quality: 'WAV',
    link: 'https://soundcloud.com',
    border: 'border-slate-400/25',
  },
  {
    id: '4',
    title: 'Doja',
    originalArtist: 'Central Cee',
    genre: 'Indo Bounce',
    quality: 'MP3 (320Kbps)',
    link: 'https://soundcloud.com',
    border: 'border-amber-400/25',
  },
  {
    id: '5',
    title: 'Snooze',
    originalArtist: 'SZA',
    genre: 'Bassline Bounce',
    quality: 'WAV',
    link: 'https://soundcloud.com',
    border: 'border-stone-400/25',
  },
  {
    id: '6',
    title: 'FE!N',
    originalArtist: 'Travis Scott ft. Playboi Carti',
    genre: 'Jersey Club',
    quality: 'MP3 (320Kbps)',
    link: 'https://soundcloud.com',
    border: 'border-slate-400/25',
  },
];

export default function EditedSongs() {
  const [selectedSong, setSelectedSong] = useState<EditedSong | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = editedSongs.filter((song) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      song.title.toLowerCase().includes(q) ||
      song.originalArtist.toLowerCase().includes(q) ||
      song.genre.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (selectedSong) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSong]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSong(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="edited-songs"
      className="relative overflow-hidden bg-slate-950 pt-10 sm:pt-14 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 sm:mb-8 max-w-3xl text-center">
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

        {/* Search Bar */}
        <div className="mx-auto mb-6 sm:mb-8 max-w-md">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-amber-200/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, artist, or genre..."
              aria-label="Search edited songs"
              className="w-full rounded-xl border border-amber-400/25 bg-slate-900/60 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition focus:border-amber-400/60 focus:bg-slate-900/90 focus:ring-1 focus:ring-amber-400/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 rounded-md p-1 text-slate-400 transition hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {filteredSongs.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className={`glass-panel group flex flex-col justify-between rounded-2xl border ${song.border} bg-slate-900/40 p-3 sm:p-4 transition duration-300 hover:-translate-y-1 hover:border-amber-400/35 hover:shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl border border-white/10 bg-slate-950/80 text-amber-200 transition group-hover:text-amber-100">
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
                      {song.originalArtist}
                    </p>
                    <p className="mt-1 text-[10px] sm:text-[11px] font-medium text-amber-200/90">
                      Quality: {song.quality}
                    </p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex items-center justify-center border-t border-white/5 pt-2.5 sm:pt-3 text-[11px] sm:text-xs text-slate-400">
                  <button
                    type="button"
                    onClick={() => setSelectedSong(song)}
                    className="inline-flex items-center gap-1 font-semibold text-white transition hover:text-amber-200"
                  >
                    <Download className="h-3 w-3 text-amber-300" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-slate-900/40 p-8 text-center">
            <p className="text-xs sm:text-sm text-slate-400">
              No tracks found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs font-semibold text-amber-200 underline underline-offset-4 hover:text-white"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Modal Track Details */}
      {selectedSong && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedSong(null)}
        >
          <div
            className="glass-panel relative w-full max-w-md rounded-2xl border border-amber-400/30 bg-slate-900/95 p-5 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedSong(null)}
              aria-label="Close dialog"
              className="absolute right-4 top-4 rounded-lg border border-white/10 bg-slate-950/80 p-1.5 text-slate-400 transition hover:border-amber-400/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-950/80 text-amber-200">
                <Disc3 className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-200">
                {selectedSong.genre}
              </span>
            </div>

            {/* Song details */}
            <div className="mt-4 space-y-1.5">
              <h3 className="text-lg sm:text-xl font-extrabold text-white break-words">
                {selectedSong.title}
              </h3>
              <p className="text-sm font-medium text-slate-300 break-words">
                {selectedSong.originalArtist}
              </p>
              <div className="pt-2">
                <span className="inline-block rounded-md border border-white/10 bg-slate-950/70 px-2.5 py-1 text-xs font-medium text-amber-200/90">
                  Quality: {selectedSong.quality}
                </span>
              </div>
            </div>

            {/* CTA Download button */}
            <div className="mt-6">
              <a
                href={selectedSong.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 shadow-lg transition hover:bg-amber-300 hover:shadow-amber-400/20"
              >
                <Download className="h-4 w-4" />
                Download Track
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

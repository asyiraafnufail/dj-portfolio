'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Disc3,
  ExternalLink,
  Flame,
  FolderArchive,
  GripVertical,
  LogOut,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
  Youtube,
} from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';

type Tab = 'songs' | 'mixtapes' | 'venues' | 'genres' | 'settings';

const QUALITY_OPTIONS = [
  { label: 'WAV', value: 'WAV' },
  { label: 'MP3 (320Kbps)', value: 'MP3 (320Kbps)' },
];

const VENUE_ICON_OPTIONS = [
  { label: 'Bar / Wine', value: 'Wine' },
  { label: 'Lounge / Martini', value: 'Martini' },
  { label: 'Coffee Shop', value: 'Coffee' },
  { label: 'Billiard / Club', value: 'CircleDot' },
  { label: 'Gym / Sport', value: 'Dumbbell' },
];

const GENRE_ICON_OPTIONS = [
  { label: 'Zap (Energy / Electronic)', value: 'Zap' },
  { label: 'Disc (House / Techno)', value: 'Disc' },
  { label: 'Waves (Afro / Bounce)', value: 'Waves' },
  { label: 'Radio (R&B / Breakbeat)', value: 'Radio' },
  { label: 'CircleDot (Amapiano / Club)', value: 'CircleDot' },
];

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-left text-xs sm:text-sm text-white outline-none transition focus:border-amber-400/50 cursor-pointer"
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder || value}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? 'rotate-180 text-amber-300' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-y-auto rounded-xl border border-amber-400/25 bg-slate-900 p-1 shadow-2xl backdrop-blur-md">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs sm:text-sm transition text-left ${
                opt.value === value
                  ? 'bg-amber-400/15 font-semibold text-amber-200'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{opt.label}</span>
              {opt.value === value && <Check className="h-3.5 w-3.5 text-amber-300" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface Venue {
  id: string;
  name: string;
  city: string;
  icon: string;
  tone: string;
  sort_order: number;
}

interface Genre {
  id: string;
  title: string;
  icon: string;
  tone: string;
  sort_order: number;
}

interface Mixtape {
  id: string;
  title: string;
  embed_url: string;
  youtube_url: string;
  border: string;
  sort_order: number;
}

interface EditedSong {
  id: string;
  title: string;
  original_artist: string;
  genre: string;
  quality: string;
  link: string;
  border: string;
  sort_order: number;
}

interface SiteSettings {
  id: string;
  google_drive_url: string;
  whatsapp_number: string;
  whatsapp_message: string;
  booking_email: string;
  location: string;
}

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<Tab>('songs');
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Data states
  const [songs, setSongs] = useState<EditedSong[]>([]);
  const [mixtapes, setMixtapes] = useState<Mixtape[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    id: 'general',
    google_drive_url: '',
    whatsapp_number: '',
    whatsapp_message: '',
    booking_email: '',
    location: '',
  });

  // New item form states
  const [newSong, setNewSong] = useState({
    title: '',
    original_artist: '',
    genre: 'Commercial EDM',
    quality: 'WAV',
    link: '',
  });

  const [newMixtape, setNewMixtape] = useState({
    title: '',
    embed_url: '',
    youtube_url: '',
  });

  const [newVenue, setNewVenue] = useState({
    name: '',
    city: 'Yogyakarta',
    icon: 'Coffee',
  });

  const [newGenre, setNewGenre] = useState({
    title: '',
    icon: 'Disc',
  });

  // Edit states
  const [editingSong, setEditingSong] = useState<EditedSong | null>(null);
  const [editingMixtape, setEditingMixtape] = useState<Mixtape | null>(null);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);

  // Drag and drop states
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.effectAllowed = 'move';
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = async (toIndex: number) => {
    if (draggedIndex === null || draggedIndex === toIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const fromIndex = draggedIndex;
    setDraggedIndex(null);
    setDragOverIndex(null);

    if (activeTab === 'songs') {
      const next = [...songs];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item);
      const updated = next.map((s, i) => ({ ...s, sort_order: i + 1 }));
      setSongs(updated);
      await Promise.all(
        updated.map((s) => supabase.from('edited_songs').update({ sort_order: s.sort_order }).eq('id', s.id))
      );
      showNotice('Tracks order saved!');
    } else if (activeTab === 'mixtapes') {
      const next = [...mixtapes];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item);
      const updated = next.map((m, i) => ({ ...m, sort_order: i + 1 }));
      setMixtapes(updated);
      await Promise.all(
        updated.map((m) => supabase.from('mixtapes').update({ sort_order: m.sort_order }).eq('id', m.id))
      );
      showNotice('Mixtapes order saved!');
    } else if (activeTab === 'venues') {
      const next = [...venues];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item);
      const updated = next.map((v, i) => ({ ...v, sort_order: i + 1 }));
      setVenues(updated);
      await Promise.all(
        updated.map((v) => supabase.from('venues').update({ sort_order: v.sort_order }).eq('id', v.id))
      );
      showNotice('Venues order saved!');
    } else if (activeTab === 'genres') {
      const next = [...genres];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item);
      const updated = next.map((g, i) => ({ ...g, sort_order: i + 1 }));
      setGenres(updated);
      await Promise.all(
        updated.map((g) => supabase.from('genres').update({ sort_order: g.sort_order }).eq('id', g.id))
      );
      showNotice('Genres order saved!');
    }
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (activeTab === 'songs') {
      if (targetIndex < 0 || targetIndex >= songs.length) return;
      const next = [...songs];
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item);
      const updated = next.map((s, i) => ({ ...s, sort_order: i + 1 }));
      setSongs(updated);
      await Promise.all(
        updated.map((s) => supabase.from('edited_songs').update({ sort_order: s.sort_order }).eq('id', s.id))
      );
      showNotice('Order updated!');
    } else if (activeTab === 'mixtapes') {
      if (targetIndex < 0 || targetIndex >= mixtapes.length) return;
      const next = [...mixtapes];
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item);
      const updated = next.map((m, i) => ({ ...m, sort_order: i + 1 }));
      setMixtapes(updated);
      await Promise.all(
        updated.map((m) => supabase.from('mixtapes').update({ sort_order: m.sort_order }).eq('id', m.id))
      );
      showNotice('Order updated!');
    } else if (activeTab === 'venues') {
      if (targetIndex < 0 || targetIndex >= venues.length) return;
      const next = [...venues];
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item);
      const updated = next.map((v, i) => ({ ...v, sort_order: i + 1 }));
      setVenues(updated);
      await Promise.all(
        updated.map((v) => supabase.from('venues').update({ sort_order: v.sort_order }).eq('id', v.id))
      );
      showNotice('Order updated!');
    } else if (activeTab === 'genres') {
      if (targetIndex < 0 || targetIndex >= genres.length) return;
      const next = [...genres];
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item);
      const updated = next.map((g, i) => ({ ...g, sort_order: i + 1 }));
      setGenres(updated);
      await Promise.all(
        updated.map((g) => supabase.from('genres').update({ sort_order: g.sort_order }).eq('id', g.id))
      );
      showNotice('Order updated!');
    }
  };

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    const [sRes, mRes, vRes, gRes, setRes] = await Promise.all([
      supabase.from('edited_songs').select('*').order('sort_order', { ascending: true }),
      supabase.from('mixtapes').select('*').order('sort_order', { ascending: true }),
      supabase.from('venues').select('*').order('sort_order', { ascending: true }),
      supabase.from('genres').select('*').order('sort_order', { ascending: true }),
      supabase.from('site_settings').select('*').eq('id', 'general').maybeSingle(),
    ]);

    if (sRes.data) setSongs(sRes.data);
    if (mRes.data) setMixtapes(mRes.data);
    if (vRes.data) setVenues(vRes.data);
    if (gRes.data) setGenres(gRes.data);
    if (setRes.data) setSettings(setRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  // --- Edited Song Handlers ---
  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSong.title || !newSong.link) return;

    const { error } = await supabase.from('edited_songs').insert({
      title: newSong.title,
      original_artist: newSong.original_artist || 'Original',
      genre: newSong.genre,
      quality: newSong.quality,
      link: newSong.link,
      border: 'border-amber-400/25',
      sort_order: songs.length + 1,
    });

    if (error) {
      alert(error.message);
    } else {
      setNewSong({ title: '', original_artist: '', genre: 'Commercial EDM', quality: 'WAV', link: '' });
      showNotice('Song added successfully!');
      fetchData();
    }
  };

  const handleDeleteSong = async (id: string) => {
    if (!confirm('Are you sure you want to delete this track?')) return;
    const { error } = await supabase.from('edited_songs').delete().eq('id', id);
    if (error) alert(error.message);
    else {
      showNotice('Song deleted.');
      setSongs(songs.filter((s) => s.id !== id));
    }
  };

  const handleUpdateSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSong) return;
    const { error } = await supabase
      .from('edited_songs')
      .update({
        title: editingSong.title,
        original_artist: editingSong.original_artist,
        genre: editingSong.genre,
        quality: editingSong.quality,
        link: editingSong.link,
      })
      .eq('id', editingSong.id);

    if (error) alert(error.message);
    else {
      showNotice('Song updated successfully!');
      setEditingSong(null);
      fetchData();
    }
  };

  // --- Mixtape Handlers ---
  const handleAddMixtape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMixtape.title || !newMixtape.embed_url) return;

    const { error } = await supabase.from('mixtapes').insert({
      title: newMixtape.title,
      embed_url: newMixtape.embed_url,
      youtube_url: newMixtape.youtube_url || newMixtape.embed_url,
      border: 'border-amber-400/25',
      sort_order: mixtapes.length + 1,
    });

    if (error) alert(error.message);
    else {
      setNewMixtape({ title: '', embed_url: '', youtube_url: '' });
      showNotice('Mixtape added!');
      fetchData();
    }
  };

  const handleDeleteMixtape = async (id: string) => {
    if (!confirm('Delete this mixtape?')) return;
    const { error } = await supabase.from('mixtapes').delete().eq('id', id);
    if (error) alert(error.message);
    else {
      showNotice('Mixtape deleted.');
      setMixtapes(mixtapes.filter((m) => m.id !== id));
    }
  };

  const handleUpdateMixtape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMixtape) return;
    const { error } = await supabase
      .from('mixtapes')
      .update({
        title: editingMixtape.title,
        embed_url: editingMixtape.embed_url,
        youtube_url: editingMixtape.youtube_url,
      })
      .eq('id', editingMixtape.id);

    if (error) alert(error.message);
    else {
      showNotice('Mixtape updated successfully!');
      setEditingMixtape(null);
      fetchData();
    }
  };

  // --- Venue Handlers ---
  const handleAddVenue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVenue.name) return;

    const { error } = await supabase.from('venues').insert({
      name: newVenue.name,
      city: newVenue.city,
      icon: newVenue.icon,
      tone: 'border-slate-400/25',
      sort_order: venues.length + 1,
    });

    if (error) alert(error.message);
    else {
      setNewVenue({ name: '', city: 'Yogyakarta', icon: 'Coffee' });
      showNotice('Venue added!');
      fetchData();
    }
  };

  const handleDeleteVenue = async (id: string) => {
    if (!confirm('Delete this venue?')) return;
    const { error } = await supabase.from('venues').delete().eq('id', id);
    if (error) alert(error.message);
    else {
      showNotice('Venue deleted.');
      setVenues(venues.filter((v) => v.id !== id));
    }
  };

  const handleUpdateVenue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVenue) return;
    const { error } = await supabase
      .from('venues')
      .update({
        name: editingVenue.name,
        city: editingVenue.city,
        icon: editingVenue.icon,
      })
      .eq('id', editingVenue.id);

    if (error) alert(error.message);
    else {
      showNotice('Venue updated successfully!');
      setEditingVenue(null);
      fetchData();
    }
  };

  // --- Genre Handlers ---
  const handleAddGenre = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGenre.title) return;

    const { error } = await supabase.from('genres').insert({
      title: newGenre.title,
      icon: newGenre.icon,
      tone: 'border-amber-400/25',
      sort_order: genres.length + 1,
    });

    if (error) alert(error.message);
    else {
      setNewGenre({ title: '', icon: 'Disc' });
      showNotice('Genre added!');
      fetchData();
    }
  };

  const handleDeleteGenre = async (id: string) => {
    if (!confirm('Delete this genre?')) return;
    const { error } = await supabase.from('genres').delete().eq('id', id);
    if (error) alert(error.message);
    else {
      showNotice('Genre deleted.');
      setGenres(genres.filter((g) => g.id !== id));
    }
  };

  const handleUpdateGenre = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGenre) return;
    const { error } = await supabase
      .from('genres')
      .update({
        title: editingGenre.title,
        icon: editingGenre.icon,
      })
      .eq('id', editingGenre.id);

    if (error) alert(error.message);
    else {
      showNotice('Genre updated successfully!');
      setEditingGenre(null);
      fetchData();
    }
  };

  // --- Settings Handler ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('site_settings').upsert({
      id: 'general',
      google_drive_url: settings.google_drive_url,
      whatsapp_number: settings.whatsapp_number,
      whatsapp_message: settings.whatsapp_message,
      booking_email: settings.booking_email,
      location: settings.location,
      updated_at: new Date().toISOString(),
    });

    if (error) alert(error.message);
    else showNotice('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
              CANKZ CMS
            </span>
            <span className="hidden text-xs text-slate-400 sm:inline">Portfolio Admin</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-amber-400/35 hover:text-white"
            >
              Live Site
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Notice Toast */}
      {notice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-amber-400/40 bg-slate-900 px-4 py-3 text-xs font-bold text-amber-200 shadow-2xl">
          <Check className="h-4 w-4 text-amber-300" />
          {notice}
        </div>
      )}

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 sm:pb-12">
        {/* Navigation Tabs */}
        <div className="no-scrollbar mb-6 sm:mb-8 flex items-center gap-2 overflow-x-auto border-b border-white/10 py-3.5 sm:py-4">
          <button
            type="button"
            onClick={() => setActiveTab('songs')}
            className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition ${
              activeTab === 'songs'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Disc3 className="h-4 w-4 shrink-0" />
            Edited Songs ({songs.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mixtapes')}
            className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition ${
              activeTab === 'mixtapes'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Youtube className="h-4 w-4 shrink-0" />
            Mixtapes ({mixtapes.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('venues')}
            className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition ${
              activeTab === 'venues'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Flame className="h-4 w-4 shrink-0" />
            Venues ({venues.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('genres')}
            className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition ${
              activeTab === 'genres'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Activity className="h-4 w-4 shrink-0" />
            Genres ({genres.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <FolderArchive className="h-4 w-4 shrink-0" />
            Site Settings
          </button>
        </div>

        {/* Tab 1: EDITED SONGS */}
        {activeTab === 'songs' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Add New Song Card */}
            <div className="glass-panel rounded-2xl border border-amber-400/25 bg-slate-900/60 p-5 sm:p-6 shadow-xl">
              <h2 className="mb-4 text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Plus className="h-4 w-4 text-amber-300" /> Add New Edited Track
              </h2>
              <form onSubmit={handleAddSong} className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Track Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Astaga Bercanda"
                    value={newSong.title}
                    onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Original Artist</label>
                  <input
                    type="text"
                    placeholder="e.g. Mingse, Akbar Chalay"
                    value={newSong.original_artist}
                    onChange={(e) => setNewSong({ ...newSong, original_artist: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Genre</label>
                  <input
                    type="text"
                    placeholder="e.g. Bounce / Afro House"
                    value={newSong.genre}
                    onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Quality</label>
                  <CustomSelect
                    value={newSong.quality}
                    onChange={(val) => setNewSong({ ...newSong, quality: val })}
                    options={QUALITY_OPTIONS}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Download / Google Drive Link</label>
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/..."
                    value={newSong.link}
                    onChange={(e) => setNewSong({ ...newSong, link: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-3 mt-1 pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-300 shadow-md transition"
                  >
                    <Plus className="h-4 w-4" /> Save Track
                  </button>
                </div>
              </form>
            </div>

            {/* List Songs */}
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5 border-b border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Tracks ({songs.length})</h3>
                <span className="flex items-center gap-1.5 text-[11px] text-amber-200/80">
                  <GripVertical className="h-3.5 w-3.5" /> Drag or use ▲▼ arrows to reorder
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {songs.map((song, index) => (
                  <div
                    key={song.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onDrop={() => handleDrop(index)}
                    className={`glass-panel flex items-center justify-between gap-3 rounded-2xl border bg-slate-900/40 p-3.5 transition duration-150 ${
                      draggedIndex === index
                        ? 'opacity-40 border-amber-400/50 border-dashed scale-[0.98]'
                        : dragOverIndex === index
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex items-center gap-0.5 shrink-0 text-slate-500">
                        <div className="flex flex-col -space-y-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveItem(index, 'up');
                            }}
                            className="rounded p-0.5 hover:text-amber-300 disabled:opacity-20 disabled:hover:text-slate-500 transition"
                            title="Move up"
                          >
                            <ChevronUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === songs.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveItem(index, 'down');
                            }}
                            className="rounded p-0.5 hover:text-amber-300 disabled:opacity-20 disabled:hover:text-slate-500 transition"
                            title="Move down"
                          >
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </div>
                        <div
                          className="cursor-grab active:cursor-grabbing p-1 hover:text-amber-300 shrink-0"
                          title="Drag to reorder"
                        >
                          <GripVertical className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-bold text-white">{song.title}</span>
                          <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-200 shrink-0">
                            {song.genre}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate">{song.original_artist}</p>
                        <p className="text-[11px] text-amber-200/80">Quality: {song.quality}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingSong(song)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-amber-400/10 hover:text-amber-300 transition"
                        aria-label="Edit song"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSong(song.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
                        aria-label="Delete song"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: MIXTAPES */}
        {activeTab === 'mixtapes' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Add New Mixtape */}
            <div className="glass-panel rounded-2xl border border-amber-400/25 bg-slate-900/60 p-5 sm:p-6 shadow-xl">
              <h2 className="mb-4 text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Plus className="h-4 w-4 text-amber-300" /> Add YouTube Mixtape
              </h2>
              <form onSubmit={handleAddMixtape} className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Set Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CANKZ - 2016 VIBES"
                    value={newMixtape.title}
                    onChange={(e) => setNewMixtape({ ...newMixtape, title: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Embed URL (https://www.youtube.com/embed/...)</label>
                  <input
                    type="url"
                    required
                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                    value={newMixtape.embed_url}
                    onChange={(e) => setNewMixtape({ ...newMixtape, embed_url: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Watch Link (https://youtu.be/...)</label>
                  <input
                    type="url"
                    placeholder="https://youtu.be/VIDEO_ID"
                    value={newMixtape.youtube_url}
                    onChange={(e) => setNewMixtape({ ...newMixtape, youtube_url: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
                <div className="sm:col-span-2 mt-1 pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-300 shadow-md transition"
                  >
                    <Plus className="h-4 w-4" /> Save Mixtape
                  </button>
                </div>
              </form>
            </div>

            {/* List Mixtapes */}
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5 border-b border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Sets ({mixtapes.length})</h3>
                <span className="flex items-center gap-1.5 text-[11px] text-amber-200/80">
                  <GripVertical className="h-3.5 w-3.5" /> Drag or use ▲▼ arrows to reorder
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {mixtapes.map((mix, index) => (
                  <div
                    key={mix.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onDrop={() => handleDrop(index)}
                    className={`glass-panel flex items-center justify-between gap-3 rounded-2xl border bg-slate-900/40 p-3.5 transition duration-150 ${
                      draggedIndex === index
                        ? 'opacity-40 border-amber-400/50 border-dashed scale-[0.98]'
                        : dragOverIndex === index
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex items-center gap-0.5 shrink-0 text-slate-500">
                        <div className="flex flex-col -space-y-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveItem(index, 'up');
                            }}
                            className="rounded p-0.5 hover:text-amber-300 disabled:opacity-20 disabled:hover:text-slate-500 transition"
                            title="Move up"
                          >
                            <ChevronUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === mixtapes.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveItem(index, 'down');
                            }}
                            className="rounded p-0.5 hover:text-amber-300 disabled:opacity-20 disabled:hover:text-slate-500 transition"
                            title="Move down"
                          >
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </div>
                        <div
                          className="cursor-grab active:cursor-grabbing p-1 hover:text-amber-300 shrink-0"
                          title="Drag to reorder"
                        >
                          <GripVertical className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">{mix.title}</p>
                        <p className="text-xs text-slate-400 truncate">{mix.embed_url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingMixtape(mix)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-amber-400/10 hover:text-amber-300 transition"
                        aria-label="Edit mixtape"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMixtape(mix.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
                        aria-label="Delete mixtape"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: VENUES */}
        {activeTab === 'venues' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="glass-panel rounded-2xl border border-amber-400/25 bg-slate-900/60 p-5 sm:p-6 shadow-xl">
              <h2 className="mb-4 text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Plus className="h-4 w-4 text-amber-300" /> Add Venue / Gig
              </h2>
              <form onSubmit={handleAddVenue} className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Venue / Club Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Club Dragonfly"
                    value={newVenue.name}
                    onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">City / Region</label>
                  <input
                    type="text"
                    placeholder="e.g. Sleman / Yogyakarta"
                    value={newVenue.city}
                    onChange={(e) => setNewVenue({ ...newVenue, city: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Icon Type</label>
                  <CustomSelect
                    value={newVenue.icon}
                    onChange={(val) => setNewVenue({ ...newVenue, icon: val })}
                    options={VENUE_ICON_OPTIONS}
                  />
                </div>
                <div className="sm:col-span-3 mt-1 pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-300 shadow-md transition"
                  >
                    <Plus className="h-4 w-4" /> Save Venue
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5 border-b border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Venues ({venues.length})</h3>
                <span className="flex items-center gap-1.5 text-[11px] text-amber-200/80">
                  <GripVertical className="h-3.5 w-3.5" /> Drag or use ▲▼ arrows to reorder
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {venues.map((venue, index) => (
                  <div
                    key={venue.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onDrop={() => handleDrop(index)}
                    className={`glass-panel flex items-center justify-between gap-3 rounded-2xl border bg-slate-900/40 p-3.5 transition duration-150 ${
                      draggedIndex === index
                        ? 'opacity-40 border-amber-400/50 border-dashed scale-[0.98]'
                        : dragOverIndex === index
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex items-center gap-0.5 shrink-0 text-slate-500">
                        <div className="flex flex-col -space-y-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveItem(index, 'up');
                            }}
                            className="rounded p-0.5 hover:text-amber-300 disabled:opacity-20 disabled:hover:text-slate-500 transition"
                            title="Move up"
                          >
                            <ChevronUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === venues.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveItem(index, 'down');
                            }}
                            className="rounded p-0.5 hover:text-amber-300 disabled:opacity-20 disabled:hover:text-slate-500 transition"
                            title="Move down"
                          >
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </div>
                        <div
                          className="cursor-grab active:cursor-grabbing p-1 hover:text-amber-300 shrink-0"
                          title="Drag to reorder"
                        >
                          <GripVertical className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">{venue.name}</p>
                        <p className="text-xs text-slate-400 truncate">{venue.city} • Icon: {venue.icon}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingVenue(venue)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-amber-400/10 hover:text-amber-300 transition"
                        aria-label="Edit venue"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteVenue(venue.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
                        aria-label="Delete venue"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: GENRES */}
        {activeTab === 'genres' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="glass-panel rounded-2xl border border-amber-400/25 bg-slate-900/60 p-5 sm:p-6 shadow-xl">
              <h2 className="mb-4 text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Plus className="h-4 w-4 text-amber-300" /> Add New Genre
              </h2>
              <form onSubmit={handleAddGenre} className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Genre Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deep House"
                    value={newGenre.title}
                    onChange={(e) => setNewGenre({ ...newGenre, title: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Icon</label>
                  <CustomSelect
                    value={newGenre.icon}
                    onChange={(val) => setNewGenre({ ...newGenre, icon: val })}
                    options={GENRE_ICON_OPTIONS}
                  />
                </div>
                <div className="sm:col-span-2 mt-1 pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-300 shadow-md transition"
                  >
                    <Plus className="h-4 w-4" /> Save Genre
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5 border-b border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Genres ({genres.length})</h3>
                <span className="flex items-center gap-1.5 text-[11px] text-amber-200/80">
                  <GripVertical className="h-3.5 w-3.5" /> Drag or use ▲▼ arrows to reorder
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {genres.map((genre, index) => (
                  <div
                    key={genre.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    onDrop={() => handleDrop(index)}
                    className={`glass-panel flex items-center justify-between gap-3 rounded-2xl border bg-slate-900/40 p-3.5 transition duration-150 ${
                      draggedIndex === index
                        ? 'opacity-40 border-amber-400/50 border-dashed scale-[0.98]'
                        : dragOverIndex === index
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex items-center gap-0.5 shrink-0 text-slate-500">
                        <div className="flex flex-col -space-y-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveItem(index, 'up');
                            }}
                            className="rounded p-0.5 hover:text-amber-300 disabled:opacity-20 disabled:hover:text-slate-500 transition"
                            title="Move up"
                          >
                            <ChevronUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === genres.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveItem(index, 'down');
                            }}
                            className="rounded p-0.5 hover:text-amber-300 disabled:opacity-20 disabled:hover:text-slate-500 transition"
                            title="Move down"
                          >
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </div>
                        <div
                          className="cursor-grab active:cursor-grabbing p-1 hover:text-amber-300 shrink-0"
                          title="Drag to reorder"
                        >
                          <GripVertical className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">{genre.title}</p>
                        <p className="text-xs text-slate-400 truncate">Icon: {genre.icon}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingGenre(genre)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-amber-400/10 hover:text-amber-300 transition"
                        aria-label="Edit genre"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteGenre(genre.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
                        aria-label="Delete genre"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="glass-panel max-w-2xl rounded-2xl border border-amber-400/25 bg-slate-900/60 p-5 sm:p-6 shadow-xl">
            <h2 className="mb-4 text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <FolderArchive className="h-4 w-4 text-amber-300" /> Contact &amp; Asset Settings
            </h2>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Google Drive Folder URL (Promotional Assets &amp; Flyers)
                </label>
                <input
                  type="url"
                  value={settings.google_drive_url}
                  onChange={(e) => setSettings({ ...settings, google_drive_url: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  WhatsApp Booking Number
                </label>
                <input
                  type="text"
                  value={settings.whatsapp_number}
                  onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                  placeholder="+628174957733"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  WhatsApp Default Message
                </label>
                <input
                  type="text"
                  value={settings.whatsapp_message}
                  onChange={(e) => setSettings({ ...settings, whatsapp_message: e.target.value })}
                  placeholder="Hi CANKZ, I want to book an event."
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Booking Email Address
                </label>
                <input
                  type="email"
                  value={settings.booking_email}
                  onChange={(e) => setSettings({ ...settings, booking_email: e.target.value })}
                  placeholder="contactcankz@gmail.com"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Artist Location
                </label>
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  placeholder="Sleman, Yogyakarta"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                />
              </div>

              <div className="mt-1 pt-2 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-300 shadow-md transition"
                >
                  <Save className="h-4 w-4" /> Save Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal: Edit Song */}
        {editingSong && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
            onClick={() => setEditingSong(null)}
          >
            <div
              className="glass-panel relative w-full max-w-lg rounded-2xl border border-amber-400/30 bg-slate-900/95 p-5 sm:p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Pencil className="h-4 w-4 text-amber-300" /> Edit Track
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingSong(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleUpdateSong} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Song Title</label>
                  <input
                    type="text"
                    required
                    value={editingSong.title}
                    onChange={(e) => setEditingSong({ ...editingSong, title: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white outline-none transition focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Original Artist</label>
                  <input
                    type="text"
                    required
                    value={editingSong.original_artist}
                    onChange={(e) => setEditingSong({ ...editingSong, original_artist: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white outline-none transition focus:border-amber-400/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Genre</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bounce / Afro House"
                      value={editingSong.genre}
                      onChange={(e) => setEditingSong({ ...editingSong, genre: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-400/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Quality</label>
                    <CustomSelect
                      value={editingSong.quality}
                      onChange={(val) => setEditingSong({ ...editingSong, quality: val })}
                      options={QUALITY_OPTIONS}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Download / Drive Link</label>
                  <input
                    type="url"
                    required
                    value={editingSong.link}
                    onChange={(e) => setEditingSong({ ...editingSong, link: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white outline-none transition focus:border-amber-400/50"
                  />
                </div>

                <div className="pt-3 mt-1 border-t border-white/5 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSong(null)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-400 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-300 shadow-md transition"
                  >
                    Update Track
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Mixtape */}
        {editingMixtape && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
            onClick={() => setEditingMixtape(null)}
          >
            <div
              className="glass-panel relative w-full max-w-lg rounded-2xl border border-amber-400/30 bg-slate-900/95 p-5 sm:p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Pencil className="h-4 w-4 text-amber-300" /> Edit YouTube Mixtape
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingMixtape(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleUpdateMixtape} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Set Title</label>
                  <input
                    type="text"
                    required
                    value={editingMixtape.title}
                    onChange={(e) => setEditingMixtape({ ...editingMixtape, title: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white outline-none transition focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Embed URL</label>
                  <input
                    type="url"
                    required
                    value={editingMixtape.embed_url}
                    onChange={(e) => setEditingMixtape({ ...editingMixtape, embed_url: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white outline-none transition focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Watch Link</label>
                  <input
                    type="url"
                    value={editingMixtape.youtube_url}
                    onChange={(e) => setEditingMixtape({ ...editingMixtape, youtube_url: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white outline-none transition focus:border-amber-400/50"
                  />
                </div>

                <div className="pt-3 mt-1 border-t border-white/5 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingMixtape(null)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-400 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-300 shadow-md transition"
                  >
                    Update Mixtape
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Venue */}
        {editingVenue && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
            onClick={() => setEditingVenue(null)}
          >
            <div
              className="glass-panel relative w-full max-w-lg rounded-2xl border border-amber-400/30 bg-slate-900/95 p-5 sm:p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Pencil className="h-4 w-4 text-amber-300" /> Edit Venue
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingVenue(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleUpdateVenue} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Venue / Club Name</label>
                  <input
                    type="text"
                    required
                    value={editingVenue.name}
                    onChange={(e) => setEditingVenue({ ...editingVenue, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white outline-none transition focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">City / Region</label>
                  <input
                    type="text"
                    value={editingVenue.city}
                    onChange={(e) => setEditingVenue({ ...editingVenue, city: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white outline-none transition focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Icon Type</label>
                  <CustomSelect
                    value={editingVenue.icon}
                    onChange={(val) => setEditingVenue({ ...editingVenue, icon: val })}
                    options={VENUE_ICON_OPTIONS}
                  />
                </div>

                <div className="pt-3 mt-1 border-t border-white/5 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingVenue(null)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-400 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-300 shadow-md transition"
                  >
                    Update Venue
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Genre */}
        {editingGenre && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
            onClick={() => setEditingGenre(null)}
          >
            <div
              className="glass-panel relative w-full max-w-lg rounded-2xl border border-amber-400/30 bg-slate-900/95 p-5 sm:p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Pencil className="h-4 w-4 text-amber-300" /> Edit Genre
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingGenre(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleUpdateGenre} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Genre Name</label>
                  <input
                    type="text"
                    required
                    value={editingGenre.title}
                    onChange={(e) => setEditingGenre({ ...editingGenre, title: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white outline-none transition focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Icon</label>
                  <CustomSelect
                    value={editingGenre.icon}
                    onChange={(val) => setEditingGenre({ ...editingGenre, icon: val })}
                    options={GENRE_ICON_OPTIONS}
                  />
                </div>

                <div className="pt-3 mt-1 border-t border-white/5 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingGenre(null)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-400 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-300 shadow-md transition"
                  >
                    Update Genre
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Camera, Maximize2, X } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';

interface StagePhoto {
  id: string;
  imageUrl: string;
}

const defaultPhotos: StagePhoto[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80',
  },
];

interface StageArchiveProps {
  isPage?: boolean;
}

export default function StageArchive({ isPage = false }: StageArchiveProps) {
  const [photos, setPhotos] = useState<StagePhoto[]>(defaultPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<StagePhoto | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('stage_photos')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setPhotos(
            data.map((d) => ({
              id: d.id,
              imageUrl: d.image_url || d.imageUrl,
            }))
          );
        }
      });
  }, []);

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const displayedPhotos = isPage ? photos : photos.slice(0, 4);

  return (
    <section
      id="stage-archive"
      className={`relative overflow-hidden bg-slate-950 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16 ${
        isPage ? 'pt-4 sm:pt-6' : 'pt-10 sm:pt-14'
      }`}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-6 sm:mb-8 max-w-3xl text-center">
          {!isPage && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
              <Camera className="h-3.5 w-3.5 text-amber-300" /> Live Moments
            </div>
          )}
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Stage Archive
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-slate-400 sm:text-lg">
            Raw energy, crowd connection, and stage presence captured across recent gigs.
          </p>
        </div>

        {/* 2-Column Photo Grid Lock (3:4 Portrait Aspect Ratio) */}
        <div className="mx-auto max-w-4xl grid grid-cols-2 gap-3 sm:gap-5">
          {displayedPhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              aria-label="View photo in full size"
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 transition duration-300 hover:-translate-y-1 hover:border-amber-400/35 hover:shadow-xl focus:outline-none focus:ring-1 focus:ring-amber-400/50"
            >
              <Image
                src={photo.imageUrl}
                alt="DJ CANKZ Stage Performance"
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 440px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Dark Vignette & Expand Icon */}
              <div className="absolute inset-0 bg-slate-950/0 transition-colors duration-300 group-hover:bg-slate-950/25" />
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-slate-950/80 text-slate-300 opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100 group-hover:text-amber-200">
                <Maximize2 className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>

        {/* View All Button - only shown on homepage preview */}
        {!isPage && (
          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              href="/gallery"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 shadow-lg transition hover:bg-amber-300 hover:shadow-amber-400/20"
            >
              <Camera className="h-4 w-4" />
              View All Photos
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative flex max-h-[90vh] max-w-xl flex-col items-center overflow-hidden rounded-2xl border border-amber-400/30 bg-slate-900 p-2 sm:p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo"
              className="absolute right-4 top-4 z-10 rounded-lg border border-white/10 bg-slate-950/80 p-1.5 text-slate-400 transition hover:border-amber-400/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Photo in 3:4 portrait */}
            <div className="relative aspect-[3/4] h-[75vh] max-h-[640px] w-auto overflow-hidden rounded-xl bg-slate-950">
              <Image
                src={selectedPhoto.imageUrl}
                alt="DJ CANKZ Stage Performance Full"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 90vw, 600px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

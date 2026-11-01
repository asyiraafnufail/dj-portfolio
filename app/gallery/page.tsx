import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import StageArchive from '@/src/components/StageArchive';
import { createClient } from '@/src/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Stage Archive & Photos | CANKZ',
  description: 'Live performance photos, booth moments, and stage presence of DJ CANKZ.',
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('stage_photos')
    .select('*')
    .order('sort_order', { ascending: true });

  const initialPhotos = (data || []).map((d) => ({
    id: d.id,
    imageUrl: d.image_url || d.imageUrl,
  }));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Back to Home Button (Option 2 - Static at top) */}
      <div className="pt-6 sm:pt-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#stage-archive"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-300 transition hover:border-amber-400/30 hover:text-amber-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-amber-300" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Gallery Section */}
      <StageArchive isPage={true} initialPhotos={initialPhotos} />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500">
        <p>© 2026 CANKZ. All rights reserved.</p>
      </footer>
    </main>
  );
}

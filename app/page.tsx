import AssetsFile from "@/src/components/AssetsFile";
import Contact from "@/src/components/Contact";
import EditedSongs from "@/src/components/EditedSongs";
import Experience from "@/src/components/Experience";
import Genres from "@/src/components/Genres";
import HeroAbout from "@/src/components/HeroAbout";
import Navbar from "@/src/components/Navbar";
import StageArchive from "@/src/components/StageArchive";
import YouTubePlayer from "@/src/components/YouTubePlayer";
import { createClient } from "@/src/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const [{ data: settingsData }, { data: photosData }] = await Promise.all([
    supabase.from('site_settings').select('hero_image_url').eq('id', 'general').maybeSingle(),
    supabase.from('stage_photos').select('*').order('sort_order', { ascending: true }).limit(4),
  ]);

  const initialHeroImage = settingsData?.hero_image_url || null;
  const initialPhotos = (photosData || []).map((d) => ({
    id: d.id,
    imageUrl: d.image_url || d.imageUrl,
  }));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <HeroAbout initialHeroImage={initialHeroImage} />
      <Genres />
      <Experience />
      <StageArchive initialPhotos={initialPhotos} />
      <YouTubePlayer />
      <EditedSongs />
      <AssetsFile />
      <Contact />
    </main>
  );
}

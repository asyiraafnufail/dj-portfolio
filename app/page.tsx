import AssetsFile from "@/src/components/AssetsFile";
import Contact from "@/src/components/Contact";
import EditedSongs from "@/src/components/EditedSongs";
import Experience from "@/src/components/Experience";
import Genres from "@/src/components/Genres";
import HeroAbout from "@/src/components/HeroAbout";
import Navbar from "@/src/components/Navbar";
import StageArchive from "@/src/components/StageArchive";
import YouTubePlayer from "@/src/components/YouTubePlayer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <HeroAbout />
      <Genres />
      <Experience />
      <StageArchive />
      <YouTubePlayer />
      <EditedSongs />
      <AssetsFile />
      <Contact />
    </main>
  );
}

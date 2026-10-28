'use client';

import { ExternalLink, FileText, FolderArchive, Image as ImageIcon, Sparkles } from 'lucide-react';

const assetItems = [
  {
    title: 'High-Res Photos',
    desc: 'Official portrait & stage photos for event flyers and promotional posters.',
    icon: ImageIcon,
    format: 'JPG / PNG',
    border: 'border-amber-400/25',
  },
  {
    title: 'Official Logos',
    desc: 'Transparent DJ CANKZ logos ready for club visual backgrounds & print designs.',
    icon: Sparkles,
    format: 'PNG / MP4',
    border: 'border-stone-400/25',
  },
];

export default function AssetsFile() {
  const driveUrl = 'https://drive.google.com/drive/folders/1xBZMS4b2Qhd0a0qb-IdmIKTD8HG1-fbz?usp=drive_link'; // Ganti dengan link Google Drive Anda

  return (
    <section
      id="assets-file"
      className="relative overflow-hidden bg-slate-950 pt-10 sm:pt-14 pb-16 sm:pb-24 scroll-mt-14 sm:scroll-mt-16"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 sm:mb-8 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
            <FolderArchive className="h-3.5 w-3.5 text-amber-300" /> Press Kit &amp; Media
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Assets File
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-slate-400 sm:text-lg">
            High-resolution artist photos and official logos for event flyers, club lineups, and promotional artwork.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-3 sm:space-y-5">
          {/* Electronic Press Kit (EPK) Horizontal Card */}
          <div className="glass-panel group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 rounded-2xl border border-amber-400/25 bg-slate-900/40 p-4 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-400/35 hover:shadow-xl">
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
              <div className="w-fit shrink-0 rounded-xl border border-white/10 bg-slate-950/80 p-2.5 sm:p-3 text-amber-200 transition group-hover:text-amber-100">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white transition group-hover:text-amber-100">
                    Electronic Press Kit (EPK)
                  </h3>
                  <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-amber-200">
                    PDF Document
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Full artist biography, sound profile, venue experiences, and technical / hospitality rider.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {assetItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`glass-panel group flex flex-col justify-between rounded-2xl border ${item.border} bg-slate-900/40 p-4 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-400/35 hover:shadow-xl`}
                >
                  <div>
                    <div className="mb-3 sm:mb-4 flex items-center justify-between">
                      <div className="w-fit rounded-xl border border-white/10 bg-slate-950/80 p-2 sm:p-2.5 text-amber-200 transition group-hover:text-amber-100">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-amber-200">
                        {item.format}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-white transition group-hover:text-amber-100">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-panel flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-amber-400/25 bg-slate-900/60 p-5 sm:p-6 text-center sm:text-left">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Download Promotional Assets
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Access official Google Drive folder.
              </p>
            </div>
            <a
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 shadow-lg transition hover:bg-amber-300 hover:shadow-amber-400/20"
            >
              <FolderArchive className="h-4 w-4" />
              Open Google Drive
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cankz.web.id"
  ),
  alternates: {
    canonical: "https://www.cankz.web.id",
  },
  title: {
    default: "CANKZ | DJ & Music Producer Yogyakarta",
    template: "%s | CANKZ",
  },
  description:
    "Official portfolio of DJ CANKZ (Rafa). Club sets, mixtapes, custom edits & booking desk in Sleman, Yogyakarta.",
  keywords: [
    "CANKZ",
    "DJ CANKZ",
    "Cankz DJ",
    "Rafa",
    "Rafa Cankz",
    "rafacankz",
    "@rafacankz",
    "DJ Yogyakarta",
    "DJ Sleman",
    "DJ Jogja",
    "Club DJ Jogja",
    "Booking DJ Jogja",
    "DJ Event Jogja",
    "cankz.web.id",
    "cankz.my.id",
    "Commercial EDM",
    "Custom Edits",
    "Bootlegs",
  ],
  authors: [{ name: "CANKZ", url: "https://www.cankz.web.id" }],
  creator: "CANKZ",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.cankz.web.id",
    title: "CANKZ | DJ & Music Producer Yogyakarta",
    description:
      "Official portfolio of DJ CANKZ (Rafa). Club sets, mixtapes, custom edits & booking desk in Sleman, Yogyakarta.",
    siteName: "DJ CANKZ Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "CANKZ | DJ & Music Producer Yogyakarta",
    description:
      "Official portfolio of DJ CANKZ (Rafa). Club sets, mixtapes, custom edits & booking desk in Sleman, Yogyakarta.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "8qnwel0OWWb660AUTFu5EqPvLM4zHC4m8MqpnpRcuCw",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Person", "MusicGroup"],
  name: "CANKZ",
  givenName: "Rafa",
  alternateName: [
    "DJ CANKZ",
    "Cankz",
    "Rafa",
    "Rafa Cankz",
    "rafacankz",
    "@rafacankz",
  ],
  url: "https://www.cankz.web.id",
  sameAs: [
    "https://instagram.com/rafacankz",
    "https://soundcloud.com/cankz-685282173",
    "https://tiktok.com/@rafanuf",
    "https://youtube.com/@rafacankz",
  ],
  description:
    "DJ & Music Producer based in Sleman, Yogyakarta. Stage name CANKZ (Rafa). Available for club bookings, festivals, and private events.",
  jobTitle: "DJ & Music Producer",
  genre: ["Commercial EDM", "Bass House", "Tech House", "Afrobeat", "Hip-Hop"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sleman",
    addressRegion: "Daerah Istimewa Yogyakarta",
    addressCountry: "ID",
  },
  knowsAbout: ["DJing", "Music Production", "Club Sets", "Audio Mixing"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

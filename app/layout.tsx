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
    process.env.NEXT_PUBLIC_SITE_URL || "https://cankz.vercel.app"
  ),
  title: {
    default: "CANKZ | DJ & Music Producer Yogyakarta",
    template: "%s | CANKZ",
  },
  description:
    "Official portfolio of DJ CANKZ. Club sets, mixtapes, custom edits & booking desk in Sleman, Yogyakarta.",
  keywords: [
    "DJ CANKZ",
    "DJ Yogyakarta",
    "DJ Sleman",
    "DJ Jogja",
    "Club DJ Jogja",
    "Booking DJ Jogja",
    "Commercial EDM",
    "Custom Edits",
    "Bootlegs",
  ],
  authors: [{ name: "CANKZ" }],
  creator: "CANKZ",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "CANKZ | DJ & Music Producer Yogyakarta",
    description:
      "Official portfolio of DJ CANKZ. Club sets, mixtapes, custom edits & booking desk in Sleman, Yogyakarta.",
    siteName: "DJ CANKZ Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "CANKZ | DJ & Music Producer Yogyakarta",
    description:
      "Official portfolio of DJ CANKZ. Club sets, mixtapes, custom edits & booking desk in Sleman, Yogyakarta.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Person", "MusicGroup"],
  name: "CANKZ",
  alternateName: ["DJ CANKZ", "Cankz"],
  description:
    "DJ & Music Producer based in Sleman, Yogyakarta. Available for club bookings, festivals, and private events.",
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

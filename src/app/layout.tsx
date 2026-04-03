import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "RampSeeker | Every Boat Ramp in Oklahoma — 261+ Boat Ramps Across 19 Lakes",
  description:
    "The most complete boat ramp directory in Oklahoma. 261+ ramps across 19 lakes including Grand Lake, Tenkiller, Eufaula, Keystone, Texoma, and more. GPS coordinates, amenities, local tips.",
  keywords:
    "Oklahoma boat ramp, boat ramp near me Oklahoma, Grand Lake boat ramp, boat launch Oklahoma, Oklahoma boat ramp directory",
  openGraph: {
    title: "RampSeeker | Every Boat Ramp in Oklahoma",
    description: "261+ boat ramps across 19 Oklahoma lakes. GPS coordinates, amenities, local tips.",
    url: "https://rampseeker.com",
    siteName: "RampSeeker",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "RampSeeker | Every Boat Ramp in Oklahoma",
    description: "261+ boat ramps across 19 Oklahoma lakes. GPS coordinates, amenities, local tips.",
  },
  alternates: { canonical: "https://rampseeker.com" },
};

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-[Cabin]">
          <span className="text-2xl">&#9875;</span>
          <span className="text-charcoal">Ramp<span className="text-water">Seeker</span></span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
          <Link href="/lakes" className="text-gray-500 hover:text-water transition">Lakes</Link>
          <Link href="/map" className="text-gray-500 hover:text-water transition">Map</Link>
          <Link href="/about" className="text-gray-500 hover:text-water transition hidden sm:block">About</Link>
          <a href="#submit" className="text-sunset font-bold hover:text-sunset-dark transition">Submit a Ramp</a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-gray-500">
          <div>
            <p className="font-bold text-charcoal mb-2 font-[Cabin]">&#9875; RampSeeker</p>
            <p>The most complete boat ramp directory in Oklahoma.</p>
          </div>
          <div>
            <p className="font-bold text-charcoal mb-2">Links</p>
            <div className="flex flex-col gap-1">
              <Link href="/" className="hover:text-water transition">All Ramps</Link>
              <Link href="/lakes" className="hover:text-water transition">Lakes</Link>
              <Link href="/map" className="hover:text-water transition">Map</Link>
              <Link href="/about" className="hover:text-water transition">About</Link>
              <Link href="/privacy" className="hover:text-water transition">Privacy</Link>
              <Link href="/terms" className="hover:text-water transition">Terms</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-charcoal mb-2">Know a ramp we missed?</p>
            <a href="mailto:hello@rampseeker.com" className="text-water hover:text-water-light transition">hello@rampseeker.com</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap justify-between items-center text-xs text-gray-400 gap-4">
          <span>&copy; {new Date().getFullYear()} RampSeeker. All rights reserved.</span>
          <span>A <a href="https://grandlakeai.com" target="_blank" className="text-water/70 hover:text-water transition">Grand Lake AI</a> project.</span>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Source_Sans_3'] antialiased min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

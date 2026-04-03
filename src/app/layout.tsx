import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "RampSeeker | Every Boat Ramp on Grand Lake Oklahoma",
  description:
    "The most complete boat ramp directory for Grand Lake O' the Cherokees. GPS coordinates, amenities, local tips, and directions for 23+ boat ramps.",
  keywords:
    "Grand Lake boat ramp, Grand Lake Oklahoma boat launch, where to launch boat Grand Lake, Grand Lake ramp directory, boat ramp near me Grand Lake",
  openGraph: {
    title: "RampSeeker | Every Boat Ramp on Grand Lake Oklahoma",
    description: "Find every boat ramp on Grand Lake. GPS coordinates, amenities, local tips.",
    url: "https://rampseeker.com",
    siteName: "RampSeeker",
    type: "website",
  },
};

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">&#9875;</span>
          <span className="text-white">Ramp<span className="text-water">Seeker</span></span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-slate-400 hover:text-water transition hidden sm:block">Home</Link>
          <Link href="/map" className="text-slate-400 hover:text-water transition">Map</Link>
          <Link href="/about" className="text-slate-400 hover:text-water transition">About</Link>
          <a href="#submit" className="text-water font-semibold hover:text-white transition">Submit a Ramp</a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-slate-500">
          <div>
            <p className="font-bold text-slate-300 mb-2">&#9875; RampSeeker</p>
            <p>The most complete boat ramp directory for Grand Lake O&apos; the Cherokees, Oklahoma.</p>
          </div>
          <div>
            <p className="font-bold text-slate-300 mb-2">Links</p>
            <div className="flex flex-col gap-1">
              <Link href="/" className="hover:text-water transition">All Ramps</Link>
              <Link href="/map" className="hover:text-water transition">Map</Link>
              <Link href="/about" className="hover:text-water transition">About</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-slate-300 mb-2">Know a ramp we missed?</p>
            <a href="mailto:hello@rampseeker.com" className="text-water hover:text-white transition">hello@rampseeker.com</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-slate-600 gap-4">
          <span>&copy; {new Date().getFullYear()} RampSeeker. All rights reserved.</span>
          <span>A <a href="https://grandlakeai.com" target="_blank" className="text-water/60 hover:text-water transition">Grand Lake AI</a> project.</span>
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
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-[Inter] antialiased min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

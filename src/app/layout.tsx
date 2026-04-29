import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import CletusWidget from "@/components/CletusWidget";
import CookieConsent from "@/components/CookieConsent";
import Nav from "@/components/Nav";
import { unified } from "@/data/all-ramps";
import rampTotals from "@/data/state-ramp-totals.json";
import "./globals.css";

const totalRamps = ((rampTotals as Record<string, number>)._network || unified.length).toLocaleString();

export const metadata: Metadata = {
  title: `RampSeeker | Every Boat Ramp in America — ${totalRamps}+ Launch Sites`,
  description:
    `Find boat ramps across the United States. ${totalRamps}+ ramps with GPS coordinates, amenities, and local tips. Detailed coverage for Oklahoma and Texas.`,
  keywords:
    "Oklahoma boat ramp, boat ramp near me Oklahoma, Grand Lake boat ramp, boat launch Oklahoma, Oklahoma boat ramp directory",
  openGraph: {
    title: "RampSeeker | Every Boat Ramp in America",
    description: `${totalRamps}+ boat ramps across the US. GPS coordinates, amenities, local tips.`,
    url: "https://www.rampseeker.com",
    siteName: "RampSeeker",
    type: "website",
    images: [{ url: "https://www.rampseeker.com/og-image.png", width: 1200, height: 630, alt: "RampSeeker — Every Boat Ramp in America" }],
  },
  twitter: {
    card: "summary",
    title: "RampSeeker | Every Boat Ramp in America",
    description: `${totalRamps}+ boat ramps across the US. GPS coordinates, amenities, local tips.`,
  },
  alternates: { canonical: "https://www.rampseeker.com" },
  verification: {
    google: "JWsw31t4naK4EN6UbytAGjUR7PuyS4e3i1lgEcjM-R4",
  },
  other: {
    "google-adsense-account": "ca-pub-4822220549367368",
    "impact-site-verification": "ae745e97-4381-483d-8be9-f973f0dcce88",
  },
};

function Footer() {
  return (
    <footer className="bg-[#0B1E33] border-t border-[#162D4A] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-white/50">
          <div>
            <p className="font-bold text-white mb-2 font-[Cabin]">&#9875; RampSeeker</p>
            <p>The most complete boat ramp directory in America. {totalRamps}+ ramps across 46 states.</p>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">Links</p>
            <div className="flex flex-col gap-1">
              <Link href="/" className="text-white/40 hover:text-white transition">All Ramps</Link>
              <Link href="/lakes" className="text-white/40 hover:text-white transition">Lakes</Link>
              <Link href="/map" className="text-white/40 hover:text-white transition">Map</Link>
              <Link href="/about" className="text-white/40 hover:text-white transition">About</Link>
              <Link href="/blog" className="text-white/40 hover:text-white transition">Blog</Link>
              <Link href="/for-businesses" className="text-white/40 hover:text-white transition">For Businesses</Link>
              <Link href="/privacy" className="text-white/40 hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="text-white/40 hover:text-white transition">Terms</Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">Know a ramp we missed?</p>
            <a href="mailto:hello@rampseeker.com" className="text-water-light hover:text-white transition">hello@rampseeker.com</a>
          </div>
          <div>
            <p className="font-bold text-white/70 mb-2">From Global AI Bots</p>
            <div className="flex flex-col gap-1">
              <a href="https://www.rampseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">RampSeeker</a>
              <a href="https://pierseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">PierSeeker</a>
              <a href="https://barkseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">BarkSeeker</a>
              <a href="https://marinaseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">MarinaSeeker</a>
              <a href="https://mechanicseeker.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">MechanicSeeker</a>
              <a href="https://babymydog.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">BabyMyDog</a>
              <a href="https://askcletus.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">CLETUS AI Chat</a>
              <a href="https://getcletus.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">CLETUS AI Voice</a>
              <a href="https://grandlakeai.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">Grand Lake AI</a>
              <a href="https://globalaibots.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition">Global AI Bots</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-white/30 gap-4">
          <span>Veteran Owned &amp; Operated &#127482;&#127480; &middot; &copy; {new Date().getFullYear()} RampSeeker. All rights reserved.</span>
          <div className="flex gap-3">
            <Link href="/advertise" className="hover:text-white transition">Advertise With Us</Link>
            <span>&middot;</span>
            <span>A <a href="https://grandlakeai.com" target="_blank" className="text-water-light/70 hover:text-white transition">Grand Lake AI</a> project.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Source_Sans_3'] antialiased min-h-screen flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4822220549367368"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N85PYDH398"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N85PYDH398');
          `}
        </Script>
        <a href="/blog" className="block w-full bg-[#1E6091] text-white text-center py-2 text-xs sm:text-sm font-medium hover:bg-[#134B70] transition">
          &#128676; New: Free vs Paid Boat Ramps guide &mdash; Read our latest boating guide &rarr;
        </a>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CletusWidget />
        <CookieConsent />
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RampSeeker — Grand Lake Boat Ramp Directory",
  description: "RampSeeker is the most complete boat ramp directory for Grand Lake Oklahoma. Built by locals, for locals and visitors.",
  openGraph: {
    title: "About RampSeeker",
    description: "Built by locals, for locals and visitors. The most complete boat ramp guide for Grand Lake.",
    url: "https://rampseeker.com/about",
  },
  alternates: { canonical: "https://rampseeker.com/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Outfit] text-3xl md:text-4xl font-black text-white mb-6">Built by Locals, for Locals and Visitors</h1>

      <div className="space-y-6 text-slate-300 leading-relaxed">
        <p>
          If you&apos;ve ever driven around Grand Lake looking for a boat ramp — and ended up at a locked gate, a dirt path, or someone&apos;s private dock — you know why we built RampSeeker.
        </p>
        <p>
          <strong className="text-white">RampSeeker is the most complete boat ramp directory for Grand Lake O&apos; the Cherokees.</strong> Every ramp. Real GPS coordinates. Amenities listed. Local tips from people who actually use them. No guessing, no outdated info, no dead ends.
        </p>
        <p>
          We started with Grand Lake because it&apos;s home. We know which ramps get packed on tournament weekends, which ones have lights for pre-dawn launches, and which ones have Sharky&apos;s Bar next door for post-fishing nachos.
        </p>

        <div className="bg-navy-light border border-white/10 rounded-xl p-6 my-8">
          <h2 className="font-[Outfit] text-xl font-bold text-white mb-3">What&apos;s Next</h2>
          <p className="text-slate-400">
            Grand Lake is just the beginning. We&apos;re expanding to cover every public boat ramp across Oklahoma — Tenkiller, Eufaula, Keystone, Fort Gibson, Skiatook, and beyond. Eventually, every lake in the region.
          </p>
        </div>

        <p>
          RampSeeker is a project by <a href="https://grandlakeai.com" target="_blank" className="text-water hover:text-white transition font-semibold">Grand Lake AI</a>, a division of Global AI Bots. We build tools for the Grand Lake community — AI-powered customer service for local businesses, and now, the ramp directory we always wished existed.
        </p>

        <h2 className="font-[Outfit] text-xl font-bold text-white mt-10 mb-3">Get in Touch</h2>
        <p>
          Know a ramp we missed? Have a correction? Just want to talk fishing?
        </p>
        <p>
          <a href="mailto:hello@rampseeker.com" className="text-water hover:text-white transition font-semibold">hello@rampseeker.com</a>
        </p>
        <p className="text-slate-500 text-sm mt-6">
          Serving Grand Lake, Grove, Vinita, Jay, Miami, Afton, Langley, Ketchum, Disney, Bernice, Wyandotte, Monkey Island, and all of Northeast Oklahoma.
        </p>
      </div>
    </div>
  );
}

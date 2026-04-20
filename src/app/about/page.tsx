import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RampSeeker — Grand Lake Boat Ramp Directory",
  description: "RampSeeker is the most complete boat ramp directory for Grand Lake Oklahoma. Built by locals, for locals and visitors.",
  openGraph: {
    title: "About RampSeeker",
    description: "Built by locals, for locals and visitors. The most complete boat ramp guide for Grand Lake.",
    url: "https://www.rampseeker.com/about",
  },
  twitter: { card: "summary", title: "About RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-6">Built by Locals, for Locals and Visitors</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>
          If you&apos;ve ever driven around Grand Lake looking for a boat ramp — and ended up at a locked gate, a dirt path, or someone&apos;s private dock — you know why we built RampSeeker.
        </p>
        <p>
          <strong className="text-charcoal">RampSeeker is the most complete boat ramp directory in America — covering 9 states with thousands of ramps.</strong> From Oklahoma&apos;s Grand Lake to Michigan&apos;s Great Lakes, Minnesota&apos;s walleye waters, North Carolina&apos;s Outer Banks, and beyond. Real GPS coordinates. Amenities listed. Local tips from people who actually use them. No guessing, no outdated info, no dead ends.
        </p>
        <p>
          We started with Grand Lake because it&apos;s home. We know which ramps get packed on tournament weekends, which ones have lights for pre-dawn launches, and which ones have Sharky&apos;s Bar next door for post-fishing nachos.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
          <h2 className="font-[Cabin] text-xl font-bold text-water mb-3">What&apos;s Next</h2>
          <p className="text-gray-600">
            We now cover 46 states with thousands of boat ramps across the United States. We&apos;re adding detailed guides with local tips for every major lake, and expanding to all 50 states.
          </p>
        </div>

        <p>
          RampSeeker is a project of <a href="https://globalaibots.com" target="_blank" rel="noopener noreferrer" className="text-water hover:text-water-light transition font-semibold">Global AI Bots</a>, the company behind CLETUS — an AI chat and voice agent for businesses. Learn more at <a href="https://globalaibots.com" target="_blank" rel="noopener noreferrer" className="text-water hover:text-water-light transition font-semibold">globalaibots.com</a>, <a href="https://askcletus.com" target="_blank" rel="noopener noreferrer" className="text-water hover:text-water-light transition font-semibold">askcletus.com</a>, or <a href="https://grandlakeai.com" target="_blank" rel="noopener noreferrer" className="text-water hover:text-water-light transition font-semibold">grandlakeai.com</a>.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Powered by CLETUS AI</h2>
          <p className="text-gray-600">
            The chatbot on this site is <strong className="text-charcoal">CLETUS</strong> — an AI chat and voice agent built for businesses. The same technology that helps you find boat ramps can answer your business customers&apos; questions 24/7. If you run a marina, bait shop, RV park, or any lake business, <a href="/for-businesses" className="text-water hover:underline font-semibold">learn how CLETUS can work for you</a>.
          </p>
        </div>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mt-10 mb-3">Get in Touch</h2>
        <p>
          Know a ramp we missed? Have a correction? Just want to talk fishing?
        </p>
        <p>
          <a href="mailto:hello@rampseeker.com" className="text-water hover:text-water-light transition font-semibold">hello@rampseeker.com</a>
        </p>
        <p className="text-gray-400 text-sm mt-6">
          Serving Grand Lake, Grove, Vinita, Jay, Miami, Afton, Langley, Ketchum, Disney, Bernice, Wyandotte, Monkey Island, and all of Northeast Oklahoma.
        </p>
      </div>
    </div>
  );
}

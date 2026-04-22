import Link from "next/link";
import type { Metadata } from "next";
import { unified } from "@/data/all-ramps";

const TOTAL = unified.length.toLocaleString();
const STATES_COUNT = new Set(unified.map(r => r.state)).size;

export const metadata: Metadata = {
  title: "About RampSeeker — Free Boat Ramp Directory",
  description: `RampSeeker is a free boat ramp directory covering ${TOTAL}+ ramps across ${STATES_COUNT} states. Veteran-owned, ad-supported, no paywalls. GPS, amenities, and local tips.`,
  openGraph: { title: "About RampSeeker", url: "https://www.rampseeker.com/about", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "About RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/about" },
};

const network = [
  { name: "RampSeeker", url: "https://www.rampseeker.com", tag: "27,700+ Boat Ramps" },
  { name: "PierSeeker", url: "https://www.pierseeker.com", tag: "35,000+ Fishing Piers" },
  { name: "MarinaSeeker", url: "https://www.marinaseeker.com", tag: "9,000+ Marinas" },
  { name: "MechanicSeeker", url: "https://www.mechanicseeker.com", tag: "44,000+ Auto Repair Shops" },
  { name: "BarkSeeker", url: "https://www.barkseeker.com", tag: "37,000+ Dog Parks, Groomers & Vets" },
  { name: "BabyMyDog", url: "https://www.babymydog.com", tag: "260+ Dog Product Reviews" },
  { name: "GlobalAiBots", url: "https://www.globalaibots.com", tag: "CLETUS AI Platform" },
  { name: "AskCletus", url: "https://www.askcletus.com", tag: "AI Chat Demo" },
  { name: "GetCletus", url: "https://www.getcletus.com", tag: "CLETUS Signup" },
  { name: "GrandLakeAI", url: "https://www.grandlakeai.com", tag: "Grand Lake Business AI" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="px-4 pt-16 pb-10 text-center bg-cream" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">
          About RampSeeker &mdash; Free Boat Ramp Directory
        </h1>
        <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
          Every public boat ramp in America, in one place, free to search. Built for boaters who want GPS-accurate launch info, amenity details, and local tips &mdash; no dead-end trips to locked gates.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: `${TOTAL}+`, label: "Boat Ramps" },
            { num: String(STATES_COUNT), label: "States Covered" },
            { num: "Free", label: "Forever" },
            { num: "Updated", label: "Continuously" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <p className="font-[Cabin] text-2xl md:text-3xl font-extrabold text-water">{s.num}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-gray-200 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Why We Built This</h2>
          <p className="text-gray-700 leading-relaxed">
            RampSeeker is part of a directory network built by <strong className="text-charcoal">James Mull, a Navy veteran</strong> who got tired of bouncing between unreliable websites trying to find trusted local services. So we built the network we wished existed &mdash; completely free, ad-supported, and updated constantly. No logins. No paywalls. No upsells to basic information. Just verified contact info and real local data for anglers, tournament boaters, pontoon owners, and anyone who launches a trailer boat.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">What Makes Us Different</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3"><span className="text-water text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-charcoal">Free forever</strong> &mdash; no login, no subscription, no paywall behind basic contact info</div></li>
          <li className="flex items-start gap-3"><span className="text-water text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-charcoal">GPS-verified ramp locations</strong> &mdash; drive directly there without getting lost</div></li>
          <li className="flex items-start gap-3"><span className="text-water text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-charcoal">Lake, county, and state context</strong> &mdash; browse by water body or region</div></li>
          <li className="flex items-start gap-3"><span className="text-water text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-charcoal">Fee and amenity data</strong> &mdash; free vs paid, courtesy dock, parking, bait, rest rooms</div></li>
          <li className="flex items-start gap-3"><span className="text-water text-xl flex-shrink-0 mt-0.5">&#10003;</span><div><strong className="text-charcoal">Veteran-owned, Oklahoma-based</strong> &mdash; a small American team building every page</div></li>
        </ul>
      </section>

      <section className="bg-gray-50 border-y border-gray-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-3">Our Network</h2>
          <p className="text-gray-600 mb-6">We operate the GlobalAiBots directory network &mdash; 10 sites covering 150,000+ businesses across boating, auto care, pet services, and AI tools for small businesses.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {network.map(s => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="block bg-white border border-gray-200 rounded-xl p-3 hover:border-water hover:shadow-sm transition">
                <p className="font-bold text-charcoal text-sm">{s.name}</p>
                <p className="text-gray-500 text-xs mt-1">{s.tag}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Contact</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Know a ramp we missed, or spotted a correction? Email <a href="mailto:hello@rampseeker.com" className="text-water hover:underline font-semibold">hello@rampseeker.com</a>.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Questions or partnerships? Email <a href="mailto:james@globalaibots.com" className="text-water hover:underline font-semibold">james@globalaibots.com</a>.
        </p>
        <p className="text-gray-400 text-sm mt-6">
          RampSeeker is a project of <a href="https://www.globalaibots.com" target="_blank" rel="noopener noreferrer" className="text-water hover:underline">Global AI Bots</a>. Veteran-owned and operated.
        </p>
        <Link href="/" className="inline-block mt-6 text-water hover:underline font-semibold text-sm">&larr; Back to home</Link>
      </section>
    </div>
  );
}

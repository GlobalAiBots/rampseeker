import Link from "next/link";
import type { Metadata } from "next";

const STRIPE_FEATURED = "https://buy.stripe.com/cNieVd9I96K3de9dDCcZa00";
const CLETUS_SIGNUP = "https://globalaibots.com/signup";

export const metadata: Metadata = {
  title: "List Your Ramp Business on RampSeeker | For Businesses",
  description: "Two ways to grow your ramp-side business: Featured Listing on RampSeeker ($49.95/mo) or CLETUS AI chat and voice agent for your own website (from $29.95/mo).",
  keywords: "boat ramp marketing, featured listing boat ramp, AI chatbot for marinas, AI for bait shops",
  openGraph: { title: "List Your Ramp Business on RampSeeker", url: "https://www.rampseeker.com/for-businesses", siteName: "RampSeeker" },
  alternates: { canonical: "https://www.rampseeker.com/for-businesses" },
};

export default function ForBusinessesPage() {
  return (
    <div>
      <section className="px-4 pt-12 pb-8 text-center bg-cream" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">
          List Your Ramp Business on RampSeeker
        </h1>
        <p className="text-gray-500 text-lg mt-5 max-w-xl mx-auto">
          Two ways to grow your business. Pick one or both.
        </p>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 p-8 text-white shadow-xl flex flex-col">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2">&#11088; Primary Product</p>
            <h2 className="font-[Cabin] text-2xl md:text-3xl font-bold mb-1">Featured Listing</h2>
            <p className="text-4xl font-extrabold mb-1">$49.95<span className="text-lg text-white/80 font-semibold">/mo</span></p>
            <p className="text-white/90 text-sm mb-6">Get your ramp, marina, or bait shop seen by boaters already searching.</p>
            <ul className="space-y-2 text-sm text-white/95 mb-8 flex-1">
              <li className="flex items-start gap-2"><span className="text-white font-bold flex-shrink-0 mt-0.5">&#10003;</span> Priority placement on state, lake, and county pages</li>
              <li className="flex items-start gap-2"><span className="text-white font-bold flex-shrink-0 mt-0.5">&#10003;</span> Photo gallery &mdash; ramp, courtesy dock, parking, amenities</li>
              <li className="flex items-start gap-2"><span className="text-white font-bold flex-shrink-0 mt-0.5">&#10003;</span> Customer message form on your listing</li>
              <li className="flex items-start gap-2"><span className="text-white font-bold flex-shrink-0 mt-0.5">&#10003;</span> Monthly performance report (views, clicks, contacts)</li>
              <li className="flex items-start gap-2"><span className="text-white font-bold flex-shrink-0 mt-0.5">&#10003;</span> 3x more visibility than free listings</li>
              <li className="flex items-start gap-2"><span className="text-white font-bold flex-shrink-0 mt-0.5">&#10003;</span> Cancel anytime</li>
            </ul>
            <a href={STRIPE_FEATURED} target="_blank" rel="noopener noreferrer" className="block text-center bg-white text-amber-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-50 transition shadow-md">
              Get Featured Now &rarr;
            </a>
            <p className="text-white/80 text-xs text-center mt-3">
              <Link href="/pricing" className="underline hover:text-white">See full pricing</Link>
            </p>
          </div>

          <div className="rounded-2xl bg-white border-2 border-water p-8 shadow-xl flex flex-col">
            <p className="text-xs font-bold uppercase tracking-widest text-water mb-2">&#129302; AI for Your Own Site</p>
            <h2 className="font-[Cabin] text-2xl md:text-3xl font-bold text-charcoal mb-1">CLETUS AI</h2>
            <p className="text-4xl font-extrabold text-charcoal mb-1">from $29.95<span className="text-lg text-gray-500 font-semibold">/mo</span></p>
            <p className="text-gray-600 text-sm mb-6">Add AI chat and voice to the website you already have.</p>
            <ul className="space-y-2 text-sm text-gray-700 mb-8 flex-1">
              <li className="flex items-start gap-2"><span className="text-water font-bold flex-shrink-0 mt-0.5">&#10003;</span> AI chat widget on YOUR website, 24/7</li>
              <li className="flex items-start gap-2"><span className="text-water font-bold flex-shrink-0 mt-0.5">&#10003;</span> Optional AI voice receptionist (from $49.95/mo)</li>
              <li className="flex items-start gap-2"><span className="text-water font-bold flex-shrink-0 mt-0.5">&#10003;</span> Works on WordPress, Wix, Squarespace, Shopify, anywhere</li>
              <li className="flex items-start gap-2"><span className="text-water font-bold flex-shrink-0 mt-0.5">&#10003;</span> Learns your business from a simple Q&amp;A setup</li>
              <li className="flex items-start gap-2"><span className="text-water font-bold flex-shrink-0 mt-0.5">&#10003;</span> 14-day free trial &mdash; no credit card required</li>
              <li className="flex items-start gap-2"><span className="text-water font-bold flex-shrink-0 mt-0.5">&#10003;</span> Cancel anytime</li>
            </ul>
            <a href={CLETUS_SIGNUP} target="_blank" rel="noopener noreferrer" className="block text-center bg-water hover:bg-water-deep text-white font-bold px-6 py-3 rounded-lg transition shadow-md">
              Start Free Trial &rarr;
            </a>
            <p className="text-gray-500 text-xs text-center mt-3">
              <a href="https://globalaibots.com/pricing" target="_blank" rel="noopener noreferrer" className="underline hover:text-charcoal">See CLETUS pricing tiers</a>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 border-y border-gray-200 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-sunset mb-3">What CLETUS Can Answer</p>
          <p className="text-2xl md:text-3xl font-[Cabin] font-bold text-charcoal leading-snug">
            Launch fees, trailer parking, ramp status, lake conditions &mdash; all answered automatically, 24/7.
          </p>
          <p className="text-gray-500 mt-4 text-sm max-w-xl mx-auto">
            CLETUS learns your business in minutes. Paste in your ramp hours, fees, amenities, and lake info; the chat widget answers every boater question instantly while you focus on running operations.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-14">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal text-center mb-8">Frequently Asked</h2>
        <div className="space-y-3">
          {[
            { q: "How quickly does my featured listing go live?", a: "Within 1 business day after you subscribe and verify you're authorized to represent the ramp or business. You get an email when Featured is activated." },
            { q: "Can I have both Featured Listing and CLETUS?", a: "Yes. Featured Listing drives boaters from RampSeeker to your business. CLETUS answers the questions they ask once they land on your own website. Different funnels, complementary." },
            { q: "Can I cancel anytime?", a: "Both products are monthly with no commitment. Cancel from Stripe (Featured) or your CLETUS dashboard. Billing stops at the end of the current month." },
            { q: "Is there a setup fee?", a: "No. Featured Listing is $49.95/mo flat. CLETUS is $29.95-$129.95/mo depending on tier, with a 14-day free trial. No setup fees, no contracts." },
            { q: "How does CLETUS learn my business?", a: "Via a simple admin interface where you paste in your hours, fees, amenities, and FAQ. No coding. Most operators finish setup in under 15 minutes. The AI handles variation in how boaters phrase questions automatically." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 text-center" style={{ backgroundImage: "radial-gradient(circle at 50% 100%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-6">Ready to grow your ramp business?</h2>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href={STRIPE_FEATURED} target="_blank" rel="noopener noreferrer" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">
            &#11088; Get Featured &rarr;
          </a>
          <a href={CLETUS_SIGNUP} target="_blank" rel="noopener noreferrer" className="bg-water hover:bg-water-deep text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">
            Try CLETUS Free &rarr;
          </a>
        </div>
        <p className="text-gray-400 text-xs mt-6">Questions? <a href="mailto:hello@globalaibots.com" className="text-water hover:underline">hello@globalaibots.com</a></p>
      </section>
    </div>
  );
}

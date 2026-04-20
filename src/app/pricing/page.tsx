import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Free & Featured Listings | RampSeeker",
  description: "Compare Free and Featured listings for boat ramps on RampSeeker. Featured at $49.95/mo includes priority placement, photos, customer messages, and monthly reports.",
  alternates: { canonical: "https://www.rampseeker.com/pricing" },
};

const STRIPE_LINK = "https://buy.stripe.com/cNieVd9I96K3de9dDCcZa00";

export default function PricingPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link> &raquo; <span className="text-gray-700">Pricing</span>
      </nav>

      <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal mb-3">Pricing</h1>
      <p className="text-gray-600 text-lg max-w-2xl mb-10">Every boat ramp on RampSeeker gets a free listing. Upgrade to Featured for priority placement and lead-generation tools &mdash; ideal for marinas, bait shops, and tackle stores near public ramps.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Free</p>
          <h2 className="font-[Cabin] text-3xl font-bold text-charcoal mb-1">Free Listing</h2>
          <p className="font-extrabold text-4xl text-charcoal mb-1">$0</p>
          <p className="text-gray-500 text-sm mb-6">Default for every ramp we&apos;ve indexed.</p>
          <ul className="space-y-2 text-sm text-gray-700 mb-8 flex-1">
            <li className="flex items-start gap-2"><span className="text-gray-400 flex-shrink-0 mt-0.5">&#10003;</span> Name, GPS, access info</li>
            <li className="flex items-start gap-2"><span className="text-gray-400 flex-shrink-0 mt-0.5">&#10003;</span> Standard placement in search results</li>
            <li className="flex items-start gap-2"><span className="text-gray-400 flex-shrink-0 mt-0.5">&#10003;</span> State, lake, and county directory pages</li>
            <li className="flex items-start gap-2"><span className="text-gray-400 flex-shrink-0 mt-0.5">&#10003;</span> Structured data for Google</li>
          </ul>
          <Link href="/claim" className="inline-block text-center bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition text-sm">
            Claim Your Free Listing
          </Link>
        </section>

        <section className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-8 shadow-md flex flex-col">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">Recommended</p>
          <h2 className="font-[Cabin] text-3xl font-bold text-charcoal mb-1">&#11088; Featured Listing</h2>
          <p className="font-extrabold text-4xl text-charcoal mb-1">$49.95<span className="text-lg text-gray-500 font-semibold">/mo</span></p>
          <p className="text-gray-600 text-sm mb-6">Priority placement and lead-generation tools.</p>
          <ul className="space-y-2 text-sm text-gray-800 mb-8 flex-1">
            <li className="flex items-start gap-2"><span className="text-amber-600 flex-shrink-0 mt-0.5">&#10003;</span> Everything in Free, plus:</li>
            <li className="flex items-start gap-2"><span className="text-amber-600 flex-shrink-0 mt-0.5">&#10003;</span> &#11088; Featured badge on your listing card</li>
            <li className="flex items-start gap-2"><span className="text-amber-600 flex-shrink-0 mt-0.5">&#10003;</span> Top placement on state, lake, and county pages</li>
            <li className="flex items-start gap-2"><span className="text-amber-600 flex-shrink-0 mt-0.5">&#10003;</span> Photo gallery (up to 5 images)</li>
            <li className="flex items-start gap-2"><span className="text-amber-600 flex-shrink-0 mt-0.5">&#10003;</span> Customer message form on your listing</li>
            <li className="flex items-start gap-2"><span className="text-amber-600 flex-shrink-0 mt-0.5">&#10003;</span> Monthly performance report (views, clicks, contacts)</li>
            <li className="flex items-start gap-2"><span className="text-amber-600 flex-shrink-0 mt-0.5">&#10003;</span> Cross-promotion in Best Of features</li>
            <li className="flex items-start gap-2"><span className="text-amber-600 flex-shrink-0 mt-0.5">&#10003;</span> Priority support</li>
          </ul>
          <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" className="inline-block text-center bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg transition text-sm">
            Get Featured Now &rarr;
          </a>
          <p className="text-xs text-gray-500 text-center mt-3">Cancel anytime. Billed monthly via Stripe.</p>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Frequently Asked</h2>
        <div className="space-y-3">
          <details className="bg-white border border-gray-200 rounded-xl p-5">
            <summary className="cursor-pointer font-semibold text-charcoal">How does Featured placement work?</summary>
            <p className="mt-2 text-gray-600 text-sm">Your listing appears at the top of its state, lake, and county pages with a &#11088; Featured badge. On listing cards, Featured listings get larger presentation and a priority slot above the organic list.</p>
          </details>
          <details className="bg-white border border-gray-200 rounded-xl p-5">
            <summary className="cursor-pointer font-semibold text-charcoal">Can I cancel anytime?</summary>
            <p className="mt-2 text-gray-600 text-sm">Yes. Billing is monthly through Stripe. Cancel from your Stripe customer portal and your Featured status runs through the end of the current billing period.</p>
          </details>
          <details className="bg-white border border-gray-200 rounded-xl p-5">
            <summary className="cursor-pointer font-semibold text-charcoal">What if my ramp or business isn&apos;t listed yet?</summary>
            <p className="mt-2 text-gray-600 text-sm">Email us at admin@globalaibots.com with your name, address, and website. We&apos;ll add you to the index, then you can claim the listing or subscribe to Featured.</p>
          </details>
        </div>
      </section>
    </main>
  );
}

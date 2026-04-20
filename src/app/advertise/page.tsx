import Link from "next/link";
import type { Metadata } from "next";
import { unified } from "@/data/all-ramps";

const totalRamps = unified.length.toLocaleString();

export const metadata: Metadata = {
  title: "Advertise With RampSeeker — Reach Boaters Across America",
  description: "Advertise on RampSeeker. Reach boat owners, trailer boaters, and ramp users actively researching boats, gear, trailers, and launch destinations. Featured listings, sponsored posts, and banner ads.",
  alternates: { canonical: "https://www.rampseeker.com/advertise" },
  openGraph: {
    title: "Advertise With RampSeeker",
    description: "Reach boaters actively researching boats, gear, and launch destinations.",
    url: "https://www.rampseeker.com/advertise",
    siteName: "RampSeeker",
  },
};

export default function AdvertisePage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.rampseeker.com" },
      { "@type": "ListItem", position: 2, name: "Advertise", item: "https://www.rampseeker.com/advertise" },
    ],
  };

  const mailto = "mailto:hello@rampseeker.com?subject=" + encodeURIComponent("Advertising Inquiry — RampSeeker") + "&body=" + encodeURIComponent("Hi RampSeeker team,\n\nI'd like to learn more about advertising options. Here's a quick intro:\n\n- Company: \n- Product / Service: \n- Target audience: \n- Budget range: \n- Format of interest (featured listing / sponsored post / banner): \n\nThanks!");

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2">
          <Link href="/" className="hover:text-water transition">Home</Link><span>/</span>
          <span className="text-charcoal font-medium">Advertise</span>
        </nav>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 mb-10">
          <p className="text-sunset text-xs font-bold tracking-widest uppercase mb-3">Partnerships</p>
          <h1 className="font-[Cabin] text-3xl md:text-5xl font-bold text-charcoal mb-4 leading-tight">Advertise With RampSeeker</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-6">
            Reach boat owners, trailer boaters, and ramp users actively researching boats, motors, trailers, tackle, and launch destinations. RampSeeker is the most complete boat-ramp directory in America.
          </p>
          <a href={mailto} className="inline-block bg-water hover:bg-water-deep text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Start a Conversation</a>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { stat: `${totalRamps}+`, label: "Boat Ramps" },
            { stat: "46", label: "States Covered" },
            { stat: "200+", label: "Lakes With Pages" },
            { stat: "25+", label: "Long-Form Guides" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 text-center">
              <p className="font-[Cabin] text-3xl font-bold text-water">{s.stat}</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">Who You&apos;ll Reach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 leading-relaxed">
            <div>
              <p className="font-bold text-charcoal mb-2">Audience profile</p>
              <ul className="space-y-1.5 text-gray-600">
                <li>&bull; Boat owners and trailer boaters, ages 30-70</li>
                <li>&bull; National reach with strong coverage in TX, FL, MI, MN, OK, CA</li>
                <li>&bull; Mix of bass anglers, pontoon owners, and saltwater boaters</li>
                <li>&bull; Planners researching ramps, lakes, and launch logistics</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-charcoal mb-2">Commercial intent</p>
              <ul className="space-y-1.5 text-gray-600">
                <li>&bull; Shopping for boats, outboards, and trolling motors</li>
                <li>&bull; Researching trailers, tires, wheel bearings, and tow gear</li>
                <li>&bull; Comparing marine insurance and warranty options</li>
                <li>&bull; Pre-purchase comparison content (aluminum vs fiberglass, etc.)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-5">Sponsorship Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Featured Listing",
                price: "$49-199/mo",
                desc: "Pin your business or ramp to the top of relevant state, lake, or category pages. Best for marine dealers, bait shops, tackle stores, and ramp-adjacent lodging.",
              },
              {
                title: "Sponsored Post",
                price: "$299-999",
                desc: "A dedicated long-form article with your brand integrated naturally. Strong for motor brands, trailer manufacturers, and destination marketing.",
              },
              {
                title: "Banner Ad",
                price: "$299-799/mo",
                desc: "Display placement across high-traffic pages. 300x250 and responsive units. Monthly or quarterly commitments.",
              },
            ].map((opt) => (
              <div key={opt.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
                <p className="font-[Cabin] font-bold text-charcoal text-xl mb-1">{opt.title}</p>
                <p className="text-water font-bold text-lg mb-3">{opt.price}</p>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{opt.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 italic mt-3">Pricing is a starting range. Custom packages and multi-site bundles (PierSeeker, MarinaSeeker, BarkSeeker) available.</p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-10">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-3">Media Kit</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-2xl">
            Current traffic numbers, top-performing content, category breakdowns, and example ad placements are available in our media kit. We send it on request so we can tailor it to your vertical.
          </p>
          <a href={mailto} className="inline-block bg-sunset hover:bg-sunset-dark text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Request Media Kit</a>
        </section>

        <section className="bg-water/5 border-2 border-water/30 rounded-2xl p-6 md:p-8">
          <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-3">Let&apos;s Talk</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-2xl">
            Email <a href={mailto} className="text-water font-semibold hover:underline">hello@rampseeker.com</a> with a quick note about your product and target audience. We&apos;ll reply within two business days with recommended placements and current availability.
          </p>
          <a href={mailto} className="inline-block bg-water hover:bg-water-deep text-white font-bold px-6 py-3 rounded-lg transition shadow-sm">Email Us</a>
        </section>
      </div>
    </div>
  );
}

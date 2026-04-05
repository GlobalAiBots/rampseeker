import Link from "next/link";
import { notFound } from "next/navigation";
import { pennsylvaniaLakes, getPennsylvaniaLakeById, getPennsylvaniaLakeForRamp } from "@/data/pennsylvania-lakes";
import { unified } from "@/data/all-ramps";
import LakeRampList from "@/components/LakeRampList";
import CletusAd from "@/components/CletusAd";
import type { Metadata } from "next";

export function generateStaticParams() { return pennsylvaniaLakes.map((l) => ({ id: l.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lake = getPennsylvaniaLakeById(id);
  if (!lake) return { title: "Not Found" };
  return {
    title: `${lake.name} Boat Ramps — Launch Sites & Access Points | RampSeeker`,
    description: `Every boat ramp on ${lake.name}, Pennsylvania. GPS coordinates, amenities, directions.`,
    openGraph: { title: `${lake.name} Boat Ramps`, url: `https://rampseeker.com/pennsylvania/lakes/${lake.id}` },
    twitter: { card: "summary", title: `${lake.name} Boat Ramps | RampSeeker` },
    alternates: { canonical: `https://rampseeker.com/pennsylvania/lakes/${lake.id}` },
  };
}

export default async function PennsylvaniaLakePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lake = getPennsylvaniaLakeById(id);
  if (!lake) notFound();
  const lakeRamps = unified.filter((r) => r.state === "PA" && getPennsylvaniaLakeForRamp(r.latitude, r.longitude)?.id === lake.id);
  const otherLakes = pennsylvaniaLakes.filter((l) => l.id !== lake.id).slice(0, 6);
  const faqs = [
    { q: `How many boat ramps are on ${lake.name}?`, a: `RampSeeker lists ${lakeRamps.length} boat ramp${lakeRamps.length !== 1 ? "s" : ""} on ${lake.name}.` },
    { q: `What fish are in ${lake.name}?`, a: `${lake.name} supports ${lake.fishSpecies.join(", ")}.` },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "LakeBodyOfWater", name: lake.name, description: lake.description.split("\n\n")[0], geo: { "@type": "GeoCoordinates", latitude: lake.lat, longitude: lake.lng } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://rampseeker.com" }, { "@type": "ListItem", position: 2, name: "Pennsylvania", item: "https://rampseeker.com/pennsylvania" }, { "@type": "ListItem", position: 3, name: lake.name, item: `https://rampseeker.com/pennsylvania/lakes/${lake.id}` }] }) }} />
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2"><Link href="/" className="hover:text-water transition">Home</Link><span>/</span><Link href="/pennsylvania" className="hover:text-water transition">Pennsylvania</Link><span>/</span><span className="text-charcoal font-medium">{lake.name}</span></nav>
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Every Boat Ramp on {lake.name}</h1>
      <p className="text-gray-500 mb-6">{lakeRamps.length} boat ramps &middot; {lake.counties.join(", ")}, Pennsylvania</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">{[{ label: lake.acres > 0 ? "Surface Acres" : "Shoreline", value: lake.acres > 0 ? lake.acres.toLocaleString() : `${lake.shorelineMiles} mi` },{ label: "Max Depth", value: `${lake.maxDepth} ft` },{ label: "Boat Ramps", value: String(lakeRamps.length) },{ label: "Fish Species", value: String(lake.fishSpecies.length) }].map((s) => (<div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm"><p className="text-2xl font-bold text-water font-[Cabin]">{s.value}</p><p className="text-gray-400 text-xs mt-1">{s.label}</p></div>))}</div>
      <div className="flex flex-wrap gap-2 mb-10">{lake.fishSpecies.map((s) => <span key={s} className="bg-forest/10 text-forest text-sm font-medium px-3 py-1.5 rounded-lg">{s}</span>)}</div>
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Boat Ramps on {lake.name}</h2>
      <div className="mb-12"><LakeRampList ramps={lakeRamps} stateName="Pennsylvania" /></div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">About {lake.name}</h2>{lake.description.split("\n\n").map((p, i) => <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0">{p}</p>)}<p className="text-gray-400 text-sm mt-4">Nearest towns: {lake.nearestTowns.join(", ")}</p></div>
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">FAQ</h2>
      <div className="space-y-2 mb-12">{faqs.map((f, i) => (<details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group"><summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div></details>))}</div>
      <CletusAd />
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Other Pennsylvania Waters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{otherLakes.map((l) => (<Link key={l.id} href={`/pennsylvania/lakes/${l.id}`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water"><p className="font-bold text-charcoal group-hover:text-water transition">{l.name}</p><p className="text-gray-500 text-sm">{l.nearestTowns[0]}</p></Link>))}</div>
    </div>
  );
}

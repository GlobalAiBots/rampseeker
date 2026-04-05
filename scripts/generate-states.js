const fs = require('fs');

const states = [
  {slug:'alaska',code:'AK',name:'Alaska',prefix:'ak',featured:'kenai-river',subtitle:'Last Frontier fishing — world-class salmon, halibut, and wilderness boating.',lakesTitle:'Alaska Waters'},
  {slug:'arizona',code:'AZ',name:'Arizona',prefix:'az',featured:'lake-powell',subtitle:'Desert lake boating, Lake Powell, Lake Havasu, year-round warm water fishing.',lakesTitle:'Arizona Lakes'},
  {slug:'california',code:'CA',name:'California',prefix:'ca',featured:'clear-lake',subtitle:'Pacific coast, Sacramento Delta, Sierra lakes, and world-class bass fishing.',lakesTitle:'California Lakes & Coast'},
  {slug:'colorado',code:'CO',name:'Colorado',prefix:'co',featured:'blue-mesa-reservoir',subtitle:'Rocky Mountain reservoirs, gold medal trout streams, high-altitude boating.',lakesTitle:'Colorado Lakes & Reservoirs'},
  {slug:'connecticut',code:'CT',name:'Connecticut',prefix:'ct',featured:'long-island-sound-ct',subtitle:'Long Island Sound fishing, Connecticut River, Candlewood Lake.',lakesTitle:'Connecticut Waters'},
  {slug:'delaware',code:'DE',name:'Delaware',prefix:'de',featured:'delaware-bay',subtitle:'Delaware Bay fishing, Indian River inlet, Rehoboth Bay, inland ponds.',lakesTitle:'Delaware Waters'},
  {slug:'hawaii',code:'HI',name:'Hawaii',prefix:'hi',featured:'kailua-kona-coast',subtitle:'World-class offshore fishing, reef fishing, and island boating paradise.',lakesTitle:'Hawaii Waters'},
  {slug:'idaho',code:'ID',name:'Idaho',prefix:'id',featured:'lake-coeur-dalene',subtitle:'Mountain lake paradise, Salmon River wilderness, world-class trout and steelhead.',lakesTitle:'Idaho Lakes & Rivers'},
  {slug:'indiana',code:'IN',name:'Indiana',prefix:'in',featured:'monroe-lake',subtitle:'Lake Michigan access, Hoosier reservoirs, and Midwest bass fishing.',lakesTitle:'Indiana Lakes'},
  {slug:'iowa',code:'IA',name:'Iowa',prefix:'ia',featured:'west-okoboji-lake',subtitle:'Iowa Great Lakes, Mississippi River fishing, and heartland reservoirs.',lakesTitle:'Iowa Lakes & Rivers'},
  {slug:'kentucky',code:'KY',name:'Kentucky',prefix:'ky',featured:'kentucky-lake-ky',subtitle:'Kentucky Lake, Lake Cumberland, Dale Hollow — world-class bass and crappie.',lakesTitle:'Kentucky Lakes'},
  {slug:'louisiana',code:'LA',name:'Louisiana',prefix:'la',featured:'toledo-bend-reservoir',subtitle:"Sportsman's paradise — bayou bass, Gulf coast redfish, Toledo Bend.",lakesTitle:'Louisiana Waters'},
  {slug:'maine',code:'ME',name:'Maine',prefix:'me',featured:'moosehead-lake',subtitle:'North Woods lakes, Atlantic coast, landlocked salmon capital of the world.',lakesTitle:'Maine Lakes & Coast'},
  {slug:'massachusetts',code:'MA',name:'Massachusetts',prefix:'ma',featured:'cape-cod-bay',subtitle:'Cape Cod fishing, striped bass runs, Quabbin Reservoir, island waters.',lakesTitle:'Massachusetts Waters'},
  {slug:'mississippi',code:'MS',name:'Mississippi',prefix:'ms',featured:'ross-barnett-reservoir',subtitle:'Delta bass fishing, Gulf coast, reservoir crappie paradise.',lakesTitle:'Mississippi Waters'},
  {slug:'montana',code:'MT',name:'Montana',prefix:'mt',featured:'flathead-lake',subtitle:'Big Sky fishing — Flathead Lake, Fort Peck, blue-ribbon trout streams.',lakesTitle:'Montana Lakes & Rivers'},
  {slug:'nebraska',code:'NE',name:'Nebraska',prefix:'ne',featured:'lake-mcconaughy',subtitle:'Lake McConaughy, Sandhills lakes, and Great Plains reservoir fishing.',lakesTitle:'Nebraska Lakes'},
  {slug:'new-hampshire',code:'NH',name:'New Hampshire',prefix:'nh',featured:'lake-winnipesaukee',subtitle:'Lake Winnipesaukee, White Mountains lakes, landlocked salmon fishing.',lakesTitle:'New Hampshire Lakes'},
  {slug:'new-jersey',code:'NJ',name:'New Jersey',prefix:'nj',featured:'barnegat-bay',subtitle:'Jersey Shore fishing, Barnegat Bay, Delaware Bay, freshwater lakes.',lakesTitle:'New Jersey Waters'},
  {slug:'new-mexico',code:'NM',name:'New Mexico',prefix:'nm',featured:'elephant-butte-lake',subtitle:'Desert reservoir boating, Elephant Butte, Navajo Lake fishing.',lakesTitle:'New Mexico Lakes'},
  {slug:'north-dakota',code:'ND',name:'North Dakota',prefix:'nd',featured:'lake-sakakawea',subtitle:'Lake Sakakawea, Devils Lake walleye, Missouri River fishing.',lakesTitle:'North Dakota Lakes'},
  {slug:'pennsylvania',code:'PA',name:'Pennsylvania',prefix:'pa',featured:'lake-erie-pa',subtitle:'Lake Erie steelhead, Raystown Lake, Susquehanna River smallmouth.',lakesTitle:'Pennsylvania Lakes & Rivers'},
  {slug:'south-carolina',code:'SC',name:'South Carolina',prefix:'sc',featured:'santee-cooper-lakes',subtitle:'Santee Cooper, Lake Murray, Lowcountry saltwater, year-round fishing.',lakesTitle:'South Carolina Waters'},
  {slug:'south-dakota',code:'SD',name:'South Dakota',prefix:'sd',featured:'lake-oahe-sd',subtitle:'Missouri River reservoirs, Lake Oahe walleye, Black Hills trout.',lakesTitle:'South Dakota Lakes'},
  {slug:'utah',code:'UT',name:'Utah',prefix:'ut',featured:'lake-powell-ut',subtitle:'Lake Powell, Flaming Gorge, Strawberry Reservoir — desert canyon boating.',lakesTitle:'Utah Lakes & Reservoirs'},
  {slug:'virginia',code:'VA',name:'Virginia',prefix:'va',featured:'chesapeake-bay-va',subtitle:'Chesapeake Bay rockfish, Smith Mountain Lake, Blue Ridge trout streams.',lakesTitle:'Virginia Lakes & Bay'},
  {slug:'west-virginia',code:'WV',name:'West Virginia',prefix:'wv',featured:'summersville-lake',subtitle:'Mountain State gems — Summersville Lake, New River Gorge, wild trout.',lakesTitle:'West Virginia Waters'},
  {slug:'wyoming',code:'WY',name:'Wyoming',prefix:'wy',featured:'yellowstone-lake',subtitle:'Yellowstone cutthroat, Flaming Gorge, Wind River Range wilderness fishing.',lakesTitle:'Wyoming Lakes'},
];

function camel(slug) { return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()); }
function pascal(slug) { const c = camel(slug); return c.charAt(0).toUpperCase() + c.slice(1); }

for (const st of states) {
  const lv = camel(st.slug) + 'Lakes';
  const gbi = 'get' + pascal(st.slug) + 'LakeById';
  const gfr = 'get' + pascal(st.slug) + 'LakeForRamp';

  // TS wrapper
  fs.writeFileSync(`./src/data/${st.slug}-lakes.ts`,
`import type { Lake } from "./lakes";
import data from "./${st.slug}-lakes.json";

export const ${lv}: Lake[] = data.map((l) => ({
  id: l.id, name: l.name, description: l.description, acres: l.acres,
  shorelineMiles: l.shorelineMiles, maxDepth: l.maxDepth, counties: l.counties,
  fishSpecies: l.fishSpecies, nearestTowns: l.nearestTowns, lat: l.lat, lng: l.lng, radius: l.radius,
}));

export function ${gbi}(id: string): Lake | undefined {
  return ${lv}.find((l) => l.id === id);
}

export function ${gfr}(lat: number, lng: number): Lake | undefined {
  for (const l of ${lv}) {
    if (Math.abs(lat - l.lat) < l.radius && Math.abs(lng - l.lng) < l.radius) return l;
  }
  return undefined;
}
`);

  // Directories
  fs.mkdirSync(`./src/app/${st.slug}/lakes/[id]`, { recursive: true });

  const ld = require(`${__dirname}/../src/data/${st.slug}-lakes.json`);
  const rd = require(`${__dirname}/../src/data/${st.slug}-ramps.json`);

  // Layout
  fs.writeFileSync(`./src/app/${st.slug}/layout.tsx`,
`import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Boat Ramp in ${st.name} — ${rd.length} Ramps Across ${ld.length} Lakes & Waterways | RampSeeker",
  description: "The most complete boat ramp directory for ${st.name}. GPS coordinates, amenities, local tips.",
  openGraph: { title: "${st.name} Boat Ramps — RampSeeker", url: "https://rampseeker.com/${st.slug}", siteName: "RampSeeker" },
  twitter: { card: "summary", title: "${st.name} Boat Ramps | RampSeeker" },
  alternates: { canonical: "https://rampseeker.com/${st.slug}" },
};

export default function ${pascal(st.slug)}Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`);

  // State page
  fs.writeFileSync(`./src/app/${st.slug}/page.tsx`,
`"use client";

import { useMemo } from "react";
import Link from "next/link";
import { unified, amenityLabels, isGenericName } from "@/data/all-ramps";
import { ${lv}, ${gfr} } from "@/data/${st.slug}-lakes";
import CletusAd from "@/components/CletusAd";
import RampList from "@/components/RampList";

export default function ${pascal(st.slug)}Page() {
  const stRamps = useMemo(() => unified.filter((r) => r.state === "${st.code}"), []);

  const featuredLake = useMemo(() => {
    let best = ${lv}.find((l) => l.id === "${st.featured}") || ${lv}[0]; let bestCount = 0;
    for (const l of ${lv}) {
      const count = stRamps.filter((r) => ${gfr}(r.latitude, r.longitude)?.id === l.id && !isGenericName(r.name)).length;
      if (count > bestCount) { best = l; bestCount = count; }
    }
    return best;
  }, [stRamps]);
  const featuredRamps = useMemo(() => featuredLake ? stRamps.filter((r) => ${gfr}(r.latitude, r.longitude)?.id === featuredLake.id && !isGenericName(r.name)) : [], [stRamps, featuredLake]);

  const lakeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const l of ${lv}) map[l.id] = stRamps.filter((r) => ${gfr}(r.latitude, r.longitude)?.id === l.id).length;
    return map;
  }, [stRamps]);

  const cityMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of stRamps) { const c = r.city?.trim(); if (c && c.length > 1) m[c] = (m[c] || 0) + 1; }
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [stRamps]);

  return (
    <div>
      <section className="py-16 md:py-24 text-center px-4 bg-cream" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(30,96,145,0.06) 0%, transparent 50%)" }}>
        <p className="text-forest text-sm font-bold tracking-wider uppercase mb-3 font-[Cabin]">${st.name} Boat Ramp Directory</p>
        <h1 className="font-[Cabin] text-4xl md:text-5xl font-bold text-charcoal leading-tight max-w-3xl mx-auto">Every Boat Ramp in ${st.name}</h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">{stRamps.length}+ boat ramps across {${lv}.length} lakes and waterways. ${st.subtitle}</p>
      </section>

      {featuredRamps.length > 0 && featuredLake && (
        <section className="max-w-6xl mx-auto px-4 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div><h2 className="font-[Cabin] text-xl font-bold text-charcoal">Featured: {featuredLake.name}</h2><p className="text-gray-400 text-sm">{featuredRamps.length} named ramps</p></div>
            <Link href={\`/${st.slug}/lakes/\${featuredLake.id}\`} className="text-sm font-semibold text-sunset hover:text-sunset-dark transition hidden sm:block">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRamps.slice(0, 6).map((r) => (
              <Link key={r.id} href={\`/ramps/\${r.id}\`} className="group block bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-sunset shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{r.city || "${st.name}"}{r.fee ? \` \\u00b7 \${r.fee === "free" ? "Free" : r.fee}\` : ""}</p>
                {r.amenities && r.amenities.length > 0 && (<div className="flex flex-wrap gap-1 mt-2">{r.amenities.slice(0, 3).map((a) => (<span key={a} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>))}</div>)}
                <span className="text-sm font-semibold text-sunset mt-2 inline-block">View Details &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 pt-8 pb-8">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">${st.lakesTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {${lv}.sort((a, b) => (lakeCounts[b.id] || 0) - (lakeCounts[a.id] || 0)).map((l) => (
            <Link key={l.id} href={\`/${st.slug}/lakes/\${l.id}\`} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water">
              <div className="flex items-start justify-between"><h3 className="font-[Cabin] font-bold text-charcoal group-hover:text-water transition">{l.name}</h3><span className="text-xs font-bold text-water bg-water/10 px-2 py-0.5 rounded-full">{lakeCounts[l.id] || 0}</span></div>
              <p className="text-gray-500 text-sm mt-1">{l.nearestTowns.slice(0, 3).join(", ")}</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-400">{l.acres > 0 && <span>{l.acres.toLocaleString()} acres</span>}<span>{l.maxDepth} ft deep</span></div>
            </Link>
          ))}
        </div>
      </section>

      {cityMap.length > 0 && (<section className="max-w-6xl mx-auto px-4 pb-8"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Browse by City</h2><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{cityMap.slice(0, 16).map(([city, count]) => (<div key={city} className="bg-white border border-gray-200 rounded-lg p-3"><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></div>))}</div></section>)}

      <RampList ramps={stRamps} stateName="${st.name}" />

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">${st.name} Boating FAQ</h2>
        <div className="space-y-2">
          {[
            { q: "How many boat ramps are in ${st.name}?", a: \`RampSeeker lists \${stRamps.length}+ boat ramps across ${st.name}.\` },
            { q: "Is RampSeeker free?", a: "Yes, completely free. No login, no account, no fees." },
          ].map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
              <summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary>
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4"><CletusAd /></div>
    </div>
  );
}
`);

  // Lake detail page
  fs.writeFileSync(`./src/app/${st.slug}/lakes/[id]/page.tsx`,
`import Link from "next/link";
import { notFound } from "next/navigation";
import { ${lv}, ${gbi}, ${gfr} } from "@/data/${st.slug}-lakes";
import { unified } from "@/data/all-ramps";
import LakeRampList from "@/components/LakeRampList";
import CletusAd from "@/components/CletusAd";
import type { Metadata } from "next";

export function generateStaticParams() { return ${lv}.map((l) => ({ id: l.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lake = ${gbi}(id);
  if (!lake) return { title: "Not Found" };
  return {
    title: \`\${lake.name} Boat Ramps — Launch Sites & Access Points | RampSeeker\`,
    description: \`Every boat ramp on \${lake.name}, ${st.name}. GPS coordinates, amenities, directions.\`,
    openGraph: { title: \`\${lake.name} Boat Ramps\`, url: \`https://rampseeker.com/${st.slug}/lakes/\${lake.id}\` },
    twitter: { card: "summary", title: \`\${lake.name} Boat Ramps | RampSeeker\` },
    alternates: { canonical: \`https://rampseeker.com/${st.slug}/lakes/\${lake.id}\` },
  };
}

export default async function ${pascal(st.slug)}LakePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lake = ${gbi}(id);
  if (!lake) notFound();
  const lakeRamps = unified.filter((r) => r.state === "${st.code}" && ${gfr}(r.latitude, r.longitude)?.id === lake.id);
  const otherLakes = ${lv}.filter((l) => l.id !== lake.id).slice(0, 6);
  const faqs = [
    { q: \`How many boat ramps are on \${lake.name}?\`, a: \`RampSeeker lists \${lakeRamps.length} boat ramp\${lakeRamps.length !== 1 ? "s" : ""} on \${lake.name}.\` },
    { q: \`What fish are in \${lake.name}?\`, a: \`\${lake.name} supports \${lake.fishSpecies.join(", ")}.\` },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "LakeBodyOfWater", name: lake.name, description: lake.description.split("\\n\\n")[0], geo: { "@type": "GeoCoordinates", latitude: lake.lat, longitude: lake.lng } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://rampseeker.com" }, { "@type": "ListItem", position: 2, name: "${st.name}", item: "https://rampseeker.com/${st.slug}" }, { "@type": "ListItem", position: 3, name: lake.name, item: \`https://rampseeker.com/${st.slug}/lakes/\${lake.id}\` }] }) }} />
      <nav className="text-sm text-gray-400 mb-6 flex flex-wrap gap-2"><Link href="/" className="hover:text-water transition">Home</Link><span>/</span><Link href="/${st.slug}" className="hover:text-water transition">${st.name}</Link><span>/</span><span className="text-charcoal font-medium">{lake.name}</span></nav>
      <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Every Boat Ramp on {lake.name}</h1>
      <p className="text-gray-500 mb-6">{lakeRamps.length} boat ramps &middot; {lake.counties.join(", ")}, ${st.name}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">{[{ label: lake.acres > 0 ? "Surface Acres" : "Shoreline", value: lake.acres > 0 ? lake.acres.toLocaleString() : \`\${lake.shorelineMiles} mi\` },{ label: "Max Depth", value: \`\${lake.maxDepth} ft\` },{ label: "Boat Ramps", value: String(lakeRamps.length) },{ label: "Fish Species", value: String(lake.fishSpecies.length) }].map((s) => (<div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm"><p className="text-2xl font-bold text-water font-[Cabin]">{s.value}</p><p className="text-gray-400 text-xs mt-1">{s.label}</p></div>))}</div>
      <div className="flex flex-wrap gap-2 mb-10">{lake.fishSpecies.map((s) => <span key={s} className="bg-forest/10 text-forest text-sm font-medium px-3 py-1.5 rounded-lg">{s}</span>)}</div>
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Boat Ramps on {lake.name}</h2>
      <div className="mb-12"><LakeRampList ramps={lakeRamps} stateName="${st.name}" /></div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm"><h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">About {lake.name}</h2>{lake.description.split("\\n\\n").map((p, i) => <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0">{p}</p>)}<p className="text-gray-400 text-sm mt-4">Nearest towns: {lake.nearestTowns.join(", ")}</p></div>
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">FAQ</h2>
      <div className="space-y-2 mb-12">{faqs.map((f, i) => (<details key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group"><summary className="px-5 py-4 cursor-pointer font-semibold text-charcoal text-sm hover:text-water transition list-none flex items-center justify-between">{f.q}<svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></summary><div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{f.a}</div></details>))}</div>
      <CletusAd />
      <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">Other ${st.name} Waters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{otherLakes.map((l) => (<Link key={l.id} href={\`/${st.slug}/lakes/\${l.id}\`} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border-l-4 border-l-water"><p className="font-bold text-charcoal group-hover:text-water transition">{l.name}</p><p className="text-gray-500 text-sm">{l.nearestTowns[0]}</p></Link>))}</div>
    </div>
  );
}
`);
}

console.log('Generated all ' + states.length + ' states successfully');

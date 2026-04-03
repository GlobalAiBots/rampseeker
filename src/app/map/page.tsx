import Link from "next/link";
import { ramps, amenityLabels } from "@/data/ramps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boat Ramp Map — Grand Lake Oklahoma | RampSeeker",
  description: "Interactive map of every boat ramp on Grand Lake O' the Cherokees. Click any ramp for GPS coordinates, amenities, and directions.",
  openGraph: {
    title: "Grand Lake Boat Ramp Map",
    description: "See every boat ramp on Grand Lake in one map.",
    url: "https://rampseeker.com/map",
  },
  alternates: { canonical: "https://rampseeker.com/map" },
};

export default function MapPage() {
  const center = "36.55,-94.85";
  const embedUrl = `https://www.google.com/maps?q=Grand+Lake+Oklahoma+boat+ramps&ll=${center}&z=10&output=embed`;

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-[Cabin] text-3xl md:text-4xl font-bold text-charcoal mb-2">Grand Lake Boat Ramp Map</h1>
        <p className="text-gray-500 mb-6">{ramps.length} boat ramps across Grand Lake O&apos; the Cherokees</p>

        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-10" style={{ height: 500 }}>
          <iframe src={embedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Grand Lake boat ramps map" />
        </div>

        <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-4">All Ramps</h2>
        <div className="space-y-3">
          {ramps.map((r) => (
            <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex-1 min-w-0">
                <Link href={`/ramps/${r.id}`} className="font-bold text-charcoal hover:text-water transition">{r.name}</Link>
                <p className="text-gray-500 text-sm">{r.city}, {r.state} &middot; {r.rampCount} ramp{r.rampCount > 1 ? "s" : ""} &middot; {r.fee === "free" ? "Free" : r.fee}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {r.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="text-xs text-gray-400">{amenityLabels[a]?.icon} {amenityLabels[a]?.label}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-gray-400 font-mono">{r.latitude}, {r.longitude}</span>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${r.latitude},${r.longitude}`} target="_blank" rel="noopener noreferrer" className="bg-sunset/10 hover:bg-sunset/20 text-sunset text-xs font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap">
                  Open in Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

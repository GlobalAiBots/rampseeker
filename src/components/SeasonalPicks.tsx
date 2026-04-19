type Product = { name: string; desc: string; q: string };
type Season = { label: string; emoji: string; headline: string; items: Product[] };

const AFFILIATE_TAG = "babymydog03-20";
const amazonSearch = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AFFILIATE_TAG}`;

const SEASONS: Record<"spring" | "summer" | "fall" | "winter", Season> = {
  spring: {
    label: "Spring",
    emoji: "\u{1F33F}",
    headline: "Get your rig ready for opening day",
    items: [
      { name: "Marine Battery Charger", desc: "Wake your battery up after winter storage. Maintenance mode keeps it topped off all season.", q: "marine battery charger maintainer" },
      { name: "Bearing Buddies + Grease", desc: "Repack trailer bearings before the first launch. The #1 failure point on boat trailers.", q: "bearing buddies marine grease" },
      { name: "Hull Cleaner", desc: "Strip waterline scum and algae from the off-season. Back to a showroom hull in an hour.", q: "boat hull cleaner" },
    ],
  },
  summer: {
    label: "Summer",
    emoji: "\u{2600}",
    headline: "Family trip essentials for peak boating season",
    items: [
      { name: "Type III Life Jackets (4-Pack)", desc: "Coast Guard approved, comfortable to wear. One per passenger is the law in every state.", q: "type iii life jackets 4 pack" },
      { name: "Marine Cooler", desc: "Holds ice for days. The difference between a good trip and a great one is cold drinks.", q: "marine cooler 60 quart" },
      { name: "Dry Bag (Waterproof)", desc: "Keep phones, wallets, and keys dry through any wave or downpour.", q: "waterproof dry bag 20l" },
    ],
  },
  fall: {
    label: "Fall",
    emoji: "\u{1F342}",
    headline: "Peak fishing + start winterizing",
    items: [
      { name: "Fish Finder", desc: "Fall turnover concentrates bass in predictable depths. A sonar unit makes fall fishing a cheat code.", q: "garmin striker 4 fish finder" },
      { name: "Fuel Stabilizer", desc: "Add to the tank before the last trip of the year. Prevents gummed-up carburetors and hard starts in spring.", q: "stabil fuel stabilizer" },
      { name: "Marine Antifreeze", desc: "Non-toxic, propylene-glycol based. Essential for winterizing the cooling system on any inboard or I/O.", q: "marine antifreeze propylene glycol" },
    ],
  },
  winter: {
    label: "Winter",
    emoji: "\u{2744}",
    headline: "Winter storage + ice fishing",
    items: [
      { name: "Universal Boat Cover", desc: "UV and weather protection for off-season storage. Trailerable with proper straps.", q: "universal boat cover" },
      { name: "Battery Maintainer", desc: "Trickle-charges your marine battery all winter. Avoid replacing a dead battery every spring.", q: "battery tender jr 12v" },
      { name: "Ice Auger", desc: "Northern states only &mdash; drill through 8+ inches of ice in under a minute. Hand or electric.", q: "electric ice auger" },
    ],
  },
};

function getSeason(): keyof typeof SEASONS {
  const m = new Date().getMonth(); // 0-11
  if (m >= 2 && m <= 4) return "spring"; // Mar-May
  if (m >= 5 && m <= 7) return "summer"; // Jun-Aug
  if (m >= 8 && m <= 10) return "fall"; // Sep-Nov
  return "winter"; // Dec-Feb
}

export default function SeasonalPicks() {
  const season = SEASONS[getSeason()];

  return (
    <div className="my-10">
      <div className="flex items-baseline gap-3 mb-1">
        <h3 className="font-[Cabin] text-lg font-bold text-charcoal">This {season.label}&apos;s Picks</h3>
        <span className="text-[11px] font-bold tracking-widest uppercase text-sunset">{season.emoji} Limited-Time Featured</span>
      </div>
      <p className="text-gray-500 text-sm mb-4">{season.headline}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {season.items.map((item) => (
          <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
            <p className="font-bold text-charcoal text-sm">{item.name}</p>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed flex-1">{item.desc}</p>
            <a
              href={amazonSearch(item.q)}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-block mt-3 text-xs font-semibold text-sunset hover:text-sunset-dark transition"
            >
              &#9733; Our Pick &mdash; View on Amazon
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

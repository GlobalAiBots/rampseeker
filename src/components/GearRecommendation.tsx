type Product = { name: string; desc: string; asin: string };

const AFFILIATE_TAG = "babymydog03-20";
const amazonUrl = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;

const SECTIONS: Record<string, { title: string; items: Product[] }> = {
  "launch-gear": {
    title: "Essential Boat Launch Gear",
    items: [
      { name: "Trailer Guide Poles", desc: "Makes solo launching easy. Guide your boat onto the trailer every time, even in wind and current.", asin: "B0006MX56Y" },
      { name: "Transom Tie-Down Straps", desc: "Keep your boat locked to the trailer on the highway. Rated for the drive, not just the driveway.", asin: "B001FZXYGS" },
      { name: "Universal Boat Drain Plug", desc: "The one piece of gear everyone forgets. Keep a spare in the truck.", asin: "B000LESQZW" },
      { name: "Waterproof Phone Case", desc: "Touchscreen-compatible. Keep your phone dry while checking GPS at the ramp.", asin: "B09BYM4LKJ" },
      { name: "LED Trailer Lights", desc: "Sealed, waterproof, and brighter than OEM. A night-launch essential.", asin: "B07RM3CVFK" },
      { name: "Wheel Bearing Grease", desc: "The #1 trailer failure point. Repack before every season with marine-grade grease.", asin: "B000CITK8S" },
    ],
  },
  "water-essentials": {
    title: "On the Water Essentials",
    items: [
      { name: "Type III Life Jackets (Adult)", desc: "Coast Guard approved. Comfortable enough to actually wear, not just keep on the boat.", asin: "B001GQ2A6O" },
      { name: "Marine First Aid Kit", desc: "Waterproof case with the basics for hooks, cuts, sunburn, and seasickness.", asin: "B000069EYA" },
      { name: "Floating Keychain", desc: "Because dropping your truck keys in the lake ends the trip.", asin: "B000HAGNQU" },
      { name: "Boat Fenders (2-Pack)", desc: "Protect the hull at courtesy docks and when rafting up with other boats.", asin: "B000ALQ7VO" },
      { name: "Marine Sunscreen SPF 50", desc: "Water-resistant and reef-safe. You will need this more than you think.", asin: "B07B4NGSM2" },
      { name: "Waterproof Dry Bag", desc: "Keep phones, wallets, and spare clothes dry in any weather.", asin: "B01L92CS2A" },
    ],
  },
  "electronics": {
    title: "Fish Finder & Electronics",
    items: [
      { name: "Garmin Striker 4 Fish Finder", desc: "The best-selling entry-level fish finder. CHIRP sonar and built-in GPS for under $120.", asin: "B017NI87TG" },
      { name: "Humminbird Helix 5", desc: "A serious step up. Side imaging, CHIRP, and a 5-inch display for finding structure.", asin: "B084D5Z8PQ" },
      { name: "Marine USB Charger", desc: "12V waterproof dual-USB. Keep phones and GPS charged all day on the water.", asin: "B07H1Z9V4P" },
    ],
  },
};

export default function GearRecommendation({ section = "launch-gear", heading }: { section?: keyof typeof SECTIONS; heading?: string }) {
  const data = SECTIONS[section] || SECTIONS["launch-gear"];
  const title = heading ?? data.title;

  return (
    <div className="my-10">
      <h3 className="font-[Cabin] text-lg font-bold text-charcoal mb-1">{title}</h3>
      <p className="text-gray-400 text-xs mb-4">As an Amazon Associate we earn from qualifying purchases.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.items.map((item) => (
          <div key={item.asin} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
            <p className="font-bold text-charcoal text-sm">{item.name}</p>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed flex-1">{item.desc}</p>
            <a
              href={amazonUrl(item.asin)}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-block mt-3 text-xs font-semibold text-sunset hover:text-sunset-dark transition"
            >
              View on Amazon &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

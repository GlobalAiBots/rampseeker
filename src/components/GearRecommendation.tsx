const items = [
  {
    name: "Trailer Guide-Ons",
    desc: "Makes solo launching easy. Guide your boat onto the trailer every time, even in wind and current.",
    link: "#",
  },
  {
    name: "Dock Bumpers",
    desc: "Protect your boat at the courtesy dock. Essential for busy ramps where boats raft up.",
    link: "#",
  },
  {
    name: "Waterproof Phone Case",
    desc: "Keep your phone dry while checking GPS coordinates at the ramp. Touchscreen-compatible.",
    link: "#",
  },
  {
    name: "Boat Ramp Mat",
    desc: "Prevent slipping on wet concrete ramps. Non-slip surface for your truck tires and your feet.",
    link: "#",
  },
];

export default function GearRecommendation() {
  return (
    <div className="my-10">
      <h3 className="font-[Cabin] text-lg font-bold text-charcoal mb-4">Recommended Gear</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.name} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="font-bold text-charcoal text-sm">{item.name}</p>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs font-semibold text-sunset hover:text-sunset-dark transition"
            >
              View on Amazon &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

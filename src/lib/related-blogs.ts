// Contextual "Related Guide" widget for /ramps/[id] pages.

type BlogTease = { slug: string; title: string; excerpt: string };

const BLOGS: Record<string, BlogTease> = {
  "how-to-launch-a-boat-safely": {
    slug: "how-to-launch-a-boat-safely",
    title: "How to Launch a Boat Safely",
    excerpt: "Step-by-step launch procedure for trailer boats: pre-launch prep, backing in, tie-off, clearing the lane, and the mistakes that hold up the line. What the experienced boaters do without thinking.",
  },
  "how-to-back-trailer": {
    slug: "how-to-back-trailer",
    title: "How to Back a Boat Trailer",
    excerpt: "Hand-at-bottom-of-wheel technique, use your mirrors (not the rearview), slow speed, practice in an empty lot first. The method everyone should know before their first public ramp.",
  },
  "backing-boat-trailer-beginner-guide": {
    slug: "backing-boat-trailer-beginner-guide",
    title: "Backing a Boat Trailer: Beginner Guide",
    excerpt: "Detailed beginner walkthrough with diagrams: initial setup, steering counter-intuitively (trailer goes opposite), common jackknife causes, and what to do when you need to pull forward and restart.",
  },
  "boat-ramp-etiquette": {
    slug: "boat-ramp-etiquette",
    title: "Boat Ramp Etiquette",
    excerpt: "10 rules everyone should know: prep in the parking lot not on the ramp, use the staging area, keep the loading lane clear, and don't block other boaters. Avoid being the person everyone complains about.",
  },
  "boat-ramp-parking-tips": {
    slug: "boat-ramp-parking-tips",
    title: "Boat Ramp Parking Rules",
    excerpt: "Trailer-designated spots, don't block turn radius, park straight, tide-level zones, overnight rules, and anti-theft basics. Everything the posted signs don't tell you.",
  },
  "free-boat-ramps-how-to-find-them": {
    slug: "free-boat-ramps-how-to-find-them",
    title: "How to Find Free Boat Ramps",
    excerpt: "Federal/state/county/city sources, Army Corps of Engineers ramps, public access laws, and the apps that map free launches. Avoid paying $20 when $0 works.",
  },
  "boat-trailer-maintenance-checklist": {
    slug: "boat-trailer-maintenance-checklist",
    title: "Boat Trailer Maintenance Checklist",
    excerpt: "Pre-trip 5-min check, post-trip rinse, monthly bearing grease, annual repack. The schedule that prevents 95% of roadside trailer breakdowns.",
  },
  "what-size-truck-to-tow-a-boat": {
    slug: "what-size-truck-to-tow-a-boat",
    title: "What Size Truck to Tow a Boat",
    excerpt: "GVWR, towing capacity, and tongue weight explained. Boat weights by size and truck class recommendations from mid-size to one-ton. The 20% safety margin rule.",
  },
  "must-have-boat-trip-items": {
    slug: "must-have-boat-trip-items",
    title: "10 Must-Have Items for Every Boat Trip",
    excerpt: "Life jackets, first aid kit, fire extinguisher, VHF radio, anchor line. The required gear and the nice-to-haves that save trips when something goes wrong.",
  },
  "spring-boat-prep": {
    slug: "spring-boat-prep",
    title: "Spring Boat Prep",
    excerpt: "De-winterize checklist: battery, fuel, impeller, bellows, anodes, trailer lights. The spring sequence that catches problems before they strand you on the water.",
  },
  "winterize-your-boat": {
    slug: "winterize-your-boat",
    title: "Winterize Your Boat",
    excerpt: "Engine winterization, fuel stabilizer, drain schedule, shrink-wrap vs tarp. End-of-season tasks that prevent $2,000+ in freeze damage.",
  },
  "jet-ski-launch-ramps": {
    slug: "jet-ski-launch-ramps",
    title: "Jet Ski Launch Ramps",
    excerpt: "Which ramps are PWC-friendly, how to launch solo, load protocol, and the etiquette differences between PWC and full-size boat launching.",
  },
  "kayak-launch-sites": {
    slug: "kayak-launch-sites",
    title: "Kayak Launch Sites",
    excerpt: "Dedicated kayak launches, using boat ramps safely as a paddler, put-in vs take-out logistics, and finding sites without a boat ramp at all.",
  },
};

type RampShape = { name?: string; city?: string; state?: string; featured?: boolean };

export function getRelatedRampBlog(ramp: RampShape): BlogTease {
  const name = (ramp.name || "").toLowerCase();
  if (name.includes("kayak") || name.includes("paddle") || name.includes("canoe"))
    return BLOGS["kayak-launch-sites"];
  if (name.includes("jet ski") || name.includes("pwc") || name.includes("personal watercraft"))
    return BLOGS["jet-ski-launch-ramps"];
  if (name.includes("public") || name.includes("free"))
    return BLOGS["free-boat-ramps-how-to-find-them"];

  const fallback = [
    "how-to-launch-a-boat-safely",
    "how-to-back-trailer",
    "boat-ramp-etiquette",
    "boat-ramp-parking-tips",
    "boat-trailer-maintenance-checklist",
    "what-size-truck-to-tow-a-boat",
    "must-have-boat-trip-items",
    "spring-boat-prep",
  ];
  const hash = (ramp.city || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return BLOGS[fallback[hash % fallback.length]];
}

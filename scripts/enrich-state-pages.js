const fs = require("fs");
const path = require("path");

const stateData = {
  alabama: { name: "Alabama", code: "AL", waters: "Lake Guntersville, Wheeler Lake, and the Mobile Delta", fish: "largemouth bass, crappie, and redfish" },
  alaska: { name: "Alaska", code: "AK", waters: "Kenai River, Prince William Sound, and the Inside Passage", fish: "salmon, halibut, and rainbow trout" },
  arizona: { name: "Arizona", code: "AZ", waters: "Lake Powell, Lake Havasu, and Roosevelt Lake", fish: "bass, catfish, and trout" },
  arkansas: { name: "Arkansas", code: "AR", waters: "Beaver Lake, Bull Shoals, and the White River", fish: "bass, trout, and crappie" },
  california: { name: "California", code: "CA", waters: "Lake Shasta, Clear Lake, and the Sacramento Delta", fish: "bass, salmon, and stripers" },
  colorado: { name: "Colorado", code: "CO", waters: "Lake Granby, Blue Mesa Reservoir, and the Colorado River", fish: "trout, kokanee salmon, and walleye" },
  connecticut: { name: "Connecticut", code: "CT", waters: "Candlewood Lake, Long Island Sound, and the Connecticut River", fish: "bass, bluefish, and trout" },
  delaware: { name: "Delaware", code: "DE", waters: "Delaware Bay, Indian River Bay, and Lums Pond", fish: "striped bass, bluefish, and catfish" },
  florida: { name: "Florida", code: "FL", waters: "Lake Okeechobee, the Keys, and Tampa Bay", fish: "bass, snook, redfish, and tarpon" },
  georgia: { name: "Georgia", code: "GA", waters: "Lake Lanier, Lake Oconee, and the Georgia coast", fish: "bass, catfish, and redfish" },
  hawaii: { name: "Hawaii", code: "HI", waters: "Kaneohe Bay, Kailua Bay, and the Pacific coast", fish: "mahi-mahi, tuna, and marlin" },
  idaho: { name: "Idaho", code: "ID", waters: "Lake Coeur d'Alene, Payette Lake, and the Snake River", fish: "trout, kokanee, and sturgeon" },
  illinois: { name: "Illinois", code: "IL", waters: "Lake Michigan, Rend Lake, and the Illinois River", fish: "bass, walleye, and catfish" },
  indiana: { name: "Indiana", code: "IN", waters: "Monroe Lake, Patoka Lake, and the Ohio River", fish: "bass, bluegill, and catfish" },
  iowa: { name: "Iowa", code: "IA", waters: "Okoboji, Saylorville Lake, and the Mississippi River", fish: "walleye, bass, and catfish" },
  kansas: { name: "Kansas", code: "KS", waters: "Milford Lake, Glen Elder Reservoir, and Cheney Reservoir", fish: "walleye, wiper, and bass" },
  kentucky: { name: "Kentucky", code: "KY", waters: "Kentucky Lake, Lake Cumberland, and Dale Hollow", fish: "bass, crappie, and catfish" },
  louisiana: { name: "Louisiana", code: "LA", waters: "Toledo Bend, Lake Pontchartrain, and the Gulf Coast", fish: "bass, redfish, and speckled trout" },
  maine: { name: "Maine", code: "ME", waters: "Moosehead Lake, Sebago Lake, and the Atlantic coast", fish: "landlocked salmon, trout, and striped bass" },
  maryland: { name: "Maryland", code: "MD", waters: "the Chesapeake Bay, Deep Creek Lake, and the Potomac River", fish: "striped bass, blue crabs, and catfish" },
  massachusetts: { name: "Massachusetts", code: "MA", waters: "Quabbin Reservoir, Cape Cod, and the Connecticut River", fish: "bass, trout, and striped bass" },
  michigan: { name: "Michigan", code: "MI", waters: "the Great Lakes, Houghton Lake, and the Au Sable River", fish: "walleye, salmon, and perch" },
  minnesota: { name: "Minnesota", code: "MN", waters: "Mille Lacs, Lake of the Woods, and the Boundary Waters", fish: "walleye, northern pike, and muskie" },
  mississippi: { name: "Mississippi", code: "MS", waters: "Ross Barnett Reservoir, Grenada Lake, and the Gulf Coast", fish: "bass, crappie, and redfish" },
  missouri: { name: "Missouri", code: "MO", waters: "Table Rock Lake, Lake of the Ozarks, and Truman Lake", fish: "bass, crappie, and catfish" },
  montana: { name: "Montana", code: "MT", waters: "Flathead Lake, Fort Peck Reservoir, and the Missouri River", fish: "trout, walleye, and pike" },
  nebraska: { name: "Nebraska", code: "NE", waters: "McConaughy Lake, Lewis and Clark Lake, and the Platte River", fish: "walleye, wiper, and catfish" },
  nevada: { name: "Nevada", code: "NV", waters: "Lake Mead, Pyramid Lake, and Lake Tahoe", fish: "bass, trout, and stripers" },
  "new-hampshire": { name: "New Hampshire", code: "NH", waters: "Lake Winnipesaukee, Squam Lake, and the Connecticut River", fish: "bass, trout, and landlocked salmon" },
  "new-jersey": { name: "New Jersey", code: "NJ", waters: "Barnegat Bay, Round Valley Reservoir, and the Delaware River", fish: "bass, trout, and striped bass" },
  "new-mexico": { name: "New Mexico", code: "NM", waters: "Elephant Butte, Navajo Lake, and Conchas Lake", fish: "bass, walleye, and catfish" },
  "new-york": { name: "New York", code: "NY", waters: "the Finger Lakes, Lake Ontario, and the Hudson River", fish: "bass, walleye, and trout" },
  "north-carolina": { name: "North Carolina", code: "NC", waters: "Jordan Lake, Falls Lake, and the Outer Banks", fish: "bass, crappie, and flounder" },
  "north-dakota": { name: "North Dakota", code: "ND", waters: "Lake Sakakawea, Devils Lake, and the Missouri River", fish: "walleye, pike, and perch" },
  ohio: { name: "Ohio", code: "OH", waters: "Lake Erie, Alum Creek, and the Ohio River", fish: "walleye, bass, and perch" },
  oklahoma: { name: "Oklahoma", code: "OK", waters: "Grand Lake, Lake Texoma, and Broken Bow", fish: "bass, catfish, and crappie" },
  oregon: { name: "Oregon", code: "OR", waters: "the Columbia River, Crater Lake, and the Oregon coast", fish: "salmon, steelhead, and bass" },
  pennsylvania: { name: "Pennsylvania", code: "PA", waters: "Lake Erie, Raystown Lake, and the Delaware River", fish: "walleye, bass, and trout" },
  "south-carolina": { name: "South Carolina", code: "SC", waters: "Lake Murray, Santee Cooper, and the Lowcountry coast", fish: "bass, catfish, and redfish" },
  "south-dakota": { name: "South Dakota", code: "SD", waters: "Lake Oahe, Lake Sharpe, and the Missouri River", fish: "walleye, bass, and catfish" },
  tennessee: { name: "Tennessee", code: "TN", waters: "Norris Lake, Cherokee Lake, and the Tennessee River", fish: "bass, crappie, and catfish" },
  texas: { name: "Texas", code: "TX", waters: "Lake Travis, Sam Rayburn, and the Gulf Coast", fish: "bass, catfish, and redfish" },
  utah: { name: "Utah", code: "UT", waters: "Lake Powell, Strawberry Reservoir, and Flaming Gorge", fish: "bass, trout, and kokanee" },
  virginia: { name: "Virginia", code: "VA", waters: "Smith Mountain Lake, the Chesapeake Bay, and Lake Anna", fish: "bass, stripers, and catfish" },
  washington: { name: "Washington", code: "WA", waters: "Puget Sound, Lake Chelan, and the Columbia River", fish: "salmon, steelhead, and walleye" },
  "west-virginia": { name: "West Virginia", code: "WV", waters: "Summersville Lake, Stonewall Jackson Lake, and the New River", fish: "bass, walleye, and trout" },
  wyoming: { name: "Wyoming", code: "WY", waters: "Yellowstone Lake, Flaming Gorge, and Boysen Reservoir", fish: "trout, walleye, and kokanee" },
};

const appDir = path.join(__dirname, "..", "src", "app");
let updated = 0, skipped = 0;

for (const [slug, info] of Object.entries(stateData)) {
  const filePath = path.join(appDir, slug, "page.tsx");
  if (!fs.existsSync(filePath)) { skipped++; continue; }
  let content = fs.readFileSync(filePath, "utf8");

  // Skip if already enriched
  if (content.includes("Tips for Boating")) { skipped++; continue; }

  // 1. Add intro paragraph after the hero </section>
  const heroEnd = content.indexOf("</section>", content.indexOf("md:text-5xl"));
  if (heroEnd === -1) { skipped++; continue; }
  const insertPoint = heroEnd + "</section>".length;

  const introBlock = `

      {/* State intro */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-[Cabin] text-xl font-bold text-charcoal mb-3">Boating in ${info.name}</h2>
          <p className="text-gray-600 leading-relaxed text-sm">${info.name} offers {${slug.replace(/-/g, "").substring(0, 2)}Ramps.length.toLocaleString()}+ public boat ramps across its waterways. From ${info.waters}, the state provides excellent access for boaters, anglers, and kayakers. Popular catches include ${info.fish}. <Link href="/blog/how-to-launch-a-boat-safely" className="text-water hover:underline">Learn how to launch safely</Link>.</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-[Cabin] font-bold text-water mb-3">Tips for Boating in ${info.name}</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> ${info.name} requires all motorized boats to be registered before launching at any public ramp.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> A fishing license is required for anyone 16+ fishing from a boat in ${info.name}.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Life jackets are required for all children under 13 on any watercraft in ${info.name}.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Most public ramps are first-come, first-served &mdash; arrive early on weekends and holidays.</li>
            <li className="flex items-start gap-2"><span className="text-water mt-0.5">&#10003;</span> Practice good <Link href="/blog/boat-ramp-etiquette" className="text-water hover:underline">ramp etiquette</Link>: prep in the parking area, not on the ramp.</li>
          </ul>
        </div>
      </section>`;

  content = content.slice(0, insertPoint) + introBlock + content.slice(insertPoint);

  // 2. Fix the ramp variable name reference in the intro
  // Find the variable name used for ramps (e.g., alRamps, txRamps, flRamps)
  const rampVarMatch = content.match(/const (\w+Ramps) = useMemo/);
  const rampVar = rampVarMatch ? rampVarMatch[1] : "alRamps";
  // Replace the placeholder
  const placeholder = `{${slug.replace(/-/g, "").substring(0, 2)}Ramps.length.toLocaleString()}`;
  content = content.replace(placeholder, `{${rampVar}.length.toLocaleString()}`);

  // 3. Add 2 more FAQ questions to the visible FAQ
  // Find the existing FAQ array closing
  const faqPattern = /(\{ q: "(?:How do I find|Do I need).*?\},?\s*\n\s*\]\s*\.map)/;
  const faqMatch = content.match(faqPattern);
  if (faqMatch) {
    const addFaqs = `
            { q: "Do I need a boating license in ${info.name}?", a: "${info.name} requires a boating safety education certificate for boat operators. Check with the state's wildlife agency for specific age and horsepower requirements." },
            { q: "When is the best time to boat in ${info.name}?", a: "Peak boating season in ${info.name} runs from May through October, but many waterways are accessible year-round. Spring and fall offer less crowded conditions and excellent fishing." },
          ].map`;
    content = content.replace(faqPattern, faqMatch[0].replace("].map", addFaqs));
  }

  // 4. Convert city buttons to Links (replace <button with <Link href)
  content = content.replace(
    /(<button key=\{city\} onClick=\{[^}]+\} className=\{[^}]+\}>)/g,
    `<Link key={city} href={\`/cities/\${city.toLowerCase().replace(/\\s+/g, "-")}\`} className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-water hover:shadow-sm transition">`
  );
  content = content.replace(/<\/button>\)\)}/g, "</Link>))}");

  fs.writeFileSync(filePath, content);
  updated++;
}

console.log(`Updated: ${updated}, Skipped: ${skipped}`);

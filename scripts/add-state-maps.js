const fs = require("fs");
const path = require("path");

const stateNames = ['alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware','florida','georgia','hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana','maine','maryland','massachusetts','michigan','minnesota','mississippi','missouri','montana','nebraska','nevada','new-hampshire','new-jersey','new-mexico','new-york','north-carolina','north-dakota','ohio','oklahoma','oregon','pennsylvania','south-carolina','south-dakota','tennessee','texas','utah','virginia','washington','west-virginia','wyoming'];

let updated = 0;
for (const slug of stateNames) {
  const f = path.join("src/app", slug, "page.tsx");
  if (!fs.existsSync(f)) continue;
  let c = fs.readFileSync(f, "utf8");
  if (c.includes("RampMap")) continue;

  // Add dynamic import
  if (!c.includes("import dynamic")) {
    c = c.replace('"use client";', '"use client";\n\nimport dynamic from "next/dynamic";');
  }

  // Add RampMap import after dynamic
  c = c.replace(
    'import dynamic from "next/dynamic";',
    'import dynamic from "next/dynamic";\nconst RampMap = dynamic(() => import("@/components/RampMap"), { ssr: false, loading: () => <div className="rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: 350 }}><p className="text-gray-400 text-sm">Loading map...</p></div> });'
  );

  // Find the ramps variable name (alRamps, txRamps, stRamps, etc.)
  const varMatch = c.match(/const (\w+Ramps) = useMemo/);
  const rampVar = varMatch ? varMatch[1] : "stRamps";

  // Insert map after the hero section
  const heroEnd = c.indexOf("</section>", c.indexOf("md:text-5xl"));
  if (heroEnd === -1) continue;
  const insertAt = heroEnd + "</section>".length;

  const mapBlock = `

      {/* State Map */}
      {(() => {
        const mapPins = ${rampVar}.map(r => ({ id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude, city: r.city }));
        const center: [number, number] = ${rampVar}.length > 0 ? [${rampVar}.reduce((s, r) => s + r.latitude, 0) / ${rampVar}.length, ${rampVar}.reduce((s, r) => s + r.longitude, 0) / ${rampVar}.length] : [39.8, -98.5];
        return <div className="max-w-6xl mx-auto px-4 pt-8"><RampMap ramps={mapPins} center={center} zoom={7} height="350px" className="mb-4" /></div>;
      })()}`;

  c = c.slice(0, insertAt) + mapBlock + c.slice(insertAt);
  fs.writeFileSync(f, c);
  updated++;
}
console.log("Updated:", updated, "state pages");

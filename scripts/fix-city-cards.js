const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "src", "app");

// Find all state page files
const stateDirs = fs.readdirSync(APP_DIR).filter((d) => {
  const skip = [
    "about", "best", "blog", "cities", "counties", "find", "fonts",
    "for-businesses", "grand-lake", "lakes", "map", "privacy", "ramps", "terms",
  ];
  if (skip.includes(d)) return false;
  const pagePath = path.join(APP_DIR, d, "page.tsx");
  return fs.existsSync(pagePath) && d !== "page.tsx" && !d.includes(".");
});

let modified = 0;
let skipped = 0;

for (const dir of stateDirs) {
  const filePath = path.join(APP_DIR, dir, "page.tsx");
  let content = fs.readFileSync(filePath, "utf8");

  // Skip if already modified
  if (content.includes("selectedCity")) {
    console.log(`SKIP ${dir} (already has selectedCity)`);
    skipped++;
    continue;
  }

  // 1. Add useState to import
  content = content.replace(
    /import \{ useMemo \} from "react";/,
    'import { useState, useMemo } from "react";'
  );

  // 2. Find the ramp variable name from the RampList usage
  const rampListMatch = content.match(/<RampList ramps=\{(\w+)\}/);
  if (!rampListMatch) {
    console.log(`SKIP ${dir} (no RampList found)`);
    skipped++;
    continue;
  }
  const rampVar = rampListMatch[1];

  // 3. Add selectedCity state and filteredRamps after cityMap useMemo
  const cityMapEnd = content.indexOf("}, [" + rampVar + "]);", content.indexOf("const cityMap"));
  if (cityMapEnd === -1) {
    // Try alternate pattern - some files use different var in cityMap dependency
    // Find the cityMap closing
    const cityMapIdx = content.indexOf("const cityMap");
    if (cityMapIdx === -1) {
      console.log(`SKIP ${dir} (no cityMap found)`);
      skipped++;
      continue;
    }
    // Find the next line after the cityMap useMemo ends
    const afterCityMap = content.indexOf("\n", content.indexOf(");", content.indexOf("}, [", cityMapIdx)));
    if (afterCityMap === -1) {
      console.log(`SKIP ${dir} (can't find cityMap end)`);
      skipped++;
      continue;
    }
    const insertPoint = afterCityMap;
    content = content.slice(0, insertPoint) +
      `\n\n  const [selectedCity, setSelectedCity] = useState<string | null>(null);\n  const filteredRamps = selectedCity ? ${rampVar}.filter(r => r.city?.trim() === selectedCity) : ${rampVar};` +
      content.slice(insertPoint);
  } else {
    const lineEnd = content.indexOf("\n", cityMapEnd);
    content = content.slice(0, lineEnd) +
      `\n\n  const [selectedCity, setSelectedCity] = useState<string | null>(null);\n  const filteredRamps = selectedCity ? ${rampVar}.filter(r => r.city?.trim() === selectedCity) : ${rampVar};` +
      content.slice(lineEnd);
  }

  // 4. Replace city card <div> with <button>
  content = content.replace(
    /\{cityMap\.slice\(0, 16\)\.map\(\(\[city, count\]\) => \(<div key=\{city\} className="bg-white border border-gray-200 rounded-lg p-3"><p className="font-bold text-charcoal text-sm">\{city\}<\/p><p className="text-gray-400 text-xs">\{count\} ramp\{count !== 1 \? "s" : ""\}<\/p><\/div>\)\)\}/,
    `{cityMap.slice(0, 16).map(([city, count]) => (<button key={city} onClick={() => { setSelectedCity(city === selectedCity ? null : city); document.getElementById('ramp-list')?.scrollIntoView({ behavior: 'smooth' }); }} className={\`text-left bg-white border rounded-lg p-3 hover:border-water hover:bg-blue-50 transition cursor-pointer \${selectedCity === city ? 'border-water bg-blue-50 ring-2 ring-water' : 'border-gray-200'}\`}><p className="font-bold text-charcoal text-sm">{city}</p><p className="text-gray-400 text-xs">{count} ramp{count !== 1 ? "s" : ""}</p></button>))}`
  );

  // 5. Add clear filter button and id="ramp-list" wrapper around RampList, pass filteredRamps
  const rampListRegex = new RegExp(
    `<RampList ramps=\\{${rampVar}\\} stateName="([^"]+)" \\/>`
  );
  const rlMatch = content.match(rampListRegex);
  if (rlMatch) {
    const stateName = rlMatch[1];
    content = content.replace(
      rampListRegex,
      `{selectedCity && (<div className="max-w-6xl mx-auto px-4 pb-4"><button onClick={() => setSelectedCity(null)} className="text-sm text-water hover:underline">&larr; Show all {${rampVar}.length} ramps</button></div>)}\n      <div id="ramp-list"><RampList ramps={filteredRamps} stateName="${stateName}" /></div>`
    );
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`OK ${dir} (rampVar=${rampVar})`);
  modified++;
}

console.log(`\nDone: ${modified} modified, ${skipped} skipped`);

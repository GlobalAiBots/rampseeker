const fs = require("fs");
const path = require("path");

const stateMap = {
  alabama:"Alabama",alaska:"Alaska",arizona:"Arizona",arkansas:"Arkansas",california:"California",colorado:"Colorado",connecticut:"Connecticut",delaware:"Delaware",florida:"Florida",georgia:"Georgia",hawaii:"Hawaii",idaho:"Idaho",illinois:"Illinois",indiana:"Indiana",iowa:"Iowa",kansas:"Kansas",kentucky:"Kentucky",louisiana:"Louisiana",maine:"Maine",maryland:"Maryland",massachusetts:"Massachusetts",michigan:"Michigan",minnesota:"Minnesota",mississippi:"Mississippi",missouri:"Missouri",montana:"Montana",nebraska:"Nebraska",nevada:"Nevada","new-hampshire":"New Hampshire","new-jersey":"New Jersey","new-mexico":"New Mexico","new-york":"New York","north-carolina":"North Carolina","north-dakota":"North Dakota",ohio:"Ohio",oklahoma:"Oklahoma",oregon:"Oregon",pennsylvania:"Pennsylvania","rhode-island":"Rhode Island","south-carolina":"South Carolina","south-dakota":"South Dakota",tennessee:"Tennessee",texas:"Texas",utah:"Utah",vermont:"Vermont",virginia:"Virginia",washington:"Washington","west-virginia":"West Virginia",wisconsin:"Wisconsin",wyoming:"Wyoming"
};

let updated = 0;

for (const [slug, name] of Object.entries(stateMap)) {
  const file = path.join("src/app", slug, "page.tsx");
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, "utf8");

  if (content.includes("FAQPage")) { continue; }

  // Find the ramp variable (alRamps, stRamps, flRamps, etc.)
  const varMatch = content.match(/const (\w+) = useMemo\(\(\) => unified\.filter/);
  const rampVar = varMatch ? varMatch[1] : "stRamps";

  // Build the FAQ schema block
  const faqBlock = `
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How many boat ramps are in ${name}?", acceptedAnswer: { "@type": "Answer", text: \`There are \${${rampVar}.length} boat ramps in ${name}. RampSeeker has mapped every public boat launch across the state.\` } },
          { "@type": "Question", name: "Are boat ramps in ${name} free?", acceptedAnswer: { "@type": "Answer", text: "Many boat ramps in ${name} are free, especially those managed by state parks or the Army Corps of Engineers. Some may charge a launch fee." } },
          { "@type": "Question", name: "How do I find boat ramps near me in ${name}?", acceptedAnswer: { "@type": "Answer", text: \`Use RampSeeker to browse all \${${rampVar}.length} boat ramps in ${name} by city. Each listing includes a map and directions.\` } },
        ],
      }) }} />`;

  // Insert after the first <div> in the return statement
  const returnMatch = content.match(/return\s*\(\s*\n\s*<div>/);
  if (!returnMatch) continue;

  const insertPos = content.indexOf(returnMatch[0]) + returnMatch[0].length;
  content = content.slice(0, insertPos) + faqBlock + content.slice(insertPos);

  fs.writeFileSync(file, content, "utf8");
  updated++;
}

console.log(`Updated ${updated} state pages with FAQPage schema`);

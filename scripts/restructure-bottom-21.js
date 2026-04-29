/* eslint-disable */
/**
 * Phase C structural restructure: takes each bottom-21 state page in the
 * pre-restructure template and rewrites it into the directory-first layout
 * matching the top-10 hand-written editorial pages, but WITHOUT new
 * editorial. Preserves existing intro paragraph text, tips list, FAQ items,
 * lakes-grid heading.
 *
 * Transformation per file:
 *   - Adds precomputedCities + stateRampTotals imports
 *   - Replaces inline cityMap useMemo with precomputed JSON lookup
 *   - Updates sub-grid Link href to state-prefixed slug format
 *   - Strips the intro-card chrome (keeps the inner <p> text only)
 *   - Moves Tips card and GearRecommendation to AFTER the RampList
 *   - Map block stays in position so everything else flows around it
 *     (effectively map moves up from its old position-5 to the new
 *     position-3 because the heavy intro section above it shrunk)
 */
const fs = require("fs");
const path = require("path");

const STATES = [
  { slug: "tennessee", name: "Tennessee" },
  { slug: "colorado", name: "Colorado" },
  { slug: "idaho", name: "Idaho" },
  { slug: "kansas", name: "Kansas" },
  { slug: "utah", name: "Utah" },
  { slug: "new-jersey", name: "New Jersey" },
  { slug: "new-hampshire", name: "New Hampshire" },
  { slug: "delaware", name: "Delaware" },
  { slug: "south-carolina", name: "South Carolina" },
  { slug: "north-dakota", name: "North Dakota" },
  { slug: "arizona", name: "Arizona" },
  { slug: "nebraska", name: "Nebraska" },
  { slug: "west-virginia", name: "West Virginia" },
  { slug: "south-dakota", name: "South Dakota" },
  { slug: "wyoming", name: "Wyoming" },
  { slug: "alaska", name: "Alaska" },
  { slug: "montana", name: "Montana" },
  { slug: "louisiana", name: "Louisiana" },
  { slug: "mississippi", name: "Mississippi" },
  { slug: "new-mexico", name: "New Mexico" },
];

function transformPage(text, slug, name) {
  // 1. Add precompute + totals imports
  if (!text.includes('precomputedCities')) {
    text = text.replace(
      /import GearRecommendation from "@\/components\/GearRecommendation";/,
      `import GearRecommendation from "@/components/GearRecommendation";\nimport precomputedCities from "@/data/state-cities-prefiltered.json";\nimport stateRampTotals from "@/data/state-ramp-totals.json";`,
    );
  }

  // 2. Replace cityMap useMemo with precomputed lookup
  text = text.replace(
    /const cityMap = useMemo\(\(\) => \{\s*const m: Record<string, number> = \{\};\s*for \(const r of \w+Ramps\) \{ const c = r\.city\?\.trim\(\); if \(c && c\.length > 1\) m\[c\] = \(m\[c\] \|\| 0\) \+ 1; \}\s*return Object\.entries\(m\)\.sort\(\(a, b\) => b\[1\] - a\[1\]\);\s*\}, \[\w+Ramps\]\);/,
    `const cityMap = ((precomputedCities as unknown) as Record<string, [string, number][]>)["${slug}"] || [];\n  const rampTotal = (stateRampTotals as Record<string, number>)["${slug}"] || 0;`,
  );

  // 3. Update sub-grid Link href to state-prefixed slug
  text = text.replace(
    /\{cityMap\.slice\(0, 16\)\.map\(\(\[city, count\]\) => \{ const slug = city\.toLowerCase\(\)\.replace\(\/\[\^a-z0-9\]\+\/g, "-"\); return \(<Link key=\{city\} href=\{`\/cities\/\$\{slug\}`\}/,
    `{cityMap.slice(0, 16).map(([city, count]) => { const slug = \`${slug}-\${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\`; return (<Link key={city} href={\`/cities/\${slug}\`}`,
  );

  // 4. Section reorder
  // Find and capture: the intro card paragraph text, the tips card JSX, and the gear component.
  // Strip the heavy intro section (intro card + tips card + gear) from its current position
  // (right after the hero). Replace with a plain brief-intro paragraph using the existing
  // intro card's <p> text. Then re-insert the captured tips card + gear AFTER the RampList,
  // just before the FAQ section.
  const heavyIntroRe = /\{\/\* State intro \*\/\}\s*<section className="max-w-4xl mx-auto px-4 pt-10 pb-2">\s*<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">\s*<h2[^>]*>([^<]*)<\/h2>\s*(<p[^>]*>[\s\S]*?<\/p>)\s*<\/div>\s*(<div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">[\s\S]*?<\/div>)\s*(<GearRecommendation[^>]*\/>)\s*<\/section>/;

  const heavyIntroMatch = text.match(heavyIntroRe);
  if (!heavyIntroMatch) {
    throw new Error(`heavy intro block not matched in ${slug}`);
  }
  const introHeading = heavyIntroMatch[1]; // e.g., "Boating in Tennessee"
  const introParagraphTag = heavyIntroMatch[2]; // <p ...>...</p>
  const tipsCard = heavyIntroMatch[3];
  const gearCmp = heavyIntroMatch[4];

  // Strip the intro <p>'s class so it renders as a plain paragraph; reuse the same text
  const introTextOnly = introParagraphTag.replace(/^<p[^>]*>/, "").replace(/<\/p>$/, "");

  const briefIntroSection = `{/* 2. BRIEF INTRO */}\n      <section className="max-w-4xl mx-auto px-4 pt-8">\n        <p className="text-gray-600 leading-relaxed text-sm md:text-base">${introTextOnly}</p>\n      </section>`;

  text = text.replace(heavyIntroRe, briefIntroSection);

  // Find the FAQ section boundary and inject tips + gear immediately before it.
  const faqAnchor = `<section className="max-w-4xl mx-auto px-4 py-10">\n        <h2 className="font-[Cabin] text-2xl font-bold text-charcoal mb-4">${name} Boating FAQ</h2>`;
  if (!text.includes(faqAnchor)) {
    throw new Error(`FAQ anchor not found in ${slug}`);
  }

  const tipsAndGear = `{/* 7. TIPS */}\n      <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">\n        ${tipsCard}\n      </section>\n\n      {/* 9. GEAR (3 items) */}\n      <section className="max-w-4xl mx-auto px-4 pb-4">\n        ${gearCmp}\n      </section>\n\n      `;

  text = text.replace(faqAnchor, tipsAndGear + faqAnchor);

  return text;
}

const stateAppDir = path.join(__dirname, "..", "src", "app");
let ok = 0;
let failed = [];
for (const s of STATES) {
  const file = path.join(stateAppDir, s.slug, "page.tsx");
  if (!fs.existsSync(file)) {
    console.log(`  SKIP (no file): ${s.slug}`);
    continue;
  }
  try {
    const before = fs.readFileSync(file, "utf8");
    if (before.includes("precomputedCities")) {
      console.log(`  SKIP (already restructured): ${s.slug}`);
      continue;
    }
    const after = transformPage(before, s.slug, s.name);
    fs.writeFileSync(file, after);
    console.log(`  ✓ ${s.slug}`);
    ok++;
  } catch (e) {
    console.log(`  ✗ ${s.slug}: ${e.message}`);
    failed.push(s.slug);
  }
}

console.log();
console.log(`Restructured ${ok} of ${STATES.length} state pages.`);
if (failed.length) console.log(`Failed: ${failed.join(", ")}`);

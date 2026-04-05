const fs = require('fs');
const path = require('path');

const states = [
  {slug:'alaska',code:'AK',prefix:'ak'},
  {slug:'arizona',code:'AZ',prefix:'az'},
  {slug:'california',code:'CA',prefix:'ca'},
  {slug:'colorado',code:'CO',prefix:'co'},
  {slug:'connecticut',code:'CT',prefix:'ct'},
  {slug:'delaware',code:'DE',prefix:'de'},
  {slug:'hawaii',code:'HI',prefix:'hi'},
  {slug:'idaho',code:'ID',prefix:'id'},
  {slug:'indiana',code:'IN',prefix:'in'},
  {slug:'iowa',code:'IA',prefix:'ia'},
  {slug:'kentucky',code:'KY',prefix:'ky'},
  {slug:'louisiana',code:'LA',prefix:'la'},
  {slug:'maine',code:'ME',prefix:'me'},
  {slug:'massachusetts',code:'MA',prefix:'ma'},
  {slug:'mississippi',code:'MS',prefix:'ms'},
  {slug:'montana',code:'MT',prefix:'mt'},
  {slug:'nebraska',code:'NE',prefix:'ne'},
  {slug:'new-hampshire',code:'NH',prefix:'nh'},
  {slug:'new-jersey',code:'NJ',prefix:'nj'},
  {slug:'new-mexico',code:'NM',prefix:'nm'},
  {slug:'north-dakota',code:'ND',prefix:'nd'},
  {slug:'pennsylvania',code:'PA',prefix:'pa'},
  {slug:'south-carolina',code:'SC',prefix:'sc'},
  {slug:'south-dakota',code:'SD',prefix:'sd'},
  {slug:'utah',code:'UT',prefix:'ut'},
  {slug:'virginia',code:'VA',prefix:'va'},
  {slug:'west-virginia',code:'WV',prefix:'wv'},
  {slug:'wyoming',code:'WY',prefix:'wy'},
];

const camel = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

const filePath = path.join(__dirname, '..', 'src', 'data', 'all-ramps.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Add imports after the last existing import
const lastImport = 'import tennesseeRampsRaw from "./tennessee-ramps.json";';
const newImports = states.map(s =>
  `import ${camel(s.slug)}RampsRaw from "./${s.slug}-ramps.json";`
).join('\n');
content = content.replace(lastImport, lastImport + '\n' + newImports);

// Add processing blocks before "export const unified"
let n = 19; // last existing block number
const newBlocks = states.map(s => {
  n++;
  const varName = camel(s.slug) + 'RampsRaw';
  return `
// ${n}. Add ${s.slug} ramps
for (const raw of ${varName}) {
  const cleanName = (raw.name || "Boat Ramp").replace(/[^\\w\\s'-]/g, "").trim();
  let slug = \`${s.prefix}-\${slugify(cleanName) || "boat-ramp"}\`;
  if (seenSlugs.has(slug)) slug = \`\${slug}-\${raw.place_id.substring(0, 8).toLowerCase()}\`;
  if (seenSlugs.has(slug)) slug = \`\${slug}-\${raw.place_id.substring(8, 16).toLowerCase()}\`;
  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);
  allRamps.push({ id: slug, name: cleanName, description: generateDescription({ ...raw, name: cleanName, city: raw.city || "", rating: raw.rating, total_ratings: raw.total_ratings, latitude: raw.latitude, longitude: raw.longitude }), latitude: raw.latitude, longitude: raw.longitude, address: raw.formatted_address || "", city: raw.city || "", county: raw.county || "", state: "${s.code}", rating: raw.rating || 0, totalRatings: raw.total_ratings || 0, featured: false, amenities: (raw as Record<string, unknown>).amenities as string[] | undefined, fee: (raw as Record<string, unknown>).fee as string | undefined, rampCount: (raw as Record<string, unknown>).rampCount as number | undefined });
}`;
}).join('\n');

content = content.replace(
  'export const unified = allRamps;',
  newBlocks + '\n\nexport const unified = allRamps;'
);

fs.writeFileSync(filePath, content);
console.log('Patched all-ramps.ts with ' + states.length + ' new state imports and processing blocks');

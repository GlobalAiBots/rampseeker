import { unified } from "../src/data/all-ramps";
import * as fs from "node:fs";

const urls = unified.map(r =>
  `  <url><loc>https://www.rampseeker.com/ramps/${r.id}</loc><lastmod>2026-04-21</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

fs.writeFileSync("public/sitemap-ramps.xml", xml);
fs.writeFileSync("scripts/output/sitemap-audit.txt", `Wrote ${urls.length} ramp URLs to sitemap-ramps.xml\n`);

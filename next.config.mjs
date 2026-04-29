import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cityRedirects = JSON.parse(readFileSync(join(__dirname, "src/data/city-redirects.json"), "utf8"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect duplicate-topic kayak slug to existing canonical post.
      { source: "/blog/kayak-launch-spots", destination: "/blog/kayak-launch-sites", permanent: true },
      // Migrate old bare /cities/{slug} URLs to state-prefixed /cities/{stateSlug}-{slug}.
      // Each redirect targets the highest-ramp-count state that owned that bare slug
      // before the migration, preserving what Google previously indexed.
      ...cityRedirects,
      // Canonicalize apex → www with 308 (Google AdSense ads.txt crawler does not reliably follow 307).
      { source: "/:path*", has: [{ type: "host", value: "rampseeker.com" }], destination: "https://www.rampseeker.com/:path*", permanent: true },
    ];
  },
};

export default nextConfig;

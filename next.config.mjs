/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect duplicate-topic kayak slug to existing canonical post.
      { source: "/blog/kayak-launch-spots", destination: "/blog/kayak-launch-sites", permanent: true },
      // Canonicalize apex → www with 308 (Google AdSense ads.txt crawler does not reliably follow 307).
      { source: "/:path*", has: [{ type: "host", value: "rampseeker.com" }], destination: "https://www.rampseeker.com/:path*", permanent: true },
    ];
  },
};

export default nextConfig;

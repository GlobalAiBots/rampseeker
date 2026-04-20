/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect duplicate-topic kayak slug to existing canonical post.
      { source: "/blog/kayak-launch-spots", destination: "/blog/kayak-launch-sites", permanent: true },
    ];
  },
};

export default nextConfig;

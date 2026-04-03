import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        "navy-light": "#1E293B",
        water: "#0EA5E9",
        "water-dark": "#0284C7",
        sand: "#F5E6D3",
        "sand-dark": "#E8D5BF",
      },
    },
  },
  plugins: [],
};
export default config;

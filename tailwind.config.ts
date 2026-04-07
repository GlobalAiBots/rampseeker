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
        cream: "#FAFAF5",
        water: "#1E6091",
        "water-light": "#2980B9",
        "water-deep": "#134B70",
        forest: "#2D6A4F",
        "forest-light": "#40916C",
        sunset: "#E76F51",
        "sunset-dark": "#D35F44",
        charcoal: "#2B2B2B",
        navy: "#0B1E33",
        "navy-light": "#162D4A",
        sand: "#F5F0E8",
        foam: "#E8F4F8",
      },
    },
  },
  plugins: [],
};
export default config;

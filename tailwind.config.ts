import type { Config } from "tailwindcss";

const config: Config = {
  // We remove darkMode: 'class' because we are creating a single, unified theme.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#3b82f6",
        "dark-bg": "#111827",
        "light-gray": "#9ca3af",
        "border-gray": "#374151",
        // --- NEW DEFINITIONS FOR OUR UNIFIED THEME ---
        "verdict-low-bg": "rgba(52, 211, 153, 0.1)", // Green with 10% opacity
        "verdict-low-text": "#34d399", // A nice, vibrant green
        "verdict-medium-bg": "rgba(251, 191, 36, 0.1)", // Yellow with 10% opacity
        "verdict-medium-text": "#fbbf24", // A nice, vibrant yellow
        "verdict-high-bg": "rgba(248, 113, 113, 0.1)", // Red with 10% opacity
        "verdict-high-text": "#f87171", // A nice, vibrant red
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")],
};
export default config;

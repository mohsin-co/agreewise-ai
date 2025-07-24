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
        "brand-blue": "#3b82f6",
        "dark-bg": "#111827",
        "light-gray": "#9ca3af",
        "border-gray": "#374151",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // This is the critical line that enables all blog styling
  ],
};
export default config;

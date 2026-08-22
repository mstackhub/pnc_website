import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1F6F54",
          dark: "#15513D",
          light: "#E8F3EE",
          bg: "#F7F8F6",
          white: "#FFFFFF",
          text: "#17211D",
          muted: "#66736D",
          border: "#DDE5E1",
          darkSection: "#102A21",
          success: "#1F6F54",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-ibm-plex-sans-thai)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        card: "0 10px 30px -5px rgba(23, 33, 29, 0.08)",
        floating: "0 20px 40px -15px rgba(31, 111, 84, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;

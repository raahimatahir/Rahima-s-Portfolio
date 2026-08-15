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
        background: "#121212",
        foreground: "#ffffff",
        sdg: {
          3: "#4c9f38", // Good Health
          4: "#c5192d", // Quality Education
          5: "#ff3a21", // Gender Equality
          10: "#dd1367", // Reduced Inequalities
          13: "#3f7e44", // Climate Action
          16: "#00689d", // Peace and Justice
          17: "#19486a", // Partnerships
        }
      },
    },
  },
  plugins: [],
};
export default config;

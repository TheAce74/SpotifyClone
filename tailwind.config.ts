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
        primary: "#1db954",
        neutral: {
          100: "#ffffff",
          200: "#b3b3b3",
          300: "#535353",
          800: "#212121",
          900: "#121212",
        },
      },
      borderRadius: {
        pill: "100vmax",
        circle: "50%",
      },
    },
  },
  plugins: [],
};
export default config;

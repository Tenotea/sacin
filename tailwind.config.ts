import { type Config } from "tailwindcss";
import d from "tailwindcss/defaultTheme";


export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-gilroy)", ...d.fontFamily.sans],
        serif: ["var(--font-charter)", ...d.fontFamily.serif],
        weather: ["var(--font-mate-sc)"],
        clash: ["var(--font-clash-display)"],
      },
    },
  },
  plugins: [],
} satisfies Config;

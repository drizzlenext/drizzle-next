import type { Config } from "tailwindcss";
import color from "tailwindcss/colors";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: color.zinc,
        muted: color.neutral,
        danger: color.red,
        info: color.blue,
        success: color.green,
        warning: color.yellow,
        checkbox: color.zinc,
        card: color.stone,
        input: color.blue,
        select: color.blue,
      },
    },
  },
  plugins: [typography],
} satisfies Config;

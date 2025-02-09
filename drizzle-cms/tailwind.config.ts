import type { Config } from "tailwindcss";
import color from "tailwindcss/colors";

export default {
  darkMode: "class",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/drizzle-ui/dist/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: color.slate,
        muted: color.gray,
        danger: color.red,
        info: color.blue,
        success: color.green,
        warning: color.yellow,
      },
    },
  },
  plugins: [],
} satisfies Config;

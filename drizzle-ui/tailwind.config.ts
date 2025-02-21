import type { Config } from "tailwindcss";
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
      borderColor: {
        DEFAULT: "var(--border)",
      },
      borderRadius: {
        alert: "var(--rounded-alert)",
        button: "var(--rounded-button)",
        card: "var(--rounded-card)",
        input: "var(--rounded-input)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        info: { DEFAULT: "var(--info)", foreground: "var(--info-foreground)" },
        dashboard: {
          DEFAULT: "var(--dashboard)",
          foreground: "var(--dashboard-foreground)",
        },
        header: {
          DEFAULT: "var(--header)",
          foreground: "var(--header-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        page: {
          DEFAULT: "var(--page)",
          foreground: "var(--page-foreground)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
        },
        input: {
          border: "var(--input-border)",
          background: "var(--input-background)",
          ring: "var(--input-ring)",
        },
        checkbox: "var(--checkbox)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;

# Installation

There are three ways to install Drizzle UI.

## Option 1: Use Drizzle Next

Drizzle UI is the default UI solution for Drizzle Next. There is nothing extra you need to do other than follow the [installation instructions here](https://www.drizzle-next.com/installation.html) for Drizzle Next. This is the recommended way to use Drizzle UI. However, if you want to use Drizzle UI without Drizzle Next, there are a few ways to do a standalone installation as outlined below.

## Option 2: Drizzle UI CLI

Step 1: Create a new Next.js project

```bash
npx create-next-app@latest my-app --typescript --eslint --tailwind --app --no-src-dir --no-import-alias --turbopack
```

Step 2: Run the init command

```bash
npx drizzle-ui@latest init
```

Step 3: Add components

```bash
npx drizzle-ui@latest add button
```

## Option 3: Manual Installation

Here is how you can install Drizzle UI into a Next.js project without using Drizzle Next CLI or Drizzle UI CLI.

Step 1: Create a new Next.js project

```bash
npx create-next-app@latest my-app --typescript --eslint --tailwind --app --no-src-dir --no-import-alias --turbopack
```

Step 2: Install a few dependencies

```
npm i clsx tailwind-merge
```

Step 2: Copy the cn utility

`lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Step 3: Copy the tailwind config

`tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";
import color from "tailwindcss/colors";

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
```

Step 4: Copy and paste

You can now copy and paste components from this website into the `components/ui` directory of your project.

## Option 3: Install as dependency

This option installs drizzle-ui as a dependency. This is the classic UI library approach. You can still style your components by adding extra classes, however you won't be able to change the underlying implementation, like adding new variants and functionality. If you never need to customize, you can try this option.

Step 1: Install drizzle-ui

```bash
npm i drizzle-ui
```

Step 2: Copy `tailwind.config.ts` into your project

```ts
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
        primary: color.zinc,
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
```

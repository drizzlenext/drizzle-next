# Drizzle UI Installation

Drizzle UI was built for Drizzle Next and Drizzle Admin. The components were extracted from the source code of Drizzle Next and made available as a standalone package. The components can be copied and pasted or it can be installed as a dependency.

There are three ways to install Drizzle UI.

## Option 1: Use Drizzle Next

Drizzle UI is the default UI solution for Drizzle Next. To use Drizzle UI with Drizzle Next follow the [Drizzle Next Installation Guide](/drizzle-next/installation/). This is the recommended way to use Drizzle UI. However, if you want to use Drizzle UI without Drizzle Next, there are a few ways to do a standalone installation:

## Option 2: Drizzle UI CLI

Using the Drizzle UI CLI is the fastest way to copy and paste components into your project.

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
npx drizzle-ui@latest add alert avatar button
```

Step 4: Use components

```tsx
import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div>
      <Button>Hello World</Button>
    </div>
  );
}
```

## Option 3: Install as dependency

This option installs drizzle-ui as a dependency. You can still style your components by adding extra classes, however you won't be able to change the underlying implementation.

Step 1: Create a new Next.js project

```bash
npx create-next-app@latest my-app --typescript --eslint --tailwind --app --no-src-dir --no-import-alias --turbopack
```

Step 2: Install drizzle-ui

```bash
npm i drizzle-ui
```

Step 3: Add styles to root layout `app/layout.tsx`.

```ts
import "drizzle-ui/styles";
```

Step 4: Use components

You can now import components from `drizzle-ui`.

```tsx
import { Button } from "drizzle-ui";

export function ButtonDemo() {
  return (
    <div>
      <Button>Hello World</Button>
    </div>
  );
}
```

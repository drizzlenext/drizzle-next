---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Drizzle Next"
  text: "Full Stack Next.js and Drizzle ORM Framework"
  tagline: Generate apps using CLI commands inspired by Ruby on Rails and shadcn/ui
  actions:
    - theme: brand
      text: Documentation
      link: /introduction
    - theme: alt
      text: Demo
      link: https://demo.drizzle-next.com

features:
  - icon:
      src: https://cdn.simpleicons.org/Next.js/gray
    title: Next.js
    details: Generate Next.js routes, pages, forms, and server actions with CLI scaffolding automations.
  - icon:
      src: https://cdn.simpleicons.org/drizzle/gray
    title: Drizzle ORM
    details: Generate Drizzle ORM configuration, schemas, and queries using the CLI.
  - icon:
      src: https://cdn.simpleicons.org/typescript/gray
    title: TypeScript
    details: Catch errors early with Types for JavaScript. Share Types between the front end and back end for full stack type safety.
  - icon:
      src: https://cdn.simpleicons.org/postgresql/gray
    title: SQL
    details: Use PostgreSQL, MySQL, or SQLite. Write SQL-like queries with Drizzle ORM. Generate plain SQL migrations with Drizzle Kit.
  - icon:
      src: https://cdn.simpleicons.org/zod/gray
    title: Zod
    details: Zod is a TypeScript-first schema declaration and validation library. Generated server actions will have customizable zod data validations.
  - icon:
      src: https://cdn.simpleicons.org/shadcnui/gray
    title: drizzle/ui
    details: Drizzle Next uses a set of minimal-dependency, and fully customizable, UI components (inspired by shadcn) that are copied into your project.
  - icon:
      src: https://cdn.simpleicons.org/tailwindcss/gray
    title: TailwindCSS (optional)
    details: TailwindCSS is a utility-first CSS framework that is the default of Next.js. You can opt out of TailwindCSS if you prefer to start with a blank slate.
  - icon:
      src: https://cdn.simpleicons.org/auth0/gray
    title: Auth.js (optional)
    details: Generate Auth.js configuration and setup using Credentials, GitHub, Google, and other providers. You can opt out of Auth.js if you prefer to roll your own authentication.
  - icon:
      src: https://cdn.simpleicons.org/stripe/gray
    title: Stripe (optional)
    details: Generate an initial setup for Stripe integration, including webhook and customer portal endpoints. This is an optional add-on extension.
---

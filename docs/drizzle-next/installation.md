# Drizzle Next Installation

This guide covers everything you need to know to install and create your first application.

## Step 1: Create new project

Start by creating a new Next.js project using `create-next-app`.

```bash
npx create-next-app@latest my-app --typescript --eslint --tailwind --app --src-dir --no-import-alias --turbopack
```

:::tip
The `--typescript`, `--tailwind`, `--app`, `--src-dir`, and `--no-import-alias` are required for Drizzle Next to work properly.
:::

## Step 2: Run the CLI

Run the `drizzle-next init` command to setup your project.

```bash
cd my-app
npx drizzle-next@latest init
```

## Step 3: Configure project

You will be asked a few questions to configure the app:

```text
? Which package manager would you like to use? npm
? Which database dialect would you like to use? sqlite
? Which primary key generation strategy would you like to use? cuid2
? Do you want to add Auth.js authentication? yes
? Do you want to add an admin dashboard? yes
```

:::tip
Alternatively, you can also run the command non-interactively:

```bash
npx drizzle-next@latest init --package-manager npm --db-dialect sqlite --pk-strategy cuid2 --auth --admin
```

:::

## Step 4: Create user

Generate and run the drizzle migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

Create a test user and grant admin role:

```bash
npx tsx scripts/create-user.ts test@example.com password123
npx tsx scripts/grant-admin.ts test@example.com
```

Start the dev server:

```bash
npm run dev
```

Go to http://localhost:3000.

Then click on "Admin Dashboard" and sign in.

There should be an empty dashboard. In the next step, we'll generate our first scaffold.

## Step 5: Scaffold an app

In this example, we'll create a simple blog application.

First, open a new terminal.

Create a `categories` schema:

```bash
npx drizzle-next@latest scaffold category -c name:text
```

Create a `posts` schema:

```bash
npx drizzle-next@latest scaffold post -c title:text category_id:references content:text is_draft:boolean published_at:timestamp
```

Run the drizzle migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

The admin dashboard should now have a fully functional scaffold for a posts resource.

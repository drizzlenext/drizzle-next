# Installation

## Step 1: Create new project

Start by creating a new Next.js project using `create-next-app`.

```bash
npx create-next-app@latest my-app --typescript --eslint --tailwind --app --no-src-dir --no-import-alias --turbopack
```

:::tip
The `--typescript`, `--app`, `--no-src-dir`, and `--no-import-alias` are required for Drizzle Next to work properly.
:::

## Step 2: Run the CLI

Run the `drizzle-next init` command to setup your project.

```bash
cd my-app
npx drizzle-next@latest init
```

::: info
Alternatively, you can also run the command non-interactively:

```bash
npx drizzle-next@latest init -p npm --latest --db-dialect sqlite -pk cuid2 --auth-solution authjs --auth-providers github,google,credentials --admin
```

:::

## Step 3: Configure project

You will be asked a few questions to configure the app:

```text
? Which package manager do you want to use? npm
? Do you want to install latest packages or pinned packages? pinned
? Which database dialect would you like to use? sqlite
? Which primary key generation strategy would you like to use? cuid2
? Which css strategy would you like to use? tailwind
? Which authentication solution do you want to use? authjs
? Which auth providers would you like to use? credentials
? Do you want to add an admin dashboard with role-based authorization? yes
? Do you want to enable the automatic pluralization of table and variable names? yes
```

## Step 4: Project checklist

Generate and run the drizzle migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

Create a test user and grant admin role:

```bash
npx tsx scripts/create-user.ts user@example.com password123
npx tsx scripts/grant-admin.ts user@example.com
```

## Step 5: Scaffold an app

In this example, we'll create a simple blog application.

First, open a new terminal.

For the following scaffolds, make sure to choose `admin` as the authorization level.

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

## Step 6: Log in to the app

Start the dev server:

```bash
npm run dev
```

Go to http://localhost:3000/admin-signin and sign in with the admin user.

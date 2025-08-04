# Drizzle Express Installation

This guide covers everything you need to know to install and create your first API.

## Step 1: Create new project

Start by creating a new npm project using `npm init`.

```bash
mkdir my-api
cd my-api
npm init -y
```

## Step 2: Run the CLI

Run the `drizzle-express init` command to setup your project.

```bash
npx drizzle-express@latest init
```

## Step 3: Configure project

You will be asked a few questions to configure the app:

```text
? Which package manager would you like to use? npm
? Which database dialect would you like to use? sqlite
```

:::tip

Alternatively, you can also run the command non-interactively:

```bash
npx drizzle-express@latest init --package-manager npm --db-dialect sqlite
```

:::

## Step 4: Scaffold an app

In this example, we'll create a simple blog application.

Create a `categories` schema:

```bash
npx drizzle-express@latest scaffold category -c name:text
```

Create a `posts` schema:

```bash
npx drizzle-express@latest scaffold post -c title:text category_id:references content:text is_draft:boolean published_at:timestamp
```

Run the drizzle migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Step 5: Start dev server

Start the dev server:

```bash
npm run dev
```

Test API:

```bash
curl -X POST -d '{"name": "test"}' --header 'Content-Type: application/json' localhost:3001/categories
curl localhost:3001/categories
```

You should now have a fully functional CRUD API for a posts resource.

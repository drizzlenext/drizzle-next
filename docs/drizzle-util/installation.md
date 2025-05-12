# Drizzle Util Installation

This guide covers everything you need to know to install and start using Drizzle Util.

## Step 1: Create new project

```bash
mkdir my-app
cd my-app
npm init -y
```

## Step 2: Run the CLI

Initialize Drizzle ORM configuration.

```bash
npx drizzle-util@latest init
```

## Step 3: Configure project

```text
? Which package manager would you like to use? npm
? Which database dialect would you like to use? sqlite
? Which primary key generation strategy would you like to use? cuid2
```

## Step 4: Generate scaffold

In this example, we'll create a simple blog schema.

Create a `categories` schema:

```bash
npx drizzle-util@latest scaffold category -c name:text
```

Create a `posts` schema:

```bash
npx drizzle-util@latest scaffold post -c title:text category_id:references content:text is_draft:boolean published_at:timestamp
```

Run the drizzle migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

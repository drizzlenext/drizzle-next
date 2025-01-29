# About

Drizzle Next is suitable for full stack monolithic server side rendered web applications. It is a full stack tool kit that automates away the time consuming things you need to do at the start of a new full stack Next.js project, saving you days worth of boilerplate coding.

## Philosophy

### Technology curation

Many decisions happen at the beginnings of projects. A developer must decide on: a web framework, a database, UI component library, object relational mapper (ORM), CSS framework, authentication solution, validation library, payment solution, and other technologies relevant to the project. This can be time consuming and lead to decision fatigue. In the JavaScript world, this is known as JavaScript fatigue. It is a phenomenon describing the overwhelming array of technology choices in the JavaScript ecosystem. drizzle-next offers a preferred list of technologies to be used as a foundation for web app projects.

### Configuration automation

Once the technologies are decided on, the next step is to wire everything together such that the application works as a cohesive whole. This means making sure the database connection is working, the UI component library is installed, and that data flows seamlessly end to end through application logic.

Developers will often use libraries to add capabilities such as authentication, authorization, and data validations. However, setting these up can be time consuming. drizzle-next provides an `init` command which allows you to choose from a short menu of features that you can add to your Next.js app. drizzle-next will write all the code necessary for the selected features.

By having a simple working example, you'll save time not having to build it entirely from scratch. You can customize the generated code to fit your project requirements. Additionally, drizzle-next will display a checklist of tasks to complete the initial configuration. The `init` command is intended to be run once at the beginning of a new project.

### Scaffold automation

Once the technologies are selected and configured, the next step is to begin building the interesting parts of the app. Typically, this involves a number of tasks including creating the database tables, API endpoints or server actions, user interface, layouts, pages, and web forms. This process may involve referencing documentation and writing the "boilerplate" code that the rest of the app will be built upon. This too is a time consuming process.

drizzle-next provides a `scaffold` command to automate the entire process of setting up the initial "boilerplate" code. You only have to provide the table name along with the columns and data types. drizzle-next will generate the Drizzle database table, back end code, and front end code for the provided database table schema.

What is the purpose of the scaffolded code? It is to provide a fully working full stack Create Read Update Delete (CRUD) feature that you can use as a reference to build the rest of your app. The `scaffold` command is intended to be run as many times as you need to generate full stack scaffolding. This automation is heavily inspired by the Ruby on Rails scaffold command.

## Technologies and Inspirations

Having used various web technologies extensively, I’ve developed a preference for certain development methods.

I will describe the ideas from each technology that shaped the way I code today, and that ultimately resulted in the creation of Drizzle Next.

## Ruby on Rails

Nostalgia for Ruby on Rails style development is one motivation that led to the creation of drizzle-next. The `drizzle-next scaffold` command was modeled after the `rails generate scaffold` command. With scaffolding automation and predefined conventions, you'll spend less time writing common structural code by hand and more time building the valuable parts of the app.

Ruby on Rails was the framework that introduced to me the idea of scaffolding. In construction, these are the wooden planks, metal poles, or bamboo that workers use while building. Similarly, scaffolding in web development is the initial "boilerplate" code that you generate using a tool like Rails. The starter code saves you time, as it provides some type of structural pattern that you can then build upon.

## Next.js

Many of the full stack patterns used in drizzle-next are based on the official Next.js documentation and best practices. Next.js provides many conveniences out of the box, such as file system routing, server side rendering, code bundling, and more.

Before the advent of Next.js, setting up a Single Page Application (SPA) project, with AngularJS or React, may have involved dealing with very complicated build and automation tools. Next.js solved this problem by abstracting away all of the complex build process. With virtually one command, you could get started writing your React components right away. The file system routing brought consistency React's routing. And server side rendering were welcomed features, as you were no longer limited to SPAs. Many of Next.js's performance optimizations help you make really fast websites.

## TypeScript

TypeScript adds additional syntax for types to JavaScript. This enables the early catching of errors in your editor and at compile time.

For a long time I hesitated to learn TypeScript, as I couldn't understand why I'd need to write more code to produce the same result as a dynamic language like Ruby or JavaScript. Fortunately, I had an opportunity to work on Java and Scala projects at a larger company. Then I experienced the benefits first hand. The IDE warnings, autocompletion, and compile time errors all helped reduce bugs from sneaking into production.

The language is more verbose and has a somewhat steeper learning curve, but I suppose that is the trade off. TypeScript had grown significantly in adoption, and for good reason. I decided to learn all I could about it and use it in future projects. It all paid off as I now understand why language features like type annotations, interfaces, type unions, record utility, and exhaustive switches all help in eliminating bugs and building apps with minimal defects.

One other thing worth mentioning is the use of TypeScript on both the front end and back end in a full stack project. The types can be shared between the two sides. With Drizzle ORM, you can infer the types of your database types and share them with the front end. This gives your full stack app end to end type safety. So when the database changes, the TypeScript compiler can catch issues on the front end. Furthermore, using a single language across the full stack lowers cognitive burden, as you no longer have to context switch between two languages.

## Drizzle ORM

Drizzle ORM is a Headless TypeScript ORM that provides both SQL-like and relational queries. It also provides a `drizzle-kit` CLI tool that generates and runs raw SQL migrations from your TypeScript table definitions. The learning curve for Drizzle is quick if you are familiar with SQL. Drizzle always outputs 1 query, which helps prevent common mistakes that lead to performance issues.

In general there are 3 levels of abstraction for interacting with your database. You can execute raw sql, use the ORM, or the query builder. Drizzle conveniently provides each method.

### Raw SQL

This is one example using Drizzle's way of running raw SQL:

```ts
const statement = sql`select * from ${posts}`;
const postList = db.all(statement) as Post[];
```

While raw SQL does give you greater flexibility and control, you'd still have to map the results to application objects or use a Type assertion as in the above example.

### ORM

ORMs, or Object Relational Mappers, allow you to interact with your database using application-level constructs. Here is an example using Drizzle's ORM:

```ts
const postList = await db.query.posts.findMany();
```

Instead of writing raw sql, you're calling methods on a class that abstract away all of the SQL statements. Under the hood, it might be writing `select * from posts`. The data gets mapped and returned as application objects. ORMs provide the highest level code abstraction for interacting with the database.

### Query builders

Then there are query builders. They fall somewhere in between. You can interact with your database with language methods that look like SQL. For example:

```ts
const postList = await db.select().from(posts);
```

Query builders allow you to chain together functions, so you can dynamically add filters onto the query. For example, imagine I have this query to find published posts:

```ts
const postList = await db
  .select()
  .from(posts)
  .where(eq(posts.isPublished, true));
```

If I want to conditionally add another filter, there would be a means of doing so without concatenating SQL strings. Here is an example of conditionally adding a filter to a query with Drizzle:

```ts
const filters = [eq(posts.isPublished, false)];

if (condition) {
  filters.push(like(posts.title, "%hello%"));
}

const query = db.select().from(posts);
query.where(and(...filters));
const postList = await query;
```

With raw SQL, you'd have to concatenate the strings manually, which is very error prone and possibly not secure.

### Why Drizzle?

What were my criteria in picking an ORM? My requirements were simple. Here are the things that were important to me:

1. I wanted to be able to build queries dynamically. Meaning, I can tack on additional filters conditionally. Both the ORM and query builder of Drizzle make this relatively easy to do.
2. I wanted to be able to write migrations in plain SQL, as opposed to using a library. Migrations are the incremental changes that you make to your database over time. As it turns out, Drizzle ORM provides a way to detect changes in your TypeScript table definitions and generate the raw SQL migrations.
3. I wanted the ORM to work with TypeScript, so that when my database changes, the TypeScript compiler will catch any issues that may occur in the application logic.

Drizzle ORM happened to meet, and in some areas exceed, my expectations for an ORM.

## shadcn/ui

shadcn/ui is the tool that copies and pastes beautifully styled components into your projects. Similarly, Drizzle Next generates full stack components into your Next.js project. You have full control of the code that is generated instead of the code being hidden behind an external package. Drizzle Next was heavily inspired by the "copy and paste" philosophy of shadcn.

Traditionally, developers either choose to write their own css or scss, or use an external UI library. However, there are tradeoffs to each approach. If you roll your own css, you'll have greater control over styling, however it generally takes longer to do. Also, you have to be careful about conflicting styles and it gets trickier to manage as the application grows. Component libraries, on the other hand, provide pre-built components. They look good out of the box, and they save you time, however they are harder to customize as its encapsulated behind a third-party package.

shadcn/ui skyrocketed in popularity because it introduced a new approach to UI component libraries. They have created a collection of pre-styled components built on various headless libraries like radix-ui, and provided it to you to copy and paste into your own project. You can copy and paste them directly from the shadcn website, or use the shadcn cli tool. Effectively, this negates the weaknesses of the former two options. You don't waste as much time rolling your own components, while still being able to customize these components that already look good out of the box.

Drizzle Next initially used shadcn as the default UI component option. However, shadcn was removed in favor of custom minimal dependency components. We kept the `cn` function for merging class names which uses `clsx` and `tailwind-merge`, but got rid of everything else. One feature of shadcn, or disadvantage depending on how you look at it, is that shadcn requires you to install various dependencies like radix-ui. These lock Drizzle Next into a specific UI solution, and adds a significant number of dependencies to the project.

As primarily a full stack framework, I wanted to give developers the choice of UI solution. However, the spirit of shadcn still lives on, as the Drizzle Next React UI components are built on native HTML elements and are fully customizable. They are copied into your project into the `components/ui` directory, just like shadcn. And if you still want to use shadcn, it takes a minute add a component using their cli.

## Other Inspirations

These are other technologies which deserve honorable mention. These have influenced the way I design and code today. I may write more about these in the future.

### TailwindCSS

TailwindCSS is a CSS framework which provides reusable utility classes. TailwindCSS simplifies and improves scalability of styling by coupling markup with style.

### Auth.js

drizzle-next favors proven, open-source solutions that let you maintain control over your data. Similarly, with drizzle-next, you own not only your data but also your code.

### Zod

drizzle-next uses `zod` for data validations. Each server action that is generated by the scaffolding tool will also contain zod validations to check for the correctness of data being submitted. Zod also provides tools for the parsing of form data.

### Django

Django has a built-in admin interface as part of the core framework. It works out of the box with your custom data models. This was the main inspiration for the auth and admin dashboard of drizzle-next.

### WordPress

The content management dashboard of WordPress was also an inspiration for the design of the drizzle-next dashboard.

## Author

Built by [travisluong](https://www.travisluong.com).

## License

MIT

# About Drizzle Next

This page covers the rationale behind Drizzle Next, and why it was built.

## Philosophy

### Technology curation

Many decisions happen at the beginnings of projects. A developer must decide on: a web framework, a database, UI component library, object relational mapper (ORM), CSS framework, authentication solution, validation library, and other technologies relevant to the project.

This can be time consuming and lead to decision fatigue. In the JavaScript world, this is commonly known as JavaScript fatigue, a phenomenon describing the overwhelming array of technology choices in the JavaScript ecosystem. Drizzle Next uses a curated selection of technologies to be used as a foundation for web app projects.

### Configuration automation

Developers will often use libraries to add capabilities such as authentication, authorization, UI and DB libraries. However, setting these up can be time consuming. Drizzle Next provides an `init` command which allows you to choose from a short menu of configurations that you can initialize your Next.js app with.

By having a simple working example, you'll save time not having to build it entirely from scratch. You can customize the generated code to fit your project requirements. Additionally, Drizzle Next will display a checklist of tasks to complete the initial configuration. The `init` command is intended to be run once at the beginning of a new project.

### Scaffold automation

Drizzle Next provides a `scaffold` command to automate the entire process of setting up the initial "boilerplate" code of new features. You only have to provide the table name along with the columns and data types. Drizzle Next will generate the Drizzle database table, back end code, and front end code for the provided database table schema.

This provides a fully working full stack Create Read Update Delete (CRUD) feature that you can use as a reference to build the rest of your app. The `scaffold` command is intended to be run as many times as you need to generate full stack scaffolding. This automation is heavily inspired by the Ruby on Rails scaffold command.

## Technologies and Inspirations

Having used various web technologies extensively, I’ve developed a preference for certain development methods.

The ideas from each technology ultimately resulted in the creation of Drizzle Next.

## Ruby on Rails

Nostalgia for Ruby on Rails style development is one motivation that led to the creation of Drizzle Next. The `drizzle-next scaffold` command was modeled after the `rails generate scaffold` command. With scaffolding automation and predefined conventions, you'll spend less time writing common structural code by hand and more time building the valuable parts of the app.

Ruby on Rails was the framework that introduced to me the idea of scaffolding. In construction, these are the wooden planks, metal poles, or bamboo that workers use while building. Similarly, scaffolding in web development is the initial "boilerplate" code that you generate using a tool like Rails. The starter code saves you time, as it provides some type of structural pattern that you can then build on.

## Next.js

Many of the full stack patterns used in Drizzle Next are based on the official Next.js documentation and best practices. Next.js provides many conveniences out of the box, such as file system routing, server side rendering, code bundling, and more.

Before the advent of Next.js, setting up a Single Page Application (SPA) project, with AngularJS or React, may have involved dealing with very complicated build and automation tools. Next.js solved this problem by abstracting away all of the complex build process. With one command, you could get started writing your React components right away. The file system routing brought consistency to React's routing. With server side rendering, you were no longer limited to SPAs. Many of Next.js's performance optimizations help you make really fast websites.

## TypeScript

TypeScript adds additional syntax for types to JavaScript. This enables the early catching of errors in your editor and at compile time. The IDE warnings, autocompletion, and compile time errors all help to reduce bugs from sneaking into production. Features like type annotations, interfaces, type unions, record utility, and exhaustive switches all help in eliminating bugs and building apps with minimal defects.

It is worth mentioning the use of TypeScript on both the front end and back end in a full stack project. The types can be shared between the two sides. With Drizzle ORM, you can infer the types of your database tables and share them with the front end. This gives your full stack app end to end type safety. So when the database changes, the TypeScript compiler can catch issues on the front end. Furthermore, using a single language across the full stack lowers cognitive burden, as you no longer have to context switch between two languages.

## Drizzle ORM

Drizzle ORM is a Headless TypeScript ORM that provides both SQL-like and relational queries. It also provides a `drizzle-kit` CLI tool that generates and runs raw SQL migrations from your TypeScript table definitions. The learning curve for Drizzle is fast if you are familiar with SQL. Drizzle always outputs one query, which helps prevent common mistakes that lead to performance issues.

There are three main reasons Drizzle was chosen as the ORM. 1. It is easy to build queries dynamically and it is easy add on SQL filters conditionally. 2. Be able to write migrations in plain SQL. This is preferred over a migration DSL, as it avoids having to learn yet another library specific migration syntax. 3. The ORM should work with TypeScript, so that when the database changes, the TypeScript compiler will catch any issues in the application logic. Drizzle ORM checked all the boxes.

## shadcn/ui

shadcn/ui strikes the perfect balance of customization and beautiful defaults. shadcn/ui skyrocketed in popularity because it introduced a new approach to UI component libraries. They have created a collection of pre-styled components built on various headless libraries like radix-ui, and provided it to you to copy and paste into your own project. This approach gives you greater control over the code, as opposed to using a traditional component library where the styling is hidden behind the package.

Drizzle Next initially used shadcn as the default UI component library. However, shadcn was removed in favor of custom-built components for minimizing dependencies and improving build times. Drizzle UI was built specifically for Drizzle Next to address the issues of cutting dependencies, improving build speed, and ease of maintenance.

## Admin Dashboard

The design, technical and visual, of Drizzle Admin was inspired by many tools including: Django Admin, Active Admin, TablePlus, PayloadCMS, VitePress, and WordPress.

The initial version of Drizzle Next did not include a packaged dashboard library. It was soon realized that maintaining a consistent dashboard experience across all tables and projects proved challenging.

Without a versioned dependency, distributing small improvements meant copying and pasting changes to update Drizzle Next scaffolded projects. Drizzle Admin was created to solve this problem.

## Author

Built by [travisluong](https://www.travisluong.com).

## License

MIT

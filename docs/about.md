# About

## Philosophy

### Technology curation

Many decisions happen at the beginnings of projects. A developer must decide on: a web framework, a database, UI component library, object relational mapper (ORM), CSS framework, authentication solution, validation library, payment solution, and other technologies relevant to the project. This can be time consuming and lead to decision fatigue. In the JavaScript world, this is known as JavaScript fatigue. It is a phenomenon describing the overwhelming array of technology choices in the JavaScript ecosystem. drizzle-next offers a preferred list of technologies to be used as a foundation for web app projects.

### Configuration automation

Once the technologies are decided on, the next step is to wire everything together such that the application works as a cohesive whole. This means making sure the database connection is working, the UI component library is installed, and that integrations with external services are working.

Developers will often use libraries to add capabilities such as authentication, authorization, and data validations. However, setting these up can be time consuming. drizzle-next provides an `init` command which allows you to choose from a short menu of features that you can add to your Next.js app. drizzle-next will write all the code necessary for the selected features.

By having a simple working example, you'll save time not having to build it entirely from scratch. You can customize the generated code to fit your project requirements. Additionally, drizzle-next will display a checklist of tasks to complete the initial configuration. The `init` command is intended to be run once at the beginning of a new project.

### Scaffold automation

Once the technologies are selected and configured, the next step is to begin building the interesting parts of the app. Typically, this involves a number of tasks including creating the database tables, API endpoints or server actions, user interface, layouts, pages, and web forms. This process may involve referencing documentation and writing the "boilerplate" code that the rest of the app will be built upon. This too is a time consuming process.

drizzle-next provides a `scaffold` command to automate the entire process of setting up the initial "boilerplate" code. You only have to provide the table name along with the columns and data types. drizzle-next will generate the database migration files, back end code, and front end code for the provided database schema.

What is the purpose of the scaffolded code? It is to provide a fully working full stack Create Read Update Delete (CRUD) feature that you can use as a reference to build the rest of your app. The `scaffold` command is intended to be run as many times as you need to generate full stack scaffolding. This automation is heavily inspired by the Ruby on Rails scaffold command.

## Technologies and Inspirations

As a long time user of various web technologies, I have come to prefer certain methods of development.

I will describe the ideas from each technology that shaped the way I code today, and that ultimately resulted in the creation of Drizzle Next.

## Ruby on Rails

Nostalgia for Ruby on Rails style development is one motivation that led to the creation of drizzle-next. The `drizzle-next scaffold` command was modeled after the `rails generate scaffold` command. With a predefined set of conventions, you'll spend less time configuring things, and more time building.

Ruby on Rails was the framework that introduced to me the idea of scaffolding. In construction, these are the wooden planks, metal poles, or bamboo that workers use while building. Similarly, scaffolding in web development is the initial "boilerplate" code that you generate using a tool like Rails. The starter code saves you time, as it provides some type of structural pattern that you can then build upon.

## Next.js

Many of the full stack patterns used in drizzle-next are based on the official Next.js documentation. Next.js provides many conveniences out of the box, such as file system routing, server side rendering, code bundling, and more.

Due to moving to different projects, I stopped working with Rails. I ended up working on various other projects, which exposed me to AngularJS and React. Before Next.js, setting up a Single Page Application (SPA) project, with AngularJS or React, may have involved dealing with very complicated build and automation tools. Next.js solved this problem by abstracting away all of the complex build process. With virtually one command, you could get started writing your React components right away. The file system routing brought consistency React's routing. And server side rendering were welcomed features, as you were no longer limited to SPAs.

## TypeScript

TypeScript adds additional syntax for types to JavaScript. This enables the early catching of errors in your editor and at compile time.

During the earlier part of my dev career, I was primarily a user of dynamic languages (Ruby, Python, JavaScript). Mostly startups and agency work. I only understood in theory, why a statically typed language would be beneficial for larger scale development. For a long time I hesitated to learn TypeScript, as I couldn't understand why I'd need to write more code to produce the same result. Fortunately, I had an opportunity to work on Java and Scala projects at a larger company. Only then did I see the benefits first hand. The IDE warnings, autocompletion, and compile time errors all helped reduce bugs from making it to production. The language is more verbose and has a somewhat steeper learning curve, but I suppose that is the trade off. At some point, TypeScript had grown significantly in adoption, and for good reason. I decided to learn all I could about it and use it in future projects. It all paid off as I now understand why language features like interfaces, type unions, record utility, and exhaustive switches all help in eliminating bugs and building apps with minimal defects.

One other thing worth mentioning is the use of TypeScript on both the front end and back end in a full stack project. The types can be shared between the two sides. With Drizzle ORM, you can infer the types of your database types and share them with the front end. This gives your full stack app end to end type safety. So when the database changes, the TypeScript compiler can catch issues on the front end. Furthermore, using a single language across the full stack lowers cognitive burden.

## shadcn/ui

shadcn/ui is the tool that copies and pastes beautifully styled components into your projects. Similarly, Drizzle Next generates full stack components into your Next.js project. You have full control of the code that is generated instead of the code being hidden behind an external package.

Traditionally, developers either choose to write their own css or scss, or use a UI library like Bootstrap or MUI. However, there are tradeoffs to each approach. If you roll your own css, you'll have fine grain control over styling, however it generally takes longer to do. Also, you have to be careful about the how the styles "cascade" through your app and it gets trickier to manage as the application grows. Component libraries, on the other hand, provide pre-built components. They look good out of the box, and they save you time, however they are harder to customize as its encapsulated behind a third-party package.

shadcn/ui skyrocketed in popularity because it introduced a new approach to UI component libraries. They have created a collection of pre-styled components built on various headless libraries like radix-ui, and provided it to you to copy and paste into your own project. You can copy and paste them directly from the shadcn website, or use the shadcn cli tool. Effectively, this negates the weaknesses of the former two options. You don't waste as much time rolling your own components, while still being able to customize these components that already look good out of the box.

Drizzle Next initially used shadcn as the default UI component option. However, shadcn was removed in favor of custom ZERO dependency components. One feature of shadcn, or disadvantage depending on how you look at it, is that shadcn requires you to install various dependencies like radix-ui. While they look great and are accessability friendly, it locks Drizzle Next into a specific UI solution.

I wanted to give developers the choice of UI solution. However, the spirit of shadcn still lives on, as the Drizzle Next React UI components are built on native HTML elements and are fully customizable. They are copied into your project into the `components/ui` directory, just like shadcn. And if you still want to use shadcn, it takes minutes to add a component using their cli.

## Drizzle ORM

A Headless TypeScript ORM that provides both SQL-like and relational queries, as well as schema generation and database migrations. If you know SQL, you know Drizzle. If you prefer an ORM, you can use their query API. Drizzle always outputs 1 query.

Since I have completely bought into TypeScript, I began my search for a TypeScript ORM to power the backend of my apps. I have used many ORMs, query builders, and database drivers in the past. Those experiences determined my criteria for picking a new one. If you're not familiar with these terms, I'll give a brief explanation:

:::warning
Note: The following code examples are not specific to any library. Just something I made up to help illustrate the concepts.
:::

Database drivers are the lowest level. You run plain sql strings. It might look something like this: `rows = db.execute("select * from users")`. Then you may need to manually parse the row data that gets returned into application objects. The row data might look something like this: `[["roger", "roger@example.com"], ["bob", "bob@example.com"]]`

ORMs, or Object Relational Mappers, are language specific libraries that allow you to interact with your database using language functions. For example, to query for users would look something like this: `users = db.findUsers()`. Instead of running raw sql, you're calling methods that abstract away all of the SQL. Under the hood, it might be writing `select * from users`. The raw sql data gets _mapped_ into code objects, hence Object Relational Mapper.

And then there are query builders. They fall somewhere in between. You can interact with your database with language methods that look like SQL. For example, `db.select().from("users")`.

The main trade off is control and convenience. The lower the level, the more control you have, but the more reinventing of the wheel you must do. The higher the level, the more convenience you get, but the less control you have. So what were my criteria in picking an ORM?

Well, here are the things that were important to me.

1. I wanted to be able to build queries dynamically. Meaning, I can tack on additional filters in code. For example I have this query: `query = db.select("products").where("price < 100")` and I want to add another filter, I could do this: `query.andWhere("size='M'")`. Without a query builder, you'd have to concatenate SQL strings manually, which is very error prone and possibly not secure.
2. I wanted to be able to write migrations in plain SQL. Migrations are the incremental changes that you make to your database over time. Usually they are saved in your git repo. Some libraries use a language specific way to do it. But I prefer seeing the changes in plain SQL. As it turned out Drizzle ORM has a way to generate plain SQL migrations from the application database table definition. This means you don't even have to write migration files. Just write your table in code, and the migration file is generated automatically saving you one extra step.
3. I wanted the ORM to work with TypeScript, so that when my database changes, the TypeScript compiler will catch any issues that may occur. For example, if I suddenly make a field nullable, I may need to handle this null value somewhere in my code. A statically typed language like TypeScript will force me to fix the issues before they ever make it to production.

Drizzle ORM met all of my criteria.

## Other Inspirations

These are other technologies which deserve honorable mention. For sure, these have influenced the way I design and code today. I may write more about these in the future.

### TailwindCSS

TailwindCSS is a CSS framework which provides reusable utility classes. TailwindCSS simplifies and improves scalability of styling by coupling markup with style.

### Auth.js

drizzle-next favors proven, open-source solutions that let you maintain control over your data. Similarly, with drizzle-next, you own not only your data but also your code.

### Zod

drizzle-next uses `zod` and `drizzle-zod` for data validations. Each server action that is generated by the scaffolding tool will also contain zod validations to check for the correctness of data being submitted. Zod also provides tools for the parsing of form data.

### Django

Django has a built-in admin interface as part of the core framework. It works out of the box with your custom data models. This was the main inspiration for the auth and admin dashboard of drizzle-next.

### WordPress

The content management dashboard of WordPress was also an inspiration for the design of the drizzle-next dashboard.

## Author

Built by [travisluong](https://www.travisluong.com).

## License

MIT

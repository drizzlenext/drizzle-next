---
outline: [2, 3]
---

# About Drizzle Next

This page covers the rationale behind Drizzle Next and explains why it was created.

## Philosophy

### Technology curation

Many decisions happen at the beginnings of projects, where developers must choose a web framework, database, UI component library, object relational mapper (ORM), CSS framework, authentication solution, validation library, and other technologies relevant to the project. This can be time consuming and lead to decision fatigue, commonly known as JavaScript fatigue in the JavaScript world - a phenomenon describing the overwhelming array of technology choices in the JavaScript ecosystem. Drizzle Next uses a curated selection of technologies to serve as a foundation for web app projects, eliminating these early decision bottlenecks.

### Configuration automation

Developers will often use libraries to add capabilities such as authentication, authorization, UI and DB libraries, but setting these up can be time consuming. Drizzle Next provides an `init` command which allows you to choose from a short menu of configurations that you can initialize your Next.js app with, and by having a simple working example, you'll save time not having to build it entirely from scratch. You can customize the generated code to fit your project requirements, and Drizzle Next will display a checklist of tasks to complete the initial configuration, with the `init` command intended to be run once at the beginning of a new project.

### Scaffold automation

Drizzle Next provides a `scaffold` command to automate the entire process of setting up the initial "boilerplate" code of new features by generating the Drizzle database table, back end code, and front end code for a provided database table schema - you only need to specify the table name along with the columns and data types. This provides a fully working full stack Create Read Update Delete (CRUD) feature that serves as a reference for building the rest of your app, and the `scaffold` command can be run as many times as needed to generate additional full stack scaffolding, with this automation heavily inspired by the Ruby on Rails scaffold command.

## Technologies and Inspirations

Having used various web technologies extensively, I've developed preferences for certain development approaches that prioritize developer productivity, type safety, and minimal complexity. The ideas and patterns from each of these technologies ultimately influenced the creation of Drizzle Next.

### Ruby on Rails

Nostalgia for Ruby on Rails style development is one motivation that led to the creation of Drizzle Next. The `drizzle-next scaffold` command was modeled after the `rails generate scaffold` command, which introduced me to the concept of scaffolding automation. In construction, scaffolding consists of wooden planks, metal poles, or bamboo that workers use while building, and similarly in web development, scaffolding refers to the initial "boilerplate" code generated using tools like Rails. With scaffolding automation and predefined conventions, you'll spend less time writing common structural code by hand and more time building the valuable parts of the app, as the starter code provides a structural pattern that you can build upon.

### Next.js

Many of the full stack patterns used in Drizzle Next are based on the official Next.js documentation and best practices. Next.js provides many conveniences out of the box, such as file system routing, server side rendering, and code bundling. Before Next.js, setting up Single Page Application (SPA) projects with frameworks like AngularJS or React often involved dealing with complex build and automation tools, but Next.js solved this by abstracting away the complicated build process, allowing developers to start writing React components immediately with just one command. The framework brought consistency to React's routing through file system routing, expanded beyond SPAs with server side rendering capabilities, and includes numerous performance optimizations that help create fast, scalable websites.

### TypeScript

TypeScript adds additional syntax for types to JavaScript, enabling early error detection in your editor and at compile time through IDE warnings, autocompletion, and compile-time errors that help reduce bugs from reaching production. Features like type annotations, interfaces, type unions, record utility, and exhaustive switches all contribute to building apps with minimal defects. In full stack projects, TypeScript's use on both front end and back end allows types to be shared between the two sides, and with Drizzle ORM, you can infer database table types and share them with the front end for end-to-end type safety. This means when the database changes, the TypeScript compiler can catch issues on the front end, while using a single language across the full stack reduces cognitive burden by eliminating the need to context switch between different languages.

### Drizzle ORM

Drizzle ORM is a headless TypeScript ORM that provides both SQL-like and relational queries, along with a `drizzle-kit` CLI tool that generates and runs raw SQL migrations from TypeScript table definitions. The learning curve is minimal for developers familiar with SQL, and Drizzle's approach of always outputting a single query helps prevent common performance issues. Drizzle was chosen for three key reasons: it makes building dynamic queries and adding conditional SQL filters straightforward, it allows writing migrations in plain SQL rather than learning library-specific migration syntax, and it provides full TypeScript integration so the compiler can catch database-related issues in application logic when schemas change.

### Drizzle UI

Drizzle UI was created as a custom UI component library specifically for Drizzle Next after initially using shadcn/ui. While shadcn/ui offers an excellent approach with pre-styled components built on headless libraries like Radix UI that you copy into your project, it introduced dependencies and complexity that conflicted with Drizzle Next's core philosophy. By building Drizzle UI from scratch, we eliminated external dependencies, reduced bundle size, improved build times, and gained complete control over the component implementation. This custom approach ensures that every component aligns perfectly with Drizzle Next's performance goals and maintains the project's commitment to minimal dependencies while still providing beautiful, functional UI components out of the box.

### JWT

JSON Web Tokens (JWT) provide a simple, stateless authentication mechanism that aligns perfectly with Drizzle Next's philosophy of minimal dependencies and maximum control. Rather than integrating a third-party authentication library like Auth.js or Firebase Auth, Drizzle Next implements JWT authentication directly using standard libraries. This approach eliminates external service dependencies, reduces bundle size, and gives developers complete control over the authentication flow. JWT's self-contained nature means no database sessions to manage, making it ideal for serverless deployments and horizontal scaling. The straightforward implementation also makes it easier to understand, debug, and customize authentication logic to fit specific project requirements without being constrained by a library's opinions or limitations.

## Conclusion

Drizzle Next represents a culmination of lessons learned from modern web development, combining the rapid scaffolding capabilities of Ruby on Rails with the performance and developer experience of Next.js, TypeScript, and Drizzle ORM. By providing opinionated defaults and automation tools, it aims to eliminate the decision fatigue and configuration overhead that often slows down project initiation, allowing developers to focus on building unique features rather than repetitive boilerplate code. Whether you're a solo developer looking to prototype quickly or a team seeking consistency across projects, Drizzle Next offers a battle-tested foundation that scales from MVP to production-ready applications.

## Author

Built by [travisluong](https://linktr.ee/travisluong).

## License

MIT

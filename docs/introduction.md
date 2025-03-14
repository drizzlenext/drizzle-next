# Drizzle Next Documentation

Drizzle Next is a TypeScript web framework for scaffolding automation.

This CLI Tool generates full-stack scaffolding for apps built with Next.js and Drizzle ORM.

It also supports generating user and admin dashboards to kickstart your development process.

## Introduction

Drizzle Next is an ephemeral web framework.

Unlike traditional frameworks, it is not installed into your project as a dependency.

Instead, it is a command line interface code generation tool with a focus on minimum dependencies.

The generated code is fully customizable as it is written to your project.

However, you can optionally install Drizzle Admin as a dependency if you would like an admin dashboard that is automatically generated from your Drizzle schema.

## Why Drizzle Next?

TL;DR: Drizzle Next combines proven technologies with innovative ideas to elevate your development workflow:

- Next.js: For its seamless React integration and powerful server-side capabilities.
- TypeScript: For type safety and fewer bugs.
- Drizzle ORM: For a TypeScript-first query builder, ORM, and plain SQL migrations.
- Ruby on Rails: For the concept of scaffolding to speed up development.
- shadcn/ui: For the idea of customizable, copy-and-paste-ready components.

[See About page for more details](/about.md)

## When Drizzle Next might be for you

- If ownership of data is important to you
- If you want a light-weight solution with minimum dependencies.
- If you want to work directly with Next.js and Drizzle ORM without complex configurations.
- If you want to be able to customize the UI components
- If you want control over the Next.js server actions
- If you want direct access to your Drizzle schema
- If you want to keep a history of SQL changes using Drizzle migrations
- If you want a solution that is optimized for self-hosting
- If you want a solution that also works on serverless platforms
- If you want to directly customize the dashboard code
- If you want to work directly with React components
- If you want a customizable dashboard with role-based authorization

## When Drizzle Next might not be for you

- If you want to work with configuration-heavy solutions
- If you want less control over the code
- If you want to learn another complex abstraction on top of Next.js
- If you want to use framework specific hooks instead of having direct access to the logic
- If you want to install many dependencies for simple things
- If you want longer compile times due to a large framework dependency

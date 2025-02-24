import { db } from "./lib/db";
import { DrizzleCmsConfig } from "./package/types";
import { categories } from "./schema/categories";
import { posts } from "./schema/posts";
import { users } from "./schema/users";

export const config: DrizzleCmsConfig = {
  basePath: "/cms",
  schema: {
    users: { drizzleTable: users, label: "Users", path: "users" },
    posts: {
      drizzleTable: posts,
      label: "Posts",
      path: "posts",
      formControlMap: { content: "textarea", updatedAt: "input" },
    },
    categories: {
      drizzleTable: categories,
      label: "Categories",
      path: "categories",
    },
  },
  db: db,
  dbDialect: "sqlite",
};

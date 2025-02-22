import { db } from "./lib/db";
import { DrizzleCmsConfig } from "./package/types";
import { categories } from "./schema/categories";
import { posts } from "./schema/posts";
import { users } from "./schema/users";

export const config: DrizzleCmsConfig = {
  basePath: "/cms",
  schema: {
    users: { drizzleSchema: users, label: "Users", path: "users" },
    posts: {
      drizzleSchema: posts,
      label: "Posts",
      path: "posts",
      formControlMap: { content: "textarea", updatedAt: "input" },
    },
    categories: {
      drizzleSchema: categories,
      label: "Categories",
      path: "categories",
    },
  },
  db: db,
  dbDialect: "sqlite",
};

import { db } from "../../lib/db";
import { DrizzleAdminConfig } from "@/src/types";
import { categories } from "../../schema/categories";
import { postsTags } from "../../schema/posts-tags";
import { tags } from "../../schema/tags";
import { usersTable } from "./_tables/users-table";
import { posts } from "@/schema/posts";

export const config: DrizzleAdminConfig = {
  basePath: "/admin",
  schema: {
    users: usersTable,
    posts: {
      drizzleTable: posts,
    },
    categories: {
      drizzleTable: categories,
    },
    tags: {
      drizzleTable: tags,
    },
    postsTags: {
      drizzleTable: postsTags,
    },
  },
  db: db,
  dbDialect: "sqlite",
};

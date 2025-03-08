import { db } from "@/lib/db";
import { DrizzleAdminConfig } from "drizzle-admin/types";
import { categories } from "@/schema/categories";
import { postsTags } from "@/schema/posts-tags";
import { tags } from "@/schema/tags";
import { users } from "@/schema/users";
import { postsTable } from "@/app/(admin)/_tables/posts";

export const config: DrizzleAdminConfig = {
  basePath: "/admin",
  schema: {
    users: { drizzleTable: users },
    posts: postsTable,
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

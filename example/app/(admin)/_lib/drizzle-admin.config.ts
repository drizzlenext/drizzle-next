import { db } from "@/lib/db";
import { DrizzleAdminConfig } from "drizzle-admin/types";
import { categories } from "@/schema/categories";
import { postsTags } from "@/schema/posts-tags";
import { tags } from "@/schema/tags";
import { usersTableConfig } from "@/app/(admin)/_lib/users-table.config";
import { posts } from "@/schema/posts";

export const config: DrizzleAdminConfig = {
  basePath: "/admin",
  schema: {
    users: usersTableConfig,
    posts: {
      drizzleTable: posts,
      formControlMap: {
        // badges: "json"
      }
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

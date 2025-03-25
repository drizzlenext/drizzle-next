import { db } from "@/lib/db";
import { DrizzleAdminConfig } from "@/src/types";
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
      searchBy: ["id", "name"]
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

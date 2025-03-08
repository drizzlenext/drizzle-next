import {
  PostDeletePageActions,
  PostEditPageActions,
  PostRowActions,
  PostViewPageActions,
} from "./drizzle-admin.components";
import { db } from "./lib/db";
import { DrizzleAdminConfig } from "drizzle-admin/types";
import { categories } from "./schema/categories";
import { posts } from "./schema/posts";
import { postsTags } from "./schema/posts-tags";
import { tags } from "./schema/tags";
import { users } from "./schema/users";
import Link from "next/link";

export const config: DrizzleAdminConfig = {
  basePath: "/admin",
  schema: {
    users: { drizzleTable: users, label: "Users" },
    posts: {
      drizzleTable: posts,
      formControlMap: { content: "richtext", updatedAt: "input" },
      components: {
        RowActions: PostRowActions,
        ViewPageActions: PostViewPageActions,
        EditPageActions: PostEditPageActions,
        DeletePageActions: PostDeletePageActions,
        ListPageActions: (props) => {
          return (
            <>
              <Link href={`${props.basePath}/${props.curPath}/new`}>New</Link>
            </>
          );
        },
      },
    },
    categories: {
      drizzleTable: categories,
    },
    tags: {
      drizzleTable: tags,
    },
    postsTags: {
      drizzleTable: postsTags,
      label: "posts tags",
    },
  },
  db: db,
  dbDialect: "sqlite",
};

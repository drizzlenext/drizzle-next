import {
  PostDeletePageNav,
  PostEditPageNav,
  PostRowNav,
  PostViewPageNav,
} from "./drizzle-admin.components";
import { db } from "../../lib/db";
import { DrizzleAdminConfig } from "../../src/types/types";
import { categories } from "../../schema/categories";
import { posts } from "../../schema/posts";
import { postsTags } from "../../schema/posts-tags";
import { tags } from "../../schema/tags";
import { users } from "../../schema/users";
import Link from "next/link";

export const config: DrizzleAdminConfig = {
  basePath: "/admin",
  schema: {
    users: { drizzleTable: users, label: "Users" },
    posts: {
      drizzleTable: posts,
      formControlMap: { content: "richtext", updatedAt: "input" },
      components: {
        RowActions: PostRowNav,
        ViewPageActions: PostViewPageNav,
        EditPageActions: PostEditPageNav,
        DeletePageActions: PostDeletePageNav,
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

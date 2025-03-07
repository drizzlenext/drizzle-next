import { GroupIcon, Table2Icon, TableIcon, UserIcon } from "lucide-react";
import {
  PostDeletePageActions,
  PostEditPageActions,
  PostRowActions,
  PostViewPageActions,
} from "./drizzle-admin.components";
import { db } from "./lib/db";
import { DrizzleAdminConfig } from "./src/types/types";
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
  sidebar: [
    {
      text: "Custom Page",
      link: "/admin/custom-page",
      icon: <Table2Icon size={16} />,
    },
    {
      text: "Custom Group",
      icon: <GroupIcon size={16} />,
      items: [
        { text: "A custom link", link: "/", icon: <TableIcon size={16} /> },
      ],
    },
    {
      text: "Tables",
      items: [
        { text: "Users", link: "/admin/users", icon: <UserIcon size={16} /> },
        { text: "Posts", link: "/admin/posts", icon: <Table2Icon size={16} /> },
        {
          text: "Categories",
          link: "/admin/categories",
          icon: <Table2Icon size={16} />,
        },
        { text: "Tags", link: "/admin/tags", icon: <Table2Icon size={16} /> },
        {
          text: "Post Tags",
          link: "/admin/posts-tags",
          icon: <Table2Icon size={16} />,
        },
      ],
    },
  ],
};

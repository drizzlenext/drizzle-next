import { GroupIcon, Table2Icon, TableIcon } from "lucide-react";
import {
  PostDeletePageActions,
  PostEditPageActions,
  PostListPageActions,
  PostRowActions,
  PostViewPageActions,
} from "./drizzle-cms.components";
import { db } from "./lib/db";
import { DrizzleCmsConfig } from "./package/types";
import { categories } from "./schema/categories";
import { posts } from "./schema/posts";
import { postsTags } from "./schema/posts-tags";
import { tags } from "./schema/tags";
import { users } from "./schema/users";
import Link from "next/link";
import { Button } from "drizzle-ui";

export const config: DrizzleCmsConfig = {
  basePath: "/cms",
  schema: {
    users: { drizzleTable: users, label: "Users" },
    posts: {
      drizzleTable: posts,
      formControlMap: { content: "textarea", updatedAt: "input" },
      TableRowActionsSlot: PostRowActions,
      ViewPageActionsSlot: PostViewPageActions,
      EditPageActionsSlot: PostEditPageActions,
      DeletePageActionsSlot: PostDeletePageActions,
      ListPageActionsSlot: (props) => {
        return (
          <>
            <Link href={`${props.basePath}/${props.curPath}/new`}>
              <Button className="rounded-2xl" variant="muted">
                New
              </Button>
            </Link>
          </>
        );
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
      link: "/cms/custom-page",
      icon: <Table2Icon size={16} />,
    },
    {
      text: "Custom Group",
      icon: <GroupIcon size={16} />,
      items: [
        { text: "A custom link", link: "/", icon: <TableIcon size={16} /> },
      ],
    },
    { text: "Tables", type: "dynamic-tables" },
  ],
};

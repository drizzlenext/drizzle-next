# Drizzle Admin

Drizzle Admin is a React component that turns your Drizzle schema into an admin dashboard.

## Example

Here's a quick usage demo.

You have one or more Drizzle tables.

```tsx
import {
  pgTable,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { categories } from "@/schema/categories";

export const posts = pgTable(
  "posts",
  {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    categoryId: text().references(() => categories.id),
    title: text(),
    likes: integer(),
    publishedAt: timestamp(),
    content: text(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
  }
)
```

You can add the table to the `drizzle-admin.config.ts`:

```ts
import { posts } from "@/schema/posts";
import { db } from "@/lib/db";
import { DrizzleAdminConfig } from "drizzle-admin/types";

export const config: DrizzleAdminConfig = {
  basePath: "/admin",
  schema: {
    posts: { drizzleTable: posts },
  },
  db: db,
  dbDialect: "postgresql",
};

```

And then pass the config into the `DrizzleAdmin` component:

```tsx
import { config } from "@/app/(admin)/_lib/drizzle-admin.config";
import { DrizzleAdmin } from "drizzle-admin/components";

export type Params = Promise<{ [key: string]: string }>;
export type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  return (
    <DrizzleAdmin
      params={props.params}
      searchParams={props.searchParams}
      config={config}
    />
  );
}

```

You'll get a customizable admin dashboard where you can manage your data.

The dashboard can be customized.
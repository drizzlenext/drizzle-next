---
outline: [2, 3]
---

# Drizzle Admin Installation

This guide covers two options for installing Drizzle Admin.

## Standalone Installation

:::warning
Keep in mind that Drizzle Admin does not include authentication and authorization. It only provides the React components for generating the dashboard.

The prerequisite for this standalone installation guide is that you have an existing app built with Next and Drizzle.

As of writing this doc, Drizzle Admin has been tested with the following package versions:

```json
{
  "drizzle-orm": "^0.40.0",
  "next": "^15.2.2",
  "react": "^19.0.0",
  "@tailwindcss/postcss": "^4.0.14",
  "tailwindcss": "^4.0.14"
}
```

You may run into issues if you're on previous major versions of these depenendencies.
:::

### Step 1: Install Drizzle Admin

First, install Drizzle Admin in your Next.js project:

```bash
npm i drizzle-admin
```

### Step 2: Create a route group for Drizzle Admin

In the `app` router directory, create a new folder `(admin)`. The folder name is arbitrary. You can name it anything. For example, `(drizzle)` could also work.

### Step 3: Create the Drizzle Admin config

This is the central configuration of Drizzle Admin and is used to customize the dashboard.

`app/(admin)/_lib/drizzle-admin.config.ts`

```ts
import { db } from "@/lib/db";
import { DrizzleAdminConfig } from "drizzle-admin/types";
import { users } from "@/schema/users";
import { posts } from "@/schema/posts";

export const config: DrizzleAdminConfig = {
  basePath: "/admin",
  schema: {
    users: {
      drizzleTable: users,
    },
    posts: {
      drizzleTable: posts,
    },
  },
  db: db,
  dbDialect: "sqlite",
};
```

You can change the tables in the `schema` property. We're using a `users` and `posts` example above.

### Step 4: Create the route for Drizzle Admin

Create a new file at this path: `app/(admin)/admin/[...segments]/page.tsx`.

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

This is the page that renders the `DrizzleAdmin` component that powers Drizzle Admin.

### Step 5: Create the API routes

These routes are required for Drizzle Admin to function.

`app/(admin)/api/[...segments]/route.ts`

```tsx
import { config } from "@/app/(admin)/_lib/drizzle-admin.config";
import {
  DELETE_ROUTE,
  GET_ROUTE,
  PATCH_ROUTE,
  POST_ROUTE,
  PUT_ROUTE,
} from "drizzle-admin/routes";

export const POST = POST_ROUTE(config);
export const GET = GET_ROUTE(config);
export const PUT = PUT_ROUTE(config);
export const PATCH = PATCH_ROUTE(config);
export const DELETE = DELETE_ROUTE(config);
```

### Step 6: Create the layout

The layout is split into two parts, the server side layout, and the client side layout.

The server layout:

`app/(admin)/admin/layout.tsx`

```tsx
import { DarkModeScript } from "drizzle-admin/drizzle-ui";
import { AdminLayout } from "./_components/admin-layout";
import "drizzle-admin/styles";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
      <DarkModeScript />
    </AdminLayout>
  );
}
```

:::tip
The server layout is where you would add database queries, such as for fetching the current user or authenticating the user.

The client layout is where you can add interactivity to the dashboard.
:::

Here is one example of the customizable client layout.

`app/(admin)/admin/_components/admin-layout.tsx`

```tsx
"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LogOutIcon,
  GaugeIcon,
  SettingsIcon,
  Table2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  NotebookTextIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "drizzle-admin/drizzle-ui";
import { cn } from "drizzle-admin/drizzle-ui";

const sidebarItems = [
  {
    text: "Admin Dashboard",
    link: "/admin",
    icon: GaugeIcon,
  },
  { text: "Home", link: "/", icon: HomeIcon },
  {
    text: "Custom Page",
    link: "/admin/custom-page",
    icon: NotebookTextIcon,
  },
  { text: "Users", link: "/admin/users", icon: UserIcon },
  { text: "Posts", link: "/admin/posts", icon: Table2Icon },
  {
    text: "Categories",
    link: "/admin/categories",
    icon: Table2Icon,
  },
  { text: "Tags", link: "/admin/tags", icon: Table2Icon },
  {
    text: "Post Tags",
    link: "/admin/posts-tags",
    icon: Table2Icon,
  },
  { text: "Settings", link: "/admin/settings", icon: SettingsIcon },
  { text: "Sign out", link: "/signout", icon: LogOutIcon },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const renderSidebarItems = (items: any[]) => {
    return items.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.link;
      return (
        <li key={item.link}>
          <Link
            href={item.link}
            className={cn(
              "hover:bg-gray-100 flex items-center rounded-md transition-colors",
              sidebarCollapsed ? "justify-center px-3 py-3" : "gap-3 px-3 py-2",
              isActive && "bg-gray-100 text-gray-700"
            )}
          >
            <Icon size={20} className="flex-shrink-0" />
            {!sidebarCollapsed && <span>{item.text}</span>}
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="bg-white flex min-h-screen text-black dark:text-white">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-gray-200 flex flex-col border-r transition-all duration-300",
          sidebarCollapsed ? "w-16" : "min-w-64"
        )}
      >
        {/* Sidebar Header */}
        <div className="border-gray-200 flex items-center justify-between border-b p-4">
          {!sidebarCollapsed && (
            <h1 className="text-lg font-semibold">Drizzle Admin</h1>
          )}
          <Button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="rounded-md p-2"
            variant="ghost"
          >
            {sidebarCollapsed ? (
              <ChevronRightIcon size={20} />
            ) : (
              <ChevronLeftIcon size={20} />
            )}
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 flex-1">
          <ul className="space-y-2">{renderSidebarItems(sidebarItems)}</ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}
```

As you can see, Drizzle Admin ships with its own copy of Drizzle UI.

### Step 7: Set up authentication and authorization

Remember that Drizzle Admin does not provide authentication/authorization out of the box.

You will have to add auth checks to the API routes and the layout.

Here's an example of how you might set up auth for the API routes:

`app/(admin)/api/[...segments]/route.ts`

```tsx
import { config } from "@/app/(admin)/_lib/drizzle-admin.config";
import { auth } from "@/lib/auth";
import {
  DELETE_ROUTE,
  GET_ROUTE,
  PATCH_ROUTE,
  POST_ROUTE,
  PUT_ROUTE,
} from "drizzle-admin/routes";
import { NextRequest, NextResponse } from "next/server";

const withMiddleware = (handler: any) => {
  return async (req: NextRequest) => {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "unauthenticated" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
      return NextResponse.json({ message: "unauthorized" }, { status: 403 });
    }
    return handler(req);
  };
};

export const POST = withMiddleware(POST_ROUTE(config));
export const GET = withMiddleware(GET_ROUTE(config));
export const PUT = withMiddleware(PUT_ROUTE(config));
export const PATCH = withMiddleware(PATCH_ROUTE(config));
export const DELETE = withMiddleware(DELETE_ROUTE(config));
```

Here is an example of how to set up authentication for the all the pages within the `(admin)` route group.

`app/(admin)/layout.tsx`

```tsx
import { users } from "@/schema/users";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { AdminLayout } from "@/app/(admin)/_components/admin-layout";
import { authorize } from "@/lib/authorize";
import { DarkModeScript } from "drizzle-admin/drizzle-ui";
import "drizzle-admin/styles";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authorize("admin");

  const userObj = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!userObj) {
    redirect("/admin-signin");
  }

  return (
    <AdminLayout>
      {children}
      <DarkModeScript />
    </AdminLayout>
  );
}

export const dynamic = "force-dynamic";
```

:::tip
You'll have to provide your own authentication logic. We're using Auth.js in the above example, however it should be straightforward to swap it out with your choice of auth solution.
:::

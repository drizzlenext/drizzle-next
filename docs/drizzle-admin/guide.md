# Drizzle Admin Guide

This guide covers how to customize various aspects of the Admin Dashboard.

## Table Configurations

We can extract the table configurations from our main config file:

Before:

`app/(admin)/_lib/drizzle-admin.config.ts`

```tsx
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

After:

`app/(admin)/_lib/drizzle-admin.config.ts`

```tsx{3,9}
import { db } from "@/lib/db";
import { DrizzleAdminConfig } from "drizzle-admin/types";
import { usersTableConfig } from "./_lib/users-table.config";
import { posts } from "@/schema/posts";

export const config: DrizzleAdminConfig = {
  basePath: "/admin",
  schema: {
    users: usersTableConfig,
    posts: {
      drizzleTable: posts,
    },
  },
  db: db,
  dbDialect: "sqlite",
};
```

Here is an example of a customized table configuration:

`app/(admin)/_lib/users-table.config.ts`

```ts
import { users } from "@/schema/users";
import { DrizzleTableConfig } from "drizzle-admin/types";
import {
  UserDeletePageNav,
  UserEditPageNav,
  UserListPageNav,
  UserRoleCustomFormControl,
  UserRowNav,
  UserViewPageNav,
} from "@/app/(admin)/_components/users-components";

export const usersTableConfig: DrizzleTableConfig = {
  drizzleTable: users,
  formControlMap: { image: "file", role: "custom" },
  customFormControlMap: { role: UserRoleCustomFormControl },
  components: {
    RowNav: UserRowNav,
    ViewPageNav: UserViewPageNav,
    EditPageNav: UserEditPageNav,
    DeletePageNav: UserDeletePageNav,
    ListPageNav: UserListPageNav,
  },
};
```

As you can see, we are importing some custom components to replace various parts of our dashboard for the users table.

## Built-in Form Controls

The form controls in the edit page and edit side panel can be customized.

The `formControlMap` property allows us to change the form control for any of the columns of our table.

`app/(admin)/_lib/users-table.config.ts`

```tsx{3}
export const usersTableConfig: DrizzleTableConfig = {
  drizzleTable: users,
  formControlMap: { image: "file", role: "custom" },
  customFormControlMap: { role: UserRoleCustomFormControl },
  components: {
    RowNav: UserRowNav,
    ViewPageNav: UserViewPageNav,
    EditPageNav: UserEditPageNav,
    DeletePageNav: UserDeletePageNav,
    ListPageNav: UserListPageNav,
  },
};
```

Each data type has a default form control, however you can override it if needed.

For example, you may want to change `image` to a `file` control or `content` to a `richtext` control.

Here's a list of the available form control types:

```ts
"input"
"textarea"
"checkbox"
"date"
"datetime-local"
"number"
"richtext"
"file"
"json"
"custom"
```

## Custom Form Controls

If you choose `custom` as the form control type, you'll have to provide an implementation.

`app/(admin)/_lib/users-table.config.ts`

```tsx{7,14,15}
import { users } from "@/schema/users";
import { DrizzleTableConfig } from "drizzle-admin/types";
import {
  UserDeletePageNav,
  UserEditPageNav,
  UserListPageNav,
  UserRoleCustomFormControl,
  UserRowNav,
  UserViewPageNav,
} from "@/app/(admin)/_components/users-components";

export const usersTableConfig: DrizzleTableConfig = {
  drizzleTable: users,
  formControlMap: { image: "file", role: "custom" },
  customFormControlMap: { role: UserRoleCustomFormControl },
  components: {
    RowNav: UserRowNav,
    ViewPageNav: UserViewPageNav,
    EditPageNav: UserEditPageNav,
    DeletePageNav: UserDeletePageNav,
    ListPageNav: UserListPageNav,
  },
};
```

Here is an example of a custom form control:

`app/(admin)/_components/users-components.tsx`

```tsx
export const UserRoleCustomFormControl: CustomFormControl = (props) => {
  return (
    <FormControl>
      <Label>Role</Label>
      <Select name="role" defaultValue={props.value}>
        <SelectOption value="admin">admin</SelectOption>
        <SelectOption value="user">user</SelectOption>
      </Select>
    </FormControl>
  )
}
```

This is useful, for instance, if we need to show a custom drop down list or another UI component that isn't built-in.

The `props` parameter consists of the row's value that can be used to prepopulate the form control.

## Custom Page Navigation

You can override the default nav component for the table row, view page, edit page, delete page, and list page.

`app/(admin)/_lib/users-table.config.ts`

```tsx{5-11}
export const usersTableConfig: DrizzleTableConfig = {
  drizzleTable: users,
  formControlMap: { image: "file", role: "custom" },
  customFormControlMap: { role: UserRoleCustomFormControl },
  components: {
    RowNav: UserRowNav,
    ViewPageNav: UserViewPageNav,
    EditPageNav: UserEditPageNav,
    DeletePageNav: UserDeletePageNav,
    ListPageNav: UserListPageNav,
  },
};
```

Here's an example of a custom component to replace the Nav in the User View page.

`app/(admin)/_components/users-components.tsx`

```tsx
export const UserViewPageNav: AdminPageNav<User> = (
  props: AdminPageNavProps<User>
) => {
  return (
    <>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row?.id}/edit`}
      >
        Edit
      </Link>
    </>
  );
};
```

The `props` parameter includes the `basePath`, `resourcePath`, and the database `row`, that can be used to create dynamic links.

This is useful if you need to create additional pages beyond the standard `view`, `new`, `edit`, and `delete` pages. For example, if you need to add a link to a user `images` or a user `posts` page.

:::tip
`AdminPageNav<T>` and `AdminPageNavProps<T>` are generic types. This gives us autocompletion for `props.row`. In this case we are passing in a `User` type. You should be able to pass in any Drizzle table type and see the row's properties.
:::

## Custom Table Row Navigation

If you need to customize the table row navigation for a resource, you can override the RowNav.

`app/(admin)/_lib/users-table.config.ts`

```tsx{6}
export const usersTableConfig: DrizzleTableConfig = {
  drizzleTable: users,
  formControlMap: { image: "file", role: "custom" },
  customFormControlMap: { role: UserRoleCustomFormControl },
  components: {
    RowNav: UserRowNav,
    ViewPageNav: UserViewPageNav,
    EditPageNav: UserEditPageNav,
    DeletePageNav: UserDeletePageNav,
    ListPageNav: UserListPageNav,
  },
};
```

`app/(admin)/_components/users-components.tsx`

```tsx
export const UserRowNav: AdminRowNav<User> = (
  props: AdminRowNavProps<User>
) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.resourcePath}/${props.row.id}`}>
        View
      </Link>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row.id}/edit`}
      >
        Edit
      </Link>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row.id}/delete`}
      >
        Delete
      </Link>
    </>
  );
};
```

## Custom Search

You can customize each search bar to filter by different columns.

`app/(admin)/_lib/users-table.config.ts`

```tsx{3}
export const usersTableConfig: DrizzleTableConfig = {
  drizzleTable: users,
  searchBy: ["id", "email"],
  formControlMap: { image: "file", role: "custom" },
  customFormControlMap: { role: UserRoleCustomFormControl },
  components: {
    RowNav: UserRowNav,
    ViewPageNav: UserViewPageNav,
    EditPageNav: UserEditPageNav,
    DeletePageNav: UserDeletePageNav,
    ListPageNav: UserListPageNav,
  },
};
```

As you can see, the search bar on the user list page will now search by both id and email.

## The Completed Example

Here is the final result with the customizations.

`app/(admin)/_components/users-components.tsx`

```tsx
"use client";

import Link from "next/link";
import {
  AdminPageNav,
  AdminRowNav,
  AdminPageNavProps,
  AdminRowNavProps,
  CustomFormControl,
} from "drizzle-admin/types";
import { User } from "@/schema/users";
import { FormControl, Label, Select, SelectOption } from "drizzle-admin/drizzle-ui";

export const UserRowNav: AdminRowNav<User> = (
  props: AdminRowNavProps<User>
) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.resourcePath}/${props.row.id}`}>
        View
      </Link>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row.id}/edit`}
      >
        Edit
      </Link>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row.id}/delete`}
      >
        Delete
      </Link>
    </>
  );
};

export const UserViewPageNav: AdminPageNav<User> = (
  props: AdminPageNavProps<User>
) => {
  return (
    <>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row?.id}/edit`}
      >
        Edit
      </Link>
    </>
  );
};

export const UserEditPageNav: AdminPageNav<User> = (
  props: AdminPageNavProps<User>
) => {
  return (
    <>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row?.id}/edit`}
      >
        Edit
      </Link>
    </>
  );
};

export const UserDeletePageNav: AdminPageNav<User> = (
  props: AdminPageNavProps<User>
) => {
  return (
    <>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row?.id}/edit`}
      >
        Edit
      </Link>
    </>
  );
};

export const UserListPageNav: AdminPageNav<User> = (
  props: AdminPageNavProps<User>
) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.resourcePath}/new`}>New</Link>
    </>
  );
};

export const UserRoleCustomFormControl: CustomFormControl = (props) => {
  return (
    <FormControl>
      <Label>Role</Label>
      <Select name="role" defaultValue={props.value}>
        <SelectOption value="admin">admin</SelectOption>
        <SelectOption value="user">user</SelectOption>
      </Select>
    </FormControl>
  )
}
```

`app/(admin)/_lib/users-table.config.ts`

```ts
import { users } from "@/schema/users";
import { DrizzleTableConfig } from "drizzle-admin/types";
import {
  UserDeletePageNav,
  UserEditPageNav,
  UserListPageNav,
  UserRoleCustomFormControl,
  UserRowNav,
  UserViewPageNav,
} from "@/app/(admin)/_components/users-components";

export const usersTableConfig: DrizzleTableConfig = {
  drizzleTable: users,
  searchBy: ["id", "email"],
  formControlMap: { image: "file", role: "custom" },
  customFormControlMap: { role: UserRoleCustomFormControl },
  components: {
    RowNav: UserRowNav,
    ViewPageNav: UserViewPageNav,
    EditPageNav: UserEditPageNav,
    DeletePageNav: UserDeletePageNav,
    ListPageNav: UserListPageNav,
  },
};
```

`app/(admin)/_lib/drizzle-admin.config.ts`

```ts
import { db } from "@/lib/db";
import { DrizzleAdminConfig } from "drizzle-admin/types";
import { usersTableConfig } from "./_lib/users-table.config";
import { posts } from "@/schema/posts";

export const config: DrizzleAdminConfig = {
  basePath: "/admin",
  schema: {
    users: usersTableConfig,
    posts: {
      drizzleTable: posts,
    },
  },
  db: db,
  dbDialect: "sqlite",
};
```
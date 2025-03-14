"use client";

import Link from "next/link";
import {
  AdminPageNav,
  AdminRowNav,
  AdminPageNavProps,
  AdminRowNavProps,
  CustomFormControl,
} from "@/src/types";
import { User } from "@/schema/users";
import { FormControl, Label, Select, SelectOption } from "@/src/drizzle-ui";

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
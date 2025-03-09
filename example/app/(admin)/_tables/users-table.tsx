import { users } from "@/schema/users";
import { DrizzleTableConfig } from "drizzle-admin/types";
import {
  UserDeletePageNav,
  UserEditPageNav,
  UserListPageNav,
  UserRowNav,
  UserViewPageNav,
} from "@/app/(admin)/_components/users-components";

export const usersTable: DrizzleTableConfig = {
  drizzleTable: users,
  formControlMap: {},
  components: {
    RowNav: UserRowNav,
    ViewPageNav: UserViewPageNav,
    EditPageNav: UserEditPageNav,
    DeletePageNav: UserDeletePageNav,
    ListPageNav: UserListPageNav,
  },
};

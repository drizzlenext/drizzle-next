import { users } from "@/schema/users";
import { DrizzleTableConfig } from "@/src/types";
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

import { JSX } from "react";
import { type DropdownMenuItemType, type AppNavItemType, type AppSidebarItemType } from "../drizzle-ui";

export type Params = Promise<{ [key: string]: string }>;

export type SearchParams = Promise<{ [key: string]: string | undefined }>;

export type CustomFormControl = (props: {value?: any}) => JSX.Element;

export type CustomFormControlMap = {
  [key: string]: CustomFormControl;
}

export type FormControlType =
  | "input"
  | "textarea"
  | "checkbox"
  | "date"
  | "datetime-local"
  | "number"
  | "richtext"
  | "file"
  | "json"
  | "custom";

export type FormControlMap = {
  [key: string]: FormControlType;
};

export type AdminRowNavProps<T> = {
  basePath: string;
  resourcePath: string;
  row: T;
};

export type AdminRowNav<T> = (props: AdminRowNavProps<T>) => JSX.Element;

export type AdminPageNavProps<T> = {
  basePath: string;
  resourcePath: string;
  row?: T;
};

export type AdminPageNav<T> = (props: AdminPageNavProps<T>) => JSX.Element;

export type DrizzleTableConfig = {
  drizzleTable: any;
  tableName?: string;
  path?: string;
  formControlMap?: FormControlMap;
  customFormControlMap?: CustomFormControlMap;
  components?: {
    RowNav?: AdminRowNav<any>;
    ViewPageNav?: AdminPageNav<any>;
    EditPageNav?: AdminPageNav<any>;
    DeletePageNav?: AdminPageNav<any>;
    ListPageNav?: AdminPageNav<any>;
  };
};

export type DrizzleTableConfigComplete = {
  drizzleTable: any;
  tableName: string;
  path: string;
  formControlMap: FormControlMap;
  customFormControlMap: CustomFormControlMap;
  components?: {
    RowNav?: AdminRowNav<any>;
    ViewPageNav?: AdminPageNav<any>;
    EditPageNav?: AdminPageNav<any>;
    DeletePageNav?: AdminPageNav<any>;
    ListPageNav?: AdminPageNav<any>;
  };
};

export type DrizzleAdminConfig = {
  basePath: string;
  schema: {
    [key: string]: DrizzleTableConfig;
  };
  db: any;
  dbDialect: "postgresql" | "mysql" | "sqlite";
};

export type DrizzleAdminConfigComplete = {
  basePath: string;
  schema: {
    [key: string]: DrizzleTableConfigComplete;
  };
  db: any;
  dbDialect: "postgresql" | "mysql" | "sqlite";
};

export type ColumnDataType = "string" | "boolean" | "number" | "date" | "json";

export type ColumnDataTypeMap = {
  [key: string]: ColumnDataType;
};

export type DrizzleLayoutConfig = {
  nav: AppNavItemType[];
  sidebar: AppSidebarItemType[];
  dropdown: DropdownMenuItemType[];
};

export type SimplifiedColumn = {
  name: string;
  dataType: string;
}

export type Filter = {
  column: string;
  operator: string;
  value: string;
}

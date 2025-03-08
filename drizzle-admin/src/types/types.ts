import { JSX } from "react";
import { NavItem, SidebarItem } from "../drizzle-ui";

export type Params = Promise<{ [key: string]: string }>;

export type SearchParams = Promise<{ [key: string]: string | undefined }>;

export type FormControlType =
  | "input"
  | "textarea"
  | "checkbox"
  | "date"
  | "datetime-local"
  | "number"
  | "richtext";

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

export type ColumnDataType = "string" | "boolean" | "number" | "date";

export type ColumnDataTypeMap = {
  [key: string]: ColumnDataType;
};

export type DrizzleLayoutConfig = {
  nav: NavItem[];
  sidebar: SidebarItem[];
};

export interface SimplifiedColumn {
  name: string;
  dataType: string;
}

export interface Filter {
  column: string;
  operator: string;
  value: string;
}

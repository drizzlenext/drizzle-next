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

export type RowNavProps<T> = {
  basePath: string;
  curTable: string;
  curPath: string;
  row: T;
};

export type RowNav<T> = (props: RowNavProps<T>) => JSX.Element;

export type PageNavProps<T> = {
  basePath: string;
  curTable: string;
  curPath: string;
  row?: T;
};

export type PageNav<T> = (props: PageNavProps<T>) => JSX.Element;

export type DrizzleTableConfig = {
  drizzleTable: any;
  tableName?: string;
  label?: string;
  path?: string;
  formControlMap?: FormControlMap;
  components?: {
    RowNav?: RowNav<any>;
    ViewPageNav?: PageNav<any>;
    EditPageNav?: PageNav<any>;
    DeletePageNav?: PageNav<any>;
    ListPageNav?: PageNav<any>;
  };
};

export type DrizzleTableConfigComplete = {
  drizzleTable: any;
  tableName: string;
  label: string;
  path: string;
  formControlMap: FormControlMap;
  components?: {
    RowNav?: RowNav<any>;
    ViewPageNav?: PageNav<any>;
    EditPageNav?: PageNav<any>;
    DeletePageNav?: PageNav<any>;
    ListPageNav?: PageNav<any>;
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

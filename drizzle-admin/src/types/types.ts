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

export type RowActionsProps<T> = {
  basePath: string;
  curTable: string;
  curPath: string;
  row: T;
};

export type RowActions<T> = (props: RowActionsProps<T>) => JSX.Element;

export type PageActionsProps<T> = {
  basePath: string;
  curTable: string;
  curPath: string;
  row?: T;
};

export type PageActions<T> = (props: PageActionsProps<T>) => JSX.Element;

export type DrizzleTableConfig = {
  drizzleTable: any;
  tableName?: string;
  label?: string;
  path?: string;
  formControlMap?: FormControlMap;
  components?: {
    RowActions?: RowActions<any>;
    ViewPageActions?: PageActions<any>;
    EditPageActions?: PageActions<any>;
    DeletePageActions?: PageActions<any>;
    ListPageActions?: PageActions<any>;
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

export type DrizzleTableConfigComplete = {
  drizzleTable: any;
  tableName: string;
  label: string;
  path: string;
  formControlMap: FormControlMap;
  components?: {
    RowActions?: RowActions<any>;
    ViewPageActions?: PageActions<any>;
    EditPageActions?: PageActions<any>;
    DeletePageActions?: PageActions<any>;
    ListPageActions?: PageActions<any>;
  };
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

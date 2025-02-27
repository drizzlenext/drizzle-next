import { JSX } from "react";

export type Params = Promise<{ [key: string]: string }>;

export type SearchParams = Promise<{ [key: string]: string | undefined }>;

export type FormControlType =
  | "input"
  | "textarea"
  | "checkbox"
  | "date"
  | "datetime-local"
  | "number";

export type FormControlMap = {
  [key: string]: FormControlType;
};

export type TableRowActionsProps = {
  basePath: string;
  curTable: string;
  curPath: string;
  row: any;
};

export type TableRowActions = (props: TableRowActionsProps) => JSX.Element;

export type PageActionsProps = {
  basePath: string;
  curTable: string;
  curPath: string;
  row?: any;
};

export type PageActions = (props: PageActionsProps) => JSX.Element;

export type DrizzleTableConfig = {
  drizzleTable: any;
  tableName?: string;
  label?: string;
  path?: string;
  formControlMap?: FormControlMap;
  components?: {
    TableRowActions?: TableRowActions;
    ViewPageActions?: PageActions;
    EditPageActions?: PageActions;
    DeletePageActions?: PageActions;
    ListPageActions?: PageActions;
  };
};

export type SidebarItem = {
  text: string;
  link?: string;
  items?: SidebarItem[];
  type?: "dynamic-tables";
  icon?: JSX.Element;
};

export type DrizzleAdminConfig = {
  basePath: string;
  schema: {
    [key: string]: DrizzleTableConfig;
  };
  db: any;
  dbDialect: "postgresql" | "mysql" | "sqlite";
  sidebar: SidebarItem[];
};

export type DrizzleTableConfigComplete = {
  drizzleTable: any;
  tableName: string;
  label: string;
  path: string;
  formControlMap: FormControlMap;
  components?: {
    TableRowActions?: TableRowActions;
    ViewPageActions?: PageActions;
    EditPageActions?: PageActions;
    DeletePageActions?: PageActions;
    ListPageActions?: PageActions;
  };
};

export type DrizzleAdminConfigComplete = {
  basePath: string;
  schema: {
    [key: string]: DrizzleTableConfigComplete;
  };
  db: any;
  dbDialect: "postgresql" | "mysql" | "sqlite";
  sidebar: SidebarItem[];
};

export type DrizzleAdminLayoutConfig = {
  basePath: string;
  sidebar: SidebarItem[];
};

export type ColumnDataType = "string" | "boolean" | "number" | "date";

export type ColumnDataTypeMap = {
  [key: string]: ColumnDataType;
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

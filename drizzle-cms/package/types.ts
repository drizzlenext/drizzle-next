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

export type TableRowActionsSlot = (props: TableRowActionsProps) => JSX.Element;

export type PageActionsProps = {
  basePath: string;
  curTable: string;
  curPath: string;
  row?: any;
};

export type PageActionsSlot = (props: PageActionsProps) => JSX.Element;

export type DrizzleTableConfig = {
  drizzleTable: any;
  tableName?: string;
  label?: string;
  path?: string;
  formControlMap?: FormControlMap;
  TableRowActionsSlot?: TableRowActionsSlot;
  ViewPageActionsSlot?: PageActionsSlot;
  EditPageActionsSlot?: PageActionsSlot;
  DeletePageActionsSlot?: PageActionsSlot;
  ListPageActionsSlot?: PageActionsSlot;
};

export type SidebarItem = {
  text: string;
  link?: string;
  items?: SidebarItem[];
  type?: "dynamic-tables";
};

export type DrizzleCmsConfig = {
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
  TableRowActionsSlot?: TableRowActionsSlot;
  ViewPageActionsSlot?: PageActionsSlot;
  EditPageActionsSlot?: PageActionsSlot;
  DeletePageActionsSlot?: PageActionsSlot;
  ListPageActionsSlot?: PageActionsSlot;
};

export type DrizzleCmsConfigComplete = {
  basePath: string;
  schema: {
    [key: string]: DrizzleTableConfigComplete;
  };
  db: any;
  dbDialect: "postgresql" | "mysql" | "sqlite";
  sidebar: SidebarItem[];
};

export type DrizzleCmsLayoutConfig = {
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

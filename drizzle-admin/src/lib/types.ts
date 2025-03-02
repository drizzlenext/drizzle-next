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

export type TableRowActionsProps<T> = {
  basePath: string;
  curTable: string;
  curPath: string;
  row: T;
};

export type TableRowActions<T> = (
  props: TableRowActionsProps<T>
) => JSX.Element;

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
  hiddenInSidebar?: boolean;
  components?: {
    TableRowActions?: TableRowActions<any>;
    ViewPageActions?: PageActions<any>;
    EditPageActions?: PageActions<any>;
    DeletePageActions?: PageActions<any>;
    ListPageActions?: PageActions<any>;
  };
};

export type SidebarItem = {
  text: string;
  link?: string;
  items?: SidebarItem[];
  type?: "from-schema";
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
  hiddenInSidebar: boolean;
  components?: {
    TableRowActions?: TableRowActions<any>;
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

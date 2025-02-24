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

export type DrizzleTableConfig = {
  drizzleTable: any;
  tableName?: string;
  label?: string;
  path?: string;
  formControlMap?: FormControlMap;
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

export type DrizzleTableConfigComplete = Required<DrizzleTableConfig>;

export type DrizzleCmsConfigComplete = Required<DrizzleCmsConfig> & {
  schema: { [key: string]: DrizzleTableConfigComplete };
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

export interface ObjectTableConfig {
  curTable: string;
  basePath: string;
  columns: SimplifiedColumn[];
  curRow: Record<string, any>;
}

export interface Filter {
  column: string;
  operator: string;
  value: string;
}

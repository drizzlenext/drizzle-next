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

export type DrizzleCmsConfig = {
  basePath: string;
  schema: {
    [key: string]: {
      drizzleTable: any;
      label: string;
      path: string;
      formControlMap?: FormControlMap;
    };
  };
  db: any;
  dbDialect: "postgresql" | "mysql" | "sqlite";
};

export type DrizzleCmsLayoutConfig = {
  basePath: string;
  schema: {
    [key: string]: {
      label: string;
      path: string;
    };
  };
};

export type ColumnDataType = "string" | "boolean" | "number" | "date";

export type ColumnDataTypeMap = {
  [key: string]: ColumnDataType;
};

export interface SimplifiedColumn {
  name: string;
  dataType: string;
}

export interface DrizzleTableConfig {
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

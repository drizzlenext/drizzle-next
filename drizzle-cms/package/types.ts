export type Params = Promise<{ [key: string]: string }>;

export type SearchParams = Promise<{ [key: string]: string | undefined }>;

export type DrizzleCmsConfig = {
  basePath: string;
  schema: {
    [key: string]: {
      drizzleSchema: any;
      label: string;
      path: string;
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

export type ColumnInfoMap = {
  [key: string]: "string" | "boolean" | "number" | "date";
};

export interface SimplifiedColumn {
  name: string;
  dataType: string;
}

export interface DrizzleTableConfig {
  curTable: string;
  basePath: string;
  columns: SimplifiedColumn[];
}

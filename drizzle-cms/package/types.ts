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

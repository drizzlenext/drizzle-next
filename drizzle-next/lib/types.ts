export type DrizzleNextConfig = {
  version: string;
  packageManager: PackageManager;
  latest: boolean;
  dbDialect: DbDialect;
  dbPackage: DbPackage;
  pkStrategy: PkStrategy;
  authEnabled: boolean;
  adminEnabled: boolean;
  install: boolean;
  pluralizeEnabled: boolean;
}

export type PackageManager = "npm" | "pnpm" | "bun";

export type PkStrategy =
  | "cuid2"
  | "uuidv7"
  | "uuidv4"
  | "nanoid"
  | "auto_increment";

export type DrizzleNextProcessor = {
  opts: DrizzleNextConfig;
  dependencies: string[];
  devDependencies: string[];
  dbDialectStrategy?: DbDialectStrategy;
  init(): Promise<void>;
  render(): Promise<void>;
  printCompletionMessage: () => void;
}

export type DbDialect = "postgresql" | "mysql" | "sqlite";

export type DataTypeStrategyMap = {
  [key: string]: DataTypeStrategy;
}

export type AuthorizationLevel = "admin" | "private" | "public";

export type ScaffoldProcessorOpts = {
  table: string;
  columns: string[];
  enableCompletionMessage: boolean;
  enableUiScaffold: boolean;
  enableDbScaffold: boolean;
} & DrizzleNextConfig;

export type DataTypeStrategyOpts = {
  keyName: string;
  columnName: string;
  referencesTable?: string;
  fkStrategyTemplate?: string;
}

type JSType = "string" | "number" | "boolean" | "object";

export type FormComponent =
  | "input"
  | "textarea"
  | "checkbox"
  | "select"
  | "tiptap-editor";

export type DataTypeStrategy = {
  jsType: JSType;
  sqlType: string;
  formTemplate: string;
  updateFormTemplate: string;
  formComponents: FormComponent[];
  zodCode: string;
  getKeyValueStrForSchema(opts: DataTypeStrategyOpts): string;
}

export type DbDialectStrategy = {
  dialect: DbDialect;
  drizzleDbCorePackage: string;
  tableConstructor: string;
  dataTypeStrategyMap: DataTypeStrategyMap;
  pkStrategyJsType: Record<PkStrategy, string>;
  pkStrategyTemplates: Record<PkStrategy, string>;
  pkStrategyDataTypes: Record<PkStrategy, string>;
  fkStrategyTemplates: Record<PkStrategy, string>;
  createdAtTemplate: string;
  updatedAtTemplate: string;
  pkDataType: string;
  fkAutoIncrementDataType: string;
  timestampImport: string;
}

export type DbPackageStrategy =  {
  opts: DrizzleNextConfig;
  dialect: DbDialect;
  copyCreateUserScript(): void;
  copyMigrateScript(): void;
  appendDbUrl(): void;
  copyDbInstance(): void;
  printCompletionMessage(): void;
} & DrizzleNextProcessor;

export type DbPackage = "pg" | "mysql2" | "better-sqlite3";

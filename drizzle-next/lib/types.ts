export interface DrizzleNextConfig {
  version: string;
  packageManager: PackageManager;
  latest: boolean;
  dbDialect: DbDialect;
  dbPackage: DbPackage;
  pkStrategy: PkStrategy;
  cssStrategy: CssStrategy;
  authEnabled: boolean;
  authSolution: AuthSolution;
  authProviders: AuthProvider[];
  adminEnabled: boolean;
  install: boolean;
  pluralizeEnabled: boolean;
}

export type AuthSolution = "authjs" | "none";

export type PackageManager = "npm" | "pnpm" | "bun";

export type PkStrategy =
  | "cuid2"
  | "uuidv7"
  | "uuidv4"
  | "nanoid"
  | "auto_increment";

export type CssStrategy = "tailwind" | "none";

export interface DrizzleNextProcessor {
  opts: DrizzleNextConfig;
  dependencies: string[];
  devDependencies: string[];
  dbDialectStrategy?: DbDialectStrategy;
  init(): Promise<void>;
  render(): Promise<void>;
  printCompletionMessage: () => void;
}

export type DbDialect = "postgresql" | "mysql" | "sqlite";

export interface DataTypeStrategyMap {
  [key: string]: DataTypeStrategy;
}

export type AuthorizationLevel = "admin" | "private" | "public";

export interface ScaffoldProcessorOpts extends DrizzleNextConfig {
  table: string;
  columns: string[];
  authorizationLevel: AuthorizationLevel;
  enableCompletionMessage: boolean;
  enableUiScaffold: boolean;
  enableDbScaffold: boolean;
}

export interface DataTypeStrategyOpts {
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

export interface DataTypeStrategy {
  jsType: JSType;
  sqlType: string;
  formTemplate: string;
  updateFormTemplate: string;
  formComponents: FormComponent[];
  zodCode: string;
  getKeyValueStrForSchema(opts: DataTypeStrategyOpts): string;
}

export interface DbDialectStrategy {
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

export interface DbPackageStrategy extends DrizzleNextProcessor {
  opts: DrizzleNextConfig;
  dialect: DbDialect;
  copyCreateUserScript(): void;
  copyMigrateScript(): void;
  appendDbUrl(): void;
  copyDbInstance(): void;
  printCompletionMessage(): void;
}

export type AuthProvider =
  | "github"
  | "google"
  | "credentials"
  | "postmark"
  | "nodemailer";

export type DbPackage = "pg" | "mysql2" | "better-sqlite3";

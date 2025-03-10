import {
  DataTypeStrategyMap,
  DataTypeStrategyOpts,
  DbDialectStrategy,
} from "../lib/types";

const mysqlDataTypeStrategies: DataTypeStrategyMap = {
  int: {
    jsType: "number",
    sqlType: "int",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: int()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  tinyint: {
    jsType: "number",
    sqlType: "tinyint",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: tinyint()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  smallint: {
    jsType: "number",
    sqlType: "smallint",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: smallint()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  mediumint: {
    jsType: "number",
    sqlType: "mediumint",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: mediumint()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  bigint: {
    jsType: "number",
    sqlType: "bigint",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: bigint({ mode: "number" })`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  real: {
    jsType: "number",
    sqlType: "real",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: real()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  decimal: {
    jsType: "number",
    sqlType: "decimal",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: decimal()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.string()",
  },
  double: {
    jsType: "number",
    sqlType: "double",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: double()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  float: {
    jsType: "number",
    sqlType: "float",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: float()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  serial: {
    jsType: "number",
    sqlType: "serial",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: serial()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  binary: {
    jsType: "string",
    sqlType: "",
    formTemplate: "",
    updateFormTemplate: "",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      throw new Error("Function not implemented.");
    },
    formComponents: [],
    zodCode: "z.coerce.string()",
  },
  varbinary: {
    jsType: "string",
    sqlType: "",
    formTemplate: "",
    updateFormTemplate: "",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      throw new Error("Function not implemented.");
    },
    formComponents: [],
    zodCode: "z.coerce.string()",
  },
  char: {
    jsType: "string",
    sqlType: "char",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: char()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.string()",
  },
  varchar: {
    jsType: "string",
    sqlType: "varchar",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: varchar({ length: 255 })`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.string()",
  },
  text: {
    jsType: "string",
    sqlType: "text",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: text()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.string()",
  },
  boolean: {
    jsType: "boolean",
    sqlType: "boolean",
    formTemplate: "scaffold-processor/form-controls/create-checkbox.tsx.hbs",
    updateFormTemplate:
      "scaffold-processor/form-controls/update-checkbox.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: boolean()`;
    },
    formComponents: ["checkbox"],
    zodCode: "z.coerce.boolean()",
  },
  date: {
    jsType: "string",
    sqlType: "date",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate:
      "scaffold-processor/form-controls/update-input-date.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: date()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.date()",
  },
  datetime: {
    jsType: "string",
    sqlType: "datetime",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate:
      "scaffold-processor/form-controls/update-input-timestamp.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: datetime()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.date()",
  },
  time: {
    jsType: "string",
    sqlType: "time",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: time()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.string()",
  },
  year: {
    jsType: "string",
    sqlType: "year",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: year()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  timestamp: {
    jsType: "string",
    sqlType: "timestamp",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate:
      "scaffold-processor/form-controls/update-input-timestamp.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: timestamp()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.date()",
  },
  json: {
    jsType: "object",
    sqlType: "json",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate:
      "scaffold-processor/form-controls/update-input-json.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: json()`;
    },
    formComponents: ["input"],
    zodCode: "z.preprocess((val: any) => JSON.parse(val), z.any())",
  },
  references: {
    jsType: "string",
    sqlType: "varchar",
    formTemplate:
      "scaffold-processor/form-controls/create-references-input.tsx.hbs",
    updateFormTemplate:
      "scaffold-processor/form-controls/update-references-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: ${opts.fkStrategyTemplate}.references(() => ${opts.referencesTable}.id)`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.string()",
  },
  references_select: {
    jsType: "string",
    sqlType: "varchar",
    formTemplate:
      "scaffold-processor/form-controls/create-references-select.tsx.hbs",
    updateFormTemplate:
      "scaffold-processor/form-controls/update-references-select.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: ${opts.fkStrategyTemplate}.references(() => ${opts.referencesTable}.id)`;
    },
    formComponents: ["select"],
    zodCode: "z.coerce.string()",
  },
  file: {
    jsType: "string",
    sqlType: "varchar",
    formTemplate: "scaffold-processor/form-controls/create-file.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-file.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: varchar({ length: 255 })`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.string()",
  },
  text_tiptap: {
    jsType: "string",
    sqlType: "text",
    formTemplate: "tiptap-processor/components/create-tiptap-editor.tsx.hbs",
    updateFormTemplate:
      "tiptap-processor/components/update-tiptap-editor.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: text()`;
    },
    formComponents: ["tiptap-editor"],
    zodCode: "z.coerce.string()",
  },
};

export const mysqlDialectStrategy: DbDialectStrategy = {
  pkDataType: "varchar",
  fkAutoIncrementDataType: "bigint",
  createdAtTemplate: `createdAt: timestamp().notNull().defaultNow(),`,
  updatedAtTemplate: `updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),`,
  pkStrategyTemplates: {
    uuidv7: `id: varchar({ length: 255 }).primaryKey().$defaultFn(() => uuidv7()),`,
    uuidv4: `id: varchar({ length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),`,
    cuid2:
      "id: varchar({ length: 255 }).primaryKey().$defaultFn(() => createId()),",
    nanoid: `id: varchar({ length: 255 }).primaryKey().$defaultFn(() => nanoid()),`,
    auto_increment: `id: bigint({ mode: "number" }).autoincrement().primaryKey(),`,
  },
  pkStrategyDataTypes: {
    cuid2: "varchar",
    uuidv7: "varchar",
    uuidv4: "varchar",
    nanoid: "varchar",
    auto_increment: "bigint",
  },
  fkStrategyTemplates: {
    cuid2: "varchar({ length: 255 })",
    uuidv7: "varchar({ length: 255 })",
    uuidv4: "varchar({ length: 255 })",
    nanoid: "varchar({ length: 255 })",
    auto_increment: `bigint({ mode: "number"})`,
  },
  pkStrategyJsType: {
    cuid2: "string",
    uuidv7: "string",
    uuidv4: "string",
    nanoid: "string",
    auto_increment: "number",
  },
  drizzleDbCorePackage: "drizzle-orm/mysql-core",
  tableConstructor: "mysqlTable",
  dialect: "mysql",
  dataTypeStrategyMap: mysqlDataTypeStrategies,
  timestampImport: "timestamp",
};

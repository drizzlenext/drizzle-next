import {
  DataTypeStrategyMap,
  DataTypeStrategyOpts,
  DbDialectStrategy,
} from "../../common/types/types";

const postgresqlDataTypeStrategies: DataTypeStrategyMap = {
  integer: {
    jsType: "number",
    sqlType: "integer",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: integer()`;
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
  smallserial: {
    jsType: "number",
    sqlType: "smallserial",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: smallserial()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  bigserial: {
    jsType: "number",
    sqlType: "bigserial",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: bigserial({ mode: "number" })`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
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
  char: {
    jsType: "string",
    sqlType: "char",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: char({ length: 255 })`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.string()",
  },
  numeric: {
    jsType: "number",
    sqlType: "numeric",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: numeric()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.string()",
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
  doublePrecision: {
    jsType: "number",
    sqlType: "doublePrecision",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: doublePrecision()`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
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
  jsonb: {
    jsType: "object",
    sqlType: "jsonb",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate:
      "scaffold-processor/form-controls/update-input-json.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: jsonb()`;
    },
    formComponents: ["input"],
    zodCode: "z.preprocess((val: any) => JSON.parse(val), z.any())",
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
  date: {
    jsType: "string",
    sqlType: "date",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate:
      "scaffold-processor/form-controls/update-input-date.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: date({ mode: "date" })`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.date()",
  },
  uuid: {
    jsType: "string",
    sqlType: "uuid",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: uuid()`;
    },
    formComponents: ["input"],
    zodCode: "z.string().uuid()",
  },
  references: {
    jsType: "string",
    sqlType: "text",
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
    sqlType: "text",
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
    sqlType: "text",
    formTemplate: "scaffold-processor/form-controls/create-file.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-file.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: text()`;
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

export const postgresqlDialectStrategy: DbDialectStrategy = {
  pkDataType: "text",
  createdAtTemplate: `createdAt: timestamp().notNull().defaultNow(),`,
  updatedAtTemplate: `updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),`,
  drizzleDbCorePackage: "drizzle-orm/pg-core",
  tableConstructor: "pgTable",
  dataTypeStrategyMap: postgresqlDataTypeStrategies,
  dialect: "postgresql",
  timestampImport: "timestamp",
};

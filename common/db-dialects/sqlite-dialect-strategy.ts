import {
  DataTypeStrategyMap,
  DataTypeStrategyOpts,
  DbDialectStrategy,
} from "../types/types";

const sqliteDataTypeStrategies: DataTypeStrategyMap = {
  integer: {
    jsType: "number",
    sqlType: "integer",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts) {
      return `${opts.keyName}: integer()`;
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
    sqlType: "integer",
    formTemplate: "scaffold-processor/form-controls/create-checkbox.tsx.hbs",
    updateFormTemplate:
      "scaffold-processor/form-controls/update-checkbox.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: integer({ mode: "boolean" } )`;
    },
    formComponents: ["checkbox"],
    zodCode: "z.coerce.boolean()",
  },
  bigint: {
    jsType: "number",
    sqlType: "blob",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate: "scaffold-processor/form-controls/update-input.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: blob({ mode: "bigint" })`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.number()",
  },
  timestamp: {
    jsType: "string",
    sqlType: "integer",
    formTemplate: "scaffold-processor/form-controls/create-input.tsx.hbs",
    updateFormTemplate:
      "scaffold-processor/form-controls/update-input-timestamp.tsx.hbs",
    getKeyValueStrForSchema: function (opts: DataTypeStrategyOpts): string {
      return `${opts.keyName}: integer({ mode: "timestamp" })`;
    },
    formComponents: ["input"],
    zodCode: "z.coerce.date()",
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

export const sqliteDialectStrategy: DbDialectStrategy = {
  pkDataType: "text",
  pkFunctionTemplate: "text()",
  createdAtTemplate:
    "createdAt: integer({ mode: \"timestamp\" }).notNull().default(sql`(strftime('%s', 'now'))`),",
  updatedAtTemplate:
    "updatedAt: integer({ mode: \"timestamp\" }).notNull().default(sql`(strftime('%s', 'now'))`).$onUpdate(() => new Date()),",
  tableConstructor: "sqliteTable",
  drizzleDbCorePackage: "drizzle-orm/sqlite-core",
  dataTypeStrategyMap: sqliteDataTypeStrategies,
  dialect: "sqlite",
  timestampImport: "integer",
};

import {
  DbDialect,
  DbDialectStrategy,
  BaseScaffoldProcessorOpts,
} from "../types/types";
import { renderTemplate, insertSchemaToSchemaIndex } from "../lib/utils";
import { log } from "../lib/log";
import { caseFactory, Cases } from "../lib/case-utils";
import { dialectStrategyFactory } from "../lib/strategy-factory";

type ScaffoldDbDialectStrategy = {
  schemaTableTemplatePath: string;
};

const scaffoldDbDialectStrategies: Record<
  DbDialect,
  ScaffoldDbDialectStrategy
> = {
  postgresql: {
    schemaTableTemplatePath:
      "scaffold-processor/src/schema/table.ts.postgresql.hbs",
  },
  mysql: {
    schemaTableTemplatePath: "scaffold-processor/src/schema/table.ts.mysql.hbs",
  },
  sqlite: {
    schemaTableTemplatePath:
      "scaffold-processor/src/schema/table.ts.sqlite.hbs",
  },
};

type ValidatedColumn = {
  columnName: string; // the original column name passed in from cli
  dataType: string; // the datatype
  caseVariants: Cases; // the case variants of the original column
  zodCode: string; // the zod coersion code
  referenceTableVars?: Cases; // for the table name of reference types
};

export class DrizzleScaffoldProcessor {
  opts: BaseScaffoldProcessorOpts;

  dbDialectStrategy: DbDialectStrategy;

  validatedColumns: ValidatedColumn[];

  validatedColumnsWithTimestamps: ValidatedColumn[];

  validatedColumnsWithIdAndTimestamps: ValidatedColumn[];

  pkZodCode: string;

  pkFunctionTemplate: string;

  constructor(opts: BaseScaffoldProcessorOpts) {
    this.opts = opts;
    this.dbDialectStrategy = dialectStrategyFactory(opts.dbDialect);
    this.validatedColumns = this.parseColumns(opts.columns);
    this.validatedColumnsWithTimestamps =
      this.getValidatedColumnsWithTimestamps();
    this.validatedColumnsWithIdAndTimestamps =
      this.getValidatedColumsWithIdAndTimestamps();

    // z.coerce.string()
    this.pkZodCode =
      this.dbDialectStrategy.dataTypeStrategyMap[
        this.dbDialectStrategy.pkDataType
      ].zodCode;

    this.pkFunctionTemplate = this.dbDialectStrategy.pkFunctionTemplate;
  }

  private getOutputPath(path: string): string {
    return this.opts.srcDir ? `src/${path}` : path;
  }

  getValidatedColumsWithIdAndTimestamps() {
    const idCol: ValidatedColumn = {
      columnName: "id",
      dataType: this.dbDialectStrategy.pkDataType,
      caseVariants: caseFactory("id", {
        pluralize: this.opts.pluralizeEnabled,
      }),
      zodCode: this.pkZodCode,
    };

    return [idCol].concat(this.getValidatedColumnsWithTimestamps());
  }

  getValidatedColumnsWithTimestamps() {
    const createdAtCol: ValidatedColumn = {
      columnName: "created_at",
      dataType: "timestamp",
      caseVariants: caseFactory("created_at", {
        pluralize: this.opts.pluralizeEnabled,
      }),
      zodCode: this.dbDialectStrategy.dataTypeStrategyMap["timestamp"].zodCode,
    };

    const updatedAtCol: ValidatedColumn = {
      columnName: "updated_at",
      dataType: "timestamp",
      caseVariants: caseFactory("updated_at", {
        pluralize: this.opts.pluralizeEnabled,
      }),
      zodCode: this.dbDialectStrategy.dataTypeStrategyMap["timestamp"].zodCode,
    };

    return this.validatedColumns.concat([createdAtCol, updatedAtCol]);
  }

  parseColumns(columns: string[]) {
    const dataTypeStrategyMap = this.dbDialectStrategy.dataTypeStrategyMap;
    const validatedColumns: ValidatedColumn[] = [];
    for (const column of columns) {
      let [columnName, dataType] = column.split(":");
      let referenceTableVars;
      if (dataType.startsWith("references")) {
        const inferredReferencesTableName = columnName.split("_id")[0];
        referenceTableVars = caseFactory(inferredReferencesTableName, {
          pluralize: this.opts.pluralizeEnabled,
        });
      }
      if (!(dataType in dataTypeStrategyMap)) {
        throw new Error(`invalid data type ${dataType}`);
      }
      let zodCode = dataTypeStrategyMap[dataType].zodCode;
      if (dataType.startsWith("references")) {
        zodCode = this.pkZodCode;
      }
      validatedColumns.push({
        columnName,
        dataType,
        caseVariants: caseFactory(columnName, {
          pluralize: this.opts.pluralizeEnabled,
        }),
        referenceTableVars: referenceTableVars,
        zodCode: zodCode,
      });
    }

    return validatedColumns;
  }

  process(): void {
    log.init(`generate drizzle scaffold: ${this.opts.table}`);
    this.addSchema();
    insertSchemaToSchemaIndex(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
      srcDir: this.opts.srcDir,
    });
    if (this.opts.enableCompletionMessage) {
      this.printCompletionMessage();
    }
  }
  addSchema(): void {
    const { table } = this.opts;
    // compile columns
    let columnsCode = "";

    const pkCode = `id: ${this.pkFunctionTemplate}.primaryKey().$defaultFn(() => createId()),`;
    columnsCode += "    " + pkCode + "\n";

    // add other columns
    for (const [index, column] of this.validatedColumns.entries()) {
      columnsCode += this.getKeyValueStrForSchema(column);
      if (index !== this.validatedColumns.length - 1) {
        columnsCode += "\n";
      }
    }

    // add timestamps
    columnsCode += "\n    " + this.dbDialectStrategy.createdAtTemplate + "\n";
    columnsCode += "    " + this.dbDialectStrategy.updatedAtTemplate;

    // generate imports code
    const importsCode = this.generateImportsCodeFromColumns();
    const tableObj = caseFactory(table, {
      pluralize: this.opts.pluralizeEnabled,
    });
    const referencesColumnList = this.getReferencesColumnList("references");
    renderTemplate({
      inputPath:
        scaffoldDbDialectStrategies[this.opts.dbDialect]
          .schemaTableTemplatePath,
      outputPath: this.getOutputPath(
        `db/schema/${tableObj.pluralKebabCase}.ts`
      ),
      data: {
        columns: columnsCode,
        imports: importsCode,
        tableObj: tableObj,
        referencesColumnList: referencesColumnList,
      },
    });
  }
  generateImportsCodeFromColumns() {
    const dataTypeSet = new Set<string>();

    // add pk data type
    dataTypeSet.add(this.dbDialectStrategy.pkDataType);

    let referenceImportsCode = "";
    for (const validatedColumn of this.validatedColumns) {
      const { dataType, referenceTableVars } = validatedColumn;
      const dataTypeStrategy =
        this.dbDialectStrategy.dataTypeStrategyMap[dataType];
      if (dataTypeStrategy.sqlType) {
        dataTypeSet.add(dataTypeStrategy.sqlType);
      } else {
        dataTypeSet.add(dataType);
      }

      // references
      if (dataType.startsWith("references") && referenceTableVars) {
        referenceImportsCode += `import { ${referenceTableVars.pluralCamelCase} } from "@/db/schema/${referenceTableVars.pluralKebabCase}";\n`;
      }
    }

    // drizzle imports
    let code = "import {\n";
    code += `  ${this.dbDialectStrategy.tableConstructor},\n`;
    if (this.dbDialectStrategy.timestampImport) {
      dataTypeSet.add(this.dbDialectStrategy.timestampImport);
    }
    for (const dataType of dataTypeSet) {
      code += `  ${dataType},\n`;
    }
    code += `} from "${this.dbDialectStrategy.drizzleDbCorePackage}";\n`;

    // reference import
    if (referenceImportsCode !== "") {
      code += "\n" + referenceImportsCode;
    }

    return code;
  }
  getKeyValueStrForSchema(validatedColumn: ValidatedColumn): string {
    const { dataTypeStrategyMap } = this.dbDialectStrategy;
    let { columnName, dataType, caseVariants, referenceTableVars } =
      validatedColumn;
    const strategy = dataTypeStrategyMap[dataType];

    if (dataType.startsWith("references")) {
      columnName = caseVariants.singularSnakeCase;
    }

    let str =
      "    " +
      strategy.getKeyValueStrForSchema({
        keyName: caseVariants.originalCamelCase,
        columnName: columnName,
        referencesTable: referenceTableVars?.pluralCamelCase,
        fkStrategyTemplate: this.pkFunctionTemplate,
      });
    str += ",";
    return str;
  }
  getReferencesColumnList(startsWith: "references" | "references_") {
    const referencesColumnList = this.validatedColumns
      .filter((validatedColumn) =>
        validatedColumn.dataType.startsWith(startsWith)
      )
      .map((validatedColumn) => validatedColumn);
    return referencesColumnList;
  }
  printCompletionMessage() {
    log.success("successfully generated drizzle scaffold: " + this.opts.table);
    log.checklist("scaffold checklist");
    log.cmdtask("npx drizzle-kit generate");
    log.cmdtask("npx drizzle-kit migrate");
  }
}

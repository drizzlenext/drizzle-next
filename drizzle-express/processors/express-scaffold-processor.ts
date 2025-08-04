import {
  DbDialectStrategy,
  ExpressScaffoldProcessorOpts,
} from "../../common/types/types";
import { insertTextAfterIfNotExists } from "../../common/lib/utils";
import { log } from "../../common/lib/log";
import { caseFactory, Cases } from "../../common/lib/case-utils";
import { dialectStrategyFactory } from "../../common/lib/strategy-factory";
import { renderTemplate } from "../lib/utils";

type ValidatedColumn = {
  columnName: string; // the original column name passed in from cli
  dataType: string; // the datatype
  caseVariants: Cases; // the case variants of the original column
  zodCode: string; // the zod coersion code
  referenceTableVars?: Cases; // for the table name of reference types
};

export class ExpressScaffoldProcessor {
  opts: ExpressScaffoldProcessorOpts;

  dbDialectStrategy: DbDialectStrategy;

  validatedColumns: ValidatedColumn[];

  validatedColumnsWithTimestamps: ValidatedColumn[];

  validatedColumnsWithIdAndTimestamps: ValidatedColumn[];

  constructor(opts: ExpressScaffoldProcessorOpts) {
    this.opts = opts;
    this.dbDialectStrategy = dialectStrategyFactory(opts.dbDialect);
    this.validatedColumns = this.parseColumns(opts.columns);
    this.validatedColumnsWithTimestamps =
      this.getValidatedColumnsWithTimestamps();
    this.validatedColumnsWithIdAndTimestamps =
      this.getValidatedColumsWithIdAndTimestamps();
  }

  getValidatedColumsWithIdAndTimestamps() {
    const idCol: ValidatedColumn = {
      columnName: "id",
      dataType: this.dbDialectStrategy.pkDataType,
      caseVariants: caseFactory("id", {
        pluralize: this.opts.pluralizeEnabled,
      }),
      zodCode: "z.coerce.string()",
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
        zodCode = "z.coerce.string()";
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
    log.init(`generate express.js scaffold: ${this.opts.table}`);
    this.addExpressRoute();
    if (this.opts.enableCompletionMessage) {
      this.printCompletionMessage();
    }
  }
  addExpressRoute() {
    const { table } = this.opts;
    const tableObj = caseFactory(table, {
      pluralize: this.opts.pluralizeEnabled,
    });

    renderTemplate({
      inputPath: "express-templates/src/routes/routes.ts.hbs",
      outputPath: `src/routes/${tableObj.singularKebabCase}.routes.ts`,
      data: {
        tableObj,
        validatedColumns: this.validatedColumns,
      },
    });

    renderTemplate({
      inputPath: "express-templates/src/controllers/controller.ts.hbs",
      outputPath: `src/controllers/${tableObj.singularKebabCase}.controller.ts`,
      data: {
        tableObj,
        validatedColumns: this.validatedColumns,
      },
    });

    renderTemplate({
      inputPath: "express-templates/src/services/service.ts.hbs",
      outputPath: `src/services/${tableObj.singularKebabCase}.service.ts`,
      data: {
        tableObj,
        validatedColumns: this.validatedColumns,
      },
    });

    insertTextAfterIfNotExists(
      "src/app.ts",
      `import bodyParser from "body-parser";`,
      `\nimport ${tableObj.singularCamelCase}Routes from "@/routes/${tableObj.singularKebabCase}.routes";`
    );
    insertTextAfterIfNotExists(
      "src/app.ts",
      `app.use(bodyParser.json());`,
      `\napp.use("/${tableObj.pluralKebabCase}", ${tableObj.singularCamelCase}Routes);`
    );
  }

  printCompletionMessage() {
    log.success(
      "successfully generated express.js scaffold: " + this.opts.table
    );
  }
}

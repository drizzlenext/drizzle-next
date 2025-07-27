import {
  DbDialectStrategy,
  FormComponent,
  PkStrategy,
  NextScaffoldProcessorOpts,
} from "../../common/types/types";
import { log } from "../../common/lib/log";
import { pkStrategyImportTemplates } from "../../common/lib/pk-strategy";
import { caseFactory, Cases } from "../../common/lib/case-utils";
import { dialectStrategyFactory } from "../../common/lib/strategy-factory";
import { compileTemplate, renderTemplate } from "../lib/utils";

const formComponentImports: Record<FormComponent, string> = {
  input: `import { Input } from "@/components/ui/input";`,
  textarea: `import { Textarea } from "@/components/ui/textarea";`,
  checkbox: `import { Checkbox } from "@/components/ui/checkbox";`,
  select: `import { Select, SelectOption } from "@/components/ui/select";`,
  "tiptap-editor": `import { TiptapEditor } from "@/components/ui/tiptap-editor";`,
};

type ValidatedColumn = {
  columnName: string; // the original column name passed in from cli
  dataType: string; // the datatype
  caseVariants: Cases; // the case variants of the original column
  zodCode: string; // the zod coersion code
  referenceTableVars?: Cases; // for the table name of reference types
};

const zodCodeRecord: Record<PkStrategy, string> = {
  cuid2: "z.coerce.string().cuid2()",
  uuidv7: "z.coerce.string().uuid()",
  uuidv4: "z.coerce.string().uuid()",
  nanoid: "z.coerce.string().nanoid()",
  auto_increment: "z.coerce.number()",
};

export class NextScaffoldProcessor {
  opts: NextScaffoldProcessorOpts;

  dbDialectStrategy: DbDialectStrategy;

  validatedColumns: ValidatedColumn[];

  validatedColumnsWithTimestamps: ValidatedColumn[];

  validatedColumnsWithIdAndTimestamps: ValidatedColumn[];

  constructor(opts: NextScaffoldProcessorOpts) {
    this.opts = opts;
    this.dbDialectStrategy = dialectStrategyFactory(opts.dbDialect);
    this.validatedColumns = this.parseColumns(opts.columns);
    this.validatedColumnsWithTimestamps =
      this.getValidatedColumnsWithTimestamps();
    this.validatedColumnsWithIdAndTimestamps =
      this.getValidatedColumsWithIdAndTimestamps();
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
      zodCode: zodCodeRecord[this.opts.pkStrategy],
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
        zodCode = zodCodeRecord[this.opts.pkStrategy];
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
    log.init(`generate next.js scaffold: ${this.opts.table}`);
    this.addListView();
    this.addDetailView();
    this.addNewView();
    this.addEditView();
    this.addDeleteView();
    this.addActions();
    this.addCreateForm();
    this.addUpdateForm();
    this.addDeleteForm();
    this.addTableComponent();
    this.addQueries();
    if (this.opts.enableCompletionMessage) {
      this.printCompletionMessage();
    }
  }

  generateImportsCodeFromColumns() {
    const dataTypeSet = new Set<string>();
    dataTypeSet.add(
      this.dbDialectStrategy.pkStrategyDataTypes[this.opts.pkStrategy]
    );
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
        referenceImportsCode += `import { ${referenceTableVars.pluralCamelCase} } from "@/schema/${referenceTableVars.pluralKebabCase}";\n`;
        if (this.opts.pkStrategy === "auto_increment") {
          dataTypeSet.add(this.dbDialectStrategy.fkAutoIncrementDataType);
        }
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

    // pk strategy import
    code += `${pkStrategyImportTemplates[this.opts.pkStrategy]}\n`;

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
        fkStrategyTemplate:
          this.dbDialectStrategy.fkStrategyTemplates[this.opts.pkStrategy],
      });
    str += ",";
    return str;
  }

  addListView(): void {
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });
    renderTemplate({
      inputPath: "scaffold-processor/src/app/(admin)/table/page.tsx.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/page.tsx`
      ),
      data: {
        tableObj: tableObj,
      },
    });
  }

  addDetailView(): void {
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });
    const hasFileDataType = this.hasFileDataType();
    renderTemplate({
      inputPath: "scaffold-processor/src/app/(admin)/table/[id]/page.tsx.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/[id]/page.tsx`
      ),
      data: {
        tableObj: tableObj,
        validatedColumns: this.validatedColumnsWithTimestamps,
        hasFileDataType,
        pkStrategyJsType:
          this.dbDialectStrategy.pkStrategyJsType[this.opts.pkStrategy],
      },
    });
  }

  hasFileDataType() {
    return (
      this.validatedColumns.filter((validatedColumn) =>
        validatedColumn.dataType.startsWith("file")
      ).length > 0
    );
  }

  addEditView(): void {
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });
    const referencesColumnList = this.getReferencesColumnList("references_");
    renderTemplate({
      inputPath:
        "scaffold-processor/src/app/(admin)/table/[id]/edit/page.tsx.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/[id]/edit/page.tsx`
      ),
      data: {
        tableObj: tableObj,
        referencesColumnList: referencesColumnList,
        pkStrategyJsType:
          this.dbDialectStrategy.pkStrategyJsType[this.opts.pkStrategy],
      },
    });
  }

  addNewView(): void {
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });
    const referencesColumnList = this.getReferencesColumnList("references_");
    renderTemplate({
      inputPath: "scaffold-processor/src/app/(admin)/table/new/page.tsx.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/new/page.tsx`
      ),
      data: {
        tableObj: tableObj,
        referencesColumnList: referencesColumnList,
      },
    });
  }

  addDeleteView(): void {
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });
    renderTemplate({
      inputPath:
        "scaffold-processor/src/app/(admin)/table/[id]/delete/page.tsx.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/[id]/delete/page.tsx`
      ),
      data: {
        tableObj: tableObj,
        pkStrategyJsType:
          this.dbDialectStrategy.pkStrategyJsType[this.opts.pkStrategy],
      },
    });
  }

  addActions(): void {
    console.log(this.validatedColumnsWithIdAndTimestamps);
    const createColumns = [];
    for (const validatedColumn of this.validatedColumns) {
      const { caseVariants } = validatedColumn;
      createColumns.push(caseVariants.originalCamelCase);
    }

    const updateColumns = [];
    for (const validatedColumn of this.validatedColumnsWithIdAndTimestamps) {
      const { caseVariants } = validatedColumn;
      updateColumns.push(caseVariants.originalCamelCase);
    }

    const uploadColumnNames = this.validatedColumnsWithIdAndTimestamps
      .filter((validatedColumn) => validatedColumn.dataType === "file")
      .map((validatedColumn) =>
        caseFactory(validatedColumn.columnName, {
          pluralize: this.opts.pluralizeEnabled,
        })
      );

    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });

    renderTemplate({
      inputPath: "scaffold-processor/src/app/(admin)/table/actions.ts.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/actions.ts`
      ),
      data: {
        tableObj: tableObj,
        createColumns: createColumns,
        updateColumns: updateColumns,
        uploadColumnNames: uploadColumnNames,
        importFileUtils: uploadColumnNames.length > 0,
        validatedColumns: this.validatedColumns,
        validatedColumnsWithIdAndTimestamps:
          this.validatedColumnsWithIdAndTimestamps,
      },
    });
  }

  addCreateForm(): void {
    const formControlsImports = this.getFormControlsImports();
    const formControlsHtml = this.getFormControlsHtml();
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });
    const referencesColumnList = this.getReferencesColumnList("references_");
    renderTemplate({
      inputPath:
        "scaffold-processor/src/app/(admin)/table/_components/create-form.tsx.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/_components/${tableObj.singularKebabCase}-create-form.tsx`
      ),
      data: {
        tableObj: tableObj,
        formControlsImports: formControlsImports,
        formControls: formControlsHtml,
        referencesColumnList: referencesColumnList,
        hasReferences: referencesColumnList.length > 0,
      },
    });
  }

  getFormControlsHtml(): string {
    let html = "";
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });
    for (const [index, validatedColumn] of this.validatedColumns.entries()) {
      const { dataType } = validatedColumn;
      const dataTypeStrategy =
        this.dbDialectStrategy.dataTypeStrategyMap[dataType];
      html += compileTemplate({
        inputPath: dataTypeStrategy.formTemplate,
        data: { validatedColumn: validatedColumn, tableObj },
      });
      if (index !== this.opts.columns.length - 1) html += "\n";
    }
    return html;
  }

  getFormControlsImports(): string {
    let html = "";
    const formComponentSet = new Set<FormComponent>();
    for (const [
      ,
      validatedColumn,
    ] of this.validatedColumnsWithTimestamps.entries()) {
      const { dataType } = validatedColumn;
      const dataTypeStrategy =
        this.dbDialectStrategy.dataTypeStrategyMap[dataType];
      dataTypeStrategy.formComponents.forEach((component) => {
        formComponentSet.add(component);
      });
    }
    formComponentSet.forEach((component) => {
      html += formComponentImports[component] + "\n";
    });
    return html;
  }

  getReferencesColumnList(startsWith: "references" | "references_") {
    const referencesColumnList = this.validatedColumns
      .filter((validatedColumn) =>
        validatedColumn.dataType.startsWith(startsWith)
      )
      .map((validatedColumn) => validatedColumn);
    return referencesColumnList;
  }

  addUpdateForm(): void {
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });
    const formControlsImports = this.getFormControlsImports();
    const formControlsHtml = this.getUpdateFormControlsHtml();
    const referencesColumnList = this.getReferencesColumnList("references_");
    const hasFileDataType = this.hasFileDataType();
    renderTemplate({
      inputPath:
        "scaffold-processor/src/app/(admin)/table/_components/update-form.tsx.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/_components/${tableObj.singularKebabCase}-update-form.tsx`
      ),
      data: {
        tableObj: tableObj,
        formControlsImports: formControlsImports,
        formControls: formControlsHtml,
        referencesColumnList: referencesColumnList,
        hasFileDataType: hasFileDataType,
      },
    });
  }

  addDeleteForm(): void {
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });
    renderTemplate({
      inputPath:
        "scaffold-processor/src/app/(admin)/table/_components/delete-form.tsx.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/_components/${tableObj.singularKebabCase}-delete-form.tsx`
      ),
      data: {
        tableObj: tableObj,
      },
    });
  }

  addTableComponent(): void {
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });

    renderTemplate({
      inputPath:
        "scaffold-processor/src/app/(admin)/table/_components/table-component.tsx.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/_components/${tableObj.singularKebabCase}-table.tsx`
      ),
      data: {
        tableObj: tableObj,
        validatedColumns: this.validatedColumnsWithTimestamps,
      },
    });
  }

  getUpdateFormControlsHtml(): string {
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });

    let html = "";

    html += compileTemplate({
      inputPath: "scaffold-processor/form-controls/update-input-hidden.tsx.hbs",
      data: { tableObj: tableObj },
    });

    html += "\n";

    for (const [
      index,
      validatedColumn,
    ] of this.validatedColumnsWithTimestamps.entries()) {
      const { dataType } = validatedColumn;

      const dataTypeStrategy =
        this.dbDialectStrategy.dataTypeStrategyMap[dataType];

      const updateFormTemplate = dataTypeStrategy.updateFormTemplate;

      html += compileTemplate({
        inputPath: updateFormTemplate,
        data: { validatedColumn: validatedColumn, tableObj: tableObj },
      });

      if (index !== this.validatedColumnsWithTimestamps.length - 1)
        html += "\n";
    }
    return html;
  }

  printCompletionMessage() {
    log.success("successfully generated next.js scaffold: " + this.opts.table);
  }

  addQueries() {
    const tableObj = caseFactory(this.opts.table, {
      pluralize: this.opts.pluralizeEnabled,
    });
    renderTemplate({
      inputPath:
        "scaffold-processor/src/app/(admin)/table/_queries/get-by-id.ts.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/_queries/get-${tableObj.singularKebabCase}-by-id.query.ts`
      ),
      data: {
        tableObj,
        pkStrategyJsType:
          this.dbDialectStrategy.pkStrategyJsType[this.opts.pkStrategy],
      },
    });
    renderTemplate({
      inputPath:
        "scaffold-processor/src/app/(admin)/table/_queries/get-list.ts.hbs",
      outputPath: this.getOutputPath(
        `app/(admin)/admin/${tableObj.pluralKebabCase}/_queries/get-${tableObj.singularKebabCase}-list.query.ts`
      ),
      data: {
        tableObj,
        pkStrategyJsType:
          this.dbDialectStrategy.pkStrategyJsType[this.opts.pkStrategy],
      },
    });
  }
}

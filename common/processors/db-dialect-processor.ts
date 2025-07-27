import { log } from "../lib/log";
import { BaseProcessor, DbDialectProcessorOpts } from "../types/types";
import { renderTemplate, renderTemplateIfNotExists } from "../lib/utils";

export class DbDialectProcessor implements BaseProcessor {
  opts: DbDialectProcessorOpts;
  dependencies: string[] = [];
  devDependencies: string[] = [];
  constructor(opts: DbDialectProcessorOpts) {
    this.opts = opts;
  }

  private getOutputPath(path: string): string {
    return this.opts.srcDir ? `src/${path}` : path;
  }

  async init(): Promise<void> {
    log.init("initializing db dialect");
    await this.render();
  }

  async render(): Promise<void> {
    renderTemplateIfNotExists({
      inputPath: "db-dialect-processor/env.hbs",
      outputPath: ".env",
    });

    renderTemplateIfNotExists({
      inputPath: "db-dialect-processor/tsconfig.json.hbs",
      outputPath: "tsconfig.json",
    });

    renderTemplate({
      inputPath: "db-dialect-processor/src/config/env.ts.hbs",
      outputPath: this.getOutputPath("config/env.ts"),
    });

    renderTemplate({
      inputPath: "db-dialect-processor/drizzle.config.ts.hbs",
      outputPath: "drizzle.config.ts",
      data: { dialect: this.opts.dbDialect, srcDir: this.opts.srcDir },
    });

    renderTemplateIfNotExists({
      inputPath: `db-dialect-processor/src/db/schema.ts.hbs`,
      outputPath: this.getOutputPath("db/schema.ts"),
    });
  }

  printCompletionMessage() {}
}

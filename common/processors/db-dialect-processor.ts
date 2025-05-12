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

  async init(): Promise<void> {
    log.init("initializing db dialect");
    await this.render();
  }

  async render(): Promise<void> {
    renderTemplate({
      inputPath: "db-dialect-processor/env.hbs",
      outputPath: ".env",
    });

    renderTemplate({
      inputPath: "db-dialect-processor/gitignore.hbs",
      outputPath: ".gitignore",
    });

    renderTemplateIfNotExists({
      inputPath: "db-dialect-processor/tsconfig.json.hbs",
      outputPath: "tsconfig.json",
    });

    renderTemplate({
      inputPath: "db-dialect-processor/src/config/env.ts.hbs",
      outputPath: "src/config/env.ts",
    });

    renderTemplate({
      inputPath: "db-dialect-processor/drizzle.config.ts.hbs",
      outputPath: "drizzle.config.ts",
      data: { dialect: this.opts.dbDialect },
    });

    renderTemplateIfNotExists({
      inputPath: `db-dialect-processor/src/config/schema.ts.hbs`,
      outputPath: "src/config/schema.ts",
    });
  }

  printCompletionMessage() {}
}

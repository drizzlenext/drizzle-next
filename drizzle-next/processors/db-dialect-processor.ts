import { log } from "../../common/lib/log";
import {
  DrizzleNextConfig,
  DrizzleNextProcessor,
} from "../../common/types/types";
import {
  renderTemplate,
  renderTemplateIfNotExists,
} from "../../common/lib/utils";

export class DbDialectProcessor implements DrizzleNextProcessor {
  opts: DrizzleNextConfig;
  dependencies: string[] = [];
  devDependencies: string[] = [];
  constructor(opts: DrizzleNextConfig) {
    this.opts = opts;
  }

  async init(): Promise<void> {
    log.init("initializing db dialect...");
    await this.render();
  }

  async render(): Promise<void> {
    renderTemplate({
      inputPath: "db-dialect-processor/drizzle.config.ts.hbs",
      outputPath: "drizzle.config.ts",
      data: { dialect: this.opts.dbDialect },
    });

    renderTemplateIfNotExists({
      inputPath: `db-dialect-processor/lib/schema.ts.${this.opts.dbDialect}.hbs`,
      outputPath: "lib/schema.ts",
    });
  }

  printCompletionMessage() {}
}

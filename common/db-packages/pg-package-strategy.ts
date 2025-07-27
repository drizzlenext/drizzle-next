import { caseFactory } from "../lib/case-utils";
import { log } from "../lib/log";
import {
  DbDialect,
  DbPackageStrategy,
  DbPackageStrategyOpts,
} from "../types/types";
import { appendToEnvLocal, isNextJsApp, renderTemplate } from "../lib/utils";

export class PgPackageStrategy implements DbPackageStrategy {
  opts: DbPackageStrategyOpts;
  dialect: DbDialect = "postgresql";
  dependencies = ["pg"];
  devDependencies = ["@types/pg"];

  constructor(opts: DbPackageStrategyOpts) {
    this.opts = opts;
  }

  private getOutputPath(path: string): string {
    return this.opts.srcDir ? `src/${path}` : path;
  }

  async init() {
    log.init("initializing pg package");
    await this.render();
  }

  async render(): Promise<void> {
    this.copyMigrateScript();
    this.appendDbUrl();
    this.copyDbInstance();
  }

  copyMigrateScript(): void {
    renderTemplate({
      inputPath: "db-packages/scripts/migrate.ts.hbs",
      outputPath: "scripts/migrate.ts",
      data: {
        migratorImport: `import { migrate } from "drizzle-orm/node-postgres/migrator";`,
      },
    });
  }

  appendDbUrl(): void {
    appendToEnvLocal(
      "DB_URL",
      "postgres://postgres:postgres@localhost:5432/drizzle_demo"
    );
  }

  copyDbInstance(): void {
    renderTemplate({
      inputPath: "db-packages/src/db/db.ts.pg.hbs",
      outputPath: this.getOutputPath("db/db.ts"),
    });
  }

  printCompletionMessage(): void {
    log.checklist("pg checklist");
    log.task("update DB_URL in .env");
    if (isNextJsApp()) {
      log.cmdtask("npx drizzle-kit generate");
      log.cmdtask("npx drizzle-kit migrate");
    }
  }
}

import { caseFactory } from "../lib/case-utils";
import { log } from "../lib/log";
import { DbDialect, DbPackageStrategy, DrizzleNextConfig } from "../lib/types";
import { appendToEnvLocal, renderTemplate } from "../lib/utils";

export class PgPackageStrategy implements DbPackageStrategy {
  opts: DrizzleNextConfig;
  dialect: DbDialect = "postgresql";
  dependencies = ["pg"];
  devDependencies = ["@types/pg"];

  constructor(opts: DrizzleNextConfig) {
    this.opts = opts;
  }

  async init() {
    log.init("initializing pg package...");
    await this.render();
  }

  async render(): Promise<void> {
    this.copyMigrateScript();
    this.appendDbUrl();
    this.copyDbInstance();
    this.copyCreateUserScript();
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
    appendToEnvLocal("DB_URL", "postgres://user:password@host:port/db");
  }

  copyDbInstance(): void {
    renderTemplate({
      inputPath: "db-packages/lib/db.ts.pg.hbs",
      outputPath: "lib/db.ts",
    });
  }

  copyCreateUserScript() {
    if (!this.opts.authEnabled || !this.opts.framework.next) return;
    const tableObj = caseFactory("user", {
      pluralize: this.opts.pluralizeEnabled,
    });
    renderTemplate({
      inputPath: "db-packages/scripts/create-user.ts.hbs",
      outputPath: "scripts/create-user.ts",
      data: {
        tableObj,
      },
    });
  }

  printCompletionMessage(): void {
    log.checklist("pg checklist");
    log.task("update DB_URL in .env");
    log.cmdtask("npx drizzle-kit generate");
    log.cmdtask("npx drizzle-kit migrate");
  }
}

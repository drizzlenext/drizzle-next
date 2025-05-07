import { caseFactory } from "../lib/case-utils";
import { log } from "../lib/log";
import {
  DbDialect,
  DbPackageStrategy,
  DbPackageStrategyOpts,
} from "../types/types";
import {
  appendToEnvLocal,
  appendToFileIfTextNotExists,
  renderTemplate,
} from "../lib/utils";

export class BetterSqlite3PackageStrategy implements DbPackageStrategy {
  opts: DbPackageStrategyOpts;
  dialect: DbDialect = "sqlite";
  dependencies: string[] = ["better-sqlite3"];
  devDependencies: string[] = ["@types/better-sqlite3"];

  constructor(opts: DbPackageStrategyOpts) {
    this.opts = opts;
  }

  async init() {
    log.init("initializing better-sqlite3 package...");
    await this.render();
  }

  async render(): Promise<void> {
    this.copyMigrateScript();
    this.appendDbUrl();
    this.copyDbInstance();
    this.appendSqliteToGitignore();
    this.copyCreateUserScript();
  }

  copyMigrateScript(): void {
    renderTemplate({
      inputPath: "db-packages/scripts/migrate.ts.hbs",
      outputPath: "scripts/migrate.ts",
      data: {
        migratorImport: `import { migrate } from "drizzle-orm/better-sqlite3/migrator";`,
      },
    });
  }

  appendDbUrl(): void {
    appendToEnvLocal("DB_URL", "sqlite.db");
  }

  copyDbInstance(): void {
    renderTemplate({
      inputPath: "db-packages/lib/db.ts.better-sqlite3.hbs",
      outputPath: "lib/db.ts",
    });
  }

  copyCreateUserScript() {
    if (!this.opts.authEnabled) return;
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

  appendSqliteToGitignore() {
    appendToFileIfTextNotExists(".gitignore", "sqlite.db", "sqlite.db");
  }

  printCompletionMessage(): void {
    log.checklist("better-sqlite3 checklist");
    log.cmdtask("npx drizzle-kit generate");
    log.cmdtask("npx drizzle-kit migrate");
  }
}

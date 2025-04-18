import { caseFactory } from "../lib/case-utils";
import { log } from "../lib/log";
import { DbDialect, DbPackageStrategy, DrizzleNextConfig } from "../lib/types";
import {
  appendToEnvLocal,
  insertTextAfterIfNotExists,
  renderTemplate,
} from "../lib/utils";

export class Mysql2PackageStrategy implements DbPackageStrategy {
  opts: DrizzleNextConfig;
  dialect: DbDialect = "mysql";
  dependencies = ["mysql2"];
  devDependencies = [];

  constructor(opts: DrizzleNextConfig) {
    this.opts = opts;
  }

  async init() {
    log.init("initializing mysql2 package...");
    await this.render();
  }

  async render(): Promise<void> {
    this.copyMigrateScript();
    this.appendDbUrl();
    this.copyDbInstance();
    this.copyCreateUserScript();
    this.addServerComponentExternalPackageToNextConfig();
  }

  copyMigrateScript(): void {
    renderTemplate({
      inputPath: "db-packages/scripts/migrate.ts.hbs",
      outputPath: "scripts/migrate.ts",
      data: {
        migratorImport: `import { migrate } from "drizzle-orm/mysql2/migrator";`,
      },
    });
  }

  appendDbUrl(): void {
    appendToEnvLocal("DB_URL", "mysql://user:password@host:port/db");
  }

  copyDbInstance(): void {
    renderTemplate({
      inputPath: "db-packages/lib/db.ts.mysql2.hbs",
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

  /**
   * this is necessary to fix a production build error
   * TypeError: r is not a constructor
   * https://github.com/sidorares/node-mysql2/issues/1885
   */
  addServerComponentExternalPackageToNextConfig() {
    const text = `\n  serverExternalPackages: ["mysql2"],`;
    insertTextAfterIfNotExists(
      "next.config.ts",
      "const nextConfig: NextConfig = {",
      text
    );
  }

  printCompletionMessage(): void {
    log.checklist("mysql2 checklist");
    log.task("update DB_URL in .env");
    log.cmdtask("npx drizzle-kit generate");
    log.cmdtask("npx drizzle-kit migrate");
  }
}

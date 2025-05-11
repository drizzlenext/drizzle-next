import { caseFactory } from "../lib/case-utils";
import { log } from "../lib/log";
import {
  DbDialect,
  DbPackageStrategy,
  DbPackageStrategyOpts,
} from "../../common/types/types";
import {
  appendToEnvLocal,
  insertTextAfterIfNotExists,
  isNextJsApp,
  renderTemplate,
} from "../lib/utils";

export class Mysql2PackageStrategy implements DbPackageStrategy {
  opts: DbPackageStrategyOpts;
  dialect: DbDialect = "mysql";
  dependencies = ["mysql2"];
  devDependencies = [];

  constructor(opts: DbPackageStrategyOpts) {
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
    appendToEnvLocal(
      "DB_URL",
      "mysql://root:password@localhost:3306/drizzle_demo"
    );
  }

  copyDbInstance(): void {
    renderTemplate({
      inputPath: "db-packages/src/config/db.ts.mysql2.hbs",
      outputPath: "src/config/db.ts",
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

  /**
   * this is necessary to fix a production build error
   * TypeError: r is not a constructor
   * https://github.com/sidorares/node-mysql2/issues/1885
   */
  addServerComponentExternalPackageToNextConfig() {
    const text = `\n  serverExternalPackages: ["mysql2"],`;
    // only needed for drizzle-next. silently fails for drizzle-express.
    try {
      insertTextAfterIfNotExists(
        "next.config.ts",
        "const nextConfig: NextConfig = {",
        text
      );
    } catch (error) {
      // do nothing
    }
  }

  printCompletionMessage(): void {
    log.checklist("mysql2 checklist");
    log.task("update DB_URL in .env");
    if (isNextJsApp()) {
      log.cmdtask("npx drizzle-kit generate");
      log.cmdtask("npx drizzle-kit migrate");
    }
  }
}

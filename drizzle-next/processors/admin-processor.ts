import { log } from "../../common/lib/log";
import { dialectStrategyFactory } from "../../common/lib/strategy-factory";
import {
  DbDialect,
  DbDialectStrategy,
  DrizzleNextConfig,
  DrizzleNextProcessor,
} from "../../common/types/types";
import { renderTemplate } from "../lib/utils";
import { NextScaffoldProcessor } from "./next-scaffold-processor";

export class AdminProcessor implements DrizzleNextProcessor {
  opts: DrizzleNextConfig;
  dependencies: string[] = [];
  devDependencies: string[] = [];
  dbDialectStrategy: DbDialectStrategy;

  constructor(opts: DrizzleNextConfig) {
    this.dbDialectStrategy = dialectStrategyFactory(opts.dbDialect);
    this.opts = opts;
  }

  private getOutputPath(path: string): string {
    return this.opts.srcDir ? `src/${path}` : path;
  }

  async init(): Promise<void> {
    log.init("initializing admin");
    await this.render();
  }

  async render(): Promise<void> {
    renderTemplate({
      inputPath: "admin-processor/src/app/(admin)/layout.tsx.hbs",
      outputPath: this.getOutputPath("app/(admin)/layout.tsx"),
    });
    renderTemplate({
      inputPath: "admin-processor/src/app/(auth)/admin-signin/page.tsx.hbs",
      outputPath: this.getOutputPath("app/(auth)/admin-signin/page.tsx"),
    });
    renderTemplate({
      inputPath: `admin-processor/scripts/grant-admin.ts.hbs`,
      outputPath: "scripts/grant-admin.ts",
    });
    renderTemplate({
      inputPath: "admin-processor/src/app/(admin)/admin/settings/page.tsx.hbs",
      outputPath: this.getOutputPath("app/(admin)/admin/settings/page.tsx"),
    });
    renderTemplate({
      inputPath:
        "admin-processor/src/app/(auth)/_components/admin-signin-form.tsx.hbs",
      outputPath: this.getOutputPath(
        "app/(auth)/_components/admin-signin-form.tsx"
      ),
    });
    renderTemplate({
      inputPath:
        "admin-processor/src/app/(auth)/_actions/admin-signin.action.ts.hbs",
      outputPath: this.getOutputPath(
        "app/(auth)/_actions/admin-signin.action.ts"
      ),
    });
    renderTemplate({
      inputPath: "admin-processor/scripts/create-password-hash.ts.hbs",
      outputPath: "scripts/create-password-hash.ts",
    });
    renderTemplate({
      inputPath: "admin-processor/src/app/(admin)/admin/page.tsx.hbs",
      outputPath: this.getOutputPath("app/(admin)/admin/page.tsx"),
    });
    renderTemplate({
      inputPath:
        "admin-processor/src/app/(admin)/_components/admin-layout.tsx.hbs",
      outputPath: this.getOutputPath(
        "app/(admin)/_components/admin-layout.tsx"
      ),
    });

    const strategies: Record<DbDialect, string[]> = {
      postgresql: [
        "name:text",
        "email:text",
        "email_verified:timestamp",
        "image:text",
        "role:text",
        "password:text",
      ],
      mysql: [
        "name:varchar",
        "email:varchar",
        "email_verified:timestamp",
        "image:varchar",
        "role:text",
        "password:varchar",
      ],
      sqlite: [
        "name:text",
        "email:text",
        "email_verified:timestamp",
        "image:text",
        "role:text",
        "password:text",
      ],
    };

    const userScaffold = new NextScaffoldProcessor({
      ...this.opts,
      columns: strategies[this.opts.dbDialect],
      table: "users",
      enableCompletionMessage: false,
      pluralizeEnabled: true,
    });

    userScaffold.process();
  }

  printCompletionMessage() {
    log.checklist("admin checklist");
    log.task("grant admin role");
    log.cmdsubtask("npx tsx scripts/grant-admin.ts test@example.com");
  }
}

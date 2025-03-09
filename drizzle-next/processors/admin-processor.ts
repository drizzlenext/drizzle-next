import { log } from "../lib/log";
import { dialectStrategyFactory } from "../lib/strategy-factory";
import {
  DbDialect,
  DbDialectStrategy,
  DrizzleNextConfig,
  DrizzleNextProcessor,
} from "../lib/types";
import { renderTemplate } from "../lib/utils";
import { ScaffoldProcessor } from "./scaffold-processor";
import { caseFactory } from "../lib/case-utils";

export class AdminProcessor implements DrizzleNextProcessor {
  opts: DrizzleNextConfig;
  dependencies: string[] = [];
  devDependencies: string[] = [];
  dbDialectStrategy: DbDialectStrategy;

  constructor(opts: DrizzleNextConfig) {
    this.dbDialectStrategy = dialectStrategyFactory(opts.dbDialect);
    this.opts = opts;
  }

  async init(): Promise<void> {
    log.init("initializing admin...");
    await this.render();
  }

  async render(): Promise<void> {
    const userObj = caseFactory("user", {
      pluralize: this.opts.pluralizeEnabled,
    });
    renderTemplate({
      inputPath: "admin-processor/app/(admin)/layout.tsx.hbs",
      outputPath: "app/(admin)/layout.tsx",
      data: { userObj },
    });
    renderTemplate({
      inputPath: "admin-processor/app/(auth)/admin-signin/page.tsx.hbs",
      outputPath: "app/(auth)/admin-signin/page.tsx",
    });
    renderTemplate({
      inputPath: `admin-processor/scripts/grant-admin.ts.hbs`,
      outputPath: "scripts/grant-admin.ts",
      data: {
        userObj,
      },
    });
    renderTemplate({
      inputPath: "admin-processor/app/(admin)/admin/settings/page.tsx.hbs",
      outputPath: "app/(admin)/admin/settings/page.tsx",
    });
    renderTemplate({
      inputPath: "admin-processor/components/auth/admin-signin-form.tsx.hbs",
      outputPath: "components/auth/admin-signin-form.tsx",
    });
    renderTemplate({
      inputPath: "admin-processor/services/auth/admin-signin-action.ts.hbs",
      outputPath: "services/auth/admin-signin-action.ts",
      data: {
        userObj,
      },
    });
    renderTemplate({
      inputPath: "admin-processor/scripts/create-password-hash.ts.hbs",
      outputPath: "scripts/create-password-hash.ts",
    });

    this.renderDrizzleAdmin();

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

    const userScaffold = new ScaffoldProcessor({
      ...this.opts,
      columns: strategies[this.opts.dbDialect],
      table: this.opts.pluralizeEnabled ? "users" : "user",
      enableCompletionMessage: false,
      enableUiScaffold: true,
      enableDbScaffold: false,
    });

    userScaffold.process();
  }

  renderDrizzleAdmin() {
    const userObj = caseFactory("user", {
      pluralize: this.opts.pluralizeEnabled,
    });
    renderTemplate({
      inputPath:
        "admin-processor/app/(admin)/_components/users-components.tsx.hbs",
      outputPath: "app/(admin)/_components/users-components.tsx",
      data: {
        userObj: userObj,
      },
    });
    renderTemplate({
      inputPath: "admin-processor/app/(admin)/_layouts/admin-layout.tsx.hbs",
      outputPath: "app/(admin)/_layouts/admin-layout.tsx",
    });
    renderTemplate({
      inputPath: "admin-processor/app/(admin)/_tables/users-table.tsx.hbs",
      outputPath: "/app/(admin)/_tables/users-table.tsx",
      data: {
        userObj: userObj,
      },
    });
    renderTemplate({
      inputPath: "admin-processor/app/(admin)/admin/[...segments]/page.tsx.hbs",
      outputPath: "app/(admin)/admin/[...segments]/page.tsx",
    });
    renderTemplate({
      inputPath: "admin-processor/app/(admin)/api/[...segments]/route.ts.hbs",
      outputPath: "app/(admin)/api/[...segments]/route.ts",
    });
    renderTemplate({
      inputPath: "admin-processor/app/(admin)/drizzle-admin.config.ts.hbs",
      outputPath: "app/(admin)/drizzle-admin.config.ts",
      data: {
        dbDialect: this.opts.dbDialect,
      },
    });
  }

  printCompletionMessage() {
    log.checklist("admin checklist");
    log.task("grant admin privilege");
    log.cmdsubtask("npx tsx scripts/grant-admin.ts user@example.com");
  }
}

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

export class AdminProcessor implements DrizzleNextProcessor {
  opts: DrizzleNextConfig;
  dependencies: string[] = ["drizzle-admin"];
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
    renderTemplate({
      inputPath: "admin-processor/app/(admin)/layout.tsx.hbs",
      outputPath: "app/(admin)/layout.tsx",
    });
    renderTemplate({
      inputPath: "admin-processor/app/(auth)/admin-signin/page.tsx.hbs",
      outputPath: "app/(auth)/admin-signin/page.tsx",
    });
    renderTemplate({
      inputPath: `admin-processor/scripts/grant-admin.ts.hbs`,
      outputPath: "scripts/grant-admin.ts",
    });
    renderTemplate({
      inputPath: "admin-processor/app/(admin)/admin/settings/page.tsx.hbs",
      outputPath: "app/(admin)/admin/settings/page.tsx",
    });
    renderTemplate({
      inputPath:
        "admin-processor/app/(auth)/_components/admin-signin-form.tsx.hbs",
      outputPath: "app/(auth)/_components/admin-signin-form.tsx",
    });
    renderTemplate({
      inputPath: "admin-processor/app/(auth)/_lib/admin-signin-action.ts.hbs",
      outputPath: "app/(auth)/_lib/admin-signin-action.ts",
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
      table: "users",
      enableCompletionMessage: false,
      enableNextScaffold: true,
      enableDrizzleScaffold: false,
      enableExpressScaffold: false,
      pluralizeEnabled: true,
    });

    userScaffold.process();
  }

  renderDrizzleAdmin() {
    renderTemplate({
      inputPath: `admin-processor/app/(admin)/_components/users-components.tsx.hbs`,
      outputPath: `app/(admin)/_components/users-components.tsx`,
    });
    renderTemplate({
      inputPath: "admin-processor/app/(admin)/_components/admin-layout.tsx.hbs",
      outputPath: "app/(admin)/_components/admin-layout.tsx",
    });
    renderTemplate({
      inputPath: `admin-processor/app/(admin)/_lib/users-table.config.ts.hbs`,
      outputPath: `/app/(admin)/_lib/users-table.config.ts`,
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
      inputPath: "admin-processor/app/(admin)/_lib/drizzle-admin.config.ts.hbs",
      outputPath: "app/(admin)/_lib/drizzle-admin.config.ts",
      data: {
        dbDialect: this.opts.dbDialect,
      },
    });
    renderTemplate({
      inputPath: "admin-processor/app/(admin)/admin/page.tsx.hbs",
      outputPath: "app/(admin)/admin/page.tsx",
    });
  }

  printCompletionMessage() {
    log.checklist("admin checklist");
    log.task("grant admin role");
    log.cmdsubtask("npx tsx scripts/grant-admin.ts test@example.com");
  }
}

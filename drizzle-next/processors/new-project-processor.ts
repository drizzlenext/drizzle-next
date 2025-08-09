import { log } from "../../common/lib/log";
import {
  DbDialect,
  DbDialectStrategy,
  DrizzleNextConfig,
  DrizzleNextProcessor,
} from "../../common/types/types";
import {
  appendToEnvLocal,
  appendToFileIfTextNotExists,
  insertSchemaToSchemaIndex,
  installDependencies,
  installDevDependencies,
  writeDrizzleNextConfig,
} from "../../common/lib/utils";
import { renderTemplate, renderTemplateIfNotExists } from "../lib/utils";
import { NextScaffoldProcessor } from "./next-scaffold-processor";
import { dialectStrategyFactory } from "../../common/lib/strategy-factory";

export class NewProjectProcessor implements DrizzleNextProcessor {
  opts: DrizzleNextConfig;

  dependencies = [];

  devDependencies = [];

  dbDialectStrategy: DbDialectStrategy;

  constructor(opts: DrizzleNextConfig) {
    this.opts = opts;
    this.dbDialectStrategy = dialectStrategyFactory(this.opts.dbDialect);
  }

  private getOutputPath(path: string): string {
    return this.opts.srcDir ? `src/${path}` : path;
  }

  async init() {
    log.init("initializing new project");
    await this.render();
  }

  async install() {
    if (!this.opts.install) {
      return;
    }

    // installation logic
    await installDependencies({
      dependencies: ["lucide-react", "clsx", "tailwind-merge", "mime"],
      packageManager: this.opts.packageManager,
      latest: this.opts.latest,
    });

    await installDependencies({
      dependencies: ["drizzle-orm", "dotenv", "zod"],
      packageManager: this.opts.packageManager,
      latest: this.opts.latest,
    });

    await installDependencies({
      dependencies: ["jsonwebtoken", "bcrypt"],
      packageManager: this.opts.packageManager,
      latest: this.opts.latest,
    });

    await installDevDependencies({
      devDependencies: ["drizzle-kit", "@types/jsonwebtoken"],
      packageManager: this.opts.packageManager,
      latest: this.opts.latest,
    });
  }

  async render() {
    writeDrizzleNextConfig(this.opts);

    this.renderNext();
    this.renderDrizzleUI();
    this.renderAuthTemplates();
    this.addAdminTemplates();
    this.addUserSchema();
    this.addUserScaffold();

    appendToEnvLocal("JWT_SECRET", "secret");
  }

  addUserSchema() {
    const userSchemaStrategy: Record<DbDialect, string> = {
      postgresql: "new-project-processor/src/db/schema/users.ts.postgresql.hbs",
      mysql: "new-project-processor/src/db/schema/users.ts.mysql.hbs",
      sqlite: "new-project-processor/src/db/schema/users.ts.sqlite.hbs",
    };
    const dataTypeImportsRecord: Record<DbDialect, Set<string>> = {
      postgresql: new Set(["timestamp", "text", "uuid"]),
      mysql: new Set(["timestamp", "varchar"]),
      sqlite: new Set(["integer", "text"]),
    };

    const dataTypeImports = dataTypeImportsRecord[this.opts.dbDialect];

    let dataTypeImportsCode = "";
    for (const dataType of dataTypeImports) {
      dataTypeImportsCode += "  " + dataType + ",\n";
    }
    renderTemplate({
      inputPath: userSchemaStrategy[this.opts.dbDialect],
      outputPath: this.getOutputPath("db/schema/users.ts"),
      data: {
        dataTypeImports: dataTypeImportsCode,
        createdAtTemplate: this.dbDialectStrategy.createdAtTemplate,
        updatedAtTemplate: this.dbDialectStrategy.updatedAtTemplate,
        pkDataType: this.dbDialectStrategy.pkDataType,
        pkFunctionTemplate: this.dbDialectStrategy.pkFunctionTemplate,
      },
    });

    insertSchemaToSchemaIndex("users", {
      pluralize: true,
      srcDir: this.opts.srcDir,
    });
  }

  addAdminTemplates() {
    renderTemplate({
      inputPath: "new-project-processor/src/app/(admin)/layout.tsx.hbs",
      outputPath: this.getOutputPath("app/(admin)/layout.tsx"),
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/app/(auth)/admin-signin/page.tsx.hbs",
      outputPath: this.getOutputPath("app/(auth)/admin-signin/page.tsx"),
    });
    renderTemplate({
      inputPath: `new-project-processor/scripts/grant-admin.ts.hbs`,
      outputPath: "scripts/grant-admin.ts",
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/app/(admin)/admin/settings/page.tsx.hbs",
      outputPath: this.getOutputPath("app/(admin)/admin/settings/page.tsx"),
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/components/auth/admin-signin-form.tsx.hbs",
      outputPath: this.getOutputPath("components/auth/admin-signin-form.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/scripts/create-password-hash.ts.hbs",
      outputPath: "scripts/create-password-hash.ts",
    });
    renderTemplate({
      inputPath: "new-project-processor/src/app/(admin)/admin/page.tsx.hbs",
      outputPath: this.getOutputPath("app/(admin)/admin/page.tsx"),
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/components/layouts/admin-layout.tsx.hbs",
      outputPath: this.getOutputPath("components/layouts/admin-layout.tsx"),
    });
  }

  addUserScaffold() {
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

  renderAuthTemplates() {
    renderTemplate({
      inputPath: "new-project-processor/src/app/(private)/layout.tsx.hbs",
      outputPath: this.getOutputPath("app/(private)/layout.tsx"),
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/components/layouts/private-layout.tsx.hbs",
      outputPath: this.getOutputPath("components/layouts/private-layout.tsx"),
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/app/(private)/dashboard/page.tsx.hbs",
      outputPath: this.getOutputPath("app/(private)/dashboard/page.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/app/(auth)/signin/page.tsx.hbs",
      outputPath: this.getOutputPath("app/(auth)/signin/page.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/app/(private)/profile/page.tsx.hbs",
      outputPath: this.getOutputPath("app/(private)/profile/page.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/app/(auth)/signout/page.tsx.hbs",
      outputPath: this.getOutputPath("app/(auth)/signout/page.tsx"),
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/components/auth/signin-form.tsx.hbs",
      outputPath: this.getOutputPath("components/auth/signin-form.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/actions/auth/signin-action.ts.hbs",
      outputPath: this.getOutputPath("actions/auth/signin-action.ts"),
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/actions/auth/admin-signin-action.ts.hbs",
      outputPath: this.getOutputPath("actions/auth/admin-signin-action.ts"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/actions/auth/signout-action.ts.hbs",
      outputPath: this.getOutputPath("actions/auth/signout-action.ts"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/app/(auth)/layout.tsx.hbs",
      outputPath: this.getOutputPath("app/(auth)/layout.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/scripts/create-user.ts.hbs",
      outputPath: "scripts/create-user.ts",
    });
    renderTemplate({
      inputPath: "new-project-processor/src/lib/auth.ts.hbs",
      outputPath: this.getOutputPath("lib/auth.ts"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/lib/jwt.ts.hbs",
      outputPath: this.getOutputPath("lib/jwt.ts"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/lib/session.ts.hbs",
      outputPath: this.getOutputPath("lib/session.ts"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/lib/password.ts.hbs",
      outputPath: this.getOutputPath("lib/password.ts"),
    });
  }

  renderNext() {
    renderTemplate({
      inputPath: "new-project-processor/src/lib/env.ts.hbs",
      outputPath: this.getOutputPath("lib/env.ts"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/app/layout.tsx.hbs",
      outputPath: this.getOutputPath("app/layout.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/app/page.tsx.hbs",
      outputPath: this.getOutputPath("app/page.tsx"),
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/components/layouts/public-layout.tsx.hbs",
      outputPath: this.getOutputPath("components/layouts/public-layout.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/app/(public)/layout.tsx.hbs",
      outputPath: this.getOutputPath("app/(public)/layout.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/lib/upload.ts.hbs",
      outputPath: this.getOutputPath("lib/upload.ts"),
    });
    renderTemplate({
      inputPath: "new-project-processor/eslint.config.mjs.hbs",
      outputPath: "eslint.config.mjs",
    });
    renderTemplate({
      inputPath: "new-project-processor/src/lib/search-params.ts.hbs",
      outputPath: this.getOutputPath("lib/search-params.ts"),
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/app/uploads/[...segments]/route.ts.hbs",
      outputPath: this.getOutputPath("app/uploads/[...segments]/route.ts"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/lib/id.ts.hbs",
      outputPath: this.getOutputPath("lib/id.ts"),
    });

    appendToFileIfTextNotExists(".gitignore", "/uploads", "/uploads");

    appendToEnvLocal(
      "NEXT_PUBLIC_UPLOAD_BASE_URL",
      "http://localhost:3000/uploads"
    );
  }

  renderDrizzleUI() {
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/alert.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/alert.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/avatar.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/avatar.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/button.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/button.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/card.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/card.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/checkbox.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/checkbox.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/dark-mode.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/dark-mode.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/form.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/form.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/input.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/input.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/label.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/label.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/pagination.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/pagination.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/search-input.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/search-input.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/select.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/select.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/sortable.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/sortable.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/table.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/table.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/textarea.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/textarea.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/lib/utils.ts.hbs",
      outputPath: this.getOutputPath("lib/utils.ts"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/styles/styles.css.hbs",
      outputPath: this.getOutputPath("app/globals.css"),
    });
  }

  printCompletionMessage() {}
}

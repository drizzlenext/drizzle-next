#!/usr/bin/env node

import { Command } from "commander";
import { log } from "./lib/log";
import {
  AuthorizationLevel,
  AuthProvider,
  DbPackage,
  PackageManager,
  PkStrategy,
  SessionStrategy,
  ShadrizConfigFile,
} from "./lib/types";
import { ScaffoldProcessor } from "./processors/scaffold-processor";
import { checkbox, select, confirm } from "@inquirer/prompts";
import {
  loadShadrizConfig,
  regenerateSchemaIndex,
  spawnCommand,
  writeToFile,
} from "./lib/utils";
import {
  dialectStrategyFactory,
  packageStrategyFactory,
} from "./lib/strategy-factory";
import { AuthProcessor } from "./processors/auth-processor";
import { NewProjectProcessor } from "./processors/new-project-processor";
import { DarkModeProcessor } from "./processors/dark-mode-processor";
import { StripeProcessor } from "./processors/stripe-processor";
import { AdminProcessor } from "./processors/admin-processor";
import fs from "fs";

const VERSION = "1.2.0";

const program = new Command();

program
  .name("shadriz")
  .description(
    "shadriz - full stack framework next.js shadcn/ui and drizzle orm"
  )
  .version(VERSION);

program
  .command("new")
  .description(
    "initialize a new next.js project using recommended settings for shadriz"
  )
  .argument("<name>", "name of project")
  .option("--pnpm", "run with pnpm", false)
  .action(async (name, options) => {
    try {
      if (options.pnpm) {
        await spawnCommand(
          `pnpm create next-app ${name} --typescript --eslint --tailwind --app --no-src-dir --no-import-alias`
        );
      } else {
        await spawnCommand(
          `npx create-next-app ${name} --typescript --eslint --tailwind --app --no-src-dir --no-import-alias`
        );
      }
    } catch (error) {}
  });

program
  .command("init")
  .description("initialize project")
  .option("--no-install", "skip installation of dependencies")
  .action(async (options) => {
    try {
      let authProcessor;
      let stripeProcessor;
      let stripeEnabled = false;
      let authProviders: AuthProvider[] = [];
      let sessionStrategy: SessionStrategy;
      let pkStrategy: PkStrategy;
      let adminEnabled;
      let adminProcessor;
      let latest = false;
      let packageManager: PackageManager = await select({
        message: "Which package manager do you want to use?",
        choices: [{ value: "npm" }, { value: "pnpm" }],
      });

      if (options.install) {
        latest = await select({
          message:
            "Do you want to install latest dependencies or pinned dependencies?",
          choices: [
            {
              name: "pinned",
              value: false,
              description: "Installs pinned dependencies. More stable.",
            },
            {
              name: "latest",
              value: true,
              description:
                "Installs latest dependencies. Cutting edge. Less stable.",
            },
          ],
        });
      }
      const dbPackage: DbPackage = await select({
        message: "Which database library would you like to use?",
        choices: [
          { name: "better-sqlite3", value: "better-sqlite3" },
          { name: "pg", value: "pg" },
          { name: "mysql2", value: "mysql2" },
        ],
      });
      const authEnabled = await confirm({
        message: "Do you want to use Auth.js for authentication?",
        default: true,
      });
      if (authEnabled) {
        pkStrategy = await select({
          message:
            "Which primary key generation strategy would you like to use?",
          choices: [
            {
              name: "uuidv7",
              value: "uuidv7",
              description: "Uses uuidv7 package",
            },
            {
              name: "uuidv4",
              value: "uuidv4",
              description: "Uses crypto.randomUUID",
            },
            {
              name: "uuid",
              value: "uuid",
              description:
                "Uses the database's built-in uuid function for mysql and postgresql. sqlite will fallback to uuidv4.",
            },
          ],
        });
        authProviders = await checkbox({
          message: "Which auth providers would you like to use?",
          choices: [
            { name: "github", value: "github" },
            { name: "google", value: "google" },
            { name: "credentials", value: "credentials" },
            { name: "postmark", value: "postmark" },
            { name: "nodemailer", value: "nodemailer" },
          ],
        });
        sessionStrategy = await select({
          message: "Which session strategy would you like to use?",
          choices: [
            { name: "jwt", value: "jwt" },
            { name: "database", value: "database" },
          ],
        });
        if (
          authProviders.includes("credentials") &&
          sessionStrategy !== "jwt"
        ) {
          log.bgRed("jwt is required if credentials is selected");
          process.exit(1);
        }
        adminEnabled = await confirm({
          message:
            "Do you want to add an admin dashboard with role-based authorization?",
          default: true,
        });
        if (adminEnabled && !authProviders.includes("credentials")) {
          log.bgRed("credentials provider is required for admin dashboard");
          process.exit(1);
        }
        stripeEnabled = await confirm({
          message: "Do you want to enable Stripe for payments?",
        });
      }
      const darkModeEnabled = await confirm({
        message: "Do you want to add a dark mode toggle?",
        default: true,
      });
      const timestampsEnabled = await confirm({
        message: "Do you want to add created_at and updated_at timestamps?",
        default: true,
      });
      const newProjectProcessor = new NewProjectProcessor({
        packageManager: packageManager,
        install: options.install,
        latest: latest,
        darkMode: darkModeEnabled,
        authEnabled: authEnabled,
        stripeEnabled: stripeEnabled,
      });
      const dbPackageStrategy = packageStrategyFactory(dbPackage, {
        packageManager: packageManager,
        install: options.install,
        latest: latest,
      });
      const dbDialectStrategy = dialectStrategyFactory(
        dbPackageStrategy.dialect
      );
      if (authEnabled) {
        authProcessor = new AuthProcessor({
          packageManager: packageManager,
          providers: authProviders,
          sessionStrategy: sessionStrategy!,
          install: options.install,
          latest: latest,
          stripeEnabled: stripeEnabled,
          pkStrategy: pkStrategy!,
          dbDialectStrategy: dbDialectStrategy,
        });
      }
      if (adminEnabled) {
        adminProcessor = new AdminProcessor({
          packageManager: packageManager,
          install: options.install,
          latest: latest,
        });
      }
      if (stripeEnabled) {
        stripeProcessor = new StripeProcessor({
          dbDialectStrategy: dbDialectStrategy,
          packageManager: packageManager,
          install: options.install,
          latest: latest,
          pkStrategy: pkStrategy!,
        });
      }
      await newProjectProcessor.init();
      await dbPackageStrategy.init();
      dbDialectStrategy.init();
      if (darkModeEnabled) {
        const darkModeProcessor = new DarkModeProcessor({
          packageManager: packageManager,
          install: options.install,
          latest: latest,
        });
        await darkModeProcessor.init();
      }
      const shadrizConfig: ShadrizConfigFile = {
        version: VERSION,
        latest: latest,
        authEnabled: authEnabled,
        stripeEnabled: stripeEnabled,
        authProviders: authProviders,
        sessionStrategy: sessionStrategy!,
        pkStrategy: pkStrategy!,
        adminEnabled: adminEnabled || false,
        dbPackage: dbPackage,
        dbDialect: dbDialectStrategy.dialect,
        darkModeEnabled: darkModeEnabled,
        timestampsEnabled: timestampsEnabled,
      };
      writeToFile(
        "shadriz.config.json",
        JSON.stringify(shadrizConfig, null, 2)
      );
      if (authProcessor) {
        await authProcessor.init();

        if (adminProcessor) {
          await adminProcessor.init();
        }

        if (stripeProcessor) {
          await stripeProcessor.init();
        }

        regenerateSchemaIndex();
        authProcessor.printCompletionMessage();
        if (adminProcessor) {
          adminProcessor.printCompletionMessage();
        }
        if (stripeProcessor) {
          stripeProcessor.printCompletionMessage();
        }
      } else {
        regenerateSchemaIndex();
      }
    } catch (error) {
      log.bgRed(`${error}`);
    }
  });

program
  .command("scaffold")
  .summary("scaffold crud ui, db schema, migration, and actions")
  .description(
    `Generate CRUD ui, db schema, db migration, and server actions for a table

# postgresql uuid primary key examples:
scaffold post -d postgresql -c id:uuid:pk:default-uuidv7 title:text created_at:timestamp:default-now
scaffold post -d postgresql -c id:uuid:pk:default-uuidv4 title:text created_at:timestamp:default-now

# postgresql auto increment primary key examples:
scaffold post -d postgresql -c id:bigserial:pk title:text created_at:timestamp:default-now
scaffold post -d postgresql -c id:serial:pk title:text created_at:timestamp:default-now

# postgresql foreign key examples:
scaffold post -d postgresql -c id:bigserial:pk title:text
scaffold comment -d postgresql -c id:bigserial:pk post_id:bigint:fk-post.id content:text

# mysql uuid primary key examples:
scaffold post -d mysql -c id:varchar:pk:default-uuidv7 title:varchar created_at:timestamp:default-now
scaffold post -d mysql -c id:varchar:pk:default-uuidv4 title:varchar created_at:timestamp:default-now

# mysql auto increment primary key examples:
scaffold post -d mysql -c id:serial:pk title:varchar created_at:timestamp:default-now
scaffold post -d mysql -c id:integer:pk-auto title:varchar created_at:timestamp:default-now

# mysql foreign key examples:
scaffold post -d mysql -c id:serial:pk title:varchar
scaffold comment -d mysql -c id:serial:pk post_id:bigint:fk-post.id content:text

# sqlite uuid primary key examples:
scaffold post -d sqlite -c id:text:pk:default-uuidv7 title:text created_at:text:default-now
scaffold post -d sqlite -c id:text:pk:default-uuidv4 title:text created_at:text:default-now

# sqlite auto increment primary key examples:
scaffold post -d sqlite -c id:integer:pk-auto title:text created_at:text:default-now

# sqlite foreign key examples:
scaffold post -d sqlite -c id:integer:pk-auto title:text
scaffold post -d sqlite -c id:integer:pk-auto post_id:integer:fk-post.id content:text
`
  )
  .argument("<table>", "table: post, product, order, etc")
  .requiredOption(
    "-c, --columns <columns...>",
    "column_name:data_type:constraint1,constraint2"
  )
  .action(async (table, options) => {
    const shadrizConfig: ShadrizConfigFile = loadShadrizConfig();
    let authorizationLevel: AuthorizationLevel = "public";
    if (shadrizConfig.authEnabled && shadrizConfig.adminEnabled) {
      authorizationLevel = await select({
        message:
          "Which authorization level would you like to use for this scaffold?",
        choices: [
          {
            value: "admin",
            description:
              "Requires authentication and administrative privileges.",
          },
          {
            value: "private",
            description: "Requires user authentication.",
          },
          {
            value: "public",
            description: "Accessible by anyone without authentication.",
          },
        ],
      });
    } else if (shadrizConfig.authEnabled) {
      authorizationLevel = await select({
        message:
          "Which authorization level would you like to use for this scaffold?",
        choices: [
          {
            value: "private",
            description: "Requires user authentication.",
          },
          {
            value: "public",
            description: "Accessible by anyone without authentication.",
          },
        ],
      });
    }

    if (authorizationLevel === "admin" && !fs.existsSync("app/(admin)")) {
      log.bgRed(
        "(admin) route group not found. authorization must be enabled."
      );
      process.exit(1);
    }
    if (authorizationLevel === "private" && !fs.existsSync("app/(private)")) {
      log.bgRed("(private) route group not found. auth must be enabled.");
      process.exit(1);
    }

    const dialectStrategy = dialectStrategyFactory(shadrizConfig.dbDialect);
    const scaffoldProcessor = new ScaffoldProcessor({
      table: table,
      columns: options.columns,
      dbDialectStrategy: dialectStrategy,
      authorizationLevel: authorizationLevel,
      pkStrategy: shadrizConfig.pkStrategy || "uuidv7",
      timestampsEnabled: shadrizConfig.timestampsEnabled ?? true,
    });
    scaffoldProcessor.process();
  });

program.parse();

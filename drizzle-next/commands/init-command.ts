import { Command, Option } from "commander";
import { log } from "../../common/lib/log";
import {
  DrizzleNextConfig,
  DrizzleNextProcessor,
} from "../../common/types/types";
import { select, confirm } from "@inquirer/prompts";
import {
  completeDrizzleNextConfig,
  installDependencies,
  installDevDependencies,
  preflightChecks,
} from "../../common/lib/utils";
import { packageStrategyFactory } from "../../common/lib/strategy-factory";
import { AuthProcessor, authStrategyMap } from "../processors/auth-processor";
import { NewProjectProcessor } from "../processors/new-project-processor";
import { AdminProcessor } from "../processors/admin-processor";
import { DbDialectProcessor } from "../processors/db-dialect-processor";
import packageJson from "../package.json";
import { pkDependencies } from "../../common/lib/pk-strategy";

export const initCommand = new Command("init");

const VERSION = packageJson["version"];

initCommand
  .description("initialize next.js project for development with drizzle-next")
  .addOption(
    new Option("--framework <framework>", "framework to scaffold").choices([
      "next",
      "express",
      "drizzle",
      "all",
    ])
  )
  .addOption(
    new Option(
      "--package-manager <manager>",
      "package manager for this project"
    ).choices(["npm", "pnpm", "bun"])
  )
  .addOption(
    new Option("--db-dialect <dialect>", "database dialect").choices([
      "sqlite",
      "postgresql",
      "mysql",
    ])
  )
  .addOption(
    new Option(
      "--pk-strategy <strategy>",
      "primary key generation strategy"
    ).choices(["cuid2", "uuidv4", "uuidv7", "nanoid", "auto_increment"])
  )
  .option("--auth", "install auth.js authentication")
  .option("--no-auth", "skip installation of auth.js")
  .option("--admin", "generate admin dashboard with role-based authorization")
  .option("--no-admin", "skip generation of admin dashboard")
  .option("--no-pluralize", "disable the pluralization of variable names", true)
  .option("--no-install", "skip installation of dependencies")
  .option("--latest", "install latest cutting edge dependencies")
  .action(async (options) => {
    try {
      // inquire

      const partialConfig: Partial<DrizzleNextConfig> = {};
      partialConfig.version = VERSION;

      const frameworkAnswer =
        options.framework ||
        (await select({
          message: "Which framework do you want to initialize?",
          choices: [
            { value: "next", description: "Next.js + Drizzle ORM" },
            { value: "express", description: "Express.js + Drizzle ORM" },
            { value: "drizzle", description: "Drizzle ORM only" },
            { value: "all", description: "All of the above" },
          ],
        }));

      partialConfig.framework = {
        next: ["next", "all"].includes(frameworkAnswer),
        express: ["express", "all"].includes(frameworkAnswer),
        drizzle: ["next", "express", "drizzle", "all"].includes(
          frameworkAnswer
        ),
      };

      partialConfig.packageManager =
        options.packageManager ||
        (await select({
          message: "Which package manager would you like to use?",
          choices: [{ value: "npm" }, { value: "pnpm" }, { value: "bun" }],
        }));

      partialConfig.dbDialect =
        options.dbDialect ||
        (await select({
          message: "Which database dialect would you like to use?",
          choices: [
            {
              value: "sqlite",
            },
            { value: "postgresql" },
            { value: "mysql" },
          ],
        }));

      switch (partialConfig.dbDialect) {
        case "sqlite":
          partialConfig.dbPackage = "better-sqlite3";
          break;
        case "postgresql":
          partialConfig.dbPackage = "pg";
          break;
        case "mysql":
          partialConfig.dbPackage = "mysql2";
          break;
        default:
          break;
      }
      partialConfig.pkStrategy =
        options.pkStrategy ||
        (await select({
          message:
            "Which primary key generation strategy would you like to use?",
          choices: [
            {
              name: "cuid2",
              value: "cuid2",
              description: "Uses the @paralleldrive/cuid2 package",
            },
            {
              name: "uuidv4",
              value: "uuidv4",
              description: "Uses crypto.randomUUID",
            },
            {
              name: "uuidv7",
              value: "uuidv7",
              description: "Uses the uuidv7 package",
            },
            {
              name: "nanoid",
              value: "nanoid",
              description: "Uses the nanoid package",
            },
            {
              name: "auto_increment",
              value: "auto_increment",
              description:
                "Auto increment. Warning: Does not work with Auth.js Drizzle Adapter.",
            },
          ],
        }));
      partialConfig.authEnabled =
        options.auth ??
        (await confirm({
          message: "Do you want to add Auth.js authentication?",
          default: true,
        }));
      if (
        partialConfig.pkStrategy === "auto_increment" &&
        partialConfig.authEnabled
      ) {
        log.red("auto_increment is not compatible with authjs");
        process.exit(1);
      }
      if (partialConfig.authEnabled) {
        partialConfig.adminEnabled =
          options.admin ??
          (await confirm({
            message: "Do you want to add an admin dashboard?",
            default: true,
          }));
      } else {
        partialConfig.adminEnabled = false;
      }

      partialConfig.pluralizeEnabled = options.pluralize;

      partialConfig.install = options.install;

      // process

      const processors: DrizzleNextProcessor[] = [];

      const completeConfig = completeDrizzleNextConfig(partialConfig);

      const newProjectProcessor = new NewProjectProcessor(completeConfig);

      await newProjectProcessor.install();

      const dbPackageStrategy = packageStrategyFactory(completeConfig);
      const dbDialectProcessor = new DbDialectProcessor(completeConfig);

      processors.push(newProjectProcessor);
      processors.push(dbPackageStrategy);
      processors.push(dbDialectProcessor);

      let authProcessor;
      let adminProcessor;

      if (completeConfig.authEnabled && completeConfig.framework.next) {
        authProcessor = new AuthProcessor(completeConfig);
        processors.push(authProcessor);
      }
      if (completeConfig.adminEnabled && completeConfig.framework.next) {
        adminProcessor = new AdminProcessor(completeConfig);
        processors.push(adminProcessor);
      }

      const dependencies = [];
      const devDependencies = [];

      dependencies.push(...pkDependencies[completeConfig.pkStrategy]);

      for (const processor of processors) {
        dependencies.push(...processor.dependencies);
        devDependencies.push(...processor.devDependencies);
      }

      if (completeConfig.framework.next) {
        for (const authProvider in authStrategyMap) {
          const authStrategy =
            authStrategyMap[authProvider as keyof typeof authStrategyMap];
          dependencies.push(...authStrategy.dependencies);
          devDependencies.push(...authStrategy.devDependencies);
        }
      }

      if (completeConfig.install) {
        await installDependencies({
          dependencies,
          packageManager: completeConfig.packageManager,
          latest: completeConfig.latest,
        });

        await installDevDependencies({
          devDependencies,
          packageManager: completeConfig.packageManager,
          latest: completeConfig.latest,
        });
      }

      for (const processor of processors) {
        await processor.init();
      }

      log.success("successfully initialized drizzle-next");

      for (const processor of processors) {
        processor.printCompletionMessage();
      }
    } catch (error) {
      log.red(`${error}`);
    }
  });

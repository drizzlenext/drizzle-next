import { Command, Option } from "commander";
import { log } from "../../common/lib/log";
import { BaseProcessor, DrizzleExpressConfig } from "../../common/types/types";
import { select } from "@inquirer/prompts";
import {
  completeDrizzleExpressConfig,
  installDependencies,
  installDevDependencies,
  writeDrizzleExpressConfig,
} from "../../common/lib/utils";
import { packageStrategyFactory } from "../../common/lib/strategy-factory";
import { DbDialectProcessor } from "../../common/processors/db-dialect-processor";
import packageJson from "../package.json";
import { pkDependencies } from "../../common/lib/pk-strategy";
import { ExpressInitProcessor } from "../processors/express-init-processor";

export const initCommand = new Command("init");

const VERSION = packageJson["version"];

initCommand
  .description("initialize express.js and drizzle orm project")
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
  .option("--no-pluralize", "disable the pluralization of variable names", true)
  .option("--no-install", "skip installation of dependencies", true)
  .option("--latest", "install latest cutting edge dependencies", false)
  .action(async (options) => {
    try {
      // inquire

      const partialConfig: Partial<DrizzleExpressConfig> = {};
      partialConfig.version = VERSION;

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

      partialConfig.pluralizeEnabled = options.pluralize;

      partialConfig.install = options.install;

      // process

      const processors: BaseProcessor[] = [];

      const completeConfig = completeDrizzleExpressConfig(partialConfig);

      writeDrizzleExpressConfig(completeConfig);

      const dbPackageStrategy = packageStrategyFactory({
        authEnabled: false,
        dbPackage: completeConfig.dbPackage,
        pluralizeEnabled: completeConfig.pluralizeEnabled,
      });
      const dbDialectProcessor = new DbDialectProcessor(completeConfig);
      const expressInitProcessor = new ExpressInitProcessor(completeConfig);

      processors.push(dbDialectProcessor);
      processors.push(dbPackageStrategy);
      processors.push(expressInitProcessor);

      const dependencies: string[] = [];
      const devDependencies: string[] = [];

      dependencies.push(...pkDependencies[completeConfig.pkStrategy]);

      for (const processor of processors) {
        dependencies.push(...processor.dependencies);
        devDependencies.push(...processor.devDependencies);
      }

      if (completeConfig.install) {
        await expressInitProcessor.install();

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

      log.success("successfully initialized drizzle-express");

      for (const processor of processors) {
        processor.printCompletionMessage();
      }
    } catch (error) {
      log.red(`${error}`);
    }
  });

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

      partialConfig.pluralizeEnabled = options.pluralize;

      partialConfig.install = options.install;

      partialConfig.srcDir = true;

      // process

      const processors: BaseProcessor[] = [];

      const completeConfig = completeDrizzleExpressConfig(partialConfig);

      writeDrizzleExpressConfig(completeConfig);

      const dbPackageStrategy = packageStrategyFactory({
        dbPackage: completeConfig.dbPackage,
        pluralizeEnabled: completeConfig.pluralizeEnabled,
        srcDir: completeConfig.srcDir,
      });
      const dbDialectProcessor = new DbDialectProcessor(completeConfig);
      const expressInitProcessor = new ExpressInitProcessor(completeConfig);

      processors.push(dbDialectProcessor);
      processors.push(dbPackageStrategy);
      processors.push(expressInitProcessor);

      const dependencies: string[] = [];
      const devDependencies: string[] = [];

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

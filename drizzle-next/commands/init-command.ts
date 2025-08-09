import { Command, Option } from "commander";
import { log } from "../../common/lib/log";
import { BaseProcessor, DrizzleNextConfig } from "../../common/types/types";
import { select } from "@inquirer/prompts";
import {
  completeDrizzleNextConfig,
  installDependencies,
  installDevDependencies,
} from "../../common/lib/utils";
import { packageStrategyFactory } from "../../common/lib/strategy-factory";
import { NewProjectProcessor } from "../processors/new-project-processor";
import { DbDialectProcessor } from "../../common/processors/db-dialect-processor";
import packageJson from "../package.json";

export const initCommand = new Command("init");

const VERSION = packageJson["version"];

initCommand
  .description("initialize next.js project for development with drizzle-next")
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
  .option("--src-dir", "enable src directory", false)
  .option("--no-src-dir", "disable src directory", false)
  .option("--no-pluralize", "disable the pluralization of variable names", true)
  .option("--no-install", "skip installation of dependencies")
  .option("--latest", "install latest cutting edge dependencies")
  .action(async (options) => {
    try {
      // inquire

      const partialConfig: Partial<DrizzleNextConfig> = {};
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

      partialConfig.srcDir = options.srcDir;

      // process

      const processors: BaseProcessor[] = [];

      const completeConfig = completeDrizzleNextConfig(partialConfig);

      const newProjectProcessor = new NewProjectProcessor(completeConfig);

      await newProjectProcessor.install();

      const dbPackageStrategy = packageStrategyFactory(completeConfig);
      const dbDialectProcessor = new DbDialectProcessor(completeConfig);

      processors.push(dbDialectProcessor);
      processors.push(dbPackageStrategy);
      processors.push(newProjectProcessor);

      const dependencies = [];
      const devDependencies = [];

      for (const processor of processors) {
        dependencies.push(...processor.dependencies);
        devDependencies.push(...processor.devDependencies);
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

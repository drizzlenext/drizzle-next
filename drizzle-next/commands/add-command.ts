import { Command } from "commander";
import { log } from "../lib/log";
import { DrizzleNextConfig } from "../lib/types";
import {
  installDependencies,
  installDevDependencies,
  loadDrizzleNextConfig,
} from "../lib/utils";
import { ADD_ON_REGISTRY, getAddOnHelpText } from "../lib/add-on-registry";

export const addCommand = new Command("add");

addCommand
  .summary("add an add-on extension to the application")
  .description(
    `add-ons are extensions that can be added after a project has been initialized\n\navailable add-ons:\n${getAddOnHelpText()}`
  )
  .argument("<extension>", "the name of the add-on extension")
  .option("--no-install", "skip installation of dependencies")
  .action(async (name, options) => {
    if (!(name in ADD_ON_REGISTRY)) {
      log.red(`${name} not found in add-on registry`);
      process.exit(1);
    }

    const addOn = ADD_ON_REGISTRY[name as keyof typeof ADD_ON_REGISTRY];
    const Processor = addOn.Processor;

    const drizzleNextConfig: DrizzleNextConfig = loadDrizzleNextConfig();

    const processor = new Processor(drizzleNextConfig);

    if (options.install) {
      await installDependencies({
        dependencies: processor.dependencies,
        packageManager: drizzleNextConfig.packageManager,
        latest: drizzleNextConfig.latest,
      });

      await installDevDependencies({
        devDependencies: processor.devDependencies,
        packageManager: drizzleNextConfig.packageManager,
        latest: drizzleNextConfig.latest,
      });
    }

    processor.init();

    processor.printCompletionMessage();
  });

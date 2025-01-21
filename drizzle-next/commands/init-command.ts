import { Command, Option } from "commander";
import { log } from "../lib/log";
import { DrizzleNextConfig, DrizzleNextProcessor } from "../lib/types";
import { checkbox, select, confirm } from "@inquirer/prompts";
import {
  completeDrizzleNextConfig,
  installDependencies,
  installDevDependencies,
  preflightChecks,
  writeDrizzleNextConfig,
} from "../lib/utils";
import { packageStrategyFactory } from "../lib/strategy-factory";
import { AuthProcessor, authStrategyMap } from "../processors/auth-processor";
import { NewProjectProcessor } from "../processors/new-project-processor";
import { AdminProcessor } from "../processors/admin-processor";
import { DbDialectProcessor } from "../processors/db-dialect-processor";
import packageJson from "../package.json";
import { pkDependencies } from "../lib/pk-strategy";

export const initCommand = new Command("init");

const VERSION = packageJson["version"];

initCommand
  .description("initialize next.js project for development with drizzle-next")
  .option("--no-install", "skip installation of dependencies")
  .addOption(
    new Option(
      "-p, --package-manager <packageManager>",
      "the package manager for this project"
    ).choices(["npm", "pnpm", "bun"])
  )
  .addOption(new Option("-l, --latest", "install latest dependencies"))
  .addOption(
    new Option(
      "--no-latest",
      "install pinned dependencies specified in package-pinned.json"
    )
  )
  .addOption(
    new Option("-d, --db-dialect <dbDialect>", "the database dialect").choices([
      "sqlite",
      "postgresql",
      "mysql",
    ])
  )
  .addOption(
    new Option(
      "-pk, --pk-strategy <pkStrategy>",
      "primary key generation strategy"
    ).choices(["cuid2", "uuidv7", "uuidv4", "nanoid", "auto_increment"])
  )
  .addOption(
    new Option("-css, --css-strategy <cssStrategy>", "css strategy").choices([
      "tailwind",
      "none",
    ])
  )
  .addOption(
    new Option("-color, --color-palette <colorPalette>").choices([
      "slate",
      "gray",
      "zinc",
      "neutral",
      "stone",
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuschia",
      "pink",
      "rose",
    ])
  )
  .addOption(
    new Option(
      "-a, --auth-solution <authSolution>",
      "authentication solution"
    ).choices(["authjs", "none"])
  )
  .option(
    "-ap, --auth-providers <authProviders>",
    `comma separated list of authjs providers: github,google,credentials,postmark,nodemailer`,
    (value: string, dummyPrevious: any) => {
      const authProviders = value.split(",");
      const validProviders = new Set([
        "credentials",
        "github",
        "google",
        "postmark",
        "nodemailer",
      ]);
      for (const p of authProviders) {
        if (!validProviders.has(p)) {
          throw new Error("invalid auth provider: " + p);
        }
      }
      return authProviders;
    }
  )
  .option("-ad, --admin", "admin dashboard with role-based authorization")
  .option("--no-admin", "no admin dashboard")
  .option(
    "--pluralize",
    "enable the automatic pluralization of variable naming conventions"
  )
  .option(
    "--no-pluralize",
    "disable the automatic pluralization of variable naming conventions"
  )
  .action(async (options) => {
    try {
      preflightChecks();

      // inquire

      const partialConfig: Partial<DrizzleNextConfig> = {};
      partialConfig.version = VERSION;

      partialConfig.packageManager =
        options.packageManager ||
        (await select({
          message: "Which package manager do you want to use?",
          choices: [{ value: "npm" }, { value: "pnpm" }, { value: "bun" }],
        }));

      partialConfig.install = options.install;

      if (options.install) {
        partialConfig.latest =
          options.latest ??
          (await select({
            message:
              "Do you want to install latest packages or pinned packages?",
            choices: [
              {
                name: "pinned",
                value: false,
                description:
                  "Installs pinned packages in package-pinned.json. More stable, but possibly obsolete.",
              },
              {
                name: "latest",
                value: true,
                description:
                  "Installs latest packages. Less stable, but cutting edge.",
              },
            ],
          }));
      }
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
              name: "uuidv7",
              value: "uuidv7",
              description: "Uses the uuidv7 package",
            },
            {
              name: "uuidv4",
              value: "uuidv4",
              description: "Uses crypto.randomUUID",
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
      partialConfig.cssStrategy =
        options.cssStrategy ||
        (await select({
          message: "Which css strategy would you like to use?",
          choices: [
            { value: "tailwind", description: "utility-first css framework" },
            {
              value: "none",
              description: "no css is included",
            },
          ],
        }));
      if (partialConfig.cssStrategy === "tailwind") {
        partialConfig.colorPalette =
          options.colorPalette ||
          (await select({
            message: "Which color palette would you like to start with?",
            choices: [
              { value: "slate" },
              { value: "gray" },
              { value: "zinc" },
              { value: "neutral" },
              { value: "stone" },
              { value: "red" },
              { value: "orange" },
              { value: "amber" },
              { value: "yellow" },
              { value: "lime" },
              { value: "green" },
              { value: "emerald" },
              { value: "teal" },
              { value: "cyan" },
              { value: "sky" },
              { value: "blue" },
              { value: "indigo" },
              { value: "violet" },
              { value: "purple" },
              { value: "fuschia" },
              { value: "pink" },
              { value: "rose" },
            ],
          }));
      }
      partialConfig.authSolution =
        options.authSolution ||
        (await select({
          message: "Which authentication solution do you want to use?",
          choices: [{ value: "authjs" }, { value: "none" }],
        }));
      if (
        partialConfig.pkStrategy === "auto_increment" &&
        partialConfig.authSolution === "authjs"
      ) {
        log.red("auto_increment is not compatible with authjs");
        process.exit(1);
      }
      if (partialConfig.authSolution === "authjs") {
        partialConfig.authProviders =
          options.authProviders ||
          (await checkbox({
            message: "Which auth providers would you like to use?",
            choices: [
              { name: "credentials", value: "credentials", checked: true },
              { name: "github", value: "github" },
              { name: "google", value: "google" },
              { name: "postmark", value: "postmark" },
              { name: "nodemailer", value: "nodemailer" },
            ],
          }));
      }
      if (partialConfig.authSolution !== "none") {
        partialConfig.adminEnabled =
          options.admin ??
          (await confirm({
            message:
              "Do you want to add an admin dashboard with role-based authorization?",
            default: true,
          }));
      }
      partialConfig.pluralizeEnabled =
        options.pluralize ??
        (await confirm({
          message:
            "Do you want to enable the automatic pluralization of table and variable names?",
          default: true,
        }));

      // process

      const processors: DrizzleNextProcessor[] = [];

      const completeConfig = completeDrizzleNextConfig(partialConfig);

      writeDrizzleNextConfig(completeConfig);

      const newProjectProcessor = new NewProjectProcessor(completeConfig);

      await newProjectProcessor.install();

      const dbPackageStrategy = packageStrategyFactory(completeConfig);
      const dbDialectProcessor = new DbDialectProcessor(completeConfig);

      processors.push(newProjectProcessor);
      processors.push(dbPackageStrategy);
      processors.push(dbDialectProcessor);

      let authProcessor;
      let adminProcessor;

      if (completeConfig.authSolution !== "none") {
        authProcessor = new AuthProcessor(completeConfig);
        processors.push(authProcessor);
      }
      if (completeConfig.adminEnabled) {
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

      for (const authProvider of completeConfig.authProviders) {
        const authStrategy = authStrategyMap[authProvider];
        dependencies.push(...authStrategy.dependencies);
        devDependencies.push(...authStrategy.devDependencies);
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

      for (const processor of processors) {
        processor.printCompletionMessage();
      }

      log.log("");
      log.success("drizzle-next init success");
    } catch (error) {
      log.red(`${error}`);
    }
  });

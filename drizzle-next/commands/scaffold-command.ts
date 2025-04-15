import fs from "fs";
import { Command, Option } from "commander";
import { log } from "../lib/log";
import { AuthorizationLevel, DrizzleNextConfig } from "../lib/types";
import { select } from "@inquirer/prompts";
import { loadDrizzleNextConfig } from "../lib/utils";
import { ScaffoldProcessor } from "../processors/scaffold-processor";

export const scaffoldCommand = new Command("scaffold");

scaffoldCommand
  .summary("scaffold next.js ui and drizzle database table")
  .description(
    `scaffold next.js ui and drizzle database table

examples:
npx drizzle-next@latest scaffold category -c name:text
npx drizzle-next@latest scaffold post -c category_id:references title:text content:text is_published:boolean

postgresql data types:
integer, smallint, bigint, serial, smallserial, bigserial, boolean, text, varchar, char, numeric, decimal, real, doublePrecision, json, jsonb, time, timestamp, date, uuid

mysql data types:
int, tinyint, smallint, mediumint, bigint, real, decimal, double, float, serial, binary, varbinary, char, varchar, text, boolean, date, datetime, time, year, timestamp, json

sqlite data types:
integer, real, text, boolean, bigint, timestamp
`
  )
  .argument("<table>", "the database table name")
  .requiredOption(
    "-c, --columns <columns...>",
    "space separated list of columns in the format of column_name:data_type"
  )
  .addOption(
    new Option("--frameworks <framework>", "frameworks to scaffold").choices([
      "next",
      "express",
      "drizzle",
      "all",
    ])
  )
  .action(async (table, options) => {
    const drizzleNextConfig: DrizzleNextConfig = loadDrizzleNextConfig();
    const frameworksEnabled = drizzleNextConfig.frameworks;

    // override the config defaults if framework option is passed in
    if (options.frameworks) {
      frameworksEnabled.next = ["next", "all"].includes(options.frameworks);
      frameworksEnabled.express = ["express", "all"].includes(
        options.frameworks
      );
      frameworksEnabled.drizzle = [
        "next",
        "express",
        "drizzle",
        "all",
      ].includes(options.frameworks);
    }

    const scaffoldProcessor = new ScaffoldProcessor({
      table: table,
      columns: options.columns,
      enableCompletionMessage: true,
      enableNextScaffold: frameworksEnabled.next,
      enableDrizzleScaffold: frameworksEnabled.drizzle,
      enableExpressScaffold: frameworksEnabled.express,
      ...drizzleNextConfig,
    });
    scaffoldProcessor.process();
  });

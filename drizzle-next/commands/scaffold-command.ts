import fs from "fs";
import { Command, Option } from "commander";
import { log } from "../../common/lib/log";
import {
  AuthorizationLevel,
  DrizzleNextConfig,
} from "../../common/types/types";
import { select } from "@inquirer/prompts";
import { loadDrizzleNextConfig } from "../../common/lib/utils";
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
    new Option("--framework <framework>", "framework to scaffold").choices([
      "next",
      "express",
      "drizzle",
      "all",
    ])
  )
  .action(async (table, options) => {
    const drizzleNextConfig: DrizzleNextConfig = loadDrizzleNextConfig();
    const frameworkEnabled = drizzleNextConfig.framework;

    // override the config defaults if framework option is passed in
    if (options.framework) {
      frameworkEnabled.next = ["next", "all"].includes(options.framework);
      frameworkEnabled.express = ["express", "all"].includes(options.framework);
      frameworkEnabled.drizzle = ["next", "express", "drizzle", "all"].includes(
        options.framework
      );
    }

    const scaffoldProcessor = new ScaffoldProcessor({
      table: table,
      columns: options.columns,
      enableCompletionMessage: true,
      enableNextScaffold: frameworkEnabled.next,
      enableDrizzleScaffold: frameworkEnabled.drizzle,
      enableExpressScaffold: frameworkEnabled.express,
      ...drizzleNextConfig,
    });
    scaffoldProcessor.process();
  });

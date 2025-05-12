import { Command, Option } from "commander";
import { DrizzleNextConfig } from "../../common/types/types";
import { loadDrizzleNextConfig } from "../../common/lib/utils";
import { NextScaffoldProcessor } from "../processors/next-scaffold-processor";
import { DrizzleScaffoldProcessor } from "../../common/processors/drizzle-scaffold-processor";

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
  .action(async (table, options) => {
    const drizzleNextConfig: DrizzleNextConfig = loadDrizzleNextConfig();

    const nextScaffoldProcessor = new NextScaffoldProcessor({
      table: table,
      columns: options.columns,
      enableCompletionMessage: true,
      ...drizzleNextConfig,
    });

    const drizzleScaffoldProcessor = new DrizzleScaffoldProcessor({
      table: table,
      columns: options.columns,
      enableCompletionMessage: true,
      ...drizzleNextConfig,
    });

    nextScaffoldProcessor.process();

    drizzleScaffoldProcessor.process();
  });

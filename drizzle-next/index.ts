#!/usr/bin/env node

import { Command } from "commander";
import packageJson from "./package.json";
import { initCommand } from "./commands/init-command";
import { scaffoldCommand } from "./commands/scaffold-command";
import { addCommand } from "./commands/add-command";
import { dbCommand } from "./commands/db-command";

const VERSION = packageJson["version"];

const program = new Command();

program
  .name("drizzle-next")
  .description("Full Stack Next.js and Drizzle ORM Framework")
  .version(VERSION);

program.addCommand(initCommand);
program.addCommand(scaffoldCommand);
program.addCommand(addCommand);
program.addCommand(dbCommand);

program.parse();

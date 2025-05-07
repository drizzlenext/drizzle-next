#!/usr/bin/env node

import { Command } from "commander";
import packageJson from "./package.json";
import { initCommand } from "./commands/init-command";
import { scaffoldCommand } from "./commands/scaffold-command";

const VERSION = packageJson["version"];

const program = new Command();

program
  .name("drizzle-express")
  .description("Express.js and Drizzle ORM Framework")
  .version(VERSION);

program.addCommand(initCommand);
program.addCommand(scaffoldCommand);

program.parse();

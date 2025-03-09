import chalk from "chalk";

export const log = {
  blue(str: string) {
    console.log(chalk.blueBright(str));
  },

  red(str: string) {
    console.log(chalk.red(str));
  },

  green(str: string) {
    console.log(chalk.green(str));
  },

  yellow(str: string) {
    console.log(chalk.yellow(str));
  },

  gray(str: string) {
    console.log(chalk.gray(str));
  },

  log(str: string) {
    console.log(str);
  },

  success(str: string) {
    console.log(chalk.greenBright(str));
  },

  init(str: string) {
    console.log(chalk.bold.blueBright(str));
  },

  checklist(str: string) {
    console.log(chalk.magentaBright.underline(str));
  },

  task(str: string) {
    console.log("- " + str);
  },

  cmdtask(str: string) {
    console.log("- terminal: " + str);
  },

  subtask(str: string) {
    console.log("  - " + str);
  },

  cmdsubtask(str: string) {
    console.log("  - terminal: " + str);
  },

  exec(str: string) {
    console.log("> " + str);
  },
};

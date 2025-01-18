import { log } from "../lib/log";
import { DrizzleNextConfig, DrizzleNextProcessor } from "../lib/types";
import { insertTextAfterIfNotExists, renderTemplate } from "../lib/utils";

export class DarkModeProcessor implements DrizzleNextProcessor {
  constructor(public opts: DrizzleNextConfig) {}

  dependencies = [];

  devDependencies = [];

  async init() {
    log.init("initializing dark mode...");
    await this.render();
  }

  async render() {
    await this.addModeToggle();
    await this.addSuppressHydrationWarning();
  }

  async addModeToggle() {
    renderTemplate({
      inputPath: "dark-mode-processor/components/mode-toggle.tsx.hbs",
      outputPath: "components/mode-toggle.tsx",
    });
  }

  async addSuppressHydrationWarning() {
    insertTextAfterIfNotExists(
      "app/layout.tsx",
      "<html",
      " suppressHydrationWarning"
    );
  }

  printCompletionMessage() {
    log.success("dark mode added");
  }
}

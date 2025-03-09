import { log } from "../lib/log";
import { dialectStrategyFactory } from "../lib/strategy-factory";
import {
  DbDialectStrategy,
  DrizzleNextConfig,
  DrizzleNextProcessor,
} from "../lib/types";
import { renderTemplate } from "../lib/utils";

export class TiptapProcessor implements DrizzleNextProcessor {
  opts: DrizzleNextConfig;
  dependencies: string[] = [
    "@tiptap/core",
    "@tiptap/extension-link",
    "@tiptap/extension-text-align",
    "@tiptap/react",
    "@tiptap/starter-kit",
    "@tiptap/extension-image",
    "@tiptap/extension-code-block-lowlight",
    "highlight.js",
    "lowlight",
  ];
  devDependencies: string[] = ["@types/highlight.js"];
  dbDialectStrategy?: DbDialectStrategy | undefined;

  constructor(opts: DrizzleNextConfig) {
    this.dbDialectStrategy = dialectStrategyFactory(opts.dbDialect);
    this.opts = opts;
  }

  async init(): Promise<void> {
    log.init("initializing tiptap...");
    await this.render();
  }
  async render(): Promise<void> {
    renderTemplate({
      inputPath: "tiptap-processor/components/ui/tiptap-editor.tsx.hbs",
      outputPath: "components/ui/tiptap-editor.tsx",
    });
    renderTemplate({
      inputPath: "tiptap-processor/styles/tiptap-editor.css.hbs",
      outputPath: "styles/tiptap-editor.css",
    });
  }
  printCompletionMessage() {
    log.checklist("tiptap editor checklist");
    log.task("you can now scaffold with a text_tiptap data type");
  }
}

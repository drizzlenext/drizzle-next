import { log } from "../../common/lib/log";
import { DrizzleExpressConfig } from "../../common/types/types";
import {
  insertTextAfterIfNotExists,
  installDependencies,
  installDevDependencies,
} from "../../common/lib/utils";
import { renderTemplate } from "../lib/utils";

export class ExpressInitProcessor {
  opts: DrizzleExpressConfig;

  dependencies = [];

  devDependencies = [];

  constructor(opts: DrizzleExpressConfig) {
    this.opts = opts;
  }

  async init() {
    log.init("initializing new project...");
    await this.render();
  }

  async install() {
    if (!this.opts.install) {
      return;
    }

    await installDependencies({
      dependencies: ["express", "body-parser"],
      packageManager: this.opts.packageManager,
      latest: this.opts.latest,
    });

    await installDevDependencies({
      devDependencies: ["@types/express", "nodemon", "@types/body-parser"],
      packageManager: this.opts.packageManager,
      latest: this.opts.latest,
    });

    await installDependencies({
      dependencies: ["drizzle-orm", "dotenv", "zod"],
      packageManager: this.opts.packageManager,
      latest: this.opts.latest,
    });

    await installDevDependencies({
      devDependencies: ["drizzle-kit", "typescript"],
      packageManager: this.opts.packageManager,
      latest: this.opts.latest,
    });
  }

  async render() {
    renderTemplate({
      inputPath: "express-templates/src/app.ts.hbs",
      outputPath: "src/app.ts",
    });

    renderTemplate({
      inputPath: "express-templates/src/server.ts.hbs",
      outputPath: "src/server.ts",
    });

    insertTextAfterIfNotExists(
      "package.json",
      `"scripts": {`,
      `\n    "dev": "nodemon --watch src --exec tsx src/server.ts",`
    );

    renderTemplate({
      inputPath: "express-templates/tsconfig.json.hbs",
      outputPath: "tsconfig.json",
    });

    renderTemplate({
      inputPath: "express-templates/.gitignore.hbs",
      outputPath: ".gitignore",
    });

    renderTemplate({
      inputPath: `express-templates/env.${this.opts.dbDialect}.hbs`,
      outputPath: ".env",
    });

    renderTemplate({
      inputPath: "express-templates/src/config/env.ts.hbs",
      outputPath: "src/config/env.ts",
    });

    renderTemplate({
      inputPath:
        "express-templates/src/middlewares/error-handler.middleware.ts.hbs",
      outputPath: "src/middlewares/error-handler.middleware.ts",
    });
  }

  printCompletionMessage() {}
}

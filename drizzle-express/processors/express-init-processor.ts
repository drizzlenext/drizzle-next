import { log } from "../../common/lib/log";
import { DrizzleExpressConfig } from "../../common/types/types";
import {
  insertTextAfterIfNotExists,
  installDependencies,
  installDevDependencies,
  renderTemplate,
} from "../../common/lib/utils";

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
      devDependencies: ["drizzle-kit"],
      packageManager: this.opts.packageManager,
      latest: this.opts.latest,
    });
  }

  async render() {
    renderTemplate({
      inputPath: "express-templates/app.ts.hbs",
      outputPath: "app.ts",
    });

    insertTextAfterIfNotExists(
      "package.json",
      `"scripts": {`,
      `\n    "dev:api": "nodemon --watch routes --watch app.ts --exec tsx app.ts",`
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
      inputPath: "express-templates/env.hbs",
      outputPath: ".env",
    });

    renderTemplate({
      inputPath: "express-templates/lib/config.ts.hbs",
      outputPath: "lib/config.ts",
    });
  }

  printCompletionMessage() {}
}

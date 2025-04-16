import { log } from "../lib/log";
import { DrizzleNextConfig, DrizzleNextProcessor } from "../lib/types";
import {
  appendToEnvLocal,
  appendToFileIfTextNotExists,
  insertTextAfterIfNotExists,
  installDependencies,
  installDevDependencies,
  renderTemplate,
  renderTemplateIfNotExists,
  writeDrizzleNextConfig,
} from "../lib/utils";

export class NewProjectProcessor implements DrizzleNextProcessor {
  opts: DrizzleNextConfig;

  dependencies = [];

  devDependencies = [];

  constructor(opts: DrizzleNextConfig) {
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

    // installation logic
    if (this.opts.frameworks.next) {
      await installDependencies({
        dependencies: ["lucide-react", "clsx", "tailwind-merge", "mime"],
        packageManager: this.opts.packageManager,
        latest: this.opts.latest,
      });
    }

    if (this.opts.frameworks.express) {
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
    }

    if (this.opts.frameworks.drizzle) {
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
  }

  async render() {
    writeDrizzleNextConfig(this.opts);

    if (this.opts.frameworks.next) {
      this.renderNext();
      this.renderDrizzleUI();
    }

    if (this.opts.frameworks.express) {
      this.renderExpress();
    }

    if (!this.opts.frameworks.next) {
      this.renderNextDisabledFiles();
    }
  }

  renderNext() {
    renderTemplate({
      inputPath: "new-project-processor/lib/config.ts.hbs",
      outputPath: "lib/config.ts",
    });
    renderTemplateIfNotExists({
      inputPath: "new-project-processor/.env.hbs",
      outputPath: ".env",
    });
    renderTemplate({
      inputPath: "new-project-processor/app/layout.tsx.hbs",
      outputPath: "app/layout.tsx",
    });
    renderTemplate({
      inputPath: "new-project-processor/app/page.tsx.hbs",
      outputPath: "app/page.tsx",
    });
    renderTemplate({
      inputPath:
        "new-project-processor/app/(public)/_components/public-layout.tsx.hbs",
      outputPath: "app/(public)/_components/public-layout.tsx",
    });
    renderTemplate({
      inputPath: "new-project-processor/app/(public)/layout.tsx.hbs",
      outputPath: "app/(public)/layout.tsx",
    });
    renderTemplate({
      inputPath: "new-project-processor/lib/upload.ts.hbs",
      outputPath: "lib/upload.ts",
    });
    renderTemplate({
      inputPath: "new-project-processor/eslint.config.mjs.hbs",
      outputPath: "eslint.config.mjs",
    });
    renderTemplate({
      inputPath: "new-project-processor/lib/search-params.ts.hbs",
      outputPath: "lib/search-params.ts",
    });
    renderTemplate({
      inputPath: "new-project-processor/app/(development)/layout.tsx.hbs",
      outputPath: "app/(development)/layout.tsx",
    });
    renderTemplate({
      inputPath: "new-project-processor/app/uploads/[...segments]/route.ts.hbs",
      outputPath: "app/uploads/[...segments]/route.ts",
    });
    renderTemplate({
      inputPath:
        "new-project-processor/app/(development)/development/page.tsx.hbs",
      outputPath: "app/(development)/development/page.tsx",
    });

    appendToFileIfTextNotExists(".gitignore", "/uploads", "/uploads");

    appendToEnvLocal(
      "NEXT_PUBLIC_UPLOAD_BASE_URL",
      "http://localhost:3000/uploads"
    );
  }

  renderDrizzleUI() {
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/alert.tsx.hbs",
      outputPath: "components/ui/alert.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/avatar.tsx.hbs",
      outputPath: "components/ui/avatar.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/button.tsx.hbs",
      outputPath: "components/ui/button.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/card.tsx.hbs",
      outputPath: "components/ui/card.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/checkbox.tsx.hbs",
      outputPath: "components/ui/checkbox.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/dark-mode.tsx.hbs",
      outputPath: "components/ui/dark-mode.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/dropdown-menu.tsx.hbs",
      outputPath: "components/ui/dropdown-menu.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/app-layout.tsx.hbs",
      outputPath: "components/ui/app-layout.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/form.tsx.hbs",
      outputPath: "components/ui/form.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/input.tsx.hbs",
      outputPath: "components/ui/input.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/label.tsx.hbs",
      outputPath: "components/ui/label.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/pagination.tsx.hbs",
      outputPath: "components/ui/pagination.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/search-input.tsx.hbs",
      outputPath: "components/ui/search-input.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/select.tsx.hbs",
      outputPath: "components/ui/select.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/sortable.tsx.hbs",
      outputPath: "components/ui/sortable.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/table.tsx.hbs",
      outputPath: "components/ui/table.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/textarea.tsx.hbs",
      outputPath: "components/ui/textarea.tsx",
    });
    renderTemplate({
      inputPath: "drizzle-ui/lib/utils.ts.hbs",
      outputPath: "lib/utils.ts",
    });
    renderTemplate({
      inputPath: "drizzle-ui/styles/styles.css.hbs",
      outputPath: "app/globals.css",
    });
  }

  renderExpress() {
    renderTemplate({
      inputPath: "express-templates/app.ts.hbs",
      outputPath: "app.ts",
    });

    insertTextAfterIfNotExists(
      "package.json",
      `"scripts": {`,
      `\n    "dev:api": "nodemon --watch routes --watch app.ts --exec tsx app.ts",`
    );
  }

  renderNextDisabledFiles() {
    // if next is disabled, render the tsconfig for express setup. and gitignore. and env.
    // also needed for drizzle only setup.
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

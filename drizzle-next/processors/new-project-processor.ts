import { log } from "../../common/lib/log";
import {
  DrizzleNextConfig,
  DrizzleNextProcessor,
} from "../../common/types/types";
import {
  appendToEnvLocal,
  appendToFileIfTextNotExists,
  installDependencies,
  installDevDependencies,
  writeDrizzleNextConfig,
} from "../../common/lib/utils";
import { renderTemplate, renderTemplateIfNotExists } from "../lib/utils";

export class NewProjectProcessor implements DrizzleNextProcessor {
  opts: DrizzleNextConfig;

  dependencies = [];

  devDependencies = [];

  constructor(opts: DrizzleNextConfig) {
    this.opts = opts;
  }

  private getOutputPath(path: string): string {
    return this.opts.srcDir ? `src/${path}` : path;
  }

  async init() {
    log.init("initializing new project");
    await this.render();
  }

  async install() {
    if (!this.opts.install) {
      return;
    }

    // installation logic
    await installDependencies({
      dependencies: ["lucide-react", "clsx", "tailwind-merge", "mime"],
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
    writeDrizzleNextConfig(this.opts);

    this.renderNext();
    this.renderDrizzleUI();
  }

  renderNext() {
    renderTemplate({
      inputPath: "new-project-processor/src/lib/env.ts.hbs",
      outputPath: this.getOutputPath("lib/env.ts"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/app/layout.tsx.hbs",
      outputPath: this.getOutputPath("app/layout.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/app/page.tsx.hbs",
      outputPath: this.getOutputPath("app/page.tsx"),
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/components/layouts/public-layout.tsx.hbs",
      outputPath: this.getOutputPath("components/layouts/public-layout.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/app/(public)/layout.tsx.hbs",
      outputPath: this.getOutputPath("app/(public)/layout.tsx"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/lib/upload.ts.hbs",
      outputPath: this.getOutputPath("lib/upload.ts"),
    });
    renderTemplate({
      inputPath: "new-project-processor/eslint.config.mjs.hbs",
      outputPath: "eslint.config.mjs",
    });
    renderTemplate({
      inputPath: "new-project-processor/src/lib/search-params.ts.hbs",
      outputPath: this.getOutputPath("lib/search-params.ts"),
    });
    renderTemplate({
      inputPath:
        "new-project-processor/src/app/uploads/[...segments]/route.ts.hbs",
      outputPath: this.getOutputPath("app/uploads/[...segments]/route.ts"),
    });
    renderTemplate({
      inputPath: "new-project-processor/src/lib/id.ts.hbs",
      outputPath: this.getOutputPath("lib/id.ts"),
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
      outputPath: this.getOutputPath("components/ui/alert.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/avatar.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/avatar.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/button.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/button.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/card.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/card.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/checkbox.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/checkbox.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/dark-mode.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/dark-mode.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/form.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/form.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/input.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/input.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/label.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/label.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/pagination.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/pagination.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/search-input.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/search-input.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/select.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/select.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/sortable.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/sortable.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/table.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/table.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/components/ui/textarea.tsx.hbs",
      outputPath: this.getOutputPath("components/ui/textarea.tsx"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/lib/utils.ts.hbs",
      outputPath: this.getOutputPath("lib/utils.ts"),
    });
    renderTemplate({
      inputPath: "drizzle-ui/styles/styles.css.hbs",
      outputPath: this.getOutputPath("app/globals.css"),
    });
  }

  printCompletionMessage() {}
}

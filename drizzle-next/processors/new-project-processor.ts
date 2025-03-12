import { log } from "../lib/log";
import { DrizzleNextConfig, DrizzleNextProcessor } from "../lib/types";
import {
  appendToEnvLocal,
  appendToFileIfTextNotExists,
  renderTemplate,
  renderTemplateIfNotExists,
  writeDrizzleNextConfig,
} from "../lib/utils";

export class NewProjectProcessor implements DrizzleNextProcessor {
  opts: DrizzleNextConfig;

  dependencies = [
    "drizzle-orm",
    "dotenv",
    "zod",
    "lucide-react",
    "clsx",
    "tailwind-merge",
    "mime"
  ];

  devDependencies = ["drizzle-kit"];

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
  }

  async render() {
    writeDrizzleNextConfig(this.opts);

    this.renderDrizzleUI();

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
    renderTemplateIfNotExists({
      inputPath: "new-project-processor/.env.hbs",
      outputPath: ".env",
    });
    renderTemplate({
      inputPath: "new-project-processor/lib/config.ts.hbs",
      outputPath: "lib/config.ts",
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
      outputPath: "app/uploads/[...segments]/route.ts"
    });

    appendToFileIfTextNotExists(".gitignore", "/uploads", "/uploads");

    appendToEnvLocal(
      "NEXT_PUBLIC_UPLOAD_BASE_URL",
      "http://localhost:3000/uploads",
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
      inputPath: "drizzle-ui/components/ui/dashboard-layout.tsx.hbs",
      outputPath: "components/ui/dashboard-layout.tsx",
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
      inputPath: "drizzle-ui/components/ui/page-layout.tsx.hbs",
      outputPath: "components/ui/page-layout.tsx",
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

  printCompletionMessage() {}
}

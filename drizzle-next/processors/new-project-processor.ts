import { log } from "../lib/log";
import { DrizzleNextConfig, DrizzleNextProcessor } from "../lib/types";
import {
  appendToEnvLocal,
  appendToFileIfTextNotExists,
  renderTemplate,
  renderTemplateIfNotExists,
} from "../lib/utils";

export class NewProjectProcessor implements DrizzleNextProcessor {
  opts: DrizzleNextConfig;

  dependencies = ["drizzle-orm", "dotenv", "zod", "lucide-react", "clsx"];

  devDependencies = ["drizzle-kit"];

  constructor(opts: DrizzleNextConfig) {
    if (opts.cssStrategy === "tailwind") {
      this.dependencies.push("tailwind-merge");
    }

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
    switch (this.opts.cssStrategy) {
      case "tailwind":
        renderTemplate({
          inputPath: "new-project-processor/tailwind.config.ts.hbs",
          outputPath: "tailwind.config.ts",
          data: {
            colorPalette: this.opts.colorPalette,
          },
        });
        renderTemplate({
          inputPath: "new-project-processor/app/globals.css.hbs",
          outputPath: "app/globals.css",
        });
        break;
      case "none":
        renderTemplate({
          inputPath: "new-project-processor/app/globals.css.none.hbs",
          outputPath: "app/globals.css",
        });
        break;
      default:
        const exhaustiveCheck: never = this.opts.cssStrategy;
        throw new Error(`unhandled case: ${exhaustiveCheck}`);
    }

    renderTemplate({
      inputPath: "new-project-processor/app/layout.tsx.hbs",
      outputPath: "app/layout.tsx",
      stripClassNames: false,
    });

    renderTemplate({
      inputPath: "new-project-processor/app/page.tsx.hbs",
      outputPath: "app/page.tsx",
    });

    renderTemplate({
      inputPath:
        "new-project-processor/components/layouts/public/public-layout.tsx.hbs",
      outputPath: "components/layouts/public/public-layout.tsx",
    });

    renderTemplate({
      inputPath:
        "new-project-processor/components/layouts/public/public-header.tsx.hbs",
      outputPath: "components/layouts/public/public-header.tsx",
    });

    renderTemplate({
      inputPath:
        "new-project-processor/components/layouts/public/public-content.tsx.hbs",
      outputPath: "components/layouts/public/public-content.tsx",
    });

    renderTemplate({
      inputPath:
        "new-project-processor/components/layouts/public/public-footer.tsx.hbs",
      outputPath: "components/layouts/public/public-footer.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/app/(public)/layout.tsx.hbs",
      outputPath: "app/(public)/layout.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/dark-mode.tsx.hbs",
      outputPath: "components/ui/dark-mode.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/lib/file-utils.ts.hbs",
      outputPath: "lib/file-utils.ts",
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
      inputPath: "new-project-processor/components/ui/pagination.tsx.hbs",
      outputPath: "components/ui/pagination.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/eslint.config.mjs.hbs",
      outputPath: "eslint.config.mjs",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/search-input.tsx.hbs",
      outputPath: "components/ui/search-input.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/lib/search-params-utils.ts.hbs",
      outputPath: "lib/search-params-utils.ts",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/sortable.tsx.hbs",
      outputPath: "components/ui/sortable.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/button.tsx.hbs",
      outputPath: "components/ui/button.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/checkbox.tsx.hbs",
      outputPath: "components/ui/checkbox.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/input.tsx.hbs",
      outputPath: "components/ui/input.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/label.tsx.hbs",
      outputPath: "components/ui/label.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/select.tsx.hbs",
      outputPath: "components/ui/select.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/table.tsx.hbs",
      outputPath: "components/ui/table.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/textarea.tsx.hbs",
      outputPath: "components/ui/textarea.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/dashboard-layout.tsx.hbs",
      outputPath: "components/ui/dashboard-layout.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/page-layout.tsx.hbs",
      outputPath: "components/ui/page-layout.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/form.tsx.hbs",
      outputPath: "components/ui/form.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/card.tsx.hbs",
      outputPath: "components/ui/card.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/avatar.tsx.hbs",
      outputPath: "components/ui/avatar.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/alert.tsx.hbs",
      outputPath: "components/ui/alert.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/components/ui/flash-message.tsx.hbs",
      outputPath: "components/ui/flash-message.tsx",
    });

    renderTemplate({
      inputPath: "new-project-processor/lib/utils.ts.hbs",
      outputPath: "lib/utils.ts",
      data: {
        tailwind: this.opts.cssStrategy === "tailwind",
      },
    });

    appendToFileIfTextNotExists(".gitignore", "uploads/", "uploads/");

    appendToEnvLocal(
      "NEXT_PUBLIC_UPLOAD_BASE_URL",
      "http://localhost:3000/uploads"
    );
  }

  printCompletionMessage() {}
}

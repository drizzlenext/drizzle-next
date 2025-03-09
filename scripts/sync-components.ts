/**
 * this script syncs the following:
 * - drizzle-ui files to drizzle-next as hbs template
 * - drizzle-ui files to drizzle-admin
 * - the (admin) route group files of drizzle-admin over to example
 *
 * paths and various texts can be replaced via a replaceFn
 */

import * as fs from "fs";
import * as path from "path";

function copyFiles(
  srcDir: string,
  destDir: string,
  opts: { appendExt?: string; replaceFn?: (content: string) => string }
) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = entry.isDirectory()
      ? path.join(destDir, entry.name)
      : path.join(
          destDir,
          entry.name + (opts?.appendExt ? opts.appendExt : "")
        );

    if (entry.isDirectory()) {
      copyFiles(srcPath, destPath, opts);
    } else {
      let content = fs.readFileSync(srcPath, "utf-8");
      if (opts.replaceFn) {
        content = opts.replaceFn(content);
      }
      fs.writeFileSync(destPath, content);
      console.log(`Copied ${srcPath} to ${destPath}`);
    }
  }
}

// copy the entire drizzle-ui src over to drizzle-next as hbs templates
const sourceDir = path.resolve(__dirname, "../drizzle-ui/src");
const targetDir = path.resolve(
  __dirname,
  "../drizzle-next/templates/drizzle-ui"
);
copyFiles(sourceDir, targetDir, {
  appendExt: ".hbs",
  replaceFn: (content) => {
    content = content.replaceAll(/..\/..\/lib\/utils/g, "@/lib/utils");
    // double curly braces is meaningful in handlebars
    content = content.replaceAll(/{{/g, "{ {");
    content = content.replaceAll(/}}/g, "} }");
    return content;
  },
});

// copy the entire drizzle-ui src dir over to drizzle-admin
const sourceDir2 = path.resolve(__dirname, "../drizzle-ui/src");
const targetDir2 = path.resolve(__dirname, "../drizzle-admin/src/drizzle-ui");
copyFiles(sourceDir2, targetDir2, {
  replaceFn: (content) => {
    content = content.replaceAll(/{{/g, "{ {");
    content = content.replaceAll(/}}/g, "} }");
    return content;
  },
});

// copy the entire (admin) route group from drizzle-admin to example
const sourceDir3 = path.resolve(__dirname, "../drizzle-admin/app/(admin)");
const targetDir3 = path.resolve(__dirname, "../example/app/(admin)");
copyFiles(sourceDir3, targetDir3, {
  replaceFn: (content) => {
    content = content.replaceAll(
      `@/src/styles/styles.css`,
      `drizzle-admin/styles`
    );
    content = content.replaceAll(
      "Drizzle Admin Development",
      "Drizzle Admin Example"
    );
    content = content.replaceAll("@/src", "drizzle-admin");
    return content;
  },
});

console.log("Sync complete.");

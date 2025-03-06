import * as fs from "fs";
import * as path from "path";

function copyFiles(
  srcDir: string,
  destDir: string,
  opts: { appendExt?: string; utilsPath: string }
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
      content = content.replace(/..\/..\/lib\/utils/g, opts.utilsPath);
      // double curly braces is meaningful in handlebars. adding a space fixes the issue.
      content = content.replace(/{{/g, "{ {");
      content = content.replace(/}}/g, "} }");
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
  utilsPath: "@/lib/utils",
});

// copy the entire drizzle-ui src dir over to drizzle-admin
const sourceDir2 = path.resolve(__dirname, "../drizzle-ui/src");
const targetDir2 = path.resolve(__dirname, "../drizzle-admin/src/drizzle-ui");
copyFiles(sourceDir2, targetDir2, { utilsPath: "../../lib/utils" });

console.log("Sync complete.");

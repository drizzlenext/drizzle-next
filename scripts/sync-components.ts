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
    const ext = opts?.appendExt ? opts.appendExt : "";
    const destPath = path.join(destDir, entry.name + ext);

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

// copy the components from drizzle-ui over to drizzle-next
const sourceDir = path.resolve(__dirname, "../drizzle-ui/src/components/ui");
const targetDir = path.resolve(
  __dirname,
  "../drizzle-next/templates/new-project-processor/components/ui"
);
copyFiles(sourceDir, targetDir, {
  appendExt: ".hbs",
  utilsPath: "@/lib/utils",
});

// copy the styles from drizzle-ui over to drizzle-next
const srcStyles = path.resolve(__dirname, "../drizzle-ui/src/styles.css");
const destStyles = path.resolve(
  __dirname,
  "../drizzle-next/templates/new-project-processor/app/globals.css.hbs"
);
fs.copyFileSync(srcStyles, destStyles);
console.log(`Copied ${srcStyles} to ${destStyles}`);

// copy the entire drizzle-ui src dir over to drizzle-admin
const sourceDir2 = path.resolve(__dirname, "../drizzle-ui/src");
const targetDir2 = path.resolve(__dirname, "../drizzle-admin/src/drizzle-ui");
copyFiles(sourceDir2, targetDir2, { utilsPath: "../../lib/utils" });

console.log("Sync complete.");

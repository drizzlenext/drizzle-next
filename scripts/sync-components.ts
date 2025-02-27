import * as fs from "fs";
import * as path from "path";

const sourceDir = path.resolve(__dirname, "../drizzle-ui/components/ui");
const targetDir = path.resolve(
  __dirname,
  "../drizzle-next/templates/new-project-processor/components/ui"
);

function copyFiles(srcDir: string, destDir: string) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name + ".hbs");

    if (entry.isDirectory()) {
      copyFiles(srcPath, destPath);
    } else {
      let content = fs.readFileSync(srcPath, "utf-8");
      content = content.replace(/.\/utils/g, "@/lib/utils");
      // double curly braces is meaningful in handlebars. adding a space fixes the issue.
      content = content.replace(/{{/g, "{ {");
      content = content.replace(/}}/g, "} }");
      fs.writeFileSync(destPath, content);
      console.log(`Copied ${srcPath} to ${destPath}`);
    }
  }
}

copyFiles(sourceDir, targetDir);
console.log("Sync complete.");

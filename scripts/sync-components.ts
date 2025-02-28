import * as fs from "fs";
import * as path from "path";

const sourceDir = path.resolve(__dirname, "../drizzle-ui/components/ui");
const targetDir = path.resolve(
  __dirname,
  "../drizzle-next/templates/new-project-processor/components/ui"
);
const targetDir2 = path.resolve(
  __dirname,
  "../drizzle-admin/package/components/ui"
);

function copyFiles(
  srcDir: string,
  destDir: string,
  opts?: { appendExt?: string }
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
      content = content.replace(/.\/utils/g, "@/lib/utils");
      // double curly braces is meaningful in handlebars. adding a space fixes the issue.
      content = content.replace(/{{/g, "{ {");
      content = content.replace(/}}/g, "} }");
      fs.writeFileSync(destPath, content);
      console.log(`Copied ${srcPath} to ${destPath}`);
    }
  }
}

copyFiles(sourceDir, targetDir, { appendExt: ".hbs" });
copyFiles(sourceDir, targetDir2);

const sourceIndexFile = path.resolve(
  __dirname,
  "../drizzle-ui/components/index.ts"
);
const targetIndexFile = path.resolve(
  __dirname,
  "../drizzle-admin/package/components/index.ts"
);

fs.copyFileSync(sourceIndexFile, targetIndexFile);
console.log(`Copied ${sourceIndexFile} to ${targetIndexFile}`);

console.log("Sync complete.");

import * as fs from "fs";
import * as path from "path";
import Handlebars from "handlebars";
import { log } from "../../common/lib/log";

export function renderTemplateIfNotExists({
  inputPath,
  outputPath,
  data,
}: {
  inputPath: string;
  outputPath: string;
  data?: any;
}) {
  const joinedOutputPath = path.join(process.cwd(), outputPath);
  if (fs.existsSync(joinedOutputPath)) {
    log.gray(`skip create ${outputPath} (file exists)`);
    return;
  }
  renderTemplate({
    inputPath,
    outputPath,
    data,
  });
}

export function renderTemplate({
  inputPath,
  outputPath,
  data,
}: {
  inputPath: string;
  outputPath: string;
  data?: any;
}) {
  let content = compileTemplate({ inputPath, data });
  const joinedOutputPath = path.join(process.cwd(), outputPath);
  const resolvedPath = path.resolve(joinedOutputPath);
  const dir = path.dirname(resolvedPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(resolvedPath, content);
  log.log("create " + outputPath);
}

export function compileTemplate({
  inputPath,
  data,
}: {
  inputPath: string;
  data?: any;
}): string {
  const templatePath = path.join(__dirname, "..", "templates", inputPath);
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  const compiled = Handlebars.compile(templateContent, { noEscape: true });
  const content = compiled(data);
  return content;
}

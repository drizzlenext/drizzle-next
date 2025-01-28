import fs from "fs";
import path from "path";

export function getFileContent(filepath: string) {
  const filePath = path.resolve(filepath);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return fileContent;
}

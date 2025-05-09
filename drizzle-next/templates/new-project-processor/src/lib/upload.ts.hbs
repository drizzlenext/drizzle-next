import path from "path";
import fs from "fs";
import crypto from "crypto";

export async function uploadFile({ file, dir }: { file: File; dir: string }) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const randomString = crypto.randomBytes(5).toString("hex"); // f48058c2e8
  const originalName = path.parse(file.name).name; // test image.png
  const sluggedName = originalName.replace(" ", "-"); // test-image.png
  const fileExt = path.extname(file.name); // .png
  const newFileName = `${sluggedName}-${randomString}${fileExt}`; // test-image-f48058c2e8.png
  const resolvedPath = path.join("uploads", dir, newFileName); // /uploads/table/column/test-image-f48058c2e8.png
  const resolvedDirPath = path.dirname(resolvedPath); // /uploads/table/column
  const fileUri = `/${dir}/${newFileName}`; // /uploads/table/column/test-image.png
  if (!fs.existsSync(resolvedDirPath)) {
    fs.mkdirSync(resolvedDirPath, { recursive: true });
  }
  fs.writeFileSync(resolvedPath, buffer);
  return fileUri;
}

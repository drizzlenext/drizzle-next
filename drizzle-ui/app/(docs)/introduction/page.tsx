import { getFileContent } from "@/lib/file-utils";
import { marked } from "marked";

export default async function Page() {
  const fileContent = getFileContent("content/introduction.md");
  const htmlContent = await marked(fileContent);

  return (
    <div
      className="flex flex-col gap-5 p-5 [&>h1]:font-bold"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
}

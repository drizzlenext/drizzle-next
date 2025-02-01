import { getFileContent } from "@/lib/file-utils";
import { marked } from "marked";

export default async function Page() {
  const fileContent = getFileContent("content/installation.md");
  const htmlContent = await marked(fileContent);

  return (
    <div
      className="flex flex-col gap-5 p-5 [&>a]:underline [&>h1]:text-4xl [&>h1]:font-bold [&>h2]:text-2xl [&>h2]:font-bold"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
}

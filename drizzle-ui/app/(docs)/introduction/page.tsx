import { getFileContent } from "@/lib/file-utils";
import { marked } from "@/lib/markdown-utils";

export default async function Page() {
  const fileContent = getFileContent("content/introduction.md");
  const htmlContent = await marked.parse(fileContent);

  return (
    <div
      className="docs flex flex-col gap-5 p-5 [&>h1]:font-bold"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
}

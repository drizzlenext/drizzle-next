import { getFileContent } from "@/lib/file-utils";
import { marked } from "@/lib/markdown-utils";

export default async function Page() {
  const fileContent = getFileContent("content/introduction.md");
  const htmlContent = await marked.parse(fileContent);

  return (
    <div
      className="prose dark:prose-invert prose-pre:bg-[#0d1117] m-auto !max-w-3xl p-4"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  );
}

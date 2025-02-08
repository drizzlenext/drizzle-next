import fs from "fs";
import path from "path";
import { getFileContent } from "@/lib/file-utils";
import { marked } from "@/lib/markdown-utils";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;

  const fileContent = getFileContent(`content/${params.id}.md`);
  const htmlContent = await marked.parse(fileContent);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
}

export async function generateStaticParams() {
  const componentsDir = path.join(process.cwd(), "content/");
  const filenames = fs.readdirSync(componentsDir);

  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({
      id: filename.replace(/\.md$/, ""),
    }));
}

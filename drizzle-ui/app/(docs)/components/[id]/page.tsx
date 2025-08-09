import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { marked } from "marked";

import { CodeBlock } from "@/src/components/ui/code-block";
import { AlertDemo } from "@/components/component-demo/alert-demo";
import { getFileContent } from "@/lib/file-utils";
import { AvatarDemo } from "@/components/component-demo/avatar-demo";
import { ButtonDemo } from "@/components/component-demo/button-demo";
import { CardDemo } from "@/components/component-demo/card-demo";
import { CheckboxDemo } from "@/components/component-demo/checkbox-demo";
import { DarkModeDemo } from "@/components/component-demo/dark-mode-demo";
import { FormDemo } from "@/components/component-demo/form-demo";
import { InputDemo } from "@/components/component-demo/input-demo";
import { LabelDemo } from "@/components/component-demo/label-demo";
import { PaginationDemo } from "@/components/component-demo/pagination-demo";
import { SearchInput } from "@/src/components/ui/search-input";
import { SelectDemo } from "@/components/component-demo/select-demo";
import { TableDemo } from "@/components/component-demo/table-demo";
import { TextareaDemo } from "@/components/component-demo/textarea-demo";
import { RichTextEditorDemo } from "@/components/component-demo/rich-text-editor-demo";
import { Suspense } from "react";
import ScrollLink from "@/components/scroll-link";

const componentMap: { [key: string]: React.ComponentType | null } = {
  alert: AlertDemo,
  avatar: AvatarDemo,
  button: ButtonDemo,
  card: CardDemo,
  checkbox: CheckboxDemo,
  "dark-mode": DarkModeDemo,
  form: FormDemo,
  input: InputDemo,
  label: LabelDemo,
  pagination: PaginationDemo,
  "search-input": SearchInput,
  select: SelectDemo,
  table: TableDemo,
  textarea: TextareaDemo,
  "rich-text-editor": RichTextEditorDemo,
};

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;

  const markdownFilePath = path.join(
    process.cwd(),
    "content/components/",
    params.id + ".md",
  );
  if (!fs.existsSync(markdownFilePath)) {
    notFound();
  }
  const fileContent = getFileContent(markdownFilePath);

  const { content, data } = matter(fileContent);

  const htmlContent = await marked(content);

  const codeProp = data.code;

  const codeBlocks = [];
  if (typeof codeProp === "string") {
    const code = convertRelativeImportsToAlias(getFileContent(data.code));
    codeBlocks.push({
      code: code,
      path: data.code,
    });
  } else if (codeProp instanceof Array) {
    for (const codePath of codeProp) {
      const code = convertRelativeImportsToAlias(getFileContent(codePath));
      codeBlocks.push({
        code: code,
        path: codePath,
      });
    }
  }

  const usage = getFileContent(data.usage).replaceAll("@/src/", "@/");

  const DynamicComponent = componentMap[params.id] || null;

  return (
    <div className="p-3">
      <div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_192px]">
          <div className="min-w-0 flex-grow">
            <div className="typography">
              <h1>{data.title}</h1>
              <h2 id="description">Description</h2>
              <div className="mb-5">{data.description}</div>
              {htmlContent && (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              )}
            </div>
            {DynamicComponent && (
              <div className="mb-5">
                <div className="typography">
                  <h2 id="preview">Preview</h2>
                </div>
                <div className="border-border flex flex-col border p-5">
                  <Suspense>
                    <DynamicComponent />
                  </Suspense>
                </div>
              </div>
            )}
            <div className="typography">
              <h2 id="installation">Installation</h2>
              <p>Add component:</p>
              <CodeBlock
                language="bash"
                code={`npx drizzle-ui@latest add ${params.id}`}
              />
              {data.dependencies && (
                <>
                  <p>Install dependencies:</p>
                  <CodeBlock
                    language="bash"
                    code={`npm i ${data.dependencies.join(" ")}`}
                  />
                </>
              )}
              {data.dev_dependencies && (
                <>
                  <p>Install dev dependencies:</p>
                  <CodeBlock
                    language="bash"
                    code={`npm i -D ${data.dev_dependencies.join(" ")}`}
                  />
                </>
              )}
              <h2 id="usage">Usage</h2>
              <CodeBlock language="ts" code={usage} />
              <h2 id="code">Code</h2>
              {codeBlocks.map((codeBlock) => (
                <div key={codeBlock.path}>
                  <p>{codeBlock.path.split("/").slice(1).join("/")}</p>
                  <CodeBlock
                    language={getExtFromPath(codeBlock.path)}
                    code={codeBlock.code}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="sticky top-15 hidden self-start lg:block">
            <h4 className="font-semibold">On this page</h4>
            <div className="flex flex-col">
              <ScrollLink href="#description">Description</ScrollLink>
              {DynamicComponent && (
                <ScrollLink href="#preview">Preview</ScrollLink>
              )}
              <ScrollLink href="#installation">Installation</ScrollLink>
              <ScrollLink href="#usage">Usage</ScrollLink>
              <ScrollLink href="#code">Code</ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const componentsDir = path.join(process.cwd(), "content/components");
  const filenames = fs.readdirSync(componentsDir);

  return filenames.map((filename) => ({
    id: filename.replace(/\.md$/, ""),
  }));
}

function getExtFromPath(filePath: string): string {
  return path.extname(filePath).slice(1);
}

function convertRelativeImportsToAlias(filePath: string) {
  return filePath
    .replace("../../lib/", "@/lib/")
    .replace("../../styles/", "@/styles/");
}

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
import { PageLayoutDemo } from "@/components/component-demo/page-layout-demo";
import { PaginationDemo } from "@/components/component-demo/pagination-demo";
import { SearchInput } from "@/src/components/ui/search-input";
import { SelectDemo } from "@/components/component-demo/select-demo";
import { SortableDemo } from "@/components/component-demo/sortable-demo";
import { TableDemo } from "@/components/component-demo/table-demo";
import { TextareaDemo } from "@/components/component-demo/textarea-demo";
import { RichTextEditorDemo } from "@/components/component-demo/rich-text-editor-demo";
import { Suspense } from "react";
import { PageContent, PageHeader, PageLayout } from "@/src/index";

const componentMap: { [key: string]: React.ComponentType | null } = {
  alert: AlertDemo,
  avatar: AvatarDemo,
  button: ButtonDemo,
  card: CardDemo,
  checkbox: CheckboxDemo,
  "dark-mode": DarkModeDemo,
  "dashboard-layout": null,
  form: FormDemo,
  input: InputDemo,
  label: LabelDemo,
  "page-layout": PageLayoutDemo,
  pagination: PaginationDemo,
  "search-input": SearchInput,
  select: SelectDemo,
  sortable: SortableDemo,
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
    <PageLayout>
      <PageHeader>{data.title}</PageHeader>
      <PageContent className="typography">
        <div className="mb-5">{data.description}</div>
        {htmlContent && (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )}
        {DynamicComponent && (
          <div className="mb-5">
            <h2>Preview</h2>
            <div className="border-border flex flex-col border p-5">
              <Suspense>
                <DynamicComponent />
              </Suspense>
            </div>
          </div>
        )}
        <h2>Installation</h2>
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
        <h2>Usage</h2>
        <CodeBlock language="ts" code={usage} />
        <h2>Source Code</h2>
        {codeBlocks.map((codeBlock) => (
          <div key={codeBlock.path}>
            <p>{codeBlock.path.split("/").slice(1).join("/")}</p>
            <CodeBlock
              language={getExtFromPath(codeBlock.path)}
              code={codeBlock.code}
            />
          </div>
        ))}
      </PageContent>
    </PageLayout>
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

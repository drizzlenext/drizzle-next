import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { marked } from "marked";

import { ComponentCode } from "@/components/component-layout/component-code";
import { AlertDemo } from "@/components/component-demo/alert-demo";
import { getFileContent } from "@/lib/file-utils";
import { AvatarDemo } from "@/components/component-demo/avatar-demo";
import { ButtonDemo } from "@/components/component-demo/button-demo";
import { CardDemo } from "@/components/component-demo/card-demo";
import { CheckboxDemo } from "@/components/component-demo/checkbox-demo";
import { DarkModeDemo } from "@/components/component-demo/dark-mode-demo";
import { FlashMessageDemo } from "@/components/component-demo/flash-message-demo";
import { FormDemo } from "@/components/component-demo/form-demo";
import { InputDemo } from "@/components/component-demo/input-demo";
import { LabelDemo } from "@/components/component-demo/label-demo";
import { PageLayoutDemo } from "@/components/component-demo/page-layout-demo";
import { PaginationDemo } from "@/components/component-demo/pagination-demo";
import { SearchInput } from "@/components/ui/search-input";
import { SelectDemo } from "@/components/component-demo/select-demo";
import { SortableDemo } from "@/components/component-demo/sortable-demo";
import { TableDemo } from "@/components/component-demo/table-demo";
import { TextareaDemo } from "@/components/component-demo/textarea-demo";
import { Suspense } from "react";
import { PageContent, PageHeader, PageLayout, PageTitle } from "@/components";

const componentMap: { [key: string]: React.ComponentType | null } = {
  alert: AlertDemo,
  avatar: AvatarDemo,
  button: ButtonDemo,
  card: CardDemo,
  checkbox: CheckboxDemo,
  "dark-mode": DarkModeDemo,
  "dashboard-layout": null,
  "flash-message": FlashMessageDemo,
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

  const code = getFileContent(data.code).replace("./utils", "@/lib/utils");
  const usage = getFileContent(data.usage);

  const DynamicComponent = componentMap[params.id] || null;

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>{data.title}</PageTitle>
      </PageHeader>
      <PageContent className="flex flex-col gap-5">
        <div>{data.description}</div>
        {htmlContent && (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )}
        {DynamicComponent && (
          <div className="preview">
            <h2>Preview</h2>
            <div className="not-prose border-muted-300 dark:border-muted-600 flex flex-col gap-5 rounded border p-5">
              <Suspense>
                <DynamicComponent />
              </Suspense>
            </div>
          </div>
        )}
        <h2>Installation</h2>
        <ComponentCode
          language="bash"
          code={`npx drizzle-ui@latest add ${params.id}`}
        />
        <h2>Usage</h2>
        <ComponentCode language="ts" code={usage} />
        <h2>Source Code</h2>
        <ComponentCode language="ts" code={code} />
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

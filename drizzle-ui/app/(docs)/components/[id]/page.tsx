import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { marked } from "marked";

import { ComponentCode } from "@/components/component-layout/component-code";
import { ComponentDescription } from "@/components/component-layout/component-description";
import { ComponentPage } from "@/components/component-layout/component-page";
import { ComponentPreview } from "@/components/component-layout/component-preview";
import { ComponentTitle } from "@/components/component-layout/component-title";

import { AlertDemo } from "@/components/component-demo/alert-demo";
import { getFileContent } from "@/lib/file-utils";

import { AvatarDemo } from "@/components/component-demo/avatar-demo";
import { ButtonDemo } from "@/components/component-demo/button-demo";
import { CardDemo } from "@/components/component-demo/card-demo";
import { CheckboxDemo } from "@/components/component-demo/checkbox-demo";
import { DarkModeDemo } from "@/components/component-demo/dark-mode-demo";
import { FlashMessageDemo } from "@/components/component-demo/flash-message-demo";
import { ComponentContent } from "@/components/component-layout/component-content";
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

const componentMap: { [key: string]: React.ComponentType } = {
  alert: AlertDemo,
  avatar: AvatarDemo,
  button: ButtonDemo,
  card: CardDemo,
  checkbox: CheckboxDemo,
  "dark-mode": DarkModeDemo,
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
    "content",
    params.id + ".md",
  );
  if (!fs.existsSync(markdownFilePath)) {
    notFound();
  }
  const fileContent = getFileContent(markdownFilePath);

  const { content, data } = matter(fileContent);

  const htmlContent = await marked(content);

  const code = getFileContent(data.code);
  const usage = getFileContent(data.usage);

  const DynamicComponent = componentMap[params.id] || null;

  return (
    <ComponentPage>
      <ComponentTitle>{data.title}</ComponentTitle>
      <ComponentDescription>{data.description}</ComponentDescription>
      <ComponentContent htmlContent={htmlContent} />
      <ComponentPreview>
        <DynamicComponent />
      </ComponentPreview>
      <ComponentCode language="ts" code={code} title="Code" />
      <ComponentCode language="ts" code={usage} title="Usage" />
    </ComponentPage>
  );
}

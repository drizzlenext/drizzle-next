import { ComponentCode } from "@/components/component-layout/component-code";
import { ComponentDescription } from "@/components/component-layout/component-description";
import { ComponentPage } from "@/components/component-layout/component-page";
import { ComponentPreview } from "@/components/component-layout/component-preview";
import { ComponentTitle } from "@/components/component-layout/component-title";
import { AlertDemo } from "@/components/component-demo/alert-demo";
import { getFileContent } from "@/lib/file-utils";

const code = getFileContent("components/ui/alert.tsx");
const usage = getFileContent("components/component-demo/alert-demo.tsx");

export default function Page() {
  return (
    <ComponentPage>
      <ComponentTitle>Alert</ComponentTitle>
      <ComponentDescription>An alert</ComponentDescription>
      <ComponentPreview>
        <AlertDemo />
      </ComponentPreview>
      <ComponentCode language="ts" code={code} title="Code" />
      <ComponentCode language="ts" code={usage} title="Usage" />
    </ComponentPage>
  );
}

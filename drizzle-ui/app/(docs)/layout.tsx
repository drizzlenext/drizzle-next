import { DocsContent } from "@/components/layouts/docs/docs-content";
import { DocsHeader } from "@/components/layouts/docs/docs-header";
import { DocsLayout } from "@/components/layouts/docs/docs-layout";
import { DocsSidebar } from "@/components/layouts/docs/docs-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout>
      <DocsHeader />
      <DocsSidebar />
      <DocsContent>{children}</DocsContent>
    </DocsLayout>
  );
}

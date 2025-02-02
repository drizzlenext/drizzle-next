import { DocsContent } from "@/components/docs-layout/docs-content";
import { DocsHeader } from "@/components/docs-layout/docs-header";
import { DocsShell } from "@/components/docs-layout/docs-shell";
import { DocsSidebar } from "@/components/docs-layout/docs-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsShell>
      <DocsHeader />
      <DocsSidebar />
      <DocsContent>{children}</DocsContent>
    </DocsShell>
  );
}

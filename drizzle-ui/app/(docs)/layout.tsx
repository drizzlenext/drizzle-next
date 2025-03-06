import { DocsLayout } from "@/components/layouts/docs-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocsLayout>{children}</DocsLayout>;
}

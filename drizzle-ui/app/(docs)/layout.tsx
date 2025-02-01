import { CodeHighlight } from "@/components/docs/code-highlight";
import { Header } from "@/components/docs/header";
import { Shell } from "@/components/docs/shell";
import { Sidebar } from "@/components/docs/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Shell>
      <Header />
      <Sidebar />
      <div className="docs overflow-auto">{children}</div>
      <CodeHighlight />
    </Shell>
  );
}

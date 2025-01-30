import { CodeHighlight } from "@/components/code-highlight";
import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Shell>
      <Header />
      <Sidebar />
      <div className="overflow-auto">{children}</div>
      <CodeHighlight />
    </Shell>
  );
}

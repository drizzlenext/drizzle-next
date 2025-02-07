import { DashboardContent } from "@/components/ui/dashboard-layout";
import { ReactNode } from "react";

export function DocsContent({ children }: { children: ReactNode }) {
  return (
    <DashboardContent className="docs [&_h1]:text-4xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold">
      {children}
    </DashboardContent>
  );
}

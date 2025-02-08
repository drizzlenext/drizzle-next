import { DashboardContent } from "@/components/ui/dashboard-layout";
import { ReactNode } from "react";

export function DocsContent({ children }: { children: ReactNode }) {
  return <DashboardContent>{children}</DashboardContent>;
}

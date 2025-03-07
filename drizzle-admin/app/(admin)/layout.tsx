import { config } from "@/drizzle-admin.config";
import { AdminLayout } from "./admin-layout";
import "drizzle-admin/styles";
import { completeLayoutConfig } from "@/src/lib/server-utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const layoutConfig = completeLayoutConfig(config);
  return <AdminLayout config={layoutConfig}>{children}</AdminLayout>;
}

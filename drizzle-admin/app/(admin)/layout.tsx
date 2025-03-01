import { config } from "@/drizzle-admin.config";
import { DrizzleAdminLayout } from "@/src/drizzle-admin-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DrizzleAdminLayout config={config}>{children}</DrizzleAdminLayout>;
}

import { config } from "@/drizzle-admin.config";
import { DrizzleAdminLayout } from "@/src/components";
import "drizzle-admin/styles";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DrizzleAdminLayout config={config}>{children}</DrizzleAdminLayout>;
}

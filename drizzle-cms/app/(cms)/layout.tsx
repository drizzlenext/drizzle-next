import { config } from "@/drizzle-cms.config";
import { DrizzleCmsLayout } from "@/package/drizzle-cms-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DrizzleCmsLayout config={config}>{children}</DrizzleCmsLayout>;
}

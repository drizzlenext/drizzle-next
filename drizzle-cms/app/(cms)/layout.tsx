import { config } from "@/drizzle-cms.config";
import { DrizzleCmsLayout } from "@/package/drizzle-cms-layout";
import { completeLayoutConfig } from "@/package/utils/server-utils";
import "drizzle-ui/styles";

export default function Layout({ children }: { children: React.ReactNode }) {
  const layoutConfig = completeLayoutConfig(config);
  return <DrizzleCmsLayout config={layoutConfig}>{children}</DrizzleCmsLayout>;
}

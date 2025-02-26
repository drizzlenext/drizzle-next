import { DrizzleCmsLayoutClient } from "@/package/drizzle-cms-layout-client";
import { completeLayoutConfig } from "@/package/utils/server-utils";
import { DrizzleCmsConfig } from "./types";
import "drizzle-ui/styles";

export function DrizzleCmsLayout({
  children,
  config,
}: {
  children: React.ReactNode;
  config: DrizzleCmsConfig;
}) {
  const layoutConfig = completeLayoutConfig(config);
  return (
    <DrizzleCmsLayoutClient config={layoutConfig}>
      {children}
    </DrizzleCmsLayoutClient>
  );
}

import { DrizzleAdminLayoutClient } from "@/src/drizzle-admin-layout-client";
import { completeLayoutConfig } from "@/src/utils/server-utils";
import { DrizzleAdminConfig } from "./types";
import "drizzle-ui/styles";

export function DrizzleAdminLayout({
  children,
  config,
}: {
  children: React.ReactNode;
  config: DrizzleAdminConfig;
}) {
  const layoutConfig = completeLayoutConfig(config);
  return (
    <DrizzleAdminLayoutClient config={layoutConfig}>
      {children}
    </DrizzleAdminLayoutClient>
  );
}

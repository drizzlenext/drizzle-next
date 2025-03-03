import { DrizzleAdminLayoutClient } from "./drizzle-admin-layout-client";
import { completeLayoutConfig } from "../lib/server-utils";
import { DrizzleAdminConfig } from "../types/types";
import { DarkModeScript } from "../drizzle-ui";

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
      <DarkModeScript />
    </DrizzleAdminLayoutClient>
  );
}

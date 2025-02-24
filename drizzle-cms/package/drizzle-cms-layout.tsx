"use client";

import {
  DashboardLayout,
  DashboardHeader,
  DashboardTitle,
  DashboardSidebarToggle,
  DashboardContent,
  DashboardSidebar,
  DashboardSidebarItem,
  DashboardNav,
  DashboardNavToggle,
  DashboardSidebarGroup,
  DashboardSidebarLabel,
  DarkModeToggle,
} from "drizzle-ui";
import Link from "next/link";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DrizzleCmsLayoutConfig } from "./types";

export function DrizzleCmsLayout({
  children,
  config,
}: {
  children: ReactNode;
  config: DrizzleCmsLayoutConfig;
}) {
  const pathname = usePathname();

  const tables = Object.values(config.sidebarTables).map((item) => ({
    label: item.label,
    path: item.path,
  }));

  return (
    <DashboardLayout>
      <DashboardHeader>
        <DashboardTitle>
          <DashboardSidebarToggle />
          drizzle-cms
        </DashboardTitle>
        <DashboardNav>
          <DarkModeToggle />
        </DashboardNav>
        <DashboardNavToggle />
      </DashboardHeader>
      <DashboardSidebar>
        <DashboardSidebarGroup>
          <DashboardSidebarLabel>Tables</DashboardSidebarLabel>
          {tables.map((table) => (
            <Link key={table.path} href={`${config.basePath}/${table.path}`}>
              <DashboardSidebarItem
                active={`${config.basePath}/${table.path}` === pathname}
              >
                {table.label}
              </DashboardSidebarItem>
            </Link>
          ))}
        </DashboardSidebarGroup>
      </DashboardSidebar>
      <DashboardContent>{children}</DashboardContent>
    </DashboardLayout>
  );
}

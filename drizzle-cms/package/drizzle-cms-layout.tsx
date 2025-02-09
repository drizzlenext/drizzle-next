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
} from "drizzle-ui";
import Link from "next/link";

import { ReactNode } from "react";
import { DrizzleCmsLayoutConfig } from "./drizzle-cms";
import { usePathname } from "next/navigation";

export function DrizzleCmsLayout({
  children,
  config,
}: {
  children: ReactNode;
  config: DrizzleCmsLayoutConfig;
}) {
  const pathname = usePathname();

  const tables = Object.values(config.schema).map((schema) => ({
    label: schema.label,
    path: schema.path,
  }));

  console.log(tables);

  return (
    <DashboardLayout>
      <DashboardHeader>
        <DashboardTitle>
          <DashboardSidebarToggle />
          drizzle-cms
        </DashboardTitle>
        <DashboardNav>nav</DashboardNav>
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

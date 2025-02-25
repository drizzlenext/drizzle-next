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
import { DrizzleCmsLayoutConfig, SidebarItem } from "./types";

export function DrizzleCmsLayout({
  children,
  config,
}: {
  children: ReactNode;
  config: DrizzleCmsLayoutConfig;
}) {
  const pathname = usePathname();

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
        {renderSidebarItems(pathname, config.sidebar)}
      </DashboardSidebar>
      <DashboardContent>{children}</DashboardContent>
    </DashboardLayout>
  );
}

function renderSidebarItems(pathname: string, sidebarItems?: SidebarItem[]) {
  if (!sidebarItems) return null;

  return (
    <DashboardSidebarGroup>
      {sidebarItems.map((item) => {
        if (item.link) {
          return (
            <div key={item.text}>
              <Link href={item.link}>
                <DashboardSidebarItem active={pathname === item.link}>
                  {item.icon ? item.icon : null}
                  {item.text}
                </DashboardSidebarItem>
              </Link>

              {renderSidebarItems(pathname, item.items)}
            </div>
          );
        } else {
          return (
            <div key={item.text}>
              <DashboardSidebarLabel>
                {item.icon ? item.icon : null}
                {item.text}
              </DashboardSidebarLabel>

              {renderSidebarItems(pathname, item.items)}
            </div>
          );
        }
      })}
    </DashboardSidebarGroup>
  );
}

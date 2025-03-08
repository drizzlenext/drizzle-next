"use client";

import {
  DashboardLayout,
  DashboardHeader,
  DashboardTitle,
  DashboardSidebarToggle,
  DashboardContent,
  DashboardSidebar,
  DashboardNav,
  DashboardNavToggle,
  DarkModeToggle,
  DashboardSidebarList,
  DashboardNavList,
} from "../../src/drizzle-ui";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DrizzleLayoutConfig } from "@/src";
import { LogOutIcon, SettingsIcon, Table2Icon, UserIcon } from "lucide-react";

const config: DrizzleLayoutConfig = {
  nav: [
    { text: "Settings", link: "/settings", icon: SettingsIcon },
    { text: "Sign Out", link: "/signout", icon: LogOutIcon },
  ],
  sidebar: [
    {
      text: "Custom Page",
      link: "/admin/custom-page",
      icon: Table2Icon,
    },
    {
      text: "Custom Group",
      icon: Table2Icon,
      items: [{ text: "A custom link", link: "/", icon: Table2Icon }],
    },
    {
      text: "Tables",
      items: [
        { text: "Users", link: "/admin/users", icon: UserIcon },
        { text: "Posts", link: "/admin/posts", icon: Table2Icon },
        {
          text: "Categories",
          link: "/admin/categories",
          icon: Table2Icon,
        },
        { text: "Tags", link: "/admin/tags", icon: Table2Icon },
        {
          text: "Post Tags",
          link: "/admin/posts-tags",
          icon: Table2Icon,
        },
      ],
    },
  ],
};

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <DashboardLayout>
      <DashboardHeader>
        <DashboardTitle>
          <DashboardSidebarToggle />
          Drizzle Admin Development
        </DashboardTitle>
        <DashboardNav>
          <DashboardNavList items={config.nav} pathname={pathname} />
          <DarkModeToggle />
        </DashboardNav>
        <DashboardNavToggle />
      </DashboardHeader>
      <DashboardSidebar>
        <DashboardSidebarList items={config.sidebar} pathname={pathname} />
      </DashboardSidebar>
      <DashboardContent>{children}</DashboardContent>
    </DashboardLayout>
  );
}

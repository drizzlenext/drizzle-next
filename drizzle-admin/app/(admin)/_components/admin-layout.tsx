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
} from "@/src/drizzle-ui";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DrizzleLayoutConfig } from "@/src/types";
import {
  GaugeIcon,
  GroupIcon,
  HomeIcon,
  LogOutIcon,
  NotebookTextIcon,
  SettingsIcon,
  Table2Icon,
  UserIcon,
} from "lucide-react";

const config: DrizzleLayoutConfig = {
  nav: [
    { text: "Settings", link: "/settings", icon: SettingsIcon },
    { text: "Sign Out", link: "/signout", icon: LogOutIcon },
  ],
  sidebar: [
    {
      text: "Admin",
      link: "/admin",
      icon: GaugeIcon,
    },
    { text: "Home", link: "/", icon: HomeIcon },
    {
      text: "Custom Group",
      icon: GroupIcon,
      items: [
        {
          text: "Custom Page",
          link: "/admin/custom-page",
          icon: NotebookTextIcon,
        },
      ],
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

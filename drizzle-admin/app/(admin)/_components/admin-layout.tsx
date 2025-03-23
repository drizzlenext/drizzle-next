"use client";

import {
  AppLayout,
  AppHeader,
  AppSidebarToggle,
  AppContent,
  AppSidebar,
  AppNav,
  AppNavToggle,
  DarkModeToggle,
  AppSidebarList,
  AppNavList,
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
import { AppHeaderGroup } from "@/src/drizzle-ui/components/ui/app-layout";

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
    { text: "Home", link: "/", icon: HomeIcon, target: "_top" },
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
    <AppLayout>
      <AppHeader>
        <AppHeaderGroup>
          <AppSidebarToggle />
          Drizzle Admin Development
        </AppHeaderGroup>
        <AppHeaderGroup>
          <AppNav>
            <AppNavList items={config.nav} pathname={pathname} />
            <DarkModeToggle />
          </AppNav>
        </AppHeaderGroup>
        <AppNavToggle />
      </AppHeader>
      <AppSidebar>
        <AppSidebarList items={config.sidebar} pathname={pathname} />
      </AppSidebar>
      <AppContent>{children}</AppContent>
    </AppLayout>
  );
}

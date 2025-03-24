"use client";

import {
  AppLayout,
  AppHeader,
  AppHeaderGroup,
  AppSidebarToggle,
  AppContent,
  AppSidebar,
  AppNav,
  AppNavToggle,
  DarkModeToggle,
  AppSidebarList,
  AppNavList,
  DropdownMenu,
  Avatar,
  DropdownMenuList,
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
    { text: "Home", link: "/", icon: HomeIcon },
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
  dropdown: [{ text: "Settings", link: "/settings", icon: SettingsIcon}, { text: "Sign Out", link: "/signout", icon: LogOutIcon}]
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
          <AppNavToggle />
          <DropdownMenu buttonEl={<Avatar src="https://drizzlenext.github.io/drizzle-assets/avatar.png" />} buttonSizeVariant="avatar" buttonVariant="ghost">
            <DropdownMenuList items={config.dropdown} />
          </ DropdownMenu>
        </AppHeaderGroup>
      </AppHeader>
      <AppSidebar>
        <AppSidebarList items={config.sidebar} pathname={pathname} />
      </AppSidebar>
      <AppContent>{children}</AppContent>
    </AppLayout>
  );
}

"use client";

import {
  Avatar,
  AppLayout,
  AppHeader,
  AppHeaderGroup,
  AppNav,
  AppNavToggle,
  AppNavList,
  AppSidebar,
  AppSidebarToggle,
  AppSidebarList,
  AppContent,
  DarkModeToggle,
  DropdownMenu,
  DropdownMenuList,
} from "drizzle-admin/drizzle-ui";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DrizzleLayoutConfig } from "drizzle-admin/types";
import {
  LogOutIcon,
  UserIcon,
  GaugeIcon,
  SettingsIcon,
} from "lucide-react";
import { User } from "@/schema/users";

const config: DrizzleLayoutConfig = {
  nav: [{ text: "Home", link: "/" }],
  sidebar: [
    {
      text: "Admin",
      items: [
        {
          text: "Admin Dashboard",
          link: "/admin",
          icon: GaugeIcon,
        },
        { text: "Users", link: "/admin/users", icon: UserIcon },
      ],
    },
  ],
  dropdown: [
    { text: "Settings", link: "/admin/settings", icon: SettingsIcon },
    { text: "Sign out", link: "/signout", icon: LogOutIcon },
  ],
};

export function AdminLayout({
  children,
  userRow,
}: {
  children: ReactNode;
  userRow: User;
}) {
  const pathname = usePathname();

  return (
    <AppLayout>
      <AppHeader>
        <AppHeaderGroup>
          <AppSidebarToggle />
          Drizzle Admin
        </AppHeaderGroup>
        <AppHeaderGroup>
          <AppNav>
            <AppNavList items={config.nav} pathname={pathname} />
            <DarkModeToggle />
          </AppNav>
          <AppNavToggle />
          <DropdownMenu
            buttonEl={<Avatar src={userRow.image} />}
            buttonSizeVariant="avatar"
            buttonVariant="ghost"
          >
            <DropdownMenuList items={config.dropdown} />
          </DropdownMenu>
        </AppHeaderGroup>
      </AppHeader>
      <AppSidebar>
        <AppSidebarList items={config.sidebar} pathname={pathname} />
      </AppSidebar>
      <AppContent>{children}</AppContent>
    </AppLayout>
  );
}

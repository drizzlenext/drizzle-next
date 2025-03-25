"use client";

import {
  AppContent,
  AppHeader,
  AppHeaderGroup,
  AppLayout,
  AppNav,
  AppNavToggle,
  AppSidebar,
  AppSidebarList,
  AppSidebarToggle,
} from "@/components/ui/app-layout";
import {
  User2Icon,
  LogOutIcon,
  LayoutDashboardIcon,
  UserIcon,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { User } from "@/schema/users";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuList } from "@/components/ui/dropdown-menu";
import { DarkModeToggle } from "@/components/ui/dark-mode";

const sidebar = [
  { text: "Dashboard", link: "/dashboard", icon: LayoutDashboardIcon },
];

const dropdown = [
  { text: "Profile", link: "/profile", icon: UserIcon },
  { text: "Sign out", link: "/signout", icon: LogOutIcon },
];

export function PrivateLayout({
  userRow,
  children,
}: {
  userRow: User;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AppLayout variant="container">
      <AppHeader>
        <AppHeaderGroup>
          <AppSidebarToggle /> Drizzle Next
        </AppHeaderGroup>
        <AppHeaderGroup>
          <AppNav>
            <DarkModeToggle />
          </AppNav>
          <AppNavToggle />
          <DropdownMenu
            buttonEl={
              <Avatar src={userRow.image}>
                <User2Icon />
              </Avatar>
            }
            buttonSizeVariant="avatar"
            buttonVariant="ghost"
          >
            <DropdownMenuList items={dropdown} />
          </DropdownMenu>
        </AppHeaderGroup>
      </AppHeader>
      <AppSidebar>
        <AppSidebarList items={sidebar} />
      </AppSidebar>
      <AppContent>{children}</AppContent>
    </AppLayout>
  );
}

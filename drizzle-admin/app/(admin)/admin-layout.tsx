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
} from "../../src/drizzle-ui";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Table2Icon, UserIcon } from "lucide-react";

const items = [
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
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <DashboardLayout>
      <DashboardHeader>
        <DashboardTitle>
          <DashboardSidebarToggle />
          Drizzle Admin
        </DashboardTitle>
        <DashboardNav>
          <DarkModeToggle />
        </DashboardNav>
        <DashboardNavToggle />
      </DashboardHeader>
      <DashboardSidebar>
        {pathname && <DashboardSidebarList pathname={pathname} items={items} />}
      </DashboardSidebar>
      <DashboardContent>{children}</DashboardContent>
    </DashboardLayout>
  );
}

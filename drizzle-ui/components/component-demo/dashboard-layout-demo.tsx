"use client";

import {
  DashboardContent,
  DashboardHeader,
  DashboardLayout,
  DashboardSidebar,
  DashboardSidebarToggle,
  DashboardTitle,
  DashboardNav,
  DashboardNavToggle,
  DashboardSidebarList,
} from "@/src/components/ui/dashboard-layout";
import {
  AlertTriangleIcon,
  ArrowUpRightIcon,
  BookIcon,
  ComponentIcon,
  UserCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { DarkModeToggle } from "@/src/components/ui/dark-mode";
import { usePathname } from "next/navigation";
import { PageLayoutDemo } from "./page-layout-demo";

const items = [
  {
    text: "Docs",
    icon: BookIcon,
    items: [
      { text: "Introduction", link: "/introduction" },
      { text: "Installation", link: "/installation" },
    ],
  },
  {
    text: "Components",
    icon: ComponentIcon,
    items: [
      { text: "Alert", link: "/components/alert", icon: AlertTriangleIcon },
      { text: "Avatar", link: "/components/avatar", icon: UserCircleIcon },
      { text: "Button", link: "/components/button" },
      { text: "Card", link: "/components/card" },
      { text: "Checkbox", link: "/components/checkbox" },
      { text: "Dark Mode", link: "/components/dark-mode" },
      { text: "Dashboard Layout", link: "/components/dashboard-layout" },
      { text: "Form", link: "/components/form" },
      { text: "Input", link: "/components/input" },
      { text: "Label", link: "/components/label" },
      { text: "Page Layout", link: "/components/page-layout" },
      { text: "Pagination", link: "/components/pagination" },
      { text: "Rich Text Editor", link: "/components/rich-text-editor" },
      { text: "Search Input", link: "/components/search-input" },
      { text: "Select", link: "/components/select" },
      { text: "Sortable", link: "/components/sortable" },
      { text: "Table", link: "/components/table" },
      { text: "Textarea", link: "/components/textarea" },
    ],
  },
];

export function DashboardLayoutDemo() {
  const pathname = usePathname();

  return (
    <DashboardLayout>
      <DashboardHeader>
        <DashboardTitle>
          <DashboardSidebarToggle />
          <Link href="/">drizzle-ui</Link>
        </DashboardTitle>
        <DashboardNav>
          <Link href="/introduction">Docs</Link>
          <Link
            href="https://www.drizzle-next.com"
            className="flex items-center gap-1"
            target="_blank"
          >
            Drizzle Next <ArrowUpRightIcon className="text-muted-500 h-4 w-4" />
          </Link>
          <DarkModeToggle />
        </DashboardNav>
        <DashboardNavToggle />
      </DashboardHeader>
      <DashboardSidebar>
        <DashboardSidebarList pathname={pathname} items={items} />
      </DashboardSidebar>
      <DashboardContent>
        <PageLayoutDemo />
      </DashboardContent>
    </DashboardLayout>
  );
}

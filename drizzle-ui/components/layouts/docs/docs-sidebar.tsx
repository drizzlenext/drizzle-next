"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardSidebar,
  DashboardSidebarGroup,
  DashboardSidebarItem,
  DashboardSidebarLabel,
} from "@/components/ui/dashboard-layout";

const pages = [
  { title: "Introduction", url: "/introduction" },
  { title: "Installation", url: "/installation" },
];

const items = [
  { title: "Alert", url: "/components/alert" },
  { title: "Avatar", url: "/components/avatar" },
  { title: "Button", url: "/components/button" },
  { title: "Card", url: "/components/card" },
  { title: "Checkbox", url: "/components/checkbox" },
  { title: "Dark Mode", url: "/components/dark-mode" },
  { title: "Dashboard Layout", url: "/components/dashboard-layout" },
  { title: "Flash Message", url: "/components/flash-message" },
  { title: "Form", url: "/components/form" },
  { title: "Input", url: "/components/input" },
  { title: "Label", url: "/components/label" },
  { title: "Page Layout", url: "/components/page-layout" },
  { title: "Pagination", url: "/components/pagination" },
  { title: "Search Input", url: "/components/search-input" },
  { title: "Select", url: "/components/select" },
  { title: "Sortable", url: "/components/sortable" },
  { title: "Table", url: "/components/table" },
  { title: "Textarea", url: "/components/textarea" },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <DashboardSidebar>
      <DashboardSidebarGroup>
        <DashboardSidebarLabel>Docs</DashboardSidebarLabel>
        {pages.map((item) => (
          <Link key={item.title} href={item.url}>
            <DashboardSidebarItem active={pathname === item.url}>
              {item.title}
            </DashboardSidebarItem>
          </Link>
        ))}
      </DashboardSidebarGroup>
      <DashboardSidebarGroup>
        <DashboardSidebarLabel>Components</DashboardSidebarLabel>
        {items.map((item) => (
          <Link key={item.title} href={item.url}>
            <DashboardSidebarItem active={pathname === item.url}>
              {item.title}
            </DashboardSidebarItem>
          </Link>
        ))}
      </DashboardSidebarGroup>
    </DashboardSidebar>
  );
}

"use client";

import {
  DashboardContent,
  DashboardHeader,
  DashboardLayout,
  DashboardSidebar,
  DashboardSidebarGroup,
  DashboardSidebarLabel,
  DashboardSidebarItem,
  DashboardSidebarToggle,
  DashboardTitle,
  DashboardNav,
  DashboardNavToggle,
} from "@/src/components/ui/dashboard-layout";
import { ArrowUpRightIcon, NotebookIcon, Table2Icon } from "lucide-react";
import Link from "next/link";
import { DarkModeToggle } from "@/src/components/ui/dark-mode";
import { usePathname } from "next/navigation";
import { PageLayoutDemo } from "./page-layout-demo";

const items = [
  { text: "Introduction", link: "/introduction", icon: Table2Icon },
  { text: "Installation", link: "/installation", icon: Table2Icon },
  {
    text: "Dashboard Layout",
    link: "/components/dashboard-layout",
    icon: Table2Icon,
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
        <DashboardSidebarGroup>
          <DashboardSidebarLabel>
            <NotebookIcon /> Documentation
          </DashboardSidebarLabel>
          {items.map((item) => (
            <Link key={item.link} href={item.link}>
              <DashboardSidebarItem active={pathname === item.link}>
                <item.icon className="h-4 w-4" /> {item.text}
              </DashboardSidebarItem>
            </Link>
          ))}
        </DashboardSidebarGroup>
      </DashboardSidebar>
      <DashboardContent>
        <PageLayoutDemo />
      </DashboardContent>
    </DashboardLayout>
  );
}

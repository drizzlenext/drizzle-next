"use client";

import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { ReactNode, useEffect } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import {
  DashboardHeader,
  DashboardNav,
  DashboardNavToggle,
  DashboardSidebarToggle,
  DashboardTitle,
  DashboardSidebar,
  DashboardSidebarGroup,
  DashboardSidebarItem,
  DashboardSidebarLabel,
} from "@/components/ui/dashboard-layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardContent } from "@/components/ui/dashboard-layout";
import { DarkModeToggle } from "@/components/ui/dark-mode";

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

export function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const codeBlocks = document.querySelectorAll("pre code");

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (!pre) return;

      // Avoid duplicate buttons
      if (pre.querySelector(".copy-btn")) return;

      const button = document.createElement("button");
      button.innerText = "Copy";
      button.className =
        "copy-btn absolute top-2 right-2 bg-white text-black p-1 rounded hover:bg-gray-200 text-sm";

      button.onclick = async () => {
        await navigator.clipboard.writeText(codeBlock.textContent || "");
        button.innerText = "Copied!";
        setTimeout(() => (button.innerText = "Copy"), 2000);
      };

      pre.style.position = "relative";
      pre.appendChild(button);
    });
  }, [pathname]);

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
      <DashboardContent>{children}</DashboardContent>
    </DashboardLayout>
  );
}

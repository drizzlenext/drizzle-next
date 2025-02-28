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

const CopyIconSVGText = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const CopyCheckIconSVGText = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-check"><path d="m12 15 2 2 4-4"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

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
      button.innerHTML = CopyIconSVGText;
      button.className =
        "copy-btn absolute top-0 right-0 bg-transparent text-white min-w-9 min-h-9 max-w-9 max-h-9 aspect-square py-0 px-0 flex items-center justify-center rounded-icon cursor-pointer hover:opacity-90";

      button.onclick = async () => {
        await navigator.clipboard.writeText(codeBlock.textContent || "");
        button.innerHTML = CopyCheckIconSVGText;
        setTimeout(() => (button.innerHTML = CopyIconSVGText), 2000);
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

"use client";

import {
  DashboardLayout,
  DashboardSidebarList,
} from "@/src/components/ui/dashboard-layout";
import { ReactNode, useEffect } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import {
  DashboardHeader,
  DashboardNav,
  DashboardNavToggle,
  DashboardSidebarToggle,
  DashboardTitle,
  DashboardSidebar,
} from "@/src/components/ui/dashboard-layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardContent } from "@/src/components/ui/dashboard-layout";
import { DarkModeToggle } from "@/src/components/ui/dark-mode";

const items = [
  {
    text: "Docs",
    items: [
      { text: "Introduction", link: "/introduction" },
      { text: "Installation", link: "/installation" },
    ],
  },
  {
    text: "Components",
    items: [
      { text: "Alert", link: "/components/alert" },
      { text: "Avatar", link: "/components/avatar" },
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
        <DashboardSidebarList pathname={pathname} items={items} />
      </DashboardSidebar>
      <DashboardContent>{children}</DashboardContent>
    </DashboardLayout>
  );
}

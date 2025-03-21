"use client";

import {
  DashboardLayout,
  DashboardNavList,
  NavItemType,
  SidebarContent,
  SidebarList,
} from "@/src/components/ui/app-layout";
import { ReactNode, useEffect } from "react";
import {
  AlertTriangleIcon,
  ArrowUpDownIcon,
  ArrowUpRightIcon,
  BookOpenTextIcon,
  CheckSquareIcon,
  FormInputIcon,
  IdCardIcon,
  MoonStarIcon,
  NotepadTextIcon,
  PanelsTopLeftIcon,
  SearchIcon,
  SquareMousePointerIcon,
  SquarePenIcon,
  SquarePowerIcon,
  TableIcon,
  TagIcon,
  TextIcon,
  UserCircleIcon,
} from "lucide-react";
import {
  DashboardHeader,
  DashboardNav,
  DashboardNavToggle,
  SidebarToggle,
  DashboardHeaderGroup,
  Sidebar,
} from "@/src/components/ui/app-layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardContent } from "@/src/components/ui/app-layout";
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
      { text: "Alert", link: "/components/alert", icon: AlertTriangleIcon },
      {
        text: "App Layout",
        link: "/components/app-layout",
        icon: PanelsTopLeftIcon,
      },
      { text: "Avatar", link: "/components/avatar", icon: UserCircleIcon },
      { text: "Button", link: "/components/button", icon: SquarePowerIcon },
      { text: "Card", link: "/components/card", icon: IdCardIcon },
      { text: "Checkbox", link: "/components/checkbox", icon: CheckSquareIcon },
      { text: "Dark Mode", link: "/components/dark-mode", icon: MoonStarIcon },
      { text: "Form", link: "/components/form", icon: NotepadTextIcon },
      { text: "Input", link: "/components/input", icon: FormInputIcon },
      { text: "Label", link: "/components/label", icon: TagIcon },
      {
        text: "Pagination",
        link: "/components/pagination",
        icon: BookOpenTextIcon,
      },
      {
        text: "Rich Text Editor",
        link: "/components/rich-text-editor",
        icon: SquarePenIcon,
      },
      {
        text: "Search Input",
        link: "/components/search-input",
        icon: SearchIcon,
      },
      {
        text: "Select",
        link: "/components/select",
        icon: SquareMousePointerIcon,
      },
      { text: "Sortable", link: "/components/sortable", icon: ArrowUpDownIcon },
      { text: "Table", link: "/components/table", icon: TableIcon },
      { text: "Textarea", link: "/components/textarea", icon: TextIcon },
    ],
  },
];

const nav: NavItemType[] = [
  { text: "Docs", link: "/introduction" },
  {
    text: "Drizzle Next",
    link: "https://www.drizzlenext.com",
    target: "_blank",
    icon: ArrowUpRightIcon,
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
        "copy-btn absolute top-0 right-0 bg-transparent text-white min-w-9 min-h-9 max-w-9 max-h-9 aspect-square py-0 px-0 flex items-center justify-center rounded cursor-pointer hover:opacity-90";

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
    <DashboardLayout variant="container">
      <DashboardHeader>
        <DashboardHeaderGroup>
          <SidebarToggle />
          <Link href="/">Drizzle UI</Link>
        </DashboardHeaderGroup>
        <DashboardHeaderGroup>
          <DashboardNav>
            <DashboardNavList items={nav} />
            <DarkModeToggle />
          </DashboardNav>
          <DashboardNavToggle />
        </DashboardHeaderGroup>
      </DashboardHeader>
      <Sidebar>
        <SidebarContent>
          <SidebarList pathname={pathname} items={items} />
        </SidebarContent>
      </Sidebar>
      <DashboardContent>{children}</DashboardContent>
    </DashboardLayout>
  );
}

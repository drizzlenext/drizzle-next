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
  DashboardNavList,
} from "@/src/components/ui/dashboard-layout";
import {
  AlertTriangleIcon,
  ArrowUpDownIcon,
  ArrowUpRightIcon,
  BookIcon,
  BookOpenTextIcon,
  CheckSquareIcon,
  ComponentIcon,
  FormInputIcon,
  IdCardIcon,
  MoonStarIcon,
  NotepadTextIcon,
  PanelsTopLeftIcon,
  PanelTopIcon,
  SearchIcon,
  SquareMousePointerIcon,
  SquarePenIcon,
  SquarePowerIcon,
  TableIcon,
  TagIcon,
  TextIcon,
  UserCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { DarkModeToggle } from "@/src/components/ui/dark-mode";
import { usePathname } from "next/navigation";
import { PageLayoutDemo } from "./page-layout-demo";

const nav = [
  {
    text: "Docs",
    link: "/introduction",
  },
  {
    text: "Drizzle Next",
    link: "https://www.drizzle-next.com",
    icon: ArrowUpRightIcon,
  },
];

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
      { text: "Button", link: "/components/button", icon: SquarePowerIcon },
      { text: "Card", link: "/components/card", icon: IdCardIcon },
      { text: "Checkbox", link: "/components/checkbox", icon: CheckSquareIcon },
      { text: "Dark Mode", link: "/components/dark-mode", icon: MoonStarIcon },
      {
        text: "Dashboard Layout",
        link: "/components/dashboard-layout",
        icon: PanelsTopLeftIcon,
      },
      { text: "Form", link: "/components/form", icon: NotepadTextIcon },
      { text: "Input", link: "/components/input", icon: FormInputIcon },
      { text: "Label", link: "/components/label", icon: TagIcon },
      {
        text: "Page Layout",
        link: "/components/page-layout",
        icon: PanelTopIcon,
      },
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
          <DashboardNavList items={nav} pathname={pathname} />
          <DarkModeToggle />
        </DashboardNav>
        <DashboardNavToggle />
      </DashboardHeader>
      <DashboardSidebar>
        <DashboardSidebarList items={items} pathname={pathname} />
      </DashboardSidebar>
      <DashboardContent>
        <PageLayoutDemo />
      </DashboardContent>
    </DashboardLayout>
  );
}

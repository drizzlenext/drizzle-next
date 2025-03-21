"use client";

import {
  DashboardLayout,
  DashboardHeader,
  DashboardHeaderGroup,
  DashboardNav,
  DashboardNavToggle,
  DashboardNavList,
  DashboardContent,
  Sidebar,
  SidebarToggle,
  SidebarList,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
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
  LogOutIcon,
  MoonStarIcon,
  NotepadTextIcon,
  PanelsTopLeftIcon,
  PanelTopIcon,
  SearchIcon,
  SettingsIcon,
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
import { Suspense } from "react";
import {
  DropdownMenu,
  DropdownMenuItemType,
  DropdownMenuList,
} from "@/src/components/ui/dropdown-menu";
import { Avatar } from "@/src/components/ui/avatar";

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

const sidebar = [
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

const menu: DropdownMenuItemType[] = [
  {
    text: "Account",
    items: [
      { text: "Settings", link: "/", icon: SettingsIcon },
      { text: "Sign Out", link: "/", icon: LogOutIcon },
    ],
  },
];

export function DashboardLayoutDemo() {
  const pathname = usePathname();

  return (
    <Suspense>
      <DashboardLayout>
        <DashboardHeader>
          <DashboardHeaderGroup>
            <SidebarToggle />
            <Link href="/">Drizzle UI</Link>
          </DashboardHeaderGroup>
          <DashboardHeaderGroup>
            <DashboardNav>
              <DashboardNavList items={nav} pathname={pathname} />
              <DarkModeToggle />
            </DashboardNav>
            <DashboardNavToggle />
            <DropdownMenu
              buttonSizeVariant="avatar"
              buttonEl={
                <Avatar src="https://drizzlenext.github.io/drizzle-assets/avatar.png" />
              }
            >
              <DropdownMenuList items={menu} />
            </DropdownMenu>
          </DashboardHeaderGroup>
        </DashboardHeader>
        <Sidebar>
          <SidebarHeader>Sidebar Header</SidebarHeader>
          <SidebarContent>
            <SidebarList items={sidebar} pathname={pathname} />
          </SidebarContent>
          <SidebarFooter>Sidebar Footer</SidebarFooter>
        </Sidebar>
        <DashboardContent>
          <p className="p-3">
            This is the full width variant of Dashboard Layout demo.
          </p>
        </DashboardContent>
      </DashboardLayout>
    </Suspense>
  );
}

"use client";

import {
  AppLayout,
  AppHeader,
  AppHeaderGroup,
  AppNav,
  AppNavToggle,
  AppNavList,
  AppContent,
  AppSidebar,
  AppSidebarToggle,
  AppSidebarList,
  AppSidebarHeader,
  AppSidebarContent,
  AppSidebarFooter,
} from "@/src/components/ui/app-layout";
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

const menu: DropdownMenuItemType[] = [
  {
    text: "Account",
    items: [
      { text: "Settings", link: "/", icon: SettingsIcon },
      { text: "Sign Out", link: "/", icon: LogOutIcon },
    ],
  },
];

export function AppLayoutDemo() {
  const pathname = usePathname();

  return (
    <Suspense>
      <AppLayout>
        <AppHeader>
          <AppHeaderGroup>
            <AppSidebarToggle />
            <Link href="/">Drizzle UI</Link>
          </AppHeaderGroup>
          <AppHeaderGroup>
            <AppNav>
              <AppNavList items={nav} pathname={pathname} />
              <DarkModeToggle />
            </AppNav>
            <AppNavToggle />
            <DropdownMenu
              buttonSizeVariant="avatar"
              buttonEl={
                <Avatar src="https://drizzlenext.github.io/drizzle-assets/avatar.png" />
              }
            >
              <DropdownMenuList items={menu} />
            </DropdownMenu>
          </AppHeaderGroup>
        </AppHeader>
        <AppSidebar>
          <AppSidebarHeader>AppSidebar Header</AppSidebarHeader>
          <AppSidebarContent>
            <AppSidebarList items={sidebar} pathname={pathname} />
          </AppSidebarContent>
          <AppSidebarFooter>AppSidebar Footer</AppSidebarFooter>
        </AppSidebar>
        <AppContent>
          <p className="p-3">
            This is the full width variant of the App Layout.
          </p>
        </AppContent>
      </AppLayout>
    </Suspense>
  );
}

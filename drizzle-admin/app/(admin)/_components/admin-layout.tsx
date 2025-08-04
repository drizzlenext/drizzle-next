"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LogOutIcon,
  GaugeIcon,
  SettingsIcon,
  Table2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GroupIcon,
  HomeIcon,
  NotebookTextIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/src/drizzle-ui/components/ui/button";
import { cn } from "@/src/drizzle-ui/lib/utils";

const sidebarItems = [
  {
    text: "Admin Dashboard",
    link: "/admin",
    icon: GaugeIcon,
  },
  { text: "Home", link: "/", icon: HomeIcon },
  {
    text: "Custom Group",
    icon: GroupIcon,
    items: [
      {
        text: "Custom Page",
        link: "/admin/custom-page",
        icon: NotebookTextIcon,
      },
    ],
  },
  {
    text: "Tables",
    items: [
      { text: "Users", link: "/admin/users", icon: UserIcon },
      { text: "Posts", link: "/admin/posts", icon: Table2Icon },
      {
        text: "Categories",
        link: "/admin/categories",
        icon: Table2Icon,
      },
      { text: "Tags", link: "/admin/tags", icon: Table2Icon },
      {
        text: "Post Tags",
        link: "/admin/posts-tags",
        icon: Table2Icon,
      },
    ],
  },
  { text: "Settings", link: "/admin/settings", icon: SettingsIcon },
  { text: "Sign out", link: "/signout", icon: LogOutIcon },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const renderSidebarItems = (items: any[]) => {
    return items.map((item) => {
      if (item.items) {
        // Group with sub-items
        return (
          <div key={item.text} className="mb-4">
            <div className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground">
              {item.icon && (
                <item.icon size={20} className="mr-3 flex-shrink-0" />
              )}
              {!sidebarCollapsed && <span>{item.text}</span>}
            </div>
            <ul className="space-y-1 ml-6">
              {item.items.map((subItem: any) => {
                const SubIcon = subItem.icon;
                const isActive = pathname === subItem.link;
                return (
                  <li key={subItem.link}>
                    <Link
                      href={subItem.link}
                      className={cn(
                        "hover:bg-muted flex items-center rounded-md transition-colors",
                        sidebarCollapsed
                          ? "justify-center px-3 py-3"
                          : "gap-3 px-3 py-2",
                        isActive && "bg-muted text-muted-foreground"
                      )}
                    >
                      <SubIcon size={16} className="flex-shrink-0" />
                      {!sidebarCollapsed && (
                        <span className="text-sm">{subItem.text}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      } else {
        // Regular item
        const Icon = item.icon;
        const isActive = pathname === item.link;
        return (
          <li key={item.link}>
            <Link
              href={item.link}
              className={cn(
                "hover:bg-muted flex items-center rounded-md transition-colors",
                sidebarCollapsed
                  ? "justify-center px-3 py-3"
                  : "gap-3 px-3 py-2",
                isActive && "bg-muted text-muted-foreground"
              )}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.text}</span>}
            </Link>
          </li>
        );
      }
    });
  };

  return (
    <div className="bg-background flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-card border-border flex flex-col border-r transition-all duration-300",
          sidebarCollapsed ? "w-16" : "min-w-64"
        )}
      >
        {/* Sidebar Header */}
        <div className="border-border flex items-center justify-between border-b p-4">
          {!sidebarCollapsed && (
            <h1 className="text-lg font-semibold">Drizzle Admin</h1>
          )}
          <Button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="rounded-md p-2"
            variant="ghost"
          >
            {sidebarCollapsed ? (
              <ChevronRightIcon size={20} />
            ) : (
              <ChevronLeftIcon size={20} />
            )}
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 flex-1">
          <ul className="space-y-2">{renderSidebarItems(sidebarItems)}</ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}

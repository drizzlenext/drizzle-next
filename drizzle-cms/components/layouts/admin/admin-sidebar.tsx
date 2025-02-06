"use client";

import { Table2Icon, GaugeIcon, SettingsIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const items = [
  { title: "Admin", url: "/admin", icon: GaugeIcon },
    { title: "Users", url: "/admin/users", icon: Table2Icon },
// [CODE_MARK admin-sidebar-items]
  { title: "Settings", url: "/admin/settings", icon: SettingsIcon },
  { title: "Sign out", url: "/signout", icon: LogOutIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="row-span-1 col-span-1 z-20 flex-col border-r border-muted-300 bg-primary-50 text-sm dark:border-muted-700 dark:bg-primary-950">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          className={cn(
            "flex items-center gap-2 p-2 hover:bg-primary-100 dark:hover:bg-primary-900",
            pathname === item.url && "bg-primary-100 dark:bg-primary-900"
          )}
        >
          <item.icon className="h-4 w-4 flex-shrink-0" />
          <span className="overflow-hidden text-nowrap sm:block">
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

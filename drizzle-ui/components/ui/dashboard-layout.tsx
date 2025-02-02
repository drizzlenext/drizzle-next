"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { DarkModeToggle } from "./dark-mode";
import { ArrowUpRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "./utils";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[36px_1fr] sm:grid-cols-[180px_1fr] h-screen">
      {children}
    </div>
  );
}

export function DashboardHeader() {
  return (
    <div className="col-span-2 row-span-1 gap-2 border-b border-muted-300 bg-gradient-to-t from-primary-100 to-primary-50 dark:border-muted-700 dark:bg-primary-900 dark:from-primary-950 dark:to-primary-900">
      <div className="flex h-12 w-full items-center justify-between">
        <div className="px-2 font-mono font-bold">
          <Link href="/">drizzle-ui</Link>
        </div>
        <div className="flex gap-5 px-2">
          <Link href="/introduction">Docs</Link>
          <Link
            href="https://www.drizzle-next.com"
            className="flex items-center gap-1"
            target="_blank"
          >
            Drizzle Next <ArrowUpRightIcon className="h-4 w-4 text-muted-500" />
          </Link>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const items = [
    { title: "Introduction", url: "/introduction" },
    { title: "Installation", url: "/installation" },
    { title: "Alert", url: "/components/alert" },
  ];

  const pathname = usePathname();

  return (
    <div className="z-20 col-span-1 row-span-1 flex-col overflow-auto border-r border-muted-300 bg-primary-50 text-sm dark:border-muted-700 dark:bg-primary-950">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          className={cn(
            "flex items-center gap-2 p-2 hover:bg-primary-100 dark:hover:bg-primary-900",
            pathname === item.url && "bg-primary-100 dark:bg-primary-900",
          )}
        >
            <span className="overflow-hidden text-nowrap sm:block font-normal">
            {item.title}
            </span>
        </Link>
      ))}
    </div>
  );
}

export function DashboardContent({ children }: { children: ReactNode }) {
  return <div className="row-span-1 col-span-1 overflow-auto">{children}</div>;
}

"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { DarkModeToggle } from "./dark-mode";
import { ArrowUpRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "./utils";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-screen grid-cols-[36px_1fr] grid-rows-[auto_1fr] sm:grid-cols-[180px_1fr]">
      {children}
    </div>
  );
}

interface DashboardHeaderProps {
  title: string;
  nav: { text: string; link: string }[];
}

export function DashboardHeader(props: DashboardHeaderProps) {
  return (
    <div className="col-span-2 row-span-1 gap-2 border-b border-muted-300 bg-gradient-to-t from-primary-100 to-primary-50 dark:border-muted-700 dark:bg-primary-900 dark:from-primary-950 dark:to-primary-900">
      <div className="flex h-12 w-full items-center justify-between">
        <div className="px-2 font-mono font-bold">
          <Link href="/">{props.title}</Link>
        </div>
        <div className="flex gap-5 px-2">
          {props.nav.map((navLink) => {
            return (
              <>
                {navLink.link.startsWith("http") ? (
                  <Link
                    key={navLink.link}
                    href={navLink.link}
                    className="flex items-center gap-1"
                    target="_blank"
                  >
                    {navLink.text}{" "}
                    <ArrowUpRightIcon className="h-4 w-4 text-muted-500" />
                  </Link>
                ) : (
                  <Link key={navLink.link} href="/introduction">
                    Docs
                  </Link>
                )}
              </>
            );
          })}
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
}

interface DashboardSidebarProps {
  items: { text?: string; items: { text: string; link: string }[] }[];
}

export function DashboardSidebar(props: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="z-20 col-span-1 row-span-1 flex-col overflow-auto border-r border-muted-300 bg-primary-50 text-sm dark:border-muted-700 dark:bg-primary-950">
      {props.items.map((item) => (
        <div key={item.text}>
          {item.text && <div className="p-2 font-bold">{item.text}</div>}
          {item.items.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className={cn(
                "flex items-center gap-2 px-2 py-1 hover:bg-primary-100 dark:hover:bg-primary-900",
                pathname === item.link && "bg-primary-100 dark:bg-primary-900",
              )}
            >
              <span className="overflow-hidden text-nowrap font-normal sm:block">
                {item.text}
              </span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export function DashboardContent({ children }: { children: ReactNode }) {
  return <div className="col-span-1 row-span-1 overflow-auto">{children}</div>;
}

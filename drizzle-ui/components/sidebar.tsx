"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const items = [
  { title: "Alert", url: "/components/alert" },
  { title: "Avatar", url: "/components/avatar" },
  { title: "Button", url: "/components/button" },
  { title: "Card", url: "/components/card" },
  { title: "Checkbox", url: "/components/checkbox" },
  { title: "Dark Mode", url: "/components/dark-mode" },
  { title: "Flash Message", url: "/components/flash-message" },
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="z-20 col-span-1 row-span-1 flex-col border-r border-muted-300 bg-primary-50 text-sm dark:border-muted-700 dark:bg-primary-950">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          className={cn(
            "flex items-center gap-2 p-2 hover:bg-primary-100 dark:hover:bg-primary-900",
            pathname === item.url && "bg-primary-100 dark:bg-primary-900",
          )}
        >
          <span className="overflow-hidden text-nowrap sm:block">
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

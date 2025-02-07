import Link from "next/link";
import { DarkModeToggle } from "../../ui/dark-mode";
import { ArrowUpRightIcon } from "lucide-react";
import {
  DashboardHeader,
  DashboardSidebarToggle,
} from "@/components/ui/dashboard-layout";

export function DocsHeader() {
  return (
    <DashboardHeader>
      <div className="flex items-center gap-5 px-2 font-mono font-bold">
        <DashboardSidebarToggle />
        <Link href="/">drizzle-ui</Link>
      </div>
      <div className="flex flex-wrap items-center gap-5 px-2">
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
    </DashboardHeader>
  );
}

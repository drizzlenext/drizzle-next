import Link from "next/link";
import { DarkModeToggle } from "../../ui/dark-mode";
import { ArrowUpRightIcon } from "lucide-react";
import {
  DashboardHeader,
  DashboardNav,
  DashboardNavToggle,
  DashboardSidebarToggle,
  DashboardTitle,
} from "@/components/ui/dashboard-layout";

export function DocsHeader() {
  return (
    <DashboardHeader>
      <DashboardTitle>
        <DashboardSidebarToggle />
        <Link href="/">drizzle-ui</Link>
      </DashboardTitle>
      <DashboardNav>
        <Link href="/introduction">Docs</Link>
        <Link
          href="https://www.drizzle-next.com"
          className="flex items-center gap-1"
          target="_blank"
        >
          Drizzle Next <ArrowUpRightIcon className="h-4 w-4 text-muted-500" />
        </Link>
        <DarkModeToggle />
      </DashboardNav>
      <DashboardNavToggle />
    </DashboardHeader>
  );
}

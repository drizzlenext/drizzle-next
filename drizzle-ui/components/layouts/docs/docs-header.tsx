import Link from "next/link";
import { DarkModeToggle } from "../../ui/dark-mode";
import { ArrowUpRightIcon } from "lucide-react";

export function DocsHeader() {
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

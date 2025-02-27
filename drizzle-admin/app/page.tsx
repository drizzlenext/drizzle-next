import { PublicFooter } from "@/components/layouts/public/public-footer";
import { PublicHeader } from "@/components/layouts/public/public-header";
import { Button } from "@/components/ui/button";
import {
  CloudDrizzleIcon,
  ExternalLinkIcon,
  GaugeIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen flex-col">
      <PublicHeader />
      <div className="flex flex-1 flex-col justify-center">
        <main className="flex flex-col flex-1 gap-5 w-72 m-auto justify-center">
          <h1 className="text-4xl font-mono flex gap-2 items-center text-primary-600 dark:text-primary-400">
            <CloudDrizzleIcon size={36} /> drizzle-next
          </h1>
          <Link href="https://www.drizzle-next.com" target="_blank">
            <Button
              variant="primary"
              className="w-full flex items-center gap-2 justify-center"
            >
              <ExternalLinkIcon /> View Documentation
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="primary"
              className="w-full flex items-center gap-2 justify-center"
            >
              <LayoutDashboardIcon /> User Dashboard
            </Button>
          </Link>
          <Link href="/admin">
            <Button
              variant="primary"
              className="w-full flex items-center gap-2 justify-center"
            >
              <GaugeIcon /> Admin Dashboard
            </Button>
          </Link>
        </main>
        <PublicFooter />
      </div>
    </div>
  );
}

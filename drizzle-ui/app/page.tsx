import { Button } from "@/src/components/ui/button";
import { DarkModeToggle } from "@/src/components/ui/dark-mode";
import { ArrowUpRightIcon, CloudDrizzleIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-between p-8">
      <header className="flex w-full items-center justify-between">
        <div className="flex gap-4">
          <Link href="/introduction" className="text-lg font-semibold">
            Docs
          </Link>
          <Link
            href="https://www.drizzle-next.com"
            className="flex items-center gap-1 text-lg font-semibold"
            target="_blank"
          >
            Drizzle Next <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <DarkModeToggle />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <h1 className="flex items-center gap-5 text-7xl font-bold">
          <CloudDrizzleIcon size={100} /> Drizzle UI
        </h1>
        <p className="max-w-lg text-4xl font-bold">
          The minimalist component library of Drizzle Next.
        </p>
        <Link href="/introduction">
          <Button className="p-2 px-3">Documentation</Button>
        </Link>
      </main>
      <footer className="border-border w-full border-t p-5">
        <div className="flex flex-col items-center justify-center font-semibold">
          <p>Released under the MIT license.</p>
          <p>
            Copyright &copy; 2025 - present{" "}
            <a href="https://x.com/TravisLuong" className="font-bold underline">
              Travis Luong
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

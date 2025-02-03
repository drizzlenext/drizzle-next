import { DocsFooter } from "@/components/layouts/docs/docs-footer";
import { DocsHeader } from "@/components/layouts/docs/docs-header";
import { Button } from "@/components/ui/button";
import { CloudDrizzleIcon, LightbulbIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <DocsHeader />
      <div className="container m-auto flex max-w-5xl flex-1 flex-col gap-5 px-4 py-8">
        <h1 className="flex items-center gap-5 text-7xl font-bold">
          <CloudDrizzleIcon size={100} /> Drizzle UI
        </h1>
        <div className="max-w-lg text-4xl font-bold">
          The minimalist component library used in Drizzle Next.
        </div>
        <div className="flex max-w-lg gap-2 text-xl">
          <LightbulbIcon size={50} /> Inspired by the copy-and-paste philosophy
          of shadcn/ui.
        </div>
        <div>
          <Link href="/introduction">
            <Button className="rounded-3xl p-2 px-3">Documentation</Button>
          </Link>
        </div>
      </div>
      <DocsFooter />
    </div>
  );
}

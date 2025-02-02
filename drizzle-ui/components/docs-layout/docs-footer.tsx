import Link from "next/link";

export function DocsFooter() {
  return (
    <footer className="w-full border-t border-primary-300 dark:border-primary-700">
      <div className="container mx-auto flex h-14 items-center justify-center">
        <Link
          href="https://ui.drizzle-next.com"
          className="underline"
          target="_blank"
        >
          ui.drizzle-next.com
        </Link>
      </div>
    </footer>
  );
}

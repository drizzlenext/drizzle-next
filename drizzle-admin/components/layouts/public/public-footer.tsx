import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="w-full border-t border-primary-300 dark:border-primary-700">
      <div className="container mx-auto flex h-14 items-center justify-center">
        <Link
          href="https://www.drizzle-next.com"
          className="underline"
          target="_blank"
        >
          www.drizzle-next.com
        </Link>
      </div>
    </footer>
  );
}

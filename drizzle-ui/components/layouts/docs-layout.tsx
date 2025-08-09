"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  AlertTriangleIcon,
  ArrowUpRightIcon,
  BookOpenTextIcon,
  CheckSquareIcon,
  FormInputIcon,
  IdCardIcon,
  MenuIcon,
  MoonStarIcon,
  NotepadTextIcon,
  SearchIcon,
  SquareMousePointerIcon,
  SquarePenIcon,
  SquarePowerIcon,
  TableIcon,
  TagIcon,
  TextIcon,
  UserCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DarkModeToggle } from "@/src/components/ui/dark-mode";

const items = [
  {
    text: "Docs",
    items: [
      { text: "Introduction", link: "/introduction" },
      { text: "Installation", link: "/installation" },
    ],
  },
  {
    text: "Components",
    items: [
      { text: "Alert", link: "/components/alert", icon: AlertTriangleIcon },
      { text: "Avatar", link: "/components/avatar", icon: UserCircleIcon },
      { text: "Button", link: "/components/button", icon: SquarePowerIcon },
      { text: "Card", link: "/components/card", icon: IdCardIcon },
      { text: "Checkbox", link: "/components/checkbox", icon: CheckSquareIcon },
      { text: "Dark Mode", link: "/components/dark-mode", icon: MoonStarIcon },
      { text: "Form", link: "/components/form", icon: NotepadTextIcon },
      { text: "Input", link: "/components/input", icon: FormInputIcon },
      { text: "Label", link: "/components/label", icon: TagIcon },
      {
        text: "Pagination",
        link: "/components/pagination",
        icon: BookOpenTextIcon,
      },
      {
        text: "Rich Text Editor",
        link: "/components/rich-text-editor",
        icon: SquarePenIcon,
      },
      {
        text: "Search Input",
        link: "/components/search-input",
        icon: SearchIcon,
      },
      {
        text: "Select",
        link: "/components/select",
        icon: SquareMousePointerIcon,
      },
      { text: "Table", link: "/components/table", icon: TableIcon },
      { text: "Textarea", link: "/components/textarea", icon: TextIcon },
    ],
  },
];

const nav = [
  { text: "Docs", link: "/introduction" },
  {
    text: "Drizzle Next",
    link: "https://www.drizzlenext.com",
    target: "_blank",
    icon: ArrowUpRightIcon,
  },
];

const CopyIconSVGText = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const CopyCheckIconSVGText = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-check"><path d="m12 15 2 2 4-4"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

export function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const codeBlocks = document.querySelectorAll("pre code");

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (!pre) return;
      // Avoid duplicate buttons
      if (pre.querySelector(".copy-btn")) return;

      const button = document.createElement("button");
      button.innerHTML = CopyIconSVGText;
      button.className =
        "copy-btn absolute top-0 right-0 bg-transparent text-white min-w-9 min-h-9 max-w-9 max-h-9 aspect-square py-0 px-0 flex items-center justify-center rounded cursor-pointer hover:opacity-90";

      button.onclick = async () => {
        await navigator.clipboard.writeText(codeBlock.textContent || "");
        button.innerHTML = CopyCheckIconSVGText;
        setTimeout(() => (button.innerHTML = CopyIconSVGText), 2000);
      };

      pre.style.position = "relative";
      pre.appendChild(button);
    });
  }, [pathname]);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
        <div className="container mx-auto flex h-14 max-w-7xl items-center px-4">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">
                Drizzle UI
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {nav.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  target={item.target}
                  className="hover:text-foreground/80 text-foreground/60 transition-colors"
                >
                  <span className="flex items-center space-x-1">
                    <span>{item.text}</span>
                    {item.icon && <item.icon className="h-4 w-4" />}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <button
            className="focus-visible:ring-ring hover:text-accent-foreground mr-2 inline-flex h-9 items-center justify-center rounded-md px-0 py-2 text-base font-medium transition-colors hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:hidden"
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </button>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Link
                className="inline-flex items-center rounded-lg text-sm font-medium md:hidden"
                href="/"
              >
                Drizzle UI
              </Link>
            </div>
            <nav className="flex items-center">
              <DarkModeToggle />
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl flex-1 items-start px-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-1 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-3">
        {/* Sidebar */}
        <aside
          className={`fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block ${sidebarOpen ? "block" : "hidden"} md:block`}
        >
          <div className="h-full max-h-[calc(100vh-3.5rem)] overflow-y-auto py-6 pr-6 lg:py-8">
            <div className="w-full">
              {items.map((section) => (
                <div key={section.text} className="pb-4">
                  <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                    {section.text}
                  </h4>
                  <div className="grid grid-flow-row auto-rows-max text-sm">
                    {section.items.map((item) => (
                      <Link
                        key={item.link}
                        href={item.link}
                        className={`group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline ${
                          pathname === item.link
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {"icon" in item && item.icon && (
                          <item.icon className="mr-2 h-4 w-4" />
                        )}
                        {item.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <div className="mx-auto w-full min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}

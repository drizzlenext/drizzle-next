"use client";

import * as React from "react";
import { cn } from "./utils";

interface PageLayoutState {
  asideOpen: boolean;
}

const PageLayoutContext = React.createContext<{
  state: PageLayoutState;
  setState: React.Dispatch<React.SetStateAction<PageLayoutState>>;
}>({
  state: { asideOpen: true },
  setState: () => {},
});

const PageLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [state, setState] = React.useState({ asideOpen: true });

  return (
    <PageLayoutContext.Provider value={{ state, setState }}>
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-[1fr_208px] grid-rows-[auto_auto_auto]",
          className,
        )}
        {...props}
      />
    </PageLayoutContext.Provider>
  );
});
PageLayout.displayName = "PageLayout";

const PageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "col-span-2 flex min-h-14 flex-wrap items-center justify-between gap-2 border-b border-muted-300 bg-muted-100 px-5 py-2 dark:border-muted-700 dark:bg-muted-900",
      className,
    )}
    {...props}
  />
));
PageHeader.displayName = "PageHeader";

const PageTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("font-bold", className)} {...props} />
));
PageTitle.displayName = "PageTitle";

const PageNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-5 p-2 px-5 py-2 [&>a]:text-info-600 [&>a]:underline dark:[&>a]:text-info-400",
      className,
    )}
    {...props}
  />
));
PageNav.displayName = "PageNav";

const PageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-5 py-2", className)} {...props} />
));
PageContent.displayName = "PageContent";

const PageFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-5", className)} {...props} />
));
PageFooter.displayName = "PageFooter";

const PageAside = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "row-span-2 h-full min-w-48 max-w-48 border-l border-muted-300 p-4 dark:border-muted-700",
      className,
    )}
    {...props}
  />
));
PageAside.displayName = "PageAside";

export {
  PageLayout,
  PageHeader,
  PageTitle,
  PageNav,
  PageContent,
  PageFooter,
  PageAside,
};

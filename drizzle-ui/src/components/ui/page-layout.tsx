"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

const PageLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { asideOpen?: boolean }
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-page text-page-foreground relative flex h-[calc(100vh-3rem)] flex-col",
        className,
      )}
      {...props}
    />
  );
});
PageLayout.displayName = "PageLayout";

const PageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border-border bg-page text-page-foreground sticky top-0 flex min-h-12 items-center justify-between gap-2 border-b p-3",
        className,
      )}
      {...props}
    />
  );
});
PageHeader.displayName = "PageHeader";

const PageTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-page text-page-foreground text-nowrap", className)}
    {...props}
  />
));
PageTitle.displayName = "PageTitle";

const PageNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-page text-page-foreground ml-auto flex items-center gap-3",
      className,
    )}
    {...props}
  />
));
PageNav.displayName = "PageNav";

const PageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-page text-page-foreground flex-grow overflow-auto p-3",
        className,
      )}
      {...props}
    />
  );
});
PageContent.displayName = "PageContent";

const PageFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-page text-page-foreground border-border sticky bottom-0 z-0 flex min-h-12 items-center border-t p-3",
        className,
      )}
      {...props}
    />
  );
});
PageFooter.displayName = "PageFooter";

export { PageLayout, PageHeader, PageTitle, PageNav, PageContent, PageFooter };

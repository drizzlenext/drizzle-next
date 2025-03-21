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
        "bg-page text-page-foreground relative flex flex-col",
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
        "border-border bg-page text-page-foreground sticky top-12 z-40 flex min-h-12 items-center justify-between gap-2 border-b p-3",
        className,
      )}
      {...props}
    />
  );
});
PageHeader.displayName = "PageHeader";

const PageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("bg-page text-page-foreground flex-grow p-3", className)}
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

export { PageLayout, PageHeader, PageContent, PageFooter };

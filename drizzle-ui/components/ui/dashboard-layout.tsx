"use client";

import * as React from "react";
import { cn } from "./utils";

const DashboardLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid h-screen grid-cols-[36px_1fr] grid-rows-[auto_1fr] sm:grid-cols-[180px_1fr]",
      className,
    )}
    {...props}
  />
));
DashboardLayout.displayName = "DashboardLayout";

const DashboardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "col-span-2 row-span-1 flex h-12 w-full items-center justify-between gap-2 border-b border-muted-300 bg-gradient-to-t from-primary-100 to-primary-50 dark:border-muted-700 dark:bg-primary-900 dark:from-primary-950 dark:to-primary-900",
      className,
    )}
    {...props}
  />
));
DashboardHeader.displayName = "DashboardHeader";

const DashboardSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-20 col-span-1 row-span-1 flex-col overflow-auto border-r border-muted-300 bg-primary-50 text-sm dark:border-muted-700 dark:bg-primary-950",
      className,
    )}
    {...props}
  />
));
DashboardSidebar.displayName = "DashboardSidebar";

const DashboardSidebarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { active: boolean }
>(({ active, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-row items-center gap-2 overflow-hidden text-nowrap p-2 font-normal hover:bg-primary-100 dark:hover:bg-primary-900",
      active && "bg-primary-100 dark:bg-primary-900",
      className,
    )}
    {...props}
  />
));
DashboardSidebarItem.displayName = "DashboardSidebarItem";

const DashboardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("col-span-1 row-span-1 overflow-auto", className)}
    {...props}
  />
));
DashboardContent.displayName = "DashboardContent";

export {
  DashboardLayout,
  DashboardHeader,
  DashboardSidebar,
  DashboardSidebarItem,
  DashboardContent,
};

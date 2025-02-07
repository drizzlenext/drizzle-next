"use client";

import * as React from "react";
import { cn } from "./utils";
import { MenuIcon, XIcon } from "lucide-react";

const DashboardLayoutContext = React.createContext<{
  state: { sidebarOpen: boolean };
  setState: React.Dispatch<React.SetStateAction<{ sidebarOpen: boolean }>>;
}>({
  state: {
    sidebarOpen: false,
  },
  setState: () => {},
});

const DashboardLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [state, setState] = React.useState({ sidebarOpen: false });

  return (
    <DashboardLayoutContext.Provider value={{ state, setState }}>
      <div
        ref={ref}
        className={cn(
          "grid h-screen grid-rows-[auto_1fr] sm:grid-cols-[192px_1fr]",
          className,
        )}
        {...props}
      />
    </DashboardLayoutContext.Provider>
  );
});
DashboardLayout.displayName = "DashboardLayout";

const DashboardSidebarToggle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state, setState } = React.useContext(DashboardLayoutContext);

  const toggleSidebar = () => {
    setState((prevState) => ({
      ...prevState,
      sidebarOpen: !prevState.sidebarOpen,
    }));
  };

  return (
    <div
      ref={ref}
      className={cn("block cursor-pointer select-none sm:hidden", className)}
      onClick={toggleSidebar}
      {...props}
    >
      {state.sidebarOpen ? <XIcon /> : <MenuIcon />}
    </div>
  );
});
DashboardSidebarToggle.displayName = "DashboardSidebarToggle";

export { DashboardLayoutContext };

const DashboardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-12 w-full items-center justify-between gap-2 border-b border-muted-300 bg-gradient-to-t from-primary-100 to-primary-50 dark:border-muted-700 dark:bg-primary-900 dark:from-primary-950 dark:to-primary-900 sm:col-span-2",
      className,
    )}
    {...props}
  />
));
DashboardHeader.displayName = "DashboardHeader";

const DashboardSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state, setState } = React.useContext(DashboardLayoutContext);

  const handleClick = () => {
    setState((prevState) => ({
      ...prevState,
      sidebarOpen: false,
    }));
  };

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-y-12 z-20 h-full w-[calc(100%-100px)] transform flex-col overflow-auto border-r border-muted-300 bg-primary-50 text-sm transition-transform duration-300 ease-in-out dark:border-muted-700 dark:bg-primary-950 sm:relative sm:inset-y-0 sm:w-48",
        state.sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "sm:translate-x-0",
        className,
      )}
      onClick={handleClick}
      {...props}
    />
  );
});
DashboardSidebar.displayName = "DashboardSidebar";

const DashboardSidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-1", className)} {...props} />
));
DashboardSidebarGroup.displayName = "DashboardSidebarGroup";

const DashboardSidebarLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-3 pt-2 font-bold", className)} {...props} />
));
DashboardSidebarLabel.displayName = "DashboardSidebarLabel";

const DashboardSidebarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { active?: boolean }
>(({ active = false, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-row items-center gap-2 overflow-hidden text-nowrap px-3 py-1 font-normal hover:bg-primary-100 dark:hover:bg-primary-900",
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
    className={cn("min-w-0 overflow-auto p-5", className)}
    {...props}
  />
));
DashboardContent.displayName = "DashboardContent";

export {
  DashboardLayout,
  DashboardSidebarToggle,
  DashboardHeader,
  DashboardSidebar,
  DashboardSidebarGroup,
  DashboardSidebarLabel,
  DashboardSidebarItem,
  DashboardContent,
};

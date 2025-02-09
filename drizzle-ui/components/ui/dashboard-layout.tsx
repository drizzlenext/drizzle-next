"use client";

import * as React from "react";
import { cn } from "./utils";
import { MenuIcon, SidebarCloseIcon, SidebarIcon, XIcon } from "lucide-react";

interface DashboardLayoutState {
  sidebarOpen: boolean;
  navOpen: boolean;
}

const DashboardLayoutContext = React.createContext<{
  state: DashboardLayoutState;
  setState: React.Dispatch<React.SetStateAction<DashboardLayoutState>>;
}>({
  state: {
    sidebarOpen: false,
    navOpen: false,
  },
  setState: () => {},
});

const DashboardLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [state, setState] = React.useState({
    sidebarOpen: false,
    navOpen: false,
  });

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
      {state.sidebarOpen ? <SidebarCloseIcon /> : <SidebarIcon />}
    </div>
  );
});
DashboardSidebarToggle.displayName = "DashboardSidebarToggle";

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

const DashboardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 px-2 font-mono font-bold",
      className,
    )}
    {...props}
  />
));
DashboardTitle.displayName = "DashboardTitle";

const DashboardNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state } = React.useContext(DashboardLayoutContext);
  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-12 z-50 flex w-full origin-top transform flex-col items-center gap-0 border-b border-muted-300 bg-muted-50 py-3 text-sm transition-all transition-transform duration-200 dark:border-primary-700 dark:bg-primary-950 [&>a:hover]:bg-primary-100 dark:[&>a:hover]:bg-primary-900 [&>a]:w-full [&>a]:px-4 [&>a]:py-1",
        state.navOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
        "sm:relative sm:right-0 sm:top-0 sm:flex sm:w-auto sm:scale-100 sm:flex-row sm:items-center sm:gap-5 sm:border-none sm:bg-transparent sm:px-2 sm:text-base sm:opacity-100 sm:dark:bg-transparent sm:[&>a]:w-auto sm:[&>a]:p-0 sm:[&>a]:px-2",
        className,
      )}
      {...props}
    />
  );
});
DashboardNav.displayName = "DashboardNav";

const DashboardNavToggle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state, setState } = React.useContext(DashboardLayoutContext);

  const toggleNav = () => {
    setState((prevState) => ({
      ...prevState,
      navOpen: !prevState.navOpen,
    }));
  };

  return (
    <div
      ref={ref}
      className={cn("cursor-pointer select-none px-3 sm:hidden", className)}
      {...props}
    >
      {state.navOpen ? (
        <XIcon onClick={toggleNav} />
      ) : (
        <MenuIcon onClick={toggleNav} />
      )}
    </div>
  );
});
DashboardNavToggle.displayName = "DashboardNavToggle";

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
    className={cn("min-w-0 overflow-auto", className)}
    {...props}
  />
));
DashboardContent.displayName = "DashboardContent";

export {
  DashboardLayout,
  DashboardSidebarToggle,
  DashboardHeader,
  DashboardTitle,
  DashboardNav,
  DashboardNavToggle,
  DashboardSidebar,
  DashboardSidebarGroup,
  DashboardSidebarLabel,
  DashboardSidebarItem,
  DashboardContent,
};

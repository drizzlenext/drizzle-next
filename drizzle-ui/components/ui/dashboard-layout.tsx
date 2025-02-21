"use client";

import * as React from "react";
import { cn } from "./utils";
import { MenuIcon, SidebarCloseIcon, SidebarIcon, XIcon } from "lucide-react";
import { Button } from "./button";

interface DashboardLayoutState {
  sidebarOpen: boolean;
  navOpen: boolean;
}

const DashboardLayoutContext = React.createContext<{
  state: DashboardLayoutState;
  setState: React.Dispatch<React.SetStateAction<DashboardLayoutState>>;
}>({
  state: {
    sidebarOpen: true,
    navOpen: false,
  },
  setState: () => {},
});

const DashboardLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [state, setState] = React.useState({
    sidebarOpen: true,
    navOpen: false,
  });

  React.useEffect(() => {
    const storedSidebarOpen = localStorage.getItem("sidebarOpen");
    if (storedSidebarOpen !== null) {
      setState((prevState) => ({
        ...prevState,
        sidebarOpen: storedSidebarOpen === "true",
      }));
    }
  }, []);

  return (
    <DashboardLayoutContext.Provider value={{ state, setState }}>
      <div
        ref={ref}
        className={cn(
          "grid h-screen grid-rows-[auto_1fr] bg-dashboard text-dashboard-foreground md:grid-cols-[192px_1fr]",
          !state.sidebarOpen && "md:grid-cols-[0px_1fr]",
          className,
        )}
        {...props}
      />
    </DashboardLayoutContext.Provider>
  );
});
DashboardLayout.displayName = "DashboardLayout";

const DashboardSidebarToggle = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { state, setState } = React.useContext(DashboardLayoutContext);

  const toggleSidebar = () => {
    setState((prevState) => {
      const newSidebarOpen = !prevState.sidebarOpen;
      localStorage.setItem("sidebarOpen", newSidebarOpen.toString());
      return {
        ...prevState,
        sidebarOpen: newSidebarOpen,
      };
    });
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("", className)}
      onClick={toggleSidebar}
      {...props}
    >
      {state.sidebarOpen ? <SidebarCloseIcon /> : <SidebarIcon />}
    </Button>
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
      "flex h-12 w-full items-center justify-between gap-2 border-b bg-header text-header-foreground md:col-span-2",
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
        "absolute top-12 z-50 flex w-full origin-top transform flex-col items-center gap-0 border-b bg-background px-2 py-3 text-sm transition-transform duration-200 [&>a]:w-full [&>a]:py-1",
        state.navOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
        "md:relative md:right-0 md:top-0 md:flex md:w-auto md:scale-100 md:flex-row md:items-center md:gap-5 md:border-none md:bg-transparent md:text-base md:opacity-100 md:dark:bg-transparent md:[&>a]:w-auto md:[&>a]:p-0 md:[&>a]:px-2",
        className,
      )}
      {...props}
    />
  );
});
DashboardNav.displayName = "DashboardNav";

const DashboardNavToggle = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { state, setState } = React.useContext(DashboardLayoutContext);

  const toggleNav = () => {
    setState((prevState) => ({
      ...prevState,
      navOpen: !prevState.navOpen,
    }));
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("mx-2 md:hidden", className)}
      onClick={toggleNav}
      {...props}
    >
      {state.navOpen ? <XIcon /> : <MenuIcon />}
    </Button>
  );
});
DashboardNavToggle.displayName = "DashboardNavToggle";

const DashboardSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state } = React.useContext(DashboardLayoutContext);

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-y-12 z-20 h-full w-2/3 transform flex-col overflow-auto border-r bg-sidebar text-sm transition-transform duration-200 ease-in-out md:relative md:inset-y-0 md:w-48",
        state.sidebarOpen ? "translate-x-0" : "-translate-x-full",
        className,
      )}
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
      "flex flex-row items-center gap-2 overflow-hidden text-nowrap px-3 py-1 font-normal hover:bg-muted",
      active && "bg-muted",
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

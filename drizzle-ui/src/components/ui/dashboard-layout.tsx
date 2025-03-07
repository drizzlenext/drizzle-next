"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { LucideProps, MenuIcon, SidebarIcon, XIcon } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

// the sidebarOpen flag must begin as undefined
// to handle different starting states for sm and md resolutions
interface DashboardLayoutState {
  sidebarOpen?: boolean;
  navOpen?: boolean;
}

const DashboardLayoutContext = React.createContext<{
  state: DashboardLayoutState;
  setState: React.Dispatch<React.SetStateAction<DashboardLayoutState>>;
}>({
  state: {
    sidebarOpen: undefined,
    navOpen: undefined,
  },
  setState: () => {},
});

const DashboardLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [state, setState] = React.useState({} as DashboardLayoutState);

  return (
    <DashboardLayoutContext.Provider value={{ state, setState }}>
      <div
        ref={ref}
        className={cn(
          "bg-dashboard text-dashboard-foreground grid h-screen grid-rows-[auto_1fr]",
          state.sidebarOpen === undefined && "md:grid-cols-[192px_1fr]",
          state.sidebarOpen === true && "md:grid-cols-[192px_1fr]",
          state.sidebarOpen === false && "md:grid-cols-[0px_1fr]",
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
      let newSidebarOpen;
      if (state.sidebarOpen === undefined) {
        // the initial behavior is different for sm and md screen sizes
        if (window.innerWidth <= 768) {
          newSidebarOpen = true;
        } else {
          newSidebarOpen = false;
        }
      } else {
        // after the sidebar is set the first time, revert to normal toggle behavior
        newSidebarOpen = !prevState.sidebarOpen;
      }
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
      <SidebarIcon />
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
      "bg-header text-header-foreground border-border flex h-12 w-full items-center justify-between gap-2 border-b md:col-span-2",
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
        "bg-background border-border absolute top-12 z-50 flex w-full origin-top transform flex-col items-center gap-0 border-b px-2 py-3 text-sm transition-transform duration-200 [&>a]:w-full [&>a]:py-1",
        state.navOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
        "md:relative md:top-0 md:right-0 md:flex md:w-auto md:scale-100 md:flex-row md:items-center md:gap-5 md:border-none md:bg-transparent md:text-base md:opacity-100 md:dark:bg-transparent md:[&>a]:w-auto md:[&>a]:p-0 md:[&>a]:px-2",
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
        "bg-sidebar border-border fixed inset-y-12 z-20 h-full w-2/3 transform flex-col overflow-auto border-r text-sm transition-transform duration-200 ease-in-out md:relative md:inset-y-0 md:w-48 md:duration-0",
        state.sidebarOpen === undefined && "-translate-x-full md:translate-x-0",
        state.sidebarOpen === true && "translate-x-0",
        state.sidebarOpen === false && "-translate-x-full",
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
  <div
    ref={ref}
    className={cn("flex gap-2 px-3 pt-2 font-bold", className)}
    {...props}
  />
));
DashboardSidebarLabel.displayName = "DashboardSidebarLabel";

const DashboardSidebarItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { active?: boolean }
>(({ active = false, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "hover:bg-muted flex flex-row items-center gap-2 overflow-hidden px-3 py-1 font-normal text-nowrap",
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

export type SidebarItem = {
  text: string;
  link?: string;
  items?: SidebarItem[];
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const DashboardSidebarList = (props: {
  pathname: string;
  items?: SidebarItem[];
}) => {
  const { pathname, items } = props;
  if (!items) return null;

  return (
    <DashboardSidebarGroup>
      {items.map((item) => {
        if (item.link) {
          return (
            <div key={item.text}>
              <Link href={item.link}>
                <DashboardSidebarItem active={pathname === item.link}>
                  {item.icon ? <item.icon size={16} /> : null}
                  {item.text}
                </DashboardSidebarItem>
              </Link>

              <DashboardSidebarList pathname={pathname} items={item.items} />
            </div>
          );
        } else {
          return (
            <div key={item.text}>
              <DashboardSidebarLabel>
                {item.icon ? <item.icon size={16} /> : null}
                {item.text}
              </DashboardSidebarLabel>

              <DashboardSidebarList pathname={pathname} items={item.items} />
            </div>
          );
        }
      })}
    </DashboardSidebarGroup>
  );
};

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
  DashboardSidebarList,
};

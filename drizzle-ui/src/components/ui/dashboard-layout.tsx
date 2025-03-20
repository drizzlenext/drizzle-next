"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { MenuIcon, SidebarIcon, XIcon } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { JSX } from "react";

type NavItemType = {
  text: string;
  link: string;
  target?: React.HTMLAttributeAnchorTarget;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
};

type SidebarItemType = {
  text: string;
  link?: string;
  items?: SidebarItemType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  target?: React.HTMLAttributeAnchorTarget;
};

// the sidebarOpen flag must begin as undefined
// to handle different starting states for sm and md resolutions
type DashboardLayoutState = {
  sidebarOpen?: boolean;
  navOpen?: boolean;
};

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
        "bg-background border-border absolute top-12 z-50 flex w-full origin-top transform flex-col items-center gap-2 border-b px-2 py-3 transition-transform duration-200 [&>a]:w-full [&>a]:py-1",
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

const DashboardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 overflow-hidden", className)}
    {...props}
  />
));
DashboardContent.displayName = "DashboardContent";

const DashboardNavList = (props: {
  pathname?: string | null;
  items?: NavItemType[];
}) => {
  const { pathname, items } = props;
  if (!items) return null;
  return (
    <>
      {items.map((item) => {
        return (
          <div key={item.text + item.link}>
            <Link
              href={item.link}
              className={cn(
                "hover:text-primary flex items-center gap-0.5 font-semibold",
                pathname === item.link && "text-primary",
              )}
            >
              {item.text}
              {item.icon && <item.icon size={16} />}
            </Link>
          </div>
        );
      })}
    </>
  );
};

const SidebarToggle = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & { icon?: JSX.Element }
>(({ className, icon, ...props }, ref) => {
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
      {icon ?? <SidebarIcon />}
    </Button>
  );
});
SidebarToggle.displayName = "SidebarToggle";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state } = React.useContext(DashboardLayoutContext);

  return (
    <div
      ref={ref}
      className={cn(
        "bg-sidebar border-border fixed inset-y-12 z-20 flex h-[calc(100vh-3rem)] w-2/3 transform flex-col border-r transition-transform duration-200 ease-in-out md:relative md:inset-y-0 md:w-48 md:duration-0",
        state.sidebarOpen === undefined && "-translate-x-full md:translate-x-0",
        state.sidebarOpen === true && "translate-x-0",
        state.sidebarOpen === false && "-translate-x-full",
        className,
      )}
      {...props}
    />
  );
});
Sidebar.displayName = "DashboardSidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border-border bg-sidebar sticky top-0 z-10 flex min-h-12 items-center border-b p-3",
      className,
    )}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("overflow-auto", className)} {...props} />
));
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border-border bg-sidebar sticky bottom-0 z-10 flex min-h-12 items-center border-t p-3",
      className,
    )}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-1", className)} {...props} />
));
SidebarGroup.displayName = "SidebarGroup";

const SidebarLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex gap-2 px-3 pt-2 font-bold", className)}
    {...props}
  />
));
SidebarLabel.displayName = "SidebarLabel";

const SidebarItem = React.forwardRef<
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
SidebarItem.displayName = "DashboardSidebarItem";

const SidebarList = (props: {
  pathname?: string | null;
  items?: SidebarItemType[];
}) => {
  const { pathname, items } = props;
  if (!items) return null;

  return (
    <SidebarGroup>
      {items.map((item) => {
        if (item.link) {
          return (
            <div key={item.text + item.link}>
              <Link href={item.link} target={item.target}>
                <SidebarItem active={pathname === item.link}>
                  {item.icon ? <item.icon size={16} /> : null}
                  {item.text}
                </SidebarItem>
              </Link>

              <SidebarList pathname={pathname} items={item.items} />
            </div>
          );
        } else {
          return (
            <div key={item.text}>
              <SidebarLabel>
                {item.icon ? <item.icon size={16} /> : null}
                {item.text}
              </SidebarLabel>

              <SidebarList pathname={pathname} items={item.items} />
            </div>
          );
        }
      })}
    </SidebarGroup>
  );
};

export {
  DashboardLayout,
  SidebarToggle as SidebarToggle,
  DashboardHeader,
  DashboardTitle,
  DashboardNav,
  DashboardNavToggle,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarLabel,
  SidebarItem,
  DashboardContent,
  SidebarList,
  DashboardNavList,
  type SidebarItemType,
  type NavItemType,
};

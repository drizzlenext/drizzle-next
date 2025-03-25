"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MenuIcon, SidebarIcon, XIcon } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { JSX } from "react";

type AppNavItemType = {
  text: string;
  link: string;
  target?: React.HTMLAttributeAnchorTarget;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
};

type AppSidebarItemType = {
  text: string;
  link?: string;
  items?: AppSidebarItemType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  target?: React.HTMLAttributeAnchorTarget;
};

// the sidebarOpen flag must begin as undefined
// to handle different starting states for sm and md resolutions
type AppLayoutState = {
  sidebarOpen?: boolean;
  navOpen?: boolean;
  variant: AppLayoutVariant;
};

type AppLayoutVariant = "full" | "container";

const AppLayoutContext = React.createContext<{
  state: AppLayoutState;
  setState: React.Dispatch<React.SetStateAction<AppLayoutState>>;
}>({
  state: {
    sidebarOpen: undefined,
    navOpen: undefined,
    variant: "full",
  },
  setState: () => {},
});

const AppLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: AppLayoutVariant }
>(({ className, variant = "full", ...props }, ref) => {
  const [state, setState] = React.useState({
    variant: variant,
  } as AppLayoutState);

  return (
    <AppLayoutContext.Provider value={ { state, setState } }>
      <div
        ref={ref}
        className={cn(
          "bg-background text-foreground m-auto grid h-auto grid-rows-[auto_1fr] px-[0.2px]",
          variant === "container" && "border-border container border-x",
          state.sidebarOpen === undefined && "md:grid-cols-[192px_1fr]",
          state.sidebarOpen === true && "md:grid-cols-[192px_1fr]",
          state.sidebarOpen === false && "md:grid-cols-[0px_1fr]",
          className,
        )}
        {...props}
      />
    </AppLayoutContext.Provider>
  );
});
AppLayout.displayName = "AppLayout";

const AppHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-background border-border sticky top-0 z-50 flex h-12 w-full items-center justify-between gap-2 border-b md:col-span-2",
      className,
    )}
    {...props}
  />
));
AppHeader.displayName = "AppHeader";

const AppHeaderGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-2 flex items-center gap-2", className)}
    {...props}
  />
));
AppHeaderGroup.displayName = "AppHeaderGroup";

const AppNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state } = React.useContext(AppLayoutContext);
  return (
    <div
      ref={ref}
      className={cn(
        "bg-background border-border absolute top-12 left-0 z-50 flex h-[calc(100vh-3rem)] w-full origin-top transform flex-col items-center gap-2 border-b px-2 py-3 transition-all duration-200 [&>a]:w-full [&>a]:py-1",
        state.navOpen
          ? "scale-y-100 opacity-100"
          : "pointer-events-none scale-y-90 opacity-0 md:pointer-events-auto",
        "md:relative md:top-0 md:right-0 md:flex md:h-12 md:w-auto md:scale-100 md:flex-row md:items-center md:gap-5 md:border-none md:bg-transparent md:text-base md:opacity-100 md:dark:bg-transparent md:[&>a]:w-auto md:[&>a]:p-0 md:[&>a]:px-2",
        className,
      )}
      {...props}
    />
  );
});
AppNav.displayName = "AppNav";

const AppNavItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      (className =
        "border-border w-full max-w-72 border-b py-3 md:w-auto md:border-0 md:py-0"),
      className,
    )}
    {...props}
  />
));
AppNavItem.displayName = "AppNavItem";

const AppNavToggle = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { state, setState } = React.useContext(AppLayoutContext);

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
AppNavToggle.displayName = "AppNavToggle";

const AppContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("min-w-0", className)} {...props} />;
});
AppContent.displayName = "AppContent";

const AppNavList = (props: {
  pathname?: string | null;
  items?: AppNavItemType[];
}) => {
  const { pathname, items } = props;
  if (!items) return null;
  return (
    <>
      {items.map((item) => {
        return (
          <AppNavItem key={item.text + item.link}>
            <Link
              href={item.link}
              className={cn(
                "hover:text-primary flex items-center gap-0.5 font-semibold",
                pathname === item.link && "text-primary",
              )}
              target={item.target}
            >
              {item.text}
              {item.icon && <item.icon size={16} />}
            </Link>
          </AppNavItem>
        );
      })}
    </>
  );
};

const AppSidebarToggle = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & { icon?: JSX.Element }
>(({ className, icon, ...props }, ref) => {
  const { state, setState } = React.useContext(AppLayoutContext);

  const toggleAppSidebar = () => {
    setState((prevState) => {
      let newAppSidebarOpen;
      if (state.sidebarOpen === undefined) {
        // the initial behavior is different for sm and md screen sizes
        if (window.innerWidth <= 768) {
          newAppSidebarOpen = true;
        } else {
          newAppSidebarOpen = false;
        }
      } else {
        // after the sidebar is set the first time, revert to normal toggle behavior
        newAppSidebarOpen = !prevState.sidebarOpen;
      }
      return {
        ...prevState,
        sidebarOpen: newAppSidebarOpen,
      };
    });
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("", className)}
      onClick={toggleAppSidebar}
      {...props}
    >
      {icon ?? <SidebarIcon />}
    </Button>
  );
});
AppSidebarToggle.displayName = "AppSidebarToggle";

const AppSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state } = React.useContext(AppLayoutContext);

  return (
    <div
      ref={ref}
      className={cn(
        "bg-background border-border fixed top-12 z-20 flex h-[calc(100vh-48px)] w-2/3 transform flex-col border-r transition-transform duration-200 ease-in-out md:sticky md:w-48 md:duration-0",
        state.variant === "full" &&
          state.sidebarOpen === undefined &&
          "-translate-x-full md:translate-x-0",
        state.variant === "full" &&
          state.sidebarOpen === true &&
          "translate-x-0",
        state.variant === "full" &&
          state.sidebarOpen === false &&
          "-translate-x-full",
        state.variant === "container" &&
          state.sidebarOpen === undefined &&
          "-translate-x-full sm:translate-x-0",
        state.variant === "container" &&
          state.sidebarOpen === true &&
          "translate-x-0 sm:duration-0",
        state.variant === "container" &&
          state.sidebarOpen === false &&
          "-translate-x-full sm:invisible sm:duration-0",
        className,
      )}
      {...props}
    />
  );
});
AppSidebar.displayName = "AppSidebar";

const AppSidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "sticky top-0 z-10 flex min-h-12 items-center p-3",
      className,
    )}
    {...props}
  />
));
AppSidebarHeader.displayName = "AppSidebarHeader";

const AppSidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-grow overflow-auto", className)}
    {...props}
  />
));
AppSidebarContent.displayName = "AppSidebarContent";

const AppSidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "sticky bottom-0 z-10 flex min-h-12 items-center p-3",
      className,
    )}
    {...props}
  />
));
AppSidebarFooter.displayName = "AppSidebarFooter";

const AppSidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-1", className)} {...props} />
));
AppSidebarGroup.displayName = "AppSidebarGroup";

const AppSidebarLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex gap-2 px-3 pt-2 font-semibold", className)}
    {...props}
  />
));
AppSidebarLabel.displayName = "AppSidebarLabel";

const AppSidebarItem = React.forwardRef<
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
AppSidebarItem.displayName = "AppSidebarItem";

const AppSidebarList = (props: {
  pathname?: string | null;
  items?: AppSidebarItemType[];
}) => {
  const { pathname, items } = props;
  if (!items) return null;

  return (
    <AppSidebarGroup>
      {items.map((item) => {
        if (item.link) {
          return (
            <div key={item.text + item.link}>
              <Link href={item.link} target={item.target}>
                <AppSidebarItem active={pathname === item.link}>
                  {item.icon ? <item.icon size={16} /> : null}
                  {item.text}
                </AppSidebarItem>
              </Link>

              <AppSidebarList pathname={pathname} items={item.items} />
            </div>
          );
        } else {
          return (
            <div key={item.text}>
              <AppSidebarLabel>
                {item.icon ? <item.icon size={16} /> : null}
                {item.text}
              </AppSidebarLabel>

              <AppSidebarList pathname={pathname} items={item.items} />
            </div>
          );
        }
      })}
    </AppSidebarGroup>
  );
};

export {
  type AppNavItemType,
  type AppSidebarItemType,
  AppLayout,
  AppHeader,
  AppHeaderGroup,
  AppNav,
  AppNavItem,
  AppNavToggle,
  AppContent,
  AppNavList,
  AppSidebar,
  AppSidebarToggle,
  AppSidebarHeader,
  AppSidebarContent,
  AppSidebarGroup,
  AppSidebarLabel,
  AppSidebarItem,
  AppSidebarFooter,
  AppSidebarList,
};

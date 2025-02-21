"use client";

import * as React from "react";
import { cn } from "./utils";
import { PanelRightCloseIcon, PanelRightIcon } from "lucide-react";
import { Button } from "./button";

interface PageLayoutState {
  asideOpen: boolean;
}

const PageLayoutContext = React.createContext<{
  state: PageLayoutState;
  setState: React.Dispatch<React.SetStateAction<PageLayoutState>>;
}>({
  state: { asideOpen: false },
  setState: () => {},
});

const PageLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [state, setState] = React.useState<PageLayoutState>({
    asideOpen: false,
  });

  return (
    <PageLayoutContext.Provider value={{ state, setState }}>
      <div
        ref={ref}
        className={cn(
          "bg-page text-page-foreground relative grid min-h-[calc(100vh-3rem)] grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] overflow-auto overflow-x-clip",
          state.asideOpen ? "" : "",
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
>(({ className, ...props }, ref) => {
  const { state } = React.useContext(PageLayoutContext);
  return (
    <div
      ref={ref}
      className={cn(
        "bg-page text-page-foreground flex min-h-14 items-center justify-between gap-2 overflow-auto border-b px-5",
        state.asideOpen ? "col-span-3 md:col-span-2" : "col-span-3",
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
    className={cn(
      "bg-page text-page-foreground text-nowrap font-bold",
      className,
    )}
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
      "[&>a]:text-info-600 dark:[&>a]:text-info-400 bg-page text-page-foreground ml-auto flex items-center gap-5 p-2 px-5 py-2 [&>a]:underline",
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
  const { state } = React.useContext(PageLayoutContext);
  return (
    <div
      ref={ref}
      className={cn(
        "bg-page text-page-foreground row-start-2 overflow-auto px-5 py-2",
        state.asideOpen ? "col-span-3 md:col-span-2" : "col-span-3",
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
  const { state } = React.useContext(PageLayoutContext);
  return (
    <div
      ref={ref}
      className={cn(
        "bg-page text-page-foreground z-20 col-span-2 border-t p-4",
        state.asideOpen ? "col-span-3 md:col-span-2" : "col-span-3",
        className,
      )}
      {...props}
    />
  );
});
PageFooter.displayName = "PageFooter";

const PageAside = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state } = React.useContext(PageLayoutContext);
  return (
    <div
      ref={ref}
      className={cn(
        "bg-page text-page-foreground absolute inset-y-14 right-0 z-0 row-span-3 w-80 border-l p-4 md:static",
        state.asideOpen ? "" : "hidden",
        className,
      )}
      {...props}
    />
  );
});
PageAside.displayName = "PageAside";

const PageAsideToggle = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { state, setState } = React.useContext(PageLayoutContext);

  const toggleAside = () => {
    setState((prevState) => {
      return {
        ...prevState,
        asideOpen: !state.asideOpen,
      };
    });
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("", className)}
      {...props}
      onClick={toggleAside}
    >
      {state.asideOpen ? <PanelRightCloseIcon /> : <PanelRightIcon />}
    </Button>
  );
});
PageAsideToggle.displayName = "PageAsideToggle";

export {
  PageLayout,
  PageHeader,
  PageTitle,
  PageNav,
  PageContent,
  PageFooter,
  PageAside,
  PageAsideToggle,
};

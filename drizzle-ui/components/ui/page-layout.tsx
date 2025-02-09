"use client";

import * as React from "react";
import { cn } from "./utils";
import { PanelRightCloseIcon, PanelRightIcon } from "lucide-react";

interface PageLayoutState {
  asideOpen: boolean;
}

const PageLayoutContext = React.createContext<{
  state: PageLayoutState;
  setState: React.Dispatch<React.SetStateAction<PageLayoutState>>;
}>({
  state: { asideOpen: true },
  setState: () => {},
});

const PageLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [state, setState] = React.useState({ asideOpen: true });

  return (
    <PageLayoutContext.Provider value={{ state, setState }}>
      <div
        ref={ref}
        className={cn(
          "relative grid grid-cols-[1fr_0px] grid-rows-[auto_auto_auto] overflow-clip",
          state.asideOpen
            ? "sm:grid-cols-[1fr_208px]"
            : "sm:grid-cols-[1fr_0px]",
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
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "col-span-2 flex min-h-14 items-center justify-between gap-2 overflow-auto border-b border-muted-300 bg-muted-100 px-5 dark:border-muted-700 dark:bg-muted-900",
      className,
    )}
    {...props}
  />
));
PageHeader.displayName = "PageHeader";

const PageTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("font-bold", className)} {...props} />
));
PageTitle.displayName = "PageTitle";

const PageNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "ml-auto flex items-center gap-5 p-2 px-5 py-2 [&>a]:text-info-600 [&>a]:underline dark:[&>a]:text-info-400",
      className,
    )}
    {...props}
  />
));
PageNav.displayName = "PageNav";

const PageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-5 py-2", className)} {...props} />
));
PageContent.displayName = "PageContent";

const PageFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("col-span-2 px-5", className)} {...props} />
));
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
        "absolute inset-y-14 right-0 z-10 row-span-2 h-full min-w-52 max-w-52 transform border-l border-muted-300 bg-primary-50 p-4 transition-transform duration-300 ease-in-out dark:border-muted-700 dark:bg-primary-950",
        state.asideOpen ? "translate-x-0" : "translate-x-full",
        className,
      )}
      {...props}
    />
  );
});
PageAside.displayName = "PageAside";

const PageAsideToggle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
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
    <div
      ref={ref}
      className={cn("cursor-pointer select-none", className)}
      {...props}
      onClick={toggleAside}
    >
      {state.asideOpen ? <PanelRightCloseIcon /> : <PanelRightIcon />}
    </div>
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

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
  const [state, setState] = React.useState<PageLayoutState>({
    asideOpen: true,
  });

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setState((prevState) => ({
          ...prevState,
          asideOpen: true,
        }));
      }
      if (window.innerWidth < 768) {
        setState((prevState) => ({
          ...prevState,
          asideOpen: false,
        }));
      }
    };

    window.addEventListener("resize", handleResize);

    // Set initial state based on current window size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <PageLayoutContext.Provider value={{ state, setState }}>
      <div
        ref={ref}
        className={cn(
          "relative grid min-h-[calc(100vh-3rem)] grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] overflow-auto overflow-x-clip",
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
        "flex min-h-14 items-center justify-between gap-2 overflow-auto border-b border-muted-300 bg-primary-50 px-5 dark:border-muted-700 dark:bg-primary-950",
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
    className={cn("text-nowrap font-bold", className)}
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
>(({ className, ...props }, ref) => {
  const { state } = React.useContext(PageLayoutContext);
  return (
    <div
      ref={ref}
      className={cn(
        "row-start-2 overflow-auto px-5 py-2",
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
        "z-20 col-span-2 border-t border-muted-300 bg-muted-50 p-4 dark:border-muted-700 dark:bg-muted-950",
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
        "absolute inset-y-14 right-0 z-0 row-span-3 w-80 border-l border-muted-300 bg-primary-50 p-4 dark:border-muted-700 dark:bg-primary-950 md:static",
        state.asideOpen ? "" : "hidden",
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

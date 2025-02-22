"use client";

import * as React from "react";
import { cn } from "./utils";
import { PanelRightIcon } from "lucide-react";
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
  React.HTMLAttributes<HTMLDivElement> & { asideOpen?: boolean }
>(({ className, asideOpen = false, ...props }, ref) => {
  const [state, setState] = React.useState<PageLayoutState>({
    asideOpen: asideOpen,
  });

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      asideOpen: asideOpen,
    }));
  }, [asideOpen]);

  return (
    <PageLayoutContext.Provider value={{ state, setState }}>
      <div
        ref={ref}
        className={cn(
          "relative flex h-[calc(100vh-3rem)] flex-col overflow-auto overflow-x-clip bg-page text-page-foreground",
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
        "flex max-h-12 min-h-12 items-center justify-between gap-2 overflow-auto overflow-y-hidden border-b bg-page px-5 text-page-foreground",
        state.asideOpen ? "" : "",
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
      "text-nowrap bg-page font-bold text-page-foreground",
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
      "[&>a]:text-info-600 dark:[&>a]:text-info-400 ml-auto flex items-center gap-5 bg-page p-2 px-5 py-2 text-page-foreground [&>a]:underline",
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
        "flex-grow overflow-auto bg-page px-5 py-2 text-page-foreground",
        state.asideOpen ? "w-[30%] md:w-[50%]" : "",
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
        "z-20 max-h-12 min-h-12 border-t bg-page px-4 py-1 text-page-foreground",
        state.asideOpen ? "" : "",
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
        "absolute inset-y-12 right-0 z-0 w-[70%] transform border-l bg-page p-4 text-page-foreground transition-transform duration-200 md:w-[50%] md:duration-0",
        state.asideOpen ? "translate-x-0" : "translate-x-full",
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
      <PanelRightIcon />
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

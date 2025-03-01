"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
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
          "bg-page text-page-foreground relative flex h-[calc(100vh-3rem)] flex-col overflow-auto overflow-x-clip",
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
        "border-border bg-page text-page-foreground flex items-center justify-between gap-2 border-b p-3",
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
      "bg-page text-page-foreground font-bold text-nowrap",
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
      "bg-page text-page-foreground ml-auto flex items-center gap-3",
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
        "bg-page text-page-foreground flex-grow overflow-auto p-3",
        state.asideOpen ? "" : "",
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
        "bg-page text-page-foreground border-border z-0 flex items-center border-t p-3",
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
        "border-border bg-page text-page-foreground absolute right-0 z-10 h-full w-[70%] transform border-l p-3 transition-transform duration-200 md:w-[50%] md:duration-0",
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

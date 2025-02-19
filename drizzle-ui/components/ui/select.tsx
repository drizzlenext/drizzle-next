import * as React from "react";
import { cn } from "./utils";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(({ className, ...props }, ref) => {
  return (
    <select
      className={cn(
        "focus:border-ring w-full border bg-transparent px-3 py-1 focus:outline-none focus:ring-0",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Select.displayName = "Select";

const SelectOption = React.forwardRef<
  HTMLOptionElement,
  React.ComponentProps<"option">
>(({ className, ...props }, ref) => {
  return (
    <option
      className={cn("bg-background text-foreground", className)}
      ref={ref}
      {...props}
    />
  );
});
SelectOption.displayName = "SelectOption";

export { Select, SelectOption };

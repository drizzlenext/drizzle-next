import * as React from "react";
import { cn } from "./cn";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(({ className, ...props }, ref) => {
  return (
    <select
      className={cn(
        "w-full rounded border border-muted-400 bg-transparent px-3 py-1 focus:border-black focus:outline-none focus:ring-0 dark:border-muted-600 dark:focus:border-white",
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
      className={cn("bg-white dark:bg-black", className)}
      ref={ref}
      {...props}
    />
  );
});
SelectOption.displayName = "SelectOption";

export { Select, SelectOption };

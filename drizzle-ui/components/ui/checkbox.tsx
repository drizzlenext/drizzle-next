import * as React from "react";
import { cn } from "./utils";

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn("h-4 w-4", className)}
      {...props}
    />
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };

import * as React from "react";
import { cn } from "../../lib/utils";

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn("accent-checkbox h-5 w-5", className)}
      {...props}
    />
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };

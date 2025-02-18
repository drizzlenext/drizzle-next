import * as React from "react";
import { cn } from "./utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ type, className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "focus:border-input-500 dark:focus:border-input-500 h-9 w-full border border-muted-500 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 dark:border-muted-600",
          className,
        )}
        type={type}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

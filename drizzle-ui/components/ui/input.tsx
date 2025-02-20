import * as React from "react";
import { cn } from "./utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ type, className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "rounded-input h-9 w-full border border-input-border bg-input-background px-3 py-1 focus:border-input-ring focus:outline-none focus:ring-0",
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

import * as React from "react";
import { cn } from "./utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ type, className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "focus:border-input-ring border-input-border bg-input-background h-9 w-full border px-3 py-1 focus:outline-none focus:ring-0",
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

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ type, className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "w-full rounded border border-muted-400 bg-transparent px-3 py-1 focus:border-black focus:outline-none focus:ring-0 dark:border-muted-600 dark:focus:border-white",
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

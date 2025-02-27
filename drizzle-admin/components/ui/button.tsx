import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "muted"
  | "success"
  | "danger"
  | "warning"
  | "info";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }
>(({ className, variant, ...props }, ref) => {
  return (
    <button
      className={cn(
        "rounded bg-black px-3 py-1 text-white hover:opacity-80 disabled:opacity-50 dark:bg-white dark:text-black",
        variant === "primary" && "bg-primary-600 dark:bg-primary-400",
        variant === "muted" && "bg-muted-600 dark:bg-muted-400",
        variant === "success" && "bg-success-600 dark:bg-success-400",
        variant === "danger" && "bg-danger-600 dark:bg-danger-400",
        variant === "warning" && "bg-warning-600 dark:bg-warning-400",
        variant === "info" && "bg-info-600 dark:bg-info-400",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };

import * as React from "react";
import { cn } from "@/lib/utils";

type AlertVariant =
  | "primary"
  | "muted"
  | "success"
  | "danger"
  | "warning"
  | "info";

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: AlertVariant }
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded border border-black p-2 text-black dark:border-white dark:text-white",
      variant === "primary" &&
        "border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400",
      variant === "muted" &&
        "border-muted-600 text-muted-600 dark:border-muted-400 dark:text-muted-400",
      variant === "success" &&
        "border-success-600 text-success-600 dark:border-success-400 dark:text-success-400",
      variant === "danger" &&
        "border-danger-600 text-danger-600 dark:border-danger-400 dark:text-danger-400",
      variant === "warning" &&
        "border-warning-600 text-warning-600 dark:border-warning-400 dark:text-warning-400",
      variant === "info" &&
        "border-info-600 text-info-600 dark:border-info-400 dark:text-info-400",
      className,
    )}
    {...props}
  />
));
Alert.displayName = "Alert";

export { Alert };

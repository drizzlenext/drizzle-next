import * as React from "react";
import { cn } from "./utils";

type AlertVariant =
  | "default"
  | "primary"
  | "muted"
  | "success"
  | "danger"
  | "warning"
  | "info";

const alertVariantMap: Record<AlertVariant, string> = {
  default: "border-black text-black dark:border-white dark:text-white",
  primary:
    "border-primary-700 text-primary-700 dark:border-primary-500 dark:text-primary-500",
  muted:
    "border-muted-700 text-muted-700 dark:border-muted-500 dark:text-muted-500",
  success:
    "border-success-700 text-success-700 dark:border-success-500 dark:text-success-500",
  danger:
    "border-danger-700 text-danger-700 dark:border-danger-500 dark:text-danger-500",
  warning:
    "border-warning-700 text-warning-700 dark:border-warning-500 dark:text-warning-500",
  info: "border-info-700 text-info-700 dark:border-info-500 dark:text-info-500",
};

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: AlertVariant }
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border p-2",
      alertVariantMap.default,
      variant && alertVariantMap[variant],
      className,
    )}
    {...props}
  />
));
Alert.displayName = "Alert";

export { Alert };

import * as React from "react";
import { cn } from "./utils";

type ButtonVariant =
  | "default"
  | "primary"
  | "muted"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "outline"
  | "ghost";

const buttonVariantMap: Record<ButtonVariant, string> = {
  default: "bg-black dark:bg-white",
  primary: "bg-primary-600 dark:bg-primary-500",
  muted: "bg-muted-600 dark:bg-muted-500",
  success: "bg-success-600 dark:bg-success-500",
  danger: "bg-danger-600 dark:bg-danger-500",
  warning: "bg-warning-600 dark:bg-warning-500",
  info: "bg-info-600 dark:bg-info-500",
  outline:
    "bg-transparent dark:bg-transparent border border-muted-400 dark:border-muted-600 text-muted-950 dark:text-muted-50",
  ghost:
    "bg-transparent dark:bg-transparent hover:bg-muted-300 dark:hover:bg-muted-700 text-muted-950 dark:text-muted-50",
};

type ButtonSizeVariant = "default" | "icon";

const buttonSizeMap: Record<ButtonSizeVariant, string> = {
  default: "",
  icon: "min-h-9 min-w-9 py-0 px-0 flex items-center justify-center",
};

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSizeVariant;
  }
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(
        "px-3 py-1 text-muted-50 hover:opacity-80 disabled:opacity-50 dark:text-muted-950",
        buttonVariantMap.default,
        variant && buttonVariantMap[variant],
        size && buttonSizeMap[size],
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };

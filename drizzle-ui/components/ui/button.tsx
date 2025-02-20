import * as React from "react";
import { cn } from "./utils";

type ButtonVariant =
  | "default"
  | "muted"
  | "success"
  | "destructive"
  | "warning"
  | "info"
  | "outline"
  | "ghost";

const buttonVariantMap: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground",
  muted: "bg-muted text-muted-foreground",
  success: "bg-success text-success-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  warning: "bg-warning text-warning-foreground",
  info: "bg-info text-info-foreground",
  outline: "bg-transparent border border-input text-foreground",
  ghost: "bg-transparent text-foreground hover:bg-muted",
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
        "rounded-button px-3 py-1 hover:opacity-90 disabled:opacity-50",
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

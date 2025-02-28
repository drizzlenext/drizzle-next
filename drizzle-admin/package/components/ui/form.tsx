import * as React from "react";
import { cn } from "@/lib/utils";

const Form = React.forwardRef<HTMLFormElement, React.ComponentProps<"form">>(
  ({ className, ...props }, ref) => (
    <form ref={ref} className={cn("", className)} {...props} />
  ),
);
Form.displayName = "Form";

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
FormControl.displayName = "FormControl";

const FormMessage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-destructive", className)} {...props} />
));
FormMessage.displayName = "FormMessage";

export { Form, FormControl, FormMessage };

import * as React from "react";
import { cn } from "./utils";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label className={cn("block", className)} ref={ref} {...props} />
));
Label.displayName = "Label";

export { Label };

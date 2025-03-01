import * as React from "react";
import { cn } from "../../lib/utils";

const Avatar = ({
  src,
  className,
  children,
}: {
  src?: string | null;
  className?: string;
  children?: React.ReactNode;
}) => (
  <div className="bg-muted text-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs">
    {src ? (
      <img
        className={cn("h-6 w-6 rounded-full", className)}
        src={src}
        alt="avatar"
      />
    ) : (
      <div>{children}</div>
    )}
  </div>
);
Avatar.displayName = "Avatar";

export { Avatar };

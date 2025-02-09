import * as React from "react";
import { cn } from "./utils";

const Avatar = ({
  src,
  className,
  children,
}: {
  src?: string | null;
  className?: string;
  children?: React.ReactNode;
}) => (
  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted-300 text-xs text-black dark:bg-muted-800 dark:text-white">
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

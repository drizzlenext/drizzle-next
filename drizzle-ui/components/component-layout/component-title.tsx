import { ReactNode } from "react";

export function ComponentTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="border-b border-muted-300 dark:border-muted-700">
      {children}
    </h1>
  );
}

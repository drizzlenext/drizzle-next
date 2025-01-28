import { ReactNode } from "react";

export function ComponentTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-bold text-4xl border-b border-muted-300">{children}</h1>
  );
}

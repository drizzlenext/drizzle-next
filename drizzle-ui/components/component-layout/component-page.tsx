import { ReactNode } from "react";

export function ComponentPage({ children }: { children: ReactNode }) {
  return <div className="flex flex-col p-5 gap-5">{children}</div>;
}

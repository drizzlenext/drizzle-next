import { ReactNode } from "react";

export function ComponentPage({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-5 p-5">{children}</div>;
}

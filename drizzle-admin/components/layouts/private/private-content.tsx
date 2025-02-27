import { ReactNode } from "react";

export function PrivateContent({ children }: { children: ReactNode }) {
  return <div className="row-span-1 col-span-1 overflow-auto">{children}</div>;
}

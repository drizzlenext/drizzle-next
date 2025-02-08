import { ReactNode } from "react";

export function ComponentPage({ children }: { children: ReactNode }) {
  return (
    <div className="prose dark:prose-invert prose-pre:bg-[#0d1117] m-auto">
      {children}
    </div>
  );
}

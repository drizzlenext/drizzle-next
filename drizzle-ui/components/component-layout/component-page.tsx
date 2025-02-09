import { ReactNode } from "react";

export function ComponentPage({ children }: { children: ReactNode }) {
  return (
    <div className="prose m-auto !max-w-7xl p-5 dark:prose-invert prose-pre:bg-[#0d1117]">
      {children}
    </div>
  );
}

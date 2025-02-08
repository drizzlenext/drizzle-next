import { ReactNode } from "react";

export function ComponentPreview({ children }: { children: ReactNode }) {
  return (
    <div className="preview">
      <h2>Preview</h2>
      <div className="not-prose flex flex-col gap-5 rounded border border-muted-300 p-5 dark:border-muted-600">
        {children}
      </div>
    </div>
  );
}

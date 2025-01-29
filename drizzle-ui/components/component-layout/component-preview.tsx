import { ReactNode } from "react";

export function ComponentPreview({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2 className="text-3xl font-bold">Preview</h2>
      <div className="flex flex-col gap-5 rounded border border-muted-300 p-5">
        {children}
      </div>
    </div>
  );
}

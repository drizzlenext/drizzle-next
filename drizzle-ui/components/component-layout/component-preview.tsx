import { ReactNode } from "react";

export function ComponentPreview({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2 className="font-bold text-3xl">Preview</h2>
      <div className="p-5 border border-muted-300 rounded gap-5 flex flex-col">
        {children}
      </div>
    </div>
  );
}

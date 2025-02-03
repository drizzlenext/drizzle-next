import { ReactNode } from "react";

export function DocsContent({children}: {children: ReactNode}) {
  return (
    <div className="docs overflow-auto [&_h1]:text-4xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-bold">{children}</div>
  )
}
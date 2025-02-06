import { ReactNode } from "react";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[36px_1fr] sm:grid-cols-[180px_1fr] h-screen">
      {children}
    </div>
  );
}

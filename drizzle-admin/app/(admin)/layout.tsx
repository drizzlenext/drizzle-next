import { DarkModeScript } from "@/src";
import { AdminLayout } from "./_layouts/admin-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
      <DarkModeScript />
    </AdminLayout>
  );
}

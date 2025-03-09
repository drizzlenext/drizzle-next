import { DarkModeScript } from "drizzle-admin/drizzle-ui";
import { AdminLayout } from "./_layouts/admin-layout";
import "drizzle-admin/styles";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
      <DarkModeScript />
    </AdminLayout>
  );
}

import "drizzle-admin/styles";
import { AdminLayout } from "./_layouts/admin-layout";
import { DarkModeScript } from "drizzle-admin/drizzle-ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
      <DarkModeScript />
    </AdminLayout>
  );
}

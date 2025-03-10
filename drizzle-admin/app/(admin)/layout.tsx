import { DarkModeScript } from "@/src/drizzle-ui";
import { AdminLayout } from "./_components/admin-layout";
import "@/src/styles/styles.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
      <DarkModeScript />
    </AdminLayout>
  );
}

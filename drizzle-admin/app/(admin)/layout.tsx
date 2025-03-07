import { AdminLayout } from "./admin-layout";
import "drizzle-admin/styles";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

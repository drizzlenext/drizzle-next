import { users } from "@/schema/users";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { AdminLayout } from "@/app/(admin)/_components/admin-layout";
import { authorize } from "@/lib/authorize";
import { DarkModeScript } from "drizzle-admin/drizzle-ui";
import "drizzle-admin/styles";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authorize("admin");

  const userRow = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!userRow) {
    redirect("/admin-signin");
  }

  return (
    <AdminLayout userRow={userRow}>
      {children}
      <DarkModeScript />
    </AdminLayout>
  );
}

export const dynamic = "force-dynamic";

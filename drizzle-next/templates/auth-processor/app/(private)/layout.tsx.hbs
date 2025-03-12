import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/schema/users";
import { PrivateLayout } from "@/app/(private)/_components/private-layout";
import { authorize } from "@/lib/authorize";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authorize("user");

  const userRow = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!userRow) {
    redirect("/signin");
  }

  return (
    <PrivateLayout userRow={userRow} >
      {children}
    </PrivateLayout>
  );
}

export const dynamic = "force-dynamic";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { users } from "@/schema/users";
import { PrivateLayout } from "@/components/layouts/private/private-layout";
import { PrivateContent } from "@/components/layouts/private/private-content";
import { PrivateSidebar } from "@/components/layouts/private/private-sidebar";
import { PrivateHeader } from "@/components/layouts/private/private-header";
import { FlashMessage } from "@/components/ui/flash-message";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const userObj = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!userObj) {
    redirect("/signin");
  }

  return (
    <PrivateLayout>
      <PrivateHeader user={userObj} />
      <PrivateSidebar />
      <PrivateContent>
        <FlashMessage />
        {children}
      </PrivateContent>
    </PrivateLayout>
  );
}

export const dynamic = "force-dynamic";

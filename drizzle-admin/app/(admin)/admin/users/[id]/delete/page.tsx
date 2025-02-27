import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { UserDeleteForm } from "@/components/admin/users/user-delete-form";
import { db } from "@/lib/db";
import { users } from "@/schema/users";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const userObj = await db.query.users.findFirst({ where: eq(users.id, id) });

  if (!userObj) {
    notFound();
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Delete User</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/users`}>Back</Link>
        <Link href={`/admin/users/${ userObj.id }`}>Show</Link>
      </PageNav>
      <PageContent>
        <UserDeleteForm user={ userObj } />
      </PageContent>
    </PageLayout>
  );
}

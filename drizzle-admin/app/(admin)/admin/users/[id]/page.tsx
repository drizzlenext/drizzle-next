import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithRelations } from "@/queries/user-queries";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;

  const userObj = await getUserWithRelations(id);

  if (!userObj) {
    notFound();
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>User</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/users`}>Back</Link>
        <Link href={`/admin/users/${ userObj.id }/edit`}>Edit</Link>
        <Link href={`/admin/users/${ userObj.id }/delete`}>Delete</Link>
      </PageNav>
      <PageContent>
        <p><strong>Id:</strong> { userObj.id }</p>
        <p><strong>Name:</strong> { userObj.name }</p>
        <p><strong>Email:</strong> { userObj.email }</p>
        <p><strong>Email Verified:</strong> { userObj.emailVerified?.toLocaleString() }</p>
        <p><strong>Image:</strong> { userObj.image }</p>
        <p><strong>Role:</strong> { userObj.role }</p>
        <p><strong>Password:</strong> { userObj.password }</p>
        <p><strong>Created At:</strong> { userObj.createdAt?.toLocaleString() }</p>
        <p><strong>Updated At:</strong> { userObj.updatedAt?.toLocaleString() }</p>
      </PageContent>
    </PageLayout>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { UserUpdateForm } from "@/components/admin/users/user-update-form";
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
        <PageTitle>Editing User</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/users`}>Back</Link>
        <Link href={`/admin/users/${ userObj.id }`}>Show</Link>
      </PageNav>
      <PageContent>
        <UserUpdateForm 
          user={ userObj }
        />
      </PageContent>
    </PageLayout>
  );
}

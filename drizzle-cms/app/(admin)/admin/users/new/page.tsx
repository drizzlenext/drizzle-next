import Link from "next/link";
import { UserCreateForm } from "@/components/admin/users/user-create-form";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

export default async function Page() {

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>New User</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/users`}>Back</Link>
      </PageNav>
      <PageContent>
        <UserCreateForm 
        />
      </PageContent>
    </PageLayout>
  );
}

import Link from "next/link";
import { TagCreateForm } from "@/components/admin/tags/tag-create-form";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

export default async function Page() {

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>New Tag</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/tags`}>Back</Link>
      </PageNav>
      <PageContent>
        <TagCreateForm 
        />
      </PageContent>
    </PageLayout>
  );
}

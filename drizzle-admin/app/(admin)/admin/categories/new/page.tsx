import Link from "next/link";
import { CategoryCreateForm } from "@/components/admin/categories/category-create-form";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

export default async function Page() {

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>New Category</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/categories`}>Back</Link>
      </PageNav>
      <PageContent>
        <CategoryCreateForm 
        />
      </PageContent>
    </PageLayout>
  );
}

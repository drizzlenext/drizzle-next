import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryUpdateForm } from "@/components/admin/categories/category-update-form";
import { getCategoryWithRelations } from "@/queries/category-queries";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const categoryObj = await getCategoryWithRelations(id);

  if (!categoryObj) {
    notFound();
  }


  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Editing Category</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/categories`}>Back</Link>
        <Link href={`/admin/categories/${ categoryObj.id }`}>Show</Link>
      </PageNav>
      <PageContent>
        <CategoryUpdateForm 
          category={ categoryObj }
        />
      </PageContent>
    </PageLayout>
  );
}

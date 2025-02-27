import Link from "next/link";
import { notFound } from "next/navigation";
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
        <PageTitle>Category</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/categories`}>Back</Link>
        <Link href={`/admin/categories/${ categoryObj.id }/edit`}>Edit</Link>
        <Link href={`/admin/categories/${ categoryObj.id }/delete`}>Delete</Link>
      </PageNav>
      <PageContent>
        <p><strong>Id:</strong> { categoryObj.id }</p>
        <p><strong>Name:</strong> { categoryObj.name }</p>
        <p><strong>Created At:</strong> { categoryObj.createdAt?.toLocaleString() }</p>
        <p><strong>Updated At:</strong> { categoryObj.updatedAt?.toLocaleString() }</p>
      </PageContent>
    </PageLayout>
  );
}

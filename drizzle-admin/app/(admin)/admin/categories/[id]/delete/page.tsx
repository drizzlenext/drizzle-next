import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { CategoryDeleteForm } from "@/components/admin/categories/category-delete-form";
import { db } from "@/lib/db";
import { categories } from "@/schema/categories";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const categoryObj = await db.query.categories.findFirst({ where: eq(categories.id, id) });

  if (!categoryObj) {
    notFound();
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Delete Category</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/categories`}>Back</Link>
        <Link href={`/admin/categories/${ categoryObj.id }`}>Show</Link>
      </PageNav>
      <PageContent>
        <CategoryDeleteForm category={ categoryObj } />
      </PageContent>
    </PageLayout>
  );
}

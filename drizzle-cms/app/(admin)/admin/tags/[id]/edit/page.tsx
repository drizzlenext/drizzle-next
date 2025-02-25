import Link from "next/link";
import { notFound } from "next/navigation";
import { TagUpdateForm } from "@/components/admin/tags/tag-update-form";
import { getTagWithRelations } from "@/queries/tag-queries";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const tagObj = await getTagWithRelations(id);

  if (!tagObj) {
    notFound();
  }


  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Editing Tag</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/tags`}>Back</Link>
        <Link href={`/admin/tags/${ tagObj.id }`}>Show</Link>
      </PageNav>
      <PageContent>
        <TagUpdateForm 
          tag={ tagObj }
        />
      </PageContent>
    </PageLayout>
  );
}

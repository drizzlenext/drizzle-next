import Link from "next/link";
import { notFound } from "next/navigation";
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
        <PageTitle>Tag</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/tags`}>Back</Link>
        <Link href={`/admin/tags/${ tagObj.id }/edit`}>Edit</Link>
        <Link href={`/admin/tags/${ tagObj.id }/delete`}>Delete</Link>
      </PageNav>
      <PageContent>
        <p><strong>Id:</strong> { tagObj.id }</p>
        <p><strong>Name:</strong> { tagObj.name }</p>
        <p><strong>Created At:</strong> { tagObj.createdAt?.toLocaleString() }</p>
        <p><strong>Updated At:</strong> { tagObj.updatedAt?.toLocaleString() }</p>
      </PageContent>
    </PageLayout>
  );
}

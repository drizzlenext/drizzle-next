import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostWithRelations } from "@/queries/post-queries";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;

  const postObj = await getPostWithRelations(id);

  if (!postObj) {
    notFound();
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Post</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/posts`}>Back</Link>
        <Link href={`/admin/posts/${ postObj.id }/edit`}>Edit</Link>
        <Link href={`/admin/posts/${ postObj.id }/delete`}>Delete</Link>
      </PageNav>
      <PageContent>
        <p><strong>Id:</strong> { postObj.id }</p>
        <p><strong>Title:</strong> { postObj.title }</p>
        <p><strong>Category Id:</strong> { postObj.categoryId }</p>
        <p><strong>Content:</strong> { postObj.content }</p>
        <p><strong>Is Published:</strong> { postObj.isPublished ? "true": "false" }</p>
        <p><strong>Created At:</strong> { postObj.createdAt?.toLocaleString() }</p>
        <p><strong>Updated At:</strong> { postObj.updatedAt?.toLocaleString() }</p>
      </PageContent>
    </PageLayout>
  );
}

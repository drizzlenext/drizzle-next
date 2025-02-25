import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsTagWithRelations } from "@/queries/posts-tag-queries";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;

  const postsTagObj = await getPostsTagWithRelations(id);

  if (!postsTagObj) {
    notFound();
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Posts Tag</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/posts-tags`}>Back</Link>
        <Link href={`/admin/posts-tags/${ postsTagObj.id }/edit`}>Edit</Link>
        <Link href={`/admin/posts-tags/${ postsTagObj.id }/delete`}>Delete</Link>
      </PageNav>
      <PageContent>
        <p><strong>Id:</strong> { postsTagObj.id }</p>
        <p><strong>Post Id:</strong> { postsTagObj.postId }</p>
        <p><strong>Tag Id:</strong> { postsTagObj.tagId }</p>
        <p><strong>Created At:</strong> { postsTagObj.createdAt?.toLocaleString() }</p>
        <p><strong>Updated At:</strong> { postsTagObj.updatedAt?.toLocaleString() }</p>
      </PageContent>
    </PageLayout>
  );
}

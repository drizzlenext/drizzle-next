import Link from "next/link";
import { notFound } from "next/navigation";
import { PostsTagUpdateForm } from "@/components/admin/posts-tags/posts-tag-update-form";
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
        <PageTitle>Editing Posts Tag</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/posts-tags`}>Back</Link>
        <Link href={`/admin/posts-tags/${ postsTagObj.id }`}>Show</Link>
      </PageNav>
      <PageContent>
        <PostsTagUpdateForm 
          postsTag={ postsTagObj }
        />
      </PageContent>
    </PageLayout>
  );
}

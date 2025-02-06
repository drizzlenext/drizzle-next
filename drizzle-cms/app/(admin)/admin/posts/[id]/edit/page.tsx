import Link from "next/link";
import { notFound } from "next/navigation";
import { PostUpdateForm } from "@/components/admin/posts/post-update-form";
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
        <PageTitle>Editing Post</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/posts`}>Back</Link>
        <Link href={`/admin/posts/${ postObj.id }`}>Show</Link>
      </PageNav>
      <PageContent>
        <PostUpdateForm 
          post={ postObj }
        />
      </PageContent>
    </PageLayout>
  );
}

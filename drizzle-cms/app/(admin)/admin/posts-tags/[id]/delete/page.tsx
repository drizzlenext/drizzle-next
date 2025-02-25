import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { PostsTagDeleteForm } from "@/components/admin/posts-tags/posts-tag-delete-form";
import { db } from "@/lib/db";
import { postsTags } from "@/schema/posts-tags";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const postsTagObj = await db.query.postsTags.findFirst({ where: eq(postsTags.id, id) });

  if (!postsTagObj) {
    notFound();
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Delete Posts Tag</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/posts-tags`}>Back</Link>
        <Link href={`/admin/posts-tags/${ postsTagObj.id }`}>Show</Link>
      </PageNav>
      <PageContent>
        <PostsTagDeleteForm postsTag={ postsTagObj } />
      </PageContent>
    </PageLayout>
  );
}

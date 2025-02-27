import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { PostDeleteForm } from "@/components/admin/posts/post-delete-form";
import { db } from "@/lib/db";
import { posts } from "@/schema/posts";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const postObj = await db.query.posts.findFirst({ where: eq(posts.id, id) });

  if (!postObj) {
    notFound();
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Delete Post</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/posts`}>Back</Link>
        <Link href={`/admin/posts/${ postObj.id }`}>Show</Link>
      </PageNav>
      <PageContent>
        <PostDeleteForm post={ postObj } />
      </PageContent>
    </PageLayout>
  );
}

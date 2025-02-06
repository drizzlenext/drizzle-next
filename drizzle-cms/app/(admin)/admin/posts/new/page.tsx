import Link from "next/link";
import { PostCreateForm } from "@/components/admin/posts/post-create-form";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

export default async function Page() {

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>New Post</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/posts`}>Back</Link>
      </PageNav>
      <PageContent>
        <PostCreateForm 
        />
      </PageContent>
    </PageLayout>
  );
}

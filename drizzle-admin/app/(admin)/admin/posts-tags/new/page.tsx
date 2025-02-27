import Link from "next/link";
import { PostsTagCreateForm } from "@/components/admin/posts-tags/posts-tag-create-form";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

export default async function Page() {

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>New Posts Tag</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/posts-tags`}>Back</Link>
      </PageNav>
      <PageContent>
        <PostsTagCreateForm 
        />
      </PageContent>
    </PageLayout>
  );
}

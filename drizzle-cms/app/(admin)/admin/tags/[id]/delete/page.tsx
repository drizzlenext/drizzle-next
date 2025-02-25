import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { TagDeleteForm } from "@/components/admin/tags/tag-delete-form";
import { db } from "@/lib/db";
import { tags } from "@/schema/tags";
import { PageLayout, PageHeader, PageTitle, PageContent, PageNav } from "@/components/ui/page-layout";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const tagObj = await db.query.tags.findFirst({ where: eq(tags.id, id) });

  if (!tagObj) {
    notFound();
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Delete Tag</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href={`/admin/tags`}>Back</Link>
        <Link href={`/admin/tags/${ tagObj.id }`}>Show</Link>
      </PageNav>
      <PageContent>
        <TagDeleteForm tag={ tagObj } />
      </PageContent>
    </PageLayout>
  );
}

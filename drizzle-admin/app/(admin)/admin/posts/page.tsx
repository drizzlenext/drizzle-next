import Link from "next/link";
import { like } from "drizzle-orm";
import { db } from "@/lib/db";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { PageLayout, PageHeader, PageTitle, PageNav, PageContent, PageFooter } from "@/components/ui/page-layout";
import { Button } from "@/components/ui/button";
import { parseSearchParams } from "@/lib/search-params-utils";
import { posts } from "@/schema/posts";
import { PostTable } from "@/components/admin/posts/post-table";
import { getPostsWithRelationsList } from "@/queries/post-queries";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const {
    page = 1,
    pageIndex = 0,
    pageSize = 10,
    search,
    sortKey = "createdAt",
    sortOrder = "desc",
  } = parseSearchParams(searchParams);
  const filters = search ? like(posts.id, `%${search}%`) : undefined;
  const count = await db.$count(posts, filters);
  const totalPages = Math.ceil(count / pageSize);
  const postList = await getPostsWithRelationsList({
    filters: filters,
    sortKey: sortKey,
    sortOrder: sortOrder,
    limit: pageSize,
    offset: pageIndex * pageSize,
  });

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Posts</PageTitle>
        <SearchInput />
      </PageHeader>
      <PageNav>
        <Link href="/admin/posts/new">
          <Button variant="info">New</Button>
        </Link>
      </PageNav>
      <PageContent>
        <PostTable postList={ postList } />
      </PageContent>
      <PageFooter>
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          count={count}
        />
      </PageFooter>
    </PageLayout>
  );
}

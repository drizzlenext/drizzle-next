import Link from "next/link";
import { like } from "drizzle-orm";
import { db } from "@/lib/db";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { PageLayout, PageHeader, PageTitle, PageNav, PageContent, PageFooter } from "@/components/ui/page-layout";
import { Button } from "@/components/ui/button";
import { parseSearchParams } from "@/lib/search-params-utils";
import { postsTags } from "@/schema/posts-tags";
import { PostsTagTable } from "@/components/admin/posts-tags/posts-tag-table";
import { getPostsTagsWithRelationsList } from "@/queries/posts-tag-queries";

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
  const filters = search ? like(postsTags.id, `%${search}%`) : undefined;
  const count = await db.$count(postsTags, filters);
  const totalPages = Math.ceil(count / pageSize);
  const postsTagList = await getPostsTagsWithRelationsList({
    filters: filters,
    sortKey: sortKey,
    sortOrder: sortOrder,
    limit: pageSize,
    offset: pageIndex * pageSize,
  });

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Posts Tags</PageTitle>
        <SearchInput />
      </PageHeader>
      <PageNav>
        <Link href="/admin/posts-tags/new">
          <Button variant="info">New</Button>
        </Link>
      </PageNav>
      <PageContent>
        <PostsTagTable postsTagList={ postsTagList } />
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

import Link from "next/link";
import { like } from "drizzle-orm";
import { db } from "@/lib/db";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { PageLayout, PageHeader, PageTitle, PageNav, PageContent, PageFooter } from "@/components/ui/page-layout";
import { Button } from "@/components/ui/button";
import { parseSearchParams } from "@/lib/search-params-utils";
import { tags } from "@/schema/tags";
import { TagTable } from "@/components/admin/tags/tag-table";
import { getTagsWithRelationsList } from "@/queries/tag-queries";

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
  const filters = search ? like(tags.id, `%${search}%`) : undefined;
  const count = await db.$count(tags, filters);
  const totalPages = Math.ceil(count / pageSize);
  const tagList = await getTagsWithRelationsList({
    filters: filters,
    sortKey: sortKey,
    sortOrder: sortOrder,
    limit: pageSize,
    offset: pageIndex * pageSize,
  });

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Tags</PageTitle>
        <SearchInput />
      </PageHeader>
      <PageNav>
        <Link href="/admin/tags/new">
          <Button variant="info">New</Button>
        </Link>
      </PageNav>
      <PageContent>
        <TagTable tagList={ tagList } />
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

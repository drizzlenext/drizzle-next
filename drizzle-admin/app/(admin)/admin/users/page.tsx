import Link from "next/link";
import { like } from "drizzle-orm";
import { db } from "@/lib/db";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { PageLayout, PageHeader, PageTitle, PageNav, PageContent, PageFooter } from "@/components/ui/page-layout";
import { Button } from "@/components/ui/button";
import { parseSearchParams } from "@/lib/search-params-utils";
import { users } from "@/schema/users";
import { UserTable } from "@/components/admin/users/user-table";
import { getUsersWithRelationsList } from "@/queries/user-queries";

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
  const filters = search ? like(users.id, `%${search}%`) : undefined;
  const count = await db.$count(users, filters);
  const totalPages = Math.ceil(count / pageSize);
  const userList = await getUsersWithRelationsList({
    filters: filters,
    sortKey: sortKey,
    sortOrder: sortOrder,
    limit: pageSize,
    offset: pageIndex * pageSize,
  });

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Users</PageTitle>
        <SearchInput />
      </PageHeader>
      <PageNav>
        <Link href="/admin/users/new">
          <Button variant="info">New</Button>
        </Link>
      </PageNav>
      <PageContent>
        <UserTable userList={ userList } />
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

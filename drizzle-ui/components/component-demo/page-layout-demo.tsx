import {
  PageLayout,
  PageHeader,
  PageTitle,
  PageNav,
  PageContent,
  PageFooter,
  PageAside,
  PageAsideToggle,
} from "@/components/ui/page-layout";
import { SearchInput } from "@/components/ui/search-input";
import { Pagination } from "@/components/ui/pagination";
import { TableDemo } from "./table-demo";
import { Button } from "@/components/ui/button";

export function PageLayoutDemo() {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Page Header</PageTitle>
        <PageNav>
          <Button variant="info">New</Button>
        </PageNav>
        <PageAsideToggle />
      </PageHeader>
      <PageContent>
        <TableDemo />
      </PageContent>
      <PageAside>
        Filter
        <SearchInput />
      </PageAside>
      <PageFooter>
        <Pagination count={100} page={1} pageSize={10} totalPages={10} />
      </PageFooter>
    </PageLayout>
  );
}

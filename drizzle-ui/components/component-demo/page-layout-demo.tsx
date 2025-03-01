import {
  PageLayout,
  PageHeader,
  PageTitle,
  PageNav,
  PageContent,
  PageFooter,
  PageAside,
  PageAsideToggle,
} from "@/src/components/ui/page-layout";
import { SearchInput } from "@/src/components/ui/search-input";
import { Pagination } from "@/src/components/ui/pagination";
import { TableDemo } from "./table-demo";
import { Button } from "@/src/components/ui/button";

export function PageLayoutDemo() {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Page Header</PageTitle>
        <PageNav>
          <Button variant="info">New</Button>
          <PageAsideToggle className="ml-auto" />
        </PageNav>
      </PageHeader>
      <PageContent>
        <TableDemo />
      </PageContent>
      <PageAside>
        <PageAsideToggle className="ml-auto" />
        Filter
        <SearchInput />
      </PageAside>
      <PageFooter>
        <Pagination count={100} page={1} pageSize={10} totalPages={10} />
      </PageFooter>
    </PageLayout>
  );
}

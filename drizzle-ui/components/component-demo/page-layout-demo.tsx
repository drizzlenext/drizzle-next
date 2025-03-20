import {
  PageLayout,
  PageHeader,
  PageTitle,
  PageNav,
  PageContent,
  PageFooter,
} from "@/src/components/ui/page-layout";
import { TableDemo } from "./table-demo";

export function PageLayoutDemo() {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Page Header</PageTitle>
        <PageNav>Page Nav</PageNav>
      </PageHeader>
      <PageContent>
        <TableDemo />
      </PageContent>
      <PageFooter>Page Footer</PageFooter>
    </PageLayout>
  );
}

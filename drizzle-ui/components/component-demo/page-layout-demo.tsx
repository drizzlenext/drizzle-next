import {
  PageLayout,
  PageHeader,
  PageContent,
  PageFooter,
} from "@/src/components/ui/page-layout";
import { TableDemo } from "./table-demo";

export function PageLayoutDemo() {
  return (
    <PageLayout>
      <PageHeader>Page Header</PageHeader>
      <PageContent>
        <TableDemo />
      </PageContent>
      <PageFooter>Page Footer</PageFooter>
    </PageLayout>
  );
}

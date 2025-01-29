import {
  PageLayout,
  PageHeader,
  PageTitle,
  PageNav,
  PageContent,
  PageFooter,
} from "@/components/ui/page-layout";
import Link from "next/link";

export function PageLayoutDemo() {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Page Header</PageTitle>
      </PageHeader>
      <PageNav>
        <Link href="">Link</Link>
      </PageNav>
      <PageContent>Page content</PageContent>
      <PageFooter>Footer</PageFooter>
    </PageLayout>
  );
}

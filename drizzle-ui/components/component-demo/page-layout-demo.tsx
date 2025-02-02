import {
  PageLayout,
  PageHeader,
  PageTitle,
  PageNav,
  PageContent,
  PageFooter,
} from "@/components/ui/page-layout";
import Link from "next/link";
import { SearchInput } from "@/components/ui/search-input";
import { Pagination } from "../ui/pagination";

export function PageLayoutDemo() {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Page Header</PageTitle>
        <SearchInput />
      </PageHeader>
      <PageNav>
        <Link href="">Back</Link>
        <Link href="">Edit</Link>
        <Link href="">Delete</Link>
      </PageNav>
      <PageContent>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo delectus
        repellendus quibusdam, nisi aut harum ducimus corporis aliquam mollitia
        placeat rerum vero quam eum earum natus deleniti laudantium illo porro!
      </PageContent>
      <PageFooter>
        <Pagination count={100} page={1} pageSize={10} totalPages={10} />
      </PageFooter>
    </PageLayout>
  );
}

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
import Link from "next/link";
import { SearchInput } from "@/components/ui/search-input";
import { Pagination } from "../ui/pagination";

export function PageLayoutDemo() {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Page Header</PageTitle>
        <PageNav>
          <Link href="">Back</Link>
          <Link href="">Edit</Link>
          <Link href="">Delete</Link>
        </PageNav>
        <PageAsideToggle />
      </PageHeader>
      <PageContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <p key={index} className="mb-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
            soluta optio vel dolorum voluptatum ipsum, quam quidem animi nam qui
            eveniet, sapiente hic corrupti quibusdam dolor itaque blanditiis
            tenetur dolorem!
          </p>
        ))}
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

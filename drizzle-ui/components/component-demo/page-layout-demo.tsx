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
        <Link href="">Back</Link>
        <Link href="">Edit</Link>
        <Link href="">Delete</Link>
      </PageNav>
      <PageContent>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo delectus
        repellendus quibusdam, nisi aut harum ducimus corporis aliquam mollitia
        placeat rerum vero quam eum earum natus deleniti laudantium illo porro!
      </PageContent>
      <PageFooter>Footer</PageFooter>
    </PageLayout>
  );
}

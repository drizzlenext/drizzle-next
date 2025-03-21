import { PageContent, PageHeader, PageLayout, PageTitle } from "../drizzle-ui";
import {
  DrizzleAdminConfigComplete,
  Params,
  SearchParams,
} from "../types/types";

export async function RootPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleAdminConfigComplete;
}) {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Drizzle Admin</PageTitle>
      </PageHeader>
      <PageContent></PageContent>
    </PageLayout>
  );
}

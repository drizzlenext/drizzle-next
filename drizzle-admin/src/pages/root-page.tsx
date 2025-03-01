import { PageContent, PageHeader, PageLayout, PageTitle } from "drizzle-ui";
import {
  DrizzleAdminConfig,
  DrizzleAdminConfigComplete,
  Params,
  SearchParams,
} from "../types";

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

import { PageContent, PageHeader, PageLayout, PageTitle } from "drizzle-ui";
import {
  DrizzleCmsConfig,
  DrizzleCmsConfigComplete,
  Params,
  SearchParams,
} from "../types";

export async function RootPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleCmsConfigComplete;
}) {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Drizzle CMS</PageTitle>
      </PageHeader>
      <PageContent></PageContent>
    </PageLayout>
  );
}

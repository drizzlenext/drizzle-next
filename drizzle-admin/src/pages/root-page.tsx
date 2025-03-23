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
    <div>Drizzle Admin</div>
  );
}

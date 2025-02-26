import { config } from "@/drizzle-admin.config";
import { DrizzleAdmin } from "@/package/drizzle-admin";
import { Params, SearchParams } from "@/package/types";

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  return (
    <DrizzleAdmin
      params={props.params}
      searchParams={props.searchParams}
      config={config}
    />
  );
}

import { config } from "@/drizzle-cms.config";
import { DrizzleCms } from "@/package/drizzle-cms";
import { Params, SearchParams } from "@/package/types";
import "drizzle-ui/styles";

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  return (
    <DrizzleCms
      params={props.params}
      searchParams={props.searchParams}
      config={config}
    />
  );
}

import { db } from "@/lib/db";
import { DrizzleCms, DrizzleCmsConfig } from "@/package/drizzle-cms";
import { users } from "@/schema/users";

type Params = Promise<{ [key: string]: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

const config: DrizzleCmsConfig = {
  basePath: "/cms",
  schema: {
    users: { drizzleSchema: users, label: "Users", path: "users" },
  },
};

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  return (
    <DrizzleCms
      params={props.params}
      searchParams={props.searchParams}
      config={config}
      db={db}
    />
  );
}

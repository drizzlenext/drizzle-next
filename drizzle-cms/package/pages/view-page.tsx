import { capitalCase } from "change-case-all";
import {
  PageContent,
  PageHeader,
  PageLayout,
  PageNav,
  PageTitle,
} from "drizzle-ui";
import { DrizzleCmsConfig, Params, SearchParams } from "../types";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { renderValue } from "../utils";

export async function ViewPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleCmsConfig;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const config = props.config;
  const curTable = params.slug[0];
  const id = params.slug[1];
  const schema = config.schema[curTable];
  const drizzleSchema = schema.drizzleSchema;
  const db = props.config.db;
  const obj = await db.query[schema.path].findFirst({
    where: eq(drizzleSchema.id, id),
  });
  console.log(obj);

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>{capitalCase(curTable)}</PageTitle>
        <PageNav>
          <Link href={`${config.basePath}/${curTable}`}>Back</Link>
          <Link href={`${config.basePath}/${curTable}/${id}/edit`}>Edit</Link>
          <Link href={`${config.basePath}/${curTable}/${id}/delete`}>
            Delete
          </Link>
        </PageNav>
      </PageHeader>
      <PageContent>
        {Object.entries(obj).map(([key, value]) => (
          <div key={key}>
            <strong>{capitalCase(key)}</strong>: {renderValue(value)}
          </div>
        ))}
      </PageContent>
    </PageLayout>
  );
}

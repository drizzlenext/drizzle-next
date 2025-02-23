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
import { renderValue } from "../utils/shared-utils";
import { notFound } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

export async function ViewPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleCmsConfig;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const config = props.config;
  const curTable = params.segments[0];
  const id = params.segments[1];
  const schema = config.schema[curTable];
  const drizzleSchema = schema.drizzleSchema;
  const db = props.config.db;
  const obj = await db.query[schema.path].findFirst({
    where: eq(drizzleSchema.id, id),
  });

  if (!obj) {
    notFound();
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle className="flex items-center">
          <Link href={`${config.basePath}/${curTable}`} className="underline">
            {capitalCase(curTable)}
          </Link>{" "}
          <ChevronRightIcon /> {obj.id}
        </PageTitle>
        <PageNav>
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

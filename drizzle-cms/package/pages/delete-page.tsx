import {
  PageContent,
  PageHeader,
  PageLayout,
  PageNav,
  PageTitle,
} from "drizzle-ui";
import {
  ColumnInfoMap,
  DrizzleCmsConfig,
  Params,
  SearchParams,
} from "../types";
import { capitalCase } from "change-case-all";
import { eq, getTableColumns } from "drizzle-orm";
import Link from "next/link";
import { ObjectDeleteForm } from "../components/object-delete-form";
import { notFound } from "next/navigation";

export async function DeletePage(props: {
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

  const cols = getTableColumns(drizzleSchema);
  const columnInfoMap: ColumnInfoMap = {};
  for (const col in cols) {
    columnInfoMap[col] = drizzleSchema[col].dataType;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Delete {capitalCase(curTable)}</PageTitle>
        <PageNav>
          <Link href={`${config.basePath}/${curTable}`}>Back</Link>
          <Link href={`${config.basePath}/${curTable}/${id}`}>View</Link>
          <Link href={`${config.basePath}/${curTable}/${id}/edit`}>Edit</Link>
        </PageNav>
      </PageHeader>
      <PageContent>
        <ObjectDeleteForm
          obj={obj}
          curTable={curTable}
          columnInfoMap={columnInfoMap}
        />
      </PageContent>
    </PageLayout>
  );
}

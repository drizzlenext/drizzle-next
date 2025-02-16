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
import { ObjectForm } from "../components/object-form";

export async function EditPage(props: {
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

  const cols = getTableColumns(drizzleSchema);
  const columnInfoMap: ColumnInfoMap = {};
  for (const col in cols) {
    columnInfoMap[col] = drizzleSchema[col].dataType;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Editing {capitalCase(curTable)}</PageTitle>
        <PageNav>
          <Link href={`${config.basePath}/${curTable}`}>Back</Link>
          <Link href={`${config.basePath}/${curTable}/${id}`}>View</Link>
          <Link href={`${config.basePath}/${curTable}/${id}/delete`}>
            Delete
          </Link>
        </PageNav>
      </PageHeader>
      <PageContent>
        <ObjectForm
          obj={obj}
          curTable={curTable}
          columnInfoMap={columnInfoMap}
        />
      </PageContent>
    </PageLayout>
  );
}

import {
  PageContent,
  PageHeader,
  PageLayout,
  PageNav,
  PageTitle,
} from "drizzle-ui";
import {
  ColumnDataTypeMap,
  DrizzleCmsConfig,
  DrizzleCmsConfigComplete,
  Params,
  SearchParams,
} from "../types";
import { capitalCase } from "change-case-all";
import { eq, getTableColumns } from "drizzle-orm";
import Link from "next/link";
import { ObjectDeleteForm } from "../components/object-delete-form";
import { notFound } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

export async function DeletePage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleCmsConfigComplete;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const config = props.config;
  const curTable = params.segments[0];
  const id = params.segments[1];
  const schema = config.schema[curTable];
  const drizzleTable = schema.drizzleTable;
  const db = props.config.db;
  const obj = await db.query[schema.path].findFirst({
    where: eq(drizzleTable.id, id),
  });

  if (!obj) {
    notFound();
  }

  const cols = getTableColumns(drizzleTable);
  const columnInfoMap: ColumnDataTypeMap = {};
  for (const col in cols) {
    columnInfoMap[col] = drizzleTable[col].dataType;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle className="flex items-center">
          <Link href={`${config.basePath}/${curTable}`} className="underline">
            {capitalCase(curTable)}
          </Link>{" "}
          <ChevronRightIcon />{" "}
          <Link
            href={`${config.basePath}/${curTable}/${id}`}
            className="underline"
          >
            {obj.id}
          </Link>
          <ChevronRightIcon />
          Delete
        </PageTitle>
        <PageNav>
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

import { PageContent, PageHeader, PageLayout, PageTitle } from "drizzle-ui";
import {
  ColumnDataTypeMap,
  DrizzleCmsConfig,
  Params,
  SearchParams,
} from "../types";
import { capitalCase } from "change-case-all";
import pluralize from "pluralize";
import { ObjectCreateForm } from "../components/object-create-form";
import { getTableColumns } from "drizzle-orm";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export async function NewPage(props: {
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

  const cols = getTableColumns(drizzleSchema);
  const columnDataTypeMap: ColumnDataTypeMap = {};
  for (const col in cols) {
    columnDataTypeMap[col] = drizzleSchema[col].dataType;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle className="flex items-center">
          <Link href={`${config.basePath}/${curTable}`} className="underline">
            {capitalCase(curTable)}
          </Link>
          <ChevronRightIcon />
          New
        </PageTitle>
      </PageHeader>
      <PageContent>
        <ObjectCreateForm
          columnDataTypeMap={columnDataTypeMap}
          formControlMap={schema.formControlMap}
          curTable={curTable}
        />
      </PageContent>
    </PageLayout>
  );
}

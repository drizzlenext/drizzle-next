import { PageContent, PageHeader, PageLayout, PageTitle } from "../drizzle-ui";
import {
  ColumnDataTypeMap,
  DrizzleAdminConfigComplete,
  Params,
  SearchParams,
} from "../types/types";
import { camelCase, capitalCase } from "change-case-all";
import { ObjectCreateForm } from "../components/object-create-form";
import { getTableColumns } from "drizzle-orm";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export async function NewPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleAdminConfigComplete;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const config = props.config;
  const curPath = params.segments[0];
  const curTable = camelCase(curPath);
  const id = params.segments[1];
  const drizzleTableConfig = config.schema[curTable];
  const drizzleTable = drizzleTableConfig.drizzleTable;
  const db = props.config.db;

  const cols = getTableColumns(drizzleTable);
  const columnDataTypeMap: ColumnDataTypeMap = {};
  for (const col in cols) {
    columnDataTypeMap[col] = drizzleTable[col].dataType;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle className="flex items-center">
          <Link href={`${config.basePath}/${curPath}`} className="underline">
            {capitalCase(curPath)}
          </Link>
          <ChevronRightIcon />
          New
        </PageTitle>
      </PageHeader>
      <PageContent>
        <ObjectCreateForm
          columnDataTypeMap={columnDataTypeMap}
          formControlMap={drizzleTableConfig.formControlMap}
          curTable={curTable}
        />
      </PageContent>
    </PageLayout>
  );
}

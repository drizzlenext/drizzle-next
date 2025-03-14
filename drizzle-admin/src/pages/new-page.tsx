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
import { notFound } from "next/navigation";

export async function NewPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleAdminConfigComplete;
}) {
  const params = await props.params;
  const config = props.config;
  const resourcePath = params.segments[0];
  const curTable = camelCase(resourcePath);
  const drizzleTableConfig = config.schema[curTable];
  if (!drizzleTableConfig) {
    notFound();
  }
  const drizzleTable = drizzleTableConfig.drizzleTable;
  const cols = getTableColumns(drizzleTable);
  const columnDataTypeMap: ColumnDataTypeMap = {};

  for (const col in cols) {
    columnDataTypeMap[col] = drizzleTable[col].dataType;
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle className="flex items-center">
          <Link
            href={`${config.basePath}/${resourcePath}`}
            className="underline"
          >
            {capitalCase(resourcePath)}
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
          customFormControlMap={drizzleTableConfig.customFormControlMap}
        />
      </PageContent>
    </PageLayout>
  );
}

import {
  PageContent,
  PageHeader,
  PageLayout,
  PageNav,
  PageTitle,
} from "../drizzle-ui";
import {
  ColumnDataTypeMap,
  DrizzleAdminConfig,
  DrizzleAdminConfigComplete,
  Params,
  SearchParams,
} from "../lib/types";
import { camelCase, capitalCase } from "change-case-all";
import { eq, getTableColumns } from "drizzle-orm";
import Link from "next/link";
import { ObjectUpdateForm } from "../components/object-update-form";
import { notFound } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

export async function EditPage(props: {
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
  const obj = await db.query[curTable].findFirst({
    where: eq(drizzleTable.id, id),
  });

  if (!obj) {
    notFound();
  }

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
          <ChevronRightIcon />{" "}
          <Link
            href={`${config.basePath}/${curPath}/${id}`}
            className="underline"
          >
            {obj.id}
          </Link>{" "}
          <ChevronRightIcon /> Edit
        </PageTitle>
        <PageNav>
          {drizzleTableConfig.components?.EditPageActions && (
            <drizzleTableConfig.components.EditPageActions
              basePath={config.basePath}
              curPath={curPath}
              curTable={curTable}
              row={obj}
            />
          )}
        </PageNav>
      </PageHeader>
      <PageContent>
        <ObjectUpdateForm
          obj={obj}
          curTable={curTable}
          columnDataTypeMap={columnDataTypeMap}
        />
      </PageContent>
    </PageLayout>
  );
}

import { camelCase, capitalCase } from "change-case-all";
import {
  Button,
  PageAside,
  PageAsideToggle,
  PageContent,
  PageFooter,
  PageHeader,
  PageLayout,
  PageNav,
  PageTitle,
  Pagination,
} from "drizzle-ui";
import { ObjectTable } from "../components/object-table";
import { DrizzleFilter } from "../drizzle-filter";
import { parseSearchParams } from "../utils/server-utils";
import { and, asc, desc, eq, like, getTableColumns } from "drizzle-orm";
import { getTableConfig } from "drizzle-orm/sqlite-core";
import {
  ColumnDataTypeMap,
  DrizzleCmsConfig,
  DrizzleCmsConfigComplete,
  Filter,
  Params,
  SearchParams,
} from "../types";
import Link from "next/link";
import { ObjectUpdateForm } from "../components/object-update-form";
import { OPERATOR_MAP } from "../constants/server-constants";

export interface ListPageParams {
  curTable: string;
  simplifiedColumns: { name: string; dataType: any }[];
  config: DrizzleCmsConfig;
}

export async function ListPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleCmsConfigComplete;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const filtersParam = searchParams.filters;

  let filters: Array<Filter> = [];

  if (filtersParam) {
    try {
      // Decode and parse the URL-encoded JSON
      filters = JSON.parse(decodeURIComponent(filtersParam));
      // return filters;
    } catch (error) {
      return "Invalid filters format";
    }
  }

  const config = props.config;
  const db = props.config.db;

  const curPath = params.segments[0];
  const curTable = camelCase(curPath);

  const drizzleTableConfig = config.schema[curTable];

  const drizzleTable = drizzleTableConfig.drizzleTable;

  const {
    page = 1,
    pageIndex = 0,
    pageSize = 10,
    search,
    sortKey = "createdAt",
    sortOrder = "desc",
  } = parseSearchParams(searchParams);

  let orderBy;

  if (sortKey && sortKey in drizzleTable) {
    switch (sortOrder) {
      case "asc":
        orderBy = asc(drizzleTable[sortKey as keyof typeof drizzleTable]);
        break;
      case "desc":
        orderBy = desc(drizzleTable[sortKey as keyof typeof drizzleTable]);
        break;
      default:
        break;
    }
  }

  const tableConf = getTableConfig(drizzleTable);

  if (config.dbDialect === "sqlite" || config.dbDialect === "mysql") {
    OPERATOR_MAP["Contains - Case Insensitive"] = like;
  }

  const whereClause = [];

  for (const filter of filters) {
    if (!filter.column && !filter.operator && !filter.value) continue;
    if (!(filter.operator in OPERATOR_MAP)) {
      throw new Error("operator invalid");
    }
    const op = OPERATOR_MAP[filter.operator as keyof typeof OPERATOR_MAP];
    const col = drizzleTable[filter.column];
    let parsedValue;
    if (col.dataType === "date" && filter.operator !== "Contains") {
      parsedValue = new Date(filter.value);
    } else if (filter.operator.startsWith("Contains")) {
      parsedValue = `%${filter.value}%`;
    } else {
      parsedValue = filter.value;
    }

    whereClause.push(op(drizzleTable[filter.column], parsedValue));
  }

  const count = await db.$count(drizzleTable, and(...whereClause));

  const totalPages = Math.ceil(count / pageSize);

  const list = await db.query[curTable].findMany({
    limit: pageSize,
    offset: pageIndex * pageSize,
    orderBy: orderBy,
    where: and(...whereClause),
  });
  const simplifiedColumns = tableConf.columns.map((col) => {
    return {
      name: col.name,
      dataType: col.dataType,
    };
  });

  const cols = getTableColumns(drizzleTable);
  const columnDataTypeMap: ColumnDataTypeMap = {};
  for (const col in cols) {
    columnDataTypeMap[col] = drizzleTable[col].dataType;
  }

  let obj;
  if (searchParams.id) {
    obj = await db.query[curTable].findFirst({
      where: eq(drizzleTable.id, searchParams.id),
    });
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle className="flex gap-5 items-center">
          {capitalCase(curPath)}{" "}
        </PageTitle>
        <PageNav className="flex-wrap px-0">
          {drizzleTableConfig.ListPageActionsSlot && (
            <drizzleTableConfig.ListPageActionsSlot
              basePath={config.basePath}
              curPath={curPath}
              curTable={curTable}
            />
          )}
          {!drizzleTableConfig.ListPageActionsSlot && (
            <Link href={`${config.basePath}/${curPath}/new`}>
              <Button className="rounded-2xl" variant="muted">
                New
              </Button>
            </Link>
          )}
          <PageAsideToggle />
        </PageNav>
      </PageHeader>
      <PageContent className="h-[calc(100vh-145px)]">
        <div className="flex justify-end">
          <DrizzleFilter simplifiedColumns={simplifiedColumns} />
        </div>
        <ObjectTable
          list={list}
          basePath={config.basePath}
          columns={simplifiedColumns}
          curTable={curTable}
          curPath={curPath}
          curRow={obj}
          TableRowActionsSlot={drizzleTableConfig.TableRowActionsSlot}
        />
      </PageContent>
      <PageAside className="overflow-auto">
        <PageAsideToggle className="ml-auto" />
        {obj && (
          <ObjectUpdateForm
            obj={obj}
            curTable={curTable}
            columnDataTypeMap={columnDataTypeMap}
            formControlMap={drizzleTableConfig.formControlMap}
          />
        )}
      </PageAside>
      <PageFooter className="flex justify-between">
        <Pagination
          count={count}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
        />
      </PageFooter>
    </PageLayout>
  );
}

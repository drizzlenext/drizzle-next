import { camelCase, capitalCase } from "change-case-all";
import {
  Button,
  Pagination,
} from "../drizzle-ui";
import { ObjectTable } from "../components/object-table";
import { DrizzleFilter } from "../components/drizzle-filter";
import { getColumnDataTypeMap, parseSearchParams } from "../lib/server-utils";
import { and, asc, desc, eq, like } from "drizzle-orm";
import { getTableConfig as getTableConfigForSqlite } from "drizzle-orm/sqlite-core";
import { getTableConfig as getTableConfigForMysql } from "drizzle-orm/mysql-core";
import { getTableConfig as getTableConfigForPostgresql } from "drizzle-orm/pg-core";
import {
  DrizzleAdminConfig,
  DrizzleAdminConfigComplete,
  Filter,
  Params,
  SearchParams,
} from "../types/types";
import Link from "next/link";
import { OPERATOR_MAP } from "../lib/server-constants";
import { notFound } from "next/navigation";
import { FilePlusIcon } from "lucide-react";

export type ListPageParams = {
  curTable: string;
  simplifiedColumns: { name: string; dataType: any }[];
  config: DrizzleAdminConfig;
}

export async function ListPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleAdminConfigComplete;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const filtersParam = searchParams.filters;
  let filters: Array<Filter> = [];
  const config = props.config;
  const db = props.config.db;
  const resourcePath = params.segments[0];
  const curTable = camelCase(resourcePath);
  const drizzleTableConfig = config.schema[curTable];
  if (!drizzleTableConfig) {
    notFound();
  }
  const drizzleTable = drizzleTableConfig.drizzleTable;
  let orderBy;
  let getTableConfig;
  switch (config.dbDialect) {
    case "sqlite":
      getTableConfig = getTableConfigForSqlite;
      break;
    case "postgresql":
      getTableConfig = getTableConfigForPostgresql;
      break;
    case "mysql":
      getTableConfig = getTableConfigForMysql;
      break;
    default:
      const exhaustiveCheck: never = config.dbDialect;
      throw new Error(`unhandled case: ${exhaustiveCheck}`);
  }
  // @ts-expect-error err
  const tableConf = getTableConfig(drizzleTable);
  const whereClause = [];
  let obj;

  const columnDataTypeMap = getColumnDataTypeMap(drizzleTable);

  if (filtersParam) {
    try {
      // Decode and parse the URL-encoded JSON
      filters = JSON.parse(decodeURIComponent(filtersParam));
      // return filters;
    } catch (error) {
      return "Invalid filters format";
    }
  }

  const {
    page = 1,
    pageIndex = 0,
    pageSize = 10,
    search,
    sortKey = "createdAt",
    sortOrder = "desc",
  } = parseSearchParams(searchParams);

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

  if (config.dbDialect === "sqlite" || config.dbDialect === "mysql") {
    OPERATOR_MAP["Contains - Case Insensitive"] = like;
  }

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
  const simplifiedColumns = tableConf.columns.map((col: any) => {
    return {
      name: col.name,
      dataType: col.dataType,
    };
  });

  if (searchParams.id) {
    obj = await db.query[curTable].findFirst({
      where: eq(drizzleTable.id, searchParams.id),
    });
  }

  return (
    <div className="p-3 flex flex-col gap-3">
      <div>
        <div className="flex gap-5 items-center">
          {capitalCase(resourcePath)}{" "}
        </div>
        <div className="flex-wrap px-0 flex justify-end gap-3">
          {drizzleTableConfig.components?.ListPageNav && (
            <drizzleTableConfig.components.ListPageNav
              basePath={config.basePath}
              resourcePath={resourcePath}
            />
          )}
          {!drizzleTableConfig.components?.ListPageNav && (
            <Link href={`${config.basePath}/${resourcePath}/new`}>
              <Button variant="muted" className="flex items-center gap-1">
                <FilePlusIcon size={16} /> New
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div>
        <DrizzleFilter simplifiedColumns={simplifiedColumns} />
      </div>
      <div className="overflow-auto border border-border rounded">
        <ObjectTable
          list={list}
          basePath={config.basePath}
          columns={simplifiedColumns}
          curTable={curTable}
          resourcePath={resourcePath}
          curRow={obj}
          RowActions={drizzleTableConfig.components?.RowNav}
        />
      </div>
      <div className="flex justify-end">
        <Pagination
          count={count}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

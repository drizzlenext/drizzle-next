import { capitalCase } from "change-case-all";
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
import { DrizzleTable } from "../drizzle-cms";
import { DrizzleFilter } from "../drizzle-filter";
import { parseSearchParams } from "../utils";
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  like,
  lt,
  lte,
  ne,
  ilike,
} from "drizzle-orm";
import { getTableConfig } from "drizzle-orm/sqlite-core";
import { DrizzleCmsConfig, Params, SearchParams } from "../types";
import Link from "next/link";

export interface ListPageParams {
  curTable: string;
  simplifiedColumns: { name: string; dataType: any }[];
  config: DrizzleCmsConfig;
}

const operatorMap = {
  "=": eq,
  "<>": ne,
  ">": gt,
  "<": lt,
  ">=": gte,
  "<=": lte,
  Contains: like,
  "Contains - Case Insensitive": ilike,
};

export async function ListPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleCmsConfig;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const filtersParam = searchParams.filters;

  let filters: Array<{ column: string; operator: string; value: string }> = [];

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

  const curTable = params.segments[0];

  const schema = config.schema[curTable];

  const drizzleSchema = schema.drizzleSchema;

  const {
    page = 1,
    pageIndex = 0,
    pageSize = 10,
    search,
    sortKey = "createdAt",
    sortOrder = "desc",
  } = parseSearchParams(searchParams);

  let orderBy;

  if (sortKey && sortKey in drizzleSchema) {
    switch (sortOrder) {
      case "asc":
        orderBy = asc(drizzleSchema[sortKey as keyof typeof drizzleSchema]);
        break;
      case "desc":
        orderBy = desc(drizzleSchema[sortKey as keyof typeof drizzleSchema]);
        break;
      default:
        break;
    }
  }

  const tableConf = getTableConfig(drizzleSchema);

  if (config.dbDialect === "sqlite" || config.dbDialect === "mysql") {
    operatorMap["Contains - Case Insensitive"] = like;
  }

  const whereClause = [];

  for (const filter of filters) {
    if (!filter.column && !filter.operator && !filter.value) continue;
    if (!(filter.operator in operatorMap)) {
      throw new Error("operator invalid");
    }
    const op = operatorMap[filter.operator as keyof typeof operatorMap];
    const col = drizzleSchema[filter.column];
    let parsedValue;
    if (col.dataType === "date" && filter.operator !== "Contains") {
      parsedValue = new Date(filter.value);
    } else if (filter.operator.startsWith("Contains")) {
      parsedValue = `%${filter.value}%`;
    } else {
      parsedValue = filter.value;
    }

    whereClause.push(op(drizzleSchema[filter.column], parsedValue));
  }

  const count = await db.$count(drizzleSchema, and(...whereClause));

  const totalPages = Math.ceil(count / pageSize);

  const list = await db.query[schema.path].findMany({
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

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>{capitalCase(curTable)}</PageTitle>
        <PageNav>
          <Link href={`${config.basePath}/${curTable}/new`}>
            <Button className="rounded-2xl" variant="info">
              New
            </Button>
          </Link>
          <PageAsideToggle />
        </PageNav>
      </PageHeader>
      <PageContent>
        <DrizzleFilter simplifiedColumns={simplifiedColumns} />
        <DrizzleTable
          list={list}
          columns={simplifiedColumns}
          curTable={curTable}
          config={config}
        />
      </PageContent>
      <PageAside>
        <PageTitle>Filters</PageTitle>
      </PageAside>
      <PageFooter>
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

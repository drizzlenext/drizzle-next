import {
  DrizzleCmsConfig,
  DrizzleCmsConfigComplete,
  DrizzleTableConfigComplete,
  SearchParams,
} from "../types";

export function parseSearchParams(
  searchParams: Awaited<SearchParams> | { [key: string]: string }
) {
  const page =
    typeof searchParams.page === "string"
      ? parseInt(searchParams.page)
      : undefined;
  const pageIndex = page ? page - 1 : undefined;
  const pageSize =
    typeof searchParams.pageSize === "string"
      ? parseInt(searchParams.pageSize)
      : undefined;
  const search = searchParams.search;
  const sortKey = searchParams.sortKey;
  const sortOrder = searchParams.sortOrder;
  return {
    page,
    pageIndex,
    pageSize,
    search,
    sortKey,
    sortOrder,
  };
}

// function for populating drizzle cms config with default values
// providing a complete config for drizzle cms
export function completeDrizzleCmsConfig(config: DrizzleCmsConfig) {
  const completeSchema: { [key: string]: DrizzleTableConfigComplete } = {};

  Object.entries(config.schema).forEach(([key, value]) => {
    completeSchema[key] = {
      drizzleTable: value.drizzleTable,
      tableName: value.tableName || key,
      label: value.label || key,
      path: value.path || key,
      formControlMap: value.formControlMap || {},
    };
  });

  const completeConfig: DrizzleCmsConfigComplete = {
    basePath: config.basePath,
    schema: completeSchema,
    db: config.db,
    dbDialect: config.dbDialect,
  };

  return completeConfig;
}

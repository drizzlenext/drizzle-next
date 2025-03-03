import { kebabCase } from "change-case-all";
import {
  DrizzleAdminConfig,
  DrizzleAdminConfigComplete,
  DrizzleAdminLayoutConfig,
  DrizzleTableConfigComplete,
  SearchParams,
} from "../types/types";

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

// function for populating drizzle admin config with default values
// providing a complete config for drizzle admin
export function completeDrizzleAdminConfig(config: DrizzleAdminConfig) {
  const completeSchema: { [key: string]: DrizzleTableConfigComplete } = {};

  Object.entries(config.schema).forEach(([key, value]) => {
    completeSchema[key] = {
      drizzleTable: value.drizzleTable,
      tableName: value.tableName || key,
      label: value.label || key,
      path: value.path || kebabCase(key),
      formControlMap: value.formControlMap || {},
      components: {
        RowActions: value.components?.RowActions,
        ViewPageActions: value.components?.ViewPageActions,
        ListPageActions: value.components?.ListPageActions,
        EditPageActions: value.components?.EditPageActions,
        DeletePageActions: value.components?.DeletePageActions,
      },
    };
  });

  const completeConfig: DrizzleAdminConfigComplete = {
    basePath: config.basePath,
    schema: completeSchema,
    db: config.db,
    dbDialect: config.dbDialect,
    sidebar: config.sidebar,
  };

  return completeConfig;
}

// function for generating the layout config from drizzle admin config
// can't use the admin config because it contains circular server-side references
export function completeLayoutConfig(config: DrizzleAdminConfig) {
  const conf = completeDrizzleAdminConfig(config);
  const completeConfig: DrizzleAdminLayoutConfig = {
    basePath: conf.basePath,
    sidebar: conf.sidebar,
  };
  return completeConfig;
}

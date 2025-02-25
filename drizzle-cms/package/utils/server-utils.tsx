import { kebabCase } from "change-case-all";
import {
  DrizzleCmsConfig,
  DrizzleCmsConfigComplete,
  DrizzleCmsLayoutConfig,
  DrizzleTableConfigComplete,
  SearchParams,
} from "../types";
import { Table2Icon } from "lucide-react";

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
      path: value.path || kebabCase(key),
      formControlMap: value.formControlMap || {},
      TableRowActionsSlot: value.TableRowActionsSlot,
      ViewPageActionsSlot: value.ViewPageActionsSlot,
      ListPageActionsSlot: value.ListPageActionsSlot,
      EditPageActionsSlot: value.EditPageActionsSlot,
      DeletePageActionsSlot: value.DeletePageActionsSlot,
    };
  });

  const completeConfig: DrizzleCmsConfigComplete = {
    basePath: config.basePath,
    schema: completeSchema,
    db: config.db,
    dbDialect: config.dbDialect,
    sidebar: config.sidebar,
  };

  return completeConfig;
}

// function for generating the layout config from drizzle cms config
// adds table links to sidebar dynamically if the dynamic-tables item is present
// can't use the cms config because it contains circular server-side references
// layout is client-side
export function completeLayoutConfig(config: DrizzleCmsConfig) {
  const conf = completeDrizzleCmsConfig(config);
  const completeConfig: DrizzleCmsLayoutConfig = {
    basePath: conf.basePath,
    sidebar: conf.sidebar,
  };

  const dynamicTablesSidebar = completeConfig.sidebar.find(
    (item) => item.type === "dynamic-tables"
  );

  if (dynamicTablesSidebar) {
    dynamicTablesSidebar.items = [];

    Object.entries(conf.schema).forEach(([key, value]) => {
      dynamicTablesSidebar?.items?.push({
        text: value.label,
        link: `${config.basePath}/${value.path}`,
      });
    });
  }

  return completeConfig;
}

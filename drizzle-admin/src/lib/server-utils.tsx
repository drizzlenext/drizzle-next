import { kebabCase } from "change-case-all";
import {
  ColumnDataTypeMap,
  DrizzleAdminConfig,
  DrizzleAdminConfigComplete,
  DrizzleTableConfigComplete,
  SearchParams,
} from "../types/types";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { getTableColumns } from "drizzle-orm";

export async function uploadFile({ file, dir }: { file: File; dir: string }) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const randomString = crypto.randomBytes(5).toString("hex"); // f48058c2e8
  const originalName = path.parse(file.name).name; // test image.png
  const sluggedName = originalName.replace(" ", "-"); // test-image.png
  const fileExt = path.extname(file.name); // .png
  const newFileName = `${sluggedName}-${randomString}${fileExt}`; // test-image-f48058c2e8.png
  const resolvedPath = path.join("uploads", dir, newFileName); // /uploads/table/column/test-image-f48058c2e8.png
  const resolvedDirPath = path.dirname(resolvedPath); // /uploads/table/column
  const fileUri = `/${dir}/${newFileName}`; // /uploads/table/column/test-image.png
  if (!fs.existsSync(resolvedDirPath)) {
    fs.mkdirSync(resolvedDirPath, { recursive: true });
  }
  fs.writeFileSync(resolvedPath, buffer);
  return fileUri;
}

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
      path: value.path || kebabCase(key),
      formControlMap: value.formControlMap || {},
      customFormControlMap: value.customFormControlMap || {},
      searchBy: value.searchBy,
      components: {
        RowNav: value.components?.RowNav,
        ViewPageNav: value.components?.ViewPageNav,
        ListPageNav: value.components?.ListPageNav,
        EditPageNav: value.components?.EditPageNav,
        DeletePageNav: value.components?.DeletePageNav,
      },
    };
  });

  const completeConfig: DrizzleAdminConfigComplete = {
    basePath: config.basePath,
    schema: completeSchema,
    db: config.db,
    dbDialect: config.dbDialect,
  };

  return completeConfig;
}

export function getColumnDataTypeMap(drizzleTable: any) {
    const cols = getTableColumns(drizzleTable);
    const columnDataTypeMap: ColumnDataTypeMap = {};
    for (const col in cols) {
      columnDataTypeMap[col] = drizzleTable[col].dataType;
    }
    return columnDataTypeMap;
}
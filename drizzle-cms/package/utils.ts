import { getTableColumns } from "drizzle-orm";
import { ColumnDataTypeMap, FormControlMap } from "./types";
import { DEFAULT_FORM_CONTROLS } from "./constants";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export function parseSearchParams(searchParams: Awaited<SearchParams>) {
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

export function renderValue(value: any) {
  if (typeof value === "object") {
    return new Date(value).toLocaleString();
  } else {
    return value;
  }
}

export function getFormControlMap(
  columnDataTypeMap: ColumnDataTypeMap,
  formControlMap?: FormControlMap
) {
  const defaultFormControl: FormControlMap = {};

  for (const col in columnDataTypeMap) {
    defaultFormControl[col] =
      DEFAULT_FORM_CONTROLS[
        columnDataTypeMap[col] as keyof typeof DEFAULT_FORM_CONTROLS
      ];
  }

  const mergedFormControls = Object.assign(
    {},
    defaultFormControl,
    formControlMap
  );

  return mergedFormControls;
}

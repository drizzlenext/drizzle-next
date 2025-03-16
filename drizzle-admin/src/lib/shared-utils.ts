import { ColumnDataTypeMap, FormControlMap } from "../types/types";
import { DEFAULT_FORM_CONTROLS } from "../lib/client-constants";

export function renderValue(key: string, value: any, columnDataTypeMap: ColumnDataTypeMap) {
  switch (columnDataTypeMap[key]) {
    case "boolean":
      return Boolean(value);
    case "date":
      return new Date(value).toLocaleString();
    case "json":
      return JSON.stringify(value);
    case "number":
      return value;
    case "string":
      return value;
    default:
      const exhaustiveCheck: never = columnDataTypeMap[key];
      throw new Error(`unhandled case: ${exhaustiveCheck}`);
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

import { ColumnDataTypeMap, FormControlMap } from "../types/types";
import { DEFAULT_FORM_CONTROLS } from "../lib/client-constants";

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

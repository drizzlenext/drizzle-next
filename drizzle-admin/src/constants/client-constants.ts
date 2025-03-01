import { ColumnDataType } from "drizzle-orm";
import { FormControlType } from "../lib/types";

export const DEFAULT_FORM_CONTROLS: Record<ColumnDataType, FormControlType> = {
  string: "input",
  number: "number",
  bigint: "number",
  boolean: "checkbox",
  array: "input",
  json: "textarea",
  date: "datetime-local",
  custom: "input",
  buffer: "input",
};

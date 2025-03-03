import { eq, gt, gte, like, lt, lte, ne, ilike } from "drizzle-orm";
import { ColumnDataType } from "drizzle-orm";
import { FormControlType } from "../types/types";

export const OPERATOR_MAP = {
  "=": eq,
  "<>": ne,
  ">": gt,
  "<": lt,
  ">=": gte,
  "<=": lte,
  Contains: like,
  "Contains - Case Insensitive": ilike,
};

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

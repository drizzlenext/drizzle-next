"use client";

import { Checkbox, FormControl, Input, Label, Textarea } from "drizzle-ui";
import { FormControlMap } from "../types";
import { capitalCase } from "change-case-all";
import { renderValue } from "../utils/shared-utils";

export function RenderFormControl({
  keyName,
  value,
  formControlMap,
}: {
  keyName: string;
  value: any;
  formControlMap: FormControlMap;
}) {
  switch (formControlMap[keyName]) {
    case "checkbox":
      return (
        <FormControl>
          <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
          <Checkbox defaultChecked={value} name={keyName} id={keyName} />
        </FormControl>
      );
    case "date":
      return (
        <FormControl>
          <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
          <Input
            // type="date"
            defaultValue={
              value instanceof Date
                ? value?.toISOString()
                : typeof value === "string"
                ? new Date(value).toISOString()
                : undefined
            }
            name={keyName}
            id={keyName}
          />
        </FormControl>
      );
    case "datetime-local":
      return (
        <FormControl>
          <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
          <Input
            // type="datetime-local"
            defaultValue={
              value instanceof Date
                ? value.toISOString()
                : typeof value === "string"
                ? new Date(value).toISOString()
                : undefined
            }
            name={keyName}
            id={keyName}
          />
        </FormControl>
      );
    case "input":
      return (
        <FormControl>
          <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
          <Input
            defaultValue={renderValue(value)}
            name={keyName}
            id={keyName}
          />
        </FormControl>
      );
    case "number":
      return (
        <FormControl>
          <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
          <Input
            defaultValue={renderValue(value)}
            name={keyName}
            id={keyName}
            type="number"
          />
        </FormControl>
      );
    case "textarea":
      return (
        <FormControl>
          <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
          <Textarea
            defaultValue={renderValue(value)}
            name={keyName}
            id={keyName}
          />
        </FormControl>
      );
    default:
      const exhaustiveCheck: never = formControlMap[keyName];
      throw new Error(`unhandled case: ${exhaustiveCheck}`);
  }
}

"use client";

import {
  Checkbox,
  FormControl,
  Input,
  Label,
  RichTextEditor,
  Textarea,
} from "../drizzle-ui";
import { CustomFormControlMap, FormControlMap } from "../types/types";
import { capitalCase } from "change-case-all";

export function RenderFormControl({
  keyName,
  value,
  formControlMap,
  customFormControlMap,
}: {
  keyName: string;
  value: any;
  formControlMap: FormControlMap;
  customFormControlMap: CustomFormControlMap;
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
            defaultValue={value}
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
            defaultValue={value}
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
            defaultValue={value}
            name={keyName}
            id={keyName}
          />
        </FormControl>
      );
    case "richtext":
      return (
        <FormControl>
          <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
          <RichTextEditor id={keyName} name={keyName} html={value} />
        </FormControl>
      );
    case "file":
      return (
        <FormControl>
          <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
          <Input type="file" name={keyName} id={keyName} />
        </FormControl>
      );
    case "custom":
      const CustomFormControl = customFormControlMap[keyName];
      if (!CustomFormControl) {
        throw new Error(`custom form control not found for key: ${keyName}`)
      }
      return (
        <CustomFormControl value={value} />
      )
    case "json":
      return (
        <FormControl>
          <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
          <Textarea
            defaultValue={JSON.stringify(value)}
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

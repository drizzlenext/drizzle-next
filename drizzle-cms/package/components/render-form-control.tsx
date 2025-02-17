import { Checkbox, FormControl, Input, Label } from "drizzle-ui";
import { ColumnInfoMap } from "../types";
import { capitalCase } from "change-case-all";
import { renderValue } from "../utils";

export function RenderFormControl({
  keyName,
  value,
  columnInfoMap,
}: {
  keyName: string;
  value: any;
  columnInfoMap: ColumnInfoMap;
}) {
  if (columnInfoMap[keyName] === "string") {
    return (
      <FormControl>
        <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
        <Input defaultValue={renderValue(value)} name={keyName} id={keyName} />
      </FormControl>
    );
  } else if (columnInfoMap[keyName] === "boolean") {
    return (
      <FormControl>
        <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
        <Checkbox defaultChecked={value} name={keyName} id={keyName} />
      </FormControl>
    );
  } else if (columnInfoMap[keyName] === "date") {
    return (
      <FormControl>
        <Label htmlFor={keyName}>{capitalCase(keyName)}</Label>
        <Input
          type="datetime-local"
          defaultValue={value?.toISOString().slice(0, 16)}
          name={keyName}
          id={keyName}
        />
      </FormControl>
    );
  } else if (typeof value === "object") {
    // Handle other object types if necessary
    return null;
  }
  return null;
}

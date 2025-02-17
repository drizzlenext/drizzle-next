"use client";

import { capitalCase } from "change-case-all";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  FormControl,
  Input,
  Label,
} from "drizzle-ui";
import { renderValue } from "../utils";
import { useState } from "react";
import { ColumnInfoMap } from "../types";

type AlertVariant =
  | "primary"
  | "muted"
  | "success"
  | "danger"
  | "warning"
  | "info";

interface UpdateStatus {
  message?: string;
  status?: AlertVariant;
}

export function ObjectCreateForm({
  curTable,
  columnInfoMap,
}: {
  curTable: string;
  columnInfoMap: ColumnInfoMap;
}) {
  const [state, setState] = useState<UpdateStatus>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // api call
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`/api/${curTable}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setState({ message: json.message, status: json.status });
  }

  return (
    <Form onSubmit={handleSubmit}>
      {state.message && (
        <Alert variant={state.status} className="mb-5">
          {state.message}
        </Alert>
      )}
      <input type="hidden" name="curTable" defaultValue={curTable} />
      {Object.keys(columnInfoMap).map((key) => {
        if (["id", "createdAt", "updatedAt"].includes(key)) return null;
        return <div key={key}>{renderFormControl(key, "", columnInfoMap)}</div>;
      })}
      <FormControl>
        <Button type="submit">Submit</Button>
      </FormControl>
    </Form>
  );
}

function renderFormControl(
  key: string,
  value: any,
  columnInfoMap: ColumnInfoMap
) {
  if (columnInfoMap[key] == "string") {
    return (
      <FormControl>
        <Label htmlFor={key}>{capitalCase(key)}</Label>
        <Input defaultValue="" name={key} id={key} />
      </FormControl>
    );
  } else if (columnInfoMap[key] === "boolean") {
    return (
      <FormControl>
        <Label htmlFor={key}>{capitalCase(key)}</Label>
        <Checkbox defaultChecked={false} name={key} id={key} />
      </FormControl>
    );
  } else if (columnInfoMap[key] === "date") {
    return (
      <FormControl>
        <Label htmlFor={key}>{capitalCase(key)}</Label>
        <Input type="datetime-local" defaultValue="" name={key} id={key} />
      </FormControl>
    );
  } else if (typeof value === "object") {
    // Handle other object types if necessary
  }
}

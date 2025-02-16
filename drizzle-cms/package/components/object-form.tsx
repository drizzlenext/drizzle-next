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

export function ObjectForm({ obj, curTable }: { obj: any; curTable: string }) {
  const [state, setState] = useState<UpdateStatus>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // api call
    const data = Object.fromEntries(formData.entries());
    const res = await fetch(`/api/${curTable}/${obj.id}`, {
      method: "PUT",
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
      <input type="hidden" name="curTable" defaultValue={curTable} />
      {Object.entries(obj).map(([key, value]) => {
        return <div key={key}>{renderFormControl(key, value)}</div>;
      })}
      <FormControl>
        <Button type="submit">Submit</Button>
      </FormControl>
      {state.message && <Alert variant={state.status}>{state.message}</Alert>}
    </Form>
  );
}

function renderFormControl(key: string, value: any) {
  if (typeof value === "string") {
    return (
      <FormControl>
        <Label htmlFor={key}>{capitalCase(key)}</Label>
        <Input defaultValue={renderValue(value)} name={key} id={key} />
      </FormControl>
    );
  } else if (typeof value === "boolean") {
    return (
      <FormControl>
        <Label htmlFor={key}>{capitalCase(key)}</Label>
        <Checkbox defaultChecked={value} name={key} id={key} />
      </FormControl>
    );
  }
}

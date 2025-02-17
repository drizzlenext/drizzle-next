"use client";

import { Alert, Button, Form, FormControl } from "drizzle-ui";
import { useState } from "react";
import { ColumnInfoMap } from "../types";
import { RenderFormControl } from "./render-form-control";

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

export function ObjectForm({
  obj,
  curTable,
  columnInfoMap,
}: {
  obj: any;
  curTable: string;
  columnInfoMap: ColumnInfoMap;
}) {
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
      {state.message && (
        <Alert variant={state.status} className="mb-5">
          {state.message}
        </Alert>
      )}
      <input type="hidden" name="curTable" defaultValue={curTable} />
      {Object.entries(obj).map(([key, value]) => {
        return (
          <div key={key}>
            <RenderFormControl
              keyName={key}
              value={value}
              columnInfoMap={columnInfoMap}
            />
          </div>
        );
      })}
      <FormControl>
        <Button type="submit">Submit</Button>
      </FormControl>
    </Form>
  );
}

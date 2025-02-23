"use client";

import { Alert, Button, Form, FormControl, Label } from "drizzle-ui";
import { useState } from "react";
import { ColumnDataTypeMap } from "../types";

interface UpdateStatus {
  message?: string;
  status?: "success" | "destructive";
}

export function ObjectDeleteForm({
  obj,
  curTable,
  columnInfoMap,
}: {
  obj: any;
  curTable: string;
  columnInfoMap: ColumnDataTypeMap;
}) {
  const [state, setState] = useState<UpdateStatus>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    // api call
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`/api/${curTable}/${obj.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setState({ message: json.message, status: json.status });
  }

  if (state.message) {
    return (
      <Alert variant={state.status} className="mb-5">
        {state.message}
      </Alert>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <input type="hidden" name="curTable" defaultValue={curTable} />
      <FormControl>
        <Label>Are you sure you want to delete this {curTable}</Label>
        <Button type="submit">Submit</Button>
      </FormControl>
    </Form>
  );
}

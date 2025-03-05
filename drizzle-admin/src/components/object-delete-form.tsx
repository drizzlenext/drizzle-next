"use client";

import { Button, Form, FormControl, FormMessage, Label } from "../drizzle-ui";
import { useState } from "react";
import { capitalCase } from "change-case-all";
import { renderValue } from "../lib/shared-utils";

interface DeleteStatus {
  message?: string;
  status?: "success" | "error";
}

export function ObjectDeleteForm({
  obj,
  curTable,
}: {
  obj: any;
  curTable: string;
}) {
  const [state, setState] = useState<DeleteStatus>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`/api/${curTable}/${obj.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      setState({ message: json.message, status: "success" });
    } else {
      setState({ message: json.message, status: "error" });
    }
  }

  if (state.message) {
    return <FormMessage variant={state.status}>{state.message}</FormMessage>;
  }

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input type="hidden" name="curTable" defaultValue={curTable} />
      <FormControl>
        <Label>Confirm delete?</Label>
      </FormControl>

      {Object.entries(obj).map(([key, value]) => (
        <div key={key}>
          <strong>{capitalCase(key)}</strong>: {renderValue(value)}
        </div>
      ))}

      <div>
        <Button type="submit" variant="destructive">
          Delete
        </Button>
      </div>
    </Form>
  );
}

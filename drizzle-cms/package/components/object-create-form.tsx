"use client";

import { capitalCase } from "change-case-all";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  FormControl,
  FormMessage,
  Input,
  Label,
} from "drizzle-ui";
import { renderValue } from "../utils";
import { useState } from "react";
import { ColumnInfoMap } from "../types";
import { RenderFormControl } from "./render-form-control";

interface UpdateStatus {
  message?: string;
  status?: "success" | "destructive";
  error?: {
    [key: string]: string[];
  };
}

function getStatus(statusCode: number) {
  if (statusCode >= 200 && statusCode <= 299) {
    return "success";
  } else if (statusCode >= 400 && statusCode <= 599) {
    return "destructive";
  }
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
    if (res.ok) {
      const json = await res.json();
      setState({ message: json.message, status: getStatus(res.status) });
    } else {
      const json = await res.json();
      setState({ status: getStatus(res.status), error: json });
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {state.message && (
        <Alert variant={state.status} className="mb-5">
          {state.message}
        </Alert>
      )}
      <input type="hidden" name="curTable" defaultValue={curTable} />
      {Object.keys(columnInfoMap).map((key) => {
        if (["id", "createdAt", "updatedAt"].includes(key)) return null;
        return (
          <div key={key}>
            {" "}
            <RenderFormControl
              keyName={key}
              value={undefined}
              columnInfoMap={columnInfoMap}
            />
            {state?.error && state.error[key] && (
              <FormMessage>{state.error[key]}</FormMessage>
            )}
          </div>
        );
      })}
      <FormControl>
        <Button type="submit">Submit</Button>
      </FormControl>
    </Form>
  );
}

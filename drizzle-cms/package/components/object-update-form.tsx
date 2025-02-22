"use client";

import { Alert, Button, Form, FormControl } from "drizzle-ui";
import { useState } from "react";
import { ColumnInfoMap } from "../types";
import { RenderFormControl } from "./render-form-control";
import { useEffect } from "react";

interface UpdateStatus {
  message?: string;
  status?: "success" | "destructive";
}

function getStatus(statusCode: number) {
  if (statusCode >= 200 && statusCode <= 299) {
    return "success";
  } else if (statusCode >= 400 && statusCode <= 599) {
    return "destructive";
  }
}

export function ObjectUpdateForm({
  obj,
  curTable,
  columnInfoMap,
}: {
  obj: any;
  curTable: string;
  columnInfoMap: ColumnInfoMap;
}) {
  const [state, setState] = useState<UpdateStatus>({});
  const [curObj, setCurObj] = useState(obj);

  useEffect(() => {
    function handleRowClick(event: CustomEvent) {
      const { detail } = event;
      setCurObj(detail);
    }

    window.addEventListener("rowClick", handleRowClick as EventListener);

    return () => {
      window.removeEventListener("rowClick", handleRowClick as EventListener);
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`/api/${curTable}/${obj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setState({ message: json.message, status: getStatus(res.status) });
  }

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {state.message && (
        <Alert variant={state.status} className="mb-5">
          {state.message}
        </Alert>
      )}
      <input type="hidden" name="curTable" defaultValue={curTable} />
      {Object.entries(curObj).map(([key, value]) => {
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

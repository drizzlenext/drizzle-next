"use client";

import { Button, Form, FormControl, FormMessage } from "../drizzle-ui";
import { getFormControlMap } from "../lib/shared-utils";
import { useState } from "react";
import { ColumnDataTypeMap, CustomFormControlMap, FormControlMap } from "../types/types";
import { RenderFormControl } from "./render-form-control";

type CreateStatus = {
  message?: string;
  status?: "success" | "error";
  error?: {
    [key: string]: string[];
  };
}

export function ObjectCreateForm({
  curTable,
  columnDataTypeMap,
  formControlMap,
  customFormControlMap,
}: {
  curTable: string;
  columnDataTypeMap: ColumnDataTypeMap;
  formControlMap: FormControlMap;
  customFormControlMap: CustomFormControlMap;
}) {
  const [state, setState] = useState<CreateStatus>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const hasFile = Array.from(formData.values()).some(
      (value) => value instanceof File && value.size > 0
    );

    let res;
    if (hasFile) {
      res = await fetch(`/api/${curTable}`, {
        method: "POST",
        body: formData
      });
    } else {
      const data = Object.fromEntries(formData.entries());
      res = await fetch(`/api/${curTable}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    if (res.ok) {
      const json = await res.json();
      setState({ message: json.message, status: "success" });
    } else {
      const json = await res.json();
      setState({
        status: "error",
        error: json.error,
        message: json.message,
      });
    }
  }

  const mergedFormControlMap = getFormControlMap(
    columnDataTypeMap,
    formControlMap
  );

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input type="hidden" name="curTable" defaultValue={curTable} />
      {Object.keys(columnDataTypeMap).map((key) => {
        if (["id", "createdAt", "updatedAt"].includes(key)) return null;
        return (
          <div key={key}>
            {" "}
            <RenderFormControl
              keyName={key}
              value={undefined}
              formControlMap={mergedFormControlMap}
              customFormControlMap={customFormControlMap}
            />
            {state?.error && state.error[key] && (
              <FormMessage variant="error">{state.error[key]}</FormMessage>
            )}
          </div>
        );
      })}
      <FormControl className="flex flex-row gap-2 items-center">
        <Button type="submit">Submit</Button>
        {state.message && (
          <FormMessage variant={state.status}>{state.message}</FormMessage>
        )}
      </FormControl>
    </Form>
  );
}

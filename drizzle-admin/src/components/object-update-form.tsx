"use client";

import { Button, Form, FormControl, FormMessage } from "../drizzle-ui";
import { useState } from "react";
import { ColumnDataTypeMap, FormControlMap } from "../types/types";
import { RenderFormControl } from "./render-form-control";
import { useEffect } from "react";
import { getFormControlMap } from "../lib/client-utils";

interface UpdateStatus {
  message?: string;
  status?: "success" | "error";
  error?: {
    [key: string]: string[];
  };
}

export function ObjectUpdateForm({
  obj,
  curTable,
  columnDataTypeMap,
  formControlMap,
}: {
  obj: any;
  curTable: string;
  columnDataTypeMap: ColumnDataTypeMap;
  formControlMap?: FormControlMap;
}) {
  const [state, setState] = useState<UpdateStatus>({});
  const [curObj, setCurObj] = useState(obj);

  useEffect(() => {
    function handleRowClick(event: CustomEvent) {
      const { detail } = event;
      setCurObj((prev: any) => ({ ...prev, ...detail }));
      setState(() => ({}));
    }

    window.addEventListener("rowClick", handleRowClick as EventListener);

    return () => {
      window.removeEventListener("rowClick", handleRowClick as EventListener);
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const hasFile = Array.from(formData.values()).some(
      (value) => value instanceof File && value.size > 0
    );

    let res;
    if (hasFile) {
      res = await fetch(`/api/${curTable}/${obj.id}`, {
        method: "PUT",
        body: formData
      });
    } else {
      const data = Object.fromEntries(formData.entries());
      res = await fetch(`/api/${curTable}/${obj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    if (res.ok) {
      const json = await res.json();
      setState({ message: json.message, status: "success" });
      const res2 = await fetch(`/api/${curTable}/${obj.id}`);
      const json2 = await res2.json();
      setCurObj(json2.data);
      const event = new CustomEvent("objectUpdateFormSubmitted", {
        detail: json2.data,
      });
      window.dispatchEvent(event);
    } else {
      const json = await res.json();
      setState({ message: json.message, error: json.error, status: "error" });
    }
  }

  const mergedFormControlMap = getFormControlMap(
    columnDataTypeMap,
    formControlMap
  );

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input type="hidden" name="curTable" defaultValue={curTable} />
      {Object.entries(curObj).map(([key, value]) => {
        return (
          <div key={JSON.stringify(key + value)}>
            <RenderFormControl
              keyName={key}
              value={value}
              formControlMap={mergedFormControlMap}
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

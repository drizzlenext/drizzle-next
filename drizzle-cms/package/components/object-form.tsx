"use client";

import { capitalCase } from "change-case-all";
import { Button, Checkbox, Form, FormControl, Input, Label } from "drizzle-ui";
import { renderValue } from "../utils";

export function ObjectForm({ obj }: { obj: any }) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log(formData);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {Object.entries(obj).map(([key, value]) => {
        return <div key={key}>{renderFormControl(key, value)}</div>;
      })}
      <FormControl>
        <Button type="submit">Submit</Button>
      </FormControl>
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

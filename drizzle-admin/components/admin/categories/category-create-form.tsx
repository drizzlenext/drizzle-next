"use client";

import { startTransition, useActionState } from "react";
import { createCategory, CreateCategoryState } from "@/actions/admin/categories/create-category";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";


export function CategoryCreateForm() {
  const initialState: CreateCategoryState = {};
  const [state, dispatch] = useActionState(createCategory, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" />
        {state.errors?.name?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Button type="submit">Submit</Button>
      </FormControl>
      {state.message && <Alert variant="danger">{state.message}</Alert>}
    </Form>
  );
}

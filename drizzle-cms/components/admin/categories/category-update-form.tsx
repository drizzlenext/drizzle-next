"use client";

import { startTransition, useActionState } from "react";
import { updateCategory, UpdateCategoryState } from "@/actions/admin/categories/update-category";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

import { Category } from "@/schema/categories";

export function CategoryUpdateForm({ 
  category,
}: { 
  category: Category;
}) {
  const initialState: UpdateCategoryState = {};
  const [state, dispatch] = useActionState(updateCategory, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
      <Form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={ category.id } />
      <FormControl>
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" defaultValue={ category.name ?? "" } />
        {state.errors?.name?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="createdAt">Created At</Label>
        <Input name="createdAt" id="createdAt" defaultValue={ category.createdAt?.toLocaleString() ?? "" } />
        {state.errors?.createdAt?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="updatedAt">Updated At</Label>
        <Input name="updatedAt" id="updatedAt" defaultValue={ category.updatedAt?.toLocaleString() ?? "" } />
        {state.errors?.updatedAt?.map((error) => (
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

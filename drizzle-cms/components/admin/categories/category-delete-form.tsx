"use client";

import { deleteCategory, DeleteCategoryState } from "@/actions/admin/categories/delete-category";
import { Button } from "@/components/ui/button";
import { startTransition, useActionState } from "react";
import { Category } from "@/schema/categories";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export function CategoryDeleteForm({ category }: { category: Category }) {
  const initialState: DeleteCategoryState = {};
  const [state, dispatch] = useActionState(deleteCategory, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <Label htmlFor="id">Id: { category.id }</Label>
        <input type="hidden" name="id" id="id" value={ category.id } />
      </FormControl>
      <FormControl>
        <Button variant="danger" type="submit">
          Delete
        </Button>
      </FormControl>
      {state.message && <Alert variant="danger">{state.message}</Alert>}
    </Form>
  );
}

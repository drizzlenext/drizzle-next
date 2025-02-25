"use client";

import { deleteTag, DeleteTagState } from "@/actions/admin/tags/delete-tag";
import { Button } from "@/components/ui/button";
import { startTransition, useActionState } from "react";
import { Tag } from "@/schema/tags";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export function TagDeleteForm({ tag }: { tag: Tag }) {
  const initialState: DeleteTagState = {};
  const [state, dispatch] = useActionState(deleteTag, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <Label htmlFor="id">Id: { tag.id }</Label>
        <input type="hidden" name="id" id="id" value={ tag.id } />
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

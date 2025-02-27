"use client";

import { deletePost, DeletePostState } from "@/actions/admin/posts/delete-post";
import { Button } from "@/components/ui/button";
import { startTransition, useActionState } from "react";
import { Post } from "@/schema/posts";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export function PostDeleteForm({ post }: { post: Post }) {
  const initialState: DeletePostState = {};
  const [state, dispatch] = useActionState(deletePost, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <Label htmlFor="id">Id: { post.id }</Label>
        <input type="hidden" name="id" id="id" value={ post.id } />
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

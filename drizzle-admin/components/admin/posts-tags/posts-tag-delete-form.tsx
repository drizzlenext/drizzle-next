"use client";

import { deletePostsTag, DeletePostsTagState } from "@/actions/admin/posts-tags/delete-posts-tag";
import { Button } from "@/components/ui/button";
import { startTransition, useActionState } from "react";
import { PostsTag } from "@/schema/posts-tags";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export function PostsTagDeleteForm({ postsTag }: { postsTag: PostsTag }) {
  const initialState: DeletePostsTagState = {};
  const [state, dispatch] = useActionState(deletePostsTag, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <Label htmlFor="id">Id: { postsTag.id }</Label>
        <input type="hidden" name="id" id="id" value={ postsTag.id } />
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

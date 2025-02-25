"use client";

import { startTransition, useActionState } from "react";
import { createPostsTag, CreatePostsTagState } from "@/actions/admin/posts-tags/create-posts-tag";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";


export function PostsTagCreateForm() {
  const initialState: CreatePostsTagState = {};
  const [state, dispatch] = useActionState(createPostsTag, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <Label htmlFor="postId">Post Id</Label>
        <Input name="postId" id="postId" />
        {state.errors?.postId?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="tagId">Tag Id</Label>
        <Input name="tagId" id="tagId" />
        {state.errors?.tagId?.map((error) => (
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

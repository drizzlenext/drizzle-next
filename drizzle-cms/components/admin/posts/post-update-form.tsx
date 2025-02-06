"use client";

import { startTransition, useActionState } from "react";
import { updatePost, UpdatePostState } from "@/actions/admin/posts/update-post";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { Post } from "@/schema/posts";

export function PostUpdateForm({ 
  post,
}: { 
  post: Post;
}) {
  const initialState: UpdatePostState = {};
  const [state, dispatch] = useActionState(updatePost, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
      <Form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={ post.id } />
      <FormControl>
        <Label htmlFor="title">Title</Label>
        <Input name="title" id="title" defaultValue={ post.title ?? "" } />
        {state.errors?.title?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="categoryId">Category Id</Label>
        <Input name="categoryId" id="categoryId" defaultValue={ post.categoryId ?? "" } />
        {state.errors?.categoryId?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="content">Content</Label>
        <Input name="content" id="content" defaultValue={ post.content ?? "" } />
        {state.errors?.content?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="isPublished">Is Published</Label>
        <Checkbox name="isPublished" id="isPublished" defaultChecked={  post.isPublished ?? false } />
        {state.errors?.isPublished?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="createdAt">Created At</Label>
        <Input name="createdAt" id="createdAt" defaultValue={ post.createdAt?.toLocaleString() ?? "" } />
        {state.errors?.createdAt?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="updatedAt">Updated At</Label>
        <Input name="updatedAt" id="updatedAt" defaultValue={ post.updatedAt?.toLocaleString() ?? "" } />
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

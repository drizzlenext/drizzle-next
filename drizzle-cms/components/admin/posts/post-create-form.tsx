"use client";

import { startTransition, useActionState } from "react";
import { createPost, CreatePostState } from "@/actions/admin/posts/create-post";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";


export function PostCreateForm() {
  const initialState: CreatePostState = {};
  const [state, dispatch] = useActionState(createPost, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <Label htmlFor="title">Title</Label>
        <Input name="title" id="title" />
        {state.errors?.title?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="categoryId">Category Id</Label>
        <Input name="categoryId" id="categoryId" />
        {state.errors?.categoryId?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="content">Content</Label>
        <Input name="content" id="content" />
        {state.errors?.content?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="isPublished">Is Published</Label>
        <Checkbox name="isPublished" id="isPublished" />
        {state.errors?.isPublished?.map((error) => (
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

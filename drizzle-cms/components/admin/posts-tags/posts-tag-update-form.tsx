"use client";

import { startTransition, useActionState } from "react";
import { updatePostsTag, UpdatePostsTagState } from "@/actions/admin/posts-tags/update-posts-tag";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

import { PostsTag } from "@/schema/posts-tags";

export function PostsTagUpdateForm({ 
  postsTag,
}: { 
  postsTag: PostsTag;
}) {
  const initialState: UpdatePostsTagState = {};
  const [state, dispatch] = useActionState(updatePostsTag, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
      <Form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={ postsTag.id } />
      <FormControl>
        <Label htmlFor="postId">Post Id</Label>
        <Input name="postId" id="postId" defaultValue={ postsTag.postId ?? "" } />
        {state.errors?.postId?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="tagId">Tag Id</Label>
        <Input name="tagId" id="tagId" defaultValue={ postsTag.tagId ?? "" } />
        {state.errors?.tagId?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="createdAt">Created At</Label>
        <Input name="createdAt" id="createdAt" defaultValue={ postsTag.createdAt?.toLocaleString() ?? "" } />
        {state.errors?.createdAt?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="updatedAt">Updated At</Label>
        <Input name="updatedAt" id="updatedAt" defaultValue={ postsTag.updatedAt?.toLocaleString() ?? "" } />
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

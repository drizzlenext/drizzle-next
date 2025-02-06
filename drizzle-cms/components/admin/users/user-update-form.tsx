"use client";

import { startTransition, useActionState } from "react";
import { updateUser, UpdateUserState } from "@/actions/admin/users/update-user";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

import { User } from "@/schema/users";

export function UserUpdateForm({ 
  user,
}: { 
  user: User;
}) {
  const initialState: UpdateUserState = {};
  const [state, dispatch] = useActionState(updateUser, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
      <Form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={ user.id } />
      <FormControl>
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" defaultValue={ user.name ?? "" } />
        {state.errors?.name?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" defaultValue={ user.email ?? "" } />
        {state.errors?.email?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="emailVerified">Email Verified</Label>
        <Input name="emailVerified" id="emailVerified" defaultValue={ user.emailVerified?.toLocaleString() ?? "" } />
        {state.errors?.emailVerified?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="image">Image</Label>
        <Input name="image" id="image" defaultValue={ user.image ?? "" } />
        {state.errors?.image?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="role">Role</Label>
        <Input name="role" id="role" defaultValue={ user.role ?? "" } />
        {state.errors?.role?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" defaultValue={ user.password ?? "" } />
        {state.errors?.password?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="createdAt">Created At</Label>
        <Input name="createdAt" id="createdAt" defaultValue={ user.createdAt?.toLocaleString() ?? "" } />
        {state.errors?.createdAt?.map((error) => (
          <FormMessage key={error}>{error}</FormMessage>
        ))}
      </FormControl>
      <FormControl>
        <Label htmlFor="updatedAt">Updated At</Label>
        <Input name="updatedAt" id="updatedAt" defaultValue={ user.updatedAt?.toLocaleString() ?? "" } />
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

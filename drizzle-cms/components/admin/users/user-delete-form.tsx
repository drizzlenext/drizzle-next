"use client";

import { deleteUser, DeleteUserState } from "@/actions/admin/users/delete-user";
import { Button } from "@/components/ui/button";
import { startTransition, useActionState } from "react";
import { User } from "@/schema/users";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export function UserDeleteForm({ user }: { user: User }) {
  const initialState: DeleteUserState = {};
  const [state, dispatch] = useActionState(deleteUser, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <Label htmlFor="id">Id: { user.id }</Label>
        <input type="hidden" name="id" id="id" value={ user.id } />
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

"use client";

import { startTransition, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminSignInState, adminSignInAction } from "@/actions/auth/admin-signin-action";
import { Form, FormControl, FormMessage } from "@/components/ui/form";

export function AdminSignInForm() {
  const initialState: AdminSignInState = {};
  const [state, dispatch] = useActionState(adminSignInAction, initialState);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
    <Form key={"credentials"} onSubmit={handleSubmit}>
      <FormControl>
        <Label htmlFor="email">Email</Label>
        <Input type="text" name="email" id="email" />
      </FormControl>
      <FormControl>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" />
      </FormControl>
      <FormControl>
        <Button type="submit">Sign in</Button>
      </FormControl>
      {state.message && <FormMessage>{state.message}</FormMessage>}
    </Form>
  );
}

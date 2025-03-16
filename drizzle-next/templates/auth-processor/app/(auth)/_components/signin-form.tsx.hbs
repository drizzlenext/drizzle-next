"use client";

import { startTransition, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignInState, signInAction } from "../_lib/signin-action";
import { Form, FormControl, FormMessage } from "@/components/ui/form";

export function SignInForm() {
  const initialState: SignInState = {};
  const [state, dispatch] = useActionState(signInAction, initialState);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
    <Form
      key={"credentials"}
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
    >
      <FormControl>
        <Input type="text" name="email" placeholder="Email" />
      </FormControl>
      <FormControl>
        <Input type="password" name="password" placeholder="Password" />
      </FormControl>
      <Button className="w-full" type="submit">
        Sign in with Credentials
      </Button>
      {state.message && <FormMessage>{state.message}</FormMessage>}
    </Form>
  );
}

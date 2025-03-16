"use server";

import { signIn } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/schema/users";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export type AdminSignInState = {
  message?: string;
}

export async function adminSignInAction(
  prevState: AdminSignInState,
  formData: FormData
): Promise<AdminSignInState> {
  "use server";
  try {
    const userRow = await db.query.users.findFirst({
      where: eq(users.email, formData.get("email") as string),
    });

    if (userRow?.role !== "admin") {
      return {
        message: "Unauthorized",
      };
    }

    await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    return {
      message: "Sign In failed.",
    };
  }
  redirect("/admin");
}

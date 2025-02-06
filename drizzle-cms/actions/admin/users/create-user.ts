"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/schema/users";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authorization";

const insertUserSchema = z.object({
  name: z.coerce.string(),
  email: z.coerce.string(),
  emailVerified: z.coerce.date(),
  image: z.coerce.string(),
  role: z.coerce.string(),
  password: z.coerce.string(),
});

export interface CreateUserState {
  errors?: {
    id?: string[];
    name?: string[];
    email?: string[];
    emailVerified?: string[];
    image?: string[];
    role?: string[];
    password?: string[];
  };
  message?: string;
}

export async function createUser(
  prevState: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }


  const validatedFields = insertUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    emailVerified: formData.get("emailVerified"),
    image: formData.get("image"),
    role: formData.get("role"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid data",
    };
  }

  try {
    await db.insert(users).values(validatedFields.data);
  } catch (error) {
    console.error(error);
    return {
      message: "Database error",
    }
  }

  revalidatePath("/admin/users");
  redirect("/admin/users?notice=User was successfully created");
}

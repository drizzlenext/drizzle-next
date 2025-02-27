"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { tags } from "@/schema/tags";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authorization";

const insertTagSchema = z.object({
  name: z.coerce.string(),
});

export interface CreateTagState {
  errors?: {
    id?: string[];
    name?: string[];
  };
  message?: string;
}

export async function createTag(
  prevState: CreateTagState,
  formData: FormData
): Promise<CreateTagState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }


  const validatedFields = insertTagSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid data",
    };
  }

  try {
    await db.insert(tags).values(validatedFields.data);
  } catch (error) {
    console.error(error);
    return {
      message: "Database error",
    }
  }

  revalidatePath("/admin/tags");
  redirect("/admin/tags?notice=Tag was successfully created");
}

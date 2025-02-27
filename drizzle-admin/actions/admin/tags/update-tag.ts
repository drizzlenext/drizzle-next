"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { tags } from "@/schema/tags";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authorization";

const updateTagSchema = z.object({
  id: z.coerce.string().uuid(),
  name: z.coerce.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
  .partial()
  .required({ id: true });

export interface UpdateTagState {
  errors?: {
    id?: string[];
    name?: string[];
    createdAt?: string[];
    updatedAt?: string[];
  };
  message?: string;
}

export async function updateTag(
  prevState: UpdateTagState,
  formData: FormData
): Promise<UpdateTagState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }


  const validatedFields = updateTagSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    createdAt: formData.get("createdAt"),
    updatedAt: formData.get("updatedAt"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid data",
    };
  }

  try {
    await db
      .update(tags)
      .set(validatedFields.data)
      .where(eq(tags.id, validatedFields.data.id));
  } catch (error) {
    console.error(error);
    return {
      message: "Database error",
    }
  }

  revalidatePath("/admin/tags");
  revalidatePath("/admin/tags/" + validatedFields.data.id);
  revalidatePath("/admin/tags/" + validatedFields.data.id + "/edit");
  redirect("/admin/tags/" + validatedFields.data.id + "?notice=Tag was successfully updated");
}

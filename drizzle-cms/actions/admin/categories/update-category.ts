"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { categories } from "@/schema/categories";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authorization";

const updateCategorySchema = z.object({
  id: z.coerce.string().uuid(),
  name: z.coerce.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
  .partial()
  .required({ id: true });

export interface UpdateCategoryState {
  errors?: {
    id?: string[];
    name?: string[];
    createdAt?: string[];
    updatedAt?: string[];
  };
  message?: string;
}

export async function updateCategory(
  prevState: UpdateCategoryState,
  formData: FormData
): Promise<UpdateCategoryState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }


  const validatedFields = updateCategorySchema.safeParse({
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
      .update(categories)
      .set(validatedFields.data)
      .where(eq(categories.id, validatedFields.data.id));
  } catch (error) {
    console.error(error);
    return {
      message: "Database error",
    }
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/categories/" + validatedFields.data.id);
  revalidatePath("/admin/categories/" + validatedFields.data.id + "/edit");
  redirect("/admin/categories/" + validatedFields.data.id + "?notice=Category was successfully updated");
}

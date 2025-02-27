"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { categories } from "@/schema/categories";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authorization";

const insertCategorySchema = z.object({
  name: z.coerce.string(),
});

export interface CreateCategoryState {
  errors?: {
    id?: string[];
    name?: string[];
  };
  message?: string;
}

export async function createCategory(
  prevState: CreateCategoryState,
  formData: FormData
): Promise<CreateCategoryState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }


  const validatedFields = insertCategorySchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid data",
    };
  }

  try {
    await db.insert(categories).values(validatedFields.data);
  } catch (error) {
    console.error(error);
    return {
      message: "Database error",
    }
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories?notice=Category was successfully created");
}

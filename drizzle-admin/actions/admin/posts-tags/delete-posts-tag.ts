"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { postsTags } from "@/schema/posts-tags";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authorization";

const deletePostsTagSchema = z.object({
  id: z.coerce.string().uuid(),
}).pick({ id: true });

export interface DeletePostsTagState {
  errors?: {
    id?: string[];
  };
  message?: string;
}

export async function deletePostsTag(
  prevState: DeletePostsTagState,
  formData: FormData
): Promise<DeletePostsTagState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }

  const validatedFields = deletePostsTagSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid data",
    };
  }

  try {
    await db.delete(postsTags).where(eq(postsTags.id, validatedFields.data.id));
  } catch (error) {
    console.log(error);
    return {
      message: "Database error",
    }
  }

  revalidatePath("/admin/posts-tags");
  redirect("/admin/posts-tags?notice=PostsTag was successfully deleted");
}

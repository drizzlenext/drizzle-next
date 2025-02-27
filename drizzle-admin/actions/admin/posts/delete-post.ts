"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { posts } from "@/schema/posts";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authorization";

const deletePostSchema = z.object({
  id: z.coerce.string().uuid(),
}).pick({ id: true });

export interface DeletePostState {
  errors?: {
    id?: string[];
  };
  message?: string;
}

export async function deletePost(
  prevState: DeletePostState,
  formData: FormData
): Promise<DeletePostState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }

  const validatedFields = deletePostSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid data",
    };
  }

  try {
    await db.delete(posts).where(eq(posts.id, validatedFields.data.id));
  } catch (error) {
    console.log(error);
    return {
      message: "Database error",
    }
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts?notice=Post was successfully deleted");
}

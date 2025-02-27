"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { postsTags } from "@/schema/posts-tags";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authorization";

const updatePostsTagSchema = z.object({
  id: z.coerce.string().uuid(),
  postId: z.coerce.string().uuid(),
  tagId: z.coerce.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
  .partial()
  .required({ id: true });

export interface UpdatePostsTagState {
  errors?: {
    id?: string[];
    postId?: string[];
    tagId?: string[];
    createdAt?: string[];
    updatedAt?: string[];
  };
  message?: string;
}

export async function updatePostsTag(
  prevState: UpdatePostsTagState,
  formData: FormData
): Promise<UpdatePostsTagState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }


  const validatedFields = updatePostsTagSchema.safeParse({
    id: formData.get("id"),
    postId: formData.get("postId"),
    tagId: formData.get("tagId"),
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
      .update(postsTags)
      .set(validatedFields.data)
      .where(eq(postsTags.id, validatedFields.data.id));
  } catch (error) {
    console.error(error);
    return {
      message: "Database error",
    }
  }

  revalidatePath("/admin/posts-tags");
  revalidatePath("/admin/posts-tags/" + validatedFields.data.id);
  revalidatePath("/admin/posts-tags/" + validatedFields.data.id + "/edit");
  redirect("/admin/posts-tags/" + validatedFields.data.id + "?notice=PostsTag was successfully updated");
}

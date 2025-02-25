"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { postsTags } from "@/schema/posts-tags";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authorization";

const insertPostsTagSchema = z.object({
  postId: z.coerce.string().uuid(),
  tagId: z.coerce.string().uuid(),
});

export interface CreatePostsTagState {
  errors?: {
    id?: string[];
    postId?: string[];
    tagId?: string[];
  };
  message?: string;
}

export async function createPostsTag(
  prevState: CreatePostsTagState,
  formData: FormData
): Promise<CreatePostsTagState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }


  const validatedFields = insertPostsTagSchema.safeParse({
    postId: formData.get("postId"),
    tagId: formData.get("tagId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid data",
    };
  }

  try {
    await db.insert(postsTags).values(validatedFields.data);
  } catch (error) {
    console.error(error);
    return {
      message: "Database error",
    }
  }

  revalidatePath("/admin/posts-tags");
  redirect("/admin/posts-tags?notice=PostsTag was successfully created");
}

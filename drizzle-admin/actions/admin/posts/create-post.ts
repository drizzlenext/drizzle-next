"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { posts } from "@/schema/posts";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/authorization";

const insertPostSchema = z.object({
  title: z.coerce.string(),
  categoryId: z.coerce.string().uuid(),
  content: z.coerce.string(),
  isPublished: z.coerce.boolean(),
});

export interface CreatePostState {
  errors?: {
    id?: string[];
    title?: string[];
    categoryId?: string[];
    content?: string[];
    isPublished?: string[];
  };
  message?: string;
}

export async function createPost(
  prevState: CreatePostState,
  formData: FormData
): Promise<CreatePostState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }


  const validatedFields = insertPostSchema.safeParse({
    title: formData.get("title"),
    categoryId: formData.get("categoryId"),
    content: formData.get("content"),
    isPublished: formData.get("isPublished"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid data",
    };
  }

  try {
    await db.insert(posts).values(validatedFields.data);
  } catch (error) {
    console.error(error);
    return {
      message: "Database error",
    }
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts?notice=Post was successfully created");
}

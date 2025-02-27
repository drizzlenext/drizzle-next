import { eq, asc, desc, SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { Post, posts } from "@/schema/posts";

export type PostsWithRelationsList = Awaited<
  ReturnType<typeof getPostsWithRelationsList>
>;

export async function getPostsWithRelationsList({
  filters,
  limit,
  offset,
  sortKey,
  sortOrder,
}: {
  filters?: SQL;
  limit?: number;
  offset?: number;
  sortKey?: string;
  sortOrder?: string;
}) {
  let orderBy;
  if (sortKey && sortKey in posts) {
    switch (sortOrder) {
      case "asc":
        orderBy = asc(posts[sortKey as keyof Post]);
        break;
      case "desc":
        orderBy = desc(posts[sortKey as keyof Post]);
        break;
    }
  }

  return await db.query.posts.findMany({
    where: filters,
    orderBy: orderBy,
    limit: limit,
    offset: offset,
    with: undefined
  });
}

export type PostWithRelations = Awaited<
  ReturnType<typeof getPostWithRelations>
>;

export async function getPostWithRelations(id: string) {
  return await db.query.posts.findFirst({
    where: eq(posts.id, id),
    with: undefined,
  });
}

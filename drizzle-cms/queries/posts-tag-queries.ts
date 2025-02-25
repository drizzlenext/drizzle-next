import { eq, asc, desc, SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { PostsTag, postsTags } from "@/schema/posts-tags";

export type PostsTagsWithRelationsList = Awaited<
  ReturnType<typeof getPostsTagsWithRelationsList>
>;

export async function getPostsTagsWithRelationsList({
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
  if (sortKey && sortKey in postsTags) {
    switch (sortOrder) {
      case "asc":
        orderBy = asc(postsTags[sortKey as keyof PostsTag]);
        break;
      case "desc":
        orderBy = desc(postsTags[sortKey as keyof PostsTag]);
        break;
    }
  }

  return await db.query.postsTags.findMany({
    where: filters,
    orderBy: orderBy,
    limit: limit,
    offset: offset,
    with: undefined
  });
}

export type PostsTagWithRelations = Awaited<
  ReturnType<typeof getPostsTagWithRelations>
>;

export async function getPostsTagWithRelations(id: string) {
  return await db.query.postsTags.findFirst({
    where: eq(postsTags.id, id),
    with: undefined,
  });
}

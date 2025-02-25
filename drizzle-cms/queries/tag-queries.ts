import { eq, asc, desc, SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { Tag, tags } from "@/schema/tags";

export type TagsWithRelationsList = Awaited<
  ReturnType<typeof getTagsWithRelationsList>
>;

export async function getTagsWithRelationsList({
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
  if (sortKey && sortKey in tags) {
    switch (sortOrder) {
      case "asc":
        orderBy = asc(tags[sortKey as keyof Tag]);
        break;
      case "desc":
        orderBy = desc(tags[sortKey as keyof Tag]);
        break;
    }
  }

  return await db.query.tags.findMany({
    where: filters,
    orderBy: orderBy,
    limit: limit,
    offset: offset,
    with: undefined
  });
}

export type TagWithRelations = Awaited<
  ReturnType<typeof getTagWithRelations>
>;

export async function getTagWithRelations(id: string) {
  return await db.query.tags.findFirst({
    where: eq(tags.id, id),
    with: undefined,
  });
}

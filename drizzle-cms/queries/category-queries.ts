import { eq, asc, desc, SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { Category, categories } from "@/schema/categories";

export type CategoriesWithRelationsList = Awaited<
  ReturnType<typeof getCategoriesWithRelationsList>
>;

export async function getCategoriesWithRelationsList({
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
  if (sortKey && sortKey in categories) {
    switch (sortOrder) {
      case "asc":
        orderBy = asc(categories[sortKey as keyof Category]);
        break;
      case "desc":
        orderBy = desc(categories[sortKey as keyof Category]);
        break;
    }
  }

  return await db.query.categories.findMany({
    where: filters,
    orderBy: orderBy,
    limit: limit,
    offset: offset,
    with: undefined
  });
}

export type CategoryWithRelations = Awaited<
  ReturnType<typeof getCategoryWithRelations>
>;

export async function getCategoryWithRelations(id: string) {
  return await db.query.categories.findFirst({
    where: eq(categories.id, id),
    with: undefined,
  });
}

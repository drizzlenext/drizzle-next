import { sql, relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";


import { categories } from "@/schema/categories";


export type Post = typeof posts.$inferSelect;

export const posts = sqliteTable(
  "posts",
  {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    title: text(),
    categoryId: text().references(() => categories.id),
    content: text(),
    isPublished: integer({ mode: "boolean" } ),
    createdAt: integer({ mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer({ mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`).$onUpdate(() => new Date()),
  }
)

export const postsRelations = relations(posts, ({ one, many }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id]
  }),
}));

import { sql, relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";



export type Category = typeof categories.$inferSelect;

export const categories = sqliteTable(
  "categories",
  {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text(),
    createdAt: integer({ mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer({ mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`).$onUpdate(() => new Date()),
  }
)

export const categoriesRelations = relations(categories, ({ one, many }) => ({
}));

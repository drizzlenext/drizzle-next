import { sql, relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";



export type Tag = typeof tags.$inferSelect;

export const tags = sqliteTable(
  "tags",
  {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text(),
    createdAt: integer({ mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer({ mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`).$onUpdate(() => new Date()),
  }
)

export const tagsRelations = relations(tags, ({ one, many }) => ({
}));

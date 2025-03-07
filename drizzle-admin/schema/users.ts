import { sql } from "drizzle-orm";
import { 
  sqliteTable, 
  integer,
  text,

} from "drizzle-orm/sqlite-core"


export const users = sqliteTable("users", {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text(),
  email: text().notNull(),
  emailVerified: integer({ mode: "timestamp_ms" }),
  image: text(),
  role: text().notNull(),
  password: text(),
  createdAt: integer({ mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer({ mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`).$onUpdate(() => new Date()),
  // [CODE_MARK users-table]
})

export type User = typeof users.$inferSelect;

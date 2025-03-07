import { sql, relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";


import { posts } from "@/schema/posts";
import { tags } from "@/schema/tags";


export type PostsTag = typeof postsTags.$inferSelect;

export const postsTags = sqliteTable(
  "posts_tags",
  {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    postId: text().references(() => posts.id),
    tagId: text().references(() => tags.id),
    createdAt: integer({ mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer({ mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`).$onUpdate(() => new Date()),
  }
)

export const postsTagsRelations = relations(postsTags, ({ one, many }) => ({
  post: one(posts, {
    fields: [postsTags.postId],
    references: [posts.id]
  }),
  tag: one(tags, {
    fields: [postsTags.tagId],
    references: [tags.id]
  }),
}));

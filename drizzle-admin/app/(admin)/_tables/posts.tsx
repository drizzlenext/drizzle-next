import { posts } from "@/schema/posts";
import { DrizzleTableConfig } from "@/src";
import {
  PostDeletePageNav,
  PostEditPageNav,
  PostListPageNav,
  PostRowNav,
  PostViewPageNav,
} from "../_components/posts";

export const postsTable: DrizzleTableConfig = {
  drizzleTable: posts,
  formControlMap: { content: "richtext", updatedAt: "input" },
  components: {
    RowNav: PostRowNav,
    ViewPageNav: PostViewPageNav,
    EditPageNav: PostEditPageNav,
    DeletePageNav: PostDeletePageNav,
    ListPageNav: PostListPageNav,
  },
};

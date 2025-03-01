"use client";

import Link from "next/link";
import {
  PageActions,
  TableRowActions,
  PageActionsProps,
  TableRowActionsProps,
} from "drizzle-admin";
import { Post } from "./schema/posts";

export const PostRowActions: TableRowActions<Post> = (
  props: TableRowActionsProps<Post>
) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/${props.row.id}/images`}>
        Images
      </Link>
      <Link href={`${props.basePath}/${props.curPath}/${props.row.id}`}>
        View
      </Link>
      <Link href={`${props.basePath}/${props.curPath}/${props.row.id}/edit`}>
        Edit
      </Link>
      <Link href={`${props.basePath}/${props.curPath}/${props.row.id}/delete`}>
        Delete
      </Link>
    </>
  );
};

export const PostViewPageActions: PageActions<Post> = (
  props: PageActionsProps<Post>
) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/${props.row?.id}/edit`}>
        Custom Page Action
      </Link>
    </>
  );
};

export const PostEditPageActions: PageActions<Post> = (
  props: PageActionsProps<Post>
) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/${props.row?.id}/edit`}>
        Custom Edit Page Action
      </Link>
    </>
  );
};

export const PostDeletePageActions: PageActions<Post> = (
  props: PageActionsProps<Post>
) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/${props.row?.id}/edit`}>
        Custom Delete Page Action
      </Link>
    </>
  );
};

export const PostListPageActions: PageActions<Post> = (
  props: PageActionsProps<Post>
) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/new`}>New</Link>
    </>
  );
};

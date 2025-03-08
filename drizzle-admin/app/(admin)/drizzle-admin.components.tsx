"use client";

import Link from "next/link";
import {
  PageNav,
  RowNav,
  PageNavProps,
  RowNavProps,
} from "../../src/types/types";
import { Post } from "../../schema/posts";

export const PostRowNav: RowNav<Post> = (props: RowNavProps<Post>) => {
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

export const PostViewPageNav: PageNav<Post> = (props: PageNavProps<Post>) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/${props.row?.id}/edit`}>
        Custom Page Action
      </Link>
    </>
  );
};

export const PostEditPageNav: PageNav<Post> = (props: PageNavProps<Post>) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/${props.row?.id}/edit`}>
        Custom Edit Page Action
      </Link>
    </>
  );
};

export const PostDeletePageNav: PageNav<Post> = (props: PageNavProps<Post>) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/${props.row?.id}/edit`}>
        Custom Delete Page Action
      </Link>
    </>
  );
};

export const PostListPageNav: PageNav<Post> = (props: PageNavProps<Post>) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/new`}>New</Link>
    </>
  );
};

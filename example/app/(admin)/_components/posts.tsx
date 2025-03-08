"use client";

import Link from "next/link";
import {
  AdminPageNav,
  AdminRowNav,
  AdminPageNavProps,
  AdminRowNavProps,
} from "drizzle-admin/types";
import { Post } from "@/schema/posts";

export const PostRowNav: AdminRowNav<Post> = (
  props: AdminRowNavProps<Post>
) => {
  return (
    <>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row.id}/images`}
      >
        Images
      </Link>
      <Link href={`${props.basePath}/${props.resourcePath}/${props.row.id}`}>
        View
      </Link>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row.id}/edit`}
      >
        Edit
      </Link>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row.id}/delete`}
      >
        Delete
      </Link>
    </>
  );
};

export const PostViewPageNav: AdminPageNav<Post> = (
  props: AdminPageNavProps<Post>
) => {
  return (
    <>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row?.id}/edit`}
      >
        Custom Edit
      </Link>
    </>
  );
};

export const PostEditPageNav: AdminPageNav<Post> = (
  props: AdminPageNavProps<Post>
) => {
  return (
    <>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row?.id}/edit`}
      >
        Custom Edit
      </Link>
    </>
  );
};

export const PostDeletePageNav: AdminPageNav<Post> = (
  props: AdminPageNavProps<Post>
) => {
  return (
    <>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.row?.id}/edit`}
      >
        Custom Delete
      </Link>
    </>
  );
};

export const PostListPageNav: AdminPageNav<Post> = (
  props: AdminPageNavProps<Post>
) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.resourcePath}/new`}>
        Custom New
      </Link>
    </>
  );
};

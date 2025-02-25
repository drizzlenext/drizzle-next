"use client";

import Link from "next/link";
import { PageActionsSlot, TableRowActionsSlot } from "./package/types";
import { Button } from "drizzle-ui";

export const PostRowActions: TableRowActionsSlot = (props) => {
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

export const PostViewPageActions: PageActionsSlot = (props) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/${props.row.id}/edit`}>
        Custom Page Action
      </Link>
    </>
  );
};

export const PostEditPageActions: PageActionsSlot = (props) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/${props.row.id}/edit`}>
        Custom Edit Page Action
      </Link>
    </>
  );
};

export const PostDeletePageActions: PageActionsSlot = (props) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/${props.row.id}/edit`}>
        Custom Delete Page Action
      </Link>
    </>
  );
};

export const PostListPageActions: PageActionsSlot = (props) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/new`}>
        <Button className="rounded-2xl" variant="muted">
          New
        </Button>
      </Link>
    </>
  );
};

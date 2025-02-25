"use client";

import Link from "next/link";
import { TableRowActionsProps, TableRowActionsSlot } from "./package/types";

export const PostRowActions: TableRowActionsSlot = (
  props: TableRowActionsProps
) => {
  return (
    <>
      <Link href={`${props.basePath}/${props.curTable}/${props.row.id}/images`}>
        Images
      </Link>
      <props.DefaultRowActions />
    </>
  );
};

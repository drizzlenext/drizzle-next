"use client";

import { capitalCase } from "change-case-all";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Sortable,
  TableHead,
  TableRowActions,
  cn,
} from "drizzle-ui";
import Link from "next/link";
import { DrizzleCmsConfig, DrizzleTableConfig } from "../types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function DrizzleTable({
  list,
  config,
}: {
  list: Record<string, any>[];
  config: DrizzleTableConfig;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [curRow, setCurRow] = useState<Record<string, any>>(config.curRow);

  function handleClick(row: any) {
    setCurRow(row);
    const params = new URLSearchParams(searchParams);
    params.set("id", row.id);
    router.push(`${pathname}?${params.toString()}`);
    const event = new CustomEvent("rowClick", { detail: row });
    window.dispatchEvent(event);
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          {config.columns.map((col) => {
            return (
              <TableHead
                key={col.name}
                className="border text-nowrap overflow-clip max-w-28"
              >
                <Sortable column={col.name}>{capitalCase(col.name)}</Sortable>
              </TableHead>
            );
          })}
          <TableHead className="border"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((row: Record<string, any>) => {
          return (
            <TableRow
              key={row.id}
              className={cn(
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                curRow?.id === row.id && "bg-zinc-100 dark:bg-zinc-800"
              )}
              onClick={() => handleClick(row)}
            >
              {config.columns.map((col) => {
                return (
                  <TableCell
                    key={col.name}
                    className="text-nowrap overflow-clip max-w-28 border"
                  >
                    {col.dataType === "date" && row[col.name]?.toLocaleString()}
                    {col.dataType === "json" && JSON.stringify(row[col.name])}
                    {col.dataType === "string" && row[col.name]}
                    {col.dataType === "number" && row[col.name]}
                  </TableCell>
                );
              })}
              <TableCell>
                <TableRowActions>
                  <Link
                    href={`${config.basePath}/${config.curTable}/${row.id}`}
                  >
                    View
                  </Link>
                  <Link
                    href={`${config.basePath}/${config.curTable}/${row.id}/edit`}
                  >
                    Edit
                  </Link>
                  <Link
                    href={`${config.basePath}/${config.curTable}/${row.id}/delete`}
                  >
                    Delete
                  </Link>
                </TableRowActions>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

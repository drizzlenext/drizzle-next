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
  Input,
} from "drizzle-ui";
import Link from "next/link";
import { DrizzleTableConfig, SimplifiedColumn } from "../types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CurrentCell {
  row: Record<string, any>;
  col: SimplifiedColumn;
  el: HTMLTableCellElement;
}

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
  const [curCell, setCurCell] = useState<CurrentCell>();
  const [curList, setCurList] = useState<Record<string, any>[]>(list);

  useEffect(() => {
    setCurList(list);
  }, [list]);

  useEffect(() => {
    const inputElement = curCell?.el.querySelector("input");
    if (inputElement) {
      inputElement.focus();
      inputElement.select();
    }
  }, [curCell]);

  function handleClick(row: any) {
    setCurRow(row);
    const params = new URLSearchParams(searchParams);
    params.set("id", row.id);
    router.push(`${pathname}?${params.toString()}`);
    const event = new CustomEvent("rowClick", { detail: row });
    window.dispatchEvent(event);
  }

  function handleDoubleClickCell(
    e: React.MouseEvent<HTMLTableCellElement>,
    row: any,
    col: SimplifiedColumn
  ) {
    setCurCell({ row, col, el: e.currentTarget });
  }

  async function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!curCell) {
      return;
    }
    const value = e.target.value;
    const data: Record<string, any> = {};
    // special handling for booleans
    if (curCell.col.dataType === "boolean") {
      if (value === "f") {
        data[curCell.col.name] = false;
      } else if (value === "t") {
        data[curCell.col.name] = true;
      } else {
        data[curCell.col.name] = null;
      }
    } else {
      data[curCell.col.name] = value;
    }

    const res = await fetch(`/api/${config.curTable}/${curCell.row.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      console.log("patch success");
      // find and update row in curList
      const idx = curList.findIndex((record) => record.id === curCell.row.id);

      // if the data type is date, we will need to transform the string back to a date
      if (curCell.col.dataType === "date") {
        data[curCell.col.name] = new Date(data[curCell.col.name]);
      }

      setCurList([
        ...curList.slice(0, idx),
        Object.assign({}, curList[idx], data),
        ...curList.slice(idx + 1),
      ]);
    } else {
      console.error("patch failed");
      alert("Patch failed.");
    }

    setCurCell(undefined);
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
        {curList.map((row: Record<string, any>) => {
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
                    className={cn(
                      "text-nowrap overflow-clip max-w-28 border select-none",
                      isCurrentCell(row, col, curCell) && "p-0"
                    )}
                    onDoubleClick={(e) => handleDoubleClickCell(e, row, col)}
                  >
                    {isCurrentCell(row, col, curCell) ? (
                      <TableCellInput row={row} col={col} onBlur={handleBlur} />
                    ) : (
                      <>
                        {col.dataType === "date" &&
                          row[col.name]?.toLocaleString()}
                        {col.dataType === "json" &&
                          JSON.stringify(row[col.name])}
                        {col.dataType === "string" && row[col.name]}
                        {col.dataType === "number" && row[col.name]}
                        {col.dataType === "boolean" &&
                          row[col.name] !== undefined &&
                          row[col.name] !== null &&
                          row[col.name].toString()}
                      </>
                    )}
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

function isCurrentCell(
  row: Record<string, any>,
  col: SimplifiedColumn,
  curCell?: CurrentCell
) {
  return curCell?.row.id === row.id && col.name === curCell?.col.name;
}

function TableCellInput({
  row,
  col,
  onBlur,
}: {
  row: Record<string, any>;
  col: SimplifiedColumn;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  if (col.dataType === "boolean") {
    return (
      <Input
        className="border h-10"
        defaultValue={row[col.name] ? "t" : "f"}
        onBlur={onBlur}
      />
    );
  } else if (col.dataType === "date") {
    return (
      <Input
        className="border h-10"
        defaultValue={row[col.name].toLocaleString()}
        onBlur={onBlur}
      />
    );
  }

  return (
    <Input
      className="border h-10"
      defaultValue={row[col.name]}
      onBlur={onBlur}
    />
  );
}

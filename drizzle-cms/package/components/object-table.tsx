"use client";

import { capitalCase, kebabCase } from "change-case-all";
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
import { SimplifiedColumn, TableRowActionsSlot } from "../types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CurrentCell {
  row: Record<string, any>;
  col: SimplifiedColumn;
  el: HTMLTableCellElement;
}

type ObjectTableProps = {
  list: Record<string, any>[];
  curPath: string;
  curTable: string;
  basePath: string;
  columns: SimplifiedColumn[];
  curRow: Record<string, any>;
  TableRowActionsSlot?: TableRowActionsSlot;
};

export function ObjectTable(props: ObjectTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [curRow, setCurRow] = useState<Record<string, any>>(props.curRow);
  const [curCell, setCurCell] = useState<CurrentCell>();
  const [curList, setCurList] = useState<Record<string, any>[]>(props.list);

  useEffect(() => {
    setCurList(props.list);
  }, [props.list]);

  useEffect(() => {
    const inputElement = curCell?.el.querySelector("input");
    if (inputElement) {
      inputElement.focus();
      inputElement.select();
    }
  }, [curCell]);

  useEffect(() => {
    function handler(event: CustomEvent) {
      const { detail } = event;
      const idx = curList.findIndex((obj) => detail.id === obj.id);
      if (idx === -1) {
        return;
      }
      setCurList([...curList.slice(0, idx), detail, ...curList.slice(idx + 1)]);
    }

    window.addEventListener(
      "objectUpdateFormSubmitted",
      handler as EventListener
    );

    return () => {
      window.removeEventListener(
        "objectUpdateFormSubmitted",
        handler as EventListener
      );
    };
  }, [curList]);

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

    const res = await fetch(`/api/${props.curTable}/${curCell.row.id}`, {
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

      const newData = Object.assign({}, curList[idx], data);

      const updateEvent = new CustomEvent("rowClick", {
        detail: newData,
      });
      window.dispatchEvent(updateEvent);

      setCurList([
        ...curList.slice(0, idx),
        newData,
        ...curList.slice(idx + 1),
      ]);
    } else {
      console.error("patch failed");
      alert("Server error.");
    }

    setCurCell(undefined);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          {props.columns.map((col) => {
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
              {props.columns.map((col) => {
                return (
                  <TableCell
                    key={col.name}
                    className={cn(
                      "text-nowrap overflow-clip min-w-12 max-w-24 border select-none",
                      isCurrentCell(row, col, curCell) && "p-0"
                    )}
                    onDoubleClick={(e) => handleDoubleClickCell(e, row, col)}
                  >
                    {isCurrentCell(row, col, curCell) ? (
                      <TableCellInput
                        row={row}
                        col={col}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                      />
                    ) : (
                      <>
                        {col.dataType === "date" &&
                          row[col.name] instanceof Date &&
                          row[col.name]?.toISOString()}
                        {col.dataType === "date" &&
                          typeof row[col.name] === "string" &&
                          row[col.name]}
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
                <TableRowActions onClick={(e) => e.stopPropagation()}>
                  {props.TableRowActionsSlot && (
                    <props.TableRowActionsSlot
                      basePath={props.basePath}
                      curTable={props.curTable}
                      row={row}
                      DefaultRowActions={() => (
                        <DefaultRowActions
                          basePath={props.basePath}
                          curTable={props.curTable}
                          curPath={props.curPath}
                          row={row}
                        />
                      )}
                    />
                  )}
                  {!props.TableRowActionsSlot && (
                    <DefaultRowActions
                      basePath={props.basePath}
                      curTable={props.curTable}
                      curPath={props.curPath}
                      row={row}
                    />
                  )}
                </TableRowActions>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function DefaultRowActions(props: {
  basePath: string;
  curTable: string;
  curPath: string;
  row: any;
}) {
  return (
    <>
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
  onKeyDown,
}: {
  row: Record<string, any>;
  col: SimplifiedColumn;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  if (col.dataType === "boolean") {
    return (
      <Input
        className="border h-10"
        defaultValue={row[col.name] ? "t" : "f"}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    );
  } else if (col.dataType === "date") {
    return (
      <Input
        className="border h-10"
        defaultValue={
          row[col.name] instanceof Date
            ? row[col.name].toISOString()
            : new Date(row[col.name]).toISOString()
        }
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    );
  }

  return (
    <Input
      className="border h-10"
      defaultValue={row[col.name]}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
}

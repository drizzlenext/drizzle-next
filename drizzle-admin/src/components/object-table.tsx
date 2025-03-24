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
  cn,
  Input,
  Textarea,
  Button,
} from "../drizzle-ui";
import Link from "next/link";
import { SimplifiedColumn, AdminRowNav } from "../types/types";
import { useEffect, useState } from "react";
import { FileTextIcon, SquarePenIcon, Trash2Icon } from "lucide-react";

type CurrentCell = {
  row: Record<string, any>;
  col: SimplifiedColumn;
  el: HTMLTableCellElement;
}

type ObjectTableProps = {
  list: Record<string, any>[];
  resourcePath: string;
  curTable: string;
  basePath: string;
  columns: SimplifiedColumn[];
  curRow: Record<string, any>;
  RowActions?: AdminRowNav<any>;
};

export function ObjectTable(props: ObjectTableProps) {
  const [curRow, setCurRow] = useState<Record<string, any>>(props.curRow);
  const [curCell, setCurCell] = useState<CurrentCell>();
  const [curList, setCurList] = useState<Record<string, any>[]>(props.list);

  const { columns } = props;

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

  function handleDoubleClickCell(
    e: React.MouseEvent<HTMLTableCellElement>,
    row: any,
    col: SimplifiedColumn
  ) {
    setCurCell({ row, col, el: e.currentTarget });
  }

  async function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!curCell) {
      return;
    }
    const value = e.target.value;
    const data: Record<string, any> = {};
    if (curCell.col.dataType === "boolean") {
      // special handling for booleans
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
      // find and update row in curList
      const idx = curList.findIndex((record) => record.id === curCell.row.id);

      // if the data type is date, we will need to transform the string back to a date
      if (curCell.col.dataType === "date") {
        data[curCell.col.name] = new Date(data[curCell.col.name]);
      } else if (curCell.col.dataType === "json") {
        // if json, we'll need to parse it back
        data[curCell.col.name] = JSON.parse(data[curCell.col.name]);
      }

      const newData = Object.assign({}, curList[idx], data);

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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  }

  return (
    <Table className="table-auto">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          {columns.map((col, index) => {
            return (
              <TableHead
                key={col.name}
                className="text-nowrap overflow-hidden relative"
              >
                <Sortable column={col.name}>{capitalCase(col.name)}</Sortable>
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {curList.map((row: Record<string, any>) => {
          return (
            <TableRow
              key={row.id}
              className={cn(
                "hover:bg-zinc-100 hover:dark:bg-zinc-800",
                curRow?.id === row.id && "bg-zinc-100 dark:bg-zinc-800"
              )}
            >
              <TableCell>
                <div onClick={(e) => e.stopPropagation()}>
                  {props.RowActions && (
                    <props.RowActions
                      basePath={props.basePath}
                      resourcePath={props.resourcePath}
                      row={row}
                    />
                  )}
                  {!props.RowActions && (
                    <DefaultRowActions
                      basePath={props.basePath}
                      resourcePath={props.resourcePath}
                      row={row}
                    />
                  )}
                </div>
              </TableCell>
              {columns.map((col) => {
                return (
                  <TableCell
                    key={col.name}
                    className={cn(
                      "text-nowrap overflow-hidden max-w-80 truncate whitespace-nowrap",
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
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function DefaultRowActions(props: {
  basePath: string;
  resourcePath: string;
  row: any;
}) {
  return (
    <div className="flex gap-1">
      <Link href={`${props.basePath}/${props.resourcePath}/${props.row.id}`}>
        <Button variant="ghost" size="icon">
          <FileTextIcon size={16} className="shrink-0" />
        </Button>
      </Link>
      <Link href={`${props.basePath}/${props.resourcePath}/${props.row.id}/edit`}>
        <Button variant="ghost" size="icon">
          <SquarePenIcon size={16} className="shrink-0" />
        </Button>
      </Link>
      <Link href={`${props.basePath}/${props.resourcePath}/${props.row.id}/delete`}>
        <Button variant="ghost" size="icon">
          <Trash2Icon size={16} className="shrink-0" />
        </Button>
      </Link>
    </div>
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
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  } else if (col.dataType === "json") {
    return (
      <Textarea
        className="border h-10"
        defaultValue={JSON.stringify(row[col.name])}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    );
  }

  return (
    <Textarea
      className="border h-10"
      defaultValue={row[col.name]}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
}

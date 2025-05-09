"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Input } from "./input";
import { Button, ButtonVariant } from "./button";
import { useState } from "react";
import { Select, SelectOption } from "./select";

export type PaginationOpts = {
  showRowCount?: boolean;
  enablePageInput?: boolean;
  perPageInputType?: "text" | "select" | "none";
  perPageOptions?: number[];
  buttonVariant?: ButtonVariant;
  rowSingularLabel?: string;
  rowPluralLabel?: string;
  perPageLabel?: string;
};

export function Pagination({
  page,
  totalPages,
  pageSize,
  count,
  opts,
}: {
  page: number;
  totalPages: number;
  pageSize: number;
  count: number;
  opts?: PaginationOpts;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [pageValue, setPageValue] = useState<string>(page.toString());
  const [pageSizeValue, setPageSizeValue] = useState<string>(
    pageSize.toString(),
  );

  const defaultOpts: PaginationOpts = {
    showRowCount: true,
    enablePageInput: false,
    perPageInputType: "select",
    perPageOptions: [10, 20, 50, 100, 200],
    buttonVariant: "muted",
    rowSingularLabel: "row",
    rowPluralLabel: "rows",
    perPageLabel: "per page",
  };

  const mergedOpts = {
    ...defaultOpts,
    ...opts,
  };

  function first() {
    const params = new URLSearchParams(searchParams || "");
    const newPage = "1";
    params.set("page", newPage);
    setPageValue(newPage);
    router.push(`${pathname}?${params.toString()}`);
  }

  function previous() {
    const params = new URLSearchParams(searchParams || "");
    const newPage = (page - 1).toString();
    params.set("page", newPage);
    setPageValue(newPage);
    router.push(`${pathname}?${params.toString()}`);
  }

  function next() {
    const params = new URLSearchParams(searchParams || "");
    const newPage = (page + 1).toString();
    params.set("page", newPage);
    setPageValue(newPage);
    router.push(`${pathname}?${params.toString()}`);
  }

  function last() {
    const params = new URLSearchParams(searchParams || "");
    const newPage = totalPages.toString();
    params.set("page", newPage);
    setPageValue(newPage);
    router.push(`${pathname}?${params.toString()}`);
  }

  function handlePageKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams || "");
      const num = parseInt(pageValue);
      if (Number.isInteger(num)) {
        params.set("page", num.toString());
        router.push(`${pathname}?${params.toString()}`);
      } else {
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
        setPageValue("1");
      }
    }
  }

  function handlePageSizeKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams || "");
      const num = parseInt(pageSizeValue);
      if (Number.isInteger(num)) {
        params.set("pageSize", num.toString());
        router.push(`${pathname}?${params.toString()}`);
      } else {
        params.set("pageSize", "1");
        router.push(`${pathname}?${params.toString()}`);
        setPageSizeValue("1");
      }
    }
  }

  function handleSelectPageSize(newPageSize: string) {
    const params = new URLSearchParams(searchParams || "");
    params.set("pageSize", newPageSize);
    params.set("page", "1"); // Reset to the first page when page size changes
    setPageSizeValue(newPageSize);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {mergedOpts.showRowCount && (
        <div className="text-nowrap">
          {count}{" "}
          {count === 1
            ? mergedOpts.rowSingularLabel
            : mergedOpts.rowPluralLabel}
        </div>
      )}
      <div>
        <Button
          variant={mergedOpts.buttonVariant}
          size="icon"
          onClick={first}
          disabled={page <= 1}
        >
          <ChevronsLeftIcon />
        </Button>
      </div>
      <div>
        <Button
          variant={mergedOpts.buttonVariant}
          size="icon"
          onClick={previous}
          disabled={page <= 1}
        >
          <ChevronLeftIcon />
        </Button>
      </div>
      <div className="text-nowrap">
        {mergedOpts.enablePageInput && (
          <Input
            name="page"
            className="w-14"
            value={pageValue}
            onChange={(e) => setPageValue(e.target.value)}
            onKeyDown={handlePageKeyDown}
          />
        )}
        {!mergedOpts.enablePageInput && <>{pageValue}</>}
      </div>
      <div className="text-nowrap"> / {totalPages}</div>
      <div>
        <Button
          variant={mergedOpts.buttonVariant}
          size="icon"
          onClick={next}
          disabled={page >= totalPages}
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <div>
        <Button
          variant={mergedOpts.buttonVariant}
          size="icon"
          onClick={last}
          disabled={page >= totalPages}
        >
          <ChevronsRightIcon />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {mergedOpts.perPageInputType === "text" && (
          <Input
            name="pageSize"
            value={pageSizeValue}
            className="w-14"
            onChange={(e) => setPageSizeValue(e.target.value)}
            onKeyDown={handlePageSizeKeyDown}
          />
        )}
        {mergedOpts.perPageInputType === "select" && (
          <Select
            value={pageSizeValue}
            onChange={(e) => handleSelectPageSize(e.target.value)}
          >
            {mergedOpts.perPageOptions?.map((num) => (
              <SelectOption key={num} value={num}>
                {num}
              </SelectOption>
            ))}
          </Select>
        )}
        <div className="text-nowrap">{mergedOpts.perPageLabel}</div>
      </div>
    </div>
  );
}

"use client";

import { Pagination } from "@/src/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export function PaginationDemo() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  return (
    <div className="flex flex-col gap-5">
      <Pagination count={100} page={page} pageSize={pageSize} totalPages={10} />
      <Pagination
        count={100}
        page={page}
        pageSize={pageSize}
        totalPages={10}
        opts={{
          buttonVariant: "info",
          enablePageInput: true,
          perPageInputType: "text",
          perPageLabel: "Per Page",
          rowPluralLabel: "objects",
          rowSingularLabel: "object",
          showRowCount: true,
        }}
      />
      <Pagination
        count={100}
        page={page}
        pageSize={pageSize}
        totalPages={10}
        opts={{
          buttonVariant: "ghost",
          enablePageInput: false,
          perPageInputType: "none",
          perPageLabel: "",
          rowPluralLabel: "objects",
          rowSingularLabel: "object",
          showRowCount: false,
        }}
      />
    </div>
  );
}

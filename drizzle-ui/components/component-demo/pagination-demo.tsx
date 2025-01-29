"use client";

import { Pagination } from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export function PaginationDemo() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  return (
    <Pagination count={100} page={page} pageSize={pageSize} totalPages={10} />
  );
}

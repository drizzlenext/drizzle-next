"use client";

import { MoveUpIcon, MoveDownIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SortOrder = "asc" | "desc" | "none";

export function Sortable({
  children,
  column,
}: {
  children: ReactNode;
  column: string;
}) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const sortKey = searchParams.get("sortKey");
    if (sortKey !== column) {
      setSortOrder("none");
    }
  }, [searchParams, column]);

  function handleClick() {
    const params = new URLSearchParams(searchParams);

    switch (sortOrder) {
      case "asc":
        setSortOrder("desc");
        params.set("sortOrder", "desc");
        params.set("sortKey", column);
        break;
      case "desc":
        setSortOrder("none");
        params.delete("sortOrder");
        params.delete("sortKey");
        break;
      case "none":
        setSortOrder("asc");
        params.set("sortOrder", "asc");
        params.set("sortKey", column);
        break;
      default:
        const exhaustiveCheck: never = sortOrder;
        throw new Error(`unhandled case: ${exhaustiveCheck}`);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer select-none items-center"
    >
      <div className="text-nowrap">{children}</div>
      {sortOrder === "asc" && <MoveUpIcon className="h-4 w-4" />}
      {sortOrder === "desc" && <MoveDownIcon className="h-4 w-4" />}
      {sortOrder === "none" && <div className="h-4 w-4"></div>}
    </div>
  );
}

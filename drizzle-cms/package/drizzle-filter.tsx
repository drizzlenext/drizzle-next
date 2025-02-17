"use client";

import { capitalCase } from "change-case-all";
import { Button, Input, Select, SelectOption } from "drizzle-ui";
import { SimplifiedColumn } from "./drizzle-cms";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FilterIcon, MinusIcon, PlusIcon } from "lucide-react";

const operators = ["=", "<>", "<", ">", "<=", ">=", "Contains"];

export function DrizzleFilter({
  simplifiedColumns,
}: {
  simplifiedColumns: SimplifiedColumn[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<
    { column: string; operator: string; value: string }[]
  >([]);

  function applyOne(index: number) {
    const filter = filters[index];
    if (filter.value === "") {
      router.push(`${pathname}`);
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("filters", JSON.stringify([filter]));
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearOne(index: number) {
    setFilters((prev) => prev.filter((_, i) => i !== index));
    // Code to run after setState
    const params = new URLSearchParams(searchParams);
    params.set("filters", JSON.stringify([filters]));
    router.push(`${pathname}?${params.toString()}`);
  }

  function applyAll() {
    const params = new URLSearchParams();
    params.set("filters", JSON.stringify(filters));
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearAll() {
    setFilters([]);
    router.push(`${pathname}`);
  }

  if (filters.length === 0) {
    return (
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setFilters((prev) => [{ column: "id", operator: "=", value: "" }]);
          }}
        >
          <FilterIcon />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {filters.map((filter, index) => (
        <div key={index} className="flex gap-2">
          <Select
            className="min-w-16 max-w-32"
            value={filter.column}
            onChange={(e) =>
              setFilters((prev) =>
                prev.map((f, i) =>
                  i === index ? { ...f, column: e.target.value } : f
                )
              )
            }
          >
            {simplifiedColumns.map((col) => (
              <SelectOption key={col.name} value={col.name}>
                {capitalCase(col.name)}
              </SelectOption>
            ))}
          </Select>
          <Select
            className="min-w-16 max-w-32"
            value={filter.operator}
            onChange={(e) =>
              setFilters((prev) =>
                prev.map((f, i) =>
                  i === index ? { ...f, operator: e.target.value } : f
                )
              )
            }
          >
            {operators.map((op) => (
              <SelectOption key={op} value={op}>
                {op}
              </SelectOption>
            ))}
          </Select>
          <Input
            className="flex-grow"
            value={filter.value}
            onChange={(e) =>
              setFilters((prev) =>
                prev.map((f, i) =>
                  i === index ? { ...f, value: e.target.value } : f
                )
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyOne(index);
              }
            }}
          />
          <div>
            <Button onClick={() => applyOne(index)}>Apply</Button>
          </div>
          <div>
            <Button onClick={() => clearOne(index)}>
              <MinusIcon />
            </Button>
          </div>
          <div>
            <Button
              className=""
              onClick={() =>
                setFilters((prev) => [
                  ...prev.slice(0, index),
                  { column: "id", operator: "=", value: "" },
                  ...prev.slice(index, prev.length),
                ])
              }
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      ))}
      <div className="flex gap-2 justify-end">
        <Button onClick={() => applyAll()}>Apply All</Button>
        <Button onClick={() => clearAll()}>Clear</Button>
      </div>
    </div>
  );
}

"use client";

import { capitalCase } from "change-case-all";
import { Button, Input, Select, SelectOption } from "drizzle-ui";
import { SimplifiedColumn } from "./drizzle-cms";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const operators = ["=", "<", ">", "<=", ">=", "contains"];

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

  return (
    <div>
      {filters.map((filter, index) => (
        <div key={index} className="grid grid-rows-3 grid-cols-4 gap-1 mb-3">
          <Select
            className="col-span-4"
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
            className="col-span-2"
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
            className="col-span-2"
            value={filter.value}
            onChange={(e) =>
              setFilters((prev) =>
                prev.map((f, i) =>
                  i === index ? { ...f, value: e.target.value } : f
                )
              )
            }
          />
          <Button className="col-span-2" onClick={() => applyOne(index)}>
            Apply
          </Button>
          <Button className="col-span-2" onClick={() => clearOne(index)}>
            Clear
          </Button>
        </div>
      ))}
      <div className="grid grid-cols-3 text-xs gap-2">
        <Button
          onClick={() =>
            setFilters((prev) => [
              ...prev,
              { column: "id", operator: "=", value: "" },
            ])
          }
        >
          Add Filter
        </Button>
        <Button onClick={() => applyAll()}>Apply All</Button>
        <Button onClick={() => clearAll()}>Clear All</Button>
      </div>
    </div>
  );
}

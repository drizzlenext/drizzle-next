import {
  DrizzleAdminConfigComplete,
  Params,
  SearchParams,
} from "../types/types";
import { camelCase, capitalCase } from "change-case-all";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { ObjectDeleteForm } from "../components/object-delete-form";
import { notFound } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";
import { getColumnDataTypeMap } from "../lib/server-utils";

export async function DeletePage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleAdminConfigComplete;
}) {
  const params = await props.params;
  const config = props.config;
  const resourcePath = params.segments[0];
  const curTable = camelCase(resourcePath);
  const id = params.segments[1];
  const drizzleTableConfig = config.schema[curTable];
  if (!drizzleTableConfig) {
    notFound();
  }
  const drizzleTable = drizzleTableConfig.drizzleTable;
  const db = props.config.db;
  const obj = await db.query[curTable].findFirst({
    where: eq(drizzleTable.id, id),
  });

  if (!obj) {
    notFound();
  }

  const columnDataTypeMap = getColumnDataTypeMap(drizzleTable);

  return (
    <div className="p-3 flex flex-col gap-3">
      <div>
        <div className="flex items-center">
          <Link
            href={`${config.basePath}/${resourcePath}`}
            className="underline"
          >
            {capitalCase(resourcePath)}
          </Link>{" "}
          <ChevronRightIcon />{" "}
          <Link
            href={`${config.basePath}/${resourcePath}/${id}`}
            className="underline"
          >
            {obj.id}
          </Link>
          <ChevronRightIcon />
          Delete
        </div>
        <div>
          {drizzleTableConfig.components?.DeletePageNav && (
            <drizzleTableConfig.components.DeletePageNav
              basePath={config.basePath}
              resourcePath={resourcePath}
              row={obj}
            />
          )}
        </div>
      </div>
      <div>
        <ObjectDeleteForm obj={obj} curTable={curTable} columnDataTypeMap={columnDataTypeMap} />
      </div>
    </div>
  );
}

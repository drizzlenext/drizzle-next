import {
  DrizzleAdminConfigComplete,
  Params,
  SearchParams,
} from "../types/types";
import { camelCase, capitalCase } from "change-case-all";
import { ObjectCreateForm } from "../components/object-create-form";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { getColumnDataTypeMap } from "../lib/server-utils";

export async function NewPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleAdminConfigComplete;
}) {
  const params = await props.params;
  const config = props.config;
  const resourcePath = params.segments[0];
  const curTable = camelCase(resourcePath);
  const drizzleTableConfig = config.schema[curTable];
  if (!drizzleTableConfig) {
    notFound();
  }
  const drizzleTable = drizzleTableConfig.drizzleTable;
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
          </Link>
          <ChevronRightIcon />
          New
        </div>
      </div>
      <div>
        <ObjectCreateForm
          columnDataTypeMap={columnDataTypeMap}
          formControlMap={drizzleTableConfig.formControlMap}
          curTable={curTable}
          customFormControlMap={drizzleTableConfig.customFormControlMap}
        />
      </div>
    </div>
  );
}

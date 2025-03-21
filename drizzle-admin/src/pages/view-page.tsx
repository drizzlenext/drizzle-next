import { camelCase, capitalCase } from "change-case-all";
import {
  PageContent,
  PageHeader,
  PageLayout,
  PageNav,
  PageTitle,
} from "../drizzle-ui";
import {
  DrizzleAdminConfigComplete,
  Params,
  SearchParams,
} from "../types/types";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { renderValue } from "../lib/shared-utils";
import { notFound } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";
import { getColumnDataTypeMap } from "../lib/server-utils";

export async function ViewPage(props: {
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
    <PageLayout>
      <PageHeader>
        <PageTitle className="flex items-center">
          <Link
            href={`${config.basePath}/${resourcePath}`}
            className="underline"
          >
            {capitalCase(resourcePath)}
          </Link>{" "}
          <ChevronRightIcon /> {obj.id}
        </PageTitle>
        <PageNav>
          {drizzleTableConfig.components?.ViewPageNav && (
            <drizzleTableConfig.components.ViewPageNav
              basePath={config.basePath}
              resourcePath={resourcePath}
              row={obj}
            />
          )}
          {!drizzleTableConfig.components?.ViewPageNav && (
            <DefaultPageActions
              basePath={config.basePath}
              resourcePath={resourcePath}
              obj={obj}
            />
          )}
        </PageNav>
      </PageHeader>
      <PageContent>
        {Object.entries(obj).map(([key, value]) => (
          <div key={key}>
            <strong>{capitalCase(key)}</strong>: {renderValue(key, value, columnDataTypeMap)}
          </div>
        ))}
      </PageContent>
    </PageLayout>
  );
}

function DefaultPageActions(props: {
  basePath: string;
  resourcePath: string;
  obj: any;
}) {
  return (
    <>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.obj.id}/edit`}
        className="font-bold underline"
      >
        Edit
      </Link>
      <Link
        href={`${props.basePath}/${props.resourcePath}/${props.obj.id}/delete`}
        className="font-bold underline"
      >
        Delete
      </Link>
    </>
  );
}

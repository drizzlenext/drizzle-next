import { camelCase, capitalCase } from "change-case-all";
import {
  PageContent,
  PageHeader,
  PageLayout,
  PageNav,
  PageTitle,
} from "drizzle-ui";
import {
  DrizzleAdminConfig,
  DrizzleAdminConfigComplete,
  Params,
  SearchParams,
} from "../types";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { renderValue } from "../utils/shared-utils";
import { notFound } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

export async function ViewPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleAdminConfigComplete;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const config = props.config;
  const curPath = params.segments[0];
  const curTable = camelCase(curPath);
  const id = params.segments[1];
  const drizzleTableConfig = config.schema[curTable];
  const drizzleTable = drizzleTableConfig.drizzleTable;
  const db = props.config.db;
  const obj = await db.query[curTable].findFirst({
    where: eq(drizzleTable.id, id),
  });

  if (!obj) {
    notFound();
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle className="flex items-center">
          <Link href={`${config.basePath}/${curPath}`} className="underline">
            {capitalCase(curPath)}
          </Link>{" "}
          <ChevronRightIcon /> {obj.id}
        </PageTitle>
        <PageNav>
          {drizzleTableConfig.ViewPageActionsSlot && (
            <drizzleTableConfig.ViewPageActionsSlot
              basePath={config.basePath}
              curPath={curPath}
              curTable={curTable}
              row={obj}
            />
          )}
          {!drizzleTableConfig.ViewPageActionsSlot && (
            <DefaultPageActions
              basePath={config.basePath}
              curPath={curPath}
              obj={obj}
            />
          )}
        </PageNav>
      </PageHeader>
      <PageContent>
        {Object.entries(obj).map(([key, value]) => (
          <div key={key}>
            <strong>{capitalCase(key)}</strong>: {renderValue(value)}
          </div>
        ))}
      </PageContent>
    </PageLayout>
  );
}

function DefaultPageActions(props: {
  basePath: string;
  curPath: string;
  obj: any;
}) {
  return (
    <>
      <Link href={`${props.basePath}/${props.curPath}/${props.obj.id}/edit`}>
        Edit
      </Link>
      <Link href={`${props.basePath}/${props.curPath}/${props.obj.id}/delete`}>
        Delete
      </Link>
    </>
  );
}

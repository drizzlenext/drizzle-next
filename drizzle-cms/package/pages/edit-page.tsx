import {
  Button,
  Checkbox,
  Form,
  FormControl,
  Input,
  Label,
  PageContent,
  PageHeader,
  PageLayout,
  PageNav,
  PageTitle,
} from "drizzle-ui";
import { DrizzleCmsConfig, Params, SearchParams } from "../types";
import { capitalCase } from "change-case-all";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { renderValue } from "../utils";
import { startTransition } from "react";
import { ObjectForm } from "../components/object-form";

export async function EditPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleCmsConfig;
  db: any;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const config = props.config;
  const curTable = params.slug[0];
  const id = params.slug[1];
  const schema = config.schema[curTable];
  const drizzleSchema = schema.drizzleSchema;
  const db = props.db;
  const obj = await db.query[schema.path].findFirst({
    where: eq(drizzleSchema.id, id),
  });

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Editing {capitalCase(curTable)}</PageTitle>
        <PageNav>
          <Link href={`${config.basePath}/${curTable}`}>Back</Link>
          <Link href={`${config.basePath}/${curTable}/${id}`}>View</Link>
          <Link href={`${config.basePath}/${curTable}/${id}/delete`}>
            Delete
          </Link>
        </PageNav>
      </PageHeader>
      <PageContent>
        <ObjectForm obj={obj} />
      </PageContent>
    </PageLayout>
  );
}

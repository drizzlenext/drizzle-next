import { capitalCase } from "change-case-all";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Sortable,
  TableHead,
  TableRowActions,
} from "drizzle-ui";
import { DrizzleCmsLayout } from "./drizzle-cms-layout";
import Link from "next/link";
import { ListPage } from "./pages/list-page";
import {
  DrizzleCmsConfig,
  DrizzleCmsLayoutConfig,
  Params,
  SearchParams,
} from "./types";
import { RootPage } from "./pages/root-page";
import { ViewPage } from "./pages/view-page";
import { EditPage } from "./pages/edit-page";

export async function DrizzleCms(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleCmsConfig;
  db: any;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const config = props.config;

  const slimSchema: { [key: string]: { label: string; path: string } } = {};

  Object.entries(config.schema).forEach(
    ([key, value]) =>
      (slimSchema[key] = { label: value.label, path: value.path })
  );

  const drizzleCmsLayoutConfig: DrizzleCmsLayoutConfig = {
    basePath: config.basePath,
    schema: slimSchema,
  };

  let page;
  if (!params.slug) {
    page = <RootPage {...props} />;
  } else if (params.slug.length === 1) {
    page = <ListPage {...props} />;
  } else if (params.slug.length === 2) {
    page = <ViewPage {...props} />;
  } else if (params.slug.length === 3) {
    if (params.slug[2] === "edit") {
      page = <EditPage {...props} />;
    } else if (params.slug[2] === "delete") {
    }
  }

  return (
    <DrizzleCmsLayout config={drizzleCmsLayoutConfig}>{page}</DrizzleCmsLayout>
  );
}

export interface SimplifiedColumn {
  name: string;
  dataType: string;
}

export function DrizzleTable({
  columns,
  list,
  config,
  curTable,
}: {
  columns: SimplifiedColumn[];
  list: Record<string, any>;
  config: DrizzleCmsConfig;
  curTable: string;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => {
            return (
              <TableHead key={col.name}>
                <Sortable column={col.name}>{capitalCase(col.name)}</Sortable>
              </TableHead>
            );
          })}
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((row: Record<string, any>) => {
          return (
            <TableRow key={row.id}>
              {columns.map((col) => {
                return (
                  <TableCell key={col.name}>
                    {col.dataType === "date" && row[col.name]?.toLocaleString()}
                    {col.dataType === "json" && JSON.stringify(row[col.name])}
                    {col.dataType === "string" && row[col.name]}
                    {col.dataType === "number" && row[col.name]}
                  </TableCell>
                );
              })}
              <TableCell>
                <TableRowActions>
                  <Link href={`${config.basePath}/${curTable}/${row.id}`}>
                    View
                  </Link>
                  <Link href={`${config.basePath}/${curTable}/${row.id}/edit`}>
                    Edit
                  </Link>
                  <Link
                    href={`${config.basePath}/${curTable}/${row.id}/delete`}
                  >
                    Delete
                  </Link>
                </TableRowActions>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

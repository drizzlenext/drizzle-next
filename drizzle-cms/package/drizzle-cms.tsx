import { DrizzleCmsLayout } from "./drizzle-cms-layout";
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
import { NewPage } from "./pages/new-page";
import { DeletePage } from "./pages/delete-page";
import { completeDrizzleCmsConfig } from "./utils/server-utils";

export async function DrizzleCms(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleCmsConfig;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const config = completeDrizzleCmsConfig(props.config);
  const db = config.db;

  const slimSchema: { [key: string]: { label: string; path: string } } = {};

  Object.entries(config.schema).forEach(
    ([key, value]) =>
      (slimSchema[key] = { label: value.label, path: value.path })
  );

  const drizzleCmsLayoutConfig: DrizzleCmsLayoutConfig = {
    basePath: config.basePath,
    sidebarTables: slimSchema,
  };

  let page;
  if (!params.segments) {
    page = <RootPage {...props} config={config} />;
  } else if (params.segments.length === 1) {
    page = <ListPage {...props} config={config} />;
  } else if (params.segments.length === 2) {
    if (params.segments[1] === "new") {
      page = <NewPage {...props} config={config} />;
    } else {
      page = <ViewPage {...props} config={config} />;
    }
  } else if (params.segments.length === 3) {
    if (params.segments[2] === "edit") {
      page = <EditPage {...props} config={config} />;
    } else if (params.segments[2] === "delete") {
      page = <DeletePage {...props} config={config} />;
    }
  }

  return (
    <DrizzleCmsLayout config={drizzleCmsLayoutConfig}>{page}</DrizzleCmsLayout>
  );
}

import { ListPage } from "../pages/list-page";
import { DrizzleAdminConfig, Params, SearchParams } from "./types";
import { RootPage } from "../pages/root-page";
import { ViewPage } from "../pages/view-page";
import { EditPage } from "../pages/edit-page";
import { NewPage } from "../pages/new-page";
import { DeletePage } from "../pages/delete-page";
import { completeDrizzleAdminConfig } from "../utils/server-utils";

export async function DrizzleAdmin(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleAdminConfig;
}) {
  const params = await props.params;
  const config = completeDrizzleAdminConfig(props.config);

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

  if (!page) {
    return <div>Not Found</div>;
  }

  return <>{page}</>;
}

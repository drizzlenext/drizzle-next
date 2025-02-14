import { DrizzleCmsConfig, Params, SearchParams } from "../types";

export async function RootPage(props: {
  params: Params;
  searchParams: SearchParams;
  config: DrizzleCmsConfig;
  db: any;
}) {}

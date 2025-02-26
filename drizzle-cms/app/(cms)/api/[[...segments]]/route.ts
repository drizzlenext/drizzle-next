import { config } from "@/drizzle-cms.config";
import {
  DELETE_ROUTE,
  GET_ROUTE,
  PATCH_ROUTE,
  POST_ROUTE,
  PUT_ROUTE,
} from "@/package/drizzle-routes";

export const POST = POST_ROUTE(config);
export const GET = GET_ROUTE(config);
export const PUT = PUT_ROUTE(config);
export const PATCH = PATCH_ROUTE(config);
export const DELETE = DELETE_ROUTE(config);

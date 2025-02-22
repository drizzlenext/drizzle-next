import { config } from "@/drizzle-cms.config";
import {
  DELETE_REQUEST,
  GET_REQUEST,
  POST_REQUEST,
  PUT_REQUEST,
} from "@/package/drizzle-routes";

export const POST = POST_REQUEST(config);
export const GET = GET_REQUEST(config);
export const PUT = PUT_REQUEST(config);
export const DELETE = DELETE_REQUEST(config);

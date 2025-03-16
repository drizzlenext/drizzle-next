import { config } from "@/app/(admin)/_lib/drizzle-admin.config";
import { auth } from "@/lib/auth";
import {
  DELETE_ROUTE,
  GET_ROUTE,
  PATCH_ROUTE,
  POST_ROUTE,
  PUT_ROUTE,
} from "drizzle-admin/routes";
import { NextRequest, NextResponse } from "next/server";

const withMiddleware = (handler: any) => {
  return async (req: NextRequest) => {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "unauthenticated" }, { status: 401 });
    }
    if (session.user.role !== "admin") {
      return NextResponse.json({ message: "unauthorized" }, { status: 403 });
    }
    return handler(req);
  };
};

export const POST = withMiddleware(POST_ROUTE(config));
export const GET = withMiddleware(GET_ROUTE(config));
export const PUT = withMiddleware(PUT_ROUTE(config));
export const PATCH = withMiddleware(PATCH_ROUTE(config));
export const DELETE = withMiddleware(DELETE_ROUTE(config));

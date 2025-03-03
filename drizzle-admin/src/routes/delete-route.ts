import { NextRequest, NextResponse } from "next/server";
import { DrizzleAdminConfig } from "../lib/types";
import { eq } from "drizzle-orm";
import { withErrorHandling } from "./route-utils";

export function DELETE_ROUTE(config: DrizzleAdminConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const param0 = segments[0];
    if (param0 !== "api") {
      return new NextResponse(JSON.stringify({ message: "not found" }), {
        status: 404,
      });
    }
    const curTable = segments[1];
    const id = segments[2];
    const db = config.db;
    const schema = config.schema[curTable];
    const drizzleSchema = schema.drizzleTable;

    if (!(curTable in db.query)) {
      return NextResponse.json({ message: `not found` }, { status: 404 });
    }

    await db.delete(drizzleSchema).where(eq(drizzleSchema.id, id));

    return NextResponse.json({ message: "Delete success" });
  });
}

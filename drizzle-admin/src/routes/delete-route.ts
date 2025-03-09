import { NextRequest, NextResponse } from "next/server";
import { DrizzleAdminConfig } from "../types/types";
import { eq } from "drizzle-orm";
import { withErrorHandling } from "./route-utils";
import { camelCase } from "change-case-all";

export function DELETE_ROUTE(config: DrizzleAdminConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const param0 = segments[0];
    const curTable = camelCase(segments[1]);
    const id = segments[2];
    const db = config.db;
    const schema = config.schema[curTable];

    if (!schema) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    const drizzleSchema = schema.drizzleTable;

    if (param0 !== "api") {
      return new NextResponse(JSON.stringify({ message: "Not found" }), {
        status: 404,
      });
    }

    if (!(curTable in db.query)) {
      return NextResponse.json({ message: `Not found` }, { status: 404 });
    }

    await db.delete(drizzleSchema).where(eq(drizzleSchema.id, id));

    return NextResponse.json({ message: "Delete success" });
  });
}

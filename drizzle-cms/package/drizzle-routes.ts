import { NextResponse } from "next/server";
import { DrizzleCmsConfig } from "./types";
import { eq } from "drizzle-orm";

export function PUT_REQUEST(config: DrizzleCmsConfig) {
  return async function (request: Request) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const body = await request.json();
    const param0 = segments[0];
    if (param0 !== "api") {
      return new Response(JSON.stringify({ message: "not found" }), {
        status: 404,
      });
    }
    const curTable = segments[1];
    const id = segments[2];
    const db = config.db;
    const schema = config.schema[curTable];
    const drizzleSchema = schema.drizzleSchema;

    if (!(curTable in db.query)) {
      return NextResponse.json({ message: `not found` }, { status: 404 });
    }
    await db.update(drizzleSchema).set(body).where(eq(drizzleSchema.id, id));
    return Response.json({ message: `Update success`, status: "success" });
  };
}

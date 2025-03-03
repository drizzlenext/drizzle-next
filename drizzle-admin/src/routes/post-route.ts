import { NextRequest, NextResponse } from "next/server";
import { DrizzleAdminConfig } from "../lib/types";
import { createSchemaFactory } from "drizzle-zod";
import { getEmptyDrizzleObject, withErrorHandling } from "./route-utils";

const { createInsertSchema } = createSchemaFactory({
  coerce: {
    date: true,
    boolean: true,
  },
});

export function POST_ROUTE(config: DrizzleAdminConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const body = await request.json();
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
    const drizzleTable = schema.drizzleTable;

    const obj = getEmptyDrizzleObject(drizzleTable);

    const insertSchema = createInsertSchema(drizzleTable);

    const validatedFields = insertSchema.safeParse({ ...obj, ...body });

    if (!validatedFields.success) {
      console.error(validatedFields.error.flatten().fieldErrors);
      return NextResponse.json(validatedFields.error.flatten().fieldErrors, {
        status: 400,
      });
    }

    if (!(curTable in db.query)) {
      return NextResponse.json({ message: `not found` }, { status: 404 });
    }
    await db.insert(drizzleTable).values(validatedFields.data);
    return NextResponse.json({ message: `Create success` });
  });
}

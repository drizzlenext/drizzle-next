import { NextRequest, NextResponse } from "next/server";
import { DrizzleAdminConfig } from "../types/types";
import { createSchemaFactory } from "drizzle-zod";
import { getEmptyDrizzleObject, withErrorHandling } from "./route-utils";
import { camelCase } from "change-case-all";

const { createInsertSchema } = createSchemaFactory({
  coerce: true,
});

export function POST_ROUTE(config: DrizzleAdminConfig) {
  return withErrorHandling(async function (request: NextRequest) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);
    const body = await request.json();
    const param0 = segments[0];
    const curTable = camelCase(segments[1]);
    const db = config.db;
    const schema = config.schema[curTable];

    if (!schema) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    const drizzleTable = schema.drizzleTable;
    const obj = getEmptyDrizzleObject(drizzleTable);
    const insertSchema = createInsertSchema(drizzleTable);
    const validatedFields = insertSchema.safeParse({ ...obj, ...body });

    if (param0 !== "api") {
      return new NextResponse(JSON.stringify({ message: "not found" }), {
        status: 404,
      });
    }

    if (!(curTable in db.query)) {
      return NextResponse.json({ message: `Not found` }, { status: 404 });
    }

    if (!validatedFields.success) {
      console.error(validatedFields.error.flatten().fieldErrors);
      const res = {
        message: "Invalid data",
        error: validatedFields.error.flatten().fieldErrors,
      };
      return NextResponse.json(res, {
        status: 400,
      });
    }

    await db.insert(drizzleTable).values(validatedFields.data);
    return NextResponse.json({ message: `Create success` });
  });
}

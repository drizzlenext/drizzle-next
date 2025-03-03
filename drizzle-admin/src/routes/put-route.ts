import { NextRequest, NextResponse } from "next/server";
import { DrizzleAdminConfig } from "../types/types";
import { createSchemaFactory } from "drizzle-zod";
import { eq } from "drizzle-orm";
import { getEmptyDrizzleObject, withErrorHandling } from "./route-utils";

const { createUpdateSchema } = createSchemaFactory({
  coerce: {
    date: true,
    boolean: true,
  },
});

export function PUT_ROUTE(config: DrizzleAdminConfig) {
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
    const drizzleSchema = schema.drizzleTable;

    const obj = getEmptyDrizzleObject(drizzleSchema);

    const updateSchema = createUpdateSchema(drizzleSchema);

    const validatedFields = updateSchema.safeParse({ ...obj, ...body });

    if (!validatedFields.success) {
      return NextResponse.json(validatedFields.error.flatten().fieldErrors, {
        status: 400,
      });
    }

    if (!(curTable in db.query)) {
      console.error(`invalid resource ${curTable}`);
      return NextResponse.json(
        { message: `invalid resource ${curTable}` },
        { status: 500 }
      );
    }

    await db
      .update(drizzleSchema)
      .set(validatedFields.data)
      .where(eq(drizzleSchema.id, id));
    return NextResponse.json({ message: `Update success` });
  });
}
